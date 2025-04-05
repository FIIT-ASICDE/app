// Generated from app/diagram-test/utils/DiagramGeneration/VHDL/grammar/vhdl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `vhdlParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface vhdlVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `vhdlParser.abstract_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAbstract_literal?: (ctx: Abstract_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.access_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAccess_type_definition?: (ctx: Access_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.across_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAcross_aspect?: (ctx: Across_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.actual_designator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActual_designator?: (ctx: Actual_designatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.actual_parameter_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActual_parameter_part?: (ctx: Actual_parameter_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.actual_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActual_part?: (ctx: Actual_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.adding_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdding_operator?: (ctx: Adding_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.aggregate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggregate?: (ctx: AggregateContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.alias_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlias_declaration?: (ctx: Alias_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.alias_designator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlias_designator?: (ctx: Alias_designatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.alias_indication`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlias_indication?: (ctx: Alias_indicationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.allocator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAllocator?: (ctx: AllocatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.architecture_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArchitecture_body?: (ctx: Architecture_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.architecture_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArchitecture_declarative_part?: (ctx: Architecture_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.architecture_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArchitecture_statement?: (ctx: Architecture_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.architecture_statement_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArchitecture_statement_part?: (ctx: Architecture_statement_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.array_nature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_nature_definition?: (ctx: Array_nature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.array_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_type_definition?: (ctx: Array_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.assertion`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssertion?: (ctx: AssertionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssertion_statement?: (ctx: Assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.association_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssociation_element?: (ctx: Association_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.association_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssociation_list?: (ctx: Association_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.attribute_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute_declaration?: (ctx: Attribute_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.attribute_designator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute_designator?: (ctx: Attribute_designatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.attribute_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute_specification?: (ctx: Attribute_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.base_unit_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBase_unit_declaration?: (ctx: Base_unit_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.binding_indication`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinding_indication?: (ctx: Binding_indicationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.block_configuration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_configuration?: (ctx: Block_configurationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.block_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_declarative_item?: (ctx: Block_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.block_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_declarative_part?: (ctx: Block_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.block_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_header?: (ctx: Block_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.block_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_specification?: (ctx: Block_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.block_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_statement?: (ctx: Block_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.block_statement_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_statement_part?: (ctx: Block_statement_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.branch_quantity_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBranch_quantity_declaration?: (ctx: Branch_quantity_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.break_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_element?: (ctx: Break_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.break_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_list?: (ctx: Break_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.break_selector_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_selector_clause?: (ctx: Break_selector_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.break_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_statement?: (ctx: Break_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.case_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_statement?: (ctx: Case_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.case_statement_alternative`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_statement_alternative?: (ctx: Case_statement_alternativeContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.choice`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChoice?: (ctx: ChoiceContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.choices`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChoices?: (ctx: ChoicesContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.component_configuration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_configuration?: (ctx: Component_configurationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.component_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_declaration?: (ctx: Component_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.component_instantiation_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_instantiation_statement?: (ctx: Component_instantiation_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.component_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_specification?: (ctx: Component_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.composite_nature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComposite_nature_definition?: (ctx: Composite_nature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.composite_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComposite_type_definition?: (ctx: Composite_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.concurrent_assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcurrent_assertion_statement?: (ctx: Concurrent_assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.concurrent_break_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcurrent_break_statement?: (ctx: Concurrent_break_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.concurrent_procedure_call_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcurrent_procedure_call_statement?: (ctx: Concurrent_procedure_call_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.concurrent_signal_assignment_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcurrent_signal_assignment_statement?: (ctx: Concurrent_signal_assignment_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.condition_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition_clause?: (ctx: Condition_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.conditional_signal_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_signal_assignment?: (ctx: Conditional_signal_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.conditional_waveforms`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_waveforms?: (ctx: Conditional_waveformsContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.configuration_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfiguration_declaration?: (ctx: Configuration_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.configuration_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfiguration_declarative_item?: (ctx: Configuration_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.configuration_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfiguration_declarative_part?: (ctx: Configuration_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.configuration_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfiguration_item?: (ctx: Configuration_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.configuration_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfiguration_specification?: (ctx: Configuration_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.constant_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_declaration?: (ctx: Constant_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.constrained_array_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstrained_array_definition?: (ctx: Constrained_array_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.constrained_nature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstrained_nature_definition?: (ctx: Constrained_nature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint?: (ctx: ConstraintContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.context_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContext_clause?: (ctx: Context_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.context_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContext_item?: (ctx: Context_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.delay_mechanism`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay_mechanism?: (ctx: Delay_mechanismContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.design_file`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesign_file?: (ctx: Design_fileContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.design_unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesign_unit?: (ctx: Design_unitContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.designator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesignator?: (ctx: DesignatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirection?: (ctx: DirectionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.disconnection_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisconnection_specification?: (ctx: Disconnection_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.discrete_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiscrete_range?: (ctx: Discrete_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.element_association`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement_association?: (ctx: Element_associationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.element_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement_declaration?: (ctx: Element_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.element_subnature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement_subnature_definition?: (ctx: Element_subnature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.element_subtype_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement_subtype_definition?: (ctx: Element_subtype_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_aspect?: (ctx: Entity_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_class`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_class?: (ctx: Entity_classContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_class_entry`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_class_entry?: (ctx: Entity_class_entryContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_class_entry_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_class_entry_list?: (ctx: Entity_class_entry_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_declaration?: (ctx: Entity_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_declarative_item?: (ctx: Entity_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_declarative_part?: (ctx: Entity_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_designator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_designator?: (ctx: Entity_designatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_header?: (ctx: Entity_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_name_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_name_list?: (ctx: Entity_name_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_specification?: (ctx: Entity_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_statement?: (ctx: Entity_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_statement_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_statement_part?: (ctx: Entity_statement_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.entity_tag`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_tag?: (ctx: Entity_tagContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.enumeration_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumeration_literal?: (ctx: Enumeration_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.enumeration_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumeration_type_definition?: (ctx: Enumeration_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.exit_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExit_statement?: (ctx: Exit_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.factor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFactor?: (ctx: FactorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.file_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFile_declaration?: (ctx: File_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.file_logical_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFile_logical_name?: (ctx: File_logical_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.file_open_information`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFile_open_information?: (ctx: File_open_informationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.file_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFile_type_definition?: (ctx: File_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.formal_parameter_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormal_parameter_list?: (ctx: Formal_parameter_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.formal_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormal_part?: (ctx: Formal_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.free_quantity_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFree_quantity_declaration?: (ctx: Free_quantity_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.generate_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_statement?: (ctx: Generate_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.generation_scheme`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeneration_scheme?: (ctx: Generation_schemeContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.generic_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeneric_clause?: (ctx: Generic_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.generic_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeneric_list?: (ctx: Generic_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.generic_map_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeneric_map_aspect?: (ctx: Generic_map_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.group_constituent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroup_constituent?: (ctx: Group_constituentContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.group_constituent_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroup_constituent_list?: (ctx: Group_constituent_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.group_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroup_declaration?: (ctx: Group_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.group_template_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroup_template_declaration?: (ctx: Group_template_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.guarded_signal_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGuarded_signal_specification?: (ctx: Guarded_signal_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.identifier_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier_list?: (ctx: Identifier_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.if_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_statement?: (ctx: If_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.index_constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_constraint?: (ctx: Index_constraintContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.index_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_specification?: (ctx: Index_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.index_subtype_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_subtype_definition?: (ctx: Index_subtype_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.instantiated_unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstantiated_unit?: (ctx: Instantiated_unitContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.instantiation_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstantiation_list?: (ctx: Instantiation_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_constant_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_constant_declaration?: (ctx: Interface_constant_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_declaration?: (ctx: Interface_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_element?: (ctx: Interface_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_file_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_file_declaration?: (ctx: Interface_file_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_signal_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_signal_list?: (ctx: Interface_signal_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_port_list?: (ctx: Interface_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_list?: (ctx: Interface_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_quantity_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_quantity_declaration?: (ctx: Interface_quantity_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_port_declaration?: (ctx: Interface_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_signal_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_signal_declaration?: (ctx: Interface_signal_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_terminal_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_terminal_declaration?: (ctx: Interface_terminal_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.interface_variable_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_variable_declaration?: (ctx: Interface_variable_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.iteration_scheme`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIteration_scheme?: (ctx: Iteration_schemeContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.label_colon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabel_colon?: (ctx: Label_colonContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.library_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibrary_clause?: (ctx: Library_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.library_unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibrary_unit?: (ctx: Library_unitContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.logical_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogical_name?: (ctx: Logical_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.logical_name_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogical_name_list?: (ctx: Logical_name_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.logical_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogical_operator?: (ctx: Logical_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_statement?: (ctx: Loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.signal_mode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignal_mode?: (ctx: Signal_modeContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.multiplying_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplying_operator?: (ctx: Multiplying_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName?: (ctx: NameContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.name_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName_part?: (ctx: Name_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.selected_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelected_name?: (ctx: Selected_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.selected_name_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelected_name_part?: (ctx: Selected_name_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.function_call_or_indexed_name_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call_or_indexed_name_part?: (ctx: Function_call_or_indexed_name_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.slice_name_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSlice_name_part?: (ctx: Slice_name_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.attribute_name_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute_name_part?: (ctx: Attribute_name_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.nature_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNature_declaration?: (ctx: Nature_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.nature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNature_definition?: (ctx: Nature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.nature_element_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNature_element_declaration?: (ctx: Nature_element_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.next_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNext_statement?: (ctx: Next_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.numeric_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumeric_literal?: (ctx: Numeric_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.object_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObject_declaration?: (ctx: Object_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.opts`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpts?: (ctx: OptsContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.package_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_body?: (ctx: Package_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.package_body_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_body_declarative_item?: (ctx: Package_body_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.package_body_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_body_declarative_part?: (ctx: Package_body_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.package_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_declaration?: (ctx: Package_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.package_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_declarative_item?: (ctx: Package_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.package_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_declarative_part?: (ctx: Package_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.parameter_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_specification?: (ctx: Parameter_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.physical_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPhysical_literal?: (ctx: Physical_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.physical_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPhysical_type_definition?: (ctx: Physical_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.port_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_clause?: (ctx: Port_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_list?: (ctx: Port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.port_map_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_map_aspect?: (ctx: Port_map_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.primary_unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary_unit?: (ctx: Primary_unitContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.procedural_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_declarative_item?: (ctx: Procedural_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.procedural_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_declarative_part?: (ctx: Procedural_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.procedural_statement_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_statement_part?: (ctx: Procedural_statement_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.procedure_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_call?: (ctx: Procedure_callContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.procedure_call_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_call_statement?: (ctx: Procedure_call_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.process_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcess_declarative_item?: (ctx: Process_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.process_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcess_declarative_part?: (ctx: Process_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.process_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcess_statement?: (ctx: Process_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.process_statement_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcess_statement_part?: (ctx: Process_statement_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.qualified_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualified_expression?: (ctx: Qualified_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.quantity_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantity_declaration?: (ctx: Quantity_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.quantity_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantity_list?: (ctx: Quantity_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.quantity_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantity_specification?: (ctx: Quantity_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.range_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRange_decl?: (ctx: Range_declContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.explicit_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplicit_range?: (ctx: Explicit_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.range_constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRange_constraint?: (ctx: Range_constraintContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.record_nature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecord_nature_definition?: (ctx: Record_nature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.record_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecord_type_definition?: (ctx: Record_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.relation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelation?: (ctx: RelationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.relational_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelational_operator?: (ctx: Relational_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.report_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReport_statement?: (ctx: Report_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.return_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturn_statement?: (ctx: Return_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.scalar_nature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalar_nature_definition?: (ctx: Scalar_nature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.scalar_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalar_type_definition?: (ctx: Scalar_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.secondary_unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSecondary_unit?: (ctx: Secondary_unitContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.secondary_unit_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSecondary_unit_declaration?: (ctx: Secondary_unit_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.selected_signal_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelected_signal_assignment?: (ctx: Selected_signal_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.selected_waveforms`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelected_waveforms?: (ctx: Selected_waveformsContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.sensitivity_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSensitivity_clause?: (ctx: Sensitivity_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.sensitivity_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSensitivity_list?: (ctx: Sensitivity_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.sequence_of_statements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_of_statements?: (ctx: Sequence_of_statementsContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.sequential_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequential_statement?: (ctx: Sequential_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.shift_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShift_expression?: (ctx: Shift_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.shift_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShift_operator?: (ctx: Shift_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.signal_assignment_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignal_assignment_statement?: (ctx: Signal_assignment_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.signal_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignal_declaration?: (ctx: Signal_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.signal_kind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignal_kind?: (ctx: Signal_kindContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.signal_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignal_list?: (ctx: Signal_listContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.signature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignature?: (ctx: SignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simple_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_expression?: (ctx: Simple_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simple_simultaneous_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_simultaneous_statement?: (ctx: Simple_simultaneous_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simultaneous_alternative`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimultaneous_alternative?: (ctx: Simultaneous_alternativeContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simultaneous_case_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimultaneous_case_statement?: (ctx: Simultaneous_case_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simultaneous_if_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimultaneous_if_statement?: (ctx: Simultaneous_if_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simultaneous_procedural_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimultaneous_procedural_statement?: (ctx: Simultaneous_procedural_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simultaneous_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimultaneous_statement?: (ctx: Simultaneous_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.simultaneous_statement_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimultaneous_statement_part?: (ctx: Simultaneous_statement_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.source_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSource_aspect?: (ctx: Source_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.source_quantity_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSource_quantity_declaration?: (ctx: Source_quantity_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.step_limit_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStep_limit_specification?: (ctx: Step_limit_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subnature_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubnature_declaration?: (ctx: Subnature_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subnature_indication`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubnature_indication?: (ctx: Subnature_indicationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subprogram_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_body?: (ctx: Subprogram_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subprogram_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_declaration?: (ctx: Subprogram_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subprogram_declarative_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_declarative_item?: (ctx: Subprogram_declarative_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subprogram_declarative_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_declarative_part?: (ctx: Subprogram_declarative_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subprogram_kind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_kind?: (ctx: Subprogram_kindContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subprogram_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_specification?: (ctx: Subprogram_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.procedure_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_specification?: (ctx: Procedure_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.function_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_specification?: (ctx: Function_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subprogram_statement_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubprogram_statement_part?: (ctx: Subprogram_statement_partContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subtype_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubtype_declaration?: (ctx: Subtype_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.subtype_indication`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubtype_indication?: (ctx: Subtype_indicationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.suffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuffix?: (ctx: SuffixContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.target`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTarget?: (ctx: TargetContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerm?: (ctx: TermContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.terminal_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminal_aspect?: (ctx: Terminal_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.terminal_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminal_declaration?: (ctx: Terminal_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.through_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrough_aspect?: (ctx: Through_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.timeout_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeout_clause?: (ctx: Timeout_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.tolerance_aspect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTolerance_aspect?: (ctx: Tolerance_aspectContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.type_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_declaration?: (ctx: Type_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_definition?: (ctx: Type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.unconstrained_array_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnconstrained_array_definition?: (ctx: Unconstrained_array_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.unconstrained_nature_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnconstrained_nature_definition?: (ctx: Unconstrained_nature_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.use_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUse_clause?: (ctx: Use_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.variable_assignment_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_assignment_statement?: (ctx: Variable_assignment_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.variable_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_declaration?: (ctx: Variable_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.wait_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWait_statement?: (ctx: Wait_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.waveform`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWaveform?: (ctx: WaveformContext) => Result;

	/**
	 * Visit a parse tree produced by `vhdlParser.waveform_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWaveform_element?: (ctx: Waveform_elementContext) => Result;
}

