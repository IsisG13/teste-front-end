import { useState } from 'react';
import type { Product } from '../../types/product';
import './ProductModal.scss';

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [quantidade, setQuantidade] = useState<number>(1);

    const alterarQuantidade = (valor: number) => {
        if (quantidade + valor >= 1) {
            setQuantidade(quantidade + valor);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
                    &times;
                </button>

                <div className="modal-body">
                    <div className="modal-image">
                        <img src={product.photo} alt={product.productName} />
                    </div>

                    <div className="modal-info">
                        {/* Bloco Superior: Título e Preço (Gap: 18px) */}
                        <div className="info-header-block">
                            <h2 className="modal-title">{product.productName}</h2>
                            <p className="modal-price">
                                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>

                        {/* Bloco do Meio: Descrição e Link (Gap: 12px) */}
                        <div className="info-details-block">
                            <p className="modal-description">
                                {product.descriptionShort}
                            </p>
                            <a href="#" className="modal-link-more">
                                Veja mais detalhes do produto &gt;
                            </a>
                        </div>

                        {/* Bloco Inferior: Ações (Contador e Botão) */}
                        <div className="modal-actions-row">
                            <div className="quantity-selector">
                                <button
                                    type="button"
                                    className="btn-qt"
                                    onClick={() => alterarQuantidade(-1)}
                                    aria-label="Diminuir quantidade"
                                >
                                    <span className="vector-minus"></span>
                                </button>
                                <span className="qt-number">{quantidade.toString().padStart(2, '0')}</span>
                                <button
                                    type="button"
                                    className="btn-qt"
                                    onClick={() => alterarQuantidade(1)}
                                    aria-label="Aumentar quantidade"
                                >
                                    <span className="vector-plus"></span>
                                </button>
                            </div>

                            <button type="button" className="btn-comprar-modal">
                                COMPRAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
