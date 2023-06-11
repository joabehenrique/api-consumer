import React, { useState, useEffect } from 'react';
import { getWallets, createWallet, updateWallet, deleteWallet, getWalletByAccountId } from '../../service/WalletService';
import './CryptoWalletComponent.css'

const CryptoWallet = () => {
    const [wallets, setWallets] = useState([]);
    const [wallet, setWallet] = useState(null);
    const [walletName, setWalletName] = useState("");
    const [error, setError] = useState(null);
    const [selectedWalletId, setSelectedWalletId] = useState(null);
    const [cryptoValues, setCryptoValues] = useState({});
    const [showCreateWalletForm, setShowCreateWalletForm] = useState(false);
    const [newWalletName, setNewWalletName] = useState("");
    const [newCryptoValues, setNewCryptoValues] = useState({});
    const [showWallets, setShowWallets] = useState(true);

    useEffect(() => {
        loadWallets();
    }, []);

    useEffect(() => {
        if (selectedWalletId) {
            loadWallet();
        }
    }, [selectedWalletId]);

    useEffect(() => {
        if (wallet) {
            setWalletName(wallet.name);
            setCryptoValues(wallet.cryptocurrencies);
        }
    }, [wallet]);

    const loadWallets = async () => {
        const response = await getWallets().catch(err => {
            setError(err.toString());
        });
        console.log(response.data);
        setWallets(response.data.content);
    }

    const loadWallet = async () => {
        const response = await getWalletByAccountId(selectedWalletId).catch(err => {
            setError(err.toString());
        });
        console.log(response.data);
        setWallet(response.data);
    }

    const handleUpdateWallet = async () => {
        if (wallet) {
            await updateWallet(selectedWalletId, { ...wallet, name: walletName });
            loadWallets();
            loadWallet();
        }
    }

    const handleCryptoValueChange = (cryptoName, newValue) => {
        setCryptoValues({ ...cryptoValues, [cryptoName]: newValue });
    }

    const handleUpdateCryptoValues = async () => {
        if (wallet) {
            const newCryptoValues = { ...cryptoValues };
            for (let key in newCryptoValues) {
                newCryptoValues[key] = Number(newCryptoValues[key]);
            }
            await updateWallet(selectedWalletId, { ...wallet, cryptocurrencies: newCryptoValues });
            loadWallets();
            loadWallet();
        }
    }

    const handleDeleteWallet = async () => {
        await deleteWallet(selectedWalletId);
        loadWallets();
        setWallet(null);
        setWalletName('');
    }

    const handleCreateWallet = async () => {
        const newCryptoValuesNumerical = Object.fromEntries(Object.entries(newCryptoValues).map(([key, value]) => [key, Number(value)]));
        await createWallet({ name: newWalletName, cryptocurrencies: newCryptoValuesNumerical });
        loadWallets();
        setShowCreateWalletForm(false);
        setNewWalletName("");
        setNewCryptoValues({});
        loadWallets();
        handleCreateWalletClose();
    }

    const handleCreateWalletOpen = () => {
        setShowWallets(false);
        setShowCreateWalletForm(true);
    }

    const handleCreateWalletClose = () => {
        setShowWallets(true);
        setShowCreateWalletForm(false);
    }

    if (error)
        return <div className="error">Erro: {error}</div>

    return (
        <div className="divcontent">
            {showWallets && (
                <>
                    <select
                        style={{ padding: '10px 15px', fontSize: '14px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}
                        onChange={(e) => setSelectedWalletId(Number(e.target.value))}>
                        <option value="">Selecione uma carteira</option>
                        {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                    <div style={{ backgroundColor: '#f0f0f0', paddingBottom: '10px', borderRadius: '5px', marginTop: '10px', marginBottom: '10px', boxShadow: '10px 10px 10px -8px rgba(0,0,0,0.75)' }}>
                        <h3 className="detalhe">Detalhes da Carteira</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {wallet?.name && (
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <strong style={{ color: '#3b71ca', marginRight: '10px', fontSize: '19px' }}>Nome:</strong>
                                    <input
                                        value={walletName}
                                        onChange={(e) => setWalletName(e.target.value)}
                                        style={{ padding: '2px 4px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            )}
                            {wallet?.cryptocurrencies && Object.entries(wallet.cryptocurrencies).map(([key, value]) => (
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} className="names" key={key}>
                                    <strong style={{ color: '#3b71ca', marginRight: '10px', fontSize: '19px' }}>{key}:</strong>
                                    <input
                                        type="text"
                                        value={cryptoValues[key]}
                                        onChange={(e) => handleCryptoValueChange(key, e.target.value)}
                                        style={{ fontSize: '14px', padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        style={{ padding: '10px 15px', fontSize: '14px', margin: '10px 5px', borderRadius: '5px', border: '1px solid #ddd', background: '#3b71ca', color: '#fff' }}
                        onClick={handleUpdateCryptoValues}>
                        Atualizar Valores
                    </button>
                    <button
                        style={{ padding: '10px 15px', fontSize: '14px', margin: '10px 5px', borderRadius: '5px', border: '1px solid #ddd', background: '#3b71ca', color: '#fff' }}
                        onClick={handleUpdateWallet}>
                        Atualizar Carteira
                    </button>
                    <button
                        style={{ padding: '10px 15px', fontSize: '14px', margin: '10px 5px', borderRadius: '5px', border: '1px solid #ddd', background: '#3b71ca', color: '#fff' }}
                        onClick={handleDeleteWallet}>
                        Excluir Carteira
                    </button>
                    <button
                        style={{ padding: '10px 15px', fontSize: '14px', margin: '10px 5px', borderRadius: '5px', border: '1px solid #ddd', background: '#3b71ca', color: '#fff' }}
                        onClick={handleCreateWalletOpen}>
                        Criar nova carteira
                    </button>
                </>
            )}
            {showCreateWalletForm && (
                <div style={{ backgroundColor: '#f0f0f0', paddingBottom: '10px', borderRadius: '5px', marginTop: '10px', marginBottom: '10px', boxShadow: '10px 10px 10px -8px rgba(0,0,0,0.75)' }}>
                    <h3 className="detalhe">Criar nova Carteira</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <label>
                            <strong style={{ color: '#3b71ca', marginRight: '10px', fontSize: '19px' }}>Nome:</strong>
                            <input style={{ fontSize: '14px', padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd' }} value={newWalletName} onChange={e => setNewWalletName(e.target.value)} />
                        </label>
                        <div>
                            <div className="names">
                                <strong style={{ color: '#3b71ca', marginRight: '10px', fontSize: '19px' }}>Ethereum:</strong>
                                <input style={{ fontSize: '14px', padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd' }} value={newCryptoValues['Ethereum']} onChange={e => setNewCryptoValues({ ...newCryptoValues, Ethereum: e.target.value })} />
                            </div>
                            <div className="names">
                                <strong style={{ color: '#3b71ca', marginRight: '10px', fontSize: '19px' }}>Bitcoin:</strong>
                                <input style={{ fontSize: '14px', padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd' }} value={newCryptoValues['Bitcoin']} onChange={e => setNewCryptoValues({ ...newCryptoValues, Bitcoin: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <button style={{ padding: '10px 15px', fontSize: '14px', margin: '10px 5px', borderRadius: '5px', border: '1px solid #ddd', background: '#3b71ca', color: '#fff' }} onClick={handleCreateWallet}>Criar Carteira</button>
                        <button style={{ padding: '10px 15px', fontSize: '14px', margin: '10px 5px', borderRadius: '5px', border: '1px solid #ddd', background: '#3b71ca', color: '#fff' }} onClick={handleCreateWalletClose}>Cancelar</button>
                </div>
            )}
        </div>
    );
}

export default CryptoWallet;