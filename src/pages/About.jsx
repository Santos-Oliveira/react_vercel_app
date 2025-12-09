export default function About() {
    return (
        <div className="about-wrapper">
            <div className="glass-box">

                <h2 className="gradient-title">Sobre o Projeto</h2>

                <p className="about-text">
                    Este projeto foi desenvolvido como parte da disciplina de
                    <strong> Programação Web</strong>. Ele demonstra a construção de uma aplicação moderna
                    com <strong>React</strong>, incluindo consumo de API, navegação avançada,
                    responsividade e um design refinado baseado em UI moderna.
                </p>

                <h3 className="section-title">Tecnologias Utilizadas</h3>

                <div className="tech-grid">
                    <div className="tech-card neon">⚛️ React</div>
                    <div className="tech-card neon">⚡ Vite</div>
                    <div className="tech-card neon">🧭 React Router</div>
                    <div className="tech-card neon">💾 LocalStorage</div>
                    <div className="tech-card neon">🎨 CSS Responsivo</div>
                    <div className="tech-card neon">📚 PotterAPI</div>
                </div>

                <h3 className="section-title">Funcionalidades</h3>
                <ul className="features-list">
                    <li>🔍 Busca inteligente em tempo real</li>
                    <li>📊 Ordenação avançada de livros</li>
                    <li>❤️ Sistema de favoritos com animação dinâmica</li>
                    <li>💾 Persistência completa usando LocalStorage</li>
                    <li>📱 Interface totalmente responsiva</li>
                    <li>🌙 Tema escuro/claro com alternância instantânea</li>
                    <li>🧭 Navegação SPA sem recarregar a página</li>
                </ul>

                <h3 className="section-title">Sobre o Desenvolvedor</h3>
                <p className="about-text">
                    Criado por <strong>Danilo dos Santos</strong>, com foco em animações,
                    experiência do usuário e boas práticas no desenvolvimento moderno.
                </p>

            </div>
        </div>
    );
}