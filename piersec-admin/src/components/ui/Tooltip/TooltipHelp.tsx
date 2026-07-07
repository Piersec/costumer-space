export default function BotaoComTooltip() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      
      {/* Container do botão com a classe 'group' */}
      <div className="group relative inline-block">
        
        {/* O Botão principal */}
        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700">
          Como funciona?
        </button>

        {/* O Balão de Explicação (Tooltip) */}
        <div className="invisible absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded bg-gray-900 p-3 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <p>Este é um exemplo de texto explicativo que aparece instantaneamente quando o usuário passa o mouse por cima do botão.</p>
          
          {/* Pequena seta apontando para o botão */}
          <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 bg-gray-900 rotate-45"></div>
        </div>

      </div>

    </div>
  );
}
