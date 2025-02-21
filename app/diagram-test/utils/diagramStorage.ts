import { dia } from '@joint/core';

/**
 * Сохраняет диаграмму в localStorage под заданным именем.
 * @param graph - объект графа JointJS.
 * @param name - имя диаграммы (будет использоваться в качестве ключа).
 */
export function saveDiagram(graph: dia.Graph, name: string): void {
    const diagramJSON = JSON.stringify(graph.toJSON(), null, 2);
    localStorage.setItem(`diagram_${name}`, diagramJSON);
}

/**
 * Загружает диаграмму из localStorage по заданному имени и восстанавливает её в графе.
 * @param graph - объект графа JointJS.
 * @param name - имя диаграммы (ключ в localStorage).
 */
export function loadDiagram(graph: dia.Graph, name: string): void {
    const diagramJSON = localStorage.getItem(`diagram_${name}`);
    if (diagramJSON) {
        try {
            const jsonObj = JSON.parse(diagramJSON);
            graph.fromJSON(jsonObj);
        } catch (error) {
            console.error("Error loading diagram", error);
            alert("Ошибка при загрузке диаграммы");
        }
    } else {
        alert("Диаграмма с таким именем не найдена");
    }
}
