-- Escrow validator script
-- This script implements a simple escrow contract between two parties

{-# INLINABLE mkEscrowValidator #-}
mkEscrowValidator :: PubKeyHash -> PubKeyHash -> DatumHash -> ScriptContext -> Bool
mkEscrowValidator seller buyer dh ctx =
  case purpose of
    Minting _ -> traceIfFalse "Wrong action" False
    Spending txOutRef -> validateEscrow seller buyer dh txOutRef info
    Rewarding _ -> traceIfFalse "Wrong action" False
    Certifying _ -> traceIfFalse "Wrong action" False
  where
    info = scriptContextTxInfo ctx
    purpose = scriptContextPurpose ctx

{-# INLINABLE validateEscrow #-}
validateEscrow :: PubKeyHash -> PubKeyHash -> DatumHash -> TxOutRef -> TxInfo -> Bool
validateEscrow seller buyer dh txOutRef info =
  (traceIfFalse "Seller must sign" sellerSigned) ||
  (traceIfFalse "Buyer must sign" buyerSigned) ||
  (traceIfFalse "Invalid datum" correctDatum)
  where
    sellerSigned = txSignedBy info seller
    buyerSigned = txSignedBy info buyer
    correctDatum = case findDatum dh info of
      Nothing -> False
      Just _ -> True

-- Escrow datum type
data EscrowDatum = EscrowDatum
  { edSeller :: PubKeyHash
  , edBuyer :: PubKeyHash
  , edAmount :: Integer
  , edAsset :: AssetClass
  } deriving (Show)

PlutusTx.unstableMakeIsData ''EscrowDatum
PlutusTx.makeLift ''EscrowDatum

-- Escrow redeemer type
data EscrowAction = Release | Refund
  deriving (Show)

PlutusTx.unstableMakeIsData ''EscrowAction
PlutusTx.makeLift ''EscrowAction

-- Validator script
escrowValidator :: PubKeyHash -> PubKeyHash -> EscrowDatum -> Validator
escrowValidator seller buyer datum = mkValidatorScript $
  $$(compile [|| mkEscrowValidator ||])
  `Plutus.applyCode`
  Plutus.liftCode seller
  `Plutus.applyCode`
  Plutus.liftCode buyer
  `Plutus.applyCode`
  Plutus.liftCode (datumHash (Datum (PlutusTx.toBuiltinData datum)))

-- Validator hash
escrowValidatorHash :: PubKeyHash -> PubKeyHash -> EscrowDatum -> ValidatorHash
escrowValidatorHash seller buyer datum = validatorHash (escrowValidator seller buyer datum)

-- Address
escrowAddress :: PubKeyHash -> PubKeyHash -> EscrowDatum -> Ledger.Address
escrowAddress seller buyer datum = scriptAddress (escrowValidator seller buyer datum)