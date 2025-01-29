// src/components/Shapes/base/BaseLogicGate.tsx
import { PortedElement } from './PortedElement';

export const BaseComplexLogic = PortedElement.define('custom.BaseComplexLogic', {
    // Можно определить логику по умолчанию для логических ворот
});

// Предположим, что по умолчанию логические ворота имеют 2 входа и 1 выход.
// Мы можем в конструкторе (или фабричном методе) расставить порты в зависимости от размера.