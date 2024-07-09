import { PluginItem } from '@babel/core';

export default function (): PluginItem {
    return {
        visitor: {
            // название новы
            // Чтобы могли прокидываться в наш плагин пропсы
            Program(path, state) {
                const props = state.opts.props || [];
                // пройтись по всем нодам
                path.traverse({
                    // тип ноды
                    JSXIdentifier(current) {
                        // имя ноды
                        const nodeName = current.node.name;

                        if (props.includes(nodeName)) {
                            // удаление ноды
                            current.parentPath.remove();
                        }
                    },
                });
            },
        },
    };
}
