// Generated from app/diagram-test/utils/DiagramGeneration/VHDL/grammar/vhdl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { Abstract_literalContext } from "./vhdlParser";
import { Access_type_definitionContext } from "./vhdlParser";
import { Across_aspectContext } from "./vhdlParser";
import { Actual_designatorContext } from "./vhdlParser";
import { Actual_parameter_partContext } from "./vhdlParser";
import { Actual_partContext } from "./vhdlParser";
import { Adding_operatorContext } from "./vhdlParser";
import { AggregateContext } from "./vhdlParser";
import { Alias_declarationContext } from "./vhdlParser";
import { Alias_designatorContext } from "./vhdlParser";
import { Alias_indicationContext } from "./vhdlParser";
import { AllocatorContext } from "./vhdlParser";
import { Architecture_bodyContext } from "./vhdlParser";
import { Architecture_declarative_partContext } from "./vhdlParser";
import { Architecture_statementContext } from "./vhdlParser";
import { Architecture_statement_partContext } from "./vhdlParser";
import { Array_nature_definitionContext } from "./vhdlParser";
import { Array_type_definitionContext } from "./vhdlParser";
import { AssertionContext } from "./vhdlParser";
import { Assertion_statementContext } from "./vhdlParser";
import { Association_elementContext } from "./vhdlParser";
import { Association_listContext } from "./vhdlParser";
import { Attribute_declarationContext } from "./vhdlParser";
import { Attribute_designatorContext } from "./vhdlParser";
import { Attribute_specificationContext } from "./vhdlParser";
import { Base_unit_declarationContext } from "./vhdlParser";
import { Binding_indicationContext } from "./vhdlParser";
import { Block_configurationContext } from "./vhdlParser";
import { Block_declarative_itemContext } from "./vhdlParser";
import { Block_declarative_partContext } from "./vhdlParser";
import { Block_headerContext } from "./vhdlParser";
import { Block_specificationContext } from "./vhdlParser";
import { Block_statementContext } from "./vhdlParser";
import { Block_statement_partContext } from "./vhdlParser";
import { Branch_quantity_declarationContext } from "./vhdlParser";
import { Break_elementContext } from "./vhdlParser";
import { Break_listContext } from "./vhdlParser";
import { Break_selector_clauseContext } from "./vhdlParser";
import { Break_statementContext } from "./vhdlParser";
import { Case_statementContext } from "./vhdlParser";
import { Case_statement_alternativeContext } from "./vhdlParser";
import { ChoiceContext } from "./vhdlParser";
import { ChoicesContext } from "./vhdlParser";
import { Component_configurationContext } from "./vhdlParser";
import { Component_declarationContext } from "./vhdlParser";
import { Component_instantiation_statementContext } from "./vhdlParser";
import { Component_specificationContext } from "./vhdlParser";
import { Composite_nature_definitionContext } from "./vhdlParser";
import { Composite_type_definitionContext } from "./vhdlParser";
import { Concurrent_assertion_statementContext } from "./vhdlParser";
import { Concurrent_break_statementContext } from "./vhdlParser";
import { Concurrent_procedure_call_statementContext } from "./vhdlParser";
import { Concurrent_signal_assignment_statementContext } from "./vhdlParser";
import { ConditionContext } from "./vhdlParser";
import { Condition_clauseContext } from "./vhdlParser";
import { Conditional_signal_assignmentContext } from "./vhdlParser";
import { Conditional_waveformsContext } from "./vhdlParser";
import { Configuration_declarationContext } from "./vhdlParser";
import { Configuration_declarative_itemContext } from "./vhdlParser";
import { Configuration_declarative_partContext } from "./vhdlParser";
import { Configuration_itemContext } from "./vhdlParser";
import { Configuration_specificationContext } from "./vhdlParser";
import { Constant_declarationContext } from "./vhdlParser";
import { Constrained_array_definitionContext } from "./vhdlParser";
import { Constrained_nature_definitionContext } from "./vhdlParser";
import { ConstraintContext } from "./vhdlParser";
import { Context_clauseContext } from "./vhdlParser";
import { Context_itemContext } from "./vhdlParser";
import { Delay_mechanismContext } from "./vhdlParser";
import { Design_fileContext } from "./vhdlParser";
import { Design_unitContext } from "./vhdlParser";
import { DesignatorContext } from "./vhdlParser";
import { DirectionContext } from "./vhdlParser";
import { Disconnection_specificationContext } from "./vhdlParser";
import { Discrete_rangeContext } from "./vhdlParser";
import { Element_associationContext } from "./vhdlParser";
import { Element_declarationContext } from "./vhdlParser";
import { Element_subnature_definitionContext } from "./vhdlParser";
import { Element_subtype_definitionContext } from "./vhdlParser";
import { Entity_aspectContext } from "./vhdlParser";
import { Entity_classContext } from "./vhdlParser";
import { Entity_class_entryContext } from "./vhdlParser";
import { Entity_class_entry_listContext } from "./vhdlParser";
import { Entity_declarationContext } from "./vhdlParser";
import { Entity_declarative_itemContext } from "./vhdlParser";
import { Entity_declarative_partContext } from "./vhdlParser";
import { Entity_designatorContext } from "./vhdlParser";
import { Entity_headerContext } from "./vhdlParser";
import { Entity_name_listContext } from "./vhdlParser";
import { Entity_specificationContext } from "./vhdlParser";
import { Entity_statementContext } from "./vhdlParser";
import { Entity_statement_partContext } from "./vhdlParser";
import { Entity_tagContext } from "./vhdlParser";
import { Enumeration_literalContext } from "./vhdlParser";
import { Enumeration_type_definitionContext } from "./vhdlParser";
import { Exit_statementContext } from "./vhdlParser";
import { ExpressionContext } from "./vhdlParser";
import { FactorContext } from "./vhdlParser";
import { File_declarationContext } from "./vhdlParser";
import { File_logical_nameContext } from "./vhdlParser";
import { File_open_informationContext } from "./vhdlParser";
import { File_type_definitionContext } from "./vhdlParser";
import { Formal_parameter_listContext } from "./vhdlParser";
import { Formal_partContext } from "./vhdlParser";
import { Free_quantity_declarationContext } from "./vhdlParser";
import { Generate_statementContext } from "./vhdlParser";
import { Generation_schemeContext } from "./vhdlParser";
import { Generic_clauseContext } from "./vhdlParser";
import { Generic_listContext } from "./vhdlParser";
import { Generic_map_aspectContext } from "./vhdlParser";
import { Group_constituentContext } from "./vhdlParser";
import { Group_constituent_listContext } from "./vhdlParser";
import { Group_declarationContext } from "./vhdlParser";
import { Group_template_declarationContext } from "./vhdlParser";
import { Guarded_signal_specificationContext } from "./vhdlParser";
import { IdentifierContext } from "./vhdlParser";
import { Identifier_listContext } from "./vhdlParser";
import { If_statementContext } from "./vhdlParser";
import { Index_constraintContext } from "./vhdlParser";
import { Index_specificationContext } from "./vhdlParser";
import { Index_subtype_definitionContext } from "./vhdlParser";
import { Instantiated_unitContext } from "./vhdlParser";
import { Instantiation_listContext } from "./vhdlParser";
import { Interface_constant_declarationContext } from "./vhdlParser";
import { Interface_declarationContext } from "./vhdlParser";
import { Interface_elementContext } from "./vhdlParser";
import { Interface_file_declarationContext } from "./vhdlParser";
import { Interface_signal_listContext } from "./vhdlParser";
import { Interface_port_listContext } from "./vhdlParser";
import { Interface_listContext } from "./vhdlParser";
import { Interface_quantity_declarationContext } from "./vhdlParser";
import { Interface_port_declarationContext } from "./vhdlParser";
import { Interface_signal_declarationContext } from "./vhdlParser";
import { Interface_terminal_declarationContext } from "./vhdlParser";
import { Interface_variable_declarationContext } from "./vhdlParser";
import { Iteration_schemeContext } from "./vhdlParser";
import { Label_colonContext } from "./vhdlParser";
import { Library_clauseContext } from "./vhdlParser";
import { Library_unitContext } from "./vhdlParser";
import { LiteralContext } from "./vhdlParser";
import { Logical_nameContext } from "./vhdlParser";
import { Logical_name_listContext } from "./vhdlParser";
import { Logical_operatorContext } from "./vhdlParser";
import { Loop_statementContext } from "./vhdlParser";
import { Signal_modeContext } from "./vhdlParser";
import { Multiplying_operatorContext } from "./vhdlParser";
import { NameContext } from "./vhdlParser";
import { Name_partContext } from "./vhdlParser";
import { Selected_nameContext } from "./vhdlParser";
import { Selected_name_partContext } from "./vhdlParser";
import { Function_call_or_indexed_name_partContext } from "./vhdlParser";
import { Slice_name_partContext } from "./vhdlParser";
import { Attribute_name_partContext } from "./vhdlParser";
import { Nature_declarationContext } from "./vhdlParser";
import { Nature_definitionContext } from "./vhdlParser";
import { Nature_element_declarationContext } from "./vhdlParser";
import { Next_statementContext } from "./vhdlParser";
import { Numeric_literalContext } from "./vhdlParser";
import { Object_declarationContext } from "./vhdlParser";
import { OptsContext } from "./vhdlParser";
import { Package_bodyContext } from "./vhdlParser";
import { Package_body_declarative_itemContext } from "./vhdlParser";
import { Package_body_declarative_partContext } from "./vhdlParser";
import { Package_declarationContext } from "./vhdlParser";
import { Package_declarative_itemContext } from "./vhdlParser";
import { Package_declarative_partContext } from "./vhdlParser";
import { Parameter_specificationContext } from "./vhdlParser";
import { Physical_literalContext } from "./vhdlParser";
import { Physical_type_definitionContext } from "./vhdlParser";
import { Port_clauseContext } from "./vhdlParser";
import { Port_listContext } from "./vhdlParser";
import { Port_map_aspectContext } from "./vhdlParser";
import { PrimaryContext } from "./vhdlParser";
import { Primary_unitContext } from "./vhdlParser";
import { Procedural_declarative_itemContext } from "./vhdlParser";
import { Procedural_declarative_partContext } from "./vhdlParser";
import { Procedural_statement_partContext } from "./vhdlParser";
import { Procedure_callContext } from "./vhdlParser";
import { Procedure_call_statementContext } from "./vhdlParser";
import { Process_declarative_itemContext } from "./vhdlParser";
import { Process_declarative_partContext } from "./vhdlParser";
import { Process_statementContext } from "./vhdlParser";
import { Process_statement_partContext } from "./vhdlParser";
import { Qualified_expressionContext } from "./vhdlParser";
import { Quantity_declarationContext } from "./vhdlParser";
import { Quantity_listContext } from "./vhdlParser";
import { Quantity_specificationContext } from "./vhdlParser";
import { Range_declContext } from "./vhdlParser";
import { Explicit_rangeContext } from "./vhdlParser";
import { Range_constraintContext } from "./vhdlParser";
import { Record_nature_definitionContext } from "./vhdlParser";
import { Record_type_definitionContext } from "./vhdlParser";
import { RelationContext } from "./vhdlParser";
import { Relational_operatorContext } from "./vhdlParser";
import { Report_statementContext } from "./vhdlParser";
import { Return_statementContext } from "./vhdlParser";
import { Scalar_nature_definitionContext } from "./vhdlParser";
import { Scalar_type_definitionContext } from "./vhdlParser";
import { Secondary_unitContext } from "./vhdlParser";
import { Secondary_unit_declarationContext } from "./vhdlParser";
import { Selected_signal_assignmentContext } from "./vhdlParser";
import { Selected_waveformsContext } from "./vhdlParser";
import { Sensitivity_clauseContext } from "./vhdlParser";
import { Sensitivity_listContext } from "./vhdlParser";
import { Sequence_of_statementsContext } from "./vhdlParser";
import { Sequential_statementContext } from "./vhdlParser";
import { Shift_expressionContext } from "./vhdlParser";
import { Shift_operatorContext } from "./vhdlParser";
import { Signal_assignment_statementContext } from "./vhdlParser";
import { Signal_declarationContext } from "./vhdlParser";
import { Signal_kindContext } from "./vhdlParser";
import { Signal_listContext } from "./vhdlParser";
import { SignatureContext } from "./vhdlParser";
import { Simple_expressionContext } from "./vhdlParser";
import { Simple_simultaneous_statementContext } from "./vhdlParser";
import { Simultaneous_alternativeContext } from "./vhdlParser";
import { Simultaneous_case_statementContext } from "./vhdlParser";
import { Simultaneous_if_statementContext } from "./vhdlParser";
import { Simultaneous_procedural_statementContext } from "./vhdlParser";
import { Simultaneous_statementContext } from "./vhdlParser";
import { Simultaneous_statement_partContext } from "./vhdlParser";
import { Source_aspectContext } from "./vhdlParser";
import { Source_quantity_declarationContext } from "./vhdlParser";
import { Step_limit_specificationContext } from "./vhdlParser";
import { Subnature_declarationContext } from "./vhdlParser";
import { Subnature_indicationContext } from "./vhdlParser";
import { Subprogram_bodyContext } from "./vhdlParser";
import { Subprogram_declarationContext } from "./vhdlParser";
import { Subprogram_declarative_itemContext } from "./vhdlParser";
import { Subprogram_declarative_partContext } from "./vhdlParser";
import { Subprogram_kindContext } from "./vhdlParser";
import { Subprogram_specificationContext } from "./vhdlParser";
import { Procedure_specificationContext } from "./vhdlParser";
import { Function_specificationContext } from "./vhdlParser";
import { Subprogram_statement_partContext } from "./vhdlParser";
import { Subtype_declarationContext } from "./vhdlParser";
import { Subtype_indicationContext } from "./vhdlParser";
import { SuffixContext } from "./vhdlParser";
import { TargetContext } from "./vhdlParser";
import { TermContext } from "./vhdlParser";
import { Terminal_aspectContext } from "./vhdlParser";
import { Terminal_declarationContext } from "./vhdlParser";
import { Through_aspectContext } from "./vhdlParser";
import { Timeout_clauseContext } from "./vhdlParser";
import { Tolerance_aspectContext } from "./vhdlParser";
import { Type_declarationContext } from "./vhdlParser";
import { Type_definitionContext } from "./vhdlParser";
import { Unconstrained_array_definitionContext } from "./vhdlParser";
import { Unconstrained_nature_definitionContext } from "./vhdlParser";
import { Use_clauseContext } from "./vhdlParser";
import { Variable_assignment_statementContext } from "./vhdlParser";
import { Variable_declarationContext } from "./vhdlParser";
import { Wait_statementContext } from "./vhdlParser";
import { WaveformContext } from "./vhdlParser";
import { Waveform_elementContext } from "./vhdlParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `vhdlParser`.
 */
export interface vhdlListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `vhdlParser.abstract_literal`.
	 * @param ctx the parse tree
	 */
	enterAbstract_literal?: (ctx: Abstract_literalContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.abstract_literal`.
	 * @param ctx the parse tree
	 */
	exitAbstract_literal?: (ctx: Abstract_literalContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.access_type_definition`.
	 * @param ctx the parse tree
	 */
	enterAccess_type_definition?: (ctx: Access_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.access_type_definition`.
	 * @param ctx the parse tree
	 */
	exitAccess_type_definition?: (ctx: Access_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.across_aspect`.
	 * @param ctx the parse tree
	 */
	enterAcross_aspect?: (ctx: Across_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.across_aspect`.
	 * @param ctx the parse tree
	 */
	exitAcross_aspect?: (ctx: Across_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.actual_designator`.
	 * @param ctx the parse tree
	 */
	enterActual_designator?: (ctx: Actual_designatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.actual_designator`.
	 * @param ctx the parse tree
	 */
	exitActual_designator?: (ctx: Actual_designatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.actual_parameter_part`.
	 * @param ctx the parse tree
	 */
	enterActual_parameter_part?: (ctx: Actual_parameter_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.actual_parameter_part`.
	 * @param ctx the parse tree
	 */
	exitActual_parameter_part?: (ctx: Actual_parameter_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.actual_part`.
	 * @param ctx the parse tree
	 */
	enterActual_part?: (ctx: Actual_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.actual_part`.
	 * @param ctx the parse tree
	 */
	exitActual_part?: (ctx: Actual_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.adding_operator`.
	 * @param ctx the parse tree
	 */
	enterAdding_operator?: (ctx: Adding_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.adding_operator`.
	 * @param ctx the parse tree
	 */
	exitAdding_operator?: (ctx: Adding_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.aggregate`.
	 * @param ctx the parse tree
	 */
	enterAggregate?: (ctx: AggregateContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.aggregate`.
	 * @param ctx the parse tree
	 */
	exitAggregate?: (ctx: AggregateContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.alias_declaration`.
	 * @param ctx the parse tree
	 */
	enterAlias_declaration?: (ctx: Alias_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.alias_declaration`.
	 * @param ctx the parse tree
	 */
	exitAlias_declaration?: (ctx: Alias_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.alias_designator`.
	 * @param ctx the parse tree
	 */
	enterAlias_designator?: (ctx: Alias_designatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.alias_designator`.
	 * @param ctx the parse tree
	 */
	exitAlias_designator?: (ctx: Alias_designatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.alias_indication`.
	 * @param ctx the parse tree
	 */
	enterAlias_indication?: (ctx: Alias_indicationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.alias_indication`.
	 * @param ctx the parse tree
	 */
	exitAlias_indication?: (ctx: Alias_indicationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.allocator`.
	 * @param ctx the parse tree
	 */
	enterAllocator?: (ctx: AllocatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.allocator`.
	 * @param ctx the parse tree
	 */
	exitAllocator?: (ctx: AllocatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.architecture_body`.
	 * @param ctx the parse tree
	 */
	enterArchitecture_body?: (ctx: Architecture_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.architecture_body`.
	 * @param ctx the parse tree
	 */
	exitArchitecture_body?: (ctx: Architecture_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.architecture_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterArchitecture_declarative_part?: (ctx: Architecture_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.architecture_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitArchitecture_declarative_part?: (ctx: Architecture_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.architecture_statement`.
	 * @param ctx the parse tree
	 */
	enterArchitecture_statement?: (ctx: Architecture_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.architecture_statement`.
	 * @param ctx the parse tree
	 */
	exitArchitecture_statement?: (ctx: Architecture_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.architecture_statement_part`.
	 * @param ctx the parse tree
	 */
	enterArchitecture_statement_part?: (ctx: Architecture_statement_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.architecture_statement_part`.
	 * @param ctx the parse tree
	 */
	exitArchitecture_statement_part?: (ctx: Architecture_statement_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.array_nature_definition`.
	 * @param ctx the parse tree
	 */
	enterArray_nature_definition?: (ctx: Array_nature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.array_nature_definition`.
	 * @param ctx the parse tree
	 */
	exitArray_nature_definition?: (ctx: Array_nature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.array_type_definition`.
	 * @param ctx the parse tree
	 */
	enterArray_type_definition?: (ctx: Array_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.array_type_definition`.
	 * @param ctx the parse tree
	 */
	exitArray_type_definition?: (ctx: Array_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.assertion`.
	 * @param ctx the parse tree
	 */
	enterAssertion?: (ctx: AssertionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.assertion`.
	 * @param ctx the parse tree
	 */
	exitAssertion?: (ctx: AssertionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterAssertion_statement?: (ctx: Assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitAssertion_statement?: (ctx: Assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.association_element`.
	 * @param ctx the parse tree
	 */
	enterAssociation_element?: (ctx: Association_elementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.association_element`.
	 * @param ctx the parse tree
	 */
	exitAssociation_element?: (ctx: Association_elementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.association_list`.
	 * @param ctx the parse tree
	 */
	enterAssociation_list?: (ctx: Association_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.association_list`.
	 * @param ctx the parse tree
	 */
	exitAssociation_list?: (ctx: Association_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.attribute_declaration`.
	 * @param ctx the parse tree
	 */
	enterAttribute_declaration?: (ctx: Attribute_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.attribute_declaration`.
	 * @param ctx the parse tree
	 */
	exitAttribute_declaration?: (ctx: Attribute_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.attribute_designator`.
	 * @param ctx the parse tree
	 */
	enterAttribute_designator?: (ctx: Attribute_designatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.attribute_designator`.
	 * @param ctx the parse tree
	 */
	exitAttribute_designator?: (ctx: Attribute_designatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.attribute_specification`.
	 * @param ctx the parse tree
	 */
	enterAttribute_specification?: (ctx: Attribute_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.attribute_specification`.
	 * @param ctx the parse tree
	 */
	exitAttribute_specification?: (ctx: Attribute_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.base_unit_declaration`.
	 * @param ctx the parse tree
	 */
	enterBase_unit_declaration?: (ctx: Base_unit_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.base_unit_declaration`.
	 * @param ctx the parse tree
	 */
	exitBase_unit_declaration?: (ctx: Base_unit_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.binding_indication`.
	 * @param ctx the parse tree
	 */
	enterBinding_indication?: (ctx: Binding_indicationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.binding_indication`.
	 * @param ctx the parse tree
	 */
	exitBinding_indication?: (ctx: Binding_indicationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.block_configuration`.
	 * @param ctx the parse tree
	 */
	enterBlock_configuration?: (ctx: Block_configurationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.block_configuration`.
	 * @param ctx the parse tree
	 */
	exitBlock_configuration?: (ctx: Block_configurationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.block_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterBlock_declarative_item?: (ctx: Block_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.block_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitBlock_declarative_item?: (ctx: Block_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.block_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterBlock_declarative_part?: (ctx: Block_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.block_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitBlock_declarative_part?: (ctx: Block_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.block_header`.
	 * @param ctx the parse tree
	 */
	enterBlock_header?: (ctx: Block_headerContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.block_header`.
	 * @param ctx the parse tree
	 */
	exitBlock_header?: (ctx: Block_headerContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.block_specification`.
	 * @param ctx the parse tree
	 */
	enterBlock_specification?: (ctx: Block_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.block_specification`.
	 * @param ctx the parse tree
	 */
	exitBlock_specification?: (ctx: Block_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.block_statement`.
	 * @param ctx the parse tree
	 */
	enterBlock_statement?: (ctx: Block_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.block_statement`.
	 * @param ctx the parse tree
	 */
	exitBlock_statement?: (ctx: Block_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.block_statement_part`.
	 * @param ctx the parse tree
	 */
	enterBlock_statement_part?: (ctx: Block_statement_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.block_statement_part`.
	 * @param ctx the parse tree
	 */
	exitBlock_statement_part?: (ctx: Block_statement_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.branch_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	enterBranch_quantity_declaration?: (ctx: Branch_quantity_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.branch_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	exitBranch_quantity_declaration?: (ctx: Branch_quantity_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.break_element`.
	 * @param ctx the parse tree
	 */
	enterBreak_element?: (ctx: Break_elementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.break_element`.
	 * @param ctx the parse tree
	 */
	exitBreak_element?: (ctx: Break_elementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.break_list`.
	 * @param ctx the parse tree
	 */
	enterBreak_list?: (ctx: Break_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.break_list`.
	 * @param ctx the parse tree
	 */
	exitBreak_list?: (ctx: Break_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.break_selector_clause`.
	 * @param ctx the parse tree
	 */
	enterBreak_selector_clause?: (ctx: Break_selector_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.break_selector_clause`.
	 * @param ctx the parse tree
	 */
	exitBreak_selector_clause?: (ctx: Break_selector_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.break_statement`.
	 * @param ctx the parse tree
	 */
	enterBreak_statement?: (ctx: Break_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.break_statement`.
	 * @param ctx the parse tree
	 */
	exitBreak_statement?: (ctx: Break_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.case_statement`.
	 * @param ctx the parse tree
	 */
	enterCase_statement?: (ctx: Case_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.case_statement`.
	 * @param ctx the parse tree
	 */
	exitCase_statement?: (ctx: Case_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.case_statement_alternative`.
	 * @param ctx the parse tree
	 */
	enterCase_statement_alternative?: (ctx: Case_statement_alternativeContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.case_statement_alternative`.
	 * @param ctx the parse tree
	 */
	exitCase_statement_alternative?: (ctx: Case_statement_alternativeContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.choice`.
	 * @param ctx the parse tree
	 */
	enterChoice?: (ctx: ChoiceContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.choice`.
	 * @param ctx the parse tree
	 */
	exitChoice?: (ctx: ChoiceContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.choices`.
	 * @param ctx the parse tree
	 */
	enterChoices?: (ctx: ChoicesContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.choices`.
	 * @param ctx the parse tree
	 */
	exitChoices?: (ctx: ChoicesContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.component_configuration`.
	 * @param ctx the parse tree
	 */
	enterComponent_configuration?: (ctx: Component_configurationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.component_configuration`.
	 * @param ctx the parse tree
	 */
	exitComponent_configuration?: (ctx: Component_configurationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.component_declaration`.
	 * @param ctx the parse tree
	 */
	enterComponent_declaration?: (ctx: Component_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.component_declaration`.
	 * @param ctx the parse tree
	 */
	exitComponent_declaration?: (ctx: Component_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.component_instantiation_statement`.
	 * @param ctx the parse tree
	 */
	enterComponent_instantiation_statement?: (ctx: Component_instantiation_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.component_instantiation_statement`.
	 * @param ctx the parse tree
	 */
	exitComponent_instantiation_statement?: (ctx: Component_instantiation_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.component_specification`.
	 * @param ctx the parse tree
	 */
	enterComponent_specification?: (ctx: Component_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.component_specification`.
	 * @param ctx the parse tree
	 */
	exitComponent_specification?: (ctx: Component_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.composite_nature_definition`.
	 * @param ctx the parse tree
	 */
	enterComposite_nature_definition?: (ctx: Composite_nature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.composite_nature_definition`.
	 * @param ctx the parse tree
	 */
	exitComposite_nature_definition?: (ctx: Composite_nature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.composite_type_definition`.
	 * @param ctx the parse tree
	 */
	enterComposite_type_definition?: (ctx: Composite_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.composite_type_definition`.
	 * @param ctx the parse tree
	 */
	exitComposite_type_definition?: (ctx: Composite_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.concurrent_assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterConcurrent_assertion_statement?: (ctx: Concurrent_assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.concurrent_assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitConcurrent_assertion_statement?: (ctx: Concurrent_assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.concurrent_break_statement`.
	 * @param ctx the parse tree
	 */
	enterConcurrent_break_statement?: (ctx: Concurrent_break_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.concurrent_break_statement`.
	 * @param ctx the parse tree
	 */
	exitConcurrent_break_statement?: (ctx: Concurrent_break_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.concurrent_procedure_call_statement`.
	 * @param ctx the parse tree
	 */
	enterConcurrent_procedure_call_statement?: (ctx: Concurrent_procedure_call_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.concurrent_procedure_call_statement`.
	 * @param ctx the parse tree
	 */
	exitConcurrent_procedure_call_statement?: (ctx: Concurrent_procedure_call_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.concurrent_signal_assignment_statement`.
	 * @param ctx the parse tree
	 */
	enterConcurrent_signal_assignment_statement?: (ctx: Concurrent_signal_assignment_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.concurrent_signal_assignment_statement`.
	 * @param ctx the parse tree
	 */
	exitConcurrent_signal_assignment_statement?: (ctx: Concurrent_signal_assignment_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.condition`.
	 * @param ctx the parse tree
	 */
	enterCondition?: (ctx: ConditionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.condition`.
	 * @param ctx the parse tree
	 */
	exitCondition?: (ctx: ConditionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.condition_clause`.
	 * @param ctx the parse tree
	 */
	enterCondition_clause?: (ctx: Condition_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.condition_clause`.
	 * @param ctx the parse tree
	 */
	exitCondition_clause?: (ctx: Condition_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.conditional_signal_assignment`.
	 * @param ctx the parse tree
	 */
	enterConditional_signal_assignment?: (ctx: Conditional_signal_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.conditional_signal_assignment`.
	 * @param ctx the parse tree
	 */
	exitConditional_signal_assignment?: (ctx: Conditional_signal_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.conditional_waveforms`.
	 * @param ctx the parse tree
	 */
	enterConditional_waveforms?: (ctx: Conditional_waveformsContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.conditional_waveforms`.
	 * @param ctx the parse tree
	 */
	exitConditional_waveforms?: (ctx: Conditional_waveformsContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.configuration_declaration`.
	 * @param ctx the parse tree
	 */
	enterConfiguration_declaration?: (ctx: Configuration_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.configuration_declaration`.
	 * @param ctx the parse tree
	 */
	exitConfiguration_declaration?: (ctx: Configuration_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.configuration_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterConfiguration_declarative_item?: (ctx: Configuration_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.configuration_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitConfiguration_declarative_item?: (ctx: Configuration_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.configuration_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterConfiguration_declarative_part?: (ctx: Configuration_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.configuration_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitConfiguration_declarative_part?: (ctx: Configuration_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.configuration_item`.
	 * @param ctx the parse tree
	 */
	enterConfiguration_item?: (ctx: Configuration_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.configuration_item`.
	 * @param ctx the parse tree
	 */
	exitConfiguration_item?: (ctx: Configuration_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.configuration_specification`.
	 * @param ctx the parse tree
	 */
	enterConfiguration_specification?: (ctx: Configuration_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.configuration_specification`.
	 * @param ctx the parse tree
	 */
	exitConfiguration_specification?: (ctx: Configuration_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.constant_declaration`.
	 * @param ctx the parse tree
	 */
	enterConstant_declaration?: (ctx: Constant_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.constant_declaration`.
	 * @param ctx the parse tree
	 */
	exitConstant_declaration?: (ctx: Constant_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.constrained_array_definition`.
	 * @param ctx the parse tree
	 */
	enterConstrained_array_definition?: (ctx: Constrained_array_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.constrained_array_definition`.
	 * @param ctx the parse tree
	 */
	exitConstrained_array_definition?: (ctx: Constrained_array_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.constrained_nature_definition`.
	 * @param ctx the parse tree
	 */
	enterConstrained_nature_definition?: (ctx: Constrained_nature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.constrained_nature_definition`.
	 * @param ctx the parse tree
	 */
	exitConstrained_nature_definition?: (ctx: Constrained_nature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.constraint`.
	 * @param ctx the parse tree
	 */
	enterConstraint?: (ctx: ConstraintContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.constraint`.
	 * @param ctx the parse tree
	 */
	exitConstraint?: (ctx: ConstraintContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.context_clause`.
	 * @param ctx the parse tree
	 */
	enterContext_clause?: (ctx: Context_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.context_clause`.
	 * @param ctx the parse tree
	 */
	exitContext_clause?: (ctx: Context_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.context_item`.
	 * @param ctx the parse tree
	 */
	enterContext_item?: (ctx: Context_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.context_item`.
	 * @param ctx the parse tree
	 */
	exitContext_item?: (ctx: Context_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.delay_mechanism`.
	 * @param ctx the parse tree
	 */
	enterDelay_mechanism?: (ctx: Delay_mechanismContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.delay_mechanism`.
	 * @param ctx the parse tree
	 */
	exitDelay_mechanism?: (ctx: Delay_mechanismContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.design_file`.
	 * @param ctx the parse tree
	 */
	enterDesign_file?: (ctx: Design_fileContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.design_file`.
	 * @param ctx the parse tree
	 */
	exitDesign_file?: (ctx: Design_fileContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.design_unit`.
	 * @param ctx the parse tree
	 */
	enterDesign_unit?: (ctx: Design_unitContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.design_unit`.
	 * @param ctx the parse tree
	 */
	exitDesign_unit?: (ctx: Design_unitContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.designator`.
	 * @param ctx the parse tree
	 */
	enterDesignator?: (ctx: DesignatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.designator`.
	 * @param ctx the parse tree
	 */
	exitDesignator?: (ctx: DesignatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.direction`.
	 * @param ctx the parse tree
	 */
	enterDirection?: (ctx: DirectionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.direction`.
	 * @param ctx the parse tree
	 */
	exitDirection?: (ctx: DirectionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.disconnection_specification`.
	 * @param ctx the parse tree
	 */
	enterDisconnection_specification?: (ctx: Disconnection_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.disconnection_specification`.
	 * @param ctx the parse tree
	 */
	exitDisconnection_specification?: (ctx: Disconnection_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.discrete_range`.
	 * @param ctx the parse tree
	 */
	enterDiscrete_range?: (ctx: Discrete_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.discrete_range`.
	 * @param ctx the parse tree
	 */
	exitDiscrete_range?: (ctx: Discrete_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.element_association`.
	 * @param ctx the parse tree
	 */
	enterElement_association?: (ctx: Element_associationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.element_association`.
	 * @param ctx the parse tree
	 */
	exitElement_association?: (ctx: Element_associationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.element_declaration`.
	 * @param ctx the parse tree
	 */
	enterElement_declaration?: (ctx: Element_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.element_declaration`.
	 * @param ctx the parse tree
	 */
	exitElement_declaration?: (ctx: Element_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.element_subnature_definition`.
	 * @param ctx the parse tree
	 */
	enterElement_subnature_definition?: (ctx: Element_subnature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.element_subnature_definition`.
	 * @param ctx the parse tree
	 */
	exitElement_subnature_definition?: (ctx: Element_subnature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.element_subtype_definition`.
	 * @param ctx the parse tree
	 */
	enterElement_subtype_definition?: (ctx: Element_subtype_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.element_subtype_definition`.
	 * @param ctx the parse tree
	 */
	exitElement_subtype_definition?: (ctx: Element_subtype_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_aspect`.
	 * @param ctx the parse tree
	 */
	enterEntity_aspect?: (ctx: Entity_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_aspect`.
	 * @param ctx the parse tree
	 */
	exitEntity_aspect?: (ctx: Entity_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_class`.
	 * @param ctx the parse tree
	 */
	enterEntity_class?: (ctx: Entity_classContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_class`.
	 * @param ctx the parse tree
	 */
	exitEntity_class?: (ctx: Entity_classContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_class_entry`.
	 * @param ctx the parse tree
	 */
	enterEntity_class_entry?: (ctx: Entity_class_entryContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_class_entry`.
	 * @param ctx the parse tree
	 */
	exitEntity_class_entry?: (ctx: Entity_class_entryContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_class_entry_list`.
	 * @param ctx the parse tree
	 */
	enterEntity_class_entry_list?: (ctx: Entity_class_entry_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_class_entry_list`.
	 * @param ctx the parse tree
	 */
	exitEntity_class_entry_list?: (ctx: Entity_class_entry_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_declaration`.
	 * @param ctx the parse tree
	 */
	enterEntity_declaration?: (ctx: Entity_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_declaration`.
	 * @param ctx the parse tree
	 */
	exitEntity_declaration?: (ctx: Entity_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterEntity_declarative_item?: (ctx: Entity_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitEntity_declarative_item?: (ctx: Entity_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterEntity_declarative_part?: (ctx: Entity_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitEntity_declarative_part?: (ctx: Entity_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_designator`.
	 * @param ctx the parse tree
	 */
	enterEntity_designator?: (ctx: Entity_designatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_designator`.
	 * @param ctx the parse tree
	 */
	exitEntity_designator?: (ctx: Entity_designatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_header`.
	 * @param ctx the parse tree
	 */
	enterEntity_header?: (ctx: Entity_headerContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_header`.
	 * @param ctx the parse tree
	 */
	exitEntity_header?: (ctx: Entity_headerContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_name_list`.
	 * @param ctx the parse tree
	 */
	enterEntity_name_list?: (ctx: Entity_name_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_name_list`.
	 * @param ctx the parse tree
	 */
	exitEntity_name_list?: (ctx: Entity_name_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_specification`.
	 * @param ctx the parse tree
	 */
	enterEntity_specification?: (ctx: Entity_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_specification`.
	 * @param ctx the parse tree
	 */
	exitEntity_specification?: (ctx: Entity_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_statement`.
	 * @param ctx the parse tree
	 */
	enterEntity_statement?: (ctx: Entity_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_statement`.
	 * @param ctx the parse tree
	 */
	exitEntity_statement?: (ctx: Entity_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_statement_part`.
	 * @param ctx the parse tree
	 */
	enterEntity_statement_part?: (ctx: Entity_statement_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_statement_part`.
	 * @param ctx the parse tree
	 */
	exitEntity_statement_part?: (ctx: Entity_statement_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.entity_tag`.
	 * @param ctx the parse tree
	 */
	enterEntity_tag?: (ctx: Entity_tagContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.entity_tag`.
	 * @param ctx the parse tree
	 */
	exitEntity_tag?: (ctx: Entity_tagContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.enumeration_literal`.
	 * @param ctx the parse tree
	 */
	enterEnumeration_literal?: (ctx: Enumeration_literalContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.enumeration_literal`.
	 * @param ctx the parse tree
	 */
	exitEnumeration_literal?: (ctx: Enumeration_literalContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.enumeration_type_definition`.
	 * @param ctx the parse tree
	 */
	enterEnumeration_type_definition?: (ctx: Enumeration_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.enumeration_type_definition`.
	 * @param ctx the parse tree
	 */
	exitEnumeration_type_definition?: (ctx: Enumeration_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.exit_statement`.
	 * @param ctx the parse tree
	 */
	enterExit_statement?: (ctx: Exit_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.exit_statement`.
	 * @param ctx the parse tree
	 */
	exitExit_statement?: (ctx: Exit_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.factor`.
	 * @param ctx the parse tree
	 */
	enterFactor?: (ctx: FactorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.factor`.
	 * @param ctx the parse tree
	 */
	exitFactor?: (ctx: FactorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.file_declaration`.
	 * @param ctx the parse tree
	 */
	enterFile_declaration?: (ctx: File_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.file_declaration`.
	 * @param ctx the parse tree
	 */
	exitFile_declaration?: (ctx: File_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.file_logical_name`.
	 * @param ctx the parse tree
	 */
	enterFile_logical_name?: (ctx: File_logical_nameContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.file_logical_name`.
	 * @param ctx the parse tree
	 */
	exitFile_logical_name?: (ctx: File_logical_nameContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.file_open_information`.
	 * @param ctx the parse tree
	 */
	enterFile_open_information?: (ctx: File_open_informationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.file_open_information`.
	 * @param ctx the parse tree
	 */
	exitFile_open_information?: (ctx: File_open_informationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.file_type_definition`.
	 * @param ctx the parse tree
	 */
	enterFile_type_definition?: (ctx: File_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.file_type_definition`.
	 * @param ctx the parse tree
	 */
	exitFile_type_definition?: (ctx: File_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.formal_parameter_list`.
	 * @param ctx the parse tree
	 */
	enterFormal_parameter_list?: (ctx: Formal_parameter_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.formal_parameter_list`.
	 * @param ctx the parse tree
	 */
	exitFormal_parameter_list?: (ctx: Formal_parameter_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.formal_part`.
	 * @param ctx the parse tree
	 */
	enterFormal_part?: (ctx: Formal_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.formal_part`.
	 * @param ctx the parse tree
	 */
	exitFormal_part?: (ctx: Formal_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.free_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	enterFree_quantity_declaration?: (ctx: Free_quantity_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.free_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	exitFree_quantity_declaration?: (ctx: Free_quantity_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.generate_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_statement?: (ctx: Generate_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.generate_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_statement?: (ctx: Generate_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.generation_scheme`.
	 * @param ctx the parse tree
	 */
	enterGeneration_scheme?: (ctx: Generation_schemeContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.generation_scheme`.
	 * @param ctx the parse tree
	 */
	exitGeneration_scheme?: (ctx: Generation_schemeContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.generic_clause`.
	 * @param ctx the parse tree
	 */
	enterGeneric_clause?: (ctx: Generic_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.generic_clause`.
	 * @param ctx the parse tree
	 */
	exitGeneric_clause?: (ctx: Generic_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.generic_list`.
	 * @param ctx the parse tree
	 */
	enterGeneric_list?: (ctx: Generic_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.generic_list`.
	 * @param ctx the parse tree
	 */
	exitGeneric_list?: (ctx: Generic_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.generic_map_aspect`.
	 * @param ctx the parse tree
	 */
	enterGeneric_map_aspect?: (ctx: Generic_map_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.generic_map_aspect`.
	 * @param ctx the parse tree
	 */
	exitGeneric_map_aspect?: (ctx: Generic_map_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.group_constituent`.
	 * @param ctx the parse tree
	 */
	enterGroup_constituent?: (ctx: Group_constituentContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.group_constituent`.
	 * @param ctx the parse tree
	 */
	exitGroup_constituent?: (ctx: Group_constituentContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.group_constituent_list`.
	 * @param ctx the parse tree
	 */
	enterGroup_constituent_list?: (ctx: Group_constituent_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.group_constituent_list`.
	 * @param ctx the parse tree
	 */
	exitGroup_constituent_list?: (ctx: Group_constituent_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.group_declaration`.
	 * @param ctx the parse tree
	 */
	enterGroup_declaration?: (ctx: Group_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.group_declaration`.
	 * @param ctx the parse tree
	 */
	exitGroup_declaration?: (ctx: Group_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.group_template_declaration`.
	 * @param ctx the parse tree
	 */
	enterGroup_template_declaration?: (ctx: Group_template_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.group_template_declaration`.
	 * @param ctx the parse tree
	 */
	exitGroup_template_declaration?: (ctx: Group_template_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.guarded_signal_specification`.
	 * @param ctx the parse tree
	 */
	enterGuarded_signal_specification?: (ctx: Guarded_signal_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.guarded_signal_specification`.
	 * @param ctx the parse tree
	 */
	exitGuarded_signal_specification?: (ctx: Guarded_signal_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.identifier_list`.
	 * @param ctx the parse tree
	 */
	enterIdentifier_list?: (ctx: Identifier_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.identifier_list`.
	 * @param ctx the parse tree
	 */
	exitIdentifier_list?: (ctx: Identifier_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.if_statement`.
	 * @param ctx the parse tree
	 */
	enterIf_statement?: (ctx: If_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.if_statement`.
	 * @param ctx the parse tree
	 */
	exitIf_statement?: (ctx: If_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.index_constraint`.
	 * @param ctx the parse tree
	 */
	enterIndex_constraint?: (ctx: Index_constraintContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.index_constraint`.
	 * @param ctx the parse tree
	 */
	exitIndex_constraint?: (ctx: Index_constraintContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.index_specification`.
	 * @param ctx the parse tree
	 */
	enterIndex_specification?: (ctx: Index_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.index_specification`.
	 * @param ctx the parse tree
	 */
	exitIndex_specification?: (ctx: Index_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.index_subtype_definition`.
	 * @param ctx the parse tree
	 */
	enterIndex_subtype_definition?: (ctx: Index_subtype_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.index_subtype_definition`.
	 * @param ctx the parse tree
	 */
	exitIndex_subtype_definition?: (ctx: Index_subtype_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.instantiated_unit`.
	 * @param ctx the parse tree
	 */
	enterInstantiated_unit?: (ctx: Instantiated_unitContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.instantiated_unit`.
	 * @param ctx the parse tree
	 */
	exitInstantiated_unit?: (ctx: Instantiated_unitContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.instantiation_list`.
	 * @param ctx the parse tree
	 */
	enterInstantiation_list?: (ctx: Instantiation_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.instantiation_list`.
	 * @param ctx the parse tree
	 */
	exitInstantiation_list?: (ctx: Instantiation_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_constant_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_constant_declaration?: (ctx: Interface_constant_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_constant_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_constant_declaration?: (ctx: Interface_constant_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_declaration?: (ctx: Interface_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_declaration?: (ctx: Interface_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_element`.
	 * @param ctx the parse tree
	 */
	enterInterface_element?: (ctx: Interface_elementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_element`.
	 * @param ctx the parse tree
	 */
	exitInterface_element?: (ctx: Interface_elementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_file_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_file_declaration?: (ctx: Interface_file_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_file_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_file_declaration?: (ctx: Interface_file_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_signal_list`.
	 * @param ctx the parse tree
	 */
	enterInterface_signal_list?: (ctx: Interface_signal_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_signal_list`.
	 * @param ctx the parse tree
	 */
	exitInterface_signal_list?: (ctx: Interface_signal_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_port_list`.
	 * @param ctx the parse tree
	 */
	enterInterface_port_list?: (ctx: Interface_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_port_list`.
	 * @param ctx the parse tree
	 */
	exitInterface_port_list?: (ctx: Interface_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_list`.
	 * @param ctx the parse tree
	 */
	enterInterface_list?: (ctx: Interface_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_list`.
	 * @param ctx the parse tree
	 */
	exitInterface_list?: (ctx: Interface_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_quantity_declaration?: (ctx: Interface_quantity_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_quantity_declaration?: (ctx: Interface_quantity_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_port_declaration?: (ctx: Interface_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_port_declaration?: (ctx: Interface_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_signal_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_signal_declaration?: (ctx: Interface_signal_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_signal_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_signal_declaration?: (ctx: Interface_signal_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_terminal_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_terminal_declaration?: (ctx: Interface_terminal_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_terminal_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_terminal_declaration?: (ctx: Interface_terminal_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.interface_variable_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_variable_declaration?: (ctx: Interface_variable_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.interface_variable_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_variable_declaration?: (ctx: Interface_variable_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.iteration_scheme`.
	 * @param ctx the parse tree
	 */
	enterIteration_scheme?: (ctx: Iteration_schemeContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.iteration_scheme`.
	 * @param ctx the parse tree
	 */
	exitIteration_scheme?: (ctx: Iteration_schemeContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.label_colon`.
	 * @param ctx the parse tree
	 */
	enterLabel_colon?: (ctx: Label_colonContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.label_colon`.
	 * @param ctx the parse tree
	 */
	exitLabel_colon?: (ctx: Label_colonContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.library_clause`.
	 * @param ctx the parse tree
	 */
	enterLibrary_clause?: (ctx: Library_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.library_clause`.
	 * @param ctx the parse tree
	 */
	exitLibrary_clause?: (ctx: Library_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.library_unit`.
	 * @param ctx the parse tree
	 */
	enterLibrary_unit?: (ctx: Library_unitContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.library_unit`.
	 * @param ctx the parse tree
	 */
	exitLibrary_unit?: (ctx: Library_unitContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.logical_name`.
	 * @param ctx the parse tree
	 */
	enterLogical_name?: (ctx: Logical_nameContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.logical_name`.
	 * @param ctx the parse tree
	 */
	exitLogical_name?: (ctx: Logical_nameContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.logical_name_list`.
	 * @param ctx the parse tree
	 */
	enterLogical_name_list?: (ctx: Logical_name_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.logical_name_list`.
	 * @param ctx the parse tree
	 */
	exitLogical_name_list?: (ctx: Logical_name_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.logical_operator`.
	 * @param ctx the parse tree
	 */
	enterLogical_operator?: (ctx: Logical_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.logical_operator`.
	 * @param ctx the parse tree
	 */
	exitLogical_operator?: (ctx: Logical_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.loop_statement`.
	 * @param ctx the parse tree
	 */
	enterLoop_statement?: (ctx: Loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.loop_statement`.
	 * @param ctx the parse tree
	 */
	exitLoop_statement?: (ctx: Loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.signal_mode`.
	 * @param ctx the parse tree
	 */
	enterSignal_mode?: (ctx: Signal_modeContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.signal_mode`.
	 * @param ctx the parse tree
	 */
	exitSignal_mode?: (ctx: Signal_modeContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.multiplying_operator`.
	 * @param ctx the parse tree
	 */
	enterMultiplying_operator?: (ctx: Multiplying_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.multiplying_operator`.
	 * @param ctx the parse tree
	 */
	exitMultiplying_operator?: (ctx: Multiplying_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.name`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.name`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.name_part`.
	 * @param ctx the parse tree
	 */
	enterName_part?: (ctx: Name_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.name_part`.
	 * @param ctx the parse tree
	 */
	exitName_part?: (ctx: Name_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.selected_name`.
	 * @param ctx the parse tree
	 */
	enterSelected_name?: (ctx: Selected_nameContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.selected_name`.
	 * @param ctx the parse tree
	 */
	exitSelected_name?: (ctx: Selected_nameContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.selected_name_part`.
	 * @param ctx the parse tree
	 */
	enterSelected_name_part?: (ctx: Selected_name_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.selected_name_part`.
	 * @param ctx the parse tree
	 */
	exitSelected_name_part?: (ctx: Selected_name_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.function_call_or_indexed_name_part`.
	 * @param ctx the parse tree
	 */
	enterFunction_call_or_indexed_name_part?: (ctx: Function_call_or_indexed_name_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.function_call_or_indexed_name_part`.
	 * @param ctx the parse tree
	 */
	exitFunction_call_or_indexed_name_part?: (ctx: Function_call_or_indexed_name_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.slice_name_part`.
	 * @param ctx the parse tree
	 */
	enterSlice_name_part?: (ctx: Slice_name_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.slice_name_part`.
	 * @param ctx the parse tree
	 */
	exitSlice_name_part?: (ctx: Slice_name_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.attribute_name_part`.
	 * @param ctx the parse tree
	 */
	enterAttribute_name_part?: (ctx: Attribute_name_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.attribute_name_part`.
	 * @param ctx the parse tree
	 */
	exitAttribute_name_part?: (ctx: Attribute_name_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.nature_declaration`.
	 * @param ctx the parse tree
	 */
	enterNature_declaration?: (ctx: Nature_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.nature_declaration`.
	 * @param ctx the parse tree
	 */
	exitNature_declaration?: (ctx: Nature_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.nature_definition`.
	 * @param ctx the parse tree
	 */
	enterNature_definition?: (ctx: Nature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.nature_definition`.
	 * @param ctx the parse tree
	 */
	exitNature_definition?: (ctx: Nature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.nature_element_declaration`.
	 * @param ctx the parse tree
	 */
	enterNature_element_declaration?: (ctx: Nature_element_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.nature_element_declaration`.
	 * @param ctx the parse tree
	 */
	exitNature_element_declaration?: (ctx: Nature_element_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.next_statement`.
	 * @param ctx the parse tree
	 */
	enterNext_statement?: (ctx: Next_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.next_statement`.
	 * @param ctx the parse tree
	 */
	exitNext_statement?: (ctx: Next_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.numeric_literal`.
	 * @param ctx the parse tree
	 */
	enterNumeric_literal?: (ctx: Numeric_literalContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.numeric_literal`.
	 * @param ctx the parse tree
	 */
	exitNumeric_literal?: (ctx: Numeric_literalContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.object_declaration`.
	 * @param ctx the parse tree
	 */
	enterObject_declaration?: (ctx: Object_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.object_declaration`.
	 * @param ctx the parse tree
	 */
	exitObject_declaration?: (ctx: Object_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.opts`.
	 * @param ctx the parse tree
	 */
	enterOpts?: (ctx: OptsContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.opts`.
	 * @param ctx the parse tree
	 */
	exitOpts?: (ctx: OptsContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.package_body`.
	 * @param ctx the parse tree
	 */
	enterPackage_body?: (ctx: Package_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.package_body`.
	 * @param ctx the parse tree
	 */
	exitPackage_body?: (ctx: Package_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.package_body_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterPackage_body_declarative_item?: (ctx: Package_body_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.package_body_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitPackage_body_declarative_item?: (ctx: Package_body_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.package_body_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterPackage_body_declarative_part?: (ctx: Package_body_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.package_body_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitPackage_body_declarative_part?: (ctx: Package_body_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.package_declaration`.
	 * @param ctx the parse tree
	 */
	enterPackage_declaration?: (ctx: Package_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.package_declaration`.
	 * @param ctx the parse tree
	 */
	exitPackage_declaration?: (ctx: Package_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.package_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterPackage_declarative_item?: (ctx: Package_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.package_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitPackage_declarative_item?: (ctx: Package_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.package_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterPackage_declarative_part?: (ctx: Package_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.package_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitPackage_declarative_part?: (ctx: Package_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.parameter_specification`.
	 * @param ctx the parse tree
	 */
	enterParameter_specification?: (ctx: Parameter_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.parameter_specification`.
	 * @param ctx the parse tree
	 */
	exitParameter_specification?: (ctx: Parameter_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.physical_literal`.
	 * @param ctx the parse tree
	 */
	enterPhysical_literal?: (ctx: Physical_literalContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.physical_literal`.
	 * @param ctx the parse tree
	 */
	exitPhysical_literal?: (ctx: Physical_literalContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.physical_type_definition`.
	 * @param ctx the parse tree
	 */
	enterPhysical_type_definition?: (ctx: Physical_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.physical_type_definition`.
	 * @param ctx the parse tree
	 */
	exitPhysical_type_definition?: (ctx: Physical_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.port_clause`.
	 * @param ctx the parse tree
	 */
	enterPort_clause?: (ctx: Port_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.port_clause`.
	 * @param ctx the parse tree
	 */
	exitPort_clause?: (ctx: Port_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.port_list`.
	 * @param ctx the parse tree
	 */
	enterPort_list?: (ctx: Port_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.port_list`.
	 * @param ctx the parse tree
	 */
	exitPort_list?: (ctx: Port_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.port_map_aspect`.
	 * @param ctx the parse tree
	 */
	enterPort_map_aspect?: (ctx: Port_map_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.port_map_aspect`.
	 * @param ctx the parse tree
	 */
	exitPort_map_aspect?: (ctx: Port_map_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.primary_unit`.
	 * @param ctx the parse tree
	 */
	enterPrimary_unit?: (ctx: Primary_unitContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.primary_unit`.
	 * @param ctx the parse tree
	 */
	exitPrimary_unit?: (ctx: Primary_unitContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.procedural_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterProcedural_declarative_item?: (ctx: Procedural_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.procedural_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitProcedural_declarative_item?: (ctx: Procedural_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.procedural_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterProcedural_declarative_part?: (ctx: Procedural_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.procedural_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitProcedural_declarative_part?: (ctx: Procedural_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.procedural_statement_part`.
	 * @param ctx the parse tree
	 */
	enterProcedural_statement_part?: (ctx: Procedural_statement_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.procedural_statement_part`.
	 * @param ctx the parse tree
	 */
	exitProcedural_statement_part?: (ctx: Procedural_statement_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.procedure_call`.
	 * @param ctx the parse tree
	 */
	enterProcedure_call?: (ctx: Procedure_callContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.procedure_call`.
	 * @param ctx the parse tree
	 */
	exitProcedure_call?: (ctx: Procedure_callContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.procedure_call_statement`.
	 * @param ctx the parse tree
	 */
	enterProcedure_call_statement?: (ctx: Procedure_call_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.procedure_call_statement`.
	 * @param ctx the parse tree
	 */
	exitProcedure_call_statement?: (ctx: Procedure_call_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.process_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterProcess_declarative_item?: (ctx: Process_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.process_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitProcess_declarative_item?: (ctx: Process_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.process_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterProcess_declarative_part?: (ctx: Process_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.process_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitProcess_declarative_part?: (ctx: Process_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.process_statement`.
	 * @param ctx the parse tree
	 */
	enterProcess_statement?: (ctx: Process_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.process_statement`.
	 * @param ctx the parse tree
	 */
	exitProcess_statement?: (ctx: Process_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.process_statement_part`.
	 * @param ctx the parse tree
	 */
	enterProcess_statement_part?: (ctx: Process_statement_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.process_statement_part`.
	 * @param ctx the parse tree
	 */
	exitProcess_statement_part?: (ctx: Process_statement_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.qualified_expression`.
	 * @param ctx the parse tree
	 */
	enterQualified_expression?: (ctx: Qualified_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.qualified_expression`.
	 * @param ctx the parse tree
	 */
	exitQualified_expression?: (ctx: Qualified_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.quantity_declaration`.
	 * @param ctx the parse tree
	 */
	enterQuantity_declaration?: (ctx: Quantity_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.quantity_declaration`.
	 * @param ctx the parse tree
	 */
	exitQuantity_declaration?: (ctx: Quantity_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.quantity_list`.
	 * @param ctx the parse tree
	 */
	enterQuantity_list?: (ctx: Quantity_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.quantity_list`.
	 * @param ctx the parse tree
	 */
	exitQuantity_list?: (ctx: Quantity_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.quantity_specification`.
	 * @param ctx the parse tree
	 */
	enterQuantity_specification?: (ctx: Quantity_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.quantity_specification`.
	 * @param ctx the parse tree
	 */
	exitQuantity_specification?: (ctx: Quantity_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.range_decl`.
	 * @param ctx the parse tree
	 */
	enterRange_decl?: (ctx: Range_declContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.range_decl`.
	 * @param ctx the parse tree
	 */
	exitRange_decl?: (ctx: Range_declContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.explicit_range`.
	 * @param ctx the parse tree
	 */
	enterExplicit_range?: (ctx: Explicit_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.explicit_range`.
	 * @param ctx the parse tree
	 */
	exitExplicit_range?: (ctx: Explicit_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.range_constraint`.
	 * @param ctx the parse tree
	 */
	enterRange_constraint?: (ctx: Range_constraintContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.range_constraint`.
	 * @param ctx the parse tree
	 */
	exitRange_constraint?: (ctx: Range_constraintContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.record_nature_definition`.
	 * @param ctx the parse tree
	 */
	enterRecord_nature_definition?: (ctx: Record_nature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.record_nature_definition`.
	 * @param ctx the parse tree
	 */
	exitRecord_nature_definition?: (ctx: Record_nature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.record_type_definition`.
	 * @param ctx the parse tree
	 */
	enterRecord_type_definition?: (ctx: Record_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.record_type_definition`.
	 * @param ctx the parse tree
	 */
	exitRecord_type_definition?: (ctx: Record_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.relation`.
	 * @param ctx the parse tree
	 */
	enterRelation?: (ctx: RelationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.relation`.
	 * @param ctx the parse tree
	 */
	exitRelation?: (ctx: RelationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.relational_operator`.
	 * @param ctx the parse tree
	 */
	enterRelational_operator?: (ctx: Relational_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.relational_operator`.
	 * @param ctx the parse tree
	 */
	exitRelational_operator?: (ctx: Relational_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.report_statement`.
	 * @param ctx the parse tree
	 */
	enterReport_statement?: (ctx: Report_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.report_statement`.
	 * @param ctx the parse tree
	 */
	exitReport_statement?: (ctx: Report_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.return_statement`.
	 * @param ctx the parse tree
	 */
	enterReturn_statement?: (ctx: Return_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.return_statement`.
	 * @param ctx the parse tree
	 */
	exitReturn_statement?: (ctx: Return_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.scalar_nature_definition`.
	 * @param ctx the parse tree
	 */
	enterScalar_nature_definition?: (ctx: Scalar_nature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.scalar_nature_definition`.
	 * @param ctx the parse tree
	 */
	exitScalar_nature_definition?: (ctx: Scalar_nature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.scalar_type_definition`.
	 * @param ctx the parse tree
	 */
	enterScalar_type_definition?: (ctx: Scalar_type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.scalar_type_definition`.
	 * @param ctx the parse tree
	 */
	exitScalar_type_definition?: (ctx: Scalar_type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.secondary_unit`.
	 * @param ctx the parse tree
	 */
	enterSecondary_unit?: (ctx: Secondary_unitContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.secondary_unit`.
	 * @param ctx the parse tree
	 */
	exitSecondary_unit?: (ctx: Secondary_unitContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.secondary_unit_declaration`.
	 * @param ctx the parse tree
	 */
	enterSecondary_unit_declaration?: (ctx: Secondary_unit_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.secondary_unit_declaration`.
	 * @param ctx the parse tree
	 */
	exitSecondary_unit_declaration?: (ctx: Secondary_unit_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.selected_signal_assignment`.
	 * @param ctx the parse tree
	 */
	enterSelected_signal_assignment?: (ctx: Selected_signal_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.selected_signal_assignment`.
	 * @param ctx the parse tree
	 */
	exitSelected_signal_assignment?: (ctx: Selected_signal_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.selected_waveforms`.
	 * @param ctx the parse tree
	 */
	enterSelected_waveforms?: (ctx: Selected_waveformsContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.selected_waveforms`.
	 * @param ctx the parse tree
	 */
	exitSelected_waveforms?: (ctx: Selected_waveformsContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.sensitivity_clause`.
	 * @param ctx the parse tree
	 */
	enterSensitivity_clause?: (ctx: Sensitivity_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.sensitivity_clause`.
	 * @param ctx the parse tree
	 */
	exitSensitivity_clause?: (ctx: Sensitivity_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.sensitivity_list`.
	 * @param ctx the parse tree
	 */
	enterSensitivity_list?: (ctx: Sensitivity_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.sensitivity_list`.
	 * @param ctx the parse tree
	 */
	exitSensitivity_list?: (ctx: Sensitivity_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.sequence_of_statements`.
	 * @param ctx the parse tree
	 */
	enterSequence_of_statements?: (ctx: Sequence_of_statementsContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.sequence_of_statements`.
	 * @param ctx the parse tree
	 */
	exitSequence_of_statements?: (ctx: Sequence_of_statementsContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.sequential_statement`.
	 * @param ctx the parse tree
	 */
	enterSequential_statement?: (ctx: Sequential_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.sequential_statement`.
	 * @param ctx the parse tree
	 */
	exitSequential_statement?: (ctx: Sequential_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.shift_expression`.
	 * @param ctx the parse tree
	 */
	enterShift_expression?: (ctx: Shift_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.shift_expression`.
	 * @param ctx the parse tree
	 */
	exitShift_expression?: (ctx: Shift_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.shift_operator`.
	 * @param ctx the parse tree
	 */
	enterShift_operator?: (ctx: Shift_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.shift_operator`.
	 * @param ctx the parse tree
	 */
	exitShift_operator?: (ctx: Shift_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.signal_assignment_statement`.
	 * @param ctx the parse tree
	 */
	enterSignal_assignment_statement?: (ctx: Signal_assignment_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.signal_assignment_statement`.
	 * @param ctx the parse tree
	 */
	exitSignal_assignment_statement?: (ctx: Signal_assignment_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.signal_declaration`.
	 * @param ctx the parse tree
	 */
	enterSignal_declaration?: (ctx: Signal_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.signal_declaration`.
	 * @param ctx the parse tree
	 */
	exitSignal_declaration?: (ctx: Signal_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.signal_kind`.
	 * @param ctx the parse tree
	 */
	enterSignal_kind?: (ctx: Signal_kindContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.signal_kind`.
	 * @param ctx the parse tree
	 */
	exitSignal_kind?: (ctx: Signal_kindContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.signal_list`.
	 * @param ctx the parse tree
	 */
	enterSignal_list?: (ctx: Signal_listContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.signal_list`.
	 * @param ctx the parse tree
	 */
	exitSignal_list?: (ctx: Signal_listContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.signature`.
	 * @param ctx the parse tree
	 */
	enterSignature?: (ctx: SignatureContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.signature`.
	 * @param ctx the parse tree
	 */
	exitSignature?: (ctx: SignatureContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simple_expression`.
	 * @param ctx the parse tree
	 */
	enterSimple_expression?: (ctx: Simple_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simple_expression`.
	 * @param ctx the parse tree
	 */
	exitSimple_expression?: (ctx: Simple_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simple_simultaneous_statement`.
	 * @param ctx the parse tree
	 */
	enterSimple_simultaneous_statement?: (ctx: Simple_simultaneous_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simple_simultaneous_statement`.
	 * @param ctx the parse tree
	 */
	exitSimple_simultaneous_statement?: (ctx: Simple_simultaneous_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simultaneous_alternative`.
	 * @param ctx the parse tree
	 */
	enterSimultaneous_alternative?: (ctx: Simultaneous_alternativeContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simultaneous_alternative`.
	 * @param ctx the parse tree
	 */
	exitSimultaneous_alternative?: (ctx: Simultaneous_alternativeContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simultaneous_case_statement`.
	 * @param ctx the parse tree
	 */
	enterSimultaneous_case_statement?: (ctx: Simultaneous_case_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simultaneous_case_statement`.
	 * @param ctx the parse tree
	 */
	exitSimultaneous_case_statement?: (ctx: Simultaneous_case_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simultaneous_if_statement`.
	 * @param ctx the parse tree
	 */
	enterSimultaneous_if_statement?: (ctx: Simultaneous_if_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simultaneous_if_statement`.
	 * @param ctx the parse tree
	 */
	exitSimultaneous_if_statement?: (ctx: Simultaneous_if_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simultaneous_procedural_statement`.
	 * @param ctx the parse tree
	 */
	enterSimultaneous_procedural_statement?: (ctx: Simultaneous_procedural_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simultaneous_procedural_statement`.
	 * @param ctx the parse tree
	 */
	exitSimultaneous_procedural_statement?: (ctx: Simultaneous_procedural_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simultaneous_statement`.
	 * @param ctx the parse tree
	 */
	enterSimultaneous_statement?: (ctx: Simultaneous_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simultaneous_statement`.
	 * @param ctx the parse tree
	 */
	exitSimultaneous_statement?: (ctx: Simultaneous_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.simultaneous_statement_part`.
	 * @param ctx the parse tree
	 */
	enterSimultaneous_statement_part?: (ctx: Simultaneous_statement_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.simultaneous_statement_part`.
	 * @param ctx the parse tree
	 */
	exitSimultaneous_statement_part?: (ctx: Simultaneous_statement_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.source_aspect`.
	 * @param ctx the parse tree
	 */
	enterSource_aspect?: (ctx: Source_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.source_aspect`.
	 * @param ctx the parse tree
	 */
	exitSource_aspect?: (ctx: Source_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.source_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	enterSource_quantity_declaration?: (ctx: Source_quantity_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.source_quantity_declaration`.
	 * @param ctx the parse tree
	 */
	exitSource_quantity_declaration?: (ctx: Source_quantity_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.step_limit_specification`.
	 * @param ctx the parse tree
	 */
	enterStep_limit_specification?: (ctx: Step_limit_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.step_limit_specification`.
	 * @param ctx the parse tree
	 */
	exitStep_limit_specification?: (ctx: Step_limit_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subnature_declaration`.
	 * @param ctx the parse tree
	 */
	enterSubnature_declaration?: (ctx: Subnature_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subnature_declaration`.
	 * @param ctx the parse tree
	 */
	exitSubnature_declaration?: (ctx: Subnature_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subnature_indication`.
	 * @param ctx the parse tree
	 */
	enterSubnature_indication?: (ctx: Subnature_indicationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subnature_indication`.
	 * @param ctx the parse tree
	 */
	exitSubnature_indication?: (ctx: Subnature_indicationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subprogram_body`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_body?: (ctx: Subprogram_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subprogram_body`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_body?: (ctx: Subprogram_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subprogram_declaration`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_declaration?: (ctx: Subprogram_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subprogram_declaration`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_declaration?: (ctx: Subprogram_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subprogram_declarative_item`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_declarative_item?: (ctx: Subprogram_declarative_itemContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subprogram_declarative_item`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_declarative_item?: (ctx: Subprogram_declarative_itemContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subprogram_declarative_part`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_declarative_part?: (ctx: Subprogram_declarative_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subprogram_declarative_part`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_declarative_part?: (ctx: Subprogram_declarative_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subprogram_kind`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_kind?: (ctx: Subprogram_kindContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subprogram_kind`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_kind?: (ctx: Subprogram_kindContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subprogram_specification`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_specification?: (ctx: Subprogram_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subprogram_specification`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_specification?: (ctx: Subprogram_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.procedure_specification`.
	 * @param ctx the parse tree
	 */
	enterProcedure_specification?: (ctx: Procedure_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.procedure_specification`.
	 * @param ctx the parse tree
	 */
	exitProcedure_specification?: (ctx: Procedure_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.function_specification`.
	 * @param ctx the parse tree
	 */
	enterFunction_specification?: (ctx: Function_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.function_specification`.
	 * @param ctx the parse tree
	 */
	exitFunction_specification?: (ctx: Function_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subprogram_statement_part`.
	 * @param ctx the parse tree
	 */
	enterSubprogram_statement_part?: (ctx: Subprogram_statement_partContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subprogram_statement_part`.
	 * @param ctx the parse tree
	 */
	exitSubprogram_statement_part?: (ctx: Subprogram_statement_partContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subtype_declaration`.
	 * @param ctx the parse tree
	 */
	enterSubtype_declaration?: (ctx: Subtype_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subtype_declaration`.
	 * @param ctx the parse tree
	 */
	exitSubtype_declaration?: (ctx: Subtype_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.subtype_indication`.
	 * @param ctx the parse tree
	 */
	enterSubtype_indication?: (ctx: Subtype_indicationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.subtype_indication`.
	 * @param ctx the parse tree
	 */
	exitSubtype_indication?: (ctx: Subtype_indicationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.suffix`.
	 * @param ctx the parse tree
	 */
	enterSuffix?: (ctx: SuffixContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.suffix`.
	 * @param ctx the parse tree
	 */
	exitSuffix?: (ctx: SuffixContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.target`.
	 * @param ctx the parse tree
	 */
	enterTarget?: (ctx: TargetContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.target`.
	 * @param ctx the parse tree
	 */
	exitTarget?: (ctx: TargetContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.term`.
	 * @param ctx the parse tree
	 */
	enterTerm?: (ctx: TermContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.term`.
	 * @param ctx the parse tree
	 */
	exitTerm?: (ctx: TermContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.terminal_aspect`.
	 * @param ctx the parse tree
	 */
	enterTerminal_aspect?: (ctx: Terminal_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.terminal_aspect`.
	 * @param ctx the parse tree
	 */
	exitTerminal_aspect?: (ctx: Terminal_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.terminal_declaration`.
	 * @param ctx the parse tree
	 */
	enterTerminal_declaration?: (ctx: Terminal_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.terminal_declaration`.
	 * @param ctx the parse tree
	 */
	exitTerminal_declaration?: (ctx: Terminal_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.through_aspect`.
	 * @param ctx the parse tree
	 */
	enterThrough_aspect?: (ctx: Through_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.through_aspect`.
	 * @param ctx the parse tree
	 */
	exitThrough_aspect?: (ctx: Through_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.timeout_clause`.
	 * @param ctx the parse tree
	 */
	enterTimeout_clause?: (ctx: Timeout_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.timeout_clause`.
	 * @param ctx the parse tree
	 */
	exitTimeout_clause?: (ctx: Timeout_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.tolerance_aspect`.
	 * @param ctx the parse tree
	 */
	enterTolerance_aspect?: (ctx: Tolerance_aspectContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.tolerance_aspect`.
	 * @param ctx the parse tree
	 */
	exitTolerance_aspect?: (ctx: Tolerance_aspectContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.type_declaration`.
	 * @param ctx the parse tree
	 */
	enterType_declaration?: (ctx: Type_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.type_declaration`.
	 * @param ctx the parse tree
	 */
	exitType_declaration?: (ctx: Type_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.type_definition`.
	 * @param ctx the parse tree
	 */
	enterType_definition?: (ctx: Type_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.type_definition`.
	 * @param ctx the parse tree
	 */
	exitType_definition?: (ctx: Type_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.unconstrained_array_definition`.
	 * @param ctx the parse tree
	 */
	enterUnconstrained_array_definition?: (ctx: Unconstrained_array_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.unconstrained_array_definition`.
	 * @param ctx the parse tree
	 */
	exitUnconstrained_array_definition?: (ctx: Unconstrained_array_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.unconstrained_nature_definition`.
	 * @param ctx the parse tree
	 */
	enterUnconstrained_nature_definition?: (ctx: Unconstrained_nature_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.unconstrained_nature_definition`.
	 * @param ctx the parse tree
	 */
	exitUnconstrained_nature_definition?: (ctx: Unconstrained_nature_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.use_clause`.
	 * @param ctx the parse tree
	 */
	enterUse_clause?: (ctx: Use_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.use_clause`.
	 * @param ctx the parse tree
	 */
	exitUse_clause?: (ctx: Use_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.variable_assignment_statement`.
	 * @param ctx the parse tree
	 */
	enterVariable_assignment_statement?: (ctx: Variable_assignment_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.variable_assignment_statement`.
	 * @param ctx the parse tree
	 */
	exitVariable_assignment_statement?: (ctx: Variable_assignment_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.variable_declaration`.
	 * @param ctx the parse tree
	 */
	enterVariable_declaration?: (ctx: Variable_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.variable_declaration`.
	 * @param ctx the parse tree
	 */
	exitVariable_declaration?: (ctx: Variable_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.wait_statement`.
	 * @param ctx the parse tree
	 */
	enterWait_statement?: (ctx: Wait_statementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.wait_statement`.
	 * @param ctx the parse tree
	 */
	exitWait_statement?: (ctx: Wait_statementContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.waveform`.
	 * @param ctx the parse tree
	 */
	enterWaveform?: (ctx: WaveformContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.waveform`.
	 * @param ctx the parse tree
	 */
	exitWaveform?: (ctx: WaveformContext) => void;

	/**
	 * Enter a parse tree produced by `vhdlParser.waveform_element`.
	 * @param ctx the parse tree
	 */
	enterWaveform_element?: (ctx: Waveform_elementContext) => void;
	/**
	 * Exit a parse tree produced by `vhdlParser.waveform_element`.
	 * @param ctx the parse tree
	 */
	exitWaveform_element?: (ctx: Waveform_elementContext) => void;
}

