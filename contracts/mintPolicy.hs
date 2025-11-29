-- Minting policy script for custom tokens
-- This is a simple minting policy that allows minting by a specific public key hash

{-# INLINABLE mkMintingPolicy #-}
mkMintingPolicy :: PubKeyHash -> ScriptContext -> Bool
mkMintingPolicy pkh ctx = 
  traceIfFalse "Invalid signer" signedByOwner &&
  traceIfFalse "Invalid action" isValidAction
  where
    -- Check if the transaction is signed by the owner
    signedByOwner = txSignedBy (scriptContextTxInfo ctx) pkh
    
    -- Check if the transaction is a valid minting action
    isValidAction = case flattenTxOutRef (scriptContextPurpose ctx) of
      Just (TxOutRef _ _) -> True
      Nothing -> False

-- Compile the minting policy
policy :: PubKeyHash -> MintingPolicy
policy pkh = mkMintingPolicyScript $
  $$(compile [|| mkMintingPolicy ||])
  `Plutus.applyCode`
  Plutus.liftCode pkh

-- Get the currency symbol
currencySymbol :: PubKeyHash -> CurrencySymbol
currencySymbol pkh = scriptCurrencySymbol (policy pkh)