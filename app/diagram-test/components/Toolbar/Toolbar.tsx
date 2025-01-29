import React, { useContext } from 'react';
import { DiagramContext } from '../../context/DiagramContext';
// import { saveDiagramAsCode, loadCodeToDiagram } from '../../utils/codeParser';
import styles from './Toolbar.module.css';

const Toolbar = () => {
    const { graph } = useContext(DiagramContext);

    // const handleSave = () => {
    //     const code = saveDiagramAsCode(graph);
    //     // Сохраните код, например, скачав файл или отправив на сервер
    //     console.log(code);
    // };
    //
    // const handleLoad = () => {
    //     const code = prompt('Вставьте ваш SystemVerilog код:');
    //     if (code) {
    //         loadCodeToDiagram(code, graph);
    //     }
    // };
    //
    // const handleGenerateCode = () => {
    //     const code = saveDiagramAsCode(graph);
    //     // Предложите скачать код как файл
    //     const blob = new Blob([code], { type: 'text/plain' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'diagram.sv';
    //     a.click();
    //     URL.revokeObjectURL(url);
    // };

    return (
        // <div className={styles.toolbar}>
        //     <button onClick={handleSave}>Сохранить</button>
        //     <button onClick={handleLoad}>Загрузить</button>
        //     <button onClick={handleGenerateCode}>Генерировать Код</button>
        //     {/* Добавьте другие инструменты */}
        // </div>
    <div className={styles.toolbar}>
        <button >Сохранить</button>
        <button >Загрузить</button>
        <button >Генерировать Код</button>
        {/* Добавьте другие инструменты */}
    </div>
)
    ;
};

export default Toolbar;
