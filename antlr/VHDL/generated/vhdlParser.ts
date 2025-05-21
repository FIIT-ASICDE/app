// Generated from app/antlr/vhdl/grammar/vhdl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { vhdlVisitor } from "./vhdlVisitor";


export class vhdlParser extends Parser {
	public static readonly ABS = 1;
	public static readonly ACCESS = 2;
	public static readonly ACROSS = 3;
	public static readonly AFTER = 4;
	public static readonly ALIAS = 5;
	public static readonly ALL = 6;
	public static readonly AND = 7;
	public static readonly ARCHITECTURE = 8;
	public static readonly ARRAY = 9;
	public static readonly ASSERT = 10;
	public static readonly ATTRIBUTE = 11;
	public static readonly BEGIN = 12;
	public static readonly BLOCK = 13;
	public static readonly BODY = 14;
	public static readonly BREAK = 15;
	public static readonly BUFFER = 16;
	public static readonly BUS = 17;
	public static readonly CASE = 18;
	public static readonly COMPONENT = 19;
	public static readonly CONFIGURATION = 20;
	public static readonly CONSTANT = 21;
	public static readonly DISCONNECT = 22;
	public static readonly DOWNTO = 23;
	public static readonly END = 24;
	public static readonly ENTITY = 25;
	public static readonly ELSE = 26;
	public static readonly ELSIF = 27;
	public static readonly EXIT = 28;
	public static readonly FILE = 29;
	public static readonly FOR = 30;
	public static readonly FUNCTION = 31;
	public static readonly GENERATE = 32;
	public static readonly GENERIC = 33;
	public static readonly GROUP = 34;
	public static readonly GUARDED = 35;
	public static readonly IF = 36;
	public static readonly IMPURE = 37;
	public static readonly IN = 38;
	public static readonly INERTIAL = 39;
	public static readonly INOUT = 40;
	public static readonly IS = 41;
	public static readonly LABEL = 42;
	public static readonly LIBRARY = 43;
	public static readonly LIMIT = 44;
	public static readonly LINKAGE = 45;
	public static readonly LITERAL = 46;
	public static readonly LOOP = 47;
	public static readonly MAP = 48;
	public static readonly MOD = 49;
	public static readonly NAND = 50;
	public static readonly NATURE = 51;
	public static readonly NEW = 52;
	public static readonly NEXT = 53;
	public static readonly NOISE = 54;
	public static readonly NOR = 55;
	public static readonly NOT = 56;
	public static readonly NULL_ = 57;
	public static readonly OF = 58;
	public static readonly ON = 59;
	public static readonly OPEN = 60;
	public static readonly OR = 61;
	public static readonly OTHERS = 62;
	public static readonly OUT = 63;
	public static readonly PACKAGE = 64;
	public static readonly PORT = 65;
	public static readonly POSTPONED = 66;
	public static readonly PROCESS = 67;
	public static readonly PROCEDURE = 68;
	public static readonly PROCEDURAL = 69;
	public static readonly PURE = 70;
	public static readonly QUANTITY = 71;
	public static readonly RANGE = 72;
	public static readonly REVERSE_RANGE = 73;
	public static readonly REJECT = 74;
	public static readonly REM = 75;
	public static readonly RECORD = 76;
	public static readonly REFERENCE = 77;
	public static readonly REGISTER = 78;
	public static readonly REPORT = 79;
	public static readonly RETURN = 80;
	public static readonly ROL = 81;
	public static readonly ROR = 82;
	public static readonly SELECT = 83;
	public static readonly SEVERITY = 84;
	public static readonly SHARED = 85;
	public static readonly SIGNAL = 86;
	public static readonly SLA = 87;
	public static readonly SLL = 88;
	public static readonly SPECTRUM = 89;
	public static readonly SRA = 90;
	public static readonly SRL = 91;
	public static readonly SUBNATURE = 92;
	public static readonly SUBTYPE = 93;
	public static readonly TERMINAL = 94;
	public static readonly THEN = 95;
	public static readonly THROUGH = 96;
	public static readonly TO = 97;
	public static readonly TOLERANCE = 98;
	public static readonly TRANSPORT = 99;
	public static readonly TYPE = 100;
	public static readonly UNAFFECTED = 101;
	public static readonly UNITS = 102;
	public static readonly UNTIL = 103;
	public static readonly USE = 104;
	public static readonly VARIABLE = 105;
	public static readonly WAIT = 106;
	public static readonly WITH = 107;
	public static readonly WHEN = 108;
	public static readonly WHILE = 109;
	public static readonly XNOR = 110;
	public static readonly XOR = 111;
	public static readonly BASE_LITERAL = 112;
	public static readonly BIT_STRING_LITERAL = 113;
	public static readonly BIT_STRING_LITERAL_BINARY = 114;
	public static readonly BIT_STRING_LITERAL_OCTAL = 115;
	public static readonly BIT_STRING_LITERAL_HEX = 116;
	public static readonly REAL_LITERAL = 117;
	public static readonly BASIC_IDENTIFIER = 118;
	public static readonly EXTENDED_IDENTIFIER = 119;
	public static readonly LETTER = 120;
	public static readonly COMMENT = 121;
	public static readonly TAB = 122;
	public static readonly SPACE = 123;
	public static readonly NEWLINE = 124;
	public static readonly CR = 125;
	public static readonly CHARACTER_LITERAL = 126;
	public static readonly STRING_LITERAL = 127;
	public static readonly OTHER_SPECIAL_CHARACTER = 128;
	public static readonly DOUBLESTAR = 129;
	public static readonly ASSIGN = 130;
	public static readonly LE = 131;
	public static readonly GE = 132;
	public static readonly ARROW = 133;
	public static readonly NEQ = 134;
	public static readonly VARASGN = 135;
	public static readonly BOX = 136;
	public static readonly DBLQUOTE = 137;
	public static readonly SEMI = 138;
	public static readonly COMMA = 139;
	public static readonly AMPERSAND = 140;
	public static readonly LPAREN = 141;
	public static readonly RPAREN = 142;
	public static readonly LBRACKET = 143;
	public static readonly RBRACKET = 144;
	public static readonly COLON = 145;
	public static readonly MUL = 146;
	public static readonly DIV = 147;
	public static readonly PLUS = 148;
	public static readonly MINUS = 149;
	public static readonly LOWERTHAN = 150;
	public static readonly GREATERTHAN = 151;
	public static readonly EQ = 152;
	public static readonly BAR = 153;
	public static readonly DOT = 154;
	public static readonly BACKSLASH = 155;
	public static readonly EXPONENT = 156;
	public static readonly HEXDIGIT = 157;
	public static readonly INTEGER = 158;
	public static readonly DIGIT = 159;
	public static readonly BASED_INTEGER = 160;
	public static readonly EXTENDED_DIGIT = 161;
	public static readonly APOSTROPHE = 162;
	public static readonly RULE_abstract_literal = 0;
	public static readonly RULE_access_type_definition = 1;
	public static readonly RULE_across_aspect = 2;
	public static readonly RULE_actual_designator = 3;
	public static readonly RULE_actual_parameter_part = 4;
	public static readonly RULE_actual_part = 5;
	public static readonly RULE_adding_operator = 6;
	public static readonly RULE_aggregate = 7;
	public static readonly RULE_alias_declaration = 8;
	public static readonly RULE_alias_designator = 9;
	public static readonly RULE_alias_indication = 10;
	public static readonly RULE_allocator = 11;
	public static readonly RULE_architecture_body = 12;
	public static readonly RULE_architecture_declarative_part = 13;
	public static readonly RULE_architecture_statement = 14;
	public static readonly RULE_architecture_statement_part = 15;
	public static readonly RULE_array_nature_definition = 16;
	public static readonly RULE_array_type_definition = 17;
	public static readonly RULE_assertion = 18;
	public static readonly RULE_assertion_statement = 19;
	public static readonly RULE_association_element = 20;
	public static readonly RULE_association_list = 21;
	public static readonly RULE_attribute_declaration = 22;
	public static readonly RULE_attribute_designator = 23;
	public static readonly RULE_attribute_specification = 24;
	public static readonly RULE_base_unit_declaration = 25;
	public static readonly RULE_binding_indication = 26;
	public static readonly RULE_block_configuration = 27;
	public static readonly RULE_block_declarative_item = 28;
	public static readonly RULE_block_declarative_part = 29;
	public static readonly RULE_block_header = 30;
	public static readonly RULE_block_specification = 31;
	public static readonly RULE_block_statement = 32;
	public static readonly RULE_block_statement_part = 33;
	public static readonly RULE_branch_quantity_declaration = 34;
	public static readonly RULE_break_element = 35;
	public static readonly RULE_break_list = 36;
	public static readonly RULE_break_selector_clause = 37;
	public static readonly RULE_break_statement = 38;
	public static readonly RULE_case_statement = 39;
	public static readonly RULE_case_statement_alternative = 40;
	public static readonly RULE_choice = 41;
	public static readonly RULE_choices = 42;
	public static readonly RULE_component_configuration = 43;
	public static readonly RULE_component_declaration = 44;
	public static readonly RULE_component_instantiation_statement = 45;
	public static readonly RULE_component_specification = 46;
	public static readonly RULE_composite_nature_definition = 47;
	public static readonly RULE_composite_type_definition = 48;
	public static readonly RULE_concurrent_assertion_statement = 49;
	public static readonly RULE_concurrent_break_statement = 50;
	public static readonly RULE_concurrent_procedure_call_statement = 51;
	public static readonly RULE_concurrent_signal_assignment_statement = 52;
	public static readonly RULE_condition = 53;
	public static readonly RULE_condition_clause = 54;
	public static readonly RULE_conditional_signal_assignment = 55;
	public static readonly RULE_conditional_waveforms = 56;
	public static readonly RULE_configuration_declaration = 57;
	public static readonly RULE_configuration_declarative_item = 58;
	public static readonly RULE_configuration_declarative_part = 59;
	public static readonly RULE_configuration_item = 60;
	public static readonly RULE_configuration_specification = 61;
	public static readonly RULE_constant_declaration = 62;
	public static readonly RULE_constrained_array_definition = 63;
	public static readonly RULE_constrained_nature_definition = 64;
	public static readonly RULE_constraint = 65;
	public static readonly RULE_context_clause = 66;
	public static readonly RULE_context_item = 67;
	public static readonly RULE_delay_mechanism = 68;
	public static readonly RULE_design_file = 69;
	public static readonly RULE_design_unit = 70;
	public static readonly RULE_designator = 71;
	public static readonly RULE_direction = 72;
	public static readonly RULE_disconnection_specification = 73;
	public static readonly RULE_discrete_range = 74;
	public static readonly RULE_element_association = 75;
	public static readonly RULE_element_declaration = 76;
	public static readonly RULE_element_subnature_definition = 77;
	public static readonly RULE_element_subtype_definition = 78;
	public static readonly RULE_entity_aspect = 79;
	public static readonly RULE_entity_class = 80;
	public static readonly RULE_entity_class_entry = 81;
	public static readonly RULE_entity_class_entry_list = 82;
	public static readonly RULE_entity_declaration = 83;
	public static readonly RULE_entity_declarative_item = 84;
	public static readonly RULE_entity_declarative_part = 85;
	public static readonly RULE_entity_designator = 86;
	public static readonly RULE_entity_header = 87;
	public static readonly RULE_entity_name_list = 88;
	public static readonly RULE_entity_specification = 89;
	public static readonly RULE_entity_statement = 90;
	public static readonly RULE_entity_statement_part = 91;
	public static readonly RULE_entity_tag = 92;
	public static readonly RULE_enumeration_literal = 93;
	public static readonly RULE_enumeration_type_definition = 94;
	public static readonly RULE_exit_statement = 95;
	public static readonly RULE_expression = 96;
	public static readonly RULE_factor = 97;
	public static readonly RULE_file_declaration = 98;
	public static readonly RULE_file_logical_name = 99;
	public static readonly RULE_file_open_information = 100;
	public static readonly RULE_file_type_definition = 101;
	public static readonly RULE_formal_parameter_list = 102;
	public static readonly RULE_formal_part = 103;
	public static readonly RULE_free_quantity_declaration = 104;
	public static readonly RULE_generate_statement = 105;
	public static readonly RULE_generation_scheme = 106;
	public static readonly RULE_generic_clause = 107;
	public static readonly RULE_generic_list = 108;
	public static readonly RULE_generic_map_aspect = 109;
	public static readonly RULE_group_constituent = 110;
	public static readonly RULE_group_constituent_list = 111;
	public static readonly RULE_group_declaration = 112;
	public static readonly RULE_group_template_declaration = 113;
	public static readonly RULE_guarded_signal_specification = 114;
	public static readonly RULE_identifier = 115;
	public static readonly RULE_identifier_list = 116;
	public static readonly RULE_if_statement = 117;
	public static readonly RULE_index_constraint = 118;
	public static readonly RULE_index_specification = 119;
	public static readonly RULE_index_subtype_definition = 120;
	public static readonly RULE_instantiated_unit = 121;
	public static readonly RULE_instantiation_list = 122;
	public static readonly RULE_interface_constant_declaration = 123;
	public static readonly RULE_interface_declaration = 124;
	public static readonly RULE_interface_element = 125;
	public static readonly RULE_interface_file_declaration = 126;
	public static readonly RULE_interface_signal_list = 127;
	public static readonly RULE_interface_port_list = 128;
	public static readonly RULE_interface_list = 129;
	public static readonly RULE_interface_quantity_declaration = 130;
	public static readonly RULE_interface_port_declaration = 131;
	public static readonly RULE_interface_signal_declaration = 132;
	public static readonly RULE_interface_terminal_declaration = 133;
	public static readonly RULE_interface_variable_declaration = 134;
	public static readonly RULE_iteration_scheme = 135;
	public static readonly RULE_label_colon = 136;
	public static readonly RULE_library_clause = 137;
	public static readonly RULE_library_unit = 138;
	public static readonly RULE_literal = 139;
	public static readonly RULE_logical_name = 140;
	public static readonly RULE_logical_name_list = 141;
	public static readonly RULE_logical_operator = 142;
	public static readonly RULE_loop_statement = 143;
	public static readonly RULE_signal_mode = 144;
	public static readonly RULE_multiplying_operator = 145;
	public static readonly RULE_name = 146;
	public static readonly RULE_name_part = 147;
	public static readonly RULE_selected_name = 148;
	public static readonly RULE_selected_name_part = 149;
	public static readonly RULE_function_call_or_indexed_name_part = 150;
	public static readonly RULE_slice_name_part = 151;
	public static readonly RULE_attribute_name_part = 152;
	public static readonly RULE_nature_declaration = 153;
	public static readonly RULE_nature_definition = 154;
	public static readonly RULE_nature_element_declaration = 155;
	public static readonly RULE_next_statement = 156;
	public static readonly RULE_numeric_literal = 157;
	public static readonly RULE_object_declaration = 158;
	public static readonly RULE_opts = 159;
	public static readonly RULE_package_body = 160;
	public static readonly RULE_package_body_declarative_item = 161;
	public static readonly RULE_package_body_declarative_part = 162;
	public static readonly RULE_package_declaration = 163;
	public static readonly RULE_package_declarative_item = 164;
	public static readonly RULE_package_declarative_part = 165;
	public static readonly RULE_parameter_specification = 166;
	public static readonly RULE_physical_literal = 167;
	public static readonly RULE_physical_type_definition = 168;
	public static readonly RULE_port_clause = 169;
	public static readonly RULE_port_list = 170;
	public static readonly RULE_port_map_aspect = 171;
	public static readonly RULE_primary = 172;
	public static readonly RULE_primary_unit = 173;
	public static readonly RULE_procedural_declarative_item = 174;
	public static readonly RULE_procedural_declarative_part = 175;
	public static readonly RULE_procedural_statement_part = 176;
	public static readonly RULE_procedure_call = 177;
	public static readonly RULE_procedure_call_statement = 178;
	public static readonly RULE_process_declarative_item = 179;
	public static readonly RULE_process_declarative_part = 180;
	public static readonly RULE_process_statement = 181;
	public static readonly RULE_process_statement_part = 182;
	public static readonly RULE_qualified_expression = 183;
	public static readonly RULE_quantity_declaration = 184;
	public static readonly RULE_quantity_list = 185;
	public static readonly RULE_quantity_specification = 186;
	public static readonly RULE_range_decl = 187;
	public static readonly RULE_explicit_range = 188;
	public static readonly RULE_range_constraint = 189;
	public static readonly RULE_record_nature_definition = 190;
	public static readonly RULE_record_type_definition = 191;
	public static readonly RULE_relation = 192;
	public static readonly RULE_relational_operator = 193;
	public static readonly RULE_report_statement = 194;
	public static readonly RULE_return_statement = 195;
	public static readonly RULE_scalar_nature_definition = 196;
	public static readonly RULE_scalar_type_definition = 197;
	public static readonly RULE_secondary_unit = 198;
	public static readonly RULE_secondary_unit_declaration = 199;
	public static readonly RULE_selected_signal_assignment = 200;
	public static readonly RULE_selected_waveforms = 201;
	public static readonly RULE_sensitivity_clause = 202;
	public static readonly RULE_sensitivity_list = 203;
	public static readonly RULE_sequence_of_statements = 204;
	public static readonly RULE_sequential_statement = 205;
	public static readonly RULE_shift_expression = 206;
	public static readonly RULE_shift_operator = 207;
	public static readonly RULE_signal_assignment_statement = 208;
	public static readonly RULE_signal_declaration = 209;
	public static readonly RULE_signal_kind = 210;
	public static readonly RULE_signal_list = 211;
	public static readonly RULE_signature = 212;
	public static readonly RULE_simple_expression = 213;
	public static readonly RULE_simple_simultaneous_statement = 214;
	public static readonly RULE_simultaneous_alternative = 215;
	public static readonly RULE_simultaneous_case_statement = 216;
	public static readonly RULE_simultaneous_if_statement = 217;
	public static readonly RULE_simultaneous_procedural_statement = 218;
	public static readonly RULE_simultaneous_statement = 219;
	public static readonly RULE_simultaneous_statement_part = 220;
	public static readonly RULE_source_aspect = 221;
	public static readonly RULE_source_quantity_declaration = 222;
	public static readonly RULE_step_limit_specification = 223;
	public static readonly RULE_subnature_declaration = 224;
	public static readonly RULE_subnature_indication = 225;
	public static readonly RULE_subprogram_body = 226;
	public static readonly RULE_subprogram_declaration = 227;
	public static readonly RULE_subprogram_declarative_item = 228;
	public static readonly RULE_subprogram_declarative_part = 229;
	public static readonly RULE_subprogram_kind = 230;
	public static readonly RULE_subprogram_specification = 231;
	public static readonly RULE_procedure_specification = 232;
	public static readonly RULE_function_specification = 233;
	public static readonly RULE_subprogram_statement_part = 234;
	public static readonly RULE_subtype_declaration = 235;
	public static readonly RULE_subtype_indication = 236;
	public static readonly RULE_suffix = 237;
	public static readonly RULE_target = 238;
	public static readonly RULE_term = 239;
	public static readonly RULE_terminal_aspect = 240;
	public static readonly RULE_terminal_declaration = 241;
	public static readonly RULE_through_aspect = 242;
	public static readonly RULE_timeout_clause = 243;
	public static readonly RULE_tolerance_aspect = 244;
	public static readonly RULE_type_declaration = 245;
	public static readonly RULE_type_definition = 246;
	public static readonly RULE_unconstrained_array_definition = 247;
	public static readonly RULE_unconstrained_nature_definition = 248;
	public static readonly RULE_use_clause = 249;
	public static readonly RULE_variable_assignment_statement = 250;
	public static readonly RULE_variable_declaration = 251;
	public static readonly RULE_wait_statement = 252;
	public static readonly RULE_waveform = 253;
	public static readonly RULE_waveform_element = 254;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"abstract_literal", "access_type_definition", "across_aspect", "actual_designator", 
		"actual_parameter_part", "actual_part", "adding_operator", "aggregate", 
		"alias_declaration", "alias_designator", "alias_indication", "allocator", 
		"architecture_body", "architecture_declarative_part", "architecture_statement", 
		"architecture_statement_part", "array_nature_definition", "array_type_definition", 
		"assertion", "assertion_statement", "association_element", "association_list", 
		"attribute_declaration", "attribute_designator", "attribute_specification", 
		"base_unit_declaration", "binding_indication", "block_configuration", 
		"block_declarative_item", "block_declarative_part", "block_header", "block_specification", 
		"block_statement", "block_statement_part", "branch_quantity_declaration", 
		"break_element", "break_list", "break_selector_clause", "break_statement", 
		"case_statement", "case_statement_alternative", "choice", "choices", "component_configuration", 
		"component_declaration", "component_instantiation_statement", "component_specification", 
		"composite_nature_definition", "composite_type_definition", "concurrent_assertion_statement", 
		"concurrent_break_statement", "concurrent_procedure_call_statement", "concurrent_signal_assignment_statement", 
		"condition", "condition_clause", "conditional_signal_assignment", "conditional_waveforms", 
		"configuration_declaration", "configuration_declarative_item", "configuration_declarative_part", 
		"configuration_item", "configuration_specification", "constant_declaration", 
		"constrained_array_definition", "constrained_nature_definition", "constraint", 
		"context_clause", "context_item", "delay_mechanism", "design_file", "design_unit", 
		"designator", "direction", "disconnection_specification", "discrete_range", 
		"element_association", "element_declaration", "element_subnature_definition", 
		"element_subtype_definition", "entity_aspect", "entity_class", "entity_class_entry", 
		"entity_class_entry_list", "entity_declaration", "entity_declarative_item", 
		"entity_declarative_part", "entity_designator", "entity_header", "entity_name_list", 
		"entity_specification", "entity_statement", "entity_statement_part", "entity_tag", 
		"enumeration_literal", "enumeration_type_definition", "exit_statement", 
		"expression", "factor", "file_declaration", "file_logical_name", "file_open_information", 
		"file_type_definition", "formal_parameter_list", "formal_part", "free_quantity_declaration", 
		"generate_statement", "generation_scheme", "generic_clause", "generic_list", 
		"generic_map_aspect", "group_constituent", "group_constituent_list", "group_declaration", 
		"group_template_declaration", "guarded_signal_specification", "identifier", 
		"identifier_list", "if_statement", "index_constraint", "index_specification", 
		"index_subtype_definition", "instantiated_unit", "instantiation_list", 
		"interface_constant_declaration", "interface_declaration", "interface_element", 
		"interface_file_declaration", "interface_signal_list", "interface_port_list", 
		"interface_list", "interface_quantity_declaration", "interface_port_declaration", 
		"interface_signal_declaration", "interface_terminal_declaration", "interface_variable_declaration", 
		"iteration_scheme", "label_colon", "library_clause", "library_unit", "literal", 
		"logical_name", "logical_name_list", "logical_operator", "loop_statement", 
		"signal_mode", "multiplying_operator", "name", "name_part", "selected_name", 
		"selected_name_part", "function_call_or_indexed_name_part", "slice_name_part", 
		"attribute_name_part", "nature_declaration", "nature_definition", "nature_element_declaration", 
		"next_statement", "numeric_literal", "object_declaration", "opts", "package_body", 
		"package_body_declarative_item", "package_body_declarative_part", "package_declaration", 
		"package_declarative_item", "package_declarative_part", "parameter_specification", 
		"physical_literal", "physical_type_definition", "port_clause", "port_list", 
		"port_map_aspect", "primary", "primary_unit", "procedural_declarative_item", 
		"procedural_declarative_part", "procedural_statement_part", "procedure_call", 
		"procedure_call_statement", "process_declarative_item", "process_declarative_part", 
		"process_statement", "process_statement_part", "qualified_expression", 
		"quantity_declaration", "quantity_list", "quantity_specification", "range_decl", 
		"explicit_range", "range_constraint", "record_nature_definition", "record_type_definition", 
		"relation", "relational_operator", "report_statement", "return_statement", 
		"scalar_nature_definition", "scalar_type_definition", "secondary_unit", 
		"secondary_unit_declaration", "selected_signal_assignment", "selected_waveforms", 
		"sensitivity_clause", "sensitivity_list", "sequence_of_statements", "sequential_statement", 
		"shift_expression", "shift_operator", "signal_assignment_statement", "signal_declaration", 
		"signal_kind", "signal_list", "signature", "simple_expression", "simple_simultaneous_statement", 
		"simultaneous_alternative", "simultaneous_case_statement", "simultaneous_if_statement", 
		"simultaneous_procedural_statement", "simultaneous_statement", "simultaneous_statement_part", 
		"source_aspect", "source_quantity_declaration", "step_limit_specification", 
		"subnature_declaration", "subnature_indication", "subprogram_body", "subprogram_declaration", 
		"subprogram_declarative_item", "subprogram_declarative_part", "subprogram_kind", 
		"subprogram_specification", "procedure_specification", "function_specification", 
		"subprogram_statement_part", "subtype_declaration", "subtype_indication", 
		"suffix", "target", "term", "terminal_aspect", "terminal_declaration", 
		"through_aspect", "timeout_clause", "tolerance_aspect", "type_declaration", 
		"type_definition", "unconstrained_array_definition", "unconstrained_nature_definition", 
		"use_clause", "variable_assignment_statement", "variable_declaration", 
		"wait_statement", "waveform", "waveform_element",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'ABS'", "'ACCESS'", "'ACROSS'", "'AFTER'", "'ALIAS'", "'ALL'", 
		"'AND'", "'ARCHITECTURE'", "'ARRAY'", "'ASSERT'", "'ATTRIBUTE'", "'BEGIN'", 
		"'BLOCK'", "'BODY'", "'BREAK'", "'BUFFER'", "'BUS'", "'CASE'", "'COMPONENT'", 
		"'CONFIGURATION'", "'CONSTANT'", "'DISCONNECT'", "'DOWNTO'", "'END'", 
		"'ENTITY'", "'ELSE'", "'ELSIF'", "'EXIT'", "'FILE'", "'FOR'", "'FUNCTION'", 
		"'GENERATE'", "'GENERIC'", "'GROUP'", "'GUARDED'", "'IF'", "'IMPURE'", 
		"'IN'", "'INERTIAL'", "'INOUT'", "'IS'", "'LABEL'", "'LIBRARY'", "'LIMIT'", 
		"'LINKAGE'", "'LITERAL'", "'LOOP'", "'MAP'", "'MOD'", "'NAND'", "'NATURE'", 
		"'NEW'", "'NEXT'", "'NOISE'", "'NOR'", "'NOT'", "'NULL'", "'OF'", "'ON'", 
		"'OPEN'", "'OR'", "'OTHERS'", "'OUT'", "'PACKAGE'", "'PORT'", "'POSTPONED'", 
		"'PROCESS'", "'PROCEDURE'", "'PROCEDURAL'", "'PURE'", "'QUANTITY'", "'RANGE'", 
		"'REVERSE_RANGE'", "'REJECT'", "'REM'", "'RECORD'", "'REFERENCE'", "'REGISTER'", 
		"'REPORT'", "'RETURN'", "'ROL'", "'ROR'", "'SELECT'", "'SEVERITY'", "'SHARED'", 
		"'SIGNAL'", "'SLA'", "'SLL'", "'SPECTRUM'", "'SRA'", "'SRL'", "'SUBNATURE'", 
		"'SUBTYPE'", "'TERMINAL'", "'THEN'", "'THROUGH'", "'TO'", "'TOLERANCE'", 
		"'TRANSPORT'", "'TYPE'", "'UNAFFECTED'", "'UNITS'", "'UNTIL'", "'USE'", 
		"'VARIABLE'", "'WAIT'", "'WITH'", "'WHEN'", "'WHILE'", "'XNOR'", "'XOR'", 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, "'\n'", "'\r'", 
		undefined, undefined, undefined, "'**'", "'=='", "'<='", "'>='", "'=>'", 
		"'/='", "':='", "'<>'", "'\"'", "';'", "','", "'&'", "'('", "')'", "'['", 
		"']'", "':'", "'*'", "'/'", "'+'", "'-'", "'<'", "'>'", "'='", "'|'", 
		"'.'", "'\\'", undefined, undefined, undefined, undefined, undefined, 
		undefined, "'''",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "ABS", "ACCESS", "ACROSS", "AFTER", "ALIAS", "ALL", "AND", 
		"ARCHITECTURE", "ARRAY", "ASSERT", "ATTRIBUTE", "BEGIN", "BLOCK", "BODY", 
		"BREAK", "BUFFER", "BUS", "CASE", "COMPONENT", "CONFIGURATION", "CONSTANT", 
		"DISCONNECT", "DOWNTO", "END", "ENTITY", "ELSE", "ELSIF", "EXIT", "FILE", 
		"FOR", "FUNCTION", "GENERATE", "GENERIC", "GROUP", "GUARDED", "IF", "IMPURE", 
		"IN", "INERTIAL", "INOUT", "IS", "LABEL", "LIBRARY", "LIMIT", "LINKAGE", 
		"LITERAL", "LOOP", "MAP", "MOD", "NAND", "NATURE", "NEW", "NEXT", "NOISE", 
		"NOR", "NOT", "NULL_", "OF", "ON", "OPEN", "OR", "OTHERS", "OUT", "PACKAGE", 
		"PORT", "POSTPONED", "PROCESS", "PROCEDURE", "PROCEDURAL", "PURE", "QUANTITY", 
		"RANGE", "REVERSE_RANGE", "REJECT", "REM", "RECORD", "REFERENCE", "REGISTER", 
		"REPORT", "RETURN", "ROL", "ROR", "SELECT", "SEVERITY", "SHARED", "SIGNAL", 
		"SLA", "SLL", "SPECTRUM", "SRA", "SRL", "SUBNATURE", "SUBTYPE", "TERMINAL", 
		"THEN", "THROUGH", "TO", "TOLERANCE", "TRANSPORT", "TYPE", "UNAFFECTED", 
		"UNITS", "UNTIL", "USE", "VARIABLE", "WAIT", "WITH", "WHEN", "WHILE", 
		"XNOR", "XOR", "BASE_LITERAL", "BIT_STRING_LITERAL", "BIT_STRING_LITERAL_BINARY", 
		"BIT_STRING_LITERAL_OCTAL", "BIT_STRING_LITERAL_HEX", "REAL_LITERAL", 
		"BASIC_IDENTIFIER", "EXTENDED_IDENTIFIER", "LETTER", "COMMENT", "TAB", 
		"SPACE", "NEWLINE", "CR", "CHARACTER_LITERAL", "STRING_LITERAL", "OTHER_SPECIAL_CHARACTER", 
		"DOUBLESTAR", "ASSIGN", "LE", "GE", "ARROW", "NEQ", "VARASGN", "BOX", 
		"DBLQUOTE", "SEMI", "COMMA", "AMPERSAND", "LPAREN", "RPAREN", "LBRACKET", 
		"RBRACKET", "COLON", "MUL", "DIV", "PLUS", "MINUS", "LOWERTHAN", "GREATERTHAN", 
		"EQ", "BAR", "DOT", "BACKSLASH", "EXPONENT", "HEXDIGIT", "INTEGER", "DIGIT", 
		"BASED_INTEGER", "EXTENDED_DIGIT", "APOSTROPHE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(vhdlParser._LITERAL_NAMES, vhdlParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return vhdlParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "vhdl.g4"; }

	// @Override
	public get ruleNames(): string[] { return vhdlParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return vhdlParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(vhdlParser._ATN, this);
	}
	// @RuleVersion(0)
	public abstract_literal(): Abstract_literalContext {
		let _localctx: Abstract_literalContext = new Abstract_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, vhdlParser.RULE_abstract_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 510;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.BASE_LITERAL || _la === vhdlParser.REAL_LITERAL || _la === vhdlParser.INTEGER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public access_type_definition(): Access_type_definitionContext {
		let _localctx: Access_type_definitionContext = new Access_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, vhdlParser.RULE_access_type_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 512;
			this.match(vhdlParser.ACCESS);
			this.state = 513;
			this.subtype_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public across_aspect(): Across_aspectContext {
		let _localctx: Across_aspectContext = new Across_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, vhdlParser.RULE_across_aspect);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 515;
			this.identifier_list();
			this.state = 517;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.TOLERANCE) {
				{
				this.state = 516;
				this.tolerance_aspect();
				}
			}

			this.state = 521;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 519;
				this.match(vhdlParser.VARASGN);
				this.state = 520;
				this.expression();
				}
			}

			this.state = 523;
			this.match(vhdlParser.ACROSS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actual_designator(): Actual_designatorContext {
		let _localctx: Actual_designatorContext = new Actual_designatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, vhdlParser.RULE_actual_designator);
		try {
			this.state = 527;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.ABS:
			case vhdlParser.NEW:
			case vhdlParser.NOT:
			case vhdlParser.NULL_:
			case vhdlParser.BASE_LITERAL:
			case vhdlParser.BIT_STRING_LITERAL:
			case vhdlParser.REAL_LITERAL:
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.CHARACTER_LITERAL:
			case vhdlParser.STRING_LITERAL:
			case vhdlParser.LPAREN:
			case vhdlParser.PLUS:
			case vhdlParser.MINUS:
			case vhdlParser.INTEGER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 525;
				this.expression();
				}
				break;
			case vhdlParser.OPEN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 526;
				this.match(vhdlParser.OPEN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actual_parameter_part(): Actual_parameter_partContext {
		let _localctx: Actual_parameter_partContext = new Actual_parameter_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, vhdlParser.RULE_actual_parameter_part);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 529;
			this.association_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actual_part(): Actual_partContext {
		let _localctx: Actual_partContext = new Actual_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, vhdlParser.RULE_actual_part);
		try {
			this.state = 537;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 531;
				this.name();
				this.state = 532;
				this.match(vhdlParser.LPAREN);
				this.state = 533;
				this.actual_designator();
				this.state = 534;
				this.match(vhdlParser.RPAREN);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 536;
				this.actual_designator();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public adding_operator(): Adding_operatorContext {
		let _localctx: Adding_operatorContext = new Adding_operatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, vhdlParser.RULE_adding_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 539;
			_la = this._input.LA(1);
			if (!(((((_la - 140)) & ~0x1F) === 0 && ((1 << (_la - 140)) & ((1 << (vhdlParser.AMPERSAND - 140)) | (1 << (vhdlParser.PLUS - 140)) | (1 << (vhdlParser.MINUS - 140)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aggregate(): AggregateContext {
		let _localctx: AggregateContext = new AggregateContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, vhdlParser.RULE_aggregate);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 541;
			this.match(vhdlParser.LPAREN);
			this.state = 542;
			this.element_association();
			this.state = 547;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 543;
				this.match(vhdlParser.COMMA);
				this.state = 544;
				this.element_association();
				}
				}
				this.state = 549;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 550;
			this.match(vhdlParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alias_declaration(): Alias_declarationContext {
		let _localctx: Alias_declarationContext = new Alias_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, vhdlParser.RULE_alias_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 552;
			this.match(vhdlParser.ALIAS);
			this.state = 553;
			this.alias_designator();
			this.state = 556;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.COLON) {
				{
				this.state = 554;
				this.match(vhdlParser.COLON);
				this.state = 555;
				this.alias_indication();
				}
			}

			this.state = 558;
			this.match(vhdlParser.IS);
			this.state = 559;
			this.name();
			this.state = 561;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LBRACKET) {
				{
				this.state = 560;
				this.signature();
				}
			}

			this.state = 563;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alias_designator(): Alias_designatorContext {
		let _localctx: Alias_designatorContext = new Alias_designatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, vhdlParser.RULE_alias_designator);
		try {
			this.state = 568;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 565;
				this.identifier();
				}
				break;
			case vhdlParser.CHARACTER_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 566;
				this.match(vhdlParser.CHARACTER_LITERAL);
				}
				break;
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 567;
				this.match(vhdlParser.STRING_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alias_indication(): Alias_indicationContext {
		let _localctx: Alias_indicationContext = new Alias_indicationContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, vhdlParser.RULE_alias_indication);
		try {
			this.state = 572;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 570;
				this.subnature_indication();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 571;
				this.subtype_indication();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public allocator(): AllocatorContext {
		let _localctx: AllocatorContext = new AllocatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, vhdlParser.RULE_allocator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 574;
			this.match(vhdlParser.NEW);
			this.state = 577;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 575;
				this.qualified_expression();
				}
				break;

			case 2:
				{
				this.state = 576;
				this.subtype_indication();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public architecture_body(): Architecture_bodyContext {
		let _localctx: Architecture_bodyContext = new Architecture_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, vhdlParser.RULE_architecture_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 579;
			this.match(vhdlParser.ARCHITECTURE);
			this.state = 580;
			this.identifier();
			this.state = 581;
			this.match(vhdlParser.OF);
			this.state = 582;
			this.identifier();
			this.state = 583;
			this.match(vhdlParser.IS);
			this.state = 584;
			this.architecture_declarative_part();
			this.state = 585;
			this.match(vhdlParser.BEGIN);
			this.state = 586;
			this.architecture_statement_part();
			this.state = 587;
			this.match(vhdlParser.END);
			this.state = 589;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.ARCHITECTURE) {
				{
				this.state = 588;
				this.match(vhdlParser.ARCHITECTURE);
				}
			}

			this.state = 592;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 591;
				this.identifier();
				}
			}

			this.state = 594;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public architecture_declarative_part(): Architecture_declarative_partContext {
		let _localctx: Architecture_declarative_partContext = new Architecture_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, vhdlParser.RULE_architecture_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 599;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.COMPONENT) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.DISCONNECT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FOR) | (1 << vhdlParser.FUNCTION))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (vhdlParser.GROUP - 34)) | (1 << (vhdlParser.IMPURE - 34)) | (1 << (vhdlParser.LIMIT - 34)) | (1 << (vhdlParser.NATURE - 34)))) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.QUANTITY - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SIGNAL - 68)) | (1 << (vhdlParser.SUBNATURE - 68)) | (1 << (vhdlParser.SUBTYPE - 68)) | (1 << (vhdlParser.TERMINAL - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 596;
				this.block_declarative_item();
				}
				}
				this.state = 601;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public architecture_statement(): Architecture_statementContext {
		let _localctx: Architecture_statementContext = new Architecture_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, vhdlParser.RULE_architecture_statement);
		try {
			this.state = 623;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 602;
				this.block_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 603;
				this.process_statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 605;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
				case 1:
					{
					this.state = 604;
					this.label_colon();
					}
					break;
				}
				this.state = 607;
				this.concurrent_procedure_call_statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 609;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
				case 1:
					{
					this.state = 608;
					this.label_colon();
					}
					break;
				}
				this.state = 611;
				this.concurrent_assertion_statement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 613;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
				case 1:
					{
					this.state = 612;
					this.label_colon();
					}
					break;
				}
				this.state = 616;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
				case 1:
					{
					this.state = 615;
					this.match(vhdlParser.POSTPONED);
					}
					break;
				}
				this.state = 618;
				this.concurrent_signal_assignment_statement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 619;
				this.component_instantiation_statement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 620;
				this.generate_statement();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 621;
				this.concurrent_break_statement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 622;
				this.simultaneous_statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public architecture_statement_part(): Architecture_statement_partContext {
		let _localctx: Architecture_statement_partContext = new Architecture_statement_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, vhdlParser.RULE_architecture_statement_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 628;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ABS) | (1 << vhdlParser.ASSERT) | (1 << vhdlParser.BREAK) | (1 << vhdlParser.CASE))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.NEW - 36)) | (1 << (vhdlParser.NOT - 36)) | (1 << (vhdlParser.NULL_ - 36)) | (1 << (vhdlParser.POSTPONED - 36)) | (1 << (vhdlParser.PROCESS - 36)))) !== 0) || _la === vhdlParser.PROCEDURAL || ((((_la - 107)) & ~0x1F) === 0 && ((1 << (_la - 107)) & ((1 << (vhdlParser.WITH - 107)) | (1 << (vhdlParser.BASE_LITERAL - 107)) | (1 << (vhdlParser.BIT_STRING_LITERAL - 107)) | (1 << (vhdlParser.REAL_LITERAL - 107)) | (1 << (vhdlParser.BASIC_IDENTIFIER - 107)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 107)) | (1 << (vhdlParser.CHARACTER_LITERAL - 107)) | (1 << (vhdlParser.STRING_LITERAL - 107)))) !== 0) || ((((_la - 141)) & ~0x1F) === 0 && ((1 << (_la - 141)) & ((1 << (vhdlParser.LPAREN - 141)) | (1 << (vhdlParser.PLUS - 141)) | (1 << (vhdlParser.MINUS - 141)) | (1 << (vhdlParser.INTEGER - 141)))) !== 0)) {
				{
				{
				this.state = 625;
				this.architecture_statement();
				}
				}
				this.state = 630;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array_nature_definition(): Array_nature_definitionContext {
		let _localctx: Array_nature_definitionContext = new Array_nature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, vhdlParser.RULE_array_nature_definition);
		try {
			this.state = 633;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 631;
				this.unconstrained_nature_definition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 632;
				this.constrained_nature_definition();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array_type_definition(): Array_type_definitionContext {
		let _localctx: Array_type_definitionContext = new Array_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, vhdlParser.RULE_array_type_definition);
		try {
			this.state = 637;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 635;
				this.unconstrained_array_definition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 636;
				this.constrained_array_definition();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assertion(): AssertionContext {
		let _localctx: AssertionContext = new AssertionContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, vhdlParser.RULE_assertion);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 639;
			this.match(vhdlParser.ASSERT);
			this.state = 640;
			this.condition();
			this.state = 643;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.REPORT) {
				{
				this.state = 641;
				this.match(vhdlParser.REPORT);
				this.state = 642;
				this.expression();
				}
			}

			this.state = 647;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.SEVERITY) {
				{
				this.state = 645;
				this.match(vhdlParser.SEVERITY);
				this.state = 646;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assertion_statement(): Assertion_statementContext {
		let _localctx: Assertion_statementContext = new Assertion_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, vhdlParser.RULE_assertion_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 650;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 649;
				this.label_colon();
				}
			}

			this.state = 652;
			this.assertion();
			this.state = 653;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public association_element(): Association_elementContext {
		let _localctx: Association_elementContext = new Association_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, vhdlParser.RULE_association_element);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 658;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 655;
				this.formal_part();
				this.state = 656;
				this.match(vhdlParser.ARROW);
				}
				break;
			}
			this.state = 660;
			this.actual_part();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public association_list(): Association_listContext {
		let _localctx: Association_listContext = new Association_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, vhdlParser.RULE_association_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 662;
			this.association_element();
			this.state = 667;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 663;
				this.match(vhdlParser.COMMA);
				this.state = 664;
				this.association_element();
				}
				}
				this.state = 669;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attribute_declaration(): Attribute_declarationContext {
		let _localctx: Attribute_declarationContext = new Attribute_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, vhdlParser.RULE_attribute_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 670;
			this.match(vhdlParser.ATTRIBUTE);
			this.state = 671;
			this.label_colon();
			this.state = 672;
			this.name();
			this.state = 673;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attribute_designator(): Attribute_designatorContext {
		let _localctx: Attribute_designatorContext = new Attribute_designatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, vhdlParser.RULE_attribute_designator);
		try {
			this.state = 682;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 675;
				this.identifier();
				}
				break;
			case vhdlParser.RANGE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 676;
				this.match(vhdlParser.RANGE);
				}
				break;
			case vhdlParser.REVERSE_RANGE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 677;
				this.match(vhdlParser.REVERSE_RANGE);
				}
				break;
			case vhdlParser.ACROSS:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 678;
				this.match(vhdlParser.ACROSS);
				}
				break;
			case vhdlParser.THROUGH:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 679;
				this.match(vhdlParser.THROUGH);
				}
				break;
			case vhdlParser.REFERENCE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 680;
				this.match(vhdlParser.REFERENCE);
				}
				break;
			case vhdlParser.TOLERANCE:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 681;
				this.match(vhdlParser.TOLERANCE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attribute_specification(): Attribute_specificationContext {
		let _localctx: Attribute_specificationContext = new Attribute_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, vhdlParser.RULE_attribute_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 684;
			this.match(vhdlParser.ATTRIBUTE);
			this.state = 685;
			this.attribute_designator();
			this.state = 686;
			this.match(vhdlParser.OF);
			this.state = 687;
			this.entity_specification();
			this.state = 688;
			this.match(vhdlParser.IS);
			this.state = 689;
			this.expression();
			this.state = 690;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public base_unit_declaration(): Base_unit_declarationContext {
		let _localctx: Base_unit_declarationContext = new Base_unit_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, vhdlParser.RULE_base_unit_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 692;
			this.identifier();
			this.state = 693;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public binding_indication(): Binding_indicationContext {
		let _localctx: Binding_indicationContext = new Binding_indicationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, vhdlParser.RULE_binding_indication);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 697;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.USE) {
				{
				this.state = 695;
				this.match(vhdlParser.USE);
				this.state = 696;
				this.entity_aspect();
				}
			}

			this.state = 700;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.GENERIC) {
				{
				this.state = 699;
				this.generic_map_aspect();
				}
			}

			this.state = 703;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PORT) {
				{
				this.state = 702;
				this.port_map_aspect();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_configuration(): Block_configurationContext {
		let _localctx: Block_configurationContext = new Block_configurationContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, vhdlParser.RULE_block_configuration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 705;
			this.match(vhdlParser.FOR);
			this.state = 706;
			this.block_specification();
			this.state = 710;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.USE) {
				{
				{
				this.state = 707;
				this.use_clause();
				}
				}
				this.state = 712;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 716;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.FOR) {
				{
				{
				this.state = 713;
				this.configuration_item();
				}
				}
				this.state = 718;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 719;
			this.match(vhdlParser.END);
			this.state = 720;
			this.match(vhdlParser.FOR);
			this.state = 721;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_declarative_item(): Block_declarative_itemContext {
		let _localctx: Block_declarative_itemContext = new Block_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, vhdlParser.RULE_block_declarative_item);
		try {
			this.state = 745;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 723;
				this.subprogram_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 724;
				this.subprogram_body();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 725;
				this.type_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 726;
				this.subtype_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 727;
				this.constant_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 728;
				this.signal_declaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 729;
				this.variable_declaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 730;
				this.file_declaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 731;
				this.alias_declaration();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 732;
				this.component_declaration();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 733;
				this.attribute_declaration();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 734;
				this.attribute_specification();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 735;
				this.configuration_specification();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 736;
				this.disconnection_specification();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 737;
				this.step_limit_specification();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 738;
				this.use_clause();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 739;
				this.group_template_declaration();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 740;
				this.group_declaration();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 741;
				this.nature_declaration();
				}
				break;

			case 20:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 742;
				this.subnature_declaration();
				}
				break;

			case 21:
				this.enterOuterAlt(_localctx, 21);
				{
				this.state = 743;
				this.quantity_declaration();
				}
				break;

			case 22:
				this.enterOuterAlt(_localctx, 22);
				{
				this.state = 744;
				this.terminal_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_declarative_part(): Block_declarative_partContext {
		let _localctx: Block_declarative_partContext = new Block_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, vhdlParser.RULE_block_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 750;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.COMPONENT) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.DISCONNECT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FOR) | (1 << vhdlParser.FUNCTION))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (vhdlParser.GROUP - 34)) | (1 << (vhdlParser.IMPURE - 34)) | (1 << (vhdlParser.LIMIT - 34)) | (1 << (vhdlParser.NATURE - 34)))) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.QUANTITY - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SIGNAL - 68)) | (1 << (vhdlParser.SUBNATURE - 68)) | (1 << (vhdlParser.SUBTYPE - 68)) | (1 << (vhdlParser.TERMINAL - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 747;
				this.block_declarative_item();
				}
				}
				this.state = 752;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_header(): Block_headerContext {
		let _localctx: Block_headerContext = new Block_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, vhdlParser.RULE_block_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 759;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.GENERIC) {
				{
				this.state = 753;
				this.generic_clause();
				this.state = 757;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.GENERIC) {
					{
					this.state = 754;
					this.generic_map_aspect();
					this.state = 755;
					this.match(vhdlParser.SEMI);
					}
				}

				}
			}

			this.state = 767;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PORT) {
				{
				this.state = 761;
				this.port_clause();
				this.state = 765;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.PORT) {
					{
					this.state = 762;
					this.port_map_aspect();
					this.state = 763;
					this.match(vhdlParser.SEMI);
					}
				}

				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_specification(): Block_specificationContext {
		let _localctx: Block_specificationContext = new Block_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, vhdlParser.RULE_block_specification);
		let _la: number;
		try {
			this.state = 777;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 769;
				this.identifier();
				this.state = 774;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.LPAREN) {
					{
					this.state = 770;
					this.match(vhdlParser.LPAREN);
					this.state = 771;
					this.index_specification();
					this.state = 772;
					this.match(vhdlParser.RPAREN);
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 776;
				this.name();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_statement(): Block_statementContext {
		let _localctx: Block_statementContext = new Block_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, vhdlParser.RULE_block_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 779;
			this.label_colon();
			this.state = 780;
			this.match(vhdlParser.BLOCK);
			this.state = 785;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LPAREN) {
				{
				this.state = 781;
				this.match(vhdlParser.LPAREN);
				this.state = 782;
				this.expression();
				this.state = 783;
				this.match(vhdlParser.RPAREN);
				}
			}

			this.state = 788;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IS) {
				{
				this.state = 787;
				this.match(vhdlParser.IS);
				}
			}

			this.state = 790;
			this.block_header();
			this.state = 791;
			this.block_declarative_part();
			this.state = 792;
			this.match(vhdlParser.BEGIN);
			this.state = 793;
			this.block_statement_part();
			this.state = 794;
			this.match(vhdlParser.END);
			this.state = 795;
			this.match(vhdlParser.BLOCK);
			this.state = 797;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 796;
				this.identifier();
				}
			}

			this.state = 799;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_statement_part(): Block_statement_partContext {
		let _localctx: Block_statement_partContext = new Block_statement_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, vhdlParser.RULE_block_statement_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 804;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ABS) | (1 << vhdlParser.ASSERT) | (1 << vhdlParser.BREAK) | (1 << vhdlParser.CASE))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.NEW - 36)) | (1 << (vhdlParser.NOT - 36)) | (1 << (vhdlParser.NULL_ - 36)) | (1 << (vhdlParser.POSTPONED - 36)) | (1 << (vhdlParser.PROCESS - 36)))) !== 0) || _la === vhdlParser.PROCEDURAL || ((((_la - 107)) & ~0x1F) === 0 && ((1 << (_la - 107)) & ((1 << (vhdlParser.WITH - 107)) | (1 << (vhdlParser.BASE_LITERAL - 107)) | (1 << (vhdlParser.BIT_STRING_LITERAL - 107)) | (1 << (vhdlParser.REAL_LITERAL - 107)) | (1 << (vhdlParser.BASIC_IDENTIFIER - 107)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 107)) | (1 << (vhdlParser.CHARACTER_LITERAL - 107)) | (1 << (vhdlParser.STRING_LITERAL - 107)))) !== 0) || ((((_la - 141)) & ~0x1F) === 0 && ((1 << (_la - 141)) & ((1 << (vhdlParser.LPAREN - 141)) | (1 << (vhdlParser.PLUS - 141)) | (1 << (vhdlParser.MINUS - 141)) | (1 << (vhdlParser.INTEGER - 141)))) !== 0)) {
				{
				{
				this.state = 801;
				this.architecture_statement();
				}
				}
				this.state = 806;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public branch_quantity_declaration(): Branch_quantity_declarationContext {
		let _localctx: Branch_quantity_declarationContext = new Branch_quantity_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, vhdlParser.RULE_branch_quantity_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 807;
			this.match(vhdlParser.QUANTITY);
			this.state = 809;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				{
				this.state = 808;
				this.across_aspect();
				}
				break;
			}
			this.state = 812;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				{
				this.state = 811;
				this.through_aspect();
				}
				break;
			}
			this.state = 814;
			this.terminal_aspect();
			this.state = 815;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public break_element(): Break_elementContext {
		let _localctx: Break_elementContext = new Break_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, vhdlParser.RULE_break_element);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 818;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.FOR) {
				{
				this.state = 817;
				this.break_selector_clause();
				}
			}

			this.state = 820;
			this.name();
			this.state = 821;
			this.match(vhdlParser.ARROW);
			this.state = 822;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public break_list(): Break_listContext {
		let _localctx: Break_listContext = new Break_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, vhdlParser.RULE_break_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 824;
			this.break_element();
			this.state = 829;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 825;
				this.match(vhdlParser.COMMA);
				this.state = 826;
				this.break_element();
				}
				}
				this.state = 831;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public break_selector_clause(): Break_selector_clauseContext {
		let _localctx: Break_selector_clauseContext = new Break_selector_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, vhdlParser.RULE_break_selector_clause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 832;
			this.match(vhdlParser.FOR);
			this.state = 833;
			this.name();
			this.state = 834;
			this.match(vhdlParser.USE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public break_statement(): Break_statementContext {
		let _localctx: Break_statementContext = new Break_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, vhdlParser.RULE_break_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 837;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 836;
				this.label_colon();
				}
			}

			this.state = 839;
			this.match(vhdlParser.BREAK);
			this.state = 841;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.FOR || ((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)))) !== 0)) {
				{
				this.state = 840;
				this.break_list();
				}
			}

			this.state = 845;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.WHEN) {
				{
				this.state = 843;
				this.match(vhdlParser.WHEN);
				this.state = 844;
				this.condition();
				}
			}

			this.state = 847;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_statement(): Case_statementContext {
		let _localctx: Case_statementContext = new Case_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, vhdlParser.RULE_case_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 850;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 849;
				this.label_colon();
				}
			}

			this.state = 852;
			this.match(vhdlParser.CASE);
			this.state = 853;
			this.expression();
			this.state = 854;
			this.match(vhdlParser.IS);
			this.state = 856;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 855;
				this.case_statement_alternative();
				}
				}
				this.state = 858;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === vhdlParser.WHEN);
			this.state = 860;
			this.match(vhdlParser.END);
			this.state = 861;
			this.match(vhdlParser.CASE);
			this.state = 863;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 862;
				this.identifier();
				}
			}

			this.state = 865;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_statement_alternative(): Case_statement_alternativeContext {
		let _localctx: Case_statement_alternativeContext = new Case_statement_alternativeContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, vhdlParser.RULE_case_statement_alternative);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 867;
			this.match(vhdlParser.WHEN);
			this.state = 868;
			this.choices();
			this.state = 869;
			this.match(vhdlParser.ARROW);
			this.state = 870;
			this.sequence_of_statements();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public choice(): ChoiceContext {
		let _localctx: ChoiceContext = new ChoiceContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, vhdlParser.RULE_choice);
		try {
			this.state = 876;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 872;
				this.identifier();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 873;
				this.discrete_range();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 874;
				this.simple_expression();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 875;
				this.match(vhdlParser.OTHERS);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public choices(): ChoicesContext {
		let _localctx: ChoicesContext = new ChoicesContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, vhdlParser.RULE_choices);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 878;
			this.choice();
			this.state = 883;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.BAR) {
				{
				{
				this.state = 879;
				this.match(vhdlParser.BAR);
				this.state = 880;
				this.choice();
				}
				}
				this.state = 885;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_configuration(): Component_configurationContext {
		let _localctx: Component_configurationContext = new Component_configurationContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, vhdlParser.RULE_component_configuration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 886;
			this.match(vhdlParser.FOR);
			this.state = 887;
			this.component_specification();
			this.state = 891;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.GENERIC || _la === vhdlParser.PORT || _la === vhdlParser.USE || _la === vhdlParser.SEMI) {
				{
				this.state = 888;
				this.binding_indication();
				this.state = 889;
				this.match(vhdlParser.SEMI);
				}
			}

			this.state = 894;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.FOR) {
				{
				this.state = 893;
				this.block_configuration();
				}
			}

			this.state = 896;
			this.match(vhdlParser.END);
			this.state = 897;
			this.match(vhdlParser.FOR);
			this.state = 898;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_declaration(): Component_declarationContext {
		let _localctx: Component_declarationContext = new Component_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, vhdlParser.RULE_component_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 900;
			this.match(vhdlParser.COMPONENT);
			this.state = 901;
			this.identifier();
			this.state = 903;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IS) {
				{
				this.state = 902;
				this.match(vhdlParser.IS);
				}
			}

			this.state = 906;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.GENERIC) {
				{
				this.state = 905;
				this.generic_clause();
				}
			}

			this.state = 909;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PORT) {
				{
				this.state = 908;
				this.port_clause();
				}
			}

			this.state = 911;
			this.match(vhdlParser.END);
			this.state = 912;
			this.match(vhdlParser.COMPONENT);
			this.state = 914;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 913;
				this.identifier();
				}
			}

			this.state = 916;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_instantiation_statement(): Component_instantiation_statementContext {
		let _localctx: Component_instantiation_statementContext = new Component_instantiation_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, vhdlParser.RULE_component_instantiation_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 918;
			this.label_colon();
			this.state = 919;
			this.instantiated_unit();
			this.state = 921;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.GENERIC) {
				{
				this.state = 920;
				this.generic_map_aspect();
				}
			}

			this.state = 924;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PORT) {
				{
				this.state = 923;
				this.port_map_aspect();
				}
			}

			this.state = 926;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_specification(): Component_specificationContext {
		let _localctx: Component_specificationContext = new Component_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, vhdlParser.RULE_component_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 928;
			this.instantiation_list();
			this.state = 929;
			this.match(vhdlParser.COLON);
			this.state = 930;
			this.name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public composite_nature_definition(): Composite_nature_definitionContext {
		let _localctx: Composite_nature_definitionContext = new Composite_nature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, vhdlParser.RULE_composite_nature_definition);
		try {
			this.state = 934;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.ARRAY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 932;
				this.array_nature_definition();
				}
				break;
			case vhdlParser.RECORD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 933;
				this.record_nature_definition();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public composite_type_definition(): Composite_type_definitionContext {
		let _localctx: Composite_type_definitionContext = new Composite_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, vhdlParser.RULE_composite_type_definition);
		try {
			this.state = 938;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.ARRAY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 936;
				this.array_type_definition();
				}
				break;
			case vhdlParser.RECORD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 937;
				this.record_type_definition();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public concurrent_assertion_statement(): Concurrent_assertion_statementContext {
		let _localctx: Concurrent_assertion_statementContext = new Concurrent_assertion_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, vhdlParser.RULE_concurrent_assertion_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 941;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 940;
				this.label_colon();
				}
			}

			this.state = 944;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.POSTPONED) {
				{
				this.state = 943;
				this.match(vhdlParser.POSTPONED);
				}
			}

			this.state = 946;
			this.assertion();
			this.state = 947;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public concurrent_break_statement(): Concurrent_break_statementContext {
		let _localctx: Concurrent_break_statementContext = new Concurrent_break_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, vhdlParser.RULE_concurrent_break_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 950;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 949;
				this.label_colon();
				}
			}

			this.state = 952;
			this.match(vhdlParser.BREAK);
			this.state = 954;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.FOR || ((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)))) !== 0)) {
				{
				this.state = 953;
				this.break_list();
				}
			}

			this.state = 957;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.ON) {
				{
				this.state = 956;
				this.sensitivity_clause();
				}
			}

			this.state = 961;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.WHEN) {
				{
				this.state = 959;
				this.match(vhdlParser.WHEN);
				this.state = 960;
				this.condition();
				}
			}

			this.state = 963;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public concurrent_procedure_call_statement(): Concurrent_procedure_call_statementContext {
		let _localctx: Concurrent_procedure_call_statementContext = new Concurrent_procedure_call_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, vhdlParser.RULE_concurrent_procedure_call_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 966;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				{
				this.state = 965;
				this.label_colon();
				}
				break;
			}
			this.state = 969;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.POSTPONED) {
				{
				this.state = 968;
				this.match(vhdlParser.POSTPONED);
				}
			}

			this.state = 971;
			this.procedure_call();
			this.state = 972;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public concurrent_signal_assignment_statement(): Concurrent_signal_assignment_statementContext {
		let _localctx: Concurrent_signal_assignment_statementContext = new Concurrent_signal_assignment_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, vhdlParser.RULE_concurrent_signal_assignment_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 975;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				{
				this.state = 974;
				this.label_colon();
				}
				break;
			}
			this.state = 978;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.POSTPONED) {
				{
				this.state = 977;
				this.match(vhdlParser.POSTPONED);
				}
			}

			this.state = 982;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.STRING_LITERAL:
			case vhdlParser.LPAREN:
				{
				this.state = 980;
				this.conditional_signal_assignment();
				}
				break;
			case vhdlParser.WITH:
				{
				this.state = 981;
				this.selected_signal_assignment();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public condition(): ConditionContext {
		let _localctx: ConditionContext = new ConditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, vhdlParser.RULE_condition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 984;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public condition_clause(): Condition_clauseContext {
		let _localctx: Condition_clauseContext = new Condition_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, vhdlParser.RULE_condition_clause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 986;
			this.match(vhdlParser.UNTIL);
			this.state = 987;
			this.condition();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditional_signal_assignment(): Conditional_signal_assignmentContext {
		let _localctx: Conditional_signal_assignmentContext = new Conditional_signal_assignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, vhdlParser.RULE_conditional_signal_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 989;
			this.target();
			this.state = 990;
			this.match(vhdlParser.LE);
			this.state = 991;
			this.opts();
			this.state = 992;
			this.conditional_waveforms();
			this.state = 993;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditional_waveforms(): Conditional_waveformsContext {
		let _localctx: Conditional_waveformsContext = new Conditional_waveformsContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, vhdlParser.RULE_conditional_waveforms);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 995;
			this.waveform();
			this.state = 1002;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.WHEN) {
				{
				this.state = 996;
				this.match(vhdlParser.WHEN);
				this.state = 997;
				this.condition();
				this.state = 1000;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.ELSE) {
					{
					this.state = 998;
					this.match(vhdlParser.ELSE);
					this.state = 999;
					this.conditional_waveforms();
					}
				}

				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public configuration_declaration(): Configuration_declarationContext {
		let _localctx: Configuration_declarationContext = new Configuration_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, vhdlParser.RULE_configuration_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1004;
			this.match(vhdlParser.CONFIGURATION);
			this.state = 1005;
			this.identifier();
			this.state = 1006;
			this.match(vhdlParser.OF);
			this.state = 1007;
			this.name();
			this.state = 1008;
			this.match(vhdlParser.IS);
			this.state = 1009;
			this.configuration_declarative_part();
			this.state = 1010;
			this.block_configuration();
			this.state = 1011;
			this.match(vhdlParser.END);
			this.state = 1013;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.CONFIGURATION) {
				{
				this.state = 1012;
				this.match(vhdlParser.CONFIGURATION);
				}
			}

			this.state = 1016;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1015;
				this.identifier();
				}
			}

			this.state = 1018;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public configuration_declarative_item(): Configuration_declarative_itemContext {
		let _localctx: Configuration_declarative_itemContext = new Configuration_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, vhdlParser.RULE_configuration_declarative_item);
		try {
			this.state = 1023;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.USE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1020;
				this.use_clause();
				}
				break;
			case vhdlParser.ATTRIBUTE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1021;
				this.attribute_specification();
				}
				break;
			case vhdlParser.GROUP:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1022;
				this.group_declaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public configuration_declarative_part(): Configuration_declarative_partContext {
		let _localctx: Configuration_declarative_partContext = new Configuration_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, vhdlParser.RULE_configuration_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1028;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.ATTRIBUTE || _la === vhdlParser.GROUP || _la === vhdlParser.USE) {
				{
				{
				this.state = 1025;
				this.configuration_declarative_item();
				}
				}
				this.state = 1030;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public configuration_item(): Configuration_itemContext {
		let _localctx: Configuration_itemContext = new Configuration_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, vhdlParser.RULE_configuration_item);
		try {
			this.state = 1033;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1031;
				this.block_configuration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1032;
				this.component_configuration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public configuration_specification(): Configuration_specificationContext {
		let _localctx: Configuration_specificationContext = new Configuration_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, vhdlParser.RULE_configuration_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1035;
			this.match(vhdlParser.FOR);
			this.state = 1036;
			this.component_specification();
			this.state = 1037;
			this.binding_indication();
			this.state = 1038;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constant_declaration(): Constant_declarationContext {
		let _localctx: Constant_declarationContext = new Constant_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, vhdlParser.RULE_constant_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1040;
			this.match(vhdlParser.CONSTANT);
			this.state = 1041;
			this.identifier_list();
			this.state = 1042;
			this.match(vhdlParser.COLON);
			this.state = 1043;
			this.subtype_indication();
			this.state = 1046;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 1044;
				this.match(vhdlParser.VARASGN);
				this.state = 1045;
				this.expression();
				}
			}

			this.state = 1048;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constrained_array_definition(): Constrained_array_definitionContext {
		let _localctx: Constrained_array_definitionContext = new Constrained_array_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, vhdlParser.RULE_constrained_array_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1050;
			this.match(vhdlParser.ARRAY);
			this.state = 1051;
			this.index_constraint();
			this.state = 1052;
			this.match(vhdlParser.OF);
			this.state = 1053;
			this.subtype_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constrained_nature_definition(): Constrained_nature_definitionContext {
		let _localctx: Constrained_nature_definitionContext = new Constrained_nature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, vhdlParser.RULE_constrained_nature_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1055;
			this.match(vhdlParser.ARRAY);
			this.state = 1056;
			this.index_constraint();
			this.state = 1057;
			this.match(vhdlParser.OF);
			this.state = 1058;
			this.subnature_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constraint(): ConstraintContext {
		let _localctx: ConstraintContext = new ConstraintContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, vhdlParser.RULE_constraint);
		try {
			this.state = 1062;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.RANGE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1060;
				this.range_constraint();
				}
				break;
			case vhdlParser.LPAREN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1061;
				this.index_constraint();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public context_clause(): Context_clauseContext {
		let _localctx: Context_clauseContext = new Context_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, vhdlParser.RULE_context_clause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1067;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.LIBRARY || _la === vhdlParser.USE) {
				{
				{
				this.state = 1064;
				this.context_item();
				}
				}
				this.state = 1069;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public context_item(): Context_itemContext {
		let _localctx: Context_itemContext = new Context_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, vhdlParser.RULE_context_item);
		try {
			this.state = 1072;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.LIBRARY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1070;
				this.library_clause();
				}
				break;
			case vhdlParser.USE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1071;
				this.use_clause();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public delay_mechanism(): Delay_mechanismContext {
		let _localctx: Delay_mechanismContext = new Delay_mechanismContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, vhdlParser.RULE_delay_mechanism);
		let _la: number;
		try {
			this.state = 1080;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.TRANSPORT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1074;
				this.match(vhdlParser.TRANSPORT);
				}
				break;
			case vhdlParser.INERTIAL:
			case vhdlParser.REJECT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1077;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.REJECT) {
					{
					this.state = 1075;
					this.match(vhdlParser.REJECT);
					this.state = 1076;
					this.expression();
					}
				}

				this.state = 1079;
				this.match(vhdlParser.INERTIAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public design_file(): Design_fileContext {
		let _localctx: Design_fileContext = new Design_fileContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, vhdlParser.RULE_design_file);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1085;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ARCHITECTURE) | (1 << vhdlParser.CONFIGURATION) | (1 << vhdlParser.ENTITY))) !== 0) || _la === vhdlParser.LIBRARY || _la === vhdlParser.PACKAGE || _la === vhdlParser.USE) {
				{
				{
				this.state = 1082;
				this.design_unit();
				}
				}
				this.state = 1087;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1088;
			this.match(vhdlParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public design_unit(): Design_unitContext {
		let _localctx: Design_unitContext = new Design_unitContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, vhdlParser.RULE_design_unit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1090;
			this.context_clause();
			this.state = 1091;
			this.library_unit();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public designator(): DesignatorContext {
		let _localctx: DesignatorContext = new DesignatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, vhdlParser.RULE_designator);
		try {
			this.state = 1095;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1093;
				this.identifier();
				}
				break;
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1094;
				this.match(vhdlParser.STRING_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public direction(): DirectionContext {
		let _localctx: DirectionContext = new DirectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, vhdlParser.RULE_direction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1097;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.DOWNTO || _la === vhdlParser.TO)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public disconnection_specification(): Disconnection_specificationContext {
		let _localctx: Disconnection_specificationContext = new Disconnection_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, vhdlParser.RULE_disconnection_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1099;
			this.match(vhdlParser.DISCONNECT);
			this.state = 1100;
			this.guarded_signal_specification();
			this.state = 1101;
			this.match(vhdlParser.AFTER);
			this.state = 1102;
			this.expression();
			this.state = 1103;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public discrete_range(): Discrete_rangeContext {
		let _localctx: Discrete_rangeContext = new Discrete_rangeContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, vhdlParser.RULE_discrete_range);
		try {
			this.state = 1107;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 92, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1105;
				this.range_decl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1106;
				this.subtype_indication();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public element_association(): Element_associationContext {
		let _localctx: Element_associationContext = new Element_associationContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, vhdlParser.RULE_element_association);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1112;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 93, this._ctx) ) {
			case 1:
				{
				this.state = 1109;
				this.choices();
				this.state = 1110;
				this.match(vhdlParser.ARROW);
				}
				break;
			}
			this.state = 1114;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public element_declaration(): Element_declarationContext {
		let _localctx: Element_declarationContext = new Element_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, vhdlParser.RULE_element_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1116;
			this.identifier_list();
			this.state = 1117;
			this.match(vhdlParser.COLON);
			this.state = 1118;
			this.element_subtype_definition();
			this.state = 1119;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public element_subnature_definition(): Element_subnature_definitionContext {
		let _localctx: Element_subnature_definitionContext = new Element_subnature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, vhdlParser.RULE_element_subnature_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1121;
			this.subnature_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public element_subtype_definition(): Element_subtype_definitionContext {
		let _localctx: Element_subtype_definitionContext = new Element_subtype_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, vhdlParser.RULE_element_subtype_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1123;
			this.subtype_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_aspect(): Entity_aspectContext {
		let _localctx: Entity_aspectContext = new Entity_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, vhdlParser.RULE_entity_aspect);
		let _la: number;
		try {
			this.state = 1136;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.ENTITY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1125;
				this.match(vhdlParser.ENTITY);
				this.state = 1126;
				this.name();
				this.state = 1131;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.LPAREN) {
					{
					this.state = 1127;
					this.match(vhdlParser.LPAREN);
					this.state = 1128;
					this.identifier();
					this.state = 1129;
					this.match(vhdlParser.RPAREN);
					}
				}

				}
				break;
			case vhdlParser.CONFIGURATION:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1133;
				this.match(vhdlParser.CONFIGURATION);
				this.state = 1134;
				this.name();
				}
				break;
			case vhdlParser.OPEN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1135;
				this.match(vhdlParser.OPEN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_class(): Entity_classContext {
		let _localctx: Entity_classContext = new Entity_classContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, vhdlParser.RULE_entity_class);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1138;
			_la = this._input.LA(1);
			if (!(((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & ((1 << (vhdlParser.ARCHITECTURE - 8)) | (1 << (vhdlParser.COMPONENT - 8)) | (1 << (vhdlParser.CONFIGURATION - 8)) | (1 << (vhdlParser.CONSTANT - 8)) | (1 << (vhdlParser.ENTITY - 8)) | (1 << (vhdlParser.FILE - 8)) | (1 << (vhdlParser.FUNCTION - 8)) | (1 << (vhdlParser.GROUP - 8)))) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & ((1 << (vhdlParser.LABEL - 42)) | (1 << (vhdlParser.LITERAL - 42)) | (1 << (vhdlParser.NATURE - 42)) | (1 << (vhdlParser.PACKAGE - 42)) | (1 << (vhdlParser.PROCEDURE - 42)) | (1 << (vhdlParser.QUANTITY - 42)))) !== 0) || ((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & ((1 << (vhdlParser.SIGNAL - 86)) | (1 << (vhdlParser.SUBNATURE - 86)) | (1 << (vhdlParser.SUBTYPE - 86)) | (1 << (vhdlParser.TERMINAL - 86)) | (1 << (vhdlParser.TYPE - 86)) | (1 << (vhdlParser.UNITS - 86)) | (1 << (vhdlParser.VARIABLE - 86)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_class_entry(): Entity_class_entryContext {
		let _localctx: Entity_class_entryContext = new Entity_class_entryContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, vhdlParser.RULE_entity_class_entry);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1140;
			this.entity_class();
			this.state = 1142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BOX) {
				{
				this.state = 1141;
				this.match(vhdlParser.BOX);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_class_entry_list(): Entity_class_entry_listContext {
		let _localctx: Entity_class_entry_listContext = new Entity_class_entry_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, vhdlParser.RULE_entity_class_entry_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1144;
			this.entity_class_entry();
			this.state = 1149;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 1145;
				this.match(vhdlParser.COMMA);
				this.state = 1146;
				this.entity_class_entry();
				}
				}
				this.state = 1151;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_declaration(): Entity_declarationContext {
		let _localctx: Entity_declarationContext = new Entity_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, vhdlParser.RULE_entity_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1152;
			this.match(vhdlParser.ENTITY);
			this.state = 1153;
			this.identifier();
			this.state = 1154;
			this.match(vhdlParser.IS);
			this.state = 1155;
			this.entity_header();
			this.state = 1156;
			this.entity_declarative_part();
			this.state = 1159;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BEGIN) {
				{
				this.state = 1157;
				this.match(vhdlParser.BEGIN);
				this.state = 1158;
				this.entity_statement_part();
				}
			}

			this.state = 1161;
			this.match(vhdlParser.END);
			this.state = 1163;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.ENTITY) {
				{
				this.state = 1162;
				this.match(vhdlParser.ENTITY);
				}
			}

			this.state = 1166;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1165;
				this.identifier();
				}
			}

			this.state = 1168;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_declarative_item(): Entity_declarative_itemContext {
		let _localctx: Entity_declarative_itemContext = new Entity_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, vhdlParser.RULE_entity_declarative_item);
		try {
			this.state = 1190;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 101, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1170;
				this.subprogram_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1171;
				this.subprogram_body();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1172;
				this.type_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1173;
				this.subtype_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1174;
				this.constant_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1175;
				this.signal_declaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1176;
				this.variable_declaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1177;
				this.file_declaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1178;
				this.alias_declaration();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1179;
				this.attribute_declaration();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1180;
				this.attribute_specification();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 1181;
				this.disconnection_specification();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 1182;
				this.step_limit_specification();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 1183;
				this.use_clause();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 1184;
				this.group_template_declaration();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 1185;
				this.group_declaration();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 1186;
				this.nature_declaration();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 1187;
				this.subnature_declaration();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 1188;
				this.quantity_declaration();
				}
				break;

			case 20:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 1189;
				this.terminal_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_declarative_part(): Entity_declarative_partContext {
		let _localctx: Entity_declarative_partContext = new Entity_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, vhdlParser.RULE_entity_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1195;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.DISCONNECT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FUNCTION))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (vhdlParser.GROUP - 34)) | (1 << (vhdlParser.IMPURE - 34)) | (1 << (vhdlParser.LIMIT - 34)) | (1 << (vhdlParser.NATURE - 34)))) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.QUANTITY - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SIGNAL - 68)) | (1 << (vhdlParser.SUBNATURE - 68)) | (1 << (vhdlParser.SUBTYPE - 68)) | (1 << (vhdlParser.TERMINAL - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 1192;
				this.entity_declarative_item();
				}
				}
				this.state = 1197;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_designator(): Entity_designatorContext {
		let _localctx: Entity_designatorContext = new Entity_designatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, vhdlParser.RULE_entity_designator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1198;
			this.entity_tag();
			this.state = 1200;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LBRACKET) {
				{
				this.state = 1199;
				this.signature();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_header(): Entity_headerContext {
		let _localctx: Entity_headerContext = new Entity_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, vhdlParser.RULE_entity_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1203;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.GENERIC) {
				{
				this.state = 1202;
				this.generic_clause();
				}
			}

			this.state = 1206;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PORT) {
				{
				this.state = 1205;
				this.port_clause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_name_list(): Entity_name_listContext {
		let _localctx: Entity_name_listContext = new Entity_name_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, vhdlParser.RULE_entity_name_list);
		let _la: number;
		try {
			this.state = 1218;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.CHARACTER_LITERAL:
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1208;
				this.entity_designator();
				this.state = 1213;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vhdlParser.COMMA) {
					{
					{
					this.state = 1209;
					this.match(vhdlParser.COMMA);
					this.state = 1210;
					this.entity_designator();
					}
					}
					this.state = 1215;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case vhdlParser.OTHERS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1216;
				this.match(vhdlParser.OTHERS);
				}
				break;
			case vhdlParser.ALL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1217;
				this.match(vhdlParser.ALL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_specification(): Entity_specificationContext {
		let _localctx: Entity_specificationContext = new Entity_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, vhdlParser.RULE_entity_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1220;
			this.entity_name_list();
			this.state = 1221;
			this.match(vhdlParser.COLON);
			this.state = 1222;
			this.entity_class();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_statement(): Entity_statementContext {
		let _localctx: Entity_statementContext = new Entity_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, vhdlParser.RULE_entity_statement);
		try {
			this.state = 1227;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 108, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1224;
				this.concurrent_assertion_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1225;
				this.process_statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1226;
				this.concurrent_procedure_call_statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_statement_part(): Entity_statement_partContext {
		let _localctx: Entity_statement_partContext = new Entity_statement_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, vhdlParser.RULE_entity_statement_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1232;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.ASSERT || _la === vhdlParser.POSTPONED || _la === vhdlParser.PROCESS || _la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				{
				this.state = 1229;
				this.entity_statement();
				}
				}
				this.state = 1234;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public entity_tag(): Entity_tagContext {
		let _localctx: Entity_tagContext = new Entity_tagContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, vhdlParser.RULE_entity_tag);
		try {
			this.state = 1238;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1235;
				this.identifier();
				}
				break;
			case vhdlParser.CHARACTER_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1236;
				this.match(vhdlParser.CHARACTER_LITERAL);
				}
				break;
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1237;
				this.match(vhdlParser.STRING_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumeration_literal(): Enumeration_literalContext {
		let _localctx: Enumeration_literalContext = new Enumeration_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, vhdlParser.RULE_enumeration_literal);
		try {
			this.state = 1242;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1240;
				this.identifier();
				}
				break;
			case vhdlParser.CHARACTER_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1241;
				this.match(vhdlParser.CHARACTER_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumeration_type_definition(): Enumeration_type_definitionContext {
		let _localctx: Enumeration_type_definitionContext = new Enumeration_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, vhdlParser.RULE_enumeration_type_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1244;
			this.match(vhdlParser.LPAREN);
			this.state = 1245;
			this.enumeration_literal();
			this.state = 1250;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 1246;
				this.match(vhdlParser.COMMA);
				this.state = 1247;
				this.enumeration_literal();
				}
				}
				this.state = 1252;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1253;
			this.match(vhdlParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exit_statement(): Exit_statementContext {
		let _localctx: Exit_statementContext = new Exit_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 190, vhdlParser.RULE_exit_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1256;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1255;
				this.label_colon();
				}
			}

			this.state = 1258;
			this.match(vhdlParser.EXIT);
			this.state = 1260;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1259;
				this.identifier();
				}
			}

			this.state = 1264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.WHEN) {
				{
				this.state = 1262;
				this.match(vhdlParser.WHEN);
				this.state = 1263;
				this.condition();
				}
			}

			this.state = 1266;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, vhdlParser.RULE_expression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1268;
			this.relation();
			this.state = 1274;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 116, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1269;
					this.logical_operator();
					this.state = 1270;
					this.relation();
					}
					}
				}
				this.state = 1276;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 116, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public factor(): FactorContext {
		let _localctx: FactorContext = new FactorContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, vhdlParser.RULE_factor);
		try {
			this.state = 1286;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.NEW:
			case vhdlParser.NULL_:
			case vhdlParser.BASE_LITERAL:
			case vhdlParser.BIT_STRING_LITERAL:
			case vhdlParser.REAL_LITERAL:
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.CHARACTER_LITERAL:
			case vhdlParser.STRING_LITERAL:
			case vhdlParser.LPAREN:
			case vhdlParser.INTEGER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1277;
				this.primary();
				this.state = 1280;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 117, this._ctx) ) {
				case 1:
					{
					this.state = 1278;
					this.match(vhdlParser.DOUBLESTAR);
					this.state = 1279;
					this.primary();
					}
					break;
				}
				}
				break;
			case vhdlParser.ABS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1282;
				this.match(vhdlParser.ABS);
				this.state = 1283;
				this.primary();
				}
				break;
			case vhdlParser.NOT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1284;
				this.match(vhdlParser.NOT);
				this.state = 1285;
				this.primary();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public file_declaration(): File_declarationContext {
		let _localctx: File_declarationContext = new File_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, vhdlParser.RULE_file_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1288;
			this.match(vhdlParser.FILE);
			this.state = 1289;
			this.identifier_list();
			this.state = 1290;
			this.match(vhdlParser.COLON);
			this.state = 1291;
			this.subtype_indication();
			this.state = 1293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IS || _la === vhdlParser.OPEN) {
				{
				this.state = 1292;
				this.file_open_information();
				}
			}

			this.state = 1295;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public file_logical_name(): File_logical_nameContext {
		let _localctx: File_logical_nameContext = new File_logical_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, vhdlParser.RULE_file_logical_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1297;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public file_open_information(): File_open_informationContext {
		let _localctx: File_open_informationContext = new File_open_informationContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, vhdlParser.RULE_file_open_information);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.OPEN) {
				{
				this.state = 1299;
				this.match(vhdlParser.OPEN);
				this.state = 1300;
				this.expression();
				}
			}

			this.state = 1303;
			this.match(vhdlParser.IS);
			this.state = 1304;
			this.file_logical_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public file_type_definition(): File_type_definitionContext {
		let _localctx: File_type_definitionContext = new File_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 202, vhdlParser.RULE_file_type_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1306;
			this.match(vhdlParser.FILE);
			this.state = 1307;
			this.match(vhdlParser.OF);
			this.state = 1308;
			this.subtype_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formal_parameter_list(): Formal_parameter_listContext {
		let _localctx: Formal_parameter_listContext = new Formal_parameter_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, vhdlParser.RULE_formal_parameter_list);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1310;
			this.interface_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formal_part(): Formal_partContext {
		let _localctx: Formal_partContext = new Formal_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, vhdlParser.RULE_formal_part);
		try {
			this.state = 1318;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 121, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1312;
				this.identifier();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1313;
				this.identifier();
				this.state = 1314;
				this.match(vhdlParser.LPAREN);
				this.state = 1315;
				this.explicit_range();
				this.state = 1316;
				this.match(vhdlParser.RPAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public free_quantity_declaration(): Free_quantity_declarationContext {
		let _localctx: Free_quantity_declarationContext = new Free_quantity_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 208, vhdlParser.RULE_free_quantity_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1320;
			this.match(vhdlParser.QUANTITY);
			this.state = 1321;
			this.identifier_list();
			this.state = 1322;
			this.match(vhdlParser.COLON);
			this.state = 1323;
			this.subtype_indication();
			this.state = 1326;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 1324;
				this.match(vhdlParser.VARASGN);
				this.state = 1325;
				this.expression();
				}
			}

			this.state = 1328;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generate_statement(): Generate_statementContext {
		let _localctx: Generate_statementContext = new Generate_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 210, vhdlParser.RULE_generate_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1330;
			this.label_colon();
			this.state = 1331;
			this.generation_scheme();
			this.state = 1332;
			this.match(vhdlParser.GENERATE);
			this.state = 1340;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.BEGIN) | (1 << vhdlParser.COMPONENT) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.DISCONNECT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FOR) | (1 << vhdlParser.FUNCTION))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (vhdlParser.GROUP - 34)) | (1 << (vhdlParser.IMPURE - 34)) | (1 << (vhdlParser.LIMIT - 34)) | (1 << (vhdlParser.NATURE - 34)))) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.QUANTITY - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SIGNAL - 68)) | (1 << (vhdlParser.SUBNATURE - 68)) | (1 << (vhdlParser.SUBTYPE - 68)) | (1 << (vhdlParser.TERMINAL - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				this.state = 1336;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.COMPONENT) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.DISCONNECT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FOR) | (1 << vhdlParser.FUNCTION))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (vhdlParser.GROUP - 34)) | (1 << (vhdlParser.IMPURE - 34)) | (1 << (vhdlParser.LIMIT - 34)) | (1 << (vhdlParser.NATURE - 34)))) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.QUANTITY - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SIGNAL - 68)) | (1 << (vhdlParser.SUBNATURE - 68)) | (1 << (vhdlParser.SUBTYPE - 68)) | (1 << (vhdlParser.TERMINAL - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
					{
					{
					this.state = 1333;
					this.block_declarative_item();
					}
					}
					this.state = 1338;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1339;
				this.match(vhdlParser.BEGIN);
				}
			}

			this.state = 1345;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ABS) | (1 << vhdlParser.ASSERT) | (1 << vhdlParser.BREAK) | (1 << vhdlParser.CASE))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.NEW - 36)) | (1 << (vhdlParser.NOT - 36)) | (1 << (vhdlParser.NULL_ - 36)) | (1 << (vhdlParser.POSTPONED - 36)) | (1 << (vhdlParser.PROCESS - 36)))) !== 0) || _la === vhdlParser.PROCEDURAL || ((((_la - 107)) & ~0x1F) === 0 && ((1 << (_la - 107)) & ((1 << (vhdlParser.WITH - 107)) | (1 << (vhdlParser.BASE_LITERAL - 107)) | (1 << (vhdlParser.BIT_STRING_LITERAL - 107)) | (1 << (vhdlParser.REAL_LITERAL - 107)) | (1 << (vhdlParser.BASIC_IDENTIFIER - 107)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 107)) | (1 << (vhdlParser.CHARACTER_LITERAL - 107)) | (1 << (vhdlParser.STRING_LITERAL - 107)))) !== 0) || ((((_la - 141)) & ~0x1F) === 0 && ((1 << (_la - 141)) & ((1 << (vhdlParser.LPAREN - 141)) | (1 << (vhdlParser.PLUS - 141)) | (1 << (vhdlParser.MINUS - 141)) | (1 << (vhdlParser.INTEGER - 141)))) !== 0)) {
				{
				{
				this.state = 1342;
				this.architecture_statement();
				}
				}
				this.state = 1347;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1348;
			this.match(vhdlParser.END);
			this.state = 1349;
			this.match(vhdlParser.GENERATE);
			this.state = 1351;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1350;
				this.identifier();
				}
			}

			this.state = 1353;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generation_scheme(): Generation_schemeContext {
		let _localctx: Generation_schemeContext = new Generation_schemeContext(this._ctx, this.state);
		this.enterRule(_localctx, 212, vhdlParser.RULE_generation_scheme);
		try {
			this.state = 1359;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.FOR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1355;
				this.match(vhdlParser.FOR);
				this.state = 1356;
				this.parameter_specification();
				}
				break;
			case vhdlParser.IF:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1357;
				this.match(vhdlParser.IF);
				this.state = 1358;
				this.condition();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generic_clause(): Generic_clauseContext {
		let _localctx: Generic_clauseContext = new Generic_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 214, vhdlParser.RULE_generic_clause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1361;
			this.match(vhdlParser.GENERIC);
			this.state = 1362;
			this.match(vhdlParser.LPAREN);
			this.state = 1363;
			this.generic_list();
			this.state = 1364;
			this.match(vhdlParser.RPAREN);
			this.state = 1365;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generic_list(): Generic_listContext {
		let _localctx: Generic_listContext = new Generic_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 216, vhdlParser.RULE_generic_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1367;
			this.interface_constant_declaration();
			this.state = 1372;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.SEMI) {
				{
				{
				this.state = 1368;
				this.match(vhdlParser.SEMI);
				this.state = 1369;
				this.interface_constant_declaration();
				}
				}
				this.state = 1374;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generic_map_aspect(): Generic_map_aspectContext {
		let _localctx: Generic_map_aspectContext = new Generic_map_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 218, vhdlParser.RULE_generic_map_aspect);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1375;
			this.match(vhdlParser.GENERIC);
			this.state = 1376;
			this.match(vhdlParser.MAP);
			this.state = 1377;
			this.match(vhdlParser.LPAREN);
			this.state = 1378;
			this.association_list();
			this.state = 1379;
			this.match(vhdlParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public group_constituent(): Group_constituentContext {
		let _localctx: Group_constituentContext = new Group_constituentContext(this._ctx, this.state);
		this.enterRule(_localctx, 220, vhdlParser.RULE_group_constituent);
		try {
			this.state = 1383;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1381;
				this.name();
				}
				break;
			case vhdlParser.CHARACTER_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1382;
				this.match(vhdlParser.CHARACTER_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public group_constituent_list(): Group_constituent_listContext {
		let _localctx: Group_constituent_listContext = new Group_constituent_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 222, vhdlParser.RULE_group_constituent_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1385;
			this.group_constituent();
			this.state = 1390;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 1386;
				this.match(vhdlParser.COMMA);
				this.state = 1387;
				this.group_constituent();
				}
				}
				this.state = 1392;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public group_declaration(): Group_declarationContext {
		let _localctx: Group_declarationContext = new Group_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 224, vhdlParser.RULE_group_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1393;
			this.match(vhdlParser.GROUP);
			this.state = 1394;
			this.label_colon();
			this.state = 1395;
			this.name();
			this.state = 1396;
			this.match(vhdlParser.LPAREN);
			this.state = 1397;
			this.group_constituent_list();
			this.state = 1398;
			this.match(vhdlParser.RPAREN);
			this.state = 1399;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public group_template_declaration(): Group_template_declarationContext {
		let _localctx: Group_template_declarationContext = new Group_template_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 226, vhdlParser.RULE_group_template_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1401;
			this.match(vhdlParser.GROUP);
			this.state = 1402;
			this.identifier();
			this.state = 1403;
			this.match(vhdlParser.IS);
			this.state = 1404;
			this.match(vhdlParser.LPAREN);
			this.state = 1405;
			this.entity_class_entry_list();
			this.state = 1406;
			this.match(vhdlParser.RPAREN);
			this.state = 1407;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public guarded_signal_specification(): Guarded_signal_specificationContext {
		let _localctx: Guarded_signal_specificationContext = new Guarded_signal_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 228, vhdlParser.RULE_guarded_signal_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1409;
			this.signal_list();
			this.state = 1410;
			this.match(vhdlParser.COLON);
			this.state = 1411;
			this.name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 230, vhdlParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1413;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier_list(): Identifier_listContext {
		let _localctx: Identifier_listContext = new Identifier_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 232, vhdlParser.RULE_identifier_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1415;
			this.identifier();
			this.state = 1420;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 1416;
				this.match(vhdlParser.COMMA);
				this.state = 1417;
				this.identifier();
				}
				}
				this.state = 1422;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public if_statement(): If_statementContext {
		let _localctx: If_statementContext = new If_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 234, vhdlParser.RULE_if_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1424;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1423;
				this.label_colon();
				}
			}

			this.state = 1426;
			this.match(vhdlParser.IF);
			this.state = 1427;
			this.condition();
			this.state = 1428;
			this.match(vhdlParser.THEN);
			this.state = 1429;
			this.sequence_of_statements();
			this.state = 1437;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.ELSIF) {
				{
				{
				this.state = 1430;
				this.match(vhdlParser.ELSIF);
				this.state = 1431;
				this.condition();
				this.state = 1432;
				this.match(vhdlParser.THEN);
				this.state = 1433;
				this.sequence_of_statements();
				}
				}
				this.state = 1439;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1442;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.ELSE) {
				{
				this.state = 1440;
				this.match(vhdlParser.ELSE);
				this.state = 1441;
				this.sequence_of_statements();
				}
			}

			this.state = 1444;
			this.match(vhdlParser.END);
			this.state = 1445;
			this.match(vhdlParser.IF);
			this.state = 1447;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1446;
				this.identifier();
				}
			}

			this.state = 1449;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public index_constraint(): Index_constraintContext {
		let _localctx: Index_constraintContext = new Index_constraintContext(this._ctx, this.state);
		this.enterRule(_localctx, 236, vhdlParser.RULE_index_constraint);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1451;
			this.match(vhdlParser.LPAREN);
			this.state = 1452;
			this.discrete_range();
			this.state = 1457;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 1453;
				this.match(vhdlParser.COMMA);
				this.state = 1454;
				this.discrete_range();
				}
				}
				this.state = 1459;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1460;
			this.match(vhdlParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public index_specification(): Index_specificationContext {
		let _localctx: Index_specificationContext = new Index_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 238, vhdlParser.RULE_index_specification);
		try {
			this.state = 1464;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 137, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1462;
				this.discrete_range();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1463;
				this.expression();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public index_subtype_definition(): Index_subtype_definitionContext {
		let _localctx: Index_subtype_definitionContext = new Index_subtype_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 240, vhdlParser.RULE_index_subtype_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1466;
			this.name();
			this.state = 1467;
			this.match(vhdlParser.RANGE);
			this.state = 1468;
			this.match(vhdlParser.BOX);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public instantiated_unit(): Instantiated_unitContext {
		let _localctx: Instantiated_unitContext = new Instantiated_unitContext(this._ctx, this.state);
		this.enterRule(_localctx, 242, vhdlParser.RULE_instantiated_unit);
		let _la: number;
		try {
			this.state = 1484;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.COMPONENT:
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1471;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.COMPONENT) {
					{
					this.state = 1470;
					this.match(vhdlParser.COMPONENT);
					}
				}

				this.state = 1473;
				this.name();
				}
				break;
			case vhdlParser.ENTITY:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1474;
				this.match(vhdlParser.ENTITY);
				this.state = 1475;
				this.name();
				this.state = 1480;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.LPAREN) {
					{
					this.state = 1476;
					this.match(vhdlParser.LPAREN);
					this.state = 1477;
					this.identifier();
					this.state = 1478;
					this.match(vhdlParser.RPAREN);
					}
				}

				}
				break;
			case vhdlParser.CONFIGURATION:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1482;
				this.match(vhdlParser.CONFIGURATION);
				this.state = 1483;
				this.name();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public instantiation_list(): Instantiation_listContext {
		let _localctx: Instantiation_listContext = new Instantiation_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 244, vhdlParser.RULE_instantiation_list);
		let _la: number;
		try {
			this.state = 1496;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1486;
				this.identifier();
				this.state = 1491;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vhdlParser.COMMA) {
					{
					{
					this.state = 1487;
					this.match(vhdlParser.COMMA);
					this.state = 1488;
					this.identifier();
					}
					}
					this.state = 1493;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case vhdlParser.OTHERS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1494;
				this.match(vhdlParser.OTHERS);
				}
				break;
			case vhdlParser.ALL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1495;
				this.match(vhdlParser.ALL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_constant_declaration(): Interface_constant_declarationContext {
		let _localctx: Interface_constant_declarationContext = new Interface_constant_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 246, vhdlParser.RULE_interface_constant_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1499;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.CONSTANT) {
				{
				this.state = 1498;
				this.match(vhdlParser.CONSTANT);
				}
			}

			this.state = 1501;
			this.identifier_list();
			this.state = 1502;
			this.match(vhdlParser.COLON);
			this.state = 1504;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IN) {
				{
				this.state = 1503;
				this.match(vhdlParser.IN);
				}
			}

			this.state = 1506;
			this.subtype_indication();
			this.state = 1509;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 1507;
				this.match(vhdlParser.VARASGN);
				this.state = 1508;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_declaration(): Interface_declarationContext {
		let _localctx: Interface_declarationContext = new Interface_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 248, vhdlParser.RULE_interface_declaration);
		try {
			this.state = 1517;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 146, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1511;
				this.interface_constant_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1512;
				this.interface_signal_declaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1513;
				this.interface_variable_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1514;
				this.interface_file_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1515;
				this.interface_terminal_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1516;
				this.interface_quantity_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_element(): Interface_elementContext {
		let _localctx: Interface_elementContext = new Interface_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 250, vhdlParser.RULE_interface_element);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1519;
			this.interface_declaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_file_declaration(): Interface_file_declarationContext {
		let _localctx: Interface_file_declarationContext = new Interface_file_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 252, vhdlParser.RULE_interface_file_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1521;
			this.match(vhdlParser.FILE);
			this.state = 1522;
			this.identifier_list();
			this.state = 1523;
			this.match(vhdlParser.COLON);
			this.state = 1524;
			this.subtype_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_signal_list(): Interface_signal_listContext {
		let _localctx: Interface_signal_listContext = new Interface_signal_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 254, vhdlParser.RULE_interface_signal_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1526;
			this.interface_signal_declaration();
			this.state = 1531;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.SEMI) {
				{
				{
				this.state = 1527;
				this.match(vhdlParser.SEMI);
				this.state = 1528;
				this.interface_signal_declaration();
				}
				}
				this.state = 1533;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_port_list(): Interface_port_listContext {
		let _localctx: Interface_port_listContext = new Interface_port_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 256, vhdlParser.RULE_interface_port_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1534;
			this.interface_port_declaration();
			this.state = 1539;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.SEMI) {
				{
				{
				this.state = 1535;
				this.match(vhdlParser.SEMI);
				this.state = 1536;
				this.interface_port_declaration();
				}
				}
				this.state = 1541;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_list(): Interface_listContext {
		let _localctx: Interface_listContext = new Interface_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 258, vhdlParser.RULE_interface_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1542;
			this.interface_element();
			this.state = 1547;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.SEMI) {
				{
				{
				this.state = 1543;
				this.match(vhdlParser.SEMI);
				this.state = 1544;
				this.interface_element();
				}
				}
				this.state = 1549;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_quantity_declaration(): Interface_quantity_declarationContext {
		let _localctx: Interface_quantity_declarationContext = new Interface_quantity_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 260, vhdlParser.RULE_interface_quantity_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1550;
			this.match(vhdlParser.QUANTITY);
			this.state = 1551;
			this.identifier_list();
			this.state = 1552;
			this.match(vhdlParser.COLON);
			this.state = 1554;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IN || _la === vhdlParser.OUT) {
				{
				this.state = 1553;
				_la = this._input.LA(1);
				if (!(_la === vhdlParser.IN || _la === vhdlParser.OUT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 1556;
			this.subtype_indication();
			this.state = 1559;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 1557;
				this.match(vhdlParser.VARASGN);
				this.state = 1558;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_port_declaration(): Interface_port_declarationContext {
		let _localctx: Interface_port_declarationContext = new Interface_port_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 262, vhdlParser.RULE_interface_port_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1561;
			this.identifier_list();
			this.state = 1562;
			this.match(vhdlParser.COLON);
			this.state = 1564;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BUFFER || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (vhdlParser.IN - 38)) | (1 << (vhdlParser.INOUT - 38)) | (1 << (vhdlParser.LINKAGE - 38)) | (1 << (vhdlParser.OUT - 38)))) !== 0)) {
				{
				this.state = 1563;
				this.signal_mode();
				}
			}

			this.state = 1566;
			this.subtype_indication();
			this.state = 1568;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BUS) {
				{
				this.state = 1567;
				this.match(vhdlParser.BUS);
				}
			}

			this.state = 1572;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 1570;
				this.match(vhdlParser.VARASGN);
				this.state = 1571;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_signal_declaration(): Interface_signal_declarationContext {
		let _localctx: Interface_signal_declarationContext = new Interface_signal_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 264, vhdlParser.RULE_interface_signal_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1574;
			this.match(vhdlParser.SIGNAL);
			this.state = 1575;
			this.identifier_list();
			this.state = 1576;
			this.match(vhdlParser.COLON);
			this.state = 1578;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BUFFER || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (vhdlParser.IN - 38)) | (1 << (vhdlParser.INOUT - 38)) | (1 << (vhdlParser.LINKAGE - 38)) | (1 << (vhdlParser.OUT - 38)))) !== 0)) {
				{
				this.state = 1577;
				this.signal_mode();
				}
			}

			this.state = 1580;
			this.subtype_indication();
			this.state = 1582;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BUS) {
				{
				this.state = 1581;
				this.match(vhdlParser.BUS);
				}
			}

			this.state = 1586;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 1584;
				this.match(vhdlParser.VARASGN);
				this.state = 1585;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_terminal_declaration(): Interface_terminal_declarationContext {
		let _localctx: Interface_terminal_declarationContext = new Interface_terminal_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 266, vhdlParser.RULE_interface_terminal_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1588;
			this.match(vhdlParser.TERMINAL);
			this.state = 1589;
			this.identifier_list();
			this.state = 1590;
			this.match(vhdlParser.COLON);
			this.state = 1591;
			this.subnature_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_variable_declaration(): Interface_variable_declarationContext {
		let _localctx: Interface_variable_declarationContext = new Interface_variable_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 268, vhdlParser.RULE_interface_variable_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1594;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARIABLE) {
				{
				this.state = 1593;
				this.match(vhdlParser.VARIABLE);
				}
			}

			this.state = 1596;
			this.identifier_list();
			this.state = 1597;
			this.match(vhdlParser.COLON);
			this.state = 1599;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BUFFER || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (vhdlParser.IN - 38)) | (1 << (vhdlParser.INOUT - 38)) | (1 << (vhdlParser.LINKAGE - 38)) | (1 << (vhdlParser.OUT - 38)))) !== 0)) {
				{
				this.state = 1598;
				this.signal_mode();
				}
			}

			this.state = 1601;
			this.subtype_indication();
			this.state = 1604;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 1602;
				this.match(vhdlParser.VARASGN);
				this.state = 1603;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public iteration_scheme(): Iteration_schemeContext {
		let _localctx: Iteration_schemeContext = new Iteration_schemeContext(this._ctx, this.state);
		this.enterRule(_localctx, 270, vhdlParser.RULE_iteration_scheme);
		try {
			this.state = 1610;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.WHILE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1606;
				this.match(vhdlParser.WHILE);
				this.state = 1607;
				this.condition();
				}
				break;
			case vhdlParser.FOR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1608;
				this.match(vhdlParser.FOR);
				this.state = 1609;
				this.parameter_specification();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public label_colon(): Label_colonContext {
		let _localctx: Label_colonContext = new Label_colonContext(this._ctx, this.state);
		this.enterRule(_localctx, 272, vhdlParser.RULE_label_colon);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1612;
			this.identifier();
			this.state = 1613;
			this.match(vhdlParser.COLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public library_clause(): Library_clauseContext {
		let _localctx: Library_clauseContext = new Library_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 274, vhdlParser.RULE_library_clause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1615;
			this.match(vhdlParser.LIBRARY);
			this.state = 1616;
			this.logical_name_list();
			this.state = 1617;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public library_unit(): Library_unitContext {
		let _localctx: Library_unitContext = new Library_unitContext(this._ctx, this.state);
		this.enterRule(_localctx, 276, vhdlParser.RULE_library_unit);
		try {
			this.state = 1621;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 162, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1619;
				this.secondary_unit();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1620;
				this.primary_unit();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 278, vhdlParser.RULE_literal);
		try {
			this.state = 1628;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.NULL_:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1623;
				this.match(vhdlParser.NULL_);
				}
				break;
			case vhdlParser.BIT_STRING_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1624;
				this.match(vhdlParser.BIT_STRING_LITERAL);
				}
				break;
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1625;
				this.match(vhdlParser.STRING_LITERAL);
				}
				break;
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.CHARACTER_LITERAL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1626;
				this.enumeration_literal();
				}
				break;
			case vhdlParser.BASE_LITERAL:
			case vhdlParser.REAL_LITERAL:
			case vhdlParser.INTEGER:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1627;
				this.numeric_literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logical_name(): Logical_nameContext {
		let _localctx: Logical_nameContext = new Logical_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 280, vhdlParser.RULE_logical_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1630;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logical_name_list(): Logical_name_listContext {
		let _localctx: Logical_name_listContext = new Logical_name_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 282, vhdlParser.RULE_logical_name_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1632;
			this.logical_name();
			this.state = 1637;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 1633;
				this.match(vhdlParser.COMMA);
				this.state = 1634;
				this.logical_name();
				}
				}
				this.state = 1639;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public logical_operator(): Logical_operatorContext {
		let _localctx: Logical_operatorContext = new Logical_operatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 284, vhdlParser.RULE_logical_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1640;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.AND || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (vhdlParser.NAND - 50)) | (1 << (vhdlParser.NOR - 50)) | (1 << (vhdlParser.OR - 50)))) !== 0) || _la === vhdlParser.XNOR || _la === vhdlParser.XOR)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public loop_statement(): Loop_statementContext {
		let _localctx: Loop_statementContext = new Loop_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 286, vhdlParser.RULE_loop_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1643;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1642;
				this.label_colon();
				}
			}

			this.state = 1646;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.FOR || _la === vhdlParser.WHILE) {
				{
				this.state = 1645;
				this.iteration_scheme();
				}
			}

			this.state = 1648;
			this.match(vhdlParser.LOOP);
			this.state = 1649;
			this.sequence_of_statements();
			this.state = 1650;
			this.match(vhdlParser.END);
			this.state = 1651;
			this.match(vhdlParser.LOOP);
			this.state = 1653;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1652;
				this.identifier();
				}
			}

			this.state = 1655;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signal_mode(): Signal_modeContext {
		let _localctx: Signal_modeContext = new Signal_modeContext(this._ctx, this.state);
		this.enterRule(_localctx, 288, vhdlParser.RULE_signal_mode);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1657;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.BUFFER || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (vhdlParser.IN - 38)) | (1 << (vhdlParser.INOUT - 38)) | (1 << (vhdlParser.LINKAGE - 38)) | (1 << (vhdlParser.OUT - 38)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiplying_operator(): Multiplying_operatorContext {
		let _localctx: Multiplying_operatorContext = new Multiplying_operatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 290, vhdlParser.RULE_multiplying_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1659;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.MOD || _la === vhdlParser.REM || _la === vhdlParser.MUL || _la === vhdlParser.DIV)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public name(): NameContext {
		let _localctx: NameContext = new NameContext(this._ctx, this.state);
		this.enterRule(_localctx, 292, vhdlParser.RULE_name);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1663;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				{
				this.state = 1661;
				this.identifier();
				}
				break;
			case vhdlParser.STRING_LITERAL:
				{
				this.state = 1662;
				this.match(vhdlParser.STRING_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1668;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 169, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1665;
					this.name_part();
					}
					}
				}
				this.state = 1670;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 169, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public name_part(): Name_partContext {
		let _localctx: Name_partContext = new Name_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 294, vhdlParser.RULE_name_part);
		try {
			this.state = 1675;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 170, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1671;
				this.selected_name_part();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1672;
				this.function_call_or_indexed_name_part();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1673;
				this.slice_name_part();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1674;
				this.attribute_name_part();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selected_name(): Selected_nameContext {
		let _localctx: Selected_nameContext = new Selected_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 296, vhdlParser.RULE_selected_name);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1677;
			this.identifier();
			this.state = 1682;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.DOT) {
				{
				{
				this.state = 1678;
				this.match(vhdlParser.DOT);
				this.state = 1679;
				this.suffix();
				}
				}
				this.state = 1684;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selected_name_part(): Selected_name_partContext {
		let _localctx: Selected_name_partContext = new Selected_name_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 298, vhdlParser.RULE_selected_name_part);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1687;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 1685;
					this.match(vhdlParser.DOT);
					this.state = 1686;
					this.suffix();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1689;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 172, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_call_or_indexed_name_part(): Function_call_or_indexed_name_partContext {
		let _localctx: Function_call_or_indexed_name_partContext = new Function_call_or_indexed_name_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 300, vhdlParser.RULE_function_call_or_indexed_name_part);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1691;
			this.match(vhdlParser.LPAREN);
			this.state = 1692;
			this.actual_parameter_part();
			this.state = 1693;
			this.match(vhdlParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public slice_name_part(): Slice_name_partContext {
		let _localctx: Slice_name_partContext = new Slice_name_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 302, vhdlParser.RULE_slice_name_part);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1695;
			this.match(vhdlParser.LPAREN);
			this.state = 1696;
			this.discrete_range();
			this.state = 1697;
			this.match(vhdlParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attribute_name_part(): Attribute_name_partContext {
		let _localctx: Attribute_name_partContext = new Attribute_name_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 304, vhdlParser.RULE_attribute_name_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1700;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LBRACKET) {
				{
				this.state = 1699;
				this.signature();
				}
			}

			this.state = 1702;
			this.match(vhdlParser.APOSTROPHE);
			this.state = 1703;
			this.attribute_designator();
			this.state = 1708;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 174, this._ctx) ) {
			case 1:
				{
				this.state = 1704;
				this.match(vhdlParser.LPAREN);
				this.state = 1705;
				this.expression();
				this.state = 1706;
				this.match(vhdlParser.RPAREN);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nature_declaration(): Nature_declarationContext {
		let _localctx: Nature_declarationContext = new Nature_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 306, vhdlParser.RULE_nature_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1710;
			this.match(vhdlParser.NATURE);
			this.state = 1711;
			this.identifier();
			this.state = 1712;
			this.match(vhdlParser.IS);
			this.state = 1713;
			this.nature_definition();
			this.state = 1714;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nature_definition(): Nature_definitionContext {
		let _localctx: Nature_definitionContext = new Nature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 308, vhdlParser.RULE_nature_definition);
		try {
			this.state = 1718;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1716;
				this.scalar_nature_definition();
				}
				break;
			case vhdlParser.ARRAY:
			case vhdlParser.RECORD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1717;
				this.composite_nature_definition();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nature_element_declaration(): Nature_element_declarationContext {
		let _localctx: Nature_element_declarationContext = new Nature_element_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 310, vhdlParser.RULE_nature_element_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1720;
			this.identifier_list();
			this.state = 1721;
			this.match(vhdlParser.COLON);
			this.state = 1722;
			this.element_subnature_definition();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public next_statement(): Next_statementContext {
		let _localctx: Next_statementContext = new Next_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 312, vhdlParser.RULE_next_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1725;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1724;
				this.label_colon();
				}
			}

			this.state = 1727;
			this.match(vhdlParser.NEXT);
			this.state = 1729;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1728;
				this.identifier();
				}
			}

			this.state = 1733;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.WHEN) {
				{
				this.state = 1731;
				this.match(vhdlParser.WHEN);
				this.state = 1732;
				this.condition();
				}
			}

			this.state = 1735;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numeric_literal(): Numeric_literalContext {
		let _localctx: Numeric_literalContext = new Numeric_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 314, vhdlParser.RULE_numeric_literal);
		try {
			this.state = 1739;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 179, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1737;
				this.abstract_literal();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1738;
				this.physical_literal();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public object_declaration(): Object_declarationContext {
		let _localctx: Object_declarationContext = new Object_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 316, vhdlParser.RULE_object_declaration);
		try {
			this.state = 1747;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.CONSTANT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1741;
				this.constant_declaration();
				}
				break;
			case vhdlParser.SIGNAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1742;
				this.signal_declaration();
				}
				break;
			case vhdlParser.SHARED:
			case vhdlParser.VARIABLE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1743;
				this.variable_declaration();
				}
				break;
			case vhdlParser.FILE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1744;
				this.file_declaration();
				}
				break;
			case vhdlParser.TERMINAL:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1745;
				this.terminal_declaration();
				}
				break;
			case vhdlParser.QUANTITY:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1746;
				this.quantity_declaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public opts(): OptsContext {
		let _localctx: OptsContext = new OptsContext(this._ctx, this.state);
		this.enterRule(_localctx, 318, vhdlParser.RULE_opts);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1750;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.GUARDED) {
				{
				this.state = 1749;
				this.match(vhdlParser.GUARDED);
				}
			}

			this.state = 1753;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.INERTIAL || _la === vhdlParser.REJECT || _la === vhdlParser.TRANSPORT) {
				{
				this.state = 1752;
				this.delay_mechanism();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public package_body(): Package_bodyContext {
		let _localctx: Package_bodyContext = new Package_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 320, vhdlParser.RULE_package_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1755;
			this.match(vhdlParser.PACKAGE);
			this.state = 1756;
			this.match(vhdlParser.BODY);
			this.state = 1757;
			this.identifier();
			this.state = 1758;
			this.match(vhdlParser.IS);
			this.state = 1759;
			this.package_body_declarative_part();
			this.state = 1760;
			this.match(vhdlParser.END);
			this.state = 1763;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PACKAGE) {
				{
				this.state = 1761;
				this.match(vhdlParser.PACKAGE);
				this.state = 1762;
				this.match(vhdlParser.BODY);
				}
			}

			this.state = 1766;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1765;
				this.identifier();
				}
			}

			this.state = 1768;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public package_body_declarative_item(): Package_body_declarative_itemContext {
		let _localctx: Package_body_declarative_itemContext = new Package_body_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 322, vhdlParser.RULE_package_body_declarative_item);
		try {
			this.state = 1781;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 185, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1770;
				this.subprogram_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1771;
				this.subprogram_body();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1772;
				this.type_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1773;
				this.subtype_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1774;
				this.constant_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1775;
				this.variable_declaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1776;
				this.file_declaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1777;
				this.alias_declaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1778;
				this.use_clause();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1779;
				this.group_template_declaration();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1780;
				this.group_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public package_body_declarative_part(): Package_body_declarative_partContext {
		let _localctx: Package_body_declarative_partContext = new Package_body_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 324, vhdlParser.RULE_package_body_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1786;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FUNCTION))) !== 0) || _la === vhdlParser.GROUP || _la === vhdlParser.IMPURE || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SUBTYPE - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 1783;
				this.package_body_declarative_item();
				}
				}
				this.state = 1788;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public package_declaration(): Package_declarationContext {
		let _localctx: Package_declarationContext = new Package_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 326, vhdlParser.RULE_package_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1789;
			this.match(vhdlParser.PACKAGE);
			this.state = 1790;
			this.identifier();
			this.state = 1791;
			this.match(vhdlParser.IS);
			this.state = 1792;
			this.package_declarative_part();
			this.state = 1793;
			this.match(vhdlParser.END);
			this.state = 1795;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PACKAGE) {
				{
				this.state = 1794;
				this.match(vhdlParser.PACKAGE);
				}
			}

			this.state = 1798;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1797;
				this.identifier();
				}
			}

			this.state = 1800;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public package_declarative_item(): Package_declarative_itemContext {
		let _localctx: Package_declarative_itemContext = new Package_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 328, vhdlParser.RULE_package_declarative_item);
		try {
			this.state = 1821;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 189, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1802;
				this.subprogram_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1803;
				this.subprogram_body();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1804;
				this.type_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1805;
				this.subtype_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1806;
				this.constant_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1807;
				this.signal_declaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1808;
				this.variable_declaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1809;
				this.file_declaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1810;
				this.alias_declaration();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1811;
				this.component_declaration();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1812;
				this.attribute_declaration();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 1813;
				this.attribute_specification();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 1814;
				this.disconnection_specification();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 1815;
				this.use_clause();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 1816;
				this.group_template_declaration();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 1817;
				this.group_declaration();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 1818;
				this.nature_declaration();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 1819;
				this.subnature_declaration();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 1820;
				this.terminal_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public package_declarative_part(): Package_declarative_partContext {
		let _localctx: Package_declarative_partContext = new Package_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 330, vhdlParser.RULE_package_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1826;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.COMPONENT) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.DISCONNECT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FUNCTION))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (vhdlParser.GROUP - 34)) | (1 << (vhdlParser.IMPURE - 34)) | (1 << (vhdlParser.NATURE - 34)))) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SIGNAL - 68)) | (1 << (vhdlParser.SUBNATURE - 68)) | (1 << (vhdlParser.SUBTYPE - 68)) | (1 << (vhdlParser.TERMINAL - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 1823;
				this.package_declarative_item();
				}
				}
				this.state = 1828;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameter_specification(): Parameter_specificationContext {
		let _localctx: Parameter_specificationContext = new Parameter_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 332, vhdlParser.RULE_parameter_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1829;
			this.identifier();
			this.state = 1830;
			this.match(vhdlParser.IN);
			this.state = 1831;
			this.discrete_range();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public physical_literal(): Physical_literalContext {
		let _localctx: Physical_literalContext = new Physical_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 334, vhdlParser.RULE_physical_literal);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1833;
			this.abstract_literal();
			{
			this.state = 1834;
			this.identifier();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public physical_type_definition(): Physical_type_definitionContext {
		let _localctx: Physical_type_definitionContext = new Physical_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 336, vhdlParser.RULE_physical_type_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1836;
			this.range_constraint();
			this.state = 1837;
			this.match(vhdlParser.UNITS);
			this.state = 1838;
			this.base_unit_declaration();
			this.state = 1842;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				{
				this.state = 1839;
				this.secondary_unit_declaration();
				}
				}
				this.state = 1844;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1845;
			this.match(vhdlParser.END);
			this.state = 1846;
			this.match(vhdlParser.UNITS);
			this.state = 1848;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1847;
				this.identifier();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public port_clause(): Port_clauseContext {
		let _localctx: Port_clauseContext = new Port_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 338, vhdlParser.RULE_port_clause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1850;
			this.match(vhdlParser.PORT);
			this.state = 1851;
			this.match(vhdlParser.LPAREN);
			this.state = 1852;
			this.port_list();
			this.state = 1853;
			this.match(vhdlParser.RPAREN);
			this.state = 1854;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public port_list(): Port_listContext {
		let _localctx: Port_listContext = new Port_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 340, vhdlParser.RULE_port_list);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1856;
			this.interface_port_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public port_map_aspect(): Port_map_aspectContext {
		let _localctx: Port_map_aspectContext = new Port_map_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 342, vhdlParser.RULE_port_map_aspect);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1858;
			this.match(vhdlParser.PORT);
			this.state = 1859;
			this.match(vhdlParser.MAP);
			this.state = 1860;
			this.match(vhdlParser.LPAREN);
			this.state = 1861;
			this.association_list();
			this.state = 1862;
			this.match(vhdlParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 344, vhdlParser.RULE_primary);
		try {
			this.state = 1873;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 193, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1864;
				this.literal();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1865;
				this.qualified_expression();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1866;
				this.match(vhdlParser.LPAREN);
				this.state = 1867;
				this.expression();
				this.state = 1868;
				this.match(vhdlParser.RPAREN);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1870;
				this.allocator();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1871;
				this.aggregate();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1872;
				this.name();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary_unit(): Primary_unitContext {
		let _localctx: Primary_unitContext = new Primary_unitContext(this._ctx, this.state);
		this.enterRule(_localctx, 346, vhdlParser.RULE_primary_unit);
		try {
			this.state = 1878;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.ENTITY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1875;
				this.entity_declaration();
				}
				break;
			case vhdlParser.CONFIGURATION:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1876;
				this.configuration_declaration();
				}
				break;
			case vhdlParser.PACKAGE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1877;
				this.package_declaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public procedural_declarative_item(): Procedural_declarative_itemContext {
		let _localctx: Procedural_declarative_itemContext = new Procedural_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 348, vhdlParser.RULE_procedural_declarative_item);
		try {
			this.state = 1892;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 195, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1880;
				this.subprogram_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1881;
				this.subprogram_body();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1882;
				this.type_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1883;
				this.subtype_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1884;
				this.constant_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1885;
				this.variable_declaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1886;
				this.alias_declaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1887;
				this.attribute_declaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1888;
				this.attribute_specification();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1889;
				this.use_clause();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1890;
				this.group_template_declaration();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 1891;
				this.group_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public procedural_declarative_part(): Procedural_declarative_partContext {
		let _localctx: Procedural_declarative_partContext = new Procedural_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 350, vhdlParser.RULE_procedural_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1897;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.FUNCTION))) !== 0) || _la === vhdlParser.GROUP || _la === vhdlParser.IMPURE || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SUBTYPE - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 1894;
				this.procedural_declarative_item();
				}
				}
				this.state = 1899;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public procedural_statement_part(): Procedural_statement_partContext {
		let _localctx: Procedural_statement_partContext = new Procedural_statement_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 352, vhdlParser.RULE_procedural_statement_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1903;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ASSERT) | (1 << vhdlParser.BREAK) | (1 << vhdlParser.CASE) | (1 << vhdlParser.EXIT) | (1 << vhdlParser.FOR))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.LOOP - 36)) | (1 << (vhdlParser.NEXT - 36)) | (1 << (vhdlParser.NULL_ - 36)))) !== 0) || ((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & ((1 << (vhdlParser.REPORT - 79)) | (1 << (vhdlParser.RETURN - 79)) | (1 << (vhdlParser.WAIT - 79)) | (1 << (vhdlParser.WHILE - 79)))) !== 0) || ((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)) | (1 << (vhdlParser.LPAREN - 118)))) !== 0)) {
				{
				{
				this.state = 1900;
				this.sequential_statement();
				}
				}
				this.state = 1905;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public procedure_call(): Procedure_callContext {
		let _localctx: Procedure_callContext = new Procedure_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 354, vhdlParser.RULE_procedure_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1906;
			this.selected_name();
			this.state = 1911;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LPAREN) {
				{
				this.state = 1907;
				this.match(vhdlParser.LPAREN);
				this.state = 1908;
				this.actual_parameter_part();
				this.state = 1909;
				this.match(vhdlParser.RPAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public procedure_call_statement(): Procedure_call_statementContext {
		let _localctx: Procedure_call_statementContext = new Procedure_call_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 356, vhdlParser.RULE_procedure_call_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1914;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 199, this._ctx) ) {
			case 1:
				{
				this.state = 1913;
				this.label_colon();
				}
				break;
			}
			this.state = 1916;
			this.procedure_call();
			this.state = 1917;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public process_declarative_item(): Process_declarative_itemContext {
		let _localctx: Process_declarative_itemContext = new Process_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 358, vhdlParser.RULE_process_declarative_item);
		try {
			this.state = 1932;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 200, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1919;
				this.subprogram_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1920;
				this.subprogram_body();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1921;
				this.type_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1922;
				this.subtype_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1923;
				this.constant_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1924;
				this.variable_declaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1925;
				this.file_declaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1926;
				this.alias_declaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1927;
				this.attribute_declaration();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1928;
				this.attribute_specification();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 1929;
				this.use_clause();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 1930;
				this.group_template_declaration();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 1931;
				this.group_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public process_declarative_part(): Process_declarative_partContext {
		let _localctx: Process_declarative_partContext = new Process_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 360, vhdlParser.RULE_process_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1937;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FUNCTION))) !== 0) || _la === vhdlParser.GROUP || _la === vhdlParser.IMPURE || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SUBTYPE - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 1934;
				this.process_declarative_item();
				}
				}
				this.state = 1939;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public process_statement(): Process_statementContext {
		let _localctx: Process_statementContext = new Process_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 362, vhdlParser.RULE_process_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1941;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1940;
				this.label_colon();
				}
			}

			this.state = 1944;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.POSTPONED) {
				{
				this.state = 1943;
				this.match(vhdlParser.POSTPONED);
				}
			}

			this.state = 1946;
			this.match(vhdlParser.PROCESS);
			this.state = 1951;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LPAREN) {
				{
				this.state = 1947;
				this.match(vhdlParser.LPAREN);
				this.state = 1948;
				this.sensitivity_list();
				this.state = 1949;
				this.match(vhdlParser.RPAREN);
				}
			}

			this.state = 1954;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IS) {
				{
				this.state = 1953;
				this.match(vhdlParser.IS);
				}
			}

			this.state = 1956;
			this.process_declarative_part();
			this.state = 1957;
			this.match(vhdlParser.BEGIN);
			this.state = 1958;
			this.process_statement_part();
			this.state = 1959;
			this.match(vhdlParser.END);
			this.state = 1961;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.POSTPONED) {
				{
				this.state = 1960;
				this.match(vhdlParser.POSTPONED);
				}
			}

			this.state = 1963;
			this.match(vhdlParser.PROCESS);
			this.state = 1965;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 1964;
				this.identifier();
				}
			}

			this.state = 1967;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public process_statement_part(): Process_statement_partContext {
		let _localctx: Process_statement_partContext = new Process_statement_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 364, vhdlParser.RULE_process_statement_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1972;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ASSERT) | (1 << vhdlParser.BREAK) | (1 << vhdlParser.CASE) | (1 << vhdlParser.EXIT) | (1 << vhdlParser.FOR))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.LOOP - 36)) | (1 << (vhdlParser.NEXT - 36)) | (1 << (vhdlParser.NULL_ - 36)))) !== 0) || ((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & ((1 << (vhdlParser.REPORT - 79)) | (1 << (vhdlParser.RETURN - 79)) | (1 << (vhdlParser.WAIT - 79)) | (1 << (vhdlParser.WHILE - 79)))) !== 0) || ((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)) | (1 << (vhdlParser.LPAREN - 118)))) !== 0)) {
				{
				{
				this.state = 1969;
				this.sequential_statement();
				}
				}
				this.state = 1974;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualified_expression(): Qualified_expressionContext {
		let _localctx: Qualified_expressionContext = new Qualified_expressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 366, vhdlParser.RULE_qualified_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1975;
			this.subtype_indication();
			this.state = 1976;
			this.match(vhdlParser.APOSTROPHE);
			this.state = 1982;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 209, this._ctx) ) {
			case 1:
				{
				this.state = 1977;
				this.aggregate();
				}
				break;

			case 2:
				{
				this.state = 1978;
				this.match(vhdlParser.LPAREN);
				this.state = 1979;
				this.expression();
				this.state = 1980;
				this.match(vhdlParser.RPAREN);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quantity_declaration(): Quantity_declarationContext {
		let _localctx: Quantity_declarationContext = new Quantity_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 368, vhdlParser.RULE_quantity_declaration);
		try {
			this.state = 1987;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 210, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1984;
				this.free_quantity_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1985;
				this.branch_quantity_declaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1986;
				this.source_quantity_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quantity_list(): Quantity_listContext {
		let _localctx: Quantity_listContext = new Quantity_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 370, vhdlParser.RULE_quantity_list);
		let _la: number;
		try {
			this.state = 1999;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1989;
				this.name();
				this.state = 1994;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vhdlParser.COMMA) {
					{
					{
					this.state = 1990;
					this.match(vhdlParser.COMMA);
					this.state = 1991;
					this.name();
					}
					}
					this.state = 1996;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case vhdlParser.OTHERS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1997;
				this.match(vhdlParser.OTHERS);
				}
				break;
			case vhdlParser.ALL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1998;
				this.match(vhdlParser.ALL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quantity_specification(): Quantity_specificationContext {
		let _localctx: Quantity_specificationContext = new Quantity_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 372, vhdlParser.RULE_quantity_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2001;
			this.quantity_list();
			this.state = 2002;
			this.match(vhdlParser.COLON);
			this.state = 2003;
			this.name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public range_decl(): Range_declContext {
		let _localctx: Range_declContext = new Range_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 374, vhdlParser.RULE_range_decl);
		try {
			this.state = 2007;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 213, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2005;
				this.explicit_range();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2006;
				this.name();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public explicit_range(): Explicit_rangeContext {
		let _localctx: Explicit_rangeContext = new Explicit_rangeContext(this._ctx, this.state);
		this.enterRule(_localctx, 376, vhdlParser.RULE_explicit_range);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2009;
			this.simple_expression();
			this.state = 2013;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 214, this._ctx) ) {
			case 1:
				{
				this.state = 2010;
				this.direction();
				this.state = 2011;
				this.simple_expression();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public range_constraint(): Range_constraintContext {
		let _localctx: Range_constraintContext = new Range_constraintContext(this._ctx, this.state);
		this.enterRule(_localctx, 378, vhdlParser.RULE_range_constraint);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2015;
			this.match(vhdlParser.RANGE);
			this.state = 2016;
			this.range_decl();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public record_nature_definition(): Record_nature_definitionContext {
		let _localctx: Record_nature_definitionContext = new Record_nature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 380, vhdlParser.RULE_record_nature_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2018;
			this.match(vhdlParser.RECORD);
			this.state = 2020;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 2019;
				this.nature_element_declaration();
				}
				}
				this.state = 2022;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER);
			this.state = 2024;
			this.match(vhdlParser.END);
			this.state = 2025;
			this.match(vhdlParser.RECORD);
			this.state = 2027;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2026;
				this.identifier();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public record_type_definition(): Record_type_definitionContext {
		let _localctx: Record_type_definitionContext = new Record_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 382, vhdlParser.RULE_record_type_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2029;
			this.match(vhdlParser.RECORD);
			this.state = 2031;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 2030;
				this.element_declaration();
				}
				}
				this.state = 2033;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER);
			this.state = 2035;
			this.match(vhdlParser.END);
			this.state = 2036;
			this.match(vhdlParser.RECORD);
			this.state = 2038;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2037;
				this.identifier();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relation(): RelationContext {
		let _localctx: RelationContext = new RelationContext(this._ctx, this.state);
		this.enterRule(_localctx, 384, vhdlParser.RULE_relation);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2040;
			this.shift_expression();
			this.state = 2044;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 219, this._ctx) ) {
			case 1:
				{
				this.state = 2041;
				this.relational_operator();
				this.state = 2042;
				this.shift_expression();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relational_operator(): Relational_operatorContext {
		let _localctx: Relational_operatorContext = new Relational_operatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 386, vhdlParser.RULE_relational_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2046;
			_la = this._input.LA(1);
			if (!(((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & ((1 << (vhdlParser.LE - 131)) | (1 << (vhdlParser.GE - 131)) | (1 << (vhdlParser.NEQ - 131)) | (1 << (vhdlParser.LOWERTHAN - 131)) | (1 << (vhdlParser.GREATERTHAN - 131)) | (1 << (vhdlParser.EQ - 131)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public report_statement(): Report_statementContext {
		let _localctx: Report_statementContext = new Report_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 388, vhdlParser.RULE_report_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2049;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2048;
				this.label_colon();
				}
			}

			this.state = 2051;
			this.match(vhdlParser.REPORT);
			this.state = 2052;
			this.expression();
			this.state = 2055;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.SEVERITY) {
				{
				this.state = 2053;
				this.match(vhdlParser.SEVERITY);
				this.state = 2054;
				this.expression();
				}
			}

			this.state = 2057;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public return_statement(): Return_statementContext {
		let _localctx: Return_statementContext = new Return_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 390, vhdlParser.RULE_return_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2060;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2059;
				this.label_colon();
				}
			}

			this.state = 2062;
			this.match(vhdlParser.RETURN);
			this.state = 2064;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.ABS || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & ((1 << (vhdlParser.NEW - 52)) | (1 << (vhdlParser.NOT - 52)) | (1 << (vhdlParser.NULL_ - 52)))) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & ((1 << (vhdlParser.BASE_LITERAL - 112)) | (1 << (vhdlParser.BIT_STRING_LITERAL - 112)) | (1 << (vhdlParser.REAL_LITERAL - 112)) | (1 << (vhdlParser.BASIC_IDENTIFIER - 112)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 112)) | (1 << (vhdlParser.CHARACTER_LITERAL - 112)) | (1 << (vhdlParser.STRING_LITERAL - 112)) | (1 << (vhdlParser.LPAREN - 112)))) !== 0) || ((((_la - 148)) & ~0x1F) === 0 && ((1 << (_la - 148)) & ((1 << (vhdlParser.PLUS - 148)) | (1 << (vhdlParser.MINUS - 148)) | (1 << (vhdlParser.INTEGER - 148)))) !== 0)) {
				{
				this.state = 2063;
				this.expression();
				}
			}

			this.state = 2066;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scalar_nature_definition(): Scalar_nature_definitionContext {
		let _localctx: Scalar_nature_definitionContext = new Scalar_nature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 392, vhdlParser.RULE_scalar_nature_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2068;
			this.name();
			this.state = 2069;
			this.match(vhdlParser.ACROSS);
			this.state = 2070;
			this.name();
			this.state = 2071;
			this.match(vhdlParser.THROUGH);
			this.state = 2072;
			this.name();
			this.state = 2073;
			this.match(vhdlParser.REFERENCE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scalar_type_definition(): Scalar_type_definitionContext {
		let _localctx: Scalar_type_definitionContext = new Scalar_type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 394, vhdlParser.RULE_scalar_type_definition);
		try {
			this.state = 2078;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 224, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2075;
				this.physical_type_definition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2076;
				this.enumeration_type_definition();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 2077;
				this.range_constraint();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public secondary_unit(): Secondary_unitContext {
		let _localctx: Secondary_unitContext = new Secondary_unitContext(this._ctx, this.state);
		this.enterRule(_localctx, 396, vhdlParser.RULE_secondary_unit);
		try {
			this.state = 2082;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.ARCHITECTURE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2080;
				this.architecture_body();
				}
				break;
			case vhdlParser.PACKAGE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2081;
				this.package_body();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public secondary_unit_declaration(): Secondary_unit_declarationContext {
		let _localctx: Secondary_unit_declarationContext = new Secondary_unit_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 398, vhdlParser.RULE_secondary_unit_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2084;
			this.identifier();
			this.state = 2085;
			this.match(vhdlParser.EQ);
			this.state = 2086;
			this.physical_literal();
			this.state = 2087;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selected_signal_assignment(): Selected_signal_assignmentContext {
		let _localctx: Selected_signal_assignmentContext = new Selected_signal_assignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 400, vhdlParser.RULE_selected_signal_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2089;
			this.match(vhdlParser.WITH);
			this.state = 2090;
			this.expression();
			this.state = 2091;
			this.match(vhdlParser.SELECT);
			this.state = 2092;
			this.target();
			this.state = 2093;
			this.match(vhdlParser.LE);
			this.state = 2094;
			this.opts();
			this.state = 2095;
			this.selected_waveforms();
			this.state = 2096;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selected_waveforms(): Selected_waveformsContext {
		let _localctx: Selected_waveformsContext = new Selected_waveformsContext(this._ctx, this.state);
		this.enterRule(_localctx, 402, vhdlParser.RULE_selected_waveforms);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2098;
			this.waveform();
			this.state = 2099;
			this.match(vhdlParser.WHEN);
			this.state = 2100;
			this.choices();
			this.state = 2108;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 2101;
				this.match(vhdlParser.COMMA);
				this.state = 2102;
				this.waveform();
				this.state = 2103;
				this.match(vhdlParser.WHEN);
				this.state = 2104;
				this.choices();
				}
				}
				this.state = 2110;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sensitivity_clause(): Sensitivity_clauseContext {
		let _localctx: Sensitivity_clauseContext = new Sensitivity_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 404, vhdlParser.RULE_sensitivity_clause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2111;
			this.match(vhdlParser.ON);
			this.state = 2112;
			this.sensitivity_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sensitivity_list(): Sensitivity_listContext {
		let _localctx: Sensitivity_listContext = new Sensitivity_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 406, vhdlParser.RULE_sensitivity_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2114;
			this.name();
			this.state = 2119;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 2115;
				this.match(vhdlParser.COMMA);
				this.state = 2116;
				this.name();
				}
				}
				this.state = 2121;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sequence_of_statements(): Sequence_of_statementsContext {
		let _localctx: Sequence_of_statementsContext = new Sequence_of_statementsContext(this._ctx, this.state);
		this.enterRule(_localctx, 408, vhdlParser.RULE_sequence_of_statements);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2125;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ASSERT) | (1 << vhdlParser.BREAK) | (1 << vhdlParser.CASE) | (1 << vhdlParser.EXIT) | (1 << vhdlParser.FOR))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.LOOP - 36)) | (1 << (vhdlParser.NEXT - 36)) | (1 << (vhdlParser.NULL_ - 36)))) !== 0) || ((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & ((1 << (vhdlParser.REPORT - 79)) | (1 << (vhdlParser.RETURN - 79)) | (1 << (vhdlParser.WAIT - 79)) | (1 << (vhdlParser.WHILE - 79)))) !== 0) || ((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)) | (1 << (vhdlParser.LPAREN - 118)))) !== 0)) {
				{
				{
				this.state = 2122;
				this.sequential_statement();
				}
				}
				this.state = 2127;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sequential_statement(): Sequential_statementContext {
		let _localctx: Sequential_statementContext = new Sequential_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 410, vhdlParser.RULE_sequential_statement);
		let _la: number;
		try {
			this.state = 2146;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 230, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2128;
				this.wait_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2129;
				this.assertion_statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 2130;
				this.report_statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 2131;
				this.signal_assignment_statement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 2132;
				this.variable_assignment_statement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 2133;
				this.if_statement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 2134;
				this.case_statement();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 2135;
				this.loop_statement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 2136;
				this.next_statement();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 2137;
				this.exit_statement();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 2138;
				this.return_statement();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 2140;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
					{
					this.state = 2139;
					this.label_colon();
					}
				}

				this.state = 2142;
				this.match(vhdlParser.NULL_);
				this.state = 2143;
				this.match(vhdlParser.SEMI);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 2144;
				this.break_statement();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 2145;
				this.procedure_call_statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public shift_expression(): Shift_expressionContext {
		let _localctx: Shift_expressionContext = new Shift_expressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 412, vhdlParser.RULE_shift_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2148;
			this.simple_expression();
			this.state = 2152;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 231, this._ctx) ) {
			case 1:
				{
				this.state = 2149;
				this.shift_operator();
				this.state = 2150;
				this.simple_expression();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public shift_operator(): Shift_operatorContext {
		let _localctx: Shift_operatorContext = new Shift_operatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 414, vhdlParser.RULE_shift_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2154;
			_la = this._input.LA(1);
			if (!(((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & ((1 << (vhdlParser.ROL - 81)) | (1 << (vhdlParser.ROR - 81)) | (1 << (vhdlParser.SLA - 81)) | (1 << (vhdlParser.SLL - 81)) | (1 << (vhdlParser.SRA - 81)) | (1 << (vhdlParser.SRL - 81)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signal_assignment_statement(): Signal_assignment_statementContext {
		let _localctx: Signal_assignment_statementContext = new Signal_assignment_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 416, vhdlParser.RULE_signal_assignment_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2157;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 232, this._ctx) ) {
			case 1:
				{
				this.state = 2156;
				this.label_colon();
				}
				break;
			}
			this.state = 2159;
			this.target();
			this.state = 2160;
			this.match(vhdlParser.LE);
			this.state = 2162;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.INERTIAL || _la === vhdlParser.REJECT || _la === vhdlParser.TRANSPORT) {
				{
				this.state = 2161;
				this.delay_mechanism();
				}
			}

			this.state = 2164;
			this.waveform();
			this.state = 2165;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signal_declaration(): Signal_declarationContext {
		let _localctx: Signal_declarationContext = new Signal_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 418, vhdlParser.RULE_signal_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2167;
			this.match(vhdlParser.SIGNAL);
			this.state = 2168;
			this.identifier_list();
			this.state = 2169;
			this.match(vhdlParser.COLON);
			this.state = 2170;
			this.subtype_indication();
			this.state = 2172;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BUS || _la === vhdlParser.REGISTER) {
				{
				this.state = 2171;
				this.signal_kind();
				}
			}

			this.state = 2176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 2174;
				this.match(vhdlParser.VARASGN);
				this.state = 2175;
				this.expression();
				}
			}

			this.state = 2178;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signal_kind(): Signal_kindContext {
		let _localctx: Signal_kindContext = new Signal_kindContext(this._ctx, this.state);
		this.enterRule(_localctx, 420, vhdlParser.RULE_signal_kind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2180;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.BUS || _la === vhdlParser.REGISTER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signal_list(): Signal_listContext {
		let _localctx: Signal_listContext = new Signal_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 422, vhdlParser.RULE_signal_list);
		let _la: number;
		try {
			this.state = 2192;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2182;
				this.name();
				this.state = 2187;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vhdlParser.COMMA) {
					{
					{
					this.state = 2183;
					this.match(vhdlParser.COMMA);
					this.state = 2184;
					this.name();
					}
					}
					this.state = 2189;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case vhdlParser.OTHERS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2190;
				this.match(vhdlParser.OTHERS);
				}
				break;
			case vhdlParser.ALL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 2191;
				this.match(vhdlParser.ALL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signature(): SignatureContext {
		let _localctx: SignatureContext = new SignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 424, vhdlParser.RULE_signature);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2194;
			this.match(vhdlParser.LBRACKET);
			this.state = 2203;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)))) !== 0)) {
				{
				this.state = 2195;
				this.name();
				this.state = 2200;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vhdlParser.COMMA) {
					{
					{
					this.state = 2196;
					this.match(vhdlParser.COMMA);
					this.state = 2197;
					this.name();
					}
					}
					this.state = 2202;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 2207;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.RETURN) {
				{
				this.state = 2205;
				this.match(vhdlParser.RETURN);
				this.state = 2206;
				this.name();
				}
			}

			this.state = 2209;
			this.match(vhdlParser.RBRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simple_expression(): Simple_expressionContext {
		let _localctx: Simple_expressionContext = new Simple_expressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 426, vhdlParser.RULE_simple_expression);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2212;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.PLUS || _la === vhdlParser.MINUS) {
				{
				this.state = 2211;
				_la = this._input.LA(1);
				if (!(_la === vhdlParser.PLUS || _la === vhdlParser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 2214;
			this.term();
			this.state = 2220;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 242, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 2215;
					this.adding_operator();
					this.state = 2216;
					this.term();
					}
					}
				}
				this.state = 2222;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 242, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simple_simultaneous_statement(): Simple_simultaneous_statementContext {
		let _localctx: Simple_simultaneous_statementContext = new Simple_simultaneous_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 428, vhdlParser.RULE_simple_simultaneous_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2224;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 243, this._ctx) ) {
			case 1:
				{
				this.state = 2223;
				this.label_colon();
				}
				break;
			}
			this.state = 2226;
			this.simple_expression();
			this.state = 2227;
			this.match(vhdlParser.ASSIGN);
			this.state = 2228;
			this.simple_expression();
			this.state = 2230;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.TOLERANCE) {
				{
				this.state = 2229;
				this.tolerance_aspect();
				}
			}

			this.state = 2232;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simultaneous_alternative(): Simultaneous_alternativeContext {
		let _localctx: Simultaneous_alternativeContext = new Simultaneous_alternativeContext(this._ctx, this.state);
		this.enterRule(_localctx, 430, vhdlParser.RULE_simultaneous_alternative);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2234;
			this.match(vhdlParser.WHEN);
			this.state = 2235;
			this.choices();
			this.state = 2236;
			this.match(vhdlParser.ARROW);
			this.state = 2237;
			this.simultaneous_statement_part();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simultaneous_case_statement(): Simultaneous_case_statementContext {
		let _localctx: Simultaneous_case_statementContext = new Simultaneous_case_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 432, vhdlParser.RULE_simultaneous_case_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2240;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2239;
				this.label_colon();
				}
			}

			this.state = 2242;
			this.match(vhdlParser.CASE);
			this.state = 2243;
			this.expression();
			this.state = 2244;
			this.match(vhdlParser.USE);
			this.state = 2246;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 2245;
				this.simultaneous_alternative();
				}
				}
				this.state = 2248;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === vhdlParser.WHEN);
			this.state = 2250;
			this.match(vhdlParser.END);
			this.state = 2251;
			this.match(vhdlParser.CASE);
			this.state = 2253;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2252;
				this.identifier();
				}
			}

			this.state = 2255;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simultaneous_if_statement(): Simultaneous_if_statementContext {
		let _localctx: Simultaneous_if_statementContext = new Simultaneous_if_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 434, vhdlParser.RULE_simultaneous_if_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2258;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2257;
				this.label_colon();
				}
			}

			this.state = 2260;
			this.match(vhdlParser.IF);
			this.state = 2261;
			this.condition();
			this.state = 2262;
			this.match(vhdlParser.USE);
			this.state = 2263;
			this.simultaneous_statement_part();
			this.state = 2271;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.ELSIF) {
				{
				{
				this.state = 2264;
				this.match(vhdlParser.ELSIF);
				this.state = 2265;
				this.condition();
				this.state = 2266;
				this.match(vhdlParser.USE);
				this.state = 2267;
				this.simultaneous_statement_part();
				}
				}
				this.state = 2273;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 2276;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.ELSE) {
				{
				this.state = 2274;
				this.match(vhdlParser.ELSE);
				this.state = 2275;
				this.simultaneous_statement_part();
				}
			}

			this.state = 2278;
			this.match(vhdlParser.END);
			this.state = 2279;
			this.match(vhdlParser.USE);
			this.state = 2281;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2280;
				this.identifier();
				}
			}

			this.state = 2283;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simultaneous_procedural_statement(): Simultaneous_procedural_statementContext {
		let _localctx: Simultaneous_procedural_statementContext = new Simultaneous_procedural_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 436, vhdlParser.RULE_simultaneous_procedural_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2285;
				this.label_colon();
				}
			}

			this.state = 2288;
			this.match(vhdlParser.PROCEDURAL);
			this.state = 2290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IS) {
				{
				this.state = 2289;
				this.match(vhdlParser.IS);
				}
			}

			this.state = 2292;
			this.procedural_declarative_part();
			this.state = 2293;
			this.match(vhdlParser.BEGIN);
			this.state = 2294;
			this.procedural_statement_part();
			this.state = 2295;
			this.match(vhdlParser.END);
			this.state = 2296;
			this.match(vhdlParser.PROCEDURAL);
			this.state = 2298;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2297;
				this.identifier();
				}
			}

			this.state = 2300;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simultaneous_statement(): Simultaneous_statementContext {
		let _localctx: Simultaneous_statementContext = new Simultaneous_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 438, vhdlParser.RULE_simultaneous_statement);
		let _la: number;
		try {
			this.state = 2311;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 256, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2302;
				this.simple_simultaneous_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2303;
				this.simultaneous_if_statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 2304;
				this.simultaneous_case_statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 2305;
				this.simultaneous_procedural_statement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 2307;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
					{
					this.state = 2306;
					this.label_colon();
					}
				}

				this.state = 2309;
				this.match(vhdlParser.NULL_);
				this.state = 2310;
				this.match(vhdlParser.SEMI);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simultaneous_statement_part(): Simultaneous_statement_partContext {
		let _localctx: Simultaneous_statement_partContext = new Simultaneous_statement_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 440, vhdlParser.RULE_simultaneous_statement_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2316;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.ABS || _la === vhdlParser.CASE || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.NEW - 36)) | (1 << (vhdlParser.NOT - 36)) | (1 << (vhdlParser.NULL_ - 36)))) !== 0) || _la === vhdlParser.PROCEDURAL || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & ((1 << (vhdlParser.BASE_LITERAL - 112)) | (1 << (vhdlParser.BIT_STRING_LITERAL - 112)) | (1 << (vhdlParser.REAL_LITERAL - 112)) | (1 << (vhdlParser.BASIC_IDENTIFIER - 112)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 112)) | (1 << (vhdlParser.CHARACTER_LITERAL - 112)) | (1 << (vhdlParser.STRING_LITERAL - 112)) | (1 << (vhdlParser.LPAREN - 112)))) !== 0) || ((((_la - 148)) & ~0x1F) === 0 && ((1 << (_la - 148)) & ((1 << (vhdlParser.PLUS - 148)) | (1 << (vhdlParser.MINUS - 148)) | (1 << (vhdlParser.INTEGER - 148)))) !== 0)) {
				{
				{
				this.state = 2313;
				this.simultaneous_statement();
				}
				}
				this.state = 2318;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public source_aspect(): Source_aspectContext {
		let _localctx: Source_aspectContext = new Source_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 442, vhdlParser.RULE_source_aspect);
		try {
			this.state = 2326;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.SPECTRUM:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2319;
				this.match(vhdlParser.SPECTRUM);
				this.state = 2320;
				this.simple_expression();
				this.state = 2321;
				this.match(vhdlParser.COMMA);
				this.state = 2322;
				this.simple_expression();
				}
				break;
			case vhdlParser.NOISE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2324;
				this.match(vhdlParser.NOISE);
				this.state = 2325;
				this.simple_expression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public source_quantity_declaration(): Source_quantity_declarationContext {
		let _localctx: Source_quantity_declarationContext = new Source_quantity_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 444, vhdlParser.RULE_source_quantity_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2328;
			this.match(vhdlParser.QUANTITY);
			this.state = 2329;
			this.identifier_list();
			this.state = 2330;
			this.match(vhdlParser.COLON);
			this.state = 2331;
			this.subtype_indication();
			this.state = 2332;
			this.source_aspect();
			this.state = 2333;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public step_limit_specification(): Step_limit_specificationContext {
		let _localctx: Step_limit_specificationContext = new Step_limit_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 446, vhdlParser.RULE_step_limit_specification);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2335;
			this.match(vhdlParser.LIMIT);
			this.state = 2336;
			this.quantity_specification();
			this.state = 2337;
			this.match(vhdlParser.WITH);
			this.state = 2338;
			this.expression();
			this.state = 2339;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subnature_declaration(): Subnature_declarationContext {
		let _localctx: Subnature_declarationContext = new Subnature_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 448, vhdlParser.RULE_subnature_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2341;
			this.match(vhdlParser.SUBNATURE);
			this.state = 2342;
			this.identifier();
			this.state = 2343;
			this.match(vhdlParser.IS);
			this.state = 2344;
			this.subnature_indication();
			this.state = 2345;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subnature_indication(): Subnature_indicationContext {
		let _localctx: Subnature_indicationContext = new Subnature_indicationContext(this._ctx, this.state);
		this.enterRule(_localctx, 450, vhdlParser.RULE_subnature_indication);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2347;
			this.name();
			this.state = 2349;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LPAREN) {
				{
				this.state = 2348;
				this.index_constraint();
				}
			}

			this.state = 2357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.TOLERANCE) {
				{
				this.state = 2351;
				this.match(vhdlParser.TOLERANCE);
				this.state = 2352;
				this.expression();
				this.state = 2353;
				this.match(vhdlParser.ACROSS);
				this.state = 2354;
				this.expression();
				this.state = 2355;
				this.match(vhdlParser.THROUGH);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_body(): Subprogram_bodyContext {
		let _localctx: Subprogram_bodyContext = new Subprogram_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 452, vhdlParser.RULE_subprogram_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2359;
			this.subprogram_specification();
			this.state = 2360;
			this.match(vhdlParser.IS);
			this.state = 2361;
			this.subprogram_declarative_part();
			this.state = 2362;
			this.match(vhdlParser.BEGIN);
			this.state = 2363;
			this.subprogram_statement_part();
			this.state = 2364;
			this.match(vhdlParser.END);
			this.state = 2366;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.FUNCTION || _la === vhdlParser.PROCEDURE) {
				{
				this.state = 2365;
				this.subprogram_kind();
				}
			}

			this.state = 2369;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)))) !== 0)) {
				{
				this.state = 2368;
				this.designator();
				}
			}

			this.state = 2371;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_declaration(): Subprogram_declarationContext {
		let _localctx: Subprogram_declarationContext = new Subprogram_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 454, vhdlParser.RULE_subprogram_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2373;
			this.subprogram_specification();
			this.state = 2374;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_declarative_item(): Subprogram_declarative_itemContext {
		let _localctx: Subprogram_declarative_itemContext = new Subprogram_declarative_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 456, vhdlParser.RULE_subprogram_declarative_item);
		try {
			this.state = 2389;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 263, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2376;
				this.subprogram_declaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2377;
				this.subprogram_body();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 2378;
				this.type_declaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 2379;
				this.subtype_declaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 2380;
				this.constant_declaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 2381;
				this.variable_declaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 2382;
				this.file_declaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 2383;
				this.alias_declaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 2384;
				this.attribute_declaration();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 2385;
				this.attribute_specification();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 2386;
				this.use_clause();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 2387;
				this.group_template_declaration();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 2388;
				this.group_declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_declarative_part(): Subprogram_declarative_partContext {
		let _localctx: Subprogram_declarative_partContext = new Subprogram_declarative_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 458, vhdlParser.RULE_subprogram_declarative_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2394;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ALIAS) | (1 << vhdlParser.ATTRIBUTE) | (1 << vhdlParser.CONSTANT) | (1 << vhdlParser.FILE) | (1 << vhdlParser.FUNCTION))) !== 0) || _la === vhdlParser.GROUP || _la === vhdlParser.IMPURE || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & ((1 << (vhdlParser.PROCEDURE - 68)) | (1 << (vhdlParser.PURE - 68)) | (1 << (vhdlParser.SHARED - 68)) | (1 << (vhdlParser.SUBTYPE - 68)))) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & ((1 << (vhdlParser.TYPE - 100)) | (1 << (vhdlParser.USE - 100)) | (1 << (vhdlParser.VARIABLE - 100)))) !== 0)) {
				{
				{
				this.state = 2391;
				this.subprogram_declarative_item();
				}
				}
				this.state = 2396;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_kind(): Subprogram_kindContext {
		let _localctx: Subprogram_kindContext = new Subprogram_kindContext(this._ctx, this.state);
		this.enterRule(_localctx, 460, vhdlParser.RULE_subprogram_kind);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2397;
			_la = this._input.LA(1);
			if (!(_la === vhdlParser.FUNCTION || _la === vhdlParser.PROCEDURE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_specification(): Subprogram_specificationContext {
		let _localctx: Subprogram_specificationContext = new Subprogram_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 462, vhdlParser.RULE_subprogram_specification);
		try {
			this.state = 2401;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.PROCEDURE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2399;
				this.procedure_specification();
				}
				break;
			case vhdlParser.FUNCTION:
			case vhdlParser.IMPURE:
			case vhdlParser.PURE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2400;
				this.function_specification();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public procedure_specification(): Procedure_specificationContext {
		let _localctx: Procedure_specificationContext = new Procedure_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 464, vhdlParser.RULE_procedure_specification);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2403;
			this.match(vhdlParser.PROCEDURE);
			this.state = 2404;
			this.designator();
			this.state = 2409;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LPAREN) {
				{
				this.state = 2405;
				this.match(vhdlParser.LPAREN);
				this.state = 2406;
				this.formal_parameter_list();
				this.state = 2407;
				this.match(vhdlParser.RPAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_specification(): Function_specificationContext {
		let _localctx: Function_specificationContext = new Function_specificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 466, vhdlParser.RULE_function_specification);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2412;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IMPURE || _la === vhdlParser.PURE) {
				{
				this.state = 2411;
				_la = this._input.LA(1);
				if (!(_la === vhdlParser.IMPURE || _la === vhdlParser.PURE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 2414;
			this.match(vhdlParser.FUNCTION);
			this.state = 2415;
			this.designator();
			this.state = 2420;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.LPAREN) {
				{
				this.state = 2416;
				this.match(vhdlParser.LPAREN);
				this.state = 2417;
				this.formal_parameter_list();
				this.state = 2418;
				this.match(vhdlParser.RPAREN);
				}
			}

			this.state = 2422;
			this.match(vhdlParser.RETURN);
			this.state = 2423;
			this.subtype_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subprogram_statement_part(): Subprogram_statement_partContext {
		let _localctx: Subprogram_statement_partContext = new Subprogram_statement_partContext(this._ctx, this.state);
		this.enterRule(_localctx, 468, vhdlParser.RULE_subprogram_statement_part);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2428;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vhdlParser.ASSERT) | (1 << vhdlParser.BREAK) | (1 << vhdlParser.CASE) | (1 << vhdlParser.EXIT) | (1 << vhdlParser.FOR))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (vhdlParser.IF - 36)) | (1 << (vhdlParser.LOOP - 36)) | (1 << (vhdlParser.NEXT - 36)) | (1 << (vhdlParser.NULL_ - 36)))) !== 0) || ((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & ((1 << (vhdlParser.REPORT - 79)) | (1 << (vhdlParser.RETURN - 79)) | (1 << (vhdlParser.WAIT - 79)) | (1 << (vhdlParser.WHILE - 79)))) !== 0) || ((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & ((1 << (vhdlParser.BASIC_IDENTIFIER - 118)) | (1 << (vhdlParser.EXTENDED_IDENTIFIER - 118)) | (1 << (vhdlParser.STRING_LITERAL - 118)) | (1 << (vhdlParser.LPAREN - 118)))) !== 0)) {
				{
				{
				this.state = 2425;
				this.sequential_statement();
				}
				}
				this.state = 2430;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subtype_declaration(): Subtype_declarationContext {
		let _localctx: Subtype_declarationContext = new Subtype_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 470, vhdlParser.RULE_subtype_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2431;
			this.match(vhdlParser.SUBTYPE);
			this.state = 2432;
			this.identifier();
			this.state = 2433;
			this.match(vhdlParser.IS);
			this.state = 2434;
			this.subtype_indication();
			this.state = 2435;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subtype_indication(): Subtype_indicationContext {
		let _localctx: Subtype_indicationContext = new Subtype_indicationContext(this._ctx, this.state);
		this.enterRule(_localctx, 472, vhdlParser.RULE_subtype_indication);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2437;
			this.selected_name();
			this.state = 2439;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2438;
				this.selected_name();
				}
			}

			this.state = 2442;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.RANGE || _la === vhdlParser.LPAREN) {
				{
				this.state = 2441;
				this.constraint();
				}
			}

			this.state = 2445;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 272, this._ctx) ) {
			case 1:
				{
				this.state = 2444;
				this.tolerance_aspect();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public suffix(): SuffixContext {
		let _localctx: SuffixContext = new SuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 474, vhdlParser.RULE_suffix);
		try {
			this.state = 2451;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2447;
				this.identifier();
				}
				break;
			case vhdlParser.CHARACTER_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2448;
				this.match(vhdlParser.CHARACTER_LITERAL);
				}
				break;
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 2449;
				this.match(vhdlParser.STRING_LITERAL);
				}
				break;
			case vhdlParser.ALL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 2450;
				this.match(vhdlParser.ALL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public target(): TargetContext {
		let _localctx: TargetContext = new TargetContext(this._ctx, this.state);
		this.enterRule(_localctx, 476, vhdlParser.RULE_target);
		try {
			this.state = 2455;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2453;
				this.name();
				}
				break;
			case vhdlParser.LPAREN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2454;
				this.aggregate();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public term(): TermContext {
		let _localctx: TermContext = new TermContext(this._ctx, this.state);
		this.enterRule(_localctx, 478, vhdlParser.RULE_term);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2457;
			this.factor();
			this.state = 2463;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 275, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 2458;
					this.multiplying_operator();
					this.state = 2459;
					this.factor();
					}
					}
				}
				this.state = 2465;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 275, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public terminal_aspect(): Terminal_aspectContext {
		let _localctx: Terminal_aspectContext = new Terminal_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 480, vhdlParser.RULE_terminal_aspect);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2466;
			this.name();
			this.state = 2469;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.TO) {
				{
				this.state = 2467;
				this.match(vhdlParser.TO);
				this.state = 2468;
				this.name();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public terminal_declaration(): Terminal_declarationContext {
		let _localctx: Terminal_declarationContext = new Terminal_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 482, vhdlParser.RULE_terminal_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2471;
			this.match(vhdlParser.TERMINAL);
			this.state = 2472;
			this.identifier_list();
			this.state = 2473;
			this.match(vhdlParser.COLON);
			this.state = 2474;
			this.subnature_indication();
			this.state = 2475;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public through_aspect(): Through_aspectContext {
		let _localctx: Through_aspectContext = new Through_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 484, vhdlParser.RULE_through_aspect);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2477;
			this.identifier_list();
			this.state = 2479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.TOLERANCE) {
				{
				this.state = 2478;
				this.tolerance_aspect();
				}
			}

			this.state = 2483;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 2481;
				this.match(vhdlParser.VARASGN);
				this.state = 2482;
				this.expression();
				}
			}

			this.state = 2485;
			this.match(vhdlParser.THROUGH);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public timeout_clause(): Timeout_clauseContext {
		let _localctx: Timeout_clauseContext = new Timeout_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 486, vhdlParser.RULE_timeout_clause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2487;
			this.match(vhdlParser.FOR);
			this.state = 2488;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tolerance_aspect(): Tolerance_aspectContext {
		let _localctx: Tolerance_aspectContext = new Tolerance_aspectContext(this._ctx, this.state);
		this.enterRule(_localctx, 488, vhdlParser.RULE_tolerance_aspect);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2490;
			this.match(vhdlParser.TOLERANCE);
			this.state = 2491;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_declaration(): Type_declarationContext {
		let _localctx: Type_declarationContext = new Type_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 490, vhdlParser.RULE_type_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2493;
			this.match(vhdlParser.TYPE);
			this.state = 2494;
			this.identifier();
			this.state = 2497;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.IS) {
				{
				this.state = 2495;
				this.match(vhdlParser.IS);
				this.state = 2496;
				this.type_definition();
				}
			}

			this.state = 2499;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_definition(): Type_definitionContext {
		let _localctx: Type_definitionContext = new Type_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 492, vhdlParser.RULE_type_definition);
		try {
			this.state = 2505;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.RANGE:
			case vhdlParser.LPAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2501;
				this.scalar_type_definition();
				}
				break;
			case vhdlParser.ARRAY:
			case vhdlParser.RECORD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2502;
				this.composite_type_definition();
				}
				break;
			case vhdlParser.ACCESS:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 2503;
				this.access_type_definition();
				}
				break;
			case vhdlParser.FILE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 2504;
				this.file_type_definition();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unconstrained_array_definition(): Unconstrained_array_definitionContext {
		let _localctx: Unconstrained_array_definitionContext = new Unconstrained_array_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 494, vhdlParser.RULE_unconstrained_array_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2507;
			this.match(vhdlParser.ARRAY);
			this.state = 2508;
			this.match(vhdlParser.LPAREN);
			this.state = 2509;
			this.index_subtype_definition();
			this.state = 2514;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 2510;
				this.match(vhdlParser.COMMA);
				this.state = 2511;
				this.index_subtype_definition();
				}
				}
				this.state = 2516;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 2517;
			this.match(vhdlParser.RPAREN);
			this.state = 2518;
			this.match(vhdlParser.OF);
			this.state = 2519;
			this.subtype_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unconstrained_nature_definition(): Unconstrained_nature_definitionContext {
		let _localctx: Unconstrained_nature_definitionContext = new Unconstrained_nature_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 496, vhdlParser.RULE_unconstrained_nature_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2521;
			this.match(vhdlParser.ARRAY);
			this.state = 2522;
			this.match(vhdlParser.LPAREN);
			this.state = 2523;
			this.index_subtype_definition();
			this.state = 2528;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 2524;
				this.match(vhdlParser.COMMA);
				this.state = 2525;
				this.index_subtype_definition();
				}
				}
				this.state = 2530;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 2531;
			this.match(vhdlParser.RPAREN);
			this.state = 2532;
			this.match(vhdlParser.OF);
			this.state = 2533;
			this.subnature_indication();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public use_clause(): Use_clauseContext {
		let _localctx: Use_clauseContext = new Use_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 498, vhdlParser.RULE_use_clause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2535;
			this.match(vhdlParser.USE);
			this.state = 2536;
			this.selected_name();
			this.state = 2541;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === vhdlParser.COMMA) {
				{
				{
				this.state = 2537;
				this.match(vhdlParser.COMMA);
				this.state = 2538;
				this.selected_name();
				}
				}
				this.state = 2543;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 2544;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable_assignment_statement(): Variable_assignment_statementContext {
		let _localctx: Variable_assignment_statementContext = new Variable_assignment_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 500, vhdlParser.RULE_variable_assignment_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2547;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 284, this._ctx) ) {
			case 1:
				{
				this.state = 2546;
				this.label_colon();
				}
				break;
			}
			this.state = 2549;
			this.target();
			this.state = 2550;
			this.match(vhdlParser.VARASGN);
			this.state = 2551;
			this.expression();
			this.state = 2552;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable_declaration(): Variable_declarationContext {
		let _localctx: Variable_declarationContext = new Variable_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 502, vhdlParser.RULE_variable_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2555;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.SHARED) {
				{
				this.state = 2554;
				this.match(vhdlParser.SHARED);
				}
			}

			this.state = 2557;
			this.match(vhdlParser.VARIABLE);
			this.state = 2558;
			this.identifier_list();
			this.state = 2559;
			this.match(vhdlParser.COLON);
			this.state = 2560;
			this.subtype_indication();
			this.state = 2563;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.VARASGN) {
				{
				this.state = 2561;
				this.match(vhdlParser.VARASGN);
				this.state = 2562;
				this.expression();
				}
			}

			this.state = 2565;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wait_statement(): Wait_statementContext {
		let _localctx: Wait_statementContext = new Wait_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 504, vhdlParser.RULE_wait_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2568;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.BASIC_IDENTIFIER || _la === vhdlParser.EXTENDED_IDENTIFIER) {
				{
				this.state = 2567;
				this.label_colon();
				}
			}

			this.state = 2570;
			this.match(vhdlParser.WAIT);
			this.state = 2572;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.ON) {
				{
				this.state = 2571;
				this.sensitivity_clause();
				}
			}

			this.state = 2575;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.UNTIL) {
				{
				this.state = 2574;
				this.condition_clause();
				}
			}

			this.state = 2578;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.FOR) {
				{
				this.state = 2577;
				this.timeout_clause();
				}
			}

			this.state = 2580;
			this.match(vhdlParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public waveform(): WaveformContext {
		let _localctx: WaveformContext = new WaveformContext(this._ctx, this.state);
		this.enterRule(_localctx, 506, vhdlParser.RULE_waveform);
		let _la: number;
		try {
			this.state = 2591;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vhdlParser.ABS:
			case vhdlParser.NEW:
			case vhdlParser.NOT:
			case vhdlParser.NULL_:
			case vhdlParser.BASE_LITERAL:
			case vhdlParser.BIT_STRING_LITERAL:
			case vhdlParser.REAL_LITERAL:
			case vhdlParser.BASIC_IDENTIFIER:
			case vhdlParser.EXTENDED_IDENTIFIER:
			case vhdlParser.CHARACTER_LITERAL:
			case vhdlParser.STRING_LITERAL:
			case vhdlParser.LPAREN:
			case vhdlParser.PLUS:
			case vhdlParser.MINUS:
			case vhdlParser.INTEGER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 2582;
				this.waveform_element();
				this.state = 2587;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vhdlParser.COMMA) {
					{
					{
					this.state = 2583;
					this.match(vhdlParser.COMMA);
					this.state = 2584;
					this.waveform_element();
					}
					}
					this.state = 2589;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case vhdlParser.UNAFFECTED:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 2590;
				this.match(vhdlParser.UNAFFECTED);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public waveform_element(): Waveform_elementContext {
		let _localctx: Waveform_elementContext = new Waveform_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 508, vhdlParser.RULE_waveform_element);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 2593;
			this.expression();
			this.state = 2596;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vhdlParser.AFTER) {
				{
				this.state = 2594;
				this.match(vhdlParser.AFTER);
				this.state = 2595;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 5;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\xA4\u0A29\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
		"\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04" +
		"#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t" +
		"+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04p\tp\x04q\tq\x04" +
		"r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x04w\tw\x04x\tx\x04y\ty\x04z\tz\x04" +
		"{\t{\x04|\t|\x04}\t}\x04~\t~\x04\x7F\t\x7F\x04\x80\t\x80\x04\x81\t\x81" +
		"\x04\x82\t\x82\x04\x83\t\x83\x04\x84\t\x84\x04\x85\t\x85\x04\x86\t\x86" +
		"\x04\x87\t\x87\x04\x88\t\x88\x04\x89\t\x89\x04\x8A\t\x8A\x04\x8B\t\x8B" +
		"\x04\x8C\t\x8C\x04\x8D\t\x8D\x04\x8E\t\x8E\x04\x8F\t\x8F\x04\x90\t\x90" +
		"\x04\x91\t\x91\x04\x92\t\x92\x04\x93\t\x93\x04\x94\t\x94\x04\x95\t\x95" +
		"\x04\x96\t\x96\x04\x97\t\x97\x04\x98\t\x98\x04\x99\t\x99\x04\x9A\t\x9A" +
		"\x04\x9B\t\x9B\x04\x9C\t\x9C\x04\x9D\t\x9D\x04\x9E\t\x9E\x04\x9F\t\x9F" +
		"\x04\xA0\t\xA0\x04\xA1\t\xA1\x04\xA2\t\xA2\x04\xA3\t\xA3\x04\xA4\t\xA4" +
		"\x04\xA5\t\xA5\x04\xA6\t\xA6\x04\xA7\t\xA7\x04\xA8\t\xA8\x04\xA9\t\xA9" +
		"\x04\xAA\t\xAA\x04\xAB\t\xAB\x04\xAC\t\xAC\x04\xAD\t\xAD\x04\xAE\t\xAE" +
		"\x04\xAF\t\xAF\x04\xB0\t\xB0\x04\xB1\t\xB1\x04\xB2\t\xB2\x04\xB3\t\xB3" +
		"\x04\xB4\t\xB4\x04\xB5\t\xB5\x04\xB6\t\xB6\x04\xB7\t\xB7\x04\xB8\t\xB8" +
		"\x04\xB9\t\xB9\x04\xBA\t\xBA\x04\xBB\t\xBB\x04\xBC\t\xBC\x04\xBD\t\xBD" +
		"\x04\xBE\t\xBE\x04\xBF\t\xBF\x04\xC0\t\xC0\x04\xC1\t\xC1\x04\xC2\t\xC2" +
		"\x04\xC3\t\xC3\x04\xC4\t\xC4\x04\xC5\t\xC5\x04\xC6\t\xC6\x04\xC7\t\xC7" +
		"\x04\xC8\t\xC8\x04\xC9\t\xC9\x04\xCA\t\xCA\x04\xCB\t\xCB\x04\xCC\t\xCC" +
		"\x04\xCD\t\xCD\x04\xCE\t\xCE\x04\xCF\t\xCF\x04\xD0\t\xD0\x04\xD1\t\xD1" +
		"\x04\xD2\t\xD2\x04\xD3\t\xD3\x04\xD4\t\xD4\x04\xD5\t\xD5\x04\xD6\t\xD6" +
		"\x04\xD7\t\xD7\x04\xD8\t\xD8\x04\xD9\t\xD9\x04\xDA\t\xDA\x04\xDB\t\xDB" +
		"\x04\xDC\t\xDC\x04\xDD\t\xDD\x04\xDE\t\xDE\x04\xDF\t\xDF\x04\xE0\t\xE0" +
		"\x04\xE1\t\xE1\x04\xE2\t\xE2\x04\xE3\t\xE3\x04\xE4\t\xE4\x04\xE5\t\xE5" +
		"\x04\xE6\t\xE6\x04\xE7\t\xE7\x04\xE8\t\xE8\x04\xE9\t\xE9\x04\xEA\t\xEA" +
		"\x04\xEB\t\xEB\x04\xEC\t\xEC\x04\xED\t\xED\x04\xEE\t\xEE\x04\xEF\t\xEF" +
		"\x04\xF0\t\xF0\x04\xF1\t\xF1\x04\xF2\t\xF2\x04\xF3\t\xF3\x04\xF4\t\xF4" +
		"\x04\xF5\t\xF5\x04\xF6\t\xF6\x04\xF7\t\xF7\x04\xF8\t\xF8\x04\xF9\t\xF9" +
		"\x04\xFA\t\xFA\x04\xFB\t\xFB\x04\xFC\t\xFC\x04\xFD\t\xFD\x04\xFE\t\xFE" +
		"\x04\xFF\t\xFF\x04\u0100\t\u0100\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03" +
		"\x03\x04\x03\x04\x05\x04\u0208\n\x04\x03\x04\x03\x04\x05\x04\u020C\n\x04" +
		"\x03\x04\x03\x04\x03\x05\x03\x05\x05\x05\u0212\n\x05\x03\x06\x03\x06\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07\u021C\n\x07\x03\b" +
		"\x03\b\x03\t\x03\t\x03\t\x03\t\x07\t\u0224\n\t\f\t\x0E\t\u0227\v\t\x03" +
		"\t\x03\t\x03\n\x03\n\x03\n\x03\n\x05\n\u022F\n\n\x03\n\x03\n\x03\n\x05" +
		"\n\u0234\n\n\x03\n\x03\n\x03\v\x03\v\x03\v\x05\v\u023B\n\v\x03\f\x03\f" +
		"\x05\f\u023F\n\f\x03\r\x03\r\x03\r\x05\r\u0244\n\r\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u0250" +
		"\n\x0E\x03\x0E\x05\x0E\u0253\n\x0E\x03\x0E\x03\x0E\x03\x0F\x07\x0F\u0258" +
		"\n\x0F\f\x0F\x0E\x0F\u025B\v\x0F\x03\x10\x03\x10\x03\x10\x05\x10\u0260" +
		"\n\x10\x03\x10\x03\x10\x05\x10\u0264\n\x10\x03\x10\x03\x10\x05\x10\u0268" +
		"\n\x10\x03\x10\x05\x10\u026B\n\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03" +
		"\x10\x05\x10\u0272\n\x10\x03\x11\x07\x11\u0275\n\x11\f\x11\x0E\x11\u0278" +
		"\v\x11\x03\x12\x03\x12\x05\x12\u027C\n\x12\x03\x13\x03\x13\x05\x13\u0280" +
		"\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\u0286\n\x14\x03\x14\x03" +
		"\x14\x05\x14\u028A\n\x14\x03\x15\x05\x15\u028D\n\x15\x03\x15\x03\x15\x03" +
		"\x15\x03\x16\x03\x16\x03\x16\x05\x16\u0295\n\x16\x03\x16\x03\x16\x03\x17" +
		"\x03\x17\x03\x17\x07\x17\u029C\n\x17\f\x17\x0E\x17\u029F\v\x17\x03\x18" +
		"\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19" +
		"\x03\x19\x03\x19\x05\x19\u02AD\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03" +
		"\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x05" +
		"\x1C\u02BC\n\x1C\x03\x1C\x05\x1C\u02BF\n\x1C\x03\x1C\x05\x1C\u02C2\n\x1C" +
		"\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u02C7\n\x1D\f\x1D\x0E\x1D\u02CA\v\x1D" +
		"\x03\x1D\x07\x1D\u02CD\n\x1D\f\x1D\x0E\x1D\u02D0\v\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u02EC\n\x1E\x03" +
		"\x1F\x07\x1F\u02EF\n\x1F\f\x1F\x0E\x1F\u02F2\v\x1F\x03 \x03 \x03 \x03" +
		" \x05 \u02F8\n \x05 \u02FA\n \x03 \x03 \x03 \x03 \x05 \u0300\n \x05 \u0302" +
		"\n \x03!\x03!\x03!\x03!\x03!\x05!\u0309\n!\x03!\x05!\u030C\n!\x03\"\x03" +
		"\"\x03\"\x03\"\x03\"\x03\"\x05\"\u0314\n\"\x03\"\x05\"\u0317\n\"\x03\"" +
		"\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x05\"\u0320\n\"\x03\"\x03\"\x03#" +
		"\x07#\u0325\n#\f#\x0E#\u0328\v#\x03$\x03$\x05$\u032C\n$\x03$\x05$\u032F" +
		"\n$\x03$\x03$\x03$\x03%\x05%\u0335\n%\x03%\x03%\x03%\x03%\x03&\x03&\x03" +
		"&\x07&\u033E\n&\f&\x0E&\u0341\v&\x03\'\x03\'\x03\'\x03\'\x03(\x05(\u0348" +
		"\n(\x03(\x03(\x05(\u034C\n(\x03(\x03(\x05(\u0350\n(\x03(\x03(\x03)\x05" +
		")\u0355\n)\x03)\x03)\x03)\x03)\x06)\u035B\n)\r)\x0E)\u035C\x03)\x03)\x03" +
		")\x05)\u0362\n)\x03)\x03)\x03*\x03*\x03*\x03*\x03*\x03+\x03+\x03+\x03" +
		"+\x05+\u036F\n+\x03,\x03,\x03,\x07,\u0374\n,\f,\x0E,\u0377\v,\x03-\x03" +
		"-\x03-\x03-\x03-\x05-\u037E\n-\x03-\x05-\u0381\n-\x03-\x03-\x03-\x03-" +
		"\x03.\x03.\x03.\x05.\u038A\n.\x03.\x05.\u038D\n.\x03.\x05.\u0390\n.\x03" +
		".\x03.\x03.\x05.\u0395\n.\x03.\x03.\x03/\x03/\x03/\x05/\u039C\n/\x03/" +
		"\x05/\u039F\n/\x03/\x03/\x030\x030\x030\x030\x031\x031\x051\u03A9\n1\x03" +
		"2\x032\x052\u03AD\n2\x033\x053\u03B0\n3\x033\x053\u03B3\n3\x033\x033\x03" +
		"3\x034\x054\u03B9\n4\x034\x034\x054\u03BD\n4\x034\x054\u03C0\n4\x034\x03" +
		"4\x054\u03C4\n4\x034\x034\x035\x055\u03C9\n5\x035\x055\u03CC\n5\x035\x03" +
		"5\x035\x036\x056\u03D2\n6\x036\x056\u03D5\n6\x036\x036\x056\u03D9\n6\x03" +
		"7\x037\x038\x038\x038\x039\x039\x039\x039\x039\x039\x03:\x03:\x03:\x03" +
		":\x03:\x05:\u03EB\n:\x05:\u03ED\n:\x03;\x03;\x03;\x03;\x03;\x03;\x03;" +
		"\x03;\x03;\x05;\u03F8\n;\x03;\x05;\u03FB\n;\x03;\x03;\x03<\x03<\x03<\x05" +
		"<\u0402\n<\x03=\x07=\u0405\n=\f=\x0E=\u0408\v=\x03>\x03>\x05>\u040C\n" +
		">\x03?\x03?\x03?\x03?\x03?\x03@\x03@\x03@\x03@\x03@\x03@\x05@\u0419\n" +
		"@\x03@\x03@\x03A\x03A\x03A\x03A\x03A\x03B\x03B\x03B\x03B\x03B\x03C\x03" +
		"C\x05C\u0429\nC\x03D\x07D\u042C\nD\fD\x0ED\u042F\vD\x03E\x03E\x05E\u0433" +
		"\nE\x03F\x03F\x03F\x05F\u0438\nF\x03F\x05F\u043B\nF\x03G\x07G\u043E\n" +
		"G\fG\x0EG\u0441\vG\x03G\x03G\x03H\x03H\x03H\x03I\x03I\x05I\u044A\nI\x03" +
		"J\x03J\x03K\x03K\x03K\x03K\x03K\x03K\x03L\x03L\x05L\u0456\nL\x03M\x03" +
		"M\x03M\x05M\u045B\nM\x03M\x03M\x03N\x03N\x03N\x03N\x03N\x03O\x03O\x03" +
		"P\x03P\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x05Q\u046E\nQ\x03Q\x03Q\x03Q\x05" +
		"Q\u0473\nQ\x03R\x03R\x03S\x03S\x05S\u0479\nS\x03T\x03T\x03T\x07T\u047E" +
		"\nT\fT\x0ET\u0481\vT\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x05U\u048A\nU" +
		"\x03U\x03U\x05U\u048E\nU\x03U\x05U\u0491\nU\x03U\x03U\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x05V\u04A9\nV\x03W\x07W\u04AC\nW\fW\x0EW\u04AF\vW\x03X\x03" +
		"X\x05X\u04B3\nX\x03Y\x05Y\u04B6\nY\x03Y\x05Y\u04B9\nY\x03Z\x03Z\x03Z\x07" +
		"Z\u04BE\nZ\fZ\x0EZ\u04C1\vZ\x03Z\x03Z\x05Z\u04C5\nZ\x03[\x03[\x03[\x03" +
		"[\x03\\\x03\\\x03\\\x05\\\u04CE\n\\\x03]\x07]\u04D1\n]\f]\x0E]\u04D4\v" +
		"]\x03^\x03^\x03^\x05^\u04D9\n^\x03_\x03_\x05_\u04DD\n_\x03`\x03`\x03`" +
		"\x03`\x07`\u04E3\n`\f`\x0E`\u04E6\v`\x03`\x03`\x03a\x05a\u04EB\na\x03" +
		"a\x03a\x05a\u04EF\na\x03a\x03a\x05a\u04F3\na\x03a\x03a\x03b\x03b\x03b" +
		"\x03b\x07b\u04FB\nb\fb\x0Eb\u04FE\vb\x03c\x03c\x03c\x05c\u0503\nc\x03" +
		"c\x03c\x03c\x03c\x05c\u0509\nc\x03d\x03d\x03d\x03d\x03d\x05d\u0510\nd" +
		"\x03d\x03d\x03e\x03e\x03f\x03f\x05f\u0518\nf\x03f\x03f\x03f\x03g\x03g" +
		"\x03g\x03g\x03h\x03h\x03i\x03i\x03i\x03i\x03i\x03i\x05i\u0529\ni\x03j" +
		"\x03j\x03j\x03j\x03j\x03j\x05j\u0531\nj\x03j\x03j\x03k\x03k\x03k\x03k" +
		"\x07k\u0539\nk\fk\x0Ek\u053C\vk\x03k\x05k\u053F\nk\x03k\x07k\u0542\nk" +
		"\fk\x0Ek\u0545\vk\x03k\x03k\x03k\x05k\u054A\nk\x03k\x03k\x03l\x03l\x03" +
		"l\x03l\x05l\u0552\nl\x03m\x03m\x03m\x03m\x03m\x03m\x03n\x03n\x03n\x07" +
		"n\u055D\nn\fn\x0En\u0560\vn\x03o\x03o\x03o\x03o\x03o\x03o\x03p\x03p\x05" +
		"p\u056A\np\x03q\x03q\x03q\x07q\u056F\nq\fq\x0Eq\u0572\vq\x03r\x03r\x03" +
		"r\x03r\x03r\x03r\x03r\x03r\x03s\x03s\x03s\x03s\x03s\x03s\x03s\x03s\x03" +
		"t\x03t\x03t\x03t\x03u\x03u\x03v\x03v\x03v\x07v\u058D\nv\fv\x0Ev\u0590" +
		"\vv\x03w\x05w\u0593\nw\x03w\x03w\x03w\x03w\x03w\x03w\x03w\x03w\x03w\x07" +
		"w\u059E\nw\fw\x0Ew\u05A1\vw\x03w\x03w\x05w\u05A5\nw\x03w\x03w\x03w\x05" +
		"w\u05AA\nw\x03w\x03w\x03x\x03x\x03x\x03x\x07x\u05B2\nx\fx\x0Ex\u05B5\v" +
		"x\x03x\x03x\x03y\x03y\x05y\u05BB\ny\x03z\x03z\x03z\x03z\x03{\x05{\u05C2" +
		"\n{\x03{\x03{\x03{\x03{\x03{\x03{\x03{\x05{\u05CB\n{\x03{\x03{\x05{\u05CF" +
		"\n{\x03|\x03|\x03|\x07|\u05D4\n|\f|\x0E|\u05D7\v|\x03|\x03|\x05|\u05DB" +
		"\n|\x03}\x05}\u05DE\n}\x03}\x03}\x03}\x05}\u05E3\n}\x03}\x03}\x03}\x05" +
		"}\u05E8\n}\x03~\x03~\x03~\x03~\x03~\x03~\x05~\u05F0\n~\x03\x7F\x03\x7F" +
		"\x03\x80\x03\x80\x03\x80\x03\x80\x03\x80\x03\x81\x03\x81\x03\x81\x07\x81" +
		"\u05FC\n\x81\f\x81\x0E\x81\u05FF\v\x81\x03\x82\x03\x82\x03\x82\x07\x82" +
		"\u0604\n\x82\f\x82\x0E\x82\u0607\v\x82\x03\x83\x03\x83\x03\x83\x07\x83" +
		"\u060C\n\x83\f\x83\x0E\x83\u060F\v\x83\x03\x84\x03\x84\x03\x84\x03\x84" +
		"\x05\x84\u0615\n\x84\x03\x84\x03\x84\x03\x84\x05\x84\u061A\n\x84\x03\x85" +
		"\x03\x85\x03\x85\x05\x85\u061F\n\x85\x03\x85\x03\x85\x05\x85\u0623\n\x85" +
		"\x03\x85\x03\x85\x05\x85\u0627\n\x85\x03\x86\x03\x86\x03\x86\x03\x86\x05" +
		"\x86\u062D\n\x86\x03\x86\x03\x86\x05\x86\u0631\n\x86\x03\x86\x03\x86\x05" +
		"\x86\u0635\n\x86\x03\x87\x03\x87\x03\x87\x03\x87\x03\x87\x03\x88\x05\x88" +
		"\u063D\n\x88\x03\x88\x03\x88\x03\x88\x05\x88\u0642\n\x88\x03\x88\x03\x88" +
		"\x03\x88\x05\x88\u0647\n\x88\x03\x89\x03\x89\x03\x89\x03\x89\x05\x89\u064D" +
		"\n\x89\x03\x8A\x03\x8A\x03\x8A\x03\x8B\x03\x8B\x03\x8B\x03\x8B\x03\x8C" +
		"\x03\x8C\x05\x8C\u0658\n\x8C\x03\x8D\x03\x8D\x03\x8D\x03\x8D\x03\x8D\x05" +
		"\x8D\u065F\n\x8D\x03\x8E\x03\x8E\x03\x8F\x03\x8F\x03\x8F\x07\x8F\u0666" +
		"\n\x8F\f\x8F\x0E\x8F\u0669\v\x8F\x03\x90\x03\x90\x03\x91\x05\x91\u066E" +
		"\n\x91\x03\x91\x05\x91\u0671\n\x91\x03\x91\x03\x91\x03\x91\x03\x91\x03" +
		"\x91\x05\x91\u0678\n\x91\x03\x91\x03\x91\x03\x92\x03\x92\x03\x93\x03\x93" +
		"\x03\x94\x03\x94\x05\x94\u0682\n\x94\x03\x94\x07\x94\u0685\n\x94\f\x94" +
		"\x0E\x94\u0688\v\x94\x03\x95\x03\x95\x03\x95\x03\x95\x05\x95\u068E\n\x95" +
		"\x03\x96\x03\x96\x03\x96\x07\x96\u0693\n\x96\f\x96\x0E\x96\u0696\v\x96" +
		"\x03\x97\x03\x97\x06\x97\u069A\n\x97\r\x97\x0E\x97\u069B\x03\x98\x03\x98" +
		"\x03\x98\x03\x98\x03\x99\x03\x99\x03\x99\x03\x99\x03\x9A\x05\x9A\u06A7" +
		"\n\x9A\x03\x9A\x03\x9A\x03\x9A\x03\x9A\x03\x9A\x03\x9A\x05\x9A\u06AF\n" +
		"\x9A\x03\x9B\x03\x9B\x03\x9B\x03\x9B\x03\x9B\x03\x9B\x03\x9C\x03\x9C\x05" +
		"\x9C\u06B9\n\x9C\x03\x9D\x03\x9D\x03\x9D\x03\x9D\x03\x9E\x05\x9E\u06C0" +
		"\n\x9E\x03\x9E\x03\x9E\x05\x9E\u06C4\n\x9E\x03\x9E\x03\x9E\x05\x9E\u06C8" +
		"\n\x9E\x03\x9E\x03\x9E\x03\x9F\x03\x9F\x05\x9F\u06CE\n\x9F\x03\xA0\x03" +
		"\xA0\x03\xA0\x03\xA0\x03\xA0\x03\xA0\x05\xA0\u06D6\n\xA0\x03\xA1\x05\xA1" +
		"\u06D9\n\xA1\x03\xA1\x05\xA1\u06DC\n\xA1\x03\xA2\x03\xA2\x03\xA2\x03\xA2" +
		"\x03\xA2\x03\xA2\x03\xA2\x03\xA2\x05\xA2\u06E6\n\xA2\x03\xA2\x05\xA2\u06E9" +
		"\n\xA2\x03\xA2\x03\xA2\x03\xA3\x03\xA3\x03\xA3\x03\xA3\x03\xA3\x03\xA3" +
		"\x03\xA3\x03\xA3\x03\xA3\x03\xA3\x03\xA3\x05\xA3\u06F8\n\xA3\x03\xA4\x07" +
		"\xA4\u06FB\n\xA4\f\xA4\x0E\xA4\u06FE\v\xA4\x03\xA5\x03\xA5\x03\xA5\x03" +
		"\xA5\x03\xA5\x03\xA5\x05\xA5\u0706\n\xA5\x03\xA5\x05\xA5\u0709\n\xA5\x03" +
		"\xA5\x03\xA5\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03" +
		"\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03\xA6\x03" +
		"\xA6\x03\xA6\x03\xA6\x05\xA6\u0720\n\xA6\x03\xA7\x07\xA7\u0723\n\xA7\f" +
		"\xA7\x0E\xA7\u0726\v\xA7\x03\xA8\x03\xA8\x03\xA8\x03\xA8\x03\xA9\x03\xA9" +
		"\x03\xA9\x03\xAA\x03\xAA\x03\xAA\x03\xAA\x07\xAA\u0733\n\xAA\f\xAA\x0E" +
		"\xAA\u0736\v\xAA\x03\xAA\x03\xAA\x03\xAA\x05\xAA\u073B\n\xAA\x03\xAB\x03" +
		"\xAB\x03\xAB\x03\xAB\x03\xAB\x03\xAB\x03\xAC\x03\xAC\x03\xAD\x03\xAD\x03" +
		"\xAD\x03\xAD\x03\xAD\x03\xAD\x03\xAE\x03\xAE\x03\xAE\x03\xAE\x03\xAE\x03" +
		"\xAE\x03\xAE\x03\xAE\x03\xAE\x05\xAE\u0754\n\xAE\x03\xAF\x03\xAF\x03\xAF" +
		"\x05\xAF\u0759\n\xAF\x03\xB0\x03\xB0\x03\xB0\x03\xB0\x03\xB0\x03\xB0\x03" +
		"\xB0\x03\xB0\x03\xB0\x03\xB0\x03\xB0\x03\xB0\x05\xB0\u0767\n\xB0\x03\xB1" +
		"\x07\xB1\u076A\n\xB1\f\xB1\x0E\xB1\u076D\v\xB1\x03\xB2\x07\xB2\u0770\n" +
		"\xB2\f\xB2\x0E\xB2\u0773\v\xB2\x03\xB3\x03\xB3\x03\xB3\x03\xB3\x03\xB3" +
		"\x05\xB3\u077A\n\xB3\x03\xB4\x05\xB4\u077D\n\xB4\x03\xB4\x03\xB4\x03\xB4" +
		"\x03\xB5\x03\xB5\x03\xB5\x03\xB5\x03\xB5\x03\xB5\x03\xB5\x03\xB5\x03\xB5" +
		"\x03\xB5\x03\xB5\x03\xB5\x03\xB5\x05\xB5\u078F\n\xB5\x03\xB6\x07\xB6\u0792" +
		"\n\xB6\f\xB6\x0E\xB6\u0795\v\xB6\x03\xB7\x05\xB7\u0798\n\xB7\x03\xB7\x05" +
		"\xB7\u079B\n\xB7\x03\xB7\x03\xB7\x03\xB7\x03\xB7\x03\xB7\x05\xB7\u07A2" +
		"\n\xB7\x03\xB7\x05\xB7\u07A5\n\xB7\x03\xB7\x03\xB7\x03\xB7\x03\xB7\x03" +
		"\xB7\x05\xB7\u07AC\n\xB7\x03\xB7\x03\xB7\x05\xB7\u07B0\n\xB7\x03\xB7\x03" +
		"\xB7\x03\xB8\x07\xB8\u07B5\n\xB8\f\xB8\x0E\xB8\u07B8\v\xB8\x03\xB9\x03" +
		"\xB9\x03\xB9\x03\xB9\x03\xB9\x03\xB9\x03\xB9\x05\xB9\u07C1\n\xB9\x03\xBA" +
		"\x03\xBA\x03\xBA\x05\xBA\u07C6\n\xBA\x03\xBB\x03\xBB\x03\xBB\x07\xBB\u07CB" +
		"\n\xBB\f\xBB\x0E\xBB\u07CE\v\xBB\x03\xBB\x03\xBB\x05\xBB\u07D2\n\xBB\x03" +
		"\xBC\x03\xBC\x03\xBC\x03\xBC\x03\xBD\x03\xBD\x05\xBD\u07DA\n\xBD\x03\xBE" +
		"\x03\xBE\x03\xBE\x03\xBE\x05\xBE\u07E0\n\xBE\x03\xBF\x03\xBF\x03\xBF\x03" +
		"\xC0\x03\xC0\x06\xC0\u07E7\n\xC0\r\xC0\x0E\xC0\u07E8\x03\xC0\x03\xC0\x03" +
		"\xC0\x05\xC0\u07EE\n\xC0\x03\xC1\x03\xC1\x06\xC1\u07F2\n\xC1\r\xC1\x0E" +
		"\xC1\u07F3\x03\xC1\x03\xC1\x03\xC1\x05\xC1\u07F9\n\xC1\x03\xC2\x03\xC2" +
		"\x03\xC2\x03\xC2\x05\xC2\u07FF\n\xC2\x03\xC3\x03\xC3\x03\xC4\x05\xC4\u0804" +
		"\n\xC4\x03\xC4\x03\xC4\x03\xC4\x03\xC4\x05\xC4\u080A\n\xC4\x03\xC4\x03" +
		"\xC4\x03\xC5\x05\xC5\u080F\n\xC5\x03\xC5\x03\xC5\x05\xC5\u0813\n\xC5\x03" +
		"\xC5\x03\xC5\x03\xC6\x03\xC6\x03\xC6\x03\xC6\x03\xC6\x03\xC6\x03\xC6\x03" +
		"\xC7\x03\xC7\x03\xC7\x05\xC7\u0821\n\xC7\x03\xC8\x03\xC8\x05\xC8\u0825" +
		"\n\xC8\x03\xC9\x03\xC9\x03\xC9\x03\xC9\x03\xC9\x03\xCA\x03\xCA\x03\xCA" +
		"\x03\xCA\x03\xCA\x03\xCA\x03\xCA\x03\xCA\x03\xCA\x03\xCB\x03\xCB\x03\xCB" +
		"\x03\xCB\x03\xCB\x03\xCB\x03\xCB\x03\xCB\x07\xCB\u083D\n\xCB\f\xCB\x0E" +
		"\xCB\u0840\v\xCB\x03\xCC\x03\xCC\x03\xCC\x03\xCD\x03\xCD\x03\xCD\x07\xCD" +
		"\u0848\n\xCD\f\xCD\x0E\xCD\u084B\v\xCD\x03\xCE\x07\xCE\u084E\n\xCE\f\xCE" +
		"\x0E\xCE\u0851\v\xCE\x03\xCF\x03\xCF\x03\xCF\x03\xCF\x03\xCF\x03\xCF\x03" +
		"\xCF\x03\xCF\x03\xCF\x03\xCF\x03\xCF\x03\xCF\x05\xCF\u085F\n\xCF\x03\xCF" +
		"\x03\xCF\x03\xCF\x03\xCF\x05\xCF\u0865\n\xCF\x03\xD0\x03\xD0\x03\xD0\x03" +
		"\xD0\x05\xD0\u086B\n\xD0\x03\xD1\x03\xD1\x03\xD2\x05\xD2\u0870\n\xD2\x03" +
		"\xD2\x03\xD2\x03\xD2\x05\xD2\u0875\n\xD2\x03\xD2\x03\xD2\x03\xD2\x03\xD3" +
		"\x03\xD3\x03\xD3\x03\xD3\x03\xD3\x05\xD3\u087F\n\xD3\x03\xD3\x03\xD3\x05" +
		"\xD3\u0883\n\xD3\x03\xD3\x03\xD3\x03\xD4\x03\xD4\x03\xD5\x03\xD5\x03\xD5" +
		"\x07\xD5\u088C\n\xD5\f\xD5\x0E\xD5\u088F\v\xD5\x03\xD5\x03\xD5\x05\xD5" +
		"\u0893\n\xD5\x03\xD6\x03\xD6\x03\xD6\x03\xD6\x07\xD6\u0899\n\xD6\f\xD6" +
		"\x0E\xD6\u089C\v\xD6\x05\xD6\u089E\n\xD6\x03\xD6\x03\xD6\x05\xD6\u08A2" +
		"\n\xD6\x03\xD6\x03\xD6\x03\xD7\x05\xD7\u08A7\n\xD7\x03\xD7\x03\xD7\x03" +
		"\xD7\x03\xD7\x07\xD7\u08AD\n\xD7\f\xD7\x0E\xD7\u08B0\v\xD7\x03\xD8\x05" +
		"\xD8\u08B3\n\xD8\x03\xD8\x03\xD8\x03\xD8\x03\xD8\x05\xD8\u08B9\n\xD8\x03" +
		"\xD8\x03\xD8\x03\xD9\x03\xD9\x03\xD9\x03\xD9\x03\xD9\x03\xDA\x05\xDA\u08C3" +
		"\n\xDA\x03\xDA\x03\xDA\x03\xDA\x03\xDA\x06\xDA\u08C9\n\xDA\r\xDA\x0E\xDA" +
		"\u08CA\x03\xDA\x03\xDA\x03\xDA\x05\xDA\u08D0\n\xDA\x03\xDA\x03\xDA\x03" +
		"\xDB\x05\xDB\u08D5\n\xDB\x03\xDB\x03\xDB\x03\xDB\x03\xDB\x03\xDB\x03\xDB" +
		"\x03\xDB\x03\xDB\x03\xDB\x07\xDB\u08E0\n\xDB\f\xDB\x0E\xDB\u08E3\v\xDB" +
		"\x03\xDB\x03\xDB\x05\xDB\u08E7\n\xDB\x03\xDB\x03\xDB\x03\xDB\x05\xDB\u08EC" +
		"\n\xDB\x03\xDB\x03\xDB\x03\xDC\x05\xDC\u08F1\n\xDC\x03\xDC\x03\xDC\x05" +
		"\xDC\u08F5\n\xDC\x03\xDC\x03\xDC\x03\xDC\x03\xDC\x03\xDC\x03\xDC\x05\xDC" +
		"\u08FD\n\xDC\x03\xDC\x03\xDC\x03\xDD\x03\xDD\x03\xDD\x03\xDD\x03\xDD\x05" +
		"\xDD\u0906\n\xDD\x03\xDD\x03\xDD\x05\xDD\u090A\n\xDD\x03\xDE\x07\xDE\u090D" +
		"\n\xDE\f\xDE\x0E\xDE\u0910\v\xDE\x03\xDF\x03\xDF\x03\xDF\x03\xDF\x03\xDF" +
		"\x03\xDF\x03\xDF\x05\xDF\u0919\n\xDF\x03\xE0\x03\xE0\x03\xE0\x03\xE0\x03" +
		"\xE0\x03\xE0\x03\xE0\x03\xE1\x03\xE1\x03";
	private static readonly _serializedATNSegment1: string =
		"\xE1\x03\xE1\x03\xE1\x03\xE1\x03\xE2\x03\xE2\x03\xE2\x03\xE2\x03\xE2\x03" +
		"\xE2\x03\xE3\x03\xE3\x05\xE3\u0930\n\xE3\x03\xE3\x03\xE3\x03\xE3\x03\xE3" +
		"\x03\xE3\x03\xE3\x05\xE3\u0938\n\xE3\x03\xE4\x03\xE4\x03\xE4\x03\xE4\x03" +
		"\xE4\x03\xE4\x03\xE4\x05\xE4\u0941\n\xE4\x03\xE4\x05\xE4\u0944\n\xE4\x03" +
		"\xE4\x03\xE4\x03\xE5\x03\xE5\x03\xE5\x03\xE6\x03\xE6\x03\xE6\x03\xE6\x03" +
		"\xE6\x03\xE6\x03\xE6\x03\xE6\x03\xE6\x03\xE6\x03\xE6\x03\xE6\x03\xE6\x05" +
		"\xE6\u0958\n\xE6\x03\xE7\x07\xE7\u095B\n\xE7\f\xE7\x0E\xE7\u095E\v\xE7" +
		"\x03\xE8\x03\xE8\x03\xE9\x03\xE9\x05\xE9\u0964\n\xE9\x03\xEA\x03\xEA\x03" +
		"\xEA\x03\xEA\x03\xEA\x03\xEA\x05\xEA\u096C\n\xEA\x03\xEB\x05\xEB\u096F" +
		"\n\xEB\x03\xEB\x03\xEB\x03\xEB\x03\xEB\x03\xEB\x03\xEB\x05\xEB\u0977\n" +
		"\xEB\x03\xEB\x03\xEB\x03\xEB\x03\xEC\x07\xEC\u097D\n\xEC\f\xEC\x0E\xEC" +
		"\u0980\v\xEC\x03\xED\x03\xED\x03\xED\x03\xED\x03\xED\x03\xED\x03\xEE\x03" +
		"\xEE\x05\xEE\u098A\n\xEE\x03\xEE\x05\xEE\u098D\n\xEE\x03\xEE\x05\xEE\u0990" +
		"\n\xEE\x03\xEF\x03\xEF\x03\xEF\x03\xEF\x05\xEF\u0996\n\xEF\x03\xF0\x03" +
		"\xF0\x05\xF0\u099A\n\xF0\x03\xF1\x03\xF1\x03\xF1\x03\xF1\x07\xF1\u09A0" +
		"\n\xF1\f\xF1\x0E\xF1\u09A3\v\xF1\x03\xF2\x03\xF2\x03\xF2\x05\xF2\u09A8" +
		"\n\xF2\x03\xF3\x03\xF3\x03\xF3\x03\xF3\x03\xF3\x03\xF3\x03\xF4\x03\xF4" +
		"\x05\xF4\u09B2\n\xF4\x03\xF4\x03\xF4\x05\xF4\u09B6\n\xF4\x03\xF4\x03\xF4" +
		"\x03\xF5\x03\xF5\x03\xF5\x03\xF6\x03\xF6\x03\xF6\x03\xF7\x03\xF7\x03\xF7" +
		"\x03\xF7\x05\xF7\u09C4\n\xF7\x03\xF7\x03\xF7\x03\xF8\x03\xF8\x03\xF8\x03" +
		"\xF8\x05\xF8\u09CC\n\xF8\x03\xF9\x03\xF9\x03\xF9\x03\xF9\x03\xF9\x07\xF9" +
		"\u09D3\n\xF9\f\xF9\x0E\xF9\u09D6\v\xF9\x03\xF9\x03\xF9\x03\xF9\x03\xF9" +
		"\x03\xFA\x03\xFA\x03\xFA\x03\xFA\x03\xFA\x07\xFA\u09E1\n\xFA\f\xFA\x0E" +
		"\xFA\u09E4\v\xFA\x03\xFA\x03\xFA\x03\xFA\x03\xFA\x03\xFB\x03\xFB\x03\xFB" +
		"\x03\xFB\x07\xFB\u09EE\n\xFB\f\xFB\x0E\xFB\u09F1\v\xFB\x03\xFB\x03\xFB" +
		"\x03\xFC\x05\xFC\u09F6\n\xFC\x03\xFC\x03\xFC\x03\xFC\x03\xFC\x03\xFC\x03" +
		"\xFD\x05\xFD\u09FE\n\xFD\x03\xFD\x03\xFD\x03\xFD\x03\xFD\x03\xFD\x03\xFD" +
		"\x05\xFD\u0A06\n\xFD\x03\xFD\x03\xFD\x03\xFE\x05\xFE\u0A0B\n\xFE\x03\xFE" +
		"\x03\xFE\x05\xFE\u0A0F\n\xFE\x03\xFE\x05\xFE\u0A12\n\xFE\x03\xFE\x05\xFE" +
		"\u0A15\n\xFE\x03\xFE\x03\xFE\x03\xFF\x03\xFF\x03\xFF\x07\xFF\u0A1C\n\xFF" +
		"\f\xFF\x0E\xFF\u0A1F\v\xFF\x03\xFF\x05\xFF\u0A22\n\xFF\x03\u0100\x03\u0100" +
		"\x03\u0100\x05\u0100\u0A27\n\u0100\x03\u0100\x02\x02\x02\u0101\x02\x02" +
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16" +
		"\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02" +
		".\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80" +
		"\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92" +
		"\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4" +
		"\x02\xA6\x02\xA8\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6" +
		"\x02\xB8\x02\xBA\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8" +
		"\x02\xCA\x02\xCC\x02\xCE\x02\xD0\x02\xD2\x02\xD4\x02\xD6\x02\xD8\x02\xDA" +
		"\x02\xDC\x02\xDE\x02\xE0\x02\xE2\x02\xE4\x02\xE6\x02\xE8\x02\xEA\x02\xEC" +
		"\x02\xEE\x02\xF0\x02\xF2\x02\xF4\x02\xF6\x02\xF8\x02\xFA\x02\xFC\x02\xFE" +
		"\x02\u0100\x02\u0102\x02\u0104\x02\u0106\x02\u0108\x02\u010A\x02\u010C" +
		"\x02\u010E\x02\u0110\x02\u0112\x02\u0114\x02\u0116\x02\u0118\x02\u011A" +
		"\x02\u011C\x02\u011E\x02\u0120\x02\u0122\x02\u0124\x02\u0126\x02\u0128" +
		"\x02\u012A\x02\u012C\x02\u012E\x02\u0130\x02\u0132\x02\u0134\x02\u0136" +
		"\x02\u0138\x02\u013A\x02\u013C\x02\u013E\x02\u0140\x02\u0142\x02\u0144" +
		"\x02\u0146\x02\u0148\x02\u014A\x02\u014C\x02\u014E\x02\u0150\x02\u0152" +
		"\x02\u0154\x02\u0156\x02\u0158\x02\u015A\x02\u015C\x02\u015E\x02\u0160" +
		"\x02\u0162\x02\u0164\x02\u0166\x02\u0168\x02\u016A\x02\u016C\x02\u016E" +
		"\x02\u0170\x02\u0172\x02\u0174\x02\u0176\x02\u0178\x02\u017A\x02\u017C" +
		"\x02\u017E\x02\u0180\x02\u0182\x02\u0184\x02\u0186\x02\u0188\x02\u018A" +
		"\x02\u018C\x02\u018E\x02\u0190\x02\u0192\x02\u0194\x02\u0196\x02\u0198" +
		"\x02\u019A\x02\u019C\x02\u019E\x02\u01A0\x02\u01A2\x02\u01A4\x02\u01A6" +
		"\x02\u01A8\x02\u01AA\x02\u01AC\x02\u01AE\x02\u01B0\x02\u01B2\x02\u01B4" +
		"\x02\u01B6\x02\u01B8\x02\u01BA\x02\u01BC\x02\u01BE\x02\u01C0\x02\u01C2" +
		"\x02\u01C4\x02\u01C6\x02\u01C8\x02\u01CA\x02\u01CC\x02\u01CE\x02\u01D0" +
		"\x02\u01D2\x02\u01D4\x02\u01D6\x02\u01D8\x02\u01DA\x02\u01DC\x02\u01DE" +
		"\x02\u01E0\x02\u01E2\x02\u01E4\x02\u01E6\x02\u01E8\x02\u01EA\x02\u01EC" +
		"\x02\u01EE\x02\u01F0\x02\u01F2\x02\u01F4\x02\u01F6\x02\u01F8\x02\u01FA" +
		"\x02\u01FC\x02\u01FE\x02\x02\x11\x05\x02rrww\xA0\xA0\x04\x02\x8E\x8E\x96" +
		"\x97\x04\x02\x19\x19cc\x13\x02\n\n\x15\x17\x1B\x1B\x1F\x1F!!$$,,0055B" +
		"BFFIIXX^`ffhhkk\x03\x02xy\x04\x02((AA\x07\x02\t\t4499??pq\x07\x02\x12" +
		"\x12((**//AA\x05\x0233MM\x94\x95\x05\x02\x85\x86\x88\x88\x98\x9A\x05\x02" +
		"STYZ\\]\x04\x02\x13\x13PP\x03\x02\x96\x97\x04\x02!!FF\x04\x02\'\'HH\x02" +
		"\u0AEF\x02\u0200\x03\x02\x02\x02\x04\u0202\x03\x02\x02\x02\x06\u0205\x03" +
		"\x02\x02\x02\b\u0211\x03\x02\x02\x02\n\u0213\x03\x02\x02\x02\f\u021B\x03" +
		"\x02\x02\x02\x0E\u021D\x03\x02\x02\x02\x10\u021F\x03\x02\x02\x02\x12\u022A" +
		"\x03\x02\x02\x02\x14\u023A\x03\x02\x02\x02\x16\u023E\x03\x02\x02\x02\x18" +
		"\u0240\x03\x02\x02\x02\x1A\u0245\x03\x02\x02\x02\x1C\u0259\x03\x02\x02" +
		"\x02\x1E\u0271\x03\x02\x02\x02 \u0276\x03\x02\x02\x02\"\u027B\x03\x02" +
		"\x02\x02$\u027F\x03\x02\x02\x02&\u0281\x03\x02\x02\x02(\u028C\x03\x02" +
		"\x02\x02*\u0294\x03\x02\x02\x02,\u0298\x03\x02\x02\x02.\u02A0\x03\x02" +
		"\x02\x020\u02AC\x03\x02\x02\x022\u02AE\x03\x02\x02\x024\u02B6\x03\x02" +
		"\x02\x026\u02BB\x03\x02\x02\x028\u02C3\x03\x02\x02\x02:\u02EB\x03\x02" +
		"\x02\x02<\u02F0\x03\x02\x02\x02>\u02F9\x03\x02\x02\x02@\u030B\x03\x02" +
		"\x02\x02B\u030D\x03\x02\x02\x02D\u0326\x03\x02\x02\x02F\u0329\x03\x02" +
		"\x02\x02H\u0334\x03\x02\x02\x02J\u033A\x03\x02\x02\x02L\u0342\x03\x02" +
		"\x02\x02N\u0347\x03\x02\x02\x02P\u0354\x03\x02\x02\x02R\u0365\x03\x02" +
		"\x02\x02T\u036E\x03\x02\x02\x02V\u0370\x03\x02\x02\x02X\u0378\x03\x02" +
		"\x02\x02Z\u0386\x03\x02\x02\x02\\\u0398\x03\x02\x02\x02^\u03A2\x03\x02" +
		"\x02\x02`\u03A8\x03\x02\x02\x02b\u03AC\x03\x02\x02\x02d\u03AF\x03\x02" +
		"\x02\x02f\u03B8\x03\x02\x02\x02h\u03C8\x03\x02\x02\x02j\u03D1\x03\x02" +
		"\x02\x02l\u03DA\x03\x02\x02\x02n\u03DC\x03\x02\x02\x02p\u03DF\x03\x02" +
		"\x02\x02r\u03E5\x03\x02\x02\x02t\u03EE\x03\x02\x02\x02v\u0401\x03\x02" +
		"\x02\x02x\u0406\x03\x02\x02\x02z\u040B\x03\x02\x02\x02|\u040D\x03\x02" +
		"\x02\x02~\u0412\x03\x02\x02\x02\x80\u041C\x03\x02\x02\x02\x82\u0421\x03" +
		"\x02\x02\x02\x84\u0428\x03\x02\x02\x02\x86\u042D\x03\x02\x02\x02\x88\u0432" +
		"\x03\x02\x02\x02\x8A\u043A\x03\x02\x02\x02\x8C\u043F\x03\x02\x02\x02\x8E" +
		"\u0444\x03\x02\x02\x02\x90\u0449\x03\x02\x02\x02\x92\u044B\x03\x02\x02" +
		"\x02\x94\u044D\x03\x02\x02\x02\x96\u0455\x03\x02\x02\x02\x98\u045A\x03" +
		"\x02\x02\x02\x9A\u045E\x03\x02\x02\x02\x9C\u0463\x03\x02\x02\x02\x9E\u0465" +
		"\x03\x02\x02\x02\xA0\u0472\x03\x02\x02\x02\xA2\u0474\x03\x02\x02\x02\xA4" +
		"\u0476\x03\x02\x02\x02\xA6\u047A\x03\x02\x02\x02\xA8\u0482\x03\x02\x02" +
		"\x02\xAA\u04A8\x03\x02\x02\x02\xAC\u04AD\x03\x02\x02\x02\xAE\u04B0\x03" +
		"\x02\x02\x02\xB0\u04B5\x03\x02\x02\x02\xB2\u04C4\x03\x02\x02\x02\xB4\u04C6" +
		"\x03\x02\x02\x02\xB6\u04CD\x03\x02\x02\x02\xB8\u04D2\x03\x02\x02\x02\xBA" +
		"\u04D8\x03\x02\x02\x02\xBC\u04DC\x03\x02\x02\x02\xBE\u04DE\x03\x02\x02" +
		"\x02\xC0\u04EA\x03\x02\x02\x02\xC2\u04F6\x03\x02\x02\x02\xC4\u0508\x03" +
		"\x02\x02\x02\xC6\u050A\x03\x02\x02\x02\xC8\u0513\x03\x02\x02\x02\xCA\u0517" +
		"\x03\x02\x02\x02\xCC\u051C\x03\x02\x02\x02\xCE\u0520\x03\x02\x02\x02\xD0" +
		"\u0528\x03\x02\x02\x02\xD2\u052A\x03\x02\x02\x02\xD4\u0534\x03\x02\x02" +
		"\x02\xD6\u0551\x03\x02\x02\x02\xD8\u0553\x03\x02\x02\x02\xDA\u0559\x03" +
		"\x02\x02\x02\xDC\u0561\x03\x02\x02\x02\xDE\u0569\x03\x02\x02\x02\xE0\u056B" +
		"\x03\x02\x02\x02\xE2\u0573\x03\x02\x02\x02\xE4\u057B\x03\x02\x02\x02\xE6" +
		"\u0583\x03\x02\x02\x02\xE8\u0587\x03\x02\x02\x02\xEA\u0589\x03\x02\x02" +
		"\x02\xEC\u0592\x03\x02\x02\x02\xEE\u05AD\x03\x02\x02\x02\xF0\u05BA\x03" +
		"\x02\x02\x02\xF2\u05BC\x03\x02\x02\x02\xF4\u05CE\x03\x02\x02\x02\xF6\u05DA" +
		"\x03\x02\x02\x02\xF8\u05DD\x03\x02\x02\x02\xFA\u05EF\x03\x02\x02\x02\xFC" +
		"\u05F1\x03\x02\x02\x02\xFE\u05F3\x03\x02\x02\x02\u0100\u05F8\x03\x02\x02" +
		"\x02\u0102\u0600\x03\x02\x02\x02\u0104\u0608\x03\x02\x02\x02\u0106\u0610" +
		"\x03\x02\x02\x02\u0108\u061B\x03\x02\x02\x02\u010A\u0628\x03\x02\x02\x02" +
		"\u010C\u0636\x03\x02\x02\x02\u010E\u063C\x03\x02\x02\x02\u0110\u064C\x03" +
		"\x02\x02\x02\u0112\u064E\x03\x02\x02\x02\u0114\u0651\x03\x02\x02\x02\u0116" +
		"\u0657\x03\x02\x02\x02\u0118\u065E\x03\x02\x02\x02\u011A\u0660\x03\x02" +
		"\x02\x02\u011C\u0662\x03\x02\x02\x02\u011E\u066A\x03\x02\x02\x02\u0120" +
		"\u066D\x03\x02\x02\x02\u0122\u067B\x03\x02\x02\x02\u0124\u067D\x03\x02" +
		"\x02\x02\u0126\u0681\x03\x02\x02\x02\u0128\u068D\x03\x02\x02\x02\u012A" +
		"\u068F\x03\x02\x02\x02\u012C\u0699\x03\x02\x02\x02\u012E\u069D\x03\x02" +
		"\x02\x02\u0130\u06A1\x03\x02\x02\x02\u0132\u06A6\x03\x02\x02\x02\u0134" +
		"\u06B0\x03\x02\x02\x02\u0136\u06B8\x03\x02\x02\x02\u0138\u06BA\x03\x02" +
		"\x02\x02\u013A\u06BF\x03\x02\x02\x02\u013C\u06CD\x03\x02\x02\x02\u013E" +
		"\u06D5\x03\x02\x02\x02\u0140\u06D8\x03\x02\x02\x02\u0142\u06DD\x03\x02" +
		"\x02\x02\u0144\u06F7\x03\x02\x02\x02\u0146\u06FC\x03\x02\x02\x02\u0148" +
		"\u06FF\x03\x02\x02\x02\u014A\u071F\x03\x02\x02\x02\u014C\u0724\x03\x02" +
		"\x02\x02\u014E\u0727\x03\x02\x02\x02\u0150\u072B\x03\x02\x02\x02\u0152" +
		"\u072E\x03\x02\x02\x02\u0154\u073C\x03\x02\x02\x02\u0156\u0742\x03\x02" +
		"\x02\x02\u0158\u0744\x03\x02\x02\x02\u015A\u0753\x03\x02\x02\x02\u015C" +
		"\u0758\x03\x02\x02\x02\u015E\u0766\x03\x02\x02\x02\u0160\u076B\x03\x02" +
		"\x02\x02\u0162\u0771\x03\x02\x02\x02\u0164\u0774\x03\x02\x02\x02\u0166" +
		"\u077C\x03\x02\x02\x02\u0168\u078E\x03\x02\x02\x02\u016A\u0793\x03\x02" +
		"\x02\x02\u016C\u0797\x03\x02\x02\x02\u016E\u07B6\x03\x02\x02\x02\u0170" +
		"\u07B9\x03\x02\x02\x02\u0172\u07C5\x03\x02\x02\x02\u0174\u07D1\x03\x02" +
		"\x02\x02\u0176\u07D3\x03\x02\x02\x02\u0178\u07D9\x03\x02\x02\x02\u017A" +
		"\u07DB\x03\x02\x02\x02\u017C\u07E1\x03\x02\x02\x02\u017E\u07E4\x03\x02" +
		"\x02\x02\u0180\u07EF\x03\x02\x02\x02\u0182\u07FA\x03\x02\x02\x02\u0184" +
		"\u0800\x03\x02\x02\x02\u0186\u0803\x03\x02\x02\x02\u0188\u080E\x03\x02" +
		"\x02\x02\u018A\u0816\x03\x02\x02\x02\u018C\u0820\x03\x02\x02\x02\u018E" +
		"\u0824\x03\x02\x02\x02\u0190\u0826\x03\x02\x02\x02\u0192\u082B\x03\x02" +
		"\x02\x02\u0194\u0834\x03\x02\x02\x02\u0196\u0841\x03\x02\x02\x02\u0198" +
		"\u0844\x03\x02\x02\x02\u019A\u084F\x03\x02\x02\x02\u019C\u0864\x03\x02" +
		"\x02\x02\u019E\u0866\x03\x02\x02\x02\u01A0\u086C\x03\x02\x02\x02\u01A2" +
		"\u086F\x03\x02\x02\x02\u01A4\u0879\x03\x02\x02\x02\u01A6\u0886\x03\x02" +
		"\x02\x02\u01A8\u0892\x03\x02\x02\x02\u01AA\u0894\x03\x02\x02\x02\u01AC" +
		"\u08A6\x03\x02\x02\x02\u01AE\u08B2\x03\x02\x02\x02\u01B0\u08BC\x03\x02" +
		"\x02\x02\u01B2\u08C2\x03\x02\x02\x02\u01B4\u08D4\x03\x02\x02\x02\u01B6" +
		"\u08F0\x03\x02\x02\x02\u01B8\u0909\x03\x02\x02\x02\u01BA\u090E\x03\x02" +
		"\x02\x02\u01BC\u0918\x03\x02\x02\x02\u01BE\u091A\x03\x02\x02\x02\u01C0" +
		"\u0921\x03\x02\x02\x02\u01C2\u0927\x03\x02\x02\x02\u01C4\u092D\x03\x02" +
		"\x02\x02\u01C6\u0939\x03\x02\x02\x02\u01C8\u0947\x03\x02\x02\x02\u01CA" +
		"\u0957\x03\x02\x02\x02\u01CC\u095C\x03\x02\x02\x02\u01CE\u095F\x03\x02" +
		"\x02\x02\u01D0\u0963\x03\x02\x02\x02\u01D2\u0965\x03\x02\x02\x02\u01D4" +
		"\u096E\x03\x02\x02\x02\u01D6\u097E\x03\x02\x02\x02\u01D8\u0981\x03\x02" +
		"\x02\x02\u01DA\u0987\x03\x02\x02\x02\u01DC\u0995\x03\x02\x02\x02\u01DE" +
		"\u0999\x03\x02\x02\x02\u01E0\u099B\x03\x02\x02\x02\u01E2\u09A4\x03\x02" +
		"\x02\x02\u01E4\u09A9\x03\x02\x02\x02\u01E6\u09AF\x03\x02\x02\x02\u01E8" +
		"\u09B9\x03\x02\x02\x02\u01EA\u09BC\x03\x02\x02\x02\u01EC\u09BF\x03\x02" +
		"\x02\x02\u01EE\u09CB\x03\x02\x02\x02\u01F0\u09CD\x03\x02\x02\x02\u01F2" +
		"\u09DB\x03\x02\x02\x02\u01F4\u09E9\x03\x02\x02\x02\u01F6\u09F5\x03\x02" +
		"\x02\x02\u01F8\u09FD\x03\x02\x02\x02\u01FA\u0A0A\x03\x02\x02\x02\u01FC" +
		"\u0A21\x03\x02\x02\x02\u01FE\u0A23\x03\x02\x02\x02\u0200\u0201\t\x02\x02" +
		"\x02\u0201\x03\x03\x02\x02\x02\u0202\u0203\x07\x04\x02\x02\u0203\u0204" +
		"\x05\u01DA\xEE\x02\u0204\x05\x03\x02\x02\x02\u0205\u0207\x05\xEAv\x02" +
		"\u0206\u0208\x05\u01EA\xF6\x02\u0207\u0206\x03\x02\x02\x02\u0207\u0208" +
		"\x03\x02\x02\x02\u0208\u020B\x03\x02\x02\x02\u0209\u020A\x07\x89\x02\x02" +
		"\u020A\u020C\x05\xC2b\x02\u020B\u0209\x03\x02\x02\x02\u020B\u020C\x03" +
		"\x02\x02\x02\u020C\u020D\x03\x02\x02\x02\u020D\u020E\x07\x05\x02\x02\u020E" +
		"\x07\x03\x02\x02\x02\u020F\u0212\x05\xC2b\x02\u0210\u0212\x07>\x02\x02" +
		"\u0211\u020F\x03\x02\x02\x02\u0211\u0210\x03\x02\x02\x02\u0212\t\x03\x02" +
		"\x02\x02\u0213\u0214\x05,\x17\x02\u0214\v\x03\x02\x02\x02\u0215\u0216" +
		"\x05\u0126\x94\x02\u0216\u0217\x07\x8F\x02\x02\u0217\u0218\x05\b\x05\x02" +
		"\u0218\u0219\x07\x90\x02\x02\u0219\u021C\x03\x02\x02\x02\u021A\u021C\x05" +
		"\b\x05\x02\u021B\u0215\x03\x02\x02\x02\u021B\u021A\x03\x02\x02\x02\u021C" +
		"\r\x03\x02\x02\x02\u021D\u021E\t\x03\x02\x02\u021E\x0F\x03\x02\x02\x02" +
		"\u021F\u0220\x07\x8F\x02\x02\u0220\u0225\x05\x98M\x02\u0221\u0222\x07" +
		"\x8D\x02\x02\u0222\u0224\x05\x98M\x02\u0223\u0221\x03\x02\x02\x02\u0224" +
		"\u0227\x03\x02\x02\x02\u0225\u0223\x03\x02\x02\x02\u0225\u0226\x03\x02" +
		"\x02\x02\u0226\u0228\x03\x02\x02\x02\u0227\u0225\x03\x02\x02\x02\u0228" +
		"\u0229\x07\x90\x02\x02\u0229\x11\x03\x02\x02\x02\u022A\u022B\x07\x07\x02" +
		"\x02\u022B\u022E\x05\x14\v\x02\u022C\u022D\x07\x93\x02\x02\u022D\u022F" +
		"\x05\x16\f\x02\u022E\u022C\x03\x02\x02\x02\u022E\u022F\x03\x02\x02\x02" +
		"\u022F\u0230\x03\x02\x02\x02\u0230\u0231\x07+\x02\x02\u0231\u0233\x05" +
		"\u0126\x94\x02\u0232\u0234\x05\u01AA\xD6\x02\u0233\u0232\x03\x02\x02\x02" +
		"\u0233\u0234\x03\x02\x02\x02\u0234\u0235\x03\x02\x02\x02\u0235\u0236\x07" +
		"\x8C\x02\x02\u0236\x13\x03\x02\x02\x02\u0237\u023B\x05\xE8u\x02\u0238" +
		"\u023B\x07\x80\x02\x02\u0239\u023B\x07\x81\x02\x02\u023A\u0237\x03\x02" +
		"\x02\x02\u023A\u0238\x03\x02\x02\x02\u023A\u0239\x03\x02\x02\x02\u023B" +
		"\x15\x03\x02\x02\x02\u023C\u023F\x05\u01C4\xE3\x02\u023D\u023F\x05\u01DA" +
		"\xEE\x02\u023E\u023C\x03\x02\x02\x02\u023E\u023D\x03\x02\x02\x02\u023F" +
		"\x17\x03\x02\x02\x02\u0240\u0243\x076\x02\x02\u0241\u0244\x05\u0170\xB9" +
		"\x02\u0242\u0244\x05\u01DA\xEE\x02\u0243\u0241\x03\x02\x02\x02\u0243\u0242" +
		"\x03\x02\x02\x02\u0244\x19\x03\x02\x02\x02\u0245\u0246\x07\n\x02\x02\u0246" +
		"\u0247\x05\xE8u\x02\u0247\u0248\x07<\x02\x02\u0248\u0249\x05\xE8u\x02" +
		"\u0249\u024A\x07+\x02\x02\u024A\u024B\x05\x1C\x0F\x02\u024B\u024C\x07" +
		"\x0E\x02\x02\u024C\u024D\x05 \x11\x02\u024D\u024F\x07\x1A\x02\x02\u024E" +
		"\u0250\x07\n\x02\x02\u024F\u024E\x03\x02\x02\x02\u024F\u0250\x03\x02\x02" +
		"\x02\u0250\u0252\x03\x02\x02\x02\u0251\u0253\x05\xE8u\x02\u0252\u0251" +
		"\x03\x02\x02\x02\u0252\u0253\x03\x02\x02\x02\u0253\u0254\x03\x02\x02\x02" +
		"\u0254\u0255\x07\x8C\x02\x02\u0255\x1B\x03\x02\x02\x02\u0256\u0258\x05" +
		":\x1E\x02\u0257\u0256\x03\x02\x02\x02\u0258\u025B\x03\x02\x02\x02\u0259" +
		"\u0257\x03\x02\x02\x02\u0259\u025A\x03\x02\x02\x02\u025A\x1D\x03\x02\x02" +
		"\x02\u025B\u0259\x03\x02\x02\x02\u025C\u0272\x05B\"\x02\u025D\u0272\x05" +
		"\u016C\xB7\x02\u025E\u0260\x05\u0112\x8A\x02\u025F\u025E\x03\x02\x02\x02" +
		"\u025F\u0260\x03\x02\x02\x02\u0260\u0261\x03\x02\x02\x02\u0261\u0272\x05" +
		"h5\x02\u0262\u0264\x05\u0112\x8A\x02\u0263\u0262\x03\x02\x02\x02\u0263" +
		"\u0264\x03\x02\x02\x02\u0264\u0265\x03\x02\x02\x02\u0265\u0272\x05d3\x02" +
		"\u0266\u0268\x05\u0112\x8A\x02\u0267\u0266\x03\x02\x02\x02\u0267\u0268" +
		"\x03\x02\x02\x02\u0268\u026A\x03\x02\x02\x02\u0269\u026B\x07D\x02\x02" +
		"\u026A\u0269\x03\x02\x02\x02\u026A\u026B\x03\x02\x02\x02\u026B\u026C\x03" +
		"\x02\x02\x02\u026C\u0272\x05j6\x02\u026D\u0272\x05\\/\x02\u026E\u0272" +
		"\x05\xD4k\x02\u026F\u0272\x05f4\x02\u0270\u0272\x05\u01B8\xDD\x02\u0271" +
		"\u025C\x03\x02\x02\x02\u0271\u025D\x03\x02\x02\x02\u0271\u025F\x03\x02" +
		"\x02\x02\u0271\u0263\x03\x02\x02\x02\u0271\u0267\x03\x02\x02\x02\u0271" +
		"\u026D\x03\x02\x02\x02\u0271\u026E\x03\x02\x02\x02\u0271\u026F\x03\x02" +
		"\x02\x02\u0271\u0270\x03\x02\x02\x02\u0272\x1F\x03\x02\x02\x02\u0273\u0275" +
		"\x05\x1E\x10\x02\u0274\u0273\x03\x02\x02\x02\u0275\u0278\x03\x02\x02\x02" +
		"\u0276\u0274\x03\x02\x02\x02\u0276\u0277\x03\x02\x02\x02\u0277!\x03\x02" +
		"\x02\x02\u0278\u0276\x03\x02\x02\x02\u0279\u027C\x05\u01F2\xFA\x02\u027A" +
		"\u027C\x05\x82B\x02\u027B\u0279\x03\x02\x02\x02\u027B\u027A\x03\x02\x02" +
		"\x02\u027C#\x03\x02\x02\x02\u027D\u0280\x05\u01F0\xF9\x02\u027E\u0280" +
		"\x05\x80A\x02\u027F\u027D\x03\x02\x02\x02\u027F\u027E\x03\x02\x02\x02" +
		"\u0280%\x03\x02\x02\x02\u0281\u0282\x07\f\x02\x02\u0282\u0285\x05l7\x02" +
		"\u0283\u0284\x07Q\x02\x02\u0284\u0286\x05\xC2b\x02\u0285\u0283\x03\x02" +
		"\x02\x02\u0285\u0286\x03\x02\x02\x02\u0286\u0289\x03\x02\x02\x02\u0287" +
		"\u0288\x07V\x02\x02\u0288\u028A\x05\xC2b\x02\u0289\u0287\x03\x02\x02\x02" +
		"\u0289\u028A\x03\x02\x02\x02\u028A\'\x03\x02\x02\x02\u028B\u028D\x05\u0112" +
		"\x8A\x02\u028C\u028B\x03\x02\x02\x02\u028C\u028D\x03\x02\x02\x02\u028D" +
		"\u028E\x03\x02\x02\x02\u028E\u028F\x05&\x14\x02\u028F\u0290\x07\x8C\x02" +
		"\x02\u0290)\x03\x02\x02\x02\u0291\u0292\x05\xD0i\x02\u0292\u0293\x07\x87" +
		"\x02\x02\u0293\u0295\x03\x02\x02\x02\u0294\u0291\x03\x02\x02\x02\u0294" +
		"\u0295\x03\x02\x02\x02\u0295\u0296\x03\x02\x02\x02\u0296\u0297\x05\f\x07" +
		"\x02\u0297+\x03\x02\x02\x02\u0298\u029D\x05*\x16\x02\u0299\u029A\x07\x8D" +
		"\x02\x02\u029A\u029C\x05*\x16\x02\u029B\u0299\x03\x02\x02\x02\u029C\u029F" +
		"\x03\x02\x02\x02\u029D\u029B\x03\x02\x02\x02\u029D\u029E\x03\x02\x02\x02" +
		"\u029E-\x03\x02\x02\x02\u029F\u029D\x03\x02\x02\x02\u02A0\u02A1\x07\r" +
		"\x02\x02\u02A1\u02A2\x05\u0112\x8A\x02\u02A2\u02A3\x05\u0126\x94\x02\u02A3" +
		"\u02A4\x07\x8C\x02\x02\u02A4/\x03\x02\x02\x02\u02A5\u02AD\x05\xE8u\x02" +
		"\u02A6\u02AD\x07J\x02\x02\u02A7\u02AD\x07K\x02\x02\u02A8\u02AD\x07\x05" +
		"\x02\x02\u02A9\u02AD\x07b\x02\x02\u02AA\u02AD\x07O\x02\x02\u02AB\u02AD" +
		"\x07d\x02\x02\u02AC\u02A5\x03\x02\x02\x02\u02AC\u02A6\x03\x02\x02\x02" +
		"\u02AC\u02A7\x03\x02\x02\x02\u02AC\u02A8\x03\x02\x02\x02\u02AC\u02A9\x03" +
		"\x02\x02\x02\u02AC\u02AA\x03\x02\x02\x02\u02AC\u02AB\x03\x02\x02\x02\u02AD" +
		"1\x03\x02\x02\x02\u02AE\u02AF\x07\r\x02\x02\u02AF\u02B0\x050\x19\x02\u02B0" +
		"\u02B1\x07<\x02\x02\u02B1\u02B2\x05\xB4[\x02\u02B2\u02B3\x07+\x02\x02" +
		"\u02B3\u02B4\x05\xC2b\x02\u02B4\u02B5\x07\x8C\x02\x02\u02B53\x03\x02\x02" +
		"\x02\u02B6\u02B7\x05\xE8u\x02\u02B7\u02B8\x07\x8C\x02\x02\u02B85\x03\x02" +
		"\x02\x02\u02B9\u02BA\x07j\x02\x02\u02BA\u02BC\x05\xA0Q\x02\u02BB\u02B9" +
		"\x03\x02\x02\x02\u02BB\u02BC\x03\x02\x02\x02\u02BC\u02BE\x03\x02\x02\x02" +
		"\u02BD\u02BF\x05\xDCo\x02\u02BE\u02BD\x03\x02\x02\x02\u02BE\u02BF\x03" +
		"\x02\x02\x02\u02BF\u02C1\x03\x02\x02\x02\u02C0\u02C2\x05\u0158\xAD\x02" +
		"\u02C1\u02C0\x03\x02\x02\x02\u02C1\u02C2\x03\x02\x02\x02\u02C27\x03\x02" +
		"\x02\x02\u02C3\u02C4\x07 \x02\x02\u02C4\u02C8\x05@!\x02\u02C5\u02C7\x05" +
		"\u01F4\xFB\x02\u02C6\u02C5\x03\x02\x02\x02\u02C7\u02CA\x03\x02\x02\x02" +
		"\u02C8\u02C6\x03\x02\x02\x02\u02C8\u02C9\x03\x02\x02\x02\u02C9\u02CE\x03" +
		"\x02\x02\x02\u02CA\u02C8\x03\x02\x02\x02\u02CB\u02CD\x05z>\x02\u02CC\u02CB" +
		"\x03\x02\x02\x02\u02CD\u02D0\x03\x02\x02\x02\u02CE\u02CC\x03\x02\x02\x02" +
		"\u02CE\u02CF\x03\x02\x02\x02\u02CF\u02D1\x03\x02\x02\x02\u02D0\u02CE\x03" +
		"\x02\x02\x02\u02D1\u02D2\x07\x1A\x02\x02\u02D2\u02D3\x07 \x02\x02\u02D3" +
		"\u02D4\x07\x8C\x02\x02\u02D49\x03\x02\x02\x02\u02D5\u02EC\x05\u01C8\xE5" +
		"\x02\u02D6\u02EC\x05\u01C6\xE4\x02\u02D7\u02EC\x05\u01EC\xF7\x02\u02D8" +
		"\u02EC\x05\u01D8\xED\x02\u02D9\u02EC\x05~@\x02\u02DA\u02EC\x05\u01A4\xD3" +
		"\x02\u02DB\u02EC\x05\u01F8\xFD\x02\u02DC\u02EC\x05\xC6d\x02\u02DD\u02EC" +
		"\x05\x12\n\x02\u02DE\u02EC\x05Z.\x02\u02DF\u02EC\x05.\x18\x02\u02E0\u02EC" +
		"\x052\x1A\x02\u02E1\u02EC\x05|?\x02\u02E2\u02EC\x05\x94K\x02\u02E3\u02EC" +
		"\x05\u01C0\xE1\x02\u02E4\u02EC\x05\u01F4\xFB\x02\u02E5\u02EC\x05\xE4s" +
		"\x02\u02E6\u02EC\x05\xE2r\x02\u02E7\u02EC\x05\u0134\x9B\x02\u02E8\u02EC" +
		"\x05\u01C2\xE2\x02\u02E9\u02EC\x05\u0172\xBA\x02\u02EA\u02EC\x05\u01E4" +
		"\xF3\x02\u02EB\u02D5\x03\x02\x02\x02\u02EB\u02D6\x03\x02\x02\x02\u02EB" +
		"\u02D7\x03\x02\x02\x02\u02EB\u02D8\x03\x02\x02\x02\u02EB\u02D9\x03\x02" +
		"\x02\x02\u02EB\u02DA\x03\x02\x02\x02\u02EB\u02DB\x03\x02\x02\x02\u02EB" +
		"\u02DC\x03\x02\x02\x02\u02EB\u02DD\x03\x02\x02\x02\u02EB\u02DE\x03\x02" +
		"\x02\x02\u02EB\u02DF\x03\x02\x02\x02\u02EB\u02E0\x03\x02\x02\x02\u02EB" +
		"\u02E1\x03\x02\x02\x02\u02EB\u02E2\x03\x02\x02\x02\u02EB\u02E3\x03\x02" +
		"\x02\x02\u02EB\u02E4\x03\x02\x02\x02\u02EB\u02E5\x03\x02\x02\x02\u02EB" +
		"\u02E6\x03\x02\x02\x02\u02EB\u02E7\x03\x02\x02\x02\u02EB\u02E8\x03\x02" +
		"\x02\x02\u02EB\u02E9\x03\x02\x02\x02\u02EB\u02EA\x03\x02\x02\x02\u02EC" +
		";\x03\x02\x02\x02\u02ED\u02EF\x05:\x1E\x02\u02EE\u02ED\x03\x02\x02\x02" +
		"\u02EF\u02F2\x03\x02\x02\x02\u02F0\u02EE\x03\x02\x02\x02\u02F0\u02F1\x03" +
		"\x02\x02\x02\u02F1=\x03\x02\x02\x02\u02F2\u02F0\x03\x02\x02\x02\u02F3" +
		"\u02F7\x05\xD8m\x02\u02F4\u02F5\x05\xDCo\x02\u02F5\u02F6\x07\x8C\x02\x02" +
		"\u02F6\u02F8\x03\x02\x02\x02\u02F7\u02F4\x03\x02\x02\x02\u02F7\u02F8\x03" +
		"\x02\x02\x02\u02F8\u02FA\x03\x02\x02\x02\u02F9\u02F3\x03\x02\x02\x02\u02F9" +
		"\u02FA\x03\x02\x02\x02\u02FA\u0301\x03\x02\x02\x02\u02FB\u02FF\x05\u0154" +
		"\xAB\x02\u02FC\u02FD\x05\u0158\xAD\x02\u02FD\u02FE\x07\x8C\x02\x02\u02FE" +
		"\u0300\x03\x02\x02\x02\u02FF\u02FC\x03\x02\x02\x02\u02FF\u0300\x03\x02" +
		"\x02\x02\u0300\u0302\x03\x02\x02\x02\u0301\u02FB\x03\x02\x02\x02\u0301" +
		"\u0302\x03\x02\x02\x02\u0302?\x03\x02\x02\x02\u0303\u0308\x05\xE8u\x02" +
		"\u0304\u0305\x07\x8F\x02\x02\u0305\u0306\x05\xF0y\x02\u0306\u0307\x07" +
		"\x90\x02\x02\u0307\u0309\x03\x02\x02\x02\u0308\u0304\x03\x02\x02\x02\u0308" +
		"\u0309\x03\x02\x02\x02\u0309\u030C\x03\x02\x02\x02\u030A\u030C\x05\u0126" +
		"\x94\x02\u030B\u0303\x03\x02\x02\x02\u030B\u030A\x03\x02\x02\x02\u030C" +
		"A\x03\x02\x02\x02\u030D\u030E\x05\u0112\x8A\x02\u030E\u0313\x07\x0F\x02" +
		"\x02\u030F\u0310\x07\x8F\x02\x02\u0310\u0311\x05\xC2b\x02\u0311\u0312" +
		"\x07\x90\x02\x02\u0312\u0314\x03\x02\x02\x02\u0313\u030F\x03\x02\x02\x02" +
		"\u0313\u0314\x03\x02\x02\x02\u0314\u0316\x03\x02\x02\x02\u0315\u0317\x07" +
		"+\x02\x02\u0316\u0315\x03\x02\x02\x02\u0316\u0317\x03\x02\x02\x02\u0317" +
		"\u0318\x03\x02\x02\x02\u0318\u0319\x05> \x02\u0319\u031A\x05<\x1F\x02" +
		"\u031A\u031B\x07\x0E\x02\x02\u031B\u031C\x05D#\x02\u031C\u031D\x07\x1A" +
		"\x02\x02\u031D\u031F\x07\x0F\x02\x02\u031E\u0320\x05\xE8u\x02\u031F\u031E" +
		"\x03\x02\x02\x02\u031F\u0320\x03\x02\x02\x02\u0320\u0321\x03\x02\x02\x02" +
		"\u0321\u0322\x07\x8C\x02\x02\u0322C\x03\x02\x02\x02\u0323\u0325\x05\x1E" +
		"\x10\x02\u0324\u0323\x03\x02\x02\x02\u0325\u0328\x03\x02\x02\x02\u0326" +
		"\u0324\x03\x02\x02\x02\u0326\u0327\x03\x02\x02\x02\u0327E\x03\x02\x02" +
		"\x02\u0328\u0326\x03\x02\x02\x02\u0329\u032B\x07I\x02\x02\u032A";
	private static readonly _serializedATNSegment2: string =
		"\u032C\x05\x06\x04\x02\u032B\u032A\x03\x02\x02\x02\u032B\u032C\x03\x02" +
		"\x02\x02\u032C\u032E\x03\x02\x02\x02\u032D\u032F\x05\u01E6\xF4\x02\u032E" +
		"\u032D\x03\x02\x02\x02\u032E\u032F\x03\x02\x02\x02\u032F\u0330\x03\x02" +
		"\x02\x02\u0330\u0331\x05\u01E2\xF2\x02\u0331\u0332\x07\x8C\x02\x02\u0332" +
		"G\x03\x02\x02\x02\u0333\u0335\x05L\'\x02\u0334\u0333\x03\x02\x02\x02\u0334" +
		"\u0335\x03\x02\x02\x02\u0335\u0336\x03\x02\x02\x02\u0336\u0337\x05\u0126" +
		"\x94\x02\u0337\u0338\x07\x87\x02\x02\u0338\u0339\x05\xC2b\x02\u0339I\x03" +
		"\x02\x02\x02\u033A\u033F\x05H%\x02\u033B\u033C\x07\x8D\x02\x02\u033C\u033E" +
		"\x05H%\x02\u033D\u033B\x03\x02\x02\x02\u033E\u0341\x03\x02\x02\x02\u033F" +
		"\u033D\x03\x02\x02\x02\u033F\u0340\x03\x02\x02\x02\u0340K\x03\x02\x02" +
		"\x02\u0341\u033F\x03\x02\x02\x02\u0342\u0343\x07 \x02\x02\u0343\u0344" +
		"\x05\u0126\x94\x02\u0344\u0345\x07j\x02\x02\u0345M\x03\x02\x02\x02\u0346" +
		"\u0348\x05\u0112\x8A\x02\u0347\u0346\x03\x02\x02\x02\u0347\u0348\x03\x02" +
		"\x02\x02\u0348\u0349\x03\x02\x02\x02\u0349\u034B\x07\x11\x02\x02\u034A" +
		"\u034C\x05J&\x02\u034B\u034A\x03\x02\x02\x02\u034B\u034C\x03\x02\x02\x02" +
		"\u034C\u034F\x03\x02\x02\x02\u034D\u034E\x07n\x02\x02\u034E\u0350\x05" +
		"l7\x02\u034F\u034D\x03\x02\x02\x02\u034F\u0350\x03\x02\x02\x02\u0350\u0351" +
		"\x03\x02\x02\x02\u0351\u0352\x07\x8C\x02\x02\u0352O\x03\x02\x02\x02\u0353" +
		"\u0355\x05\u0112\x8A\x02\u0354\u0353\x03\x02\x02\x02\u0354\u0355\x03\x02" +
		"\x02\x02\u0355\u0356\x03\x02\x02\x02\u0356\u0357\x07\x14\x02\x02\u0357" +
		"\u0358\x05\xC2b\x02\u0358\u035A\x07+\x02\x02\u0359\u035B\x05R*\x02\u035A" +
		"\u0359\x03\x02\x02\x02\u035B\u035C\x03\x02\x02\x02\u035C\u035A\x03\x02" +
		"\x02\x02\u035C\u035D\x03\x02\x02\x02\u035D\u035E\x03\x02\x02\x02\u035E" +
		"\u035F\x07\x1A\x02\x02\u035F\u0361\x07\x14\x02\x02\u0360\u0362\x05\xE8" +
		"u\x02\u0361\u0360\x03\x02\x02\x02\u0361\u0362\x03\x02\x02\x02\u0362\u0363" +
		"\x03\x02\x02\x02\u0363\u0364\x07\x8C\x02\x02\u0364Q\x03\x02\x02\x02\u0365" +
		"\u0366\x07n\x02\x02\u0366\u0367\x05V,\x02\u0367\u0368\x07\x87\x02\x02" +
		"\u0368\u0369\x05\u019A\xCE\x02\u0369S\x03\x02\x02\x02\u036A\u036F\x05" +
		"\xE8u\x02\u036B\u036F\x05\x96L\x02\u036C\u036F\x05\u01AC\xD7\x02\u036D" +
		"\u036F\x07@\x02\x02\u036E\u036A\x03\x02\x02\x02\u036E\u036B\x03\x02\x02" +
		"\x02\u036E\u036C\x03\x02\x02\x02\u036E\u036D\x03\x02\x02\x02\u036FU\x03" +
		"\x02\x02\x02\u0370\u0375\x05T+\x02\u0371\u0372\x07\x9B\x02\x02\u0372\u0374" +
		"\x05T+\x02\u0373\u0371\x03\x02\x02\x02\u0374\u0377\x03\x02\x02\x02\u0375" +
		"\u0373\x03\x02\x02\x02\u0375\u0376\x03\x02\x02\x02\u0376W\x03\x02\x02" +
		"\x02\u0377\u0375\x03\x02\x02\x02\u0378\u0379\x07 \x02\x02\u0379\u037D" +
		"\x05^0\x02\u037A\u037B\x056\x1C\x02\u037B\u037C\x07\x8C\x02\x02\u037C" +
		"\u037E\x03\x02\x02\x02\u037D\u037A\x03\x02\x02\x02\u037D\u037E\x03\x02" +
		"\x02\x02\u037E\u0380\x03\x02\x02\x02\u037F\u0381\x058\x1D\x02\u0380\u037F" +
		"\x03\x02\x02\x02\u0380\u0381\x03\x02\x02\x02\u0381\u0382\x03\x02\x02\x02" +
		"\u0382\u0383\x07\x1A\x02\x02\u0383\u0384\x07 \x02\x02\u0384\u0385\x07" +
		"\x8C\x02\x02\u0385Y\x03\x02\x02\x02\u0386\u0387\x07\x15\x02\x02\u0387" +
		"\u0389\x05\xE8u\x02\u0388\u038A\x07+\x02\x02\u0389\u0388\x03\x02\x02\x02" +
		"\u0389\u038A\x03\x02\x02\x02\u038A\u038C\x03\x02\x02\x02\u038B\u038D\x05" +
		"\xD8m\x02\u038C\u038B\x03\x02\x02\x02\u038C\u038D\x03\x02\x02\x02\u038D" +
		"\u038F\x03\x02\x02\x02\u038E\u0390\x05\u0154\xAB\x02\u038F\u038E\x03\x02" +
		"\x02\x02\u038F\u0390\x03\x02\x02\x02\u0390\u0391\x03\x02\x02\x02\u0391" +
		"\u0392\x07\x1A\x02\x02\u0392\u0394\x07\x15\x02\x02\u0393\u0395\x05\xE8" +
		"u\x02\u0394\u0393\x03\x02\x02\x02\u0394\u0395\x03\x02\x02\x02\u0395\u0396" +
		"\x03\x02\x02\x02\u0396\u0397\x07\x8C\x02\x02\u0397[\x03\x02\x02\x02\u0398" +
		"\u0399\x05\u0112\x8A\x02\u0399\u039B\x05\xF4{\x02\u039A\u039C\x05\xDC" +
		"o\x02\u039B\u039A\x03\x02\x02\x02\u039B\u039C\x03\x02\x02\x02\u039C\u039E" +
		"\x03\x02\x02\x02\u039D\u039F\x05\u0158\xAD\x02\u039E\u039D\x03\x02\x02" +
		"\x02\u039E\u039F\x03\x02\x02\x02\u039F\u03A0\x03\x02\x02\x02\u03A0\u03A1" +
		"\x07\x8C\x02\x02\u03A1]\x03\x02\x02\x02\u03A2\u03A3\x05\xF6|\x02\u03A3" +
		"\u03A4\x07\x93\x02\x02\u03A4\u03A5\x05\u0126\x94\x02\u03A5_\x03\x02\x02" +
		"\x02\u03A6\u03A9\x05\"\x12\x02\u03A7\u03A9\x05\u017E\xC0\x02\u03A8\u03A6" +
		"\x03\x02\x02\x02\u03A8\u03A7\x03\x02\x02\x02\u03A9a\x03\x02\x02\x02\u03AA" +
		"\u03AD\x05$\x13\x02\u03AB\u03AD\x05\u0180\xC1\x02\u03AC\u03AA\x03\x02" +
		"\x02\x02\u03AC\u03AB\x03\x02\x02\x02\u03ADc\x03\x02\x02\x02\u03AE\u03B0" +
		"\x05\u0112\x8A\x02\u03AF\u03AE\x03\x02\x02\x02\u03AF\u03B0\x03\x02\x02" +
		"\x02\u03B0\u03B2\x03\x02\x02\x02\u03B1\u03B3\x07D\x02\x02\u03B2\u03B1" +
		"\x03\x02\x02\x02\u03B2\u03B3\x03\x02\x02\x02\u03B3\u03B4\x03\x02\x02\x02" +
		"\u03B4\u03B5\x05&\x14\x02\u03B5\u03B6\x07\x8C\x02\x02\u03B6e\x03\x02\x02" +
		"\x02\u03B7\u03B9\x05\u0112\x8A\x02\u03B8\u03B7\x03\x02\x02\x02\u03B8\u03B9" +
		"\x03\x02\x02\x02\u03B9\u03BA\x03\x02\x02\x02\u03BA\u03BC\x07\x11\x02\x02" +
		"\u03BB\u03BD\x05J&\x02\u03BC\u03BB\x03\x02\x02\x02\u03BC\u03BD\x03\x02" +
		"\x02\x02\u03BD\u03BF\x03\x02\x02\x02\u03BE\u03C0\x05\u0196\xCC\x02\u03BF" +
		"\u03BE\x03\x02\x02\x02\u03BF\u03C0\x03\x02\x02\x02\u03C0\u03C3\x03\x02" +
		"\x02\x02\u03C1\u03C2\x07n\x02\x02\u03C2\u03C4\x05l7\x02\u03C3\u03C1\x03" +
		"\x02\x02\x02\u03C3\u03C4\x03\x02\x02\x02\u03C4\u03C5\x03\x02\x02\x02\u03C5" +
		"\u03C6\x07\x8C\x02\x02\u03C6g\x03\x02\x02\x02\u03C7\u03C9\x05\u0112\x8A" +
		"\x02\u03C8\u03C7\x03\x02\x02\x02\u03C8\u03C9\x03\x02\x02\x02\u03C9\u03CB" +
		"\x03\x02\x02\x02\u03CA\u03CC\x07D\x02\x02\u03CB\u03CA\x03\x02\x02\x02" +
		"\u03CB\u03CC\x03\x02\x02\x02\u03CC\u03CD\x03\x02\x02\x02\u03CD\u03CE\x05" +
		"\u0164\xB3\x02\u03CE\u03CF\x07\x8C\x02\x02\u03CFi\x03\x02\x02\x02\u03D0" +
		"\u03D2\x05\u0112\x8A\x02\u03D1\u03D0\x03\x02\x02\x02\u03D1\u03D2\x03\x02" +
		"\x02\x02\u03D2\u03D4\x03\x02\x02\x02\u03D3\u03D5\x07D\x02\x02\u03D4\u03D3" +
		"\x03\x02\x02\x02\u03D4\u03D5\x03\x02\x02\x02\u03D5\u03D8\x03\x02\x02\x02" +
		"\u03D6\u03D9\x05p9\x02\u03D7\u03D9\x05\u0192\xCA\x02\u03D8\u03D6\x03\x02" +
		"\x02\x02\u03D8\u03D7\x03\x02\x02\x02\u03D9k\x03\x02\x02\x02\u03DA\u03DB" +
		"\x05\xC2b\x02\u03DBm\x03\x02\x02\x02\u03DC\u03DD\x07i\x02\x02\u03DD\u03DE" +
		"\x05l7\x02\u03DEo\x03\x02\x02\x02\u03DF\u03E0\x05\u01DE\xF0\x02\u03E0" +
		"\u03E1\x07\x85\x02\x02\u03E1\u03E2\x05\u0140\xA1\x02\u03E2\u03E3\x05r" +
		":\x02\u03E3\u03E4\x07\x8C\x02\x02\u03E4q\x03\x02\x02\x02\u03E5\u03EC\x05" +
		"\u01FC\xFF\x02\u03E6\u03E7\x07n\x02\x02\u03E7\u03EA\x05l7\x02\u03E8\u03E9" +
		"\x07\x1C\x02\x02\u03E9\u03EB\x05r:\x02\u03EA\u03E8\x03\x02\x02\x02\u03EA" +
		"\u03EB\x03\x02\x02\x02\u03EB\u03ED\x03\x02\x02\x02\u03EC\u03E6\x03\x02" +
		"\x02\x02\u03EC\u03ED\x03\x02\x02\x02\u03EDs\x03\x02\x02\x02\u03EE\u03EF" +
		"\x07\x16\x02\x02\u03EF\u03F0\x05\xE8u\x02\u03F0\u03F1\x07<\x02\x02\u03F1" +
		"\u03F2\x05\u0126\x94\x02\u03F2\u03F3\x07+\x02\x02\u03F3\u03F4\x05x=\x02" +
		"\u03F4\u03F5\x058\x1D\x02\u03F5\u03F7\x07\x1A\x02\x02\u03F6\u03F8\x07" +
		"\x16\x02\x02\u03F7\u03F6\x03\x02\x02\x02\u03F7\u03F8\x03\x02\x02\x02\u03F8" +
		"\u03FA\x03\x02\x02\x02\u03F9\u03FB\x05\xE8u\x02\u03FA\u03F9\x03\x02\x02" +
		"\x02\u03FA\u03FB\x03\x02\x02\x02\u03FB\u03FC\x03\x02\x02\x02\u03FC\u03FD" +
		"\x07\x8C\x02\x02\u03FDu\x03\x02\x02\x02\u03FE\u0402\x05\u01F4\xFB\x02" +
		"\u03FF\u0402\x052\x1A\x02\u0400\u0402\x05\xE2r\x02\u0401\u03FE\x03\x02" +
		"\x02\x02\u0401\u03FF\x03\x02\x02\x02\u0401\u0400\x03\x02\x02\x02\u0402" +
		"w\x03\x02\x02\x02\u0403\u0405\x05v<\x02\u0404\u0403\x03\x02\x02\x02\u0405" +
		"\u0408\x03\x02\x02\x02\u0406\u0404\x03\x02\x02\x02\u0406\u0407\x03\x02" +
		"\x02\x02\u0407y\x03\x02\x02\x02\u0408\u0406\x03\x02\x02\x02\u0409\u040C" +
		"\x058\x1D\x02\u040A\u040C\x05X-\x02\u040B\u0409\x03\x02\x02\x02\u040B" +
		"\u040A\x03\x02\x02\x02\u040C{\x03\x02\x02\x02\u040D\u040E\x07 \x02\x02" +
		"\u040E\u040F\x05^0\x02\u040F\u0410\x056\x1C\x02\u0410\u0411\x07\x8C\x02" +
		"\x02\u0411}\x03\x02\x02\x02\u0412\u0413\x07\x17\x02\x02\u0413\u0414\x05" +
		"\xEAv\x02\u0414\u0415\x07\x93\x02\x02\u0415\u0418\x05\u01DA\xEE\x02\u0416" +
		"\u0417\x07\x89\x02\x02\u0417\u0419\x05\xC2b\x02\u0418\u0416\x03\x02\x02" +
		"\x02\u0418\u0419\x03\x02\x02\x02\u0419\u041A\x03\x02\x02\x02\u041A\u041B" +
		"\x07\x8C\x02\x02\u041B\x7F\x03\x02\x02\x02\u041C\u041D\x07\v\x02\x02\u041D" +
		"\u041E\x05\xEEx\x02\u041E\u041F\x07<\x02\x02\u041F\u0420\x05\u01DA\xEE" +
		"\x02\u0420\x81\x03\x02\x02\x02\u0421\u0422\x07\v\x02\x02\u0422\u0423\x05" +
		"\xEEx\x02\u0423\u0424\x07<\x02\x02\u0424\u0425\x05\u01C4\xE3\x02\u0425" +
		"\x83\x03\x02\x02\x02\u0426\u0429\x05\u017C\xBF\x02\u0427\u0429\x05\xEE" +
		"x\x02\u0428\u0426\x03\x02\x02\x02\u0428\u0427\x03\x02\x02\x02\u0429\x85" +
		"\x03\x02\x02\x02\u042A\u042C\x05\x88E\x02\u042B\u042A\x03\x02\x02\x02" +
		"\u042C\u042F\x03\x02\x02\x02\u042D\u042B\x03\x02\x02\x02\u042D\u042E\x03" +
		"\x02\x02\x02\u042E\x87\x03\x02\x02\x02\u042F\u042D\x03\x02\x02\x02\u0430" +
		"\u0433\x05\u0114\x8B\x02\u0431\u0433\x05\u01F4\xFB\x02\u0432\u0430\x03" +
		"\x02\x02\x02\u0432\u0431\x03\x02\x02\x02\u0433\x89\x03\x02\x02\x02\u0434" +
		"\u043B\x07e\x02\x02\u0435\u0436\x07L\x02\x02\u0436\u0438\x05\xC2b\x02" +
		"\u0437\u0435\x03\x02\x02\x02\u0437\u0438\x03\x02\x02\x02\u0438\u0439\x03" +
		"\x02\x02\x02\u0439\u043B\x07)\x02\x02\u043A\u0434\x03\x02\x02\x02\u043A" +
		"\u0437\x03\x02\x02\x02\u043B\x8B\x03\x02\x02\x02\u043C\u043E\x05\x8EH" +
		"\x02\u043D\u043C\x03\x02\x02\x02\u043E\u0441\x03\x02\x02\x02\u043F\u043D" +
		"\x03\x02\x02\x02\u043F\u0440\x03\x02\x02\x02\u0440\u0442\x03\x02\x02\x02" +
		"\u0441\u043F\x03\x02\x02\x02\u0442\u0443\x07\x02\x02\x03\u0443\x8D\x03" +
		"\x02\x02\x02\u0444\u0445\x05\x86D\x02\u0445\u0446\x05\u0116\x8C\x02\u0446" +
		"\x8F\x03\x02\x02\x02\u0447\u044A\x05\xE8u\x02\u0448\u044A\x07\x81\x02" +
		"\x02\u0449\u0447\x03\x02\x02\x02\u0449\u0448\x03\x02\x02\x02\u044A\x91" +
		"\x03\x02\x02\x02\u044B\u044C\t\x04\x02\x02\u044C\x93\x03\x02\x02\x02\u044D" +
		"\u044E\x07\x18\x02\x02\u044E\u044F\x05\xE6t\x02\u044F\u0450\x07\x06\x02" +
		"\x02\u0450\u0451\x05\xC2b\x02\u0451\u0452\x07\x8C\x02\x02\u0452\x95\x03" +
		"\x02\x02\x02\u0453\u0456\x05\u0178\xBD\x02\u0454\u0456\x05\u01DA\xEE\x02" +
		"\u0455\u0453\x03\x02\x02\x02\u0455\u0454\x03\x02\x02\x02\u0456\x97\x03" +
		"\x02\x02\x02\u0457\u0458\x05V,\x02\u0458\u0459\x07\x87\x02\x02\u0459\u045B" +
		"\x03\x02\x02\x02\u045A\u0457\x03\x02\x02\x02\u045A\u045B\x03\x02\x02\x02" +
		"\u045B\u045C\x03\x02\x02\x02\u045C\u045D\x05\xC2b\x02\u045D\x99\x03\x02" +
		"\x02\x02\u045E\u045F\x05\xEAv\x02\u045F\u0460\x07\x93\x02\x02\u0460\u0461" +
		"\x05\x9EP\x02\u0461\u0462\x07\x8C\x02\x02\u0462\x9B\x03\x02\x02\x02\u0463" +
		"\u0464\x05\u01C4\xE3\x02\u0464\x9D\x03\x02\x02\x02\u0465\u0466\x05\u01DA" +
		"\xEE\x02\u0466\x9F\x03\x02\x02\x02\u0467\u0468\x07\x1B\x02\x02\u0468\u046D" +
		"\x05\u0126\x94\x02\u0469\u046A\x07\x8F\x02\x02\u046A\u046B\x05\xE8u\x02" +
		"\u046B\u046C\x07\x90\x02\x02\u046C\u046E\x03\x02\x02\x02\u046D\u0469\x03" +
		"\x02\x02\x02\u046D\u046E\x03\x02\x02\x02\u046E\u0473\x03\x02\x02\x02\u046F" +
		"\u0470\x07\x16\x02\x02\u0470\u0473\x05\u0126\x94\x02\u0471\u0473\x07>" +
		"\x02\x02\u0472\u0467\x03\x02\x02\x02\u0472\u046F\x03\x02\x02\x02\u0472" +
		"\u0471\x03\x02\x02\x02\u0473\xA1\x03\x02\x02\x02\u0474\u0475\t\x05\x02" +
		"\x02\u0475\xA3\x03\x02\x02\x02\u0476\u0478\x05\xA2R\x02\u0477\u0479\x07" +
		"\x8A\x02\x02\u0478\u0477\x03\x02\x02\x02\u0478\u0479\x03\x02\x02\x02\u0479" +
		"\xA5\x03\x02\x02\x02\u047A\u047F\x05\xA4S\x02\u047B\u047C\x07\x8D\x02" +
		"\x02\u047C\u047E\x05\xA4S\x02\u047D\u047B\x03\x02\x02\x02\u047E\u0481" +
		"\x03\x02\x02\x02\u047F\u047D\x03\x02\x02\x02\u047F\u0480\x03\x02\x02\x02" +
		"\u0480\xA7\x03\x02\x02\x02\u0481\u047F\x03\x02\x02\x02\u0482\u0483\x07" +
		"\x1B\x02\x02\u0483\u0484\x05\xE8u\x02\u0484\u0485\x07+\x02\x02\u0485\u0486" +
		"\x05\xB0Y\x02\u0486\u0489\x05\xACW\x02\u0487\u0488\x07\x0E\x02\x02\u0488" +
		"\u048A\x05\xB8]\x02\u0489\u0487\x03\x02\x02\x02\u0489\u048A\x03\x02\x02" +
		"\x02\u048A\u048B\x03\x02\x02\x02\u048B\u048D\x07\x1A\x02\x02\u048C\u048E" +
		"\x07\x1B\x02\x02\u048D\u048C\x03\x02\x02\x02\u048D\u048E\x03\x02\x02\x02" +
		"\u048E\u0490\x03\x02\x02\x02\u048F\u0491\x05\xE8u\x02\u0490\u048F\x03" +
		"\x02\x02\x02\u0490\u0491\x03\x02\x02\x02\u0491\u0492\x03\x02\x02\x02\u0492" +
		"\u0493\x07\x8C\x02\x02\u0493\xA9\x03\x02\x02\x02\u0494\u04A9\x05\u01C8" +
		"\xE5\x02\u0495\u04A9\x05\u01C6\xE4\x02\u0496\u04A9\x05\u01EC\xF7\x02\u0497" +
		"\u04A9\x05\u01D8\xED\x02\u0498\u04A9\x05~@\x02\u0499\u04A9\x05\u01A4\xD3" +
		"\x02\u049A\u04A9\x05\u01F8\xFD\x02\u049B\u04A9\x05\xC6d\x02\u049C\u04A9" +
		"\x05\x12\n\x02\u049D\u04A9\x05.\x18\x02\u049E\u04A9\x052\x1A\x02\u049F" +
		"\u04A9\x05\x94K\x02\u04A0\u04A9\x05\u01C0\xE1\x02\u04A1\u04A9\x05\u01F4" +
		"\xFB\x02\u04A2\u04A9\x05\xE4s\x02\u04A3\u04A9\x05\xE2r\x02\u04A4\u04A9" +
		"\x05\u0134\x9B\x02\u04A5\u04A9\x05\u01C2\xE2\x02\u04A6\u04A9\x05\u0172" +
		"\xBA\x02\u04A7\u04A9\x05\u01E4\xF3\x02\u04A8\u0494\x03\x02\x02\x02\u04A8" +
		"\u0495\x03\x02\x02\x02\u04A8\u0496\x03\x02\x02\x02\u04A8\u0497\x03\x02" +
		"\x02\x02\u04A8\u0498\x03\x02\x02\x02\u04A8\u0499\x03\x02\x02\x02\u04A8" +
		"\u049A\x03\x02\x02\x02\u04A8\u049B\x03\x02\x02\x02\u04A8\u049C\x03\x02" +
		"\x02\x02\u04A8\u049D\x03\x02\x02\x02\u04A8\u049E\x03\x02\x02\x02\u04A8" +
		"\u049F\x03\x02\x02\x02\u04A8\u04A0\x03\x02\x02\x02\u04A8\u04A1\x03\x02" +
		"\x02\x02\u04A8\u04A2\x03\x02\x02\x02\u04A8\u04A3\x03\x02\x02\x02\u04A8" +
		"\u04A4\x03\x02\x02\x02\u04A8\u04A5\x03\x02\x02\x02\u04A8\u04A6\x03\x02" +
		"\x02\x02\u04A8\u04A7\x03\x02\x02\x02\u04A9\xAB\x03\x02\x02\x02\u04AA\u04AC" +
		"\x05\xAAV\x02\u04AB\u04AA\x03\x02\x02\x02\u04AC\u04AF\x03\x02\x02\x02" +
		"\u04AD\u04AB\x03\x02\x02\x02\u04AD\u04AE\x03\x02\x02\x02\u04AE\xAD\x03" +
		"\x02\x02\x02\u04AF\u04AD\x03\x02\x02\x02\u04B0\u04B2\x05\xBA^\x02\u04B1" +
		"\u04B3\x05\u01AA\xD6\x02\u04B2\u04B1\x03\x02\x02\x02\u04B2\u04B3\x03\x02" +
		"\x02\x02\u04B3\xAF\x03\x02\x02\x02\u04B4\u04B6\x05\xD8m\x02\u04B5\u04B4" +
		"\x03\x02\x02\x02\u04B5\u04B6\x03\x02\x02\x02\u04B6\u04B8\x03\x02\x02\x02" +
		"\u04B7\u04B9\x05\u0154\xAB\x02\u04B8\u04B7\x03\x02\x02\x02\u04B8\u04B9" +
		"\x03\x02\x02\x02\u04B9\xB1\x03\x02\x02\x02\u04BA\u04BF\x05\xAEX\x02\u04BB" +
		"\u04BC\x07\x8D\x02\x02\u04BC\u04BE\x05\xAEX\x02\u04BD\u04BB\x03\x02\x02" +
		"\x02\u04BE\u04C1\x03\x02\x02\x02\u04BF\u04BD\x03\x02\x02\x02\u04BF\u04C0" +
		"\x03\x02\x02\x02\u04C0\u04C5\x03\x02\x02\x02\u04C1\u04BF\x03\x02\x02\x02" +
		"\u04C2\u04C5\x07@\x02\x02\u04C3\u04C5\x07\b\x02\x02\u04C4\u04BA\x03\x02" +
		"\x02\x02\u04C4\u04C2\x03\x02\x02\x02\u04C4\u04C3\x03\x02\x02\x02\u04C5" +
		"\xB3\x03\x02\x02\x02\u04C6\u04C7\x05\xB2Z\x02\u04C7\u04C8\x07\x93\x02" +
		"\x02\u04C8\u04C9\x05\xA2R\x02\u04C9\xB5\x03\x02\x02\x02\u04CA\u04CE\x05" +
		"d3\x02\u04CB\u04CE\x05\u016C\xB7\x02\u04CC\u04CE\x05h5\x02\u04CD\u04CA" +
		"\x03\x02\x02\x02\u04CD\u04CB\x03\x02\x02\x02\u04CD\u04CC\x03\x02\x02\x02" +
		"\u04CE\xB7\x03\x02\x02\x02\u04CF\u04D1\x05\xB6\\\x02\u04D0\u04CF\x03\x02" +
		"\x02\x02\u04D1\u04D4\x03\x02\x02\x02\u04D2\u04D0\x03\x02\x02\x02\u04D2" +
		"\u04D3\x03\x02\x02\x02\u04D3\xB9\x03\x02\x02\x02\u04D4\u04D2\x03\x02\x02" +
		"\x02\u04D5\u04D9\x05\xE8u\x02\u04D6\u04D9\x07\x80\x02\x02\u04D7\u04D9" +
		"\x07\x81\x02\x02\u04D8\u04D5\x03\x02\x02\x02\u04D8\u04D6\x03\x02\x02\x02" +
		"\u04D8\u04D7\x03\x02\x02\x02\u04D9\xBB\x03\x02\x02\x02\u04DA\u04DD\x05" +
		"\xE8u\x02\u04DB\u04DD\x07\x80\x02\x02\u04DC\u04DA\x03\x02\x02\x02\u04DC" +
		"\u04DB\x03\x02\x02\x02\u04DD\xBD\x03\x02\x02\x02\u04DE\u04DF\x07\x8F\x02" +
		"\x02\u04DF\u04E4\x05\xBC_\x02\u04E0\u04E1\x07\x8D\x02\x02\u04E1\u04E3" +
		"\x05\xBC_\x02\u04E2\u04E0\x03\x02\x02\x02\u04E3\u04E6\x03\x02\x02\x02" +
		"\u04E4\u04E2\x03\x02\x02\x02\u04E4\u04E5\x03\x02\x02\x02\u04E5\u04E7\x03" +
		"\x02\x02\x02\u04E6\u04E4\x03\x02\x02\x02\u04E7\u04E8\x07\x90\x02\x02\u04E8" +
		"\xBF\x03\x02\x02\x02\u04E9\u04EB\x05\u0112\x8A\x02\u04EA\u04E9\x03\x02" +
		"\x02\x02\u04EA\u04EB\x03\x02\x02\x02\u04EB\u04EC\x03\x02\x02\x02\u04EC" +
		"\u04EE\x07\x1E\x02\x02\u04ED\u04EF\x05\xE8u\x02\u04EE\u04ED\x03\x02\x02" +
		"\x02\u04EE\u04EF\x03\x02\x02\x02\u04EF\u04F2\x03\x02\x02\x02\u04F0\u04F1" +
		"\x07n\x02\x02\u04F1\u04F3\x05l7\x02\u04F2\u04F0\x03\x02\x02\x02\u04F2" +
		"\u04F3\x03\x02\x02\x02\u04F3\u04F4\x03\x02\x02\x02\u04F4\u04F5\x07\x8C" +
		"\x02\x02\u04F5\xC1\x03\x02\x02\x02\u04F6\u04FC\x05\u0182\xC2\x02\u04F7" +
		"\u04F8\x05\u011E\x90\x02\u04F8\u04F9\x05\u0182\xC2\x02\u04F9\u04FB\x03" +
		"\x02\x02\x02\u04FA\u04F7\x03\x02\x02\x02\u04FB\u04FE\x03\x02\x02\x02\u04FC" +
		"\u04FA\x03\x02\x02\x02\u04FC\u04FD\x03\x02\x02\x02\u04FD\xC3\x03\x02\x02" +
		"\x02\u04FE\u04FC\x03\x02\x02\x02\u04FF\u0502\x05\u015A\xAE\x02\u0500\u0501" +
		"\x07\x83\x02\x02\u0501\u0503\x05\u015A\xAE\x02\u0502\u0500\x03\x02\x02" +
		"\x02\u0502\u0503\x03\x02\x02\x02\u0503\u0509\x03\x02\x02\x02\u0504\u0505" +
		"\x07\x03\x02\x02\u0505\u0509\x05\u015A\xAE\x02\u0506\u0507\x07:\x02\x02" +
		"\u0507\u0509\x05\u015A\xAE\x02\u0508\u04FF\x03\x02\x02\x02\u0508\u0504" +
		"\x03\x02\x02\x02\u0508\u0506\x03\x02\x02\x02\u0509\xC5\x03\x02\x02\x02" +
		"\u050A\u050B\x07\x1F\x02\x02\u050B\u050C\x05\xEAv\x02\u050C\u050D\x07" +
		"\x93\x02\x02\u050D\u050F\x05\u01DA\xEE\x02\u050E\u0510\x05\xCAf\x02\u050F" +
		"\u050E\x03\x02\x02\x02\u050F\u0510\x03\x02\x02\x02\u0510\u0511\x03\x02" +
		"\x02\x02\u0511\u0512\x07\x8C\x02\x02\u0512\xC7\x03\x02\x02\x02\u0513\u0514" +
		"\x05\xC2b\x02\u0514\xC9\x03\x02\x02\x02\u0515\u0516\x07>\x02\x02\u0516" +
		"\u0518\x05\xC2b\x02\u0517\u0515\x03\x02\x02\x02\u0517\u0518\x03\x02\x02" +
		"\x02\u0518\u0519\x03\x02\x02\x02\u0519\u051A\x07+\x02\x02\u051A\u051B" +
		"\x05\xC8e\x02\u051B\xCB\x03\x02\x02\x02\u051C\u051D\x07\x1F\x02\x02\u051D" +
		"\u051E\x07<\x02\x02\u051E\u051F\x05\u01DA\xEE\x02\u051F\xCD\x03\x02\x02" +
		"\x02\u0520\u0521\x05\u0104\x83\x02\u0521\xCF\x03\x02\x02\x02\u0522\u0529" +
		"\x05\xE8u\x02\u0523\u0524\x05\xE8u\x02\u0524\u0525\x07\x8F\x02\x02\u0525" +
		"\u0526\x05\u017A\xBE\x02\u0526\u0527\x07\x90\x02\x02\u0527\u0529\x03\x02" +
		"\x02\x02\u0528\u0522\x03\x02\x02\x02\u0528\u0523\x03\x02\x02\x02\u0529" +
		"\xD1\x03\x02\x02\x02\u052A\u052B\x07I\x02\x02\u052B\u052C\x05\xEAv\x02" +
		"\u052C\u052D\x07\x93\x02\x02\u052D\u0530\x05\u01DA\xEE\x02\u052E\u052F" +
		"\x07\x89\x02\x02\u052F\u0531\x05\xC2b\x02\u0530\u052E\x03\x02\x02\x02" +
		"\u0530\u0531\x03\x02\x02\x02\u0531\u0532\x03\x02\x02\x02\u0532\u0533\x07" +
		"\x8C\x02\x02\u0533\xD3\x03\x02\x02\x02\u0534\u0535\x05\u0112\x8A\x02\u0535" +
		"\u0536\x05\xD6l\x02\u0536\u053E\x07\"\x02\x02\u0537\u0539\x05:\x1E\x02" +
		"\u0538\u0537\x03\x02\x02\x02\u0539\u053C\x03\x02\x02\x02\u053A\u0538\x03" +
		"\x02\x02\x02\u053A\u053B\x03\x02\x02\x02\u053B\u053D\x03\x02\x02\x02\u053C" +
		"\u053A\x03\x02\x02\x02\u053D\u053F\x07\x0E\x02\x02\u053E\u053A\x03\x02" +
		"\x02\x02\u053E\u053F\x03\x02\x02\x02\u053F\u0543\x03\x02\x02\x02\u0540" +
		"\u0542\x05\x1E\x10\x02\u0541\u0540\x03\x02\x02\x02\u0542\u0545\x03\x02" +
		"\x02\x02\u0543\u0541\x03\x02\x02\x02\u0543\u0544\x03\x02\x02\x02\u0544" +
		"\u0546\x03\x02\x02\x02\u0545\u0543\x03\x02\x02\x02\u0546\u0547\x07\x1A" +
		"\x02\x02\u0547\u0549\x07\"\x02\x02\u0548\u054A\x05\xE8u\x02\u0549\u0548" +
		"\x03\x02\x02\x02\u0549\u054A\x03\x02\x02\x02\u054A\u054B\x03\x02\x02\x02" +
		"\u054B\u054C\x07\x8C\x02\x02\u054C\xD5\x03\x02\x02\x02\u054D\u054E\x07" +
		" \x02\x02\u054E\u0552\x05\u014E\xA8\x02\u054F\u0550\x07&\x02\x02\u0550" +
		"\u0552\x05l7\x02\u0551\u054D\x03\x02\x02\x02\u0551\u054F\x03\x02\x02\x02" +
		"\u0552\xD7\x03\x02\x02\x02\u0553\u0554\x07#\x02\x02\u0554\u0555\x07\x8F" +
		"\x02\x02\u0555\u0556\x05\xDAn\x02\u0556\u0557\x07\x90\x02\x02\u0557\u0558" +
		"\x07\x8C\x02\x02\u0558\xD9\x03\x02\x02\x02\u0559\u055E\x05\xF8}\x02\u055A" +
		"\u055B\x07\x8C\x02\x02\u055B\u055D\x05\xF8}\x02\u055C\u055A\x03\x02\x02" +
		"\x02\u055D\u0560\x03\x02\x02\x02\u055E\u055C\x03\x02\x02\x02\u055E\u055F" +
		"\x03\x02\x02\x02\u055F\xDB\x03\x02\x02\x02\u0560\u055E\x03\x02\x02\x02" +
		"\u0561\u0562\x07#\x02\x02\u0562\u0563\x072\x02\x02\u0563\u0564\x07\x8F" +
		"\x02\x02\u0564\u0565\x05,\x17\x02\u0565\u0566\x07\x90\x02\x02\u0566\xDD" +
		"\x03\x02\x02\x02\u0567\u056A\x05\u0126\x94\x02\u0568\u056A\x07\x80\x02" +
		"\x02\u0569\u0567\x03\x02\x02\x02\u0569\u0568\x03\x02\x02\x02\u056A\xDF" +
		"\x03\x02\x02\x02\u056B\u0570\x05\xDEp\x02\u056C\u056D\x07\x8D\x02\x02" +
		"\u056D\u056F\x05\xDEp\x02\u056E\u056C\x03\x02\x02\x02\u056F\u0572\x03" +
		"\x02\x02\x02\u0570\u056E\x03\x02\x02\x02\u0570\u0571\x03\x02\x02\x02\u0571" +
		"\xE1\x03\x02\x02\x02\u0572\u0570\x03\x02\x02\x02\u0573\u0574\x07$\x02" +
		"\x02\u0574\u0575\x05\u0112\x8A\x02\u0575\u0576\x05\u0126\x94\x02\u0576" +
		"\u0577\x07\x8F\x02\x02\u0577\u0578\x05\xE0q\x02\u0578\u0579\x07\x90\x02" +
		"\x02\u0579\u057A\x07\x8C\x02\x02\u057A\xE3\x03\x02\x02\x02\u057B\u057C" +
		"\x07$\x02\x02\u057C\u057D\x05\xE8u\x02\u057D\u057E\x07+\x02\x02\u057E" +
		"\u057F\x07\x8F\x02\x02\u057F\u0580\x05\xA6T\x02\u0580\u0581\x07\x90\x02" +
		"\x02\u0581\u0582\x07\x8C\x02\x02\u0582\xE5\x03\x02\x02\x02\u0583\u0584" +
		"\x05\u01A8\xD5\x02\u0584\u0585\x07\x93\x02\x02\u0585\u0586\x05\u0126\x94" +
		"\x02\u0586\xE7\x03\x02\x02\x02\u0587\u0588\t\x06\x02\x02\u0588\xE9\x03" +
		"\x02\x02\x02\u0589\u058E\x05\xE8u\x02\u058A\u058B\x07\x8D\x02\x02\u058B" +
		"\u058D\x05\xE8u\x02\u058C\u058A\x03\x02\x02\x02\u058D\u0590\x03\x02\x02" +
		"\x02\u058E\u058C\x03\x02\x02\x02\u058E\u058F\x03\x02\x02\x02\u058F\xEB" +
		"\x03\x02\x02\x02\u0590\u058E\x03\x02\x02\x02\u0591\u0593\x05\u0112\x8A" +
		"\x02\u0592\u0591\x03\x02\x02\x02\u0592\u0593\x03\x02\x02\x02\u0593\u0594" +
		"\x03\x02\x02\x02\u0594\u0595\x07&\x02\x02\u0595\u0596\x05l7\x02\u0596" +
		"\u0597\x07a\x02\x02\u0597\u059F\x05\u019A\xCE\x02\u0598\u0599\x07\x1D" +
		"\x02\x02\u0599\u059A\x05l7\x02\u059A\u059B\x07a\x02\x02\u059B\u059C\x05" +
		"\u019A\xCE\x02\u059C\u059E\x03\x02\x02\x02\u059D\u0598\x03\x02\x02\x02" +
		"\u059E\u05A1\x03\x02\x02\x02\u059F\u059D\x03\x02\x02\x02\u059F\u05A0\x03" +
		"\x02\x02\x02\u05A0\u05A4\x03\x02\x02\x02\u05A1\u059F\x03\x02\x02\x02\u05A2" +
		"\u05A3\x07\x1C\x02\x02\u05A3\u05A5\x05\u019A\xCE\x02\u05A4\u05A2\x03\x02" +
		"\x02\x02\u05A4\u05A5\x03\x02\x02\x02\u05A5\u05A6\x03\x02\x02\x02\u05A6" +
		"\u05A7\x07\x1A\x02\x02\u05A7\u05A9\x07&\x02\x02\u05A8\u05AA\x05\xE8u\x02" +
		"\u05A9\u05A8\x03\x02\x02\x02\u05A9\u05AA\x03\x02\x02\x02\u05AA\u05AB\x03" +
		"\x02\x02\x02\u05AB\u05AC\x07\x8C\x02\x02\u05AC\xED\x03\x02\x02\x02\u05AD" +
		"\u05AE\x07\x8F\x02\x02\u05AE\u05B3\x05\x96L\x02\u05AF\u05B0\x07\x8D\x02" +
		"\x02\u05B0\u05B2\x05\x96L\x02\u05B1\u05AF\x03\x02\x02\x02\u05B2\u05B5" +
		"\x03\x02\x02\x02\u05B3\u05B1\x03\x02\x02\x02\u05B3\u05B4\x03\x02\x02\x02" +
		"\u05B4\u05B6\x03\x02\x02\x02\u05B5\u05B3\x03\x02\x02\x02\u05B6\u05B7\x07" +
		"\x90\x02\x02\u05B7\xEF\x03\x02\x02\x02\u05B8\u05BB\x05\x96L\x02\u05B9" +
		"\u05BB\x05\xC2b\x02\u05BA\u05B8\x03\x02\x02\x02\u05BA\u05B9\x03\x02\x02" +
		"\x02\u05BB\xF1\x03\x02\x02\x02\u05BC\u05BD\x05\u0126\x94\x02\u05BD\u05BE" +
		"\x07J\x02\x02\u05BE\u05BF\x07\x8A\x02\x02\u05BF\xF3\x03\x02\x02\x02\u05C0" +
		"\u05C2\x07\x15\x02\x02\u05C1\u05C0\x03\x02\x02\x02\u05C1\u05C2\x03\x02" +
		"\x02\x02\u05C2\u05C3\x03\x02\x02\x02\u05C3\u05CF\x05\u0126\x94\x02\u05C4" +
		"\u05C5\x07\x1B\x02\x02\u05C5\u05CA\x05\u0126\x94\x02\u05C6\u05C7\x07\x8F" +
		"\x02\x02\u05C7\u05C8\x05\xE8u\x02\u05C8\u05C9\x07\x90\x02\x02\u05C9\u05CB" +
		"\x03\x02\x02\x02\u05CA\u05C6\x03\x02\x02\x02\u05CA\u05CB\x03\x02\x02\x02" +
		"\u05CB\u05CF\x03\x02\x02\x02\u05CC\u05CD\x07\x16\x02\x02\u05CD\u05CF\x05" +
		"\u0126\x94\x02\u05CE\u05C1\x03\x02\x02\x02\u05CE\u05C4\x03\x02\x02\x02" +
		"\u05CE\u05CC\x03\x02\x02\x02\u05CF\xF5\x03\x02\x02\x02\u05D0\u05D5\x05" +
		"\xE8u\x02\u05D1\u05D2\x07\x8D\x02\x02\u05D2\u05D4\x05\xE8u\x02\u05D3\u05D1" +
		"\x03\x02\x02\x02\u05D4\u05D7\x03\x02\x02\x02\u05D5\u05D3\x03\x02\x02\x02" +
		"\u05D5\u05D6\x03\x02\x02\x02\u05D6\u05DB\x03\x02\x02\x02\u05D7\u05D5\x03" +
		"\x02\x02\x02\u05D8\u05DB\x07@\x02\x02\u05D9\u05DB\x07\b\x02\x02\u05DA" +
		"\u05D0\x03\x02\x02\x02\u05DA\u05D8\x03\x02\x02\x02\u05DA\u05D9\x03\x02" +
		"\x02\x02\u05DB\xF7\x03\x02\x02\x02\u05DC\u05DE\x07\x17\x02\x02\u05DD\u05DC" +
		"\x03\x02\x02\x02\u05DD\u05DE\x03\x02\x02\x02\u05DE\u05DF\x03\x02\x02\x02" +
		"\u05DF\u05E0\x05\xEAv\x02\u05E0\u05E2\x07\x93\x02\x02\u05E1\u05E3\x07" +
		"(\x02\x02\u05E2\u05E1\x03\x02\x02\x02\u05E2\u05E3\x03\x02\x02\x02\u05E3" +
		"\u05E4\x03\x02\x02\x02\u05E4\u05E7\x05\u01DA\xEE\x02\u05E5\u05E6\x07\x89" +
		"\x02\x02\u05E6\u05E8\x05\xC2b\x02\u05E7\u05E5\x03\x02\x02\x02\u05E7\u05E8" +
		"\x03\x02\x02\x02\u05E8\xF9\x03\x02\x02\x02\u05E9\u05F0\x05";
	private static readonly _serializedATNSegment3: string =
		"\xF8}\x02\u05EA\u05F0\x05\u010A\x86\x02\u05EB\u05F0\x05\u010E\x88\x02" +
		"\u05EC\u05F0\x05\xFE\x80\x02\u05ED\u05F0\x05\u010C\x87\x02\u05EE\u05F0" +
		"\x05\u0106\x84\x02\u05EF\u05E9\x03\x02\x02\x02\u05EF\u05EA\x03\x02\x02" +
		"\x02\u05EF\u05EB\x03\x02\x02\x02\u05EF\u05EC\x03\x02\x02\x02\u05EF\u05ED" +
		"\x03\x02\x02\x02\u05EF\u05EE\x03\x02\x02\x02\u05F0\xFB\x03\x02\x02\x02" +
		"\u05F1\u05F2\x05\xFA~\x02\u05F2\xFD\x03\x02\x02\x02\u05F3\u05F4\x07\x1F" +
		"\x02\x02\u05F4\u05F5\x05\xEAv\x02\u05F5\u05F6\x07\x93\x02\x02\u05F6\u05F7" +
		"\x05\u01DA\xEE\x02\u05F7\xFF\x03\x02\x02\x02\u05F8\u05FD\x05\u010A\x86" +
		"\x02\u05F9\u05FA\x07\x8C\x02\x02\u05FA\u05FC\x05\u010A\x86\x02\u05FB\u05F9" +
		"\x03\x02\x02\x02\u05FC\u05FF\x03\x02\x02\x02\u05FD\u05FB\x03\x02\x02\x02" +
		"\u05FD\u05FE\x03\x02\x02\x02\u05FE\u0101\x03\x02\x02\x02\u05FF\u05FD\x03" +
		"\x02\x02\x02\u0600\u0605\x05\u0108\x85\x02\u0601\u0602\x07\x8C\x02\x02" +
		"\u0602\u0604\x05\u0108\x85\x02\u0603\u0601\x03\x02\x02\x02\u0604\u0607" +
		"\x03\x02\x02\x02\u0605\u0603\x03\x02\x02\x02\u0605\u0606\x03\x02\x02\x02" +
		"\u0606\u0103\x03\x02\x02\x02\u0607\u0605\x03\x02\x02\x02\u0608\u060D\x05" +
		"\xFC\x7F\x02\u0609\u060A\x07\x8C\x02\x02\u060A\u060C\x05\xFC\x7F\x02\u060B" +
		"\u0609\x03\x02\x02\x02\u060C\u060F\x03\x02\x02\x02\u060D\u060B\x03\x02" +
		"\x02\x02\u060D\u060E\x03\x02\x02\x02\u060E\u0105\x03\x02\x02\x02\u060F" +
		"\u060D\x03\x02\x02\x02\u0610\u0611\x07I\x02\x02\u0611\u0612\x05\xEAv\x02" +
		"\u0612\u0614\x07\x93\x02\x02\u0613\u0615\t\x07\x02\x02\u0614\u0613\x03" +
		"\x02\x02\x02\u0614\u0615\x03\x02\x02\x02\u0615\u0616\x03\x02\x02\x02\u0616" +
		"\u0619\x05\u01DA\xEE\x02\u0617\u0618\x07\x89\x02\x02\u0618\u061A\x05\xC2" +
		"b\x02\u0619\u0617\x03\x02\x02\x02\u0619\u061A\x03\x02\x02\x02\u061A\u0107" +
		"\x03\x02\x02\x02\u061B\u061C\x05\xEAv\x02\u061C\u061E\x07\x93\x02\x02" +
		"\u061D\u061F\x05\u0122\x92\x02\u061E\u061D\x03\x02\x02\x02\u061E\u061F" +
		"\x03\x02\x02\x02\u061F\u0620\x03\x02\x02\x02\u0620\u0622\x05\u01DA\xEE" +
		"\x02\u0621\u0623\x07\x13\x02\x02\u0622\u0621\x03\x02\x02\x02\u0622\u0623" +
		"\x03\x02\x02\x02\u0623\u0626\x03\x02\x02\x02\u0624\u0625\x07\x89\x02\x02" +
		"\u0625\u0627\x05\xC2b\x02\u0626\u0624\x03\x02\x02\x02\u0626\u0627\x03" +
		"\x02\x02\x02\u0627\u0109\x03\x02\x02\x02\u0628\u0629\x07X\x02\x02\u0629" +
		"\u062A\x05\xEAv\x02\u062A\u062C\x07\x93\x02\x02\u062B\u062D\x05\u0122" +
		"\x92\x02\u062C\u062B\x03\x02\x02\x02\u062C\u062D\x03\x02\x02\x02\u062D" +
		"\u062E\x03\x02\x02\x02\u062E\u0630\x05\u01DA\xEE\x02\u062F\u0631\x07\x13" +
		"\x02\x02\u0630\u062F\x03\x02\x02\x02\u0630\u0631\x03\x02\x02\x02\u0631" +
		"\u0634\x03\x02\x02\x02\u0632\u0633\x07\x89\x02\x02\u0633\u0635\x05\xC2" +
		"b\x02\u0634\u0632\x03\x02\x02\x02\u0634\u0635\x03\x02\x02\x02\u0635\u010B" +
		"\x03\x02\x02\x02\u0636\u0637\x07`\x02\x02\u0637\u0638\x05\xEAv\x02\u0638" +
		"\u0639\x07\x93\x02\x02\u0639\u063A\x05\u01C4\xE3\x02\u063A\u010D\x03\x02" +
		"\x02\x02\u063B\u063D\x07k\x02\x02\u063C\u063B\x03\x02\x02\x02\u063C\u063D" +
		"\x03\x02\x02\x02\u063D\u063E\x03\x02\x02\x02\u063E\u063F\x05\xEAv\x02" +
		"\u063F\u0641\x07\x93\x02\x02\u0640\u0642\x05\u0122\x92\x02\u0641\u0640" +
		"\x03\x02\x02\x02\u0641\u0642\x03\x02\x02\x02\u0642\u0643\x03\x02\x02\x02" +
		"\u0643\u0646\x05\u01DA\xEE\x02\u0644\u0645\x07\x89\x02\x02\u0645\u0647" +
		"\x05\xC2b\x02\u0646\u0644\x03\x02\x02\x02\u0646\u0647\x03\x02\x02\x02" +
		"\u0647\u010F\x03\x02\x02\x02\u0648\u0649\x07o\x02\x02\u0649\u064D\x05" +
		"l7\x02\u064A\u064B\x07 \x02\x02\u064B\u064D\x05\u014E\xA8\x02\u064C\u0648" +
		"\x03\x02\x02\x02\u064C\u064A\x03\x02\x02\x02\u064D\u0111\x03\x02\x02\x02" +
		"\u064E\u064F\x05\xE8u\x02\u064F\u0650\x07\x93\x02\x02\u0650\u0113\x03" +
		"\x02\x02\x02\u0651\u0652\x07-\x02\x02\u0652\u0653\x05\u011C\x8F\x02\u0653" +
		"\u0654\x07\x8C\x02\x02\u0654\u0115\x03\x02\x02\x02\u0655\u0658\x05\u018E" +
		"\xC8\x02\u0656\u0658\x05\u015C\xAF\x02\u0657\u0655\x03\x02\x02\x02\u0657" +
		"\u0656\x03\x02\x02\x02\u0658\u0117\x03\x02\x02\x02\u0659\u065F\x07;\x02" +
		"\x02\u065A\u065F\x07s\x02\x02\u065B\u065F\x07\x81\x02\x02\u065C\u065F" +
		"\x05\xBC_\x02\u065D\u065F\x05\u013C\x9F\x02\u065E\u0659\x03\x02\x02\x02" +
		"\u065E\u065A\x03\x02\x02\x02\u065E\u065B\x03\x02\x02\x02\u065E\u065C\x03" +
		"\x02\x02\x02\u065E\u065D\x03\x02\x02\x02\u065F\u0119\x03\x02\x02\x02\u0660" +
		"\u0661\x05\xE8u\x02\u0661\u011B\x03\x02\x02\x02\u0662\u0667\x05\u011A" +
		"\x8E\x02\u0663\u0664\x07\x8D\x02\x02\u0664\u0666\x05\u011A\x8E\x02\u0665" +
		"\u0663\x03\x02\x02\x02\u0666\u0669\x03\x02\x02\x02\u0667\u0665\x03\x02" +
		"\x02\x02\u0667\u0668\x03\x02\x02\x02\u0668\u011D\x03\x02\x02\x02\u0669" +
		"\u0667\x03\x02\x02\x02\u066A\u066B\t\b\x02\x02\u066B\u011F\x03\x02\x02" +
		"\x02\u066C\u066E\x05\u0112\x8A\x02\u066D\u066C\x03\x02\x02\x02\u066D\u066E" +
		"\x03\x02\x02\x02\u066E\u0670\x03\x02\x02\x02\u066F\u0671\x05\u0110\x89" +
		"\x02\u0670\u066F\x03\x02\x02\x02\u0670\u0671\x03\x02\x02\x02\u0671\u0672" +
		"\x03\x02\x02\x02\u0672\u0673\x071\x02\x02\u0673\u0674\x05\u019A\xCE\x02" +
		"\u0674\u0675\x07\x1A\x02\x02\u0675\u0677\x071\x02\x02\u0676\u0678\x05" +
		"\xE8u\x02\u0677\u0676\x03\x02\x02\x02\u0677\u0678\x03\x02\x02\x02\u0678" +
		"\u0679\x03\x02\x02\x02\u0679\u067A\x07\x8C\x02\x02\u067A\u0121\x03\x02" +
		"\x02\x02\u067B\u067C\t\t\x02\x02\u067C\u0123\x03\x02\x02\x02\u067D\u067E" +
		"\t\n\x02\x02\u067E\u0125\x03\x02\x02\x02\u067F\u0682\x05\xE8u\x02\u0680" +
		"\u0682\x07\x81\x02\x02\u0681\u067F\x03\x02\x02\x02\u0681\u0680\x03\x02" +
		"\x02\x02\u0682\u0686\x03\x02\x02\x02\u0683\u0685\x05\u0128\x95\x02\u0684" +
		"\u0683\x03\x02\x02\x02\u0685\u0688\x03\x02\x02\x02\u0686\u0684\x03\x02" +
		"\x02\x02\u0686\u0687\x03\x02\x02\x02\u0687\u0127\x03\x02\x02\x02\u0688" +
		"\u0686\x03\x02\x02\x02\u0689\u068E\x05\u012C\x97\x02\u068A\u068E\x05\u012E" +
		"\x98\x02\u068B\u068E\x05\u0130\x99\x02\u068C\u068E\x05\u0132\x9A\x02\u068D" +
		"\u0689\x03\x02\x02\x02\u068D\u068A\x03\x02\x02\x02\u068D\u068B\x03\x02" +
		"\x02\x02\u068D\u068C\x03\x02\x02\x02\u068E\u0129\x03\x02\x02\x02\u068F" +
		"\u0694\x05\xE8u\x02\u0690\u0691\x07\x9C\x02\x02\u0691\u0693\x05\u01DC" +
		"\xEF\x02\u0692\u0690\x03\x02\x02\x02\u0693\u0696\x03\x02\x02\x02\u0694" +
		"\u0692\x03\x02\x02\x02\u0694\u0695\x03\x02\x02\x02\u0695\u012B\x03\x02" +
		"\x02\x02\u0696\u0694\x03\x02\x02\x02\u0697\u0698\x07\x9C\x02\x02\u0698" +
		"\u069A\x05\u01DC\xEF\x02\u0699\u0697\x03\x02\x02\x02\u069A\u069B\x03\x02" +
		"\x02\x02\u069B\u0699\x03\x02\x02\x02\u069B\u069C\x03\x02\x02\x02\u069C" +
		"\u012D\x03\x02\x02\x02\u069D\u069E\x07\x8F\x02\x02\u069E\u069F\x05\n\x06" +
		"\x02\u069F\u06A0\x07\x90\x02\x02\u06A0\u012F\x03\x02\x02\x02\u06A1\u06A2" +
		"\x07\x8F\x02\x02\u06A2\u06A3\x05\x96L\x02\u06A3\u06A4\x07\x90\x02\x02" +
		"\u06A4\u0131\x03\x02\x02\x02\u06A5\u06A7\x05\u01AA\xD6\x02\u06A6\u06A5" +
		"\x03\x02\x02\x02\u06A6\u06A7\x03\x02\x02\x02\u06A7\u06A8\x03\x02\x02\x02" +
		"\u06A8\u06A9\x07\xA4\x02\x02\u06A9\u06AE\x050\x19\x02\u06AA\u06AB\x07" +
		"\x8F\x02\x02\u06AB\u06AC\x05\xC2b\x02\u06AC\u06AD\x07\x90\x02\x02\u06AD" +
		"\u06AF\x03\x02\x02\x02\u06AE\u06AA\x03\x02\x02\x02\u06AE\u06AF\x03\x02" +
		"\x02\x02\u06AF\u0133\x03\x02\x02\x02\u06B0\u06B1\x075\x02\x02\u06B1\u06B2" +
		"\x05\xE8u\x02\u06B2\u06B3\x07+\x02\x02\u06B3\u06B4\x05\u0136\x9C\x02\u06B4" +
		"\u06B5\x07\x8C\x02\x02\u06B5\u0135\x03\x02\x02\x02\u06B6\u06B9\x05\u018A" +
		"\xC6\x02\u06B7\u06B9\x05`1\x02\u06B8\u06B6\x03\x02\x02\x02\u06B8\u06B7" +
		"\x03\x02\x02\x02\u06B9\u0137\x03\x02\x02\x02\u06BA\u06BB\x05\xEAv\x02" +
		"\u06BB\u06BC\x07\x93\x02\x02\u06BC\u06BD\x05\x9CO\x02\u06BD\u0139\x03" +
		"\x02\x02\x02\u06BE\u06C0\x05\u0112\x8A\x02\u06BF\u06BE\x03\x02\x02\x02" +
		"\u06BF\u06C0\x03\x02\x02\x02\u06C0\u06C1\x03\x02\x02\x02\u06C1\u06C3\x07" +
		"7\x02\x02\u06C2\u06C4\x05\xE8u\x02\u06C3\u06C2\x03\x02\x02\x02\u06C3\u06C4" +
		"\x03\x02\x02\x02\u06C4\u06C7\x03\x02\x02\x02\u06C5\u06C6\x07n\x02\x02" +
		"\u06C6\u06C8\x05l7\x02\u06C7\u06C5\x03\x02\x02\x02\u06C7\u06C8\x03\x02" +
		"\x02\x02\u06C8\u06C9\x03\x02\x02\x02\u06C9\u06CA\x07\x8C\x02\x02\u06CA" +
		"\u013B\x03\x02\x02\x02\u06CB\u06CE\x05\x02\x02\x02\u06CC\u06CE\x05\u0150" +
		"\xA9\x02\u06CD\u06CB\x03\x02\x02\x02\u06CD\u06CC\x03\x02\x02\x02\u06CE" +
		"\u013D\x03\x02\x02\x02\u06CF\u06D6\x05~@\x02\u06D0\u06D6\x05\u01A4\xD3" +
		"\x02\u06D1\u06D6\x05\u01F8\xFD\x02\u06D2\u06D6\x05\xC6d\x02\u06D3\u06D6" +
		"\x05\u01E4\xF3\x02\u06D4\u06D6\x05\u0172\xBA\x02\u06D5\u06CF\x03\x02\x02" +
		"\x02\u06D5\u06D0\x03\x02\x02\x02\u06D5\u06D1\x03\x02\x02\x02\u06D5\u06D2" +
		"\x03\x02\x02\x02\u06D5\u06D3\x03\x02\x02\x02\u06D5\u06D4\x03\x02\x02\x02" +
		"\u06D6\u013F\x03\x02\x02\x02\u06D7\u06D9\x07%\x02\x02\u06D8\u06D7\x03" +
		"\x02\x02\x02\u06D8\u06D9\x03\x02\x02\x02\u06D9\u06DB\x03\x02\x02\x02\u06DA" +
		"\u06DC\x05\x8AF\x02\u06DB\u06DA\x03\x02\x02\x02\u06DB\u06DC\x03\x02\x02" +
		"\x02\u06DC\u0141\x03\x02\x02\x02\u06DD\u06DE\x07B\x02\x02\u06DE\u06DF" +
		"\x07\x10\x02\x02\u06DF\u06E0\x05\xE8u\x02\u06E0\u06E1\x07+\x02\x02\u06E1" +
		"\u06E2\x05\u0146\xA4\x02\u06E2\u06E5\x07\x1A\x02\x02\u06E3\u06E4\x07B" +
		"\x02\x02\u06E4\u06E6\x07\x10\x02\x02\u06E5\u06E3\x03\x02\x02\x02\u06E5" +
		"\u06E6\x03\x02\x02\x02\u06E6\u06E8\x03\x02\x02\x02\u06E7\u06E9\x05\xE8" +
		"u\x02\u06E8\u06E7\x03\x02\x02\x02\u06E8\u06E9\x03\x02\x02\x02\u06E9\u06EA" +
		"\x03\x02\x02\x02\u06EA\u06EB\x07\x8C\x02\x02\u06EB\u0143\x03\x02\x02\x02" +
		"\u06EC\u06F8\x05\u01C8\xE5\x02\u06ED\u06F8\x05\u01C6\xE4\x02\u06EE\u06F8" +
		"\x05\u01EC\xF7\x02\u06EF\u06F8\x05\u01D8\xED\x02\u06F0\u06F8\x05~@\x02" +
		"\u06F1\u06F8\x05\u01F8\xFD\x02\u06F2\u06F8\x05\xC6d\x02\u06F3\u06F8\x05" +
		"\x12\n\x02\u06F4\u06F8\x05\u01F4\xFB\x02\u06F5\u06F8\x05\xE4s\x02\u06F6" +
		"\u06F8\x05\xE2r\x02\u06F7\u06EC\x03\x02\x02\x02\u06F7\u06ED\x03\x02\x02" +
		"\x02\u06F7\u06EE\x03\x02\x02\x02\u06F7\u06EF\x03\x02\x02\x02\u06F7\u06F0" +
		"\x03\x02\x02\x02\u06F7\u06F1\x03\x02\x02\x02\u06F7\u06F2\x03\x02\x02\x02" +
		"\u06F7\u06F3\x03\x02\x02\x02\u06F7\u06F4\x03\x02\x02\x02\u06F7\u06F5\x03" +
		"\x02\x02\x02\u06F7\u06F6\x03\x02\x02\x02\u06F8\u0145\x03\x02\x02\x02\u06F9" +
		"\u06FB\x05\u0144\xA3\x02\u06FA\u06F9\x03\x02\x02\x02\u06FB\u06FE\x03\x02" +
		"\x02\x02\u06FC\u06FA\x03\x02\x02\x02\u06FC\u06FD\x03\x02\x02\x02\u06FD" +
		"\u0147\x03\x02\x02\x02\u06FE\u06FC\x03\x02\x02\x02\u06FF\u0700\x07B\x02" +
		"\x02\u0700\u0701\x05\xE8u\x02\u0701\u0702\x07+\x02\x02\u0702\u0703\x05" +
		"\u014C\xA7\x02\u0703\u0705\x07\x1A\x02\x02\u0704\u0706\x07B\x02\x02\u0705" +
		"\u0704\x03\x02\x02\x02\u0705\u0706\x03\x02\x02\x02\u0706\u0708\x03\x02" +
		"\x02\x02\u0707\u0709\x05\xE8u\x02\u0708\u0707\x03\x02\x02\x02\u0708\u0709" +
		"\x03\x02\x02\x02\u0709\u070A\x03\x02\x02\x02\u070A\u070B\x07\x8C\x02\x02" +
		"\u070B\u0149\x03\x02\x02\x02\u070C\u0720\x05\u01C8\xE5\x02\u070D\u0720" +
		"\x05\u01C6\xE4\x02\u070E\u0720\x05\u01EC\xF7\x02\u070F\u0720\x05\u01D8" +
		"\xED\x02\u0710\u0720\x05~@\x02\u0711\u0720\x05\u01A4\xD3\x02\u0712\u0720" +
		"\x05\u01F8\xFD\x02\u0713\u0720\x05\xC6d\x02\u0714\u0720\x05\x12\n\x02" +
		"\u0715\u0720\x05Z.\x02\u0716\u0720\x05.\x18\x02\u0717\u0720\x052\x1A\x02" +
		"\u0718\u0720\x05\x94K\x02\u0719\u0720\x05\u01F4\xFB\x02\u071A\u0720\x05" +
		"\xE4s\x02\u071B\u0720\x05\xE2r\x02\u071C\u0720\x05\u0134\x9B\x02\u071D" +
		"\u0720\x05\u01C2\xE2\x02\u071E\u0720\x05\u01E4\xF3\x02\u071F\u070C\x03" +
		"\x02\x02\x02\u071F\u070D\x03\x02\x02\x02\u071F\u070E\x03\x02\x02\x02\u071F" +
		"\u070F\x03\x02\x02\x02\u071F\u0710\x03\x02\x02\x02\u071F\u0711\x03\x02" +
		"\x02\x02\u071F\u0712\x03\x02\x02\x02\u071F\u0713\x03\x02\x02\x02\u071F" +
		"\u0714\x03\x02\x02\x02\u071F\u0715\x03\x02\x02\x02\u071F\u0716\x03\x02" +
		"\x02\x02\u071F\u0717\x03\x02\x02\x02\u071F\u0718\x03\x02\x02\x02\u071F" +
		"\u0719\x03\x02\x02\x02\u071F\u071A\x03\x02\x02\x02\u071F\u071B\x03\x02" +
		"\x02\x02\u071F\u071C\x03\x02\x02\x02\u071F\u071D\x03\x02\x02\x02\u071F" +
		"\u071E\x03\x02\x02\x02\u0720\u014B\x03\x02\x02\x02\u0721\u0723\x05\u014A" +
		"\xA6\x02\u0722\u0721\x03\x02\x02\x02\u0723\u0726\x03\x02\x02\x02\u0724" +
		"\u0722\x03\x02\x02\x02\u0724\u0725\x03\x02\x02\x02\u0725\u014D\x03\x02" +
		"\x02\x02\u0726\u0724\x03\x02\x02\x02\u0727\u0728\x05\xE8u\x02\u0728\u0729" +
		"\x07(\x02\x02\u0729\u072A\x05\x96L\x02\u072A\u014F\x03\x02\x02\x02\u072B" +
		"\u072C\x05\x02\x02\x02\u072C\u072D\x05\xE8u\x02\u072D\u0151\x03\x02\x02" +
		"\x02\u072E\u072F\x05\u017C\xBF\x02\u072F\u0730\x07h\x02\x02\u0730\u0734" +
		"\x054\x1B\x02\u0731\u0733\x05\u0190\xC9\x02\u0732\u0731\x03\x02\x02\x02" +
		"\u0733\u0736\x03\x02\x02\x02\u0734\u0732\x03\x02\x02\x02\u0734\u0735\x03" +
		"\x02\x02\x02\u0735\u0737\x03\x02\x02\x02\u0736\u0734\x03\x02\x02\x02\u0737" +
		"\u0738\x07\x1A\x02\x02\u0738\u073A\x07h\x02\x02\u0739\u073B\x05\xE8u\x02" +
		"\u073A\u0739\x03\x02\x02\x02\u073A\u073B\x03\x02\x02\x02\u073B\u0153\x03" +
		"\x02\x02\x02\u073C\u073D\x07C\x02\x02\u073D\u073E\x07\x8F\x02\x02\u073E" +
		"\u073F\x05\u0156\xAC\x02\u073F\u0740\x07\x90\x02\x02\u0740\u0741\x07\x8C" +
		"\x02\x02\u0741\u0155\x03\x02\x02\x02\u0742\u0743\x05\u0102\x82\x02\u0743" +
		"\u0157\x03\x02\x02\x02\u0744\u0745\x07C\x02\x02\u0745\u0746\x072\x02\x02" +
		"\u0746\u0747\x07\x8F\x02\x02\u0747\u0748\x05,\x17\x02\u0748\u0749\x07" +
		"\x90\x02\x02\u0749\u0159\x03\x02\x02\x02\u074A\u0754\x05\u0118\x8D\x02" +
		"\u074B\u0754\x05\u0170\xB9\x02\u074C\u074D\x07\x8F\x02\x02\u074D\u074E" +
		"\x05\xC2b\x02\u074E\u074F\x07\x90\x02\x02\u074F\u0754\x03\x02\x02\x02" +
		"\u0750\u0754\x05\x18\r\x02\u0751\u0754\x05\x10\t\x02\u0752\u0754\x05\u0126" +
		"\x94\x02\u0753\u074A\x03\x02\x02\x02\u0753\u074B\x03\x02\x02\x02\u0753" +
		"\u074C\x03\x02\x02\x02\u0753\u0750\x03\x02\x02\x02\u0753\u0751\x03\x02" +
		"\x02\x02\u0753\u0752\x03\x02\x02\x02\u0754\u015B\x03\x02\x02\x02\u0755" +
		"\u0759\x05\xA8U\x02\u0756\u0759\x05t;\x02\u0757\u0759\x05\u0148\xA5\x02" +
		"\u0758\u0755\x03\x02\x02\x02\u0758\u0756\x03\x02\x02\x02\u0758\u0757\x03" +
		"\x02\x02\x02\u0759\u015D\x03\x02\x02\x02\u075A\u0767\x05\u01C8\xE5\x02" +
		"\u075B\u0767\x05\u01C6\xE4\x02\u075C\u0767\x05\u01EC\xF7\x02\u075D\u0767" +
		"\x05\u01D8\xED\x02\u075E\u0767\x05~@\x02\u075F\u0767\x05\u01F8\xFD\x02" +
		"\u0760\u0767\x05\x12\n\x02\u0761\u0767\x05.\x18\x02\u0762\u0767\x052\x1A" +
		"\x02\u0763\u0767\x05\u01F4\xFB\x02\u0764\u0767\x05\xE4s\x02\u0765\u0767" +
		"\x05\xE2r\x02\u0766\u075A\x03\x02\x02\x02\u0766\u075B\x03\x02\x02\x02" +
		"\u0766\u075C\x03\x02\x02\x02\u0766\u075D\x03\x02\x02\x02\u0766\u075E\x03" +
		"\x02\x02\x02\u0766\u075F\x03\x02\x02\x02\u0766\u0760\x03\x02\x02\x02\u0766" +
		"\u0761\x03\x02\x02\x02\u0766\u0762\x03\x02\x02\x02\u0766\u0763\x03\x02" +
		"\x02\x02\u0766\u0764\x03\x02\x02\x02\u0766\u0765\x03\x02\x02\x02\u0767" +
		"\u015F\x03\x02\x02\x02\u0768\u076A\x05\u015E\xB0\x02\u0769\u0768\x03\x02" +
		"\x02\x02\u076A\u076D\x03\x02\x02\x02\u076B\u0769\x03\x02\x02\x02\u076B" +
		"\u076C\x03\x02\x02\x02\u076C\u0161\x03\x02\x02\x02\u076D\u076B\x03\x02" +
		"\x02\x02\u076E\u0770\x05\u019C\xCF\x02\u076F\u076E\x03\x02\x02\x02\u0770" +
		"\u0773\x03\x02\x02\x02\u0771\u076F\x03\x02\x02\x02\u0771\u0772\x03\x02" +
		"\x02\x02\u0772\u0163\x03\x02\x02\x02\u0773\u0771\x03\x02\x02\x02\u0774" +
		"\u0779\x05\u012A\x96\x02\u0775\u0776\x07\x8F\x02\x02\u0776\u0777\x05\n" +
		"\x06\x02\u0777\u0778\x07\x90\x02\x02\u0778\u077A\x03\x02\x02\x02\u0779" +
		"\u0775\x03\x02\x02\x02\u0779\u077A\x03\x02\x02\x02\u077A\u0165\x03\x02" +
		"\x02\x02\u077B\u077D\x05\u0112\x8A\x02\u077C\u077B\x03\x02\x02\x02\u077C" +
		"\u077D\x03\x02\x02\x02\u077D\u077E\x03\x02\x02\x02\u077E\u077F\x05\u0164" +
		"\xB3\x02\u077F\u0780\x07\x8C\x02\x02\u0780\u0167\x03\x02\x02\x02\u0781" +
		"\u078F\x05\u01C8\xE5\x02\u0782\u078F\x05\u01C6\xE4\x02\u0783\u078F\x05" +
		"\u01EC\xF7\x02\u0784\u078F\x05\u01D8\xED\x02\u0785\u078F\x05~@\x02\u0786" +
		"\u078F\x05\u01F8\xFD\x02\u0787\u078F\x05\xC6d\x02\u0788\u078F\x05\x12" +
		"\n\x02\u0789\u078F\x05.\x18\x02\u078A\u078F\x052\x1A\x02\u078B\u078F\x05" +
		"\u01F4\xFB\x02\u078C\u078F\x05\xE4s\x02\u078D\u078F\x05\xE2r\x02\u078E" +
		"\u0781\x03\x02\x02\x02\u078E\u0782\x03\x02\x02\x02\u078E\u0783\x03\x02" +
		"\x02\x02\u078E\u0784\x03\x02\x02\x02\u078E\u0785\x03\x02\x02\x02\u078E" +
		"\u0786\x03\x02\x02\x02\u078E\u0787\x03\x02\x02\x02\u078E\u0788\x03\x02" +
		"\x02\x02\u078E\u0789\x03\x02\x02\x02\u078E\u078A\x03\x02\x02\x02\u078E" +
		"\u078B\x03\x02\x02\x02\u078E\u078C\x03\x02\x02\x02\u078E\u078D\x03\x02" +
		"\x02\x02\u078F\u0169\x03\x02\x02\x02\u0790\u0792\x05\u0168\xB5\x02\u0791" +
		"\u0790\x03\x02\x02\x02\u0792\u0795\x03\x02\x02\x02\u0793\u0791\x03\x02" +
		"\x02\x02\u0793\u0794\x03\x02\x02\x02\u0794\u016B\x03\x02\x02\x02\u0795" +
		"\u0793\x03\x02\x02\x02\u0796\u0798\x05\u0112\x8A\x02\u0797\u0796\x03\x02" +
		"\x02\x02\u0797\u0798\x03\x02\x02\x02\u0798\u079A\x03\x02\x02\x02\u0799" +
		"\u079B\x07D\x02\x02\u079A\u0799\x03\x02\x02\x02\u079A\u079B\x03\x02\x02" +
		"\x02\u079B\u079C\x03\x02\x02\x02\u079C\u07A1\x07E\x02\x02\u079D\u079E" +
		"\x07\x8F\x02\x02\u079E\u079F\x05\u0198\xCD\x02\u079F\u07A0\x07\x90\x02" +
		"\x02\u07A0\u07A2\x03\x02\x02\x02\u07A1\u079D\x03\x02\x02\x02\u07A1\u07A2" +
		"\x03\x02\x02\x02\u07A2\u07A4\x03\x02\x02\x02\u07A3\u07A5\x07+\x02\x02" +
		"\u07A4\u07A3\x03\x02\x02\x02\u07A4\u07A5\x03\x02\x02\x02\u07A5\u07A6\x03" +
		"\x02\x02\x02\u07A6\u07A7\x05\u016A\xB6\x02\u07A7\u07A8\x07\x0E\x02\x02" +
		"\u07A8\u07A9\x05\u016E\xB8\x02\u07A9\u07AB\x07\x1A\x02\x02\u07AA\u07AC" +
		"\x07D\x02\x02\u07AB\u07AA\x03\x02\x02\x02\u07AB\u07AC\x03\x02\x02\x02" +
		"\u07AC\u07AD\x03\x02\x02\x02\u07AD\u07AF\x07E\x02\x02\u07AE\u07B0\x05" +
		"\xE8u\x02\u07AF\u07AE\x03\x02\x02\x02\u07AF\u07B0\x03\x02\x02\x02\u07B0" +
		"\u07B1\x03\x02\x02\x02\u07B1\u07B2\x07\x8C\x02\x02\u07B2\u016D\x03\x02" +
		"\x02\x02\u07B3\u07B5\x05\u019C\xCF\x02\u07B4\u07B3\x03\x02\x02\x02\u07B5" +
		"\u07B8\x03\x02\x02\x02\u07B6\u07B4\x03\x02\x02\x02\u07B6\u07B7\x03\x02" +
		"\x02\x02\u07B7\u016F\x03\x02\x02\x02\u07B8\u07B6\x03\x02\x02\x02\u07B9" +
		"\u07BA\x05\u01DA\xEE\x02\u07BA\u07C0\x07\xA4\x02\x02\u07BB\u07C1\x05\x10" +
		"\t\x02\u07BC\u07BD\x07\x8F\x02\x02\u07BD\u07BE\x05\xC2b\x02\u07BE\u07BF" +
		"\x07\x90\x02\x02\u07BF\u07C1\x03\x02\x02\x02\u07C0\u07BB\x03\x02\x02\x02" +
		"\u07C0\u07BC\x03\x02\x02\x02\u07C1\u0171\x03\x02\x02\x02\u07C2\u07C6\x05" +
		"\xD2j\x02\u07C3\u07C6\x05F$\x02\u07C4\u07C6\x05\u01BE\xE0\x02\u07C5\u07C2" +
		"\x03\x02\x02\x02\u07C5\u07C3\x03\x02\x02\x02\u07C5\u07C4\x03\x02\x02\x02" +
		"\u07C6\u0173\x03\x02\x02\x02\u07C7\u07CC\x05\u0126\x94\x02\u07C8\u07C9" +
		"\x07\x8D\x02\x02\u07C9\u07CB\x05\u0126\x94\x02\u07CA\u07C8\x03\x02\x02" +
		"\x02\u07CB\u07CE\x03\x02\x02\x02\u07CC\u07CA\x03\x02\x02\x02\u07CC\u07CD" +
		"\x03\x02\x02\x02\u07CD\u07D2\x03\x02\x02\x02\u07CE\u07CC\x03\x02\x02\x02" +
		"\u07CF\u07D2\x07@\x02\x02\u07D0\u07D2\x07\b\x02\x02\u07D1\u07C7\x03\x02" +
		"\x02\x02\u07D1\u07CF\x03\x02\x02\x02\u07D1\u07D0\x03\x02\x02\x02\u07D2" +
		"\u0175\x03\x02\x02\x02\u07D3\u07D4\x05\u0174\xBB\x02\u07D4\u07D5\x07\x93" +
		"\x02\x02\u07D5\u07D6\x05\u0126\x94\x02\u07D6\u0177\x03\x02\x02\x02\u07D7" +
		"\u07DA\x05\u017A\xBE\x02\u07D8\u07DA\x05\u0126\x94\x02\u07D9\u07D7\x03" +
		"\x02\x02\x02\u07D9\u07D8\x03\x02\x02\x02\u07DA\u0179\x03\x02\x02\x02\u07DB" +
		"\u07DF\x05\u01AC\xD7\x02\u07DC\u07DD\x05\x92J\x02\u07DD\u07DE\x05\u01AC" +
		"\xD7\x02\u07DE\u07E0\x03\x02\x02\x02\u07DF\u07DC\x03\x02\x02\x02\u07DF" +
		"\u07E0\x03\x02\x02\x02\u07E0\u017B\x03\x02\x02\x02\u07E1\u07E2\x07J\x02" +
		"\x02\u07E2\u07E3\x05\u0178\xBD\x02\u07E3\u017D\x03\x02\x02\x02\u07E4\u07E6" +
		"\x07N\x02\x02\u07E5\u07E7\x05\u0138\x9D\x02\u07E6\u07E5\x03\x02\x02\x02" +
		"\u07E7\u07E8\x03\x02\x02\x02\u07E8\u07E6\x03\x02\x02\x02\u07E8\u07E9\x03" +
		"\x02\x02\x02\u07E9\u07EA\x03\x02\x02\x02\u07EA\u07EB\x07\x1A\x02\x02\u07EB" +
		"\u07ED\x07N\x02\x02\u07EC\u07EE\x05\xE8u\x02\u07ED\u07EC\x03\x02\x02\x02" +
		"\u07ED\u07EE\x03\x02\x02\x02\u07EE\u017F\x03\x02\x02\x02\u07EF\u07F1\x07" +
		"N\x02\x02\u07F0\u07F2\x05\x9AN\x02\u07F1\u07F0\x03\x02\x02\x02\u07F2\u07F3" +
		"\x03\x02\x02\x02\u07F3\u07F1\x03\x02\x02\x02\u07F3\u07F4\x03\x02\x02\x02" +
		"\u07F4\u07F5\x03\x02\x02\x02\u07F5\u07F6\x07\x1A\x02\x02\u07F6\u07F8\x07" +
		"N\x02\x02\u07F7\u07F9\x05\xE8u\x02\u07F8\u07F7\x03\x02\x02\x02\u07F8\u07F9" +
		"\x03\x02\x02\x02\u07F9\u0181\x03\x02\x02\x02\u07FA\u07FE\x05\u019E\xD0" +
		"\x02\u07FB\u07FC\x05\u0184\xC3\x02\u07FC\u07FD\x05\u019E\xD0\x02\u07FD" +
		"\u07FF\x03\x02\x02\x02\u07FE\u07FB\x03\x02\x02\x02\u07FE\u07FF\x03\x02" +
		"\x02\x02\u07FF\u0183\x03\x02\x02\x02\u0800\u0801\t\v\x02\x02\u0801\u0185" +
		"\x03\x02\x02\x02\u0802\u0804\x05\u0112\x8A\x02\u0803\u0802\x03\x02\x02" +
		"\x02\u0803\u0804\x03\x02\x02\x02\u0804\u0805\x03\x02\x02\x02\u0805\u0806" +
		"\x07Q\x02\x02\u0806\u0809\x05\xC2b\x02\u0807\u0808\x07V\x02\x02\u0808" +
		"\u080A\x05\xC2b\x02\u0809\u0807\x03\x02\x02\x02\u0809\u080A\x03\x02\x02" +
		"\x02\u080A\u080B\x03\x02\x02\x02\u080B\u080C\x07\x8C\x02\x02\u080C\u0187" +
		"\x03\x02\x02\x02\u080D\u080F\x05\u0112\x8A\x02\u080E\u080D\x03\x02\x02" +
		"\x02\u080E\u080F\x03\x02\x02\x02\u080F\u0810\x03\x02\x02\x02\u0810\u0812" +
		"\x07R\x02\x02\u0811\u0813\x05\xC2b\x02\u0812\u0811\x03\x02\x02\x02\u0812" +
		"\u0813\x03\x02\x02\x02\u0813\u0814\x03\x02\x02\x02\u0814\u0815\x07\x8C" +
		"\x02\x02\u0815\u0189\x03\x02\x02\x02\u0816\u0817\x05\u0126\x94\x02\u0817" +
		"\u0818\x07\x05\x02\x02\u0818\u0819\x05\u0126\x94\x02\u0819\u081A\x07b" +
		"\x02\x02\u081A\u081B\x05\u0126\x94\x02\u081B\u081C\x07O\x02\x02\u081C" +
		"\u018B\x03\x02\x02\x02\u081D\u0821\x05\u0152\xAA\x02\u081E\u0821\x05\xBE" +
		"`\x02\u081F\u0821\x05\u017C\xBF\x02\u0820\u081D\x03\x02\x02\x02\u0820" +
		"\u081E\x03\x02\x02\x02\u0820\u081F\x03\x02\x02\x02\u0821\u018D\x03\x02" +
		"\x02\x02\u0822\u0825\x05\x1A\x0E\x02\u0823\u0825\x05\u0142\xA2\x02\u0824" +
		"\u0822\x03\x02\x02\x02\u0824\u0823\x03\x02\x02\x02\u0825\u018F\x03\x02" +
		"\x02\x02\u0826\u0827\x05\xE8u\x02\u0827\u0828\x07\x9A\x02\x02\u0828\u0829" +
		"\x05\u0150\xA9\x02\u0829\u082A\x07\x8C\x02\x02\u082A\u0191\x03\x02\x02" +
		"\x02\u082B\u082C\x07m\x02\x02\u082C\u082D\x05\xC2b\x02\u082D\u082E\x07" +
		"U\x02\x02\u082E\u082F\x05\u01DE\xF0\x02\u082F\u0830\x07\x85\x02\x02\u0830" +
		"\u0831\x05\u0140\xA1\x02\u0831\u0832\x05\u0194\xCB\x02\u0832\u0833\x07" +
		"\x8C\x02\x02\u0833\u0193\x03\x02\x02\x02\u0834\u0835\x05\u01FC\xFF\x02" +
		"\u0835\u0836\x07n\x02\x02\u0836\u083E\x05V,\x02\u0837\u0838\x07\x8D\x02" +
		"\x02\u0838\u0839\x05\u01FC\xFF\x02\u0839\u083A\x07n\x02\x02\u083A\u083B" +
		"\x05V,\x02\u083B\u083D\x03\x02\x02\x02\u083C\u0837\x03\x02\x02\x02\u083D" +
		"\u0840\x03\x02\x02\x02\u083E\u083C\x03\x02\x02\x02\u083E\u083F\x03\x02" +
		"\x02\x02\u083F\u0195\x03\x02\x02\x02\u0840\u083E\x03\x02\x02\x02\u0841" +
		"\u0842\x07=\x02\x02\u0842\u0843\x05\u0198\xCD\x02\u0843\u0197\x03\x02" +
		"\x02\x02\u0844\u0849\x05\u0126\x94\x02\u0845\u0846\x07\x8D\x02\x02\u0846" +
		"\u0848\x05\u0126\x94\x02\u0847\u0845\x03\x02\x02\x02\u0848\u084B\x03\x02" +
		"\x02\x02\u0849\u0847\x03\x02\x02\x02\u0849\u084A\x03\x02\x02\x02\u084A" +
		"\u0199\x03\x02\x02\x02\u084B\u0849\x03\x02\x02\x02\u084C\u084E\x05\u019C" +
		"\xCF\x02\u084D\u084C\x03\x02\x02\x02\u084E\u0851\x03\x02\x02\x02\u084F" +
		"\u084D\x03\x02\x02\x02\u084F\u0850\x03\x02\x02\x02\u0850\u019B\x03\x02" +
		"\x02\x02\u0851\u084F\x03\x02\x02\x02\u0852\u0865\x05\u01FA\xFE\x02\u0853" +
		"\u0865\x05(\x15\x02\u0854\u0865\x05\u0186\xC4\x02\u0855\u0865\x05\u01A2" +
		"\xD2\x02\u0856\u0865\x05\u01F6\xFC\x02\u0857\u0865\x05\xECw\x02\u0858" +
		"\u0865\x05P)\x02\u0859\u0865\x05\u0120\x91\x02\u085A\u0865\x05\u013A\x9E" +
		"\x02\u085B\u0865\x05\xC0a\x02\u085C\u0865\x05\u0188\xC5\x02\u085D\u085F" +
		"\x05\u0112\x8A\x02\u085E\u085D\x03\x02\x02\x02\u085E\u085F\x03\x02\x02" +
		"\x02\u085F\u0860\x03\x02\x02\x02\u0860\u0861\x07;\x02\x02\u0861\u0865" +
		"\x07\x8C\x02\x02\u0862\u0865\x05N(\x02\u0863\u0865\x05\u0166\xB4\x02\u0864" +
		"\u0852\x03\x02\x02\x02\u0864\u0853\x03\x02\x02\x02\u0864\u0854\x03\x02" +
		"\x02\x02\u0864\u0855\x03\x02\x02\x02\u0864\u0856\x03\x02\x02\x02\u0864" +
		"\u0857\x03\x02\x02\x02\u0864\u0858\x03\x02\x02\x02\u0864\u0859\x03\x02" +
		"\x02\x02\u0864\u085A\x03\x02\x02\x02\u0864\u085B\x03\x02\x02\x02\u0864" +
		"\u085C\x03\x02\x02\x02\u0864\u085E\x03\x02\x02\x02\u0864\u0862\x03\x02" +
		"\x02\x02\u0864\u0863\x03\x02\x02\x02\u0865\u019D\x03\x02\x02\x02\u0866" +
		"\u086A\x05\u01AC\xD7\x02\u0867\u0868\x05\u01A0\xD1\x02\u0868\u0869\x05" +
		"\u01AC\xD7\x02\u0869\u086B\x03\x02\x02\x02\u086A\u0867\x03\x02\x02\x02" +
		"\u086A\u086B\x03\x02\x02\x02\u086B\u019F\x03\x02\x02\x02\u086C\u086D\t" +
		"\f\x02\x02\u086D\u01A1\x03\x02\x02\x02\u086E\u0870\x05\u0112\x8A\x02\u086F" +
		"\u086E\x03\x02\x02\x02\u086F\u0870\x03\x02\x02\x02\u0870\u0871\x03\x02" +
		"\x02\x02\u0871\u0872\x05\u01DE\xF0\x02\u0872\u0874\x07\x85\x02\x02\u0873" +
		"\u0875\x05\x8AF\x02\u0874\u0873\x03\x02\x02\x02\u0874\u0875\x03\x02\x02" +
		"\x02\u0875\u0876\x03\x02\x02\x02\u0876\u0877\x05\u01FC\xFF\x02\u0877\u0878" +
		"\x07\x8C\x02\x02\u0878\u01A3\x03\x02\x02\x02\u0879\u087A\x07X\x02\x02" +
		"\u087A\u087B\x05\xEAv\x02\u087B\u087C\x07\x93\x02\x02\u087C\u087E\x05" +
		"\u01DA\xEE\x02\u087D\u087F\x05\u01A6\xD4\x02\u087E\u087D\x03\x02\x02\x02" +
		"\u087E\u087F\x03\x02\x02\x02\u087F\u0882\x03\x02\x02\x02\u0880\u0881\x07" +
		"\x89\x02\x02\u0881\u0883\x05\xC2b";
	private static readonly _serializedATNSegment4: string =
		"\x02\u0882\u0880\x03\x02\x02\x02\u0882\u0883\x03\x02\x02\x02\u0883\u0884" +
		"\x03\x02\x02\x02\u0884\u0885\x07\x8C\x02\x02\u0885\u01A5\x03\x02\x02\x02" +
		"\u0886\u0887\t\r\x02\x02\u0887\u01A7\x03\x02\x02\x02\u0888\u088D\x05\u0126" +
		"\x94\x02\u0889\u088A\x07\x8D\x02\x02\u088A\u088C\x05\u0126\x94\x02\u088B" +
		"\u0889\x03\x02\x02\x02\u088C\u088F\x03\x02\x02\x02\u088D\u088B\x03\x02" +
		"\x02\x02\u088D\u088E\x03\x02\x02\x02\u088E\u0893\x03\x02\x02\x02\u088F" +
		"\u088D\x03\x02\x02\x02\u0890\u0893\x07@\x02\x02\u0891\u0893\x07\b\x02" +
		"\x02\u0892\u0888\x03\x02\x02\x02\u0892\u0890\x03\x02\x02\x02\u0892\u0891" +
		"\x03\x02\x02\x02\u0893\u01A9\x03\x02\x02\x02\u0894\u089D\x07\x91\x02\x02" +
		"\u0895\u089A\x05\u0126\x94\x02\u0896\u0897\x07\x8D\x02\x02\u0897\u0899" +
		"\x05\u0126\x94\x02\u0898\u0896\x03\x02\x02\x02\u0899\u089C\x03\x02\x02" +
		"\x02\u089A\u0898\x03\x02\x02\x02\u089A\u089B\x03\x02\x02\x02\u089B\u089E" +
		"\x03\x02\x02\x02\u089C\u089A\x03\x02\x02\x02\u089D\u0895\x03\x02\x02\x02" +
		"\u089D\u089E\x03\x02\x02\x02\u089E\u08A1\x03\x02\x02\x02\u089F\u08A0\x07" +
		"R\x02\x02\u08A0\u08A2\x05\u0126\x94\x02\u08A1\u089F\x03\x02\x02\x02\u08A1" +
		"\u08A2\x03\x02\x02\x02\u08A2\u08A3\x03\x02\x02\x02\u08A3\u08A4\x07\x92" +
		"\x02\x02\u08A4\u01AB\x03\x02\x02\x02\u08A5\u08A7\t\x0E\x02\x02\u08A6\u08A5" +
		"\x03\x02\x02\x02\u08A6\u08A7\x03\x02\x02\x02\u08A7\u08A8\x03\x02\x02\x02" +
		"\u08A8\u08AE\x05\u01E0\xF1\x02\u08A9\u08AA\x05\x0E\b\x02\u08AA\u08AB\x05" +
		"\u01E0\xF1\x02\u08AB\u08AD\x03\x02\x02\x02\u08AC\u08A9\x03\x02\x02\x02" +
		"\u08AD\u08B0\x03\x02\x02\x02\u08AE\u08AC\x03\x02\x02\x02\u08AE\u08AF\x03" +
		"\x02\x02\x02\u08AF\u01AD\x03\x02\x02\x02\u08B0\u08AE\x03\x02\x02\x02\u08B1" +
		"\u08B3\x05\u0112\x8A\x02\u08B2\u08B1\x03\x02\x02\x02\u08B2\u08B3\x03\x02" +
		"\x02\x02\u08B3\u08B4\x03\x02\x02\x02\u08B4\u08B5\x05\u01AC\xD7\x02\u08B5" +
		"\u08B6\x07\x84\x02\x02\u08B6\u08B8\x05\u01AC\xD7\x02\u08B7\u08B9\x05\u01EA" +
		"\xF6\x02\u08B8\u08B7\x03\x02\x02\x02\u08B8\u08B9\x03\x02\x02\x02\u08B9" +
		"\u08BA\x03\x02\x02\x02\u08BA\u08BB\x07\x8C\x02\x02\u08BB\u01AF\x03\x02" +
		"\x02\x02\u08BC\u08BD\x07n\x02\x02\u08BD\u08BE\x05V,\x02\u08BE\u08BF\x07" +
		"\x87\x02\x02\u08BF\u08C0\x05\u01BA\xDE\x02\u08C0\u01B1\x03\x02\x02\x02" +
		"\u08C1\u08C3\x05\u0112\x8A\x02\u08C2\u08C1\x03\x02\x02\x02\u08C2\u08C3" +
		"\x03\x02\x02\x02\u08C3\u08C4\x03\x02\x02\x02\u08C4\u08C5\x07\x14\x02\x02" +
		"\u08C5\u08C6\x05\xC2b\x02\u08C6\u08C8\x07j\x02\x02\u08C7\u08C9\x05\u01B0" +
		"\xD9\x02\u08C8\u08C7\x03\x02\x02\x02\u08C9\u08CA\x03\x02\x02\x02\u08CA" +
		"\u08C8\x03\x02\x02\x02\u08CA\u08CB\x03\x02\x02\x02\u08CB\u08CC\x03\x02" +
		"\x02\x02\u08CC\u08CD\x07\x1A\x02\x02\u08CD\u08CF\x07\x14\x02\x02\u08CE" +
		"\u08D0\x05\xE8u\x02\u08CF\u08CE\x03\x02\x02\x02\u08CF\u08D0\x03\x02\x02" +
		"\x02\u08D0\u08D1\x03\x02\x02\x02\u08D1\u08D2\x07\x8C\x02\x02\u08D2\u01B3" +
		"\x03\x02\x02\x02\u08D3\u08D5\x05\u0112\x8A\x02\u08D4\u08D3\x03\x02\x02" +
		"\x02\u08D4\u08D5\x03\x02\x02\x02\u08D5\u08D6\x03\x02\x02\x02\u08D6\u08D7" +
		"\x07&\x02\x02\u08D7\u08D8\x05l7\x02\u08D8\u08D9\x07j\x02\x02\u08D9\u08E1" +
		"\x05\u01BA\xDE\x02\u08DA\u08DB\x07\x1D\x02\x02\u08DB\u08DC\x05l7\x02\u08DC" +
		"\u08DD\x07j\x02\x02\u08DD\u08DE\x05\u01BA\xDE\x02\u08DE\u08E0\x03\x02" +
		"\x02\x02\u08DF\u08DA\x03\x02\x02\x02\u08E0\u08E3\x03\x02\x02\x02\u08E1" +
		"\u08DF\x03\x02\x02\x02\u08E1\u08E2\x03\x02\x02\x02\u08E2\u08E6\x03\x02" +
		"\x02\x02\u08E3\u08E1\x03\x02\x02\x02\u08E4\u08E5\x07\x1C\x02\x02\u08E5" +
		"\u08E7\x05\u01BA\xDE\x02\u08E6\u08E4\x03\x02\x02\x02\u08E6\u08E7\x03\x02" +
		"\x02\x02\u08E7\u08E8\x03\x02\x02\x02\u08E8\u08E9\x07\x1A\x02\x02\u08E9" +
		"\u08EB\x07j\x02\x02\u08EA\u08EC\x05\xE8u\x02\u08EB\u08EA\x03\x02\x02\x02" +
		"\u08EB\u08EC\x03\x02\x02\x02\u08EC\u08ED\x03\x02\x02\x02\u08ED\u08EE\x07" +
		"\x8C\x02\x02\u08EE\u01B5\x03\x02\x02\x02\u08EF\u08F1\x05\u0112\x8A\x02" +
		"\u08F0\u08EF\x03\x02\x02\x02\u08F0\u08F1\x03\x02\x02\x02\u08F1\u08F2\x03" +
		"\x02\x02\x02\u08F2\u08F4\x07G\x02\x02\u08F3\u08F5\x07+\x02\x02\u08F4\u08F3" +
		"\x03\x02\x02\x02\u08F4\u08F5\x03\x02\x02\x02\u08F5\u08F6\x03\x02\x02\x02" +
		"\u08F6\u08F7\x05\u0160\xB1\x02\u08F7\u08F8\x07\x0E\x02\x02\u08F8\u08F9" +
		"\x05\u0162\xB2\x02\u08F9\u08FA\x07\x1A\x02\x02\u08FA\u08FC\x07G\x02\x02" +
		"\u08FB\u08FD\x05\xE8u\x02\u08FC\u08FB\x03\x02\x02\x02\u08FC\u08FD\x03" +
		"\x02\x02\x02\u08FD\u08FE\x03\x02\x02\x02\u08FE\u08FF\x07\x8C\x02\x02\u08FF" +
		"\u01B7\x03\x02\x02\x02\u0900\u090A\x05\u01AE\xD8\x02\u0901\u090A\x05\u01B4" +
		"\xDB\x02\u0902\u090A\x05\u01B2\xDA\x02\u0903\u090A\x05\u01B6\xDC\x02\u0904" +
		"\u0906\x05\u0112\x8A\x02\u0905\u0904\x03\x02\x02\x02\u0905\u0906\x03\x02" +
		"\x02\x02\u0906\u0907\x03\x02\x02\x02\u0907\u0908\x07;\x02\x02\u0908\u090A" +
		"\x07\x8C\x02\x02\u0909\u0900\x03\x02\x02\x02\u0909\u0901\x03\x02\x02\x02" +
		"\u0909\u0902\x03\x02\x02\x02\u0909\u0903\x03\x02\x02\x02\u0909\u0905\x03" +
		"\x02\x02\x02\u090A\u01B9\x03\x02\x02\x02\u090B\u090D\x05\u01B8\xDD\x02" +
		"\u090C\u090B\x03\x02\x02\x02\u090D\u0910\x03\x02\x02\x02\u090E\u090C\x03" +
		"\x02\x02\x02\u090E\u090F\x03\x02\x02\x02\u090F\u01BB\x03\x02\x02\x02\u0910" +
		"\u090E\x03\x02\x02\x02\u0911\u0912\x07[\x02\x02\u0912\u0913\x05\u01AC" +
		"\xD7\x02\u0913\u0914\x07\x8D\x02\x02\u0914\u0915\x05\u01AC\xD7\x02\u0915" +
		"\u0919\x03\x02\x02\x02\u0916\u0917\x078\x02\x02\u0917\u0919\x05\u01AC" +
		"\xD7\x02\u0918\u0911\x03\x02\x02\x02\u0918\u0916\x03\x02\x02\x02\u0919" +
		"\u01BD\x03\x02\x02\x02\u091A\u091B\x07I\x02\x02\u091B\u091C\x05\xEAv\x02" +
		"\u091C\u091D\x07\x93\x02\x02\u091D\u091E\x05\u01DA\xEE\x02\u091E\u091F" +
		"\x05\u01BC\xDF\x02\u091F\u0920\x07\x8C\x02\x02\u0920\u01BF\x03\x02\x02" +
		"\x02\u0921\u0922\x07.\x02\x02\u0922\u0923\x05\u0176\xBC\x02\u0923\u0924" +
		"\x07m\x02\x02\u0924\u0925\x05\xC2b\x02\u0925\u0926\x07\x8C\x02\x02\u0926" +
		"\u01C1\x03\x02\x02\x02\u0927\u0928\x07^\x02\x02\u0928\u0929\x05\xE8u\x02" +
		"\u0929\u092A\x07+\x02\x02\u092A\u092B\x05\u01C4\xE3\x02\u092B\u092C\x07" +
		"\x8C\x02\x02\u092C\u01C3\x03\x02\x02\x02\u092D\u092F\x05\u0126\x94\x02" +
		"\u092E\u0930\x05\xEEx\x02\u092F\u092E\x03\x02\x02\x02\u092F\u0930\x03" +
		"\x02\x02\x02\u0930\u0937\x03\x02\x02\x02\u0931\u0932\x07d\x02\x02\u0932" +
		"\u0933\x05\xC2b\x02\u0933\u0934\x07\x05\x02\x02\u0934\u0935\x05\xC2b\x02" +
		"\u0935\u0936\x07b\x02\x02\u0936\u0938\x03\x02\x02\x02\u0937\u0931\x03" +
		"\x02\x02\x02\u0937\u0938\x03\x02\x02\x02\u0938\u01C5\x03\x02\x02\x02\u0939" +
		"\u093A\x05\u01D0\xE9\x02\u093A\u093B\x07+\x02\x02\u093B\u093C\x05\u01CC" +
		"\xE7\x02\u093C\u093D\x07\x0E\x02\x02\u093D\u093E\x05\u01D6\xEC\x02\u093E" +
		"\u0940\x07\x1A\x02\x02\u093F\u0941\x05\u01CE\xE8\x02\u0940\u093F\x03\x02" +
		"\x02\x02\u0940\u0941\x03\x02\x02\x02\u0941\u0943\x03\x02\x02\x02\u0942" +
		"\u0944\x05\x90I\x02\u0943\u0942\x03\x02\x02\x02\u0943\u0944\x03\x02\x02" +
		"\x02\u0944\u0945\x03\x02\x02\x02\u0945\u0946\x07\x8C\x02\x02\u0946\u01C7" +
		"\x03\x02\x02\x02\u0947\u0948\x05\u01D0\xE9\x02\u0948\u0949\x07\x8C\x02" +
		"\x02\u0949\u01C9\x03\x02\x02\x02\u094A\u0958\x05\u01C8\xE5\x02\u094B\u0958" +
		"\x05\u01C6\xE4\x02\u094C\u0958\x05\u01EC\xF7\x02\u094D\u0958\x05\u01D8" +
		"\xED\x02\u094E\u0958\x05~@\x02\u094F\u0958\x05\u01F8\xFD\x02\u0950\u0958" +
		"\x05\xC6d\x02\u0951\u0958\x05\x12\n\x02\u0952\u0958\x05.\x18\x02\u0953" +
		"\u0958\x052\x1A\x02\u0954\u0958\x05\u01F4\xFB\x02\u0955\u0958\x05\xE4" +
		"s\x02\u0956\u0958\x05\xE2r\x02\u0957\u094A\x03\x02\x02\x02\u0957\u094B" +
		"\x03\x02\x02\x02\u0957\u094C\x03\x02\x02\x02\u0957\u094D\x03\x02\x02\x02" +
		"\u0957\u094E\x03\x02\x02\x02\u0957\u094F\x03\x02\x02\x02\u0957\u0950\x03" +
		"\x02\x02\x02\u0957\u0951\x03\x02\x02\x02\u0957\u0952\x03\x02\x02\x02\u0957" +
		"\u0953\x03\x02\x02\x02\u0957\u0954\x03\x02\x02\x02\u0957\u0955\x03\x02" +
		"\x02\x02\u0957\u0956\x03\x02\x02\x02\u0958\u01CB\x03\x02\x02\x02\u0959" +
		"\u095B\x05\u01CA\xE6\x02\u095A\u0959\x03\x02\x02\x02\u095B\u095E\x03\x02" +
		"\x02\x02\u095C\u095A\x03\x02\x02\x02\u095C\u095D\x03\x02\x02\x02\u095D" +
		"\u01CD\x03\x02\x02\x02\u095E\u095C\x03\x02\x02\x02\u095F\u0960\t\x0F\x02" +
		"\x02\u0960\u01CF\x03\x02\x02\x02\u0961\u0964\x05\u01D2\xEA\x02\u0962\u0964" +
		"\x05\u01D4\xEB\x02\u0963\u0961\x03\x02\x02\x02\u0963\u0962\x03\x02\x02" +
		"\x02\u0964\u01D1\x03\x02\x02\x02\u0965\u0966\x07F\x02\x02\u0966\u096B" +
		"\x05\x90I\x02\u0967\u0968\x07\x8F\x02\x02\u0968\u0969\x05\xCEh\x02\u0969" +
		"\u096A\x07\x90\x02\x02\u096A\u096C\x03\x02\x02\x02\u096B\u0967\x03\x02" +
		"\x02\x02\u096B\u096C\x03\x02\x02\x02\u096C\u01D3\x03\x02\x02\x02\u096D" +
		"\u096F\t\x10\x02\x02\u096E\u096D\x03\x02\x02\x02\u096E\u096F\x03\x02\x02" +
		"\x02\u096F\u0970\x03\x02\x02\x02\u0970\u0971\x07!\x02\x02\u0971\u0976" +
		"\x05\x90I\x02\u0972\u0973\x07\x8F\x02\x02\u0973\u0974\x05\xCEh\x02\u0974" +
		"\u0975\x07\x90\x02\x02\u0975\u0977\x03\x02\x02\x02\u0976\u0972\x03\x02" +
		"\x02\x02\u0976\u0977\x03\x02\x02\x02\u0977\u0978\x03\x02\x02\x02\u0978" +
		"\u0979\x07R\x02\x02\u0979\u097A\x05\u01DA\xEE\x02\u097A\u01D5\x03\x02" +
		"\x02\x02\u097B\u097D\x05\u019C\xCF\x02\u097C\u097B\x03\x02\x02\x02\u097D" +
		"\u0980\x03\x02\x02\x02\u097E\u097C\x03\x02\x02\x02\u097E\u097F\x03\x02" +
		"\x02\x02\u097F\u01D7\x03\x02\x02\x02\u0980\u097E\x03\x02\x02\x02\u0981" +
		"\u0982\x07_\x02\x02\u0982\u0983\x05\xE8u\x02\u0983\u0984\x07+\x02\x02" +
		"\u0984\u0985\x05\u01DA\xEE\x02\u0985\u0986\x07\x8C\x02\x02\u0986\u01D9" +
		"\x03\x02\x02\x02\u0987\u0989\x05\u012A\x96\x02\u0988\u098A\x05\u012A\x96" +
		"\x02\u0989\u0988\x03\x02\x02\x02\u0989\u098A\x03\x02\x02\x02\u098A\u098C" +
		"\x03\x02\x02\x02\u098B\u098D\x05\x84C\x02\u098C\u098B\x03\x02\x02\x02" +
		"\u098C\u098D\x03\x02\x02\x02\u098D\u098F\x03\x02\x02\x02\u098E\u0990\x05" +
		"\u01EA\xF6\x02\u098F\u098E\x03\x02\x02\x02\u098F\u0990\x03\x02\x02\x02" +
		"\u0990\u01DB\x03\x02\x02\x02\u0991\u0996\x05\xE8u\x02\u0992\u0996\x07" +
		"\x80\x02\x02\u0993\u0996\x07\x81\x02\x02\u0994\u0996\x07\b\x02\x02\u0995" +
		"\u0991\x03\x02\x02\x02\u0995\u0992\x03\x02\x02\x02\u0995\u0993\x03\x02" +
		"\x02\x02\u0995\u0994\x03\x02\x02\x02\u0996\u01DD\x03\x02\x02\x02\u0997" +
		"\u099A\x05\u0126\x94\x02\u0998\u099A\x05\x10\t\x02\u0999\u0997\x03\x02" +
		"\x02\x02\u0999\u0998\x03\x02\x02\x02\u099A\u01DF\x03\x02\x02\x02\u099B" +
		"\u09A1\x05\xC4c\x02\u099C\u099D\x05\u0124\x93\x02\u099D\u099E\x05\xC4" +
		"c\x02\u099E\u09A0\x03\x02\x02\x02\u099F\u099C\x03\x02\x02\x02\u09A0\u09A3" +
		"\x03\x02\x02\x02\u09A1\u099F\x03\x02\x02\x02\u09A1\u09A2\x03\x02\x02\x02" +
		"\u09A2\u01E1\x03\x02\x02\x02\u09A3\u09A1\x03\x02\x02\x02\u09A4\u09A7\x05" +
		"\u0126\x94\x02\u09A5\u09A6\x07c\x02\x02\u09A6\u09A8\x05\u0126\x94\x02" +
		"\u09A7\u09A5\x03\x02\x02\x02\u09A7\u09A8\x03\x02\x02\x02\u09A8\u01E3\x03" +
		"\x02\x02\x02\u09A9\u09AA\x07`\x02\x02\u09AA\u09AB\x05\xEAv\x02\u09AB\u09AC" +
		"\x07\x93\x02\x02\u09AC\u09AD\x05\u01C4\xE3\x02\u09AD\u09AE\x07\x8C\x02" +
		"\x02\u09AE\u01E5\x03\x02\x02\x02\u09AF\u09B1\x05\xEAv\x02\u09B0\u09B2" +
		"\x05\u01EA\xF6\x02\u09B1\u09B0\x03\x02\x02\x02\u09B1\u09B2\x03\x02\x02" +
		"\x02\u09B2\u09B5\x03\x02\x02\x02\u09B3\u09B4\x07\x89\x02\x02\u09B4\u09B6" +
		"\x05\xC2b\x02\u09B5\u09B3\x03\x02\x02\x02\u09B5\u09B6\x03\x02\x02\x02" +
		"\u09B6\u09B7\x03\x02\x02\x02\u09B7\u09B8\x07b\x02\x02\u09B8\u01E7\x03" +
		"\x02\x02\x02\u09B9\u09BA\x07 \x02\x02\u09BA\u09BB\x05\xC2b\x02\u09BB\u01E9" +
		"\x03\x02\x02\x02\u09BC\u09BD\x07d\x02\x02\u09BD\u09BE\x05\xC2b\x02\u09BE" +
		"\u01EB\x03\x02\x02\x02\u09BF\u09C0\x07f\x02\x02\u09C0\u09C3\x05\xE8u\x02" +
		"\u09C1\u09C2\x07+\x02\x02\u09C2\u09C4\x05\u01EE\xF8\x02\u09C3\u09C1\x03" +
		"\x02\x02\x02\u09C3\u09C4\x03\x02\x02\x02\u09C4\u09C5\x03\x02\x02\x02\u09C5" +
		"\u09C6\x07\x8C\x02\x02\u09C6\u01ED\x03\x02\x02\x02\u09C7\u09CC\x05\u018C" +
		"\xC7\x02\u09C8\u09CC\x05b2\x02\u09C9\u09CC\x05\x04\x03\x02\u09CA\u09CC" +
		"\x05\xCCg\x02\u09CB\u09C7\x03\x02\x02\x02\u09CB\u09C8\x03\x02\x02\x02" +
		"\u09CB\u09C9\x03\x02\x02\x02\u09CB\u09CA\x03\x02\x02\x02\u09CC\u01EF\x03" +
		"\x02\x02\x02\u09CD\u09CE\x07\v\x02\x02\u09CE\u09CF\x07\x8F\x02\x02\u09CF" +
		"\u09D4\x05\xF2z\x02\u09D0\u09D1\x07\x8D\x02\x02\u09D1\u09D3\x05\xF2z\x02" +
		"\u09D2\u09D0\x03\x02\x02\x02\u09D3\u09D6\x03\x02\x02\x02\u09D4\u09D2\x03" +
		"\x02\x02\x02\u09D4\u09D5\x03\x02\x02\x02\u09D5\u09D7\x03\x02\x02\x02\u09D6" +
		"\u09D4\x03\x02\x02\x02\u09D7\u09D8\x07\x90\x02\x02\u09D8\u09D9\x07<\x02" +
		"\x02\u09D9\u09DA\x05\u01DA\xEE\x02\u09DA\u01F1\x03\x02\x02\x02\u09DB\u09DC" +
		"\x07\v\x02\x02\u09DC\u09DD\x07\x8F\x02\x02\u09DD\u09E2\x05\xF2z\x02\u09DE" +
		"\u09DF\x07\x8D\x02\x02\u09DF\u09E1\x05\xF2z\x02\u09E0\u09DE\x03\x02\x02" +
		"\x02\u09E1\u09E4\x03\x02\x02\x02\u09E2\u09E0\x03\x02\x02\x02\u09E2\u09E3" +
		"\x03\x02\x02\x02\u09E3\u09E5\x03\x02\x02\x02\u09E4\u09E2\x03\x02\x02\x02" +
		"\u09E5\u09E6\x07\x90\x02\x02\u09E6\u09E7\x07<\x02\x02\u09E7\u09E8\x05" +
		"\u01C4\xE3\x02\u09E8\u01F3\x03\x02\x02\x02\u09E9\u09EA\x07j\x02\x02\u09EA" +
		"\u09EF\x05\u012A\x96\x02\u09EB\u09EC\x07\x8D\x02\x02\u09EC\u09EE\x05\u012A" +
		"\x96\x02\u09ED\u09EB\x03\x02\x02\x02\u09EE\u09F1\x03\x02\x02\x02\u09EF" +
		"\u09ED\x03\x02\x02\x02\u09EF\u09F0\x03\x02\x02\x02\u09F0\u09F2\x03\x02" +
		"\x02\x02\u09F1\u09EF\x03\x02\x02\x02\u09F2\u09F3\x07\x8C\x02\x02\u09F3" +
		"\u01F5\x03\x02\x02\x02\u09F4\u09F6\x05\u0112\x8A\x02\u09F5\u09F4\x03\x02" +
		"\x02\x02\u09F5\u09F6\x03\x02\x02\x02\u09F6\u09F7\x03\x02\x02\x02\u09F7" +
		"\u09F8\x05\u01DE\xF0\x02\u09F8\u09F9\x07\x89\x02\x02\u09F9\u09FA\x05\xC2" +
		"b\x02\u09FA\u09FB\x07\x8C\x02\x02\u09FB\u01F7\x03\x02\x02\x02\u09FC\u09FE" +
		"\x07W\x02\x02\u09FD\u09FC\x03\x02\x02\x02\u09FD\u09FE\x03\x02\x02\x02" +
		"\u09FE\u09FF\x03\x02\x02\x02\u09FF\u0A00\x07k\x02\x02\u0A00\u0A01\x05" +
		"\xEAv\x02\u0A01\u0A02\x07\x93\x02\x02\u0A02\u0A05\x05\u01DA\xEE\x02\u0A03" +
		"\u0A04\x07\x89\x02\x02\u0A04\u0A06\x05\xC2b\x02\u0A05\u0A03\x03\x02\x02" +
		"\x02\u0A05\u0A06\x03\x02\x02\x02\u0A06\u0A07\x03\x02\x02\x02\u0A07\u0A08" +
		"\x07\x8C\x02\x02\u0A08\u01F9\x03\x02\x02\x02\u0A09\u0A0B\x05\u0112\x8A" +
		"\x02\u0A0A\u0A09\x03\x02\x02\x02\u0A0A\u0A0B\x03\x02\x02\x02\u0A0B\u0A0C" +
		"\x03\x02\x02\x02\u0A0C\u0A0E\x07l\x02\x02\u0A0D\u0A0F\x05\u0196\xCC\x02" +
		"\u0A0E\u0A0D\x03\x02\x02\x02\u0A0E\u0A0F\x03\x02\x02\x02\u0A0F\u0A11\x03" +
		"\x02\x02\x02\u0A10\u0A12\x05n8\x02\u0A11\u0A10\x03\x02\x02\x02\u0A11\u0A12" +
		"\x03\x02\x02\x02\u0A12\u0A14\x03\x02\x02\x02\u0A13\u0A15\x05\u01E8\xF5" +
		"\x02\u0A14\u0A13\x03\x02\x02\x02\u0A14\u0A15\x03\x02\x02\x02\u0A15\u0A16" +
		"\x03\x02\x02\x02\u0A16\u0A17\x07\x8C\x02\x02\u0A17\u01FB\x03\x02\x02\x02" +
		"\u0A18\u0A1D\x05\u01FE\u0100\x02\u0A19\u0A1A\x07\x8D\x02\x02\u0A1A\u0A1C" +
		"\x05\u01FE\u0100\x02\u0A1B\u0A19\x03\x02\x02\x02\u0A1C\u0A1F\x03\x02\x02" +
		"\x02\u0A1D\u0A1B\x03\x02\x02\x02\u0A1D\u0A1E\x03\x02\x02\x02\u0A1E\u0A22" +
		"\x03\x02\x02\x02\u0A1F\u0A1D\x03\x02\x02\x02\u0A20\u0A22\x07g\x02\x02" +
		"\u0A21\u0A18\x03\x02\x02\x02\u0A21\u0A20\x03\x02\x02\x02\u0A22\u01FD\x03" +
		"\x02\x02\x02\u0A23\u0A26\x05\xC2b\x02\u0A24\u0A25\x07\x06\x02\x02\u0A25" +
		"\u0A27\x05\xC2b\x02\u0A26\u0A24\x03\x02\x02\x02\u0A26\u0A27\x03\x02\x02" +
		"\x02\u0A27\u01FF\x03\x02\x02\x02\u0128\u0207\u020B\u0211\u021B\u0225\u022E" +
		"\u0233\u023A\u023E\u0243\u024F\u0252\u0259\u025F\u0263\u0267\u026A\u0271" +
		"\u0276\u027B\u027F\u0285\u0289\u028C\u0294\u029D\u02AC\u02BB\u02BE\u02C1" +
		"\u02C8\u02CE\u02EB\u02F0\u02F7\u02F9\u02FF\u0301\u0308\u030B\u0313\u0316" +
		"\u031F\u0326\u032B\u032E\u0334\u033F\u0347\u034B\u034F\u0354\u035C\u0361" +
		"\u036E\u0375\u037D\u0380\u0389\u038C\u038F\u0394\u039B\u039E\u03A8\u03AC" +
		"\u03AF\u03B2\u03B8\u03BC\u03BF\u03C3\u03C8\u03CB\u03D1\u03D4\u03D8\u03EA" +
		"\u03EC\u03F7\u03FA\u0401\u0406\u040B\u0418\u0428\u042D\u0432\u0437\u043A" +
		"\u043F\u0449\u0455\u045A\u046D\u0472\u0478\u047F\u0489\u048D\u0490\u04A8" +
		"\u04AD\u04B2\u04B5\u04B8\u04BF\u04C4\u04CD\u04D2\u04D8\u04DC\u04E4\u04EA" +
		"\u04EE\u04F2\u04FC\u0502\u0508\u050F\u0517\u0528\u0530\u053A\u053E\u0543" +
		"\u0549\u0551\u055E\u0569\u0570\u058E\u0592\u059F\u05A4\u05A9\u05B3\u05BA" +
		"\u05C1\u05CA\u05CE\u05D5\u05DA\u05DD\u05E2\u05E7\u05EF\u05FD\u0605\u060D" +
		"\u0614\u0619\u061E\u0622\u0626\u062C\u0630\u0634\u063C\u0641\u0646\u064C" +
		"\u0657\u065E\u0667\u066D\u0670\u0677\u0681\u0686\u068D\u0694\u069B\u06A6" +
		"\u06AE\u06B8\u06BF\u06C3\u06C7\u06CD\u06D5\u06D8\u06DB\u06E5\u06E8\u06F7" +
		"\u06FC\u0705\u0708\u071F\u0724\u0734\u073A\u0753\u0758\u0766\u076B\u0771" +
		"\u0779\u077C\u078E\u0793\u0797\u079A\u07A1\u07A4\u07AB\u07AF\u07B6\u07C0" +
		"\u07C5\u07CC\u07D1\u07D9\u07DF\u07E8\u07ED\u07F3\u07F8\u07FE\u0803\u0809" +
		"\u080E\u0812\u0820\u0824\u083E\u0849\u084F\u085E\u0864\u086A\u086F\u0874" +
		"\u087E\u0882\u088D\u0892\u089A\u089D\u08A1\u08A6\u08AE\u08B2\u08B8\u08C2" +
		"\u08CA\u08CF\u08D4\u08E1\u08E6\u08EB\u08F0\u08F4\u08FC\u0905\u0909\u090E" +
		"\u0918\u092F\u0937\u0940\u0943\u0957\u095C\u0963\u096B\u096E\u0976\u097E" +
		"\u0989\u098C\u098F\u0995\u0999\u09A1\u09A7\u09B1\u09B5\u09C3\u09CB\u09D4" +
		"\u09E2\u09EF\u09F5\u09FD\u0A05\u0A0A\u0A0E\u0A11\u0A14\u0A1D\u0A21\u0A26";
	public static readonly _serializedATN: string = Utils.join(
		[
			vhdlParser._serializedATNSegment0,
			vhdlParser._serializedATNSegment1,
			vhdlParser._serializedATNSegment2,
			vhdlParser._serializedATNSegment3,
			vhdlParser._serializedATNSegment4,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!vhdlParser.__ATN) {
			vhdlParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(vhdlParser._serializedATN));
		}

		return vhdlParser.__ATN;
	}

}

export class Abstract_literalContext extends ParserRuleContext {
	public INTEGER(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.INTEGER, 0); }
	public REAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.REAL_LITERAL, 0); }
	public BASE_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BASE_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_abstract_literal; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAbstract_literal) {
			return visitor.visitAbstract_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Access_type_definitionContext extends ParserRuleContext {
	public ACCESS(): TerminalNode { return this.getToken(vhdlParser.ACCESS, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_access_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAccess_type_definition) {
			return visitor.visitAccess_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Across_aspectContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public ACROSS(): TerminalNode { return this.getToken(vhdlParser.ACROSS, 0); }
	public tolerance_aspect(): Tolerance_aspectContext | undefined {
		return this.tryGetRuleContext(0, Tolerance_aspectContext);
	}
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_across_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAcross_aspect) {
			return visitor.visitAcross_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Actual_designatorContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OPEN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_actual_designator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitActual_designator) {
			return visitor.visitActual_designator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Actual_parameter_partContext extends ParserRuleContext {
	public association_list(): Association_listContext {
		return this.getRuleContext(0, Association_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_actual_parameter_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitActual_parameter_part) {
			return visitor.visitActual_parameter_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Actual_partContext extends ParserRuleContext {
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public actual_designator(): Actual_designatorContext {
		return this.getRuleContext(0, Actual_designatorContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_actual_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitActual_part) {
			return visitor.visitActual_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Adding_operatorContext extends ParserRuleContext {
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.MINUS, 0); }
	public AMPERSAND(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.AMPERSAND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_adding_operator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAdding_operator) {
			return visitor.visitAdding_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggregateContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public element_association(): Element_associationContext[];
	public element_association(i: number): Element_associationContext;
	public element_association(i?: number): Element_associationContext | Element_associationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Element_associationContext);
		} else {
			return this.getRuleContext(i, Element_associationContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_aggregate; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAggregate) {
			return visitor.visitAggregate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Alias_declarationContext extends ParserRuleContext {
	public ALIAS(): TerminalNode { return this.getToken(vhdlParser.ALIAS, 0); }
	public alias_designator(): Alias_designatorContext {
		return this.getRuleContext(0, Alias_designatorContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.COLON, 0); }
	public alias_indication(): Alias_indicationContext | undefined {
		return this.tryGetRuleContext(0, Alias_indicationContext);
	}
	public signature(): SignatureContext | undefined {
		return this.tryGetRuleContext(0, SignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_alias_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAlias_declaration) {
			return visitor.visitAlias_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Alias_designatorContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public CHARACTER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CHARACTER_LITERAL, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_alias_designator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAlias_designator) {
			return visitor.visitAlias_designator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Alias_indicationContext extends ParserRuleContext {
	public subnature_indication(): Subnature_indicationContext | undefined {
		return this.tryGetRuleContext(0, Subnature_indicationContext);
	}
	public subtype_indication(): Subtype_indicationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_alias_indication; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAlias_indication) {
			return visitor.visitAlias_indication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AllocatorContext extends ParserRuleContext {
	public NEW(): TerminalNode { return this.getToken(vhdlParser.NEW, 0); }
	public qualified_expression(): Qualified_expressionContext | undefined {
		return this.tryGetRuleContext(0, Qualified_expressionContext);
	}
	public subtype_indication(): Subtype_indicationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_allocator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAllocator) {
			return visitor.visitAllocator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Architecture_bodyContext extends ParserRuleContext {
	public ARCHITECTURE(): TerminalNode[];
	public ARCHITECTURE(i: number): TerminalNode;
	public ARCHITECTURE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.ARCHITECTURE);
		} else {
			return this.getToken(vhdlParser.ARCHITECTURE, i);
		}
	}
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public architecture_declarative_part(): Architecture_declarative_partContext {
		return this.getRuleContext(0, Architecture_declarative_partContext);
	}
	public BEGIN(): TerminalNode { return this.getToken(vhdlParser.BEGIN, 0); }
	public architecture_statement_part(): Architecture_statement_partContext {
		return this.getRuleContext(0, Architecture_statement_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_architecture_body; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitArchitecture_body) {
			return visitor.visitArchitecture_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Architecture_declarative_partContext extends ParserRuleContext {
	public block_declarative_item(): Block_declarative_itemContext[];
	public block_declarative_item(i: number): Block_declarative_itemContext;
	public block_declarative_item(i?: number): Block_declarative_itemContext | Block_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Block_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Block_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_architecture_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitArchitecture_declarative_part) {
			return visitor.visitArchitecture_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Architecture_statementContext extends ParserRuleContext {
	public block_statement(): Block_statementContext | undefined {
		return this.tryGetRuleContext(0, Block_statementContext);
	}
	public process_statement(): Process_statementContext | undefined {
		return this.tryGetRuleContext(0, Process_statementContext);
	}
	public concurrent_procedure_call_statement(): Concurrent_procedure_call_statementContext | undefined {
		return this.tryGetRuleContext(0, Concurrent_procedure_call_statementContext);
	}
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public concurrent_assertion_statement(): Concurrent_assertion_statementContext | undefined {
		return this.tryGetRuleContext(0, Concurrent_assertion_statementContext);
	}
	public concurrent_signal_assignment_statement(): Concurrent_signal_assignment_statementContext | undefined {
		return this.tryGetRuleContext(0, Concurrent_signal_assignment_statementContext);
	}
	public POSTPONED(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.POSTPONED, 0); }
	public component_instantiation_statement(): Component_instantiation_statementContext | undefined {
		return this.tryGetRuleContext(0, Component_instantiation_statementContext);
	}
	public generate_statement(): Generate_statementContext | undefined {
		return this.tryGetRuleContext(0, Generate_statementContext);
	}
	public concurrent_break_statement(): Concurrent_break_statementContext | undefined {
		return this.tryGetRuleContext(0, Concurrent_break_statementContext);
	}
	public simultaneous_statement(): Simultaneous_statementContext | undefined {
		return this.tryGetRuleContext(0, Simultaneous_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_architecture_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitArchitecture_statement) {
			return visitor.visitArchitecture_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Architecture_statement_partContext extends ParserRuleContext {
	public architecture_statement(): Architecture_statementContext[];
	public architecture_statement(i: number): Architecture_statementContext;
	public architecture_statement(i?: number): Architecture_statementContext | Architecture_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Architecture_statementContext);
		} else {
			return this.getRuleContext(i, Architecture_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_architecture_statement_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitArchitecture_statement_part) {
			return visitor.visitArchitecture_statement_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Array_nature_definitionContext extends ParserRuleContext {
	public unconstrained_nature_definition(): Unconstrained_nature_definitionContext | undefined {
		return this.tryGetRuleContext(0, Unconstrained_nature_definitionContext);
	}
	public constrained_nature_definition(): Constrained_nature_definitionContext | undefined {
		return this.tryGetRuleContext(0, Constrained_nature_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_array_nature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitArray_nature_definition) {
			return visitor.visitArray_nature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Array_type_definitionContext extends ParserRuleContext {
	public unconstrained_array_definition(): Unconstrained_array_definitionContext | undefined {
		return this.tryGetRuleContext(0, Unconstrained_array_definitionContext);
	}
	public constrained_array_definition(): Constrained_array_definitionContext | undefined {
		return this.tryGetRuleContext(0, Constrained_array_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_array_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitArray_type_definition) {
			return visitor.visitArray_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssertionContext extends ParserRuleContext {
	public ASSERT(): TerminalNode { return this.getToken(vhdlParser.ASSERT, 0); }
	public condition(): ConditionContext {
		return this.getRuleContext(0, ConditionContext);
	}
	public REPORT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.REPORT, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public SEVERITY(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SEVERITY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_assertion; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAssertion) {
			return visitor.visitAssertion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assertion_statementContext extends ParserRuleContext {
	public assertion(): AssertionContext {
		return this.getRuleContext(0, AssertionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_assertion_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAssertion_statement) {
			return visitor.visitAssertion_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Association_elementContext extends ParserRuleContext {
	public actual_part(): Actual_partContext {
		return this.getRuleContext(0, Actual_partContext);
	}
	public formal_part(): Formal_partContext | undefined {
		return this.tryGetRuleContext(0, Formal_partContext);
	}
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ARROW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_association_element; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAssociation_element) {
			return visitor.visitAssociation_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Association_listContext extends ParserRuleContext {
	public association_element(): Association_elementContext[];
	public association_element(i: number): Association_elementContext;
	public association_element(i?: number): Association_elementContext | Association_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Association_elementContext);
		} else {
			return this.getRuleContext(i, Association_elementContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_association_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAssociation_list) {
			return visitor.visitAssociation_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attribute_declarationContext extends ParserRuleContext {
	public ATTRIBUTE(): TerminalNode { return this.getToken(vhdlParser.ATTRIBUTE, 0); }
	public label_colon(): Label_colonContext {
		return this.getRuleContext(0, Label_colonContext);
	}
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_attribute_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAttribute_declaration) {
			return visitor.visitAttribute_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attribute_designatorContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public RANGE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RANGE, 0); }
	public REVERSE_RANGE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.REVERSE_RANGE, 0); }
	public ACROSS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ACROSS, 0); }
	public THROUGH(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.THROUGH, 0); }
	public REFERENCE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.REFERENCE, 0); }
	public TOLERANCE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.TOLERANCE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_attribute_designator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAttribute_designator) {
			return visitor.visitAttribute_designator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attribute_specificationContext extends ParserRuleContext {
	public ATTRIBUTE(): TerminalNode { return this.getToken(vhdlParser.ATTRIBUTE, 0); }
	public attribute_designator(): Attribute_designatorContext {
		return this.getRuleContext(0, Attribute_designatorContext);
	}
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public entity_specification(): Entity_specificationContext {
		return this.getRuleContext(0, Entity_specificationContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_attribute_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAttribute_specification) {
			return visitor.visitAttribute_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Base_unit_declarationContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_base_unit_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBase_unit_declaration) {
			return visitor.visitBase_unit_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Binding_indicationContext extends ParserRuleContext {
	public USE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.USE, 0); }
	public entity_aspect(): Entity_aspectContext | undefined {
		return this.tryGetRuleContext(0, Entity_aspectContext);
	}
	public generic_map_aspect(): Generic_map_aspectContext | undefined {
		return this.tryGetRuleContext(0, Generic_map_aspectContext);
	}
	public port_map_aspect(): Port_map_aspectContext | undefined {
		return this.tryGetRuleContext(0, Port_map_aspectContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_binding_indication; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBinding_indication) {
			return visitor.visitBinding_indication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_configurationContext extends ParserRuleContext {
	public FOR(): TerminalNode[];
	public FOR(i: number): TerminalNode;
	public FOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.FOR);
		} else {
			return this.getToken(vhdlParser.FOR, i);
		}
	}
	public block_specification(): Block_specificationContext {
		return this.getRuleContext(0, Block_specificationContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public use_clause(): Use_clauseContext[];
	public use_clause(i: number): Use_clauseContext;
	public use_clause(i?: number): Use_clauseContext | Use_clauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Use_clauseContext);
		} else {
			return this.getRuleContext(i, Use_clauseContext);
		}
	}
	public configuration_item(): Configuration_itemContext[];
	public configuration_item(i: number): Configuration_itemContext;
	public configuration_item(i?: number): Configuration_itemContext | Configuration_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Configuration_itemContext);
		} else {
			return this.getRuleContext(i, Configuration_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_block_configuration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBlock_configuration) {
			return visitor.visitBlock_configuration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_declarative_itemContext extends ParserRuleContext {
	public subprogram_declaration(): Subprogram_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_declarationContext);
	}
	public subprogram_body(): Subprogram_bodyContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_bodyContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public subtype_declaration(): Subtype_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_declarationContext);
	}
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public signal_declaration(): Signal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Signal_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public file_declaration(): File_declarationContext | undefined {
		return this.tryGetRuleContext(0, File_declarationContext);
	}
	public alias_declaration(): Alias_declarationContext | undefined {
		return this.tryGetRuleContext(0, Alias_declarationContext);
	}
	public component_declaration(): Component_declarationContext | undefined {
		return this.tryGetRuleContext(0, Component_declarationContext);
	}
	public attribute_declaration(): Attribute_declarationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_declarationContext);
	}
	public attribute_specification(): Attribute_specificationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_specificationContext);
	}
	public configuration_specification(): Configuration_specificationContext | undefined {
		return this.tryGetRuleContext(0, Configuration_specificationContext);
	}
	public disconnection_specification(): Disconnection_specificationContext | undefined {
		return this.tryGetRuleContext(0, Disconnection_specificationContext);
	}
	public step_limit_specification(): Step_limit_specificationContext | undefined {
		return this.tryGetRuleContext(0, Step_limit_specificationContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public group_template_declaration(): Group_template_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_template_declarationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	public nature_declaration(): Nature_declarationContext | undefined {
		return this.tryGetRuleContext(0, Nature_declarationContext);
	}
	public subnature_declaration(): Subnature_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subnature_declarationContext);
	}
	public quantity_declaration(): Quantity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Quantity_declarationContext);
	}
	public terminal_declaration(): Terminal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Terminal_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_block_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBlock_declarative_item) {
			return visitor.visitBlock_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_declarative_partContext extends ParserRuleContext {
	public block_declarative_item(): Block_declarative_itemContext[];
	public block_declarative_item(i: number): Block_declarative_itemContext;
	public block_declarative_item(i?: number): Block_declarative_itemContext | Block_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Block_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Block_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_block_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBlock_declarative_part) {
			return visitor.visitBlock_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_headerContext extends ParserRuleContext {
	public generic_clause(): Generic_clauseContext | undefined {
		return this.tryGetRuleContext(0, Generic_clauseContext);
	}
	public port_clause(): Port_clauseContext | undefined {
		return this.tryGetRuleContext(0, Port_clauseContext);
	}
	public generic_map_aspect(): Generic_map_aspectContext | undefined {
		return this.tryGetRuleContext(0, Generic_map_aspectContext);
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.SEMI);
		} else {
			return this.getToken(vhdlParser.SEMI, i);
		}
	}
	public port_map_aspect(): Port_map_aspectContext | undefined {
		return this.tryGetRuleContext(0, Port_map_aspectContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_block_header; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBlock_header) {
			return visitor.visitBlock_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_specificationContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public index_specification(): Index_specificationContext | undefined {
		return this.tryGetRuleContext(0, Index_specificationContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_block_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBlock_specification) {
			return visitor.visitBlock_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_statementContext extends ParserRuleContext {
	public label_colon(): Label_colonContext {
		return this.getRuleContext(0, Label_colonContext);
	}
	public BLOCK(): TerminalNode[];
	public BLOCK(i: number): TerminalNode;
	public BLOCK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.BLOCK);
		} else {
			return this.getToken(vhdlParser.BLOCK, i);
		}
	}
	public block_header(): Block_headerContext {
		return this.getRuleContext(0, Block_headerContext);
	}
	public block_declarative_part(): Block_declarative_partContext {
		return this.getRuleContext(0, Block_declarative_partContext);
	}
	public BEGIN(): TerminalNode { return this.getToken(vhdlParser.BEGIN, 0); }
	public block_statement_part(): Block_statement_partContext {
		return this.getRuleContext(0, Block_statement_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	public IS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IS, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_block_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBlock_statement) {
			return visitor.visitBlock_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_statement_partContext extends ParserRuleContext {
	public architecture_statement(): Architecture_statementContext[];
	public architecture_statement(i: number): Architecture_statementContext;
	public architecture_statement(i?: number): Architecture_statementContext | Architecture_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Architecture_statementContext);
		} else {
			return this.getRuleContext(i, Architecture_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_block_statement_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBlock_statement_part) {
			return visitor.visitBlock_statement_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Branch_quantity_declarationContext extends ParserRuleContext {
	public QUANTITY(): TerminalNode { return this.getToken(vhdlParser.QUANTITY, 0); }
	public terminal_aspect(): Terminal_aspectContext {
		return this.getRuleContext(0, Terminal_aspectContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public across_aspect(): Across_aspectContext | undefined {
		return this.tryGetRuleContext(0, Across_aspectContext);
	}
	public through_aspect(): Through_aspectContext | undefined {
		return this.tryGetRuleContext(0, Through_aspectContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_branch_quantity_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBranch_quantity_declaration) {
			return visitor.visitBranch_quantity_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Break_elementContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public ARROW(): TerminalNode { return this.getToken(vhdlParser.ARROW, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public break_selector_clause(): Break_selector_clauseContext | undefined {
		return this.tryGetRuleContext(0, Break_selector_clauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_break_element; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBreak_element) {
			return visitor.visitBreak_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Break_listContext extends ParserRuleContext {
	public break_element(): Break_elementContext[];
	public break_element(i: number): Break_elementContext;
	public break_element(i?: number): Break_elementContext | Break_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Break_elementContext);
		} else {
			return this.getRuleContext(i, Break_elementContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_break_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBreak_list) {
			return visitor.visitBreak_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Break_selector_clauseContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(vhdlParser.FOR, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public USE(): TerminalNode { return this.getToken(vhdlParser.USE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_break_selector_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBreak_selector_clause) {
			return visitor.visitBreak_selector_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Break_statementContext extends ParserRuleContext {
	public BREAK(): TerminalNode { return this.getToken(vhdlParser.BREAK, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public break_list(): Break_listContext | undefined {
		return this.tryGetRuleContext(0, Break_listContext);
	}
	public WHEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.WHEN, 0); }
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_break_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitBreak_statement) {
			return visitor.visitBreak_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_statementContext extends ParserRuleContext {
	public CASE(): TerminalNode[];
	public CASE(i: number): TerminalNode;
	public CASE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.CASE);
		} else {
			return this.getToken(vhdlParser.CASE, i);
		}
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public case_statement_alternative(): Case_statement_alternativeContext[];
	public case_statement_alternative(i: number): Case_statement_alternativeContext;
	public case_statement_alternative(i?: number): Case_statement_alternativeContext | Case_statement_alternativeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Case_statement_alternativeContext);
		} else {
			return this.getRuleContext(i, Case_statement_alternativeContext);
		}
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_case_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitCase_statement) {
			return visitor.visitCase_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_statement_alternativeContext extends ParserRuleContext {
	public WHEN(): TerminalNode { return this.getToken(vhdlParser.WHEN, 0); }
	public choices(): ChoicesContext {
		return this.getRuleContext(0, ChoicesContext);
	}
	public ARROW(): TerminalNode { return this.getToken(vhdlParser.ARROW, 0); }
	public sequence_of_statements(): Sequence_of_statementsContext {
		return this.getRuleContext(0, Sequence_of_statementsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_case_statement_alternative; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitCase_statement_alternative) {
			return visitor.visitCase_statement_alternative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChoiceContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public discrete_range(): Discrete_rangeContext | undefined {
		return this.tryGetRuleContext(0, Discrete_rangeContext);
	}
	public simple_expression(): Simple_expressionContext | undefined {
		return this.tryGetRuleContext(0, Simple_expressionContext);
	}
	public OTHERS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OTHERS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_choice; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitChoice) {
			return visitor.visitChoice(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChoicesContext extends ParserRuleContext {
	public choice(): ChoiceContext[];
	public choice(i: number): ChoiceContext;
	public choice(i?: number): ChoiceContext | ChoiceContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ChoiceContext);
		} else {
			return this.getRuleContext(i, ChoiceContext);
		}
	}
	public BAR(): TerminalNode[];
	public BAR(i: number): TerminalNode;
	public BAR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.BAR);
		} else {
			return this.getToken(vhdlParser.BAR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_choices; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitChoices) {
			return visitor.visitChoices(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_configurationContext extends ParserRuleContext {
	public FOR(): TerminalNode[];
	public FOR(i: number): TerminalNode;
	public FOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.FOR);
		} else {
			return this.getToken(vhdlParser.FOR, i);
		}
	}
	public component_specification(): Component_specificationContext {
		return this.getRuleContext(0, Component_specificationContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.SEMI);
		} else {
			return this.getToken(vhdlParser.SEMI, i);
		}
	}
	public binding_indication(): Binding_indicationContext | undefined {
		return this.tryGetRuleContext(0, Binding_indicationContext);
	}
	public block_configuration(): Block_configurationContext | undefined {
		return this.tryGetRuleContext(0, Block_configurationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_component_configuration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitComponent_configuration) {
			return visitor.visitComponent_configuration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_declarationContext extends ParserRuleContext {
	public COMPONENT(): TerminalNode[];
	public COMPONENT(i: number): TerminalNode;
	public COMPONENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMPONENT);
		} else {
			return this.getToken(vhdlParser.COMPONENT, i);
		}
	}
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public IS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IS, 0); }
	public generic_clause(): Generic_clauseContext | undefined {
		return this.tryGetRuleContext(0, Generic_clauseContext);
	}
	public port_clause(): Port_clauseContext | undefined {
		return this.tryGetRuleContext(0, Port_clauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_component_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitComponent_declaration) {
			return visitor.visitComponent_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_instantiation_statementContext extends ParserRuleContext {
	public label_colon(): Label_colonContext {
		return this.getRuleContext(0, Label_colonContext);
	}
	public instantiated_unit(): Instantiated_unitContext {
		return this.getRuleContext(0, Instantiated_unitContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public generic_map_aspect(): Generic_map_aspectContext | undefined {
		return this.tryGetRuleContext(0, Generic_map_aspectContext);
	}
	public port_map_aspect(): Port_map_aspectContext | undefined {
		return this.tryGetRuleContext(0, Port_map_aspectContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_component_instantiation_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitComponent_instantiation_statement) {
			return visitor.visitComponent_instantiation_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_specificationContext extends ParserRuleContext {
	public instantiation_list(): Instantiation_listContext {
		return this.getRuleContext(0, Instantiation_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_component_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitComponent_specification) {
			return visitor.visitComponent_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Composite_nature_definitionContext extends ParserRuleContext {
	public array_nature_definition(): Array_nature_definitionContext | undefined {
		return this.tryGetRuleContext(0, Array_nature_definitionContext);
	}
	public record_nature_definition(): Record_nature_definitionContext | undefined {
		return this.tryGetRuleContext(0, Record_nature_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_composite_nature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitComposite_nature_definition) {
			return visitor.visitComposite_nature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Composite_type_definitionContext extends ParserRuleContext {
	public array_type_definition(): Array_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Array_type_definitionContext);
	}
	public record_type_definition(): Record_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Record_type_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_composite_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitComposite_type_definition) {
			return visitor.visitComposite_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Concurrent_assertion_statementContext extends ParserRuleContext {
	public assertion(): AssertionContext {
		return this.getRuleContext(0, AssertionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public POSTPONED(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.POSTPONED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_concurrent_assertion_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConcurrent_assertion_statement) {
			return visitor.visitConcurrent_assertion_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Concurrent_break_statementContext extends ParserRuleContext {
	public BREAK(): TerminalNode { return this.getToken(vhdlParser.BREAK, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public break_list(): Break_listContext | undefined {
		return this.tryGetRuleContext(0, Break_listContext);
	}
	public sensitivity_clause(): Sensitivity_clauseContext | undefined {
		return this.tryGetRuleContext(0, Sensitivity_clauseContext);
	}
	public WHEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.WHEN, 0); }
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_concurrent_break_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConcurrent_break_statement) {
			return visitor.visitConcurrent_break_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Concurrent_procedure_call_statementContext extends ParserRuleContext {
	public procedure_call(): Procedure_callContext {
		return this.getRuleContext(0, Procedure_callContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public POSTPONED(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.POSTPONED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_concurrent_procedure_call_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConcurrent_procedure_call_statement) {
			return visitor.visitConcurrent_procedure_call_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Concurrent_signal_assignment_statementContext extends ParserRuleContext {
	public conditional_signal_assignment(): Conditional_signal_assignmentContext | undefined {
		return this.tryGetRuleContext(0, Conditional_signal_assignmentContext);
	}
	public selected_signal_assignment(): Selected_signal_assignmentContext | undefined {
		return this.tryGetRuleContext(0, Selected_signal_assignmentContext);
	}
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public POSTPONED(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.POSTPONED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_concurrent_signal_assignment_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConcurrent_signal_assignment_statement) {
			return visitor.visitConcurrent_signal_assignment_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_condition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitCondition) {
			return visitor.visitCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Condition_clauseContext extends ParserRuleContext {
	public UNTIL(): TerminalNode { return this.getToken(vhdlParser.UNTIL, 0); }
	public condition(): ConditionContext {
		return this.getRuleContext(0, ConditionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_condition_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitCondition_clause) {
			return visitor.visitCondition_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Conditional_signal_assignmentContext extends ParserRuleContext {
	public target(): TargetContext {
		return this.getRuleContext(0, TargetContext);
	}
	public LE(): TerminalNode { return this.getToken(vhdlParser.LE, 0); }
	public opts(): OptsContext {
		return this.getRuleContext(0, OptsContext);
	}
	public conditional_waveforms(): Conditional_waveformsContext {
		return this.getRuleContext(0, Conditional_waveformsContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_conditional_signal_assignment; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConditional_signal_assignment) {
			return visitor.visitConditional_signal_assignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Conditional_waveformsContext extends ParserRuleContext {
	public waveform(): WaveformContext {
		return this.getRuleContext(0, WaveformContext);
	}
	public WHEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.WHEN, 0); }
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ELSE, 0); }
	public conditional_waveforms(): Conditional_waveformsContext | undefined {
		return this.tryGetRuleContext(0, Conditional_waveformsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_conditional_waveforms; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConditional_waveforms) {
			return visitor.visitConditional_waveforms(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Configuration_declarationContext extends ParserRuleContext {
	public CONFIGURATION(): TerminalNode[];
	public CONFIGURATION(i: number): TerminalNode;
	public CONFIGURATION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.CONFIGURATION);
		} else {
			return this.getToken(vhdlParser.CONFIGURATION, i);
		}
	}
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public configuration_declarative_part(): Configuration_declarative_partContext {
		return this.getRuleContext(0, Configuration_declarative_partContext);
	}
	public block_configuration(): Block_configurationContext {
		return this.getRuleContext(0, Block_configurationContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_configuration_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConfiguration_declaration) {
			return visitor.visitConfiguration_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Configuration_declarative_itemContext extends ParserRuleContext {
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public attribute_specification(): Attribute_specificationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_specificationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_configuration_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConfiguration_declarative_item) {
			return visitor.visitConfiguration_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Configuration_declarative_partContext extends ParserRuleContext {
	public configuration_declarative_item(): Configuration_declarative_itemContext[];
	public configuration_declarative_item(i: number): Configuration_declarative_itemContext;
	public configuration_declarative_item(i?: number): Configuration_declarative_itemContext | Configuration_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Configuration_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Configuration_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_configuration_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConfiguration_declarative_part) {
			return visitor.visitConfiguration_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Configuration_itemContext extends ParserRuleContext {
	public block_configuration(): Block_configurationContext | undefined {
		return this.tryGetRuleContext(0, Block_configurationContext);
	}
	public component_configuration(): Component_configurationContext | undefined {
		return this.tryGetRuleContext(0, Component_configurationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_configuration_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConfiguration_item) {
			return visitor.visitConfiguration_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Configuration_specificationContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(vhdlParser.FOR, 0); }
	public component_specification(): Component_specificationContext {
		return this.getRuleContext(0, Component_specificationContext);
	}
	public binding_indication(): Binding_indicationContext {
		return this.getRuleContext(0, Binding_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_configuration_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConfiguration_specification) {
			return visitor.visitConfiguration_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Constant_declarationContext extends ParserRuleContext {
	public CONSTANT(): TerminalNode { return this.getToken(vhdlParser.CONSTANT, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_constant_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConstant_declaration) {
			return visitor.visitConstant_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Constrained_array_definitionContext extends ParserRuleContext {
	public ARRAY(): TerminalNode { return this.getToken(vhdlParser.ARRAY, 0); }
	public index_constraint(): Index_constraintContext {
		return this.getRuleContext(0, Index_constraintContext);
	}
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_constrained_array_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConstrained_array_definition) {
			return visitor.visitConstrained_array_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Constrained_nature_definitionContext extends ParserRuleContext {
	public ARRAY(): TerminalNode { return this.getToken(vhdlParser.ARRAY, 0); }
	public index_constraint(): Index_constraintContext {
		return this.getRuleContext(0, Index_constraintContext);
	}
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public subnature_indication(): Subnature_indicationContext {
		return this.getRuleContext(0, Subnature_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_constrained_nature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConstrained_nature_definition) {
			return visitor.visitConstrained_nature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstraintContext extends ParserRuleContext {
	public range_constraint(): Range_constraintContext | undefined {
		return this.tryGetRuleContext(0, Range_constraintContext);
	}
	public index_constraint(): Index_constraintContext | undefined {
		return this.tryGetRuleContext(0, Index_constraintContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_constraint; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitConstraint) {
			return visitor.visitConstraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Context_clauseContext extends ParserRuleContext {
	public context_item(): Context_itemContext[];
	public context_item(i: number): Context_itemContext;
	public context_item(i?: number): Context_itemContext | Context_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Context_itemContext);
		} else {
			return this.getRuleContext(i, Context_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_context_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitContext_clause) {
			return visitor.visitContext_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Context_itemContext extends ParserRuleContext {
	public library_clause(): Library_clauseContext | undefined {
		return this.tryGetRuleContext(0, Library_clauseContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_context_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitContext_item) {
			return visitor.visitContext_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Delay_mechanismContext extends ParserRuleContext {
	public TRANSPORT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.TRANSPORT, 0); }
	public INERTIAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.INERTIAL, 0); }
	public REJECT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.REJECT, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_delay_mechanism; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitDelay_mechanism) {
			return visitor.visitDelay_mechanism(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Design_fileContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(vhdlParser.EOF, 0); }
	public design_unit(): Design_unitContext[];
	public design_unit(i: number): Design_unitContext;
	public design_unit(i?: number): Design_unitContext | Design_unitContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Design_unitContext);
		} else {
			return this.getRuleContext(i, Design_unitContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_design_file; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitDesign_file) {
			return visitor.visitDesign_file(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Design_unitContext extends ParserRuleContext {
	public context_clause(): Context_clauseContext {
		return this.getRuleContext(0, Context_clauseContext);
	}
	public library_unit(): Library_unitContext {
		return this.getRuleContext(0, Library_unitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_design_unit; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitDesign_unit) {
			return visitor.visitDesign_unit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DesignatorContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_designator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitDesignator) {
			return visitor.visitDesignator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectionContext extends ParserRuleContext {
	public TO(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.TO, 0); }
	public DOWNTO(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.DOWNTO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_direction; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitDirection) {
			return visitor.visitDirection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Disconnection_specificationContext extends ParserRuleContext {
	public DISCONNECT(): TerminalNode { return this.getToken(vhdlParser.DISCONNECT, 0); }
	public guarded_signal_specification(): Guarded_signal_specificationContext {
		return this.getRuleContext(0, Guarded_signal_specificationContext);
	}
	public AFTER(): TerminalNode { return this.getToken(vhdlParser.AFTER, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_disconnection_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitDisconnection_specification) {
			return visitor.visitDisconnection_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Discrete_rangeContext extends ParserRuleContext {
	public range_decl(): Range_declContext | undefined {
		return this.tryGetRuleContext(0, Range_declContext);
	}
	public subtype_indication(): Subtype_indicationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_discrete_range; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitDiscrete_range) {
			return visitor.visitDiscrete_range(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Element_associationContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public choices(): ChoicesContext | undefined {
		return this.tryGetRuleContext(0, ChoicesContext);
	}
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ARROW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_element_association; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitElement_association) {
			return visitor.visitElement_association(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Element_declarationContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public element_subtype_definition(): Element_subtype_definitionContext {
		return this.getRuleContext(0, Element_subtype_definitionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_element_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitElement_declaration) {
			return visitor.visitElement_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Element_subnature_definitionContext extends ParserRuleContext {
	public subnature_indication(): Subnature_indicationContext {
		return this.getRuleContext(0, Subnature_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_element_subnature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitElement_subnature_definition) {
			return visitor.visitElement_subnature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Element_subtype_definitionContext extends ParserRuleContext {
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_element_subtype_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitElement_subtype_definition) {
			return visitor.visitElement_subtype_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_aspectContext extends ParserRuleContext {
	public ENTITY(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ENTITY, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	public CONFIGURATION(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CONFIGURATION, 0); }
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OPEN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_aspect) {
			return visitor.visitEntity_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_classContext extends ParserRuleContext {
	public ENTITY(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ENTITY, 0); }
	public ARCHITECTURE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ARCHITECTURE, 0); }
	public CONFIGURATION(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CONFIGURATION, 0); }
	public PROCEDURE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.PROCEDURE, 0); }
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.FUNCTION, 0); }
	public PACKAGE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.PACKAGE, 0); }
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.TYPE, 0); }
	public SUBTYPE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SUBTYPE, 0); }
	public CONSTANT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CONSTANT, 0); }
	public SIGNAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SIGNAL, 0); }
	public VARIABLE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARIABLE, 0); }
	public COMPONENT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.COMPONENT, 0); }
	public LABEL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LABEL, 0); }
	public LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LITERAL, 0); }
	public UNITS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.UNITS, 0); }
	public GROUP(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.GROUP, 0); }
	public FILE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.FILE, 0); }
	public NATURE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NATURE, 0); }
	public SUBNATURE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SUBNATURE, 0); }
	public QUANTITY(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.QUANTITY, 0); }
	public TERMINAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.TERMINAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_class; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_class) {
			return visitor.visitEntity_class(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_class_entryContext extends ParserRuleContext {
	public entity_class(): Entity_classContext {
		return this.getRuleContext(0, Entity_classContext);
	}
	public BOX(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BOX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_class_entry; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_class_entry) {
			return visitor.visitEntity_class_entry(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_class_entry_listContext extends ParserRuleContext {
	public entity_class_entry(): Entity_class_entryContext[];
	public entity_class_entry(i: number): Entity_class_entryContext;
	public entity_class_entry(i?: number): Entity_class_entryContext | Entity_class_entryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Entity_class_entryContext);
		} else {
			return this.getRuleContext(i, Entity_class_entryContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_class_entry_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_class_entry_list) {
			return visitor.visitEntity_class_entry_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_declarationContext extends ParserRuleContext {
	public ENTITY(): TerminalNode[];
	public ENTITY(i: number): TerminalNode;
	public ENTITY(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.ENTITY);
		} else {
			return this.getToken(vhdlParser.ENTITY, i);
		}
	}
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public entity_header(): Entity_headerContext {
		return this.getRuleContext(0, Entity_headerContext);
	}
	public entity_declarative_part(): Entity_declarative_partContext {
		return this.getRuleContext(0, Entity_declarative_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public BEGIN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BEGIN, 0); }
	public entity_statement_part(): Entity_statement_partContext | undefined {
		return this.tryGetRuleContext(0, Entity_statement_partContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_declaration) {
			return visitor.visitEntity_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_declarative_itemContext extends ParserRuleContext {
	public subprogram_declaration(): Subprogram_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_declarationContext);
	}
	public subprogram_body(): Subprogram_bodyContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_bodyContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public subtype_declaration(): Subtype_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_declarationContext);
	}
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public signal_declaration(): Signal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Signal_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public file_declaration(): File_declarationContext | undefined {
		return this.tryGetRuleContext(0, File_declarationContext);
	}
	public alias_declaration(): Alias_declarationContext | undefined {
		return this.tryGetRuleContext(0, Alias_declarationContext);
	}
	public attribute_declaration(): Attribute_declarationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_declarationContext);
	}
	public attribute_specification(): Attribute_specificationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_specificationContext);
	}
	public disconnection_specification(): Disconnection_specificationContext | undefined {
		return this.tryGetRuleContext(0, Disconnection_specificationContext);
	}
	public step_limit_specification(): Step_limit_specificationContext | undefined {
		return this.tryGetRuleContext(0, Step_limit_specificationContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public group_template_declaration(): Group_template_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_template_declarationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	public nature_declaration(): Nature_declarationContext | undefined {
		return this.tryGetRuleContext(0, Nature_declarationContext);
	}
	public subnature_declaration(): Subnature_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subnature_declarationContext);
	}
	public quantity_declaration(): Quantity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Quantity_declarationContext);
	}
	public terminal_declaration(): Terminal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Terminal_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_declarative_item) {
			return visitor.visitEntity_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_declarative_partContext extends ParserRuleContext {
	public entity_declarative_item(): Entity_declarative_itemContext[];
	public entity_declarative_item(i: number): Entity_declarative_itemContext;
	public entity_declarative_item(i?: number): Entity_declarative_itemContext | Entity_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Entity_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Entity_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_declarative_part) {
			return visitor.visitEntity_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_designatorContext extends ParserRuleContext {
	public entity_tag(): Entity_tagContext {
		return this.getRuleContext(0, Entity_tagContext);
	}
	public signature(): SignatureContext | undefined {
		return this.tryGetRuleContext(0, SignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_designator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_designator) {
			return visitor.visitEntity_designator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_headerContext extends ParserRuleContext {
	public generic_clause(): Generic_clauseContext | undefined {
		return this.tryGetRuleContext(0, Generic_clauseContext);
	}
	public port_clause(): Port_clauseContext | undefined {
		return this.tryGetRuleContext(0, Port_clauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_header; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_header) {
			return visitor.visitEntity_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_name_listContext extends ParserRuleContext {
	public entity_designator(): Entity_designatorContext[];
	public entity_designator(i: number): Entity_designatorContext;
	public entity_designator(i?: number): Entity_designatorContext | Entity_designatorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Entity_designatorContext);
		} else {
			return this.getRuleContext(i, Entity_designatorContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	public OTHERS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OTHERS, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ALL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_name_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_name_list) {
			return visitor.visitEntity_name_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_specificationContext extends ParserRuleContext {
	public entity_name_list(): Entity_name_listContext {
		return this.getRuleContext(0, Entity_name_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public entity_class(): Entity_classContext {
		return this.getRuleContext(0, Entity_classContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_specification) {
			return visitor.visitEntity_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_statementContext extends ParserRuleContext {
	public concurrent_assertion_statement(): Concurrent_assertion_statementContext | undefined {
		return this.tryGetRuleContext(0, Concurrent_assertion_statementContext);
	}
	public process_statement(): Process_statementContext | undefined {
		return this.tryGetRuleContext(0, Process_statementContext);
	}
	public concurrent_procedure_call_statement(): Concurrent_procedure_call_statementContext | undefined {
		return this.tryGetRuleContext(0, Concurrent_procedure_call_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_statement) {
			return visitor.visitEntity_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_statement_partContext extends ParserRuleContext {
	public entity_statement(): Entity_statementContext[];
	public entity_statement(i: number): Entity_statementContext;
	public entity_statement(i?: number): Entity_statementContext | Entity_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Entity_statementContext);
		} else {
			return this.getRuleContext(i, Entity_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_statement_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_statement_part) {
			return visitor.visitEntity_statement_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Entity_tagContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public CHARACTER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CHARACTER_LITERAL, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_entity_tag; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEntity_tag) {
			return visitor.visitEntity_tag(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Enumeration_literalContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public CHARACTER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CHARACTER_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_enumeration_literal; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEnumeration_literal) {
			return visitor.visitEnumeration_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Enumeration_type_definitionContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public enumeration_literal(): Enumeration_literalContext[];
	public enumeration_literal(i: number): Enumeration_literalContext;
	public enumeration_literal(i?: number): Enumeration_literalContext | Enumeration_literalContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Enumeration_literalContext);
		} else {
			return this.getRuleContext(i, Enumeration_literalContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_enumeration_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitEnumeration_type_definition) {
			return visitor.visitEnumeration_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Exit_statementContext extends ParserRuleContext {
	public EXIT(): TerminalNode { return this.getToken(vhdlParser.EXIT, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public WHEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.WHEN, 0); }
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_exit_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitExit_statement) {
			return visitor.visitExit_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public relation(): RelationContext[];
	public relation(i: number): RelationContext;
	public relation(i?: number): RelationContext | RelationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RelationContext);
		} else {
			return this.getRuleContext(i, RelationContext);
		}
	}
	public logical_operator(): Logical_operatorContext[];
	public logical_operator(i: number): Logical_operatorContext;
	public logical_operator(i?: number): Logical_operatorContext | Logical_operatorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Logical_operatorContext);
		} else {
			return this.getRuleContext(i, Logical_operatorContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_expression; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FactorContext extends ParserRuleContext {
	public primary(): PrimaryContext[];
	public primary(i: number): PrimaryContext;
	public primary(i?: number): PrimaryContext | PrimaryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PrimaryContext);
		} else {
			return this.getRuleContext(i, PrimaryContext);
		}
	}
	public DOUBLESTAR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.DOUBLESTAR, 0); }
	public ABS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ABS, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_factor; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFactor) {
			return visitor.visitFactor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class File_declarationContext extends ParserRuleContext {
	public FILE(): TerminalNode { return this.getToken(vhdlParser.FILE, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public file_open_information(): File_open_informationContext | undefined {
		return this.tryGetRuleContext(0, File_open_informationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_file_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFile_declaration) {
			return visitor.visitFile_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class File_logical_nameContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_file_logical_name; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFile_logical_name) {
			return visitor.visitFile_logical_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class File_open_informationContext extends ParserRuleContext {
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public file_logical_name(): File_logical_nameContext {
		return this.getRuleContext(0, File_logical_nameContext);
	}
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OPEN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_file_open_information; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFile_open_information) {
			return visitor.visitFile_open_information(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class File_type_definitionContext extends ParserRuleContext {
	public FILE(): TerminalNode { return this.getToken(vhdlParser.FILE, 0); }
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_file_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFile_type_definition) {
			return visitor.visitFile_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Formal_parameter_listContext extends ParserRuleContext {
	public interface_list(): Interface_listContext {
		return this.getRuleContext(0, Interface_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_formal_parameter_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFormal_parameter_list) {
			return visitor.visitFormal_parameter_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Formal_partContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public explicit_range(): Explicit_rangeContext | undefined {
		return this.tryGetRuleContext(0, Explicit_rangeContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_formal_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFormal_part) {
			return visitor.visitFormal_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Free_quantity_declarationContext extends ParserRuleContext {
	public QUANTITY(): TerminalNode { return this.getToken(vhdlParser.QUANTITY, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_free_quantity_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFree_quantity_declaration) {
			return visitor.visitFree_quantity_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Generate_statementContext extends ParserRuleContext {
	public label_colon(): Label_colonContext {
		return this.getRuleContext(0, Label_colonContext);
	}
	public generation_scheme(): Generation_schemeContext {
		return this.getRuleContext(0, Generation_schemeContext);
	}
	public GENERATE(): TerminalNode[];
	public GENERATE(i: number): TerminalNode;
	public GENERATE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.GENERATE);
		} else {
			return this.getToken(vhdlParser.GENERATE, i);
		}
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public BEGIN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BEGIN, 0); }
	public architecture_statement(): Architecture_statementContext[];
	public architecture_statement(i: number): Architecture_statementContext;
	public architecture_statement(i?: number): Architecture_statementContext | Architecture_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Architecture_statementContext);
		} else {
			return this.getRuleContext(i, Architecture_statementContext);
		}
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public block_declarative_item(): Block_declarative_itemContext[];
	public block_declarative_item(i: number): Block_declarative_itemContext;
	public block_declarative_item(i?: number): Block_declarative_itemContext | Block_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Block_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Block_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_generate_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGenerate_statement) {
			return visitor.visitGenerate_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Generation_schemeContext extends ParserRuleContext {
	public FOR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.FOR, 0); }
	public parameter_specification(): Parameter_specificationContext | undefined {
		return this.tryGetRuleContext(0, Parameter_specificationContext);
	}
	public IF(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IF, 0); }
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_generation_scheme; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGeneration_scheme) {
			return visitor.visitGeneration_scheme(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Generic_clauseContext extends ParserRuleContext {
	public GENERIC(): TerminalNode { return this.getToken(vhdlParser.GENERIC, 0); }
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public generic_list(): Generic_listContext {
		return this.getRuleContext(0, Generic_listContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_generic_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGeneric_clause) {
			return visitor.visitGeneric_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Generic_listContext extends ParserRuleContext {
	public interface_constant_declaration(): Interface_constant_declarationContext[];
	public interface_constant_declaration(i: number): Interface_constant_declarationContext;
	public interface_constant_declaration(i?: number): Interface_constant_declarationContext | Interface_constant_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Interface_constant_declarationContext);
		} else {
			return this.getRuleContext(i, Interface_constant_declarationContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.SEMI);
		} else {
			return this.getToken(vhdlParser.SEMI, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_generic_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGeneric_list) {
			return visitor.visitGeneric_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Generic_map_aspectContext extends ParserRuleContext {
	public GENERIC(): TerminalNode { return this.getToken(vhdlParser.GENERIC, 0); }
	public MAP(): TerminalNode { return this.getToken(vhdlParser.MAP, 0); }
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public association_list(): Association_listContext {
		return this.getRuleContext(0, Association_listContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_generic_map_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGeneric_map_aspect) {
			return visitor.visitGeneric_map_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Group_constituentContext extends ParserRuleContext {
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public CHARACTER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CHARACTER_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_group_constituent; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGroup_constituent) {
			return visitor.visitGroup_constituent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Group_constituent_listContext extends ParserRuleContext {
	public group_constituent(): Group_constituentContext[];
	public group_constituent(i: number): Group_constituentContext;
	public group_constituent(i?: number): Group_constituentContext | Group_constituentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Group_constituentContext);
		} else {
			return this.getRuleContext(i, Group_constituentContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_group_constituent_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGroup_constituent_list) {
			return visitor.visitGroup_constituent_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Group_declarationContext extends ParserRuleContext {
	public GROUP(): TerminalNode { return this.getToken(vhdlParser.GROUP, 0); }
	public label_colon(): Label_colonContext {
		return this.getRuleContext(0, Label_colonContext);
	}
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public group_constituent_list(): Group_constituent_listContext {
		return this.getRuleContext(0, Group_constituent_listContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_group_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGroup_declaration) {
			return visitor.visitGroup_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Group_template_declarationContext extends ParserRuleContext {
	public GROUP(): TerminalNode { return this.getToken(vhdlParser.GROUP, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public entity_class_entry_list(): Entity_class_entry_listContext {
		return this.getRuleContext(0, Entity_class_entry_listContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_group_template_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGroup_template_declaration) {
			return visitor.visitGroup_template_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Guarded_signal_specificationContext extends ParserRuleContext {
	public signal_list(): Signal_listContext {
		return this.getRuleContext(0, Signal_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_guarded_signal_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitGuarded_signal_specification) {
			return visitor.visitGuarded_signal_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public BASIC_IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BASIC_IDENTIFIER, 0); }
	public EXTENDED_IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.EXTENDED_IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_identifier; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Identifier_listContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_identifier_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitIdentifier_list) {
			return visitor.visitIdentifier_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_statementContext extends ParserRuleContext {
	public IF(): TerminalNode[];
	public IF(i: number): TerminalNode;
	public IF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.IF);
		} else {
			return this.getToken(vhdlParser.IF, i);
		}
	}
	public condition(): ConditionContext[];
	public condition(i: number): ConditionContext;
	public condition(i?: number): ConditionContext | ConditionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConditionContext);
		} else {
			return this.getRuleContext(i, ConditionContext);
		}
	}
	public THEN(): TerminalNode[];
	public THEN(i: number): TerminalNode;
	public THEN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.THEN);
		} else {
			return this.getToken(vhdlParser.THEN, i);
		}
	}
	public sequence_of_statements(): Sequence_of_statementsContext[];
	public sequence_of_statements(i: number): Sequence_of_statementsContext;
	public sequence_of_statements(i?: number): Sequence_of_statementsContext | Sequence_of_statementsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Sequence_of_statementsContext);
		} else {
			return this.getRuleContext(i, Sequence_of_statementsContext);
		}
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public ELSIF(): TerminalNode[];
	public ELSIF(i: number): TerminalNode;
	public ELSIF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.ELSIF);
		} else {
			return this.getToken(vhdlParser.ELSIF, i);
		}
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ELSE, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_if_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitIf_statement) {
			return visitor.visitIf_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Index_constraintContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public discrete_range(): Discrete_rangeContext[];
	public discrete_range(i: number): Discrete_rangeContext;
	public discrete_range(i?: number): Discrete_rangeContext | Discrete_rangeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Discrete_rangeContext);
		} else {
			return this.getRuleContext(i, Discrete_rangeContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_index_constraint; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitIndex_constraint) {
			return visitor.visitIndex_constraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Index_specificationContext extends ParserRuleContext {
	public discrete_range(): Discrete_rangeContext | undefined {
		return this.tryGetRuleContext(0, Discrete_rangeContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_index_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitIndex_specification) {
			return visitor.visitIndex_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Index_subtype_definitionContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public RANGE(): TerminalNode { return this.getToken(vhdlParser.RANGE, 0); }
	public BOX(): TerminalNode { return this.getToken(vhdlParser.BOX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_index_subtype_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitIndex_subtype_definition) {
			return visitor.visitIndex_subtype_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Instantiated_unitContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public COMPONENT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.COMPONENT, 0); }
	public ENTITY(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ENTITY, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	public CONFIGURATION(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CONFIGURATION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_instantiated_unit; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInstantiated_unit) {
			return visitor.visitInstantiated_unit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Instantiation_listContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	public OTHERS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OTHERS, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ALL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_instantiation_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInstantiation_list) {
			return visitor.visitInstantiation_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_constant_declarationContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public CONSTANT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CONSTANT, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IN, 0); }
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_constant_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_constant_declaration) {
			return visitor.visitInterface_constant_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_declarationContext extends ParserRuleContext {
	public interface_constant_declaration(): Interface_constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Interface_constant_declarationContext);
	}
	public interface_signal_declaration(): Interface_signal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Interface_signal_declarationContext);
	}
	public interface_variable_declaration(): Interface_variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Interface_variable_declarationContext);
	}
	public interface_file_declaration(): Interface_file_declarationContext | undefined {
		return this.tryGetRuleContext(0, Interface_file_declarationContext);
	}
	public interface_terminal_declaration(): Interface_terminal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Interface_terminal_declarationContext);
	}
	public interface_quantity_declaration(): Interface_quantity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Interface_quantity_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_declaration) {
			return visitor.visitInterface_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_elementContext extends ParserRuleContext {
	public interface_declaration(): Interface_declarationContext {
		return this.getRuleContext(0, Interface_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_element; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_element) {
			return visitor.visitInterface_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_file_declarationContext extends ParserRuleContext {
	public FILE(): TerminalNode { return this.getToken(vhdlParser.FILE, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_file_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_file_declaration) {
			return visitor.visitInterface_file_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_signal_listContext extends ParserRuleContext {
	public interface_signal_declaration(): Interface_signal_declarationContext[];
	public interface_signal_declaration(i: number): Interface_signal_declarationContext;
	public interface_signal_declaration(i?: number): Interface_signal_declarationContext | Interface_signal_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Interface_signal_declarationContext);
		} else {
			return this.getRuleContext(i, Interface_signal_declarationContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.SEMI);
		} else {
			return this.getToken(vhdlParser.SEMI, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_signal_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_signal_list) {
			return visitor.visitInterface_signal_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_port_listContext extends ParserRuleContext {
	public interface_port_declaration(): Interface_port_declarationContext[];
	public interface_port_declaration(i: number): Interface_port_declarationContext;
	public interface_port_declaration(i?: number): Interface_port_declarationContext | Interface_port_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Interface_port_declarationContext);
		} else {
			return this.getRuleContext(i, Interface_port_declarationContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.SEMI);
		} else {
			return this.getToken(vhdlParser.SEMI, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_port_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_port_list) {
			return visitor.visitInterface_port_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_listContext extends ParserRuleContext {
	public interface_element(): Interface_elementContext[];
	public interface_element(i: number): Interface_elementContext;
	public interface_element(i?: number): Interface_elementContext | Interface_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Interface_elementContext);
		} else {
			return this.getRuleContext(i, Interface_elementContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.SEMI);
		} else {
			return this.getToken(vhdlParser.SEMI, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_list) {
			return visitor.visitInterface_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_quantity_declarationContext extends ParserRuleContext {
	public QUANTITY(): TerminalNode { return this.getToken(vhdlParser.QUANTITY, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public IN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IN, 0); }
	public OUT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_quantity_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_quantity_declaration) {
			return visitor.visitInterface_quantity_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_port_declarationContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public signal_mode(): Signal_modeContext | undefined {
		return this.tryGetRuleContext(0, Signal_modeContext);
	}
	public BUS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BUS, 0); }
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_port_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_port_declaration) {
			return visitor.visitInterface_port_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_signal_declarationContext extends ParserRuleContext {
	public SIGNAL(): TerminalNode { return this.getToken(vhdlParser.SIGNAL, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public signal_mode(): Signal_modeContext | undefined {
		return this.tryGetRuleContext(0, Signal_modeContext);
	}
	public BUS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BUS, 0); }
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_signal_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_signal_declaration) {
			return visitor.visitInterface_signal_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_terminal_declarationContext extends ParserRuleContext {
	public TERMINAL(): TerminalNode { return this.getToken(vhdlParser.TERMINAL, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subnature_indication(): Subnature_indicationContext {
		return this.getRuleContext(0, Subnature_indicationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_terminal_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_terminal_declaration) {
			return visitor.visitInterface_terminal_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_variable_declarationContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public VARIABLE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARIABLE, 0); }
	public signal_mode(): Signal_modeContext | undefined {
		return this.tryGetRuleContext(0, Signal_modeContext);
	}
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_interface_variable_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitInterface_variable_declaration) {
			return visitor.visitInterface_variable_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Iteration_schemeContext extends ParserRuleContext {
	public WHILE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.WHILE, 0); }
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	public FOR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.FOR, 0); }
	public parameter_specification(): Parameter_specificationContext | undefined {
		return this.tryGetRuleContext(0, Parameter_specificationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_iteration_scheme; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitIteration_scheme) {
			return visitor.visitIteration_scheme(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Label_colonContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_label_colon; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLabel_colon) {
			return visitor.visitLabel_colon(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Library_clauseContext extends ParserRuleContext {
	public LIBRARY(): TerminalNode { return this.getToken(vhdlParser.LIBRARY, 0); }
	public logical_name_list(): Logical_name_listContext {
		return this.getRuleContext(0, Logical_name_listContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_library_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLibrary_clause) {
			return visitor.visitLibrary_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Library_unitContext extends ParserRuleContext {
	public secondary_unit(): Secondary_unitContext | undefined {
		return this.tryGetRuleContext(0, Secondary_unitContext);
	}
	public primary_unit(): Primary_unitContext | undefined {
		return this.tryGetRuleContext(0, Primary_unitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_library_unit; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLibrary_unit) {
			return visitor.visitLibrary_unit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public NULL_(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NULL_, 0); }
	public BIT_STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BIT_STRING_LITERAL, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.STRING_LITERAL, 0); }
	public enumeration_literal(): Enumeration_literalContext | undefined {
		return this.tryGetRuleContext(0, Enumeration_literalContext);
	}
	public numeric_literal(): Numeric_literalContext | undefined {
		return this.tryGetRuleContext(0, Numeric_literalContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_literal; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Logical_nameContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_logical_name; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLogical_name) {
			return visitor.visitLogical_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Logical_name_listContext extends ParserRuleContext {
	public logical_name(): Logical_nameContext[];
	public logical_name(i: number): Logical_nameContext;
	public logical_name(i?: number): Logical_nameContext | Logical_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Logical_nameContext);
		} else {
			return this.getRuleContext(i, Logical_nameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_logical_name_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLogical_name_list) {
			return visitor.visitLogical_name_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Logical_operatorContext extends ParserRuleContext {
	public AND(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OR, 0); }
	public NAND(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NAND, 0); }
	public NOR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NOR, 0); }
	public XOR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.XOR, 0); }
	public XNOR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.XNOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_logical_operator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLogical_operator) {
			return visitor.visitLogical_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Loop_statementContext extends ParserRuleContext {
	public LOOP(): TerminalNode[];
	public LOOP(i: number): TerminalNode;
	public LOOP(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.LOOP);
		} else {
			return this.getToken(vhdlParser.LOOP, i);
		}
	}
	public sequence_of_statements(): Sequence_of_statementsContext {
		return this.getRuleContext(0, Sequence_of_statementsContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public iteration_scheme(): Iteration_schemeContext | undefined {
		return this.tryGetRuleContext(0, Iteration_schemeContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_loop_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitLoop_statement) {
			return visitor.visitLoop_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signal_modeContext extends ParserRuleContext {
	public IN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IN, 0); }
	public OUT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OUT, 0); }
	public INOUT(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.INOUT, 0); }
	public BUFFER(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BUFFER, 0); }
	public LINKAGE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LINKAGE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_signal_mode; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSignal_mode) {
			return visitor.visitSignal_mode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Multiplying_operatorContext extends ParserRuleContext {
	public MUL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.MUL, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.MOD, 0); }
	public REM(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.REM, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_multiplying_operator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitMultiplying_operator) {
			return visitor.visitMultiplying_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NameContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.STRING_LITERAL, 0); }
	public name_part(): Name_partContext[];
	public name_part(i: number): Name_partContext;
	public name_part(i?: number): Name_partContext | Name_partContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Name_partContext);
		} else {
			return this.getRuleContext(i, Name_partContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_name; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitName) {
			return visitor.visitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Name_partContext extends ParserRuleContext {
	public selected_name_part(): Selected_name_partContext | undefined {
		return this.tryGetRuleContext(0, Selected_name_partContext);
	}
	public function_call_or_indexed_name_part(): Function_call_or_indexed_name_partContext | undefined {
		return this.tryGetRuleContext(0, Function_call_or_indexed_name_partContext);
	}
	public slice_name_part(): Slice_name_partContext | undefined {
		return this.tryGetRuleContext(0, Slice_name_partContext);
	}
	public attribute_name_part(): Attribute_name_partContext | undefined {
		return this.tryGetRuleContext(0, Attribute_name_partContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_name_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitName_part) {
			return visitor.visitName_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Selected_nameContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.DOT);
		} else {
			return this.getToken(vhdlParser.DOT, i);
		}
	}
	public suffix(): SuffixContext[];
	public suffix(i: number): SuffixContext;
	public suffix(i?: number): SuffixContext | SuffixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SuffixContext);
		} else {
			return this.getRuleContext(i, SuffixContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_selected_name; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSelected_name) {
			return visitor.visitSelected_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Selected_name_partContext extends ParserRuleContext {
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.DOT);
		} else {
			return this.getToken(vhdlParser.DOT, i);
		}
	}
	public suffix(): SuffixContext[];
	public suffix(i: number): SuffixContext;
	public suffix(i?: number): SuffixContext | SuffixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SuffixContext);
		} else {
			return this.getRuleContext(i, SuffixContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_selected_name_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSelected_name_part) {
			return visitor.visitSelected_name_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_call_or_indexed_name_partContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public actual_parameter_part(): Actual_parameter_partContext {
		return this.getRuleContext(0, Actual_parameter_partContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_function_call_or_indexed_name_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFunction_call_or_indexed_name_part) {
			return visitor.visitFunction_call_or_indexed_name_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Slice_name_partContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public discrete_range(): Discrete_rangeContext {
		return this.getRuleContext(0, Discrete_rangeContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_slice_name_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSlice_name_part) {
			return visitor.visitSlice_name_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attribute_name_partContext extends ParserRuleContext {
	public APOSTROPHE(): TerminalNode { return this.getToken(vhdlParser.APOSTROPHE, 0); }
	public attribute_designator(): Attribute_designatorContext {
		return this.getRuleContext(0, Attribute_designatorContext);
	}
	public signature(): SignatureContext | undefined {
		return this.tryGetRuleContext(0, SignatureContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_attribute_name_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitAttribute_name_part) {
			return visitor.visitAttribute_name_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Nature_declarationContext extends ParserRuleContext {
	public NATURE(): TerminalNode { return this.getToken(vhdlParser.NATURE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public nature_definition(): Nature_definitionContext {
		return this.getRuleContext(0, Nature_definitionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_nature_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitNature_declaration) {
			return visitor.visitNature_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Nature_definitionContext extends ParserRuleContext {
	public scalar_nature_definition(): Scalar_nature_definitionContext | undefined {
		return this.tryGetRuleContext(0, Scalar_nature_definitionContext);
	}
	public composite_nature_definition(): Composite_nature_definitionContext | undefined {
		return this.tryGetRuleContext(0, Composite_nature_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_nature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitNature_definition) {
			return visitor.visitNature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Nature_element_declarationContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public element_subnature_definition(): Element_subnature_definitionContext {
		return this.getRuleContext(0, Element_subnature_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_nature_element_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitNature_element_declaration) {
			return visitor.visitNature_element_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Next_statementContext extends ParserRuleContext {
	public NEXT(): TerminalNode { return this.getToken(vhdlParser.NEXT, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public WHEN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.WHEN, 0); }
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_next_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitNext_statement) {
			return visitor.visitNext_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Numeric_literalContext extends ParserRuleContext {
	public abstract_literal(): Abstract_literalContext | undefined {
		return this.tryGetRuleContext(0, Abstract_literalContext);
	}
	public physical_literal(): Physical_literalContext | undefined {
		return this.tryGetRuleContext(0, Physical_literalContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_numeric_literal; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitNumeric_literal) {
			return visitor.visitNumeric_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Object_declarationContext extends ParserRuleContext {
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public signal_declaration(): Signal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Signal_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public file_declaration(): File_declarationContext | undefined {
		return this.tryGetRuleContext(0, File_declarationContext);
	}
	public terminal_declaration(): Terminal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Terminal_declarationContext);
	}
	public quantity_declaration(): Quantity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Quantity_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_object_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitObject_declaration) {
			return visitor.visitObject_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptsContext extends ParserRuleContext {
	public GUARDED(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.GUARDED, 0); }
	public delay_mechanism(): Delay_mechanismContext | undefined {
		return this.tryGetRuleContext(0, Delay_mechanismContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_opts; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitOpts) {
			return visitor.visitOpts(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Package_bodyContext extends ParserRuleContext {
	public PACKAGE(): TerminalNode[];
	public PACKAGE(i: number): TerminalNode;
	public PACKAGE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.PACKAGE);
		} else {
			return this.getToken(vhdlParser.PACKAGE, i);
		}
	}
	public BODY(): TerminalNode[];
	public BODY(i: number): TerminalNode;
	public BODY(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.BODY);
		} else {
			return this.getToken(vhdlParser.BODY, i);
		}
	}
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public package_body_declarative_part(): Package_body_declarative_partContext {
		return this.getRuleContext(0, Package_body_declarative_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_package_body; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPackage_body) {
			return visitor.visitPackage_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Package_body_declarative_itemContext extends ParserRuleContext {
	public subprogram_declaration(): Subprogram_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_declarationContext);
	}
	public subprogram_body(): Subprogram_bodyContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_bodyContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public subtype_declaration(): Subtype_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_declarationContext);
	}
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public file_declaration(): File_declarationContext | undefined {
		return this.tryGetRuleContext(0, File_declarationContext);
	}
	public alias_declaration(): Alias_declarationContext | undefined {
		return this.tryGetRuleContext(0, Alias_declarationContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public group_template_declaration(): Group_template_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_template_declarationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_package_body_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPackage_body_declarative_item) {
			return visitor.visitPackage_body_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Package_body_declarative_partContext extends ParserRuleContext {
	public package_body_declarative_item(): Package_body_declarative_itemContext[];
	public package_body_declarative_item(i: number): Package_body_declarative_itemContext;
	public package_body_declarative_item(i?: number): Package_body_declarative_itemContext | Package_body_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Package_body_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Package_body_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_package_body_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPackage_body_declarative_part) {
			return visitor.visitPackage_body_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Package_declarationContext extends ParserRuleContext {
	public PACKAGE(): TerminalNode[];
	public PACKAGE(i: number): TerminalNode;
	public PACKAGE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.PACKAGE);
		} else {
			return this.getToken(vhdlParser.PACKAGE, i);
		}
	}
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public package_declarative_part(): Package_declarative_partContext {
		return this.getRuleContext(0, Package_declarative_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_package_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPackage_declaration) {
			return visitor.visitPackage_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Package_declarative_itemContext extends ParserRuleContext {
	public subprogram_declaration(): Subprogram_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_declarationContext);
	}
	public subprogram_body(): Subprogram_bodyContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_bodyContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public subtype_declaration(): Subtype_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_declarationContext);
	}
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public signal_declaration(): Signal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Signal_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public file_declaration(): File_declarationContext | undefined {
		return this.tryGetRuleContext(0, File_declarationContext);
	}
	public alias_declaration(): Alias_declarationContext | undefined {
		return this.tryGetRuleContext(0, Alias_declarationContext);
	}
	public component_declaration(): Component_declarationContext | undefined {
		return this.tryGetRuleContext(0, Component_declarationContext);
	}
	public attribute_declaration(): Attribute_declarationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_declarationContext);
	}
	public attribute_specification(): Attribute_specificationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_specificationContext);
	}
	public disconnection_specification(): Disconnection_specificationContext | undefined {
		return this.tryGetRuleContext(0, Disconnection_specificationContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public group_template_declaration(): Group_template_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_template_declarationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	public nature_declaration(): Nature_declarationContext | undefined {
		return this.tryGetRuleContext(0, Nature_declarationContext);
	}
	public subnature_declaration(): Subnature_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subnature_declarationContext);
	}
	public terminal_declaration(): Terminal_declarationContext | undefined {
		return this.tryGetRuleContext(0, Terminal_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_package_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPackage_declarative_item) {
			return visitor.visitPackage_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Package_declarative_partContext extends ParserRuleContext {
	public package_declarative_item(): Package_declarative_itemContext[];
	public package_declarative_item(i: number): Package_declarative_itemContext;
	public package_declarative_item(i?: number): Package_declarative_itemContext | Package_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Package_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Package_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_package_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPackage_declarative_part) {
			return visitor.visitPackage_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Parameter_specificationContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public IN(): TerminalNode { return this.getToken(vhdlParser.IN, 0); }
	public discrete_range(): Discrete_rangeContext {
		return this.getRuleContext(0, Discrete_rangeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_parameter_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitParameter_specification) {
			return visitor.visitParameter_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Physical_literalContext extends ParserRuleContext {
	public abstract_literal(): Abstract_literalContext {
		return this.getRuleContext(0, Abstract_literalContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_physical_literal; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPhysical_literal) {
			return visitor.visitPhysical_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Physical_type_definitionContext extends ParserRuleContext {
	public range_constraint(): Range_constraintContext {
		return this.getRuleContext(0, Range_constraintContext);
	}
	public UNITS(): TerminalNode[];
	public UNITS(i: number): TerminalNode;
	public UNITS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.UNITS);
		} else {
			return this.getToken(vhdlParser.UNITS, i);
		}
	}
	public base_unit_declaration(): Base_unit_declarationContext {
		return this.getRuleContext(0, Base_unit_declarationContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public secondary_unit_declaration(): Secondary_unit_declarationContext[];
	public secondary_unit_declaration(i: number): Secondary_unit_declarationContext;
	public secondary_unit_declaration(i?: number): Secondary_unit_declarationContext | Secondary_unit_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Secondary_unit_declarationContext);
		} else {
			return this.getRuleContext(i, Secondary_unit_declarationContext);
		}
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_physical_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPhysical_type_definition) {
			return visitor.visitPhysical_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Port_clauseContext extends ParserRuleContext {
	public PORT(): TerminalNode { return this.getToken(vhdlParser.PORT, 0); }
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public port_list(): Port_listContext {
		return this.getRuleContext(0, Port_listContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_port_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPort_clause) {
			return visitor.visitPort_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Port_listContext extends ParserRuleContext {
	public interface_port_list(): Interface_port_listContext {
		return this.getRuleContext(0, Interface_port_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_port_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPort_list) {
			return visitor.visitPort_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Port_map_aspectContext extends ParserRuleContext {
	public PORT(): TerminalNode { return this.getToken(vhdlParser.PORT, 0); }
	public MAP(): TerminalNode { return this.getToken(vhdlParser.MAP, 0); }
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public association_list(): Association_listContext {
		return this.getRuleContext(0, Association_listContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_port_map_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPort_map_aspect) {
			return visitor.visitPort_map_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryContext extends ParserRuleContext {
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public qualified_expression(): Qualified_expressionContext | undefined {
		return this.tryGetRuleContext(0, Qualified_expressionContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	public allocator(): AllocatorContext | undefined {
		return this.tryGetRuleContext(0, AllocatorContext);
	}
	public aggregate(): AggregateContext | undefined {
		return this.tryGetRuleContext(0, AggregateContext);
	}
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_primary; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPrimary) {
			return visitor.visitPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Primary_unitContext extends ParserRuleContext {
	public entity_declaration(): Entity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Entity_declarationContext);
	}
	public configuration_declaration(): Configuration_declarationContext | undefined {
		return this.tryGetRuleContext(0, Configuration_declarationContext);
	}
	public package_declaration(): Package_declarationContext | undefined {
		return this.tryGetRuleContext(0, Package_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_primary_unit; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitPrimary_unit) {
			return visitor.visitPrimary_unit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Procedural_declarative_itemContext extends ParserRuleContext {
	public subprogram_declaration(): Subprogram_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_declarationContext);
	}
	public subprogram_body(): Subprogram_bodyContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_bodyContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public subtype_declaration(): Subtype_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_declarationContext);
	}
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public alias_declaration(): Alias_declarationContext | undefined {
		return this.tryGetRuleContext(0, Alias_declarationContext);
	}
	public attribute_declaration(): Attribute_declarationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_declarationContext);
	}
	public attribute_specification(): Attribute_specificationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_specificationContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public group_template_declaration(): Group_template_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_template_declarationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_procedural_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcedural_declarative_item) {
			return visitor.visitProcedural_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Procedural_declarative_partContext extends ParserRuleContext {
	public procedural_declarative_item(): Procedural_declarative_itemContext[];
	public procedural_declarative_item(i: number): Procedural_declarative_itemContext;
	public procedural_declarative_item(i?: number): Procedural_declarative_itemContext | Procedural_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Procedural_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Procedural_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_procedural_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcedural_declarative_part) {
			return visitor.visitProcedural_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Procedural_statement_partContext extends ParserRuleContext {
	public sequential_statement(): Sequential_statementContext[];
	public sequential_statement(i: number): Sequential_statementContext;
	public sequential_statement(i?: number): Sequential_statementContext | Sequential_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Sequential_statementContext);
		} else {
			return this.getRuleContext(i, Sequential_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_procedural_statement_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcedural_statement_part) {
			return visitor.visitProcedural_statement_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Procedure_callContext extends ParserRuleContext {
	public selected_name(): Selected_nameContext {
		return this.getRuleContext(0, Selected_nameContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public actual_parameter_part(): Actual_parameter_partContext | undefined {
		return this.tryGetRuleContext(0, Actual_parameter_partContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_procedure_call; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcedure_call) {
			return visitor.visitProcedure_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Procedure_call_statementContext extends ParserRuleContext {
	public procedure_call(): Procedure_callContext {
		return this.getRuleContext(0, Procedure_callContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_procedure_call_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcedure_call_statement) {
			return visitor.visitProcedure_call_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Process_declarative_itemContext extends ParserRuleContext {
	public subprogram_declaration(): Subprogram_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_declarationContext);
	}
	public subprogram_body(): Subprogram_bodyContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_bodyContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public subtype_declaration(): Subtype_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_declarationContext);
	}
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public file_declaration(): File_declarationContext | undefined {
		return this.tryGetRuleContext(0, File_declarationContext);
	}
	public alias_declaration(): Alias_declarationContext | undefined {
		return this.tryGetRuleContext(0, Alias_declarationContext);
	}
	public attribute_declaration(): Attribute_declarationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_declarationContext);
	}
	public attribute_specification(): Attribute_specificationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_specificationContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public group_template_declaration(): Group_template_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_template_declarationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_process_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcess_declarative_item) {
			return visitor.visitProcess_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Process_declarative_partContext extends ParserRuleContext {
	public process_declarative_item(): Process_declarative_itemContext[];
	public process_declarative_item(i: number): Process_declarative_itemContext;
	public process_declarative_item(i?: number): Process_declarative_itemContext | Process_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Process_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Process_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_process_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcess_declarative_part) {
			return visitor.visitProcess_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Process_statementContext extends ParserRuleContext {
	public PROCESS(): TerminalNode[];
	public PROCESS(i: number): TerminalNode;
	public PROCESS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.PROCESS);
		} else {
			return this.getToken(vhdlParser.PROCESS, i);
		}
	}
	public process_declarative_part(): Process_declarative_partContext {
		return this.getRuleContext(0, Process_declarative_partContext);
	}
	public BEGIN(): TerminalNode { return this.getToken(vhdlParser.BEGIN, 0); }
	public process_statement_part(): Process_statement_partContext {
		return this.getRuleContext(0, Process_statement_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public POSTPONED(): TerminalNode[];
	public POSTPONED(i: number): TerminalNode;
	public POSTPONED(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.POSTPONED);
		} else {
			return this.getToken(vhdlParser.POSTPONED, i);
		}
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public sensitivity_list(): Sensitivity_listContext | undefined {
		return this.tryGetRuleContext(0, Sensitivity_listContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	public IS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IS, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_process_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcess_statement) {
			return visitor.visitProcess_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Process_statement_partContext extends ParserRuleContext {
	public sequential_statement(): Sequential_statementContext[];
	public sequential_statement(i: number): Sequential_statementContext;
	public sequential_statement(i?: number): Sequential_statementContext | Sequential_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Sequential_statementContext);
		} else {
			return this.getRuleContext(i, Sequential_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_process_statement_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcess_statement_part) {
			return visitor.visitProcess_statement_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Qualified_expressionContext extends ParserRuleContext {
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public APOSTROPHE(): TerminalNode { return this.getToken(vhdlParser.APOSTROPHE, 0); }
	public aggregate(): AggregateContext | undefined {
		return this.tryGetRuleContext(0, AggregateContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_qualified_expression; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitQualified_expression) {
			return visitor.visitQualified_expression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Quantity_declarationContext extends ParserRuleContext {
	public free_quantity_declaration(): Free_quantity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Free_quantity_declarationContext);
	}
	public branch_quantity_declaration(): Branch_quantity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Branch_quantity_declarationContext);
	}
	public source_quantity_declaration(): Source_quantity_declarationContext | undefined {
		return this.tryGetRuleContext(0, Source_quantity_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_quantity_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitQuantity_declaration) {
			return visitor.visitQuantity_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Quantity_listContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	public OTHERS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OTHERS, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ALL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_quantity_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitQuantity_list) {
			return visitor.visitQuantity_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Quantity_specificationContext extends ParserRuleContext {
	public quantity_list(): Quantity_listContext {
		return this.getRuleContext(0, Quantity_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_quantity_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitQuantity_specification) {
			return visitor.visitQuantity_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Range_declContext extends ParserRuleContext {
	public explicit_range(): Explicit_rangeContext | undefined {
		return this.tryGetRuleContext(0, Explicit_rangeContext);
	}
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_range_decl; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitRange_decl) {
			return visitor.visitRange_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Explicit_rangeContext extends ParserRuleContext {
	public simple_expression(): Simple_expressionContext[];
	public simple_expression(i: number): Simple_expressionContext;
	public simple_expression(i?: number): Simple_expressionContext | Simple_expressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_expressionContext);
		} else {
			return this.getRuleContext(i, Simple_expressionContext);
		}
	}
	public direction(): DirectionContext | undefined {
		return this.tryGetRuleContext(0, DirectionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_explicit_range; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitExplicit_range) {
			return visitor.visitExplicit_range(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Range_constraintContext extends ParserRuleContext {
	public RANGE(): TerminalNode { return this.getToken(vhdlParser.RANGE, 0); }
	public range_decl(): Range_declContext {
		return this.getRuleContext(0, Range_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_range_constraint; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitRange_constraint) {
			return visitor.visitRange_constraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Record_nature_definitionContext extends ParserRuleContext {
	public RECORD(): TerminalNode[];
	public RECORD(i: number): TerminalNode;
	public RECORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.RECORD);
		} else {
			return this.getToken(vhdlParser.RECORD, i);
		}
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public nature_element_declaration(): Nature_element_declarationContext[];
	public nature_element_declaration(i: number): Nature_element_declarationContext;
	public nature_element_declaration(i?: number): Nature_element_declarationContext | Nature_element_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Nature_element_declarationContext);
		} else {
			return this.getRuleContext(i, Nature_element_declarationContext);
		}
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_record_nature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitRecord_nature_definition) {
			return visitor.visitRecord_nature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Record_type_definitionContext extends ParserRuleContext {
	public RECORD(): TerminalNode[];
	public RECORD(i: number): TerminalNode;
	public RECORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.RECORD);
		} else {
			return this.getToken(vhdlParser.RECORD, i);
		}
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public element_declaration(): Element_declarationContext[];
	public element_declaration(i: number): Element_declarationContext;
	public element_declaration(i?: number): Element_declarationContext | Element_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Element_declarationContext);
		} else {
			return this.getRuleContext(i, Element_declarationContext);
		}
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_record_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitRecord_type_definition) {
			return visitor.visitRecord_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelationContext extends ParserRuleContext {
	public shift_expression(): Shift_expressionContext[];
	public shift_expression(i: number): Shift_expressionContext;
	public shift_expression(i?: number): Shift_expressionContext | Shift_expressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Shift_expressionContext);
		} else {
			return this.getRuleContext(i, Shift_expressionContext);
		}
	}
	public relational_operator(): Relational_operatorContext | undefined {
		return this.tryGetRuleContext(0, Relational_operatorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_relation; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitRelation) {
			return visitor.visitRelation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Relational_operatorContext extends ParserRuleContext {
	public EQ(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.EQ, 0); }
	public NEQ(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NEQ, 0); }
	public LOWERTHAN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LOWERTHAN, 0); }
	public LE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LE, 0); }
	public GREATERTHAN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.GREATERTHAN, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.GE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_relational_operator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitRelational_operator) {
			return visitor.visitRelational_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Report_statementContext extends ParserRuleContext {
	public REPORT(): TerminalNode { return this.getToken(vhdlParser.REPORT, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public SEVERITY(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SEVERITY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_report_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitReport_statement) {
			return visitor.visitReport_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Return_statementContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(vhdlParser.RETURN, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_return_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitReturn_statement) {
			return visitor.visitReturn_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Scalar_nature_definitionContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public ACROSS(): TerminalNode { return this.getToken(vhdlParser.ACROSS, 0); }
	public THROUGH(): TerminalNode { return this.getToken(vhdlParser.THROUGH, 0); }
	public REFERENCE(): TerminalNode { return this.getToken(vhdlParser.REFERENCE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_scalar_nature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitScalar_nature_definition) {
			return visitor.visitScalar_nature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Scalar_type_definitionContext extends ParserRuleContext {
	public physical_type_definition(): Physical_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Physical_type_definitionContext);
	}
	public enumeration_type_definition(): Enumeration_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Enumeration_type_definitionContext);
	}
	public range_constraint(): Range_constraintContext | undefined {
		return this.tryGetRuleContext(0, Range_constraintContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_scalar_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitScalar_type_definition) {
			return visitor.visitScalar_type_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Secondary_unitContext extends ParserRuleContext {
	public architecture_body(): Architecture_bodyContext | undefined {
		return this.tryGetRuleContext(0, Architecture_bodyContext);
	}
	public package_body(): Package_bodyContext | undefined {
		return this.tryGetRuleContext(0, Package_bodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_secondary_unit; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSecondary_unit) {
			return visitor.visitSecondary_unit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Secondary_unit_declarationContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public EQ(): TerminalNode { return this.getToken(vhdlParser.EQ, 0); }
	public physical_literal(): Physical_literalContext {
		return this.getRuleContext(0, Physical_literalContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_secondary_unit_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSecondary_unit_declaration) {
			return visitor.visitSecondary_unit_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Selected_signal_assignmentContext extends ParserRuleContext {
	public WITH(): TerminalNode { return this.getToken(vhdlParser.WITH, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public SELECT(): TerminalNode { return this.getToken(vhdlParser.SELECT, 0); }
	public target(): TargetContext {
		return this.getRuleContext(0, TargetContext);
	}
	public LE(): TerminalNode { return this.getToken(vhdlParser.LE, 0); }
	public opts(): OptsContext {
		return this.getRuleContext(0, OptsContext);
	}
	public selected_waveforms(): Selected_waveformsContext {
		return this.getRuleContext(0, Selected_waveformsContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_selected_signal_assignment; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSelected_signal_assignment) {
			return visitor.visitSelected_signal_assignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Selected_waveformsContext extends ParserRuleContext {
	public waveform(): WaveformContext[];
	public waveform(i: number): WaveformContext;
	public waveform(i?: number): WaveformContext | WaveformContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WaveformContext);
		} else {
			return this.getRuleContext(i, WaveformContext);
		}
	}
	public WHEN(): TerminalNode[];
	public WHEN(i: number): TerminalNode;
	public WHEN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.WHEN);
		} else {
			return this.getToken(vhdlParser.WHEN, i);
		}
	}
	public choices(): ChoicesContext[];
	public choices(i: number): ChoicesContext;
	public choices(i?: number): ChoicesContext | ChoicesContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ChoicesContext);
		} else {
			return this.getRuleContext(i, ChoicesContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_selected_waveforms; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSelected_waveforms) {
			return visitor.visitSelected_waveforms(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sensitivity_clauseContext extends ParserRuleContext {
	public ON(): TerminalNode { return this.getToken(vhdlParser.ON, 0); }
	public sensitivity_list(): Sensitivity_listContext {
		return this.getRuleContext(0, Sensitivity_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_sensitivity_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSensitivity_clause) {
			return visitor.visitSensitivity_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sensitivity_listContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_sensitivity_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSensitivity_list) {
			return visitor.visitSensitivity_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sequence_of_statementsContext extends ParserRuleContext {
	public sequential_statement(): Sequential_statementContext[];
	public sequential_statement(i: number): Sequential_statementContext;
	public sequential_statement(i?: number): Sequential_statementContext | Sequential_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Sequential_statementContext);
		} else {
			return this.getRuleContext(i, Sequential_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_sequence_of_statements; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSequence_of_statements) {
			return visitor.visitSequence_of_statements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sequential_statementContext extends ParserRuleContext {
	public wait_statement(): Wait_statementContext | undefined {
		return this.tryGetRuleContext(0, Wait_statementContext);
	}
	public assertion_statement(): Assertion_statementContext | undefined {
		return this.tryGetRuleContext(0, Assertion_statementContext);
	}
	public report_statement(): Report_statementContext | undefined {
		return this.tryGetRuleContext(0, Report_statementContext);
	}
	public signal_assignment_statement(): Signal_assignment_statementContext | undefined {
		return this.tryGetRuleContext(0, Signal_assignment_statementContext);
	}
	public variable_assignment_statement(): Variable_assignment_statementContext | undefined {
		return this.tryGetRuleContext(0, Variable_assignment_statementContext);
	}
	public if_statement(): If_statementContext | undefined {
		return this.tryGetRuleContext(0, If_statementContext);
	}
	public case_statement(): Case_statementContext | undefined {
		return this.tryGetRuleContext(0, Case_statementContext);
	}
	public loop_statement(): Loop_statementContext | undefined {
		return this.tryGetRuleContext(0, Loop_statementContext);
	}
	public next_statement(): Next_statementContext | undefined {
		return this.tryGetRuleContext(0, Next_statementContext);
	}
	public exit_statement(): Exit_statementContext | undefined {
		return this.tryGetRuleContext(0, Exit_statementContext);
	}
	public return_statement(): Return_statementContext | undefined {
		return this.tryGetRuleContext(0, Return_statementContext);
	}
	public NULL_(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NULL_, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public break_statement(): Break_statementContext | undefined {
		return this.tryGetRuleContext(0, Break_statementContext);
	}
	public procedure_call_statement(): Procedure_call_statementContext | undefined {
		return this.tryGetRuleContext(0, Procedure_call_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_sequential_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSequential_statement) {
			return visitor.visitSequential_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Shift_expressionContext extends ParserRuleContext {
	public simple_expression(): Simple_expressionContext[];
	public simple_expression(i: number): Simple_expressionContext;
	public simple_expression(i?: number): Simple_expressionContext | Simple_expressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_expressionContext);
		} else {
			return this.getRuleContext(i, Simple_expressionContext);
		}
	}
	public shift_operator(): Shift_operatorContext | undefined {
		return this.tryGetRuleContext(0, Shift_operatorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_shift_expression; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitShift_expression) {
			return visitor.visitShift_expression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Shift_operatorContext extends ParserRuleContext {
	public SLL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SLL, 0); }
	public SRL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SRL, 0); }
	public SLA(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SLA, 0); }
	public SRA(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SRA, 0); }
	public ROL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ROL, 0); }
	public ROR(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ROR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_shift_operator; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitShift_operator) {
			return visitor.visitShift_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signal_assignment_statementContext extends ParserRuleContext {
	public target(): TargetContext {
		return this.getRuleContext(0, TargetContext);
	}
	public LE(): TerminalNode { return this.getToken(vhdlParser.LE, 0); }
	public waveform(): WaveformContext {
		return this.getRuleContext(0, WaveformContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public delay_mechanism(): Delay_mechanismContext | undefined {
		return this.tryGetRuleContext(0, Delay_mechanismContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_signal_assignment_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSignal_assignment_statement) {
			return visitor.visitSignal_assignment_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signal_declarationContext extends ParserRuleContext {
	public SIGNAL(): TerminalNode { return this.getToken(vhdlParser.SIGNAL, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public signal_kind(): Signal_kindContext | undefined {
		return this.tryGetRuleContext(0, Signal_kindContext);
	}
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_signal_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSignal_declaration) {
			return visitor.visitSignal_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signal_kindContext extends ParserRuleContext {
	public REGISTER(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.REGISTER, 0); }
	public BUS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.BUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_signal_kind; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSignal_kind) {
			return visitor.visitSignal_kind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signal_listContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	public OTHERS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.OTHERS, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ALL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_signal_list; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSignal_list) {
			return visitor.visitSignal_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SignatureContext extends ParserRuleContext {
	public LBRACKET(): TerminalNode { return this.getToken(vhdlParser.LBRACKET, 0); }
	public RBRACKET(): TerminalNode { return this.getToken(vhdlParser.RBRACKET, 0); }
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public RETURN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RETURN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_signature; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSignature) {
			return visitor.visitSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_expressionContext extends ParserRuleContext {
	public term(): TermContext[];
	public term(i: number): TermContext;
	public term(i?: number): TermContext | TermContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TermContext);
		} else {
			return this.getRuleContext(i, TermContext);
		}
	}
	public adding_operator(): Adding_operatorContext[];
	public adding_operator(i: number): Adding_operatorContext;
	public adding_operator(i?: number): Adding_operatorContext | Adding_operatorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Adding_operatorContext);
		} else {
			return this.getRuleContext(i, Adding_operatorContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simple_expression; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimple_expression) {
			return visitor.visitSimple_expression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_simultaneous_statementContext extends ParserRuleContext {
	public simple_expression(): Simple_expressionContext[];
	public simple_expression(i: number): Simple_expressionContext;
	public simple_expression(i?: number): Simple_expressionContext | Simple_expressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_expressionContext);
		} else {
			return this.getRuleContext(i, Simple_expressionContext);
		}
	}
	public ASSIGN(): TerminalNode { return this.getToken(vhdlParser.ASSIGN, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public tolerance_aspect(): Tolerance_aspectContext | undefined {
		return this.tryGetRuleContext(0, Tolerance_aspectContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simple_simultaneous_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimple_simultaneous_statement) {
			return visitor.visitSimple_simultaneous_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simultaneous_alternativeContext extends ParserRuleContext {
	public WHEN(): TerminalNode { return this.getToken(vhdlParser.WHEN, 0); }
	public choices(): ChoicesContext {
		return this.getRuleContext(0, ChoicesContext);
	}
	public ARROW(): TerminalNode { return this.getToken(vhdlParser.ARROW, 0); }
	public simultaneous_statement_part(): Simultaneous_statement_partContext {
		return this.getRuleContext(0, Simultaneous_statement_partContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simultaneous_alternative; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimultaneous_alternative) {
			return visitor.visitSimultaneous_alternative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simultaneous_case_statementContext extends ParserRuleContext {
	public CASE(): TerminalNode[];
	public CASE(i: number): TerminalNode;
	public CASE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.CASE);
		} else {
			return this.getToken(vhdlParser.CASE, i);
		}
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public USE(): TerminalNode { return this.getToken(vhdlParser.USE, 0); }
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public simultaneous_alternative(): Simultaneous_alternativeContext[];
	public simultaneous_alternative(i: number): Simultaneous_alternativeContext;
	public simultaneous_alternative(i?: number): Simultaneous_alternativeContext | Simultaneous_alternativeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simultaneous_alternativeContext);
		} else {
			return this.getRuleContext(i, Simultaneous_alternativeContext);
		}
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simultaneous_case_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimultaneous_case_statement) {
			return visitor.visitSimultaneous_case_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simultaneous_if_statementContext extends ParserRuleContext {
	public IF(): TerminalNode { return this.getToken(vhdlParser.IF, 0); }
	public condition(): ConditionContext[];
	public condition(i: number): ConditionContext;
	public condition(i?: number): ConditionContext | ConditionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConditionContext);
		} else {
			return this.getRuleContext(i, ConditionContext);
		}
	}
	public USE(): TerminalNode[];
	public USE(i: number): TerminalNode;
	public USE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.USE);
		} else {
			return this.getToken(vhdlParser.USE, i);
		}
	}
	public simultaneous_statement_part(): Simultaneous_statement_partContext[];
	public simultaneous_statement_part(i: number): Simultaneous_statement_partContext;
	public simultaneous_statement_part(i?: number): Simultaneous_statement_partContext | Simultaneous_statement_partContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simultaneous_statement_partContext);
		} else {
			return this.getRuleContext(i, Simultaneous_statement_partContext);
		}
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public ELSIF(): TerminalNode[];
	public ELSIF(i: number): TerminalNode;
	public ELSIF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.ELSIF);
		} else {
			return this.getToken(vhdlParser.ELSIF, i);
		}
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ELSE, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simultaneous_if_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimultaneous_if_statement) {
			return visitor.visitSimultaneous_if_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simultaneous_procedural_statementContext extends ParserRuleContext {
	public PROCEDURAL(): TerminalNode[];
	public PROCEDURAL(i: number): TerminalNode;
	public PROCEDURAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.PROCEDURAL);
		} else {
			return this.getToken(vhdlParser.PROCEDURAL, i);
		}
	}
	public procedural_declarative_part(): Procedural_declarative_partContext {
		return this.getRuleContext(0, Procedural_declarative_partContext);
	}
	public BEGIN(): TerminalNode { return this.getToken(vhdlParser.BEGIN, 0); }
	public procedural_statement_part(): Procedural_statement_partContext {
		return this.getRuleContext(0, Procedural_statement_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public IS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IS, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simultaneous_procedural_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimultaneous_procedural_statement) {
			return visitor.visitSimultaneous_procedural_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simultaneous_statementContext extends ParserRuleContext {
	public simple_simultaneous_statement(): Simple_simultaneous_statementContext | undefined {
		return this.tryGetRuleContext(0, Simple_simultaneous_statementContext);
	}
	public simultaneous_if_statement(): Simultaneous_if_statementContext | undefined {
		return this.tryGetRuleContext(0, Simultaneous_if_statementContext);
	}
	public simultaneous_case_statement(): Simultaneous_case_statementContext | undefined {
		return this.tryGetRuleContext(0, Simultaneous_case_statementContext);
	}
	public simultaneous_procedural_statement(): Simultaneous_procedural_statementContext | undefined {
		return this.tryGetRuleContext(0, Simultaneous_procedural_statementContext);
	}
	public NULL_(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NULL_, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simultaneous_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimultaneous_statement) {
			return visitor.visitSimultaneous_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simultaneous_statement_partContext extends ParserRuleContext {
	public simultaneous_statement(): Simultaneous_statementContext[];
	public simultaneous_statement(i: number): Simultaneous_statementContext;
	public simultaneous_statement(i?: number): Simultaneous_statementContext | Simultaneous_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simultaneous_statementContext);
		} else {
			return this.getRuleContext(i, Simultaneous_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_simultaneous_statement_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSimultaneous_statement_part) {
			return visitor.visitSimultaneous_statement_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Source_aspectContext extends ParserRuleContext {
	public SPECTRUM(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SPECTRUM, 0); }
	public simple_expression(): Simple_expressionContext[];
	public simple_expression(i: number): Simple_expressionContext;
	public simple_expression(i?: number): Simple_expressionContext | Simple_expressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_expressionContext);
		} else {
			return this.getRuleContext(i, Simple_expressionContext);
		}
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.COMMA, 0); }
	public NOISE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.NOISE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_source_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSource_aspect) {
			return visitor.visitSource_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Source_quantity_declarationContext extends ParserRuleContext {
	public QUANTITY(): TerminalNode { return this.getToken(vhdlParser.QUANTITY, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public source_aspect(): Source_aspectContext {
		return this.getRuleContext(0, Source_aspectContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_source_quantity_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSource_quantity_declaration) {
			return visitor.visitSource_quantity_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Step_limit_specificationContext extends ParserRuleContext {
	public LIMIT(): TerminalNode { return this.getToken(vhdlParser.LIMIT, 0); }
	public quantity_specification(): Quantity_specificationContext {
		return this.getRuleContext(0, Quantity_specificationContext);
	}
	public WITH(): TerminalNode { return this.getToken(vhdlParser.WITH, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_step_limit_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitStep_limit_specification) {
			return visitor.visitStep_limit_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subnature_declarationContext extends ParserRuleContext {
	public SUBNATURE(): TerminalNode { return this.getToken(vhdlParser.SUBNATURE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public subnature_indication(): Subnature_indicationContext {
		return this.getRuleContext(0, Subnature_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subnature_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubnature_declaration) {
			return visitor.visitSubnature_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subnature_indicationContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public index_constraint(): Index_constraintContext | undefined {
		return this.tryGetRuleContext(0, Index_constraintContext);
	}
	public TOLERANCE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.TOLERANCE, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public ACROSS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ACROSS, 0); }
	public THROUGH(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.THROUGH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subnature_indication; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubnature_indication) {
			return visitor.visitSubnature_indication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_bodyContext extends ParserRuleContext {
	public subprogram_specification(): Subprogram_specificationContext {
		return this.getRuleContext(0, Subprogram_specificationContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public subprogram_declarative_part(): Subprogram_declarative_partContext {
		return this.getRuleContext(0, Subprogram_declarative_partContext);
	}
	public BEGIN(): TerminalNode { return this.getToken(vhdlParser.BEGIN, 0); }
	public subprogram_statement_part(): Subprogram_statement_partContext {
		return this.getRuleContext(0, Subprogram_statement_partContext);
	}
	public END(): TerminalNode { return this.getToken(vhdlParser.END, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public subprogram_kind(): Subprogram_kindContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_kindContext);
	}
	public designator(): DesignatorContext | undefined {
		return this.tryGetRuleContext(0, DesignatorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subprogram_body; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubprogram_body) {
			return visitor.visitSubprogram_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_declarationContext extends ParserRuleContext {
	public subprogram_specification(): Subprogram_specificationContext {
		return this.getRuleContext(0, Subprogram_specificationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subprogram_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubprogram_declaration) {
			return visitor.visitSubprogram_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_declarative_itemContext extends ParserRuleContext {
	public subprogram_declaration(): Subprogram_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_declarationContext);
	}
	public subprogram_body(): Subprogram_bodyContext | undefined {
		return this.tryGetRuleContext(0, Subprogram_bodyContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public subtype_declaration(): Subtype_declarationContext | undefined {
		return this.tryGetRuleContext(0, Subtype_declarationContext);
	}
	public constant_declaration(): Constant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Constant_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public file_declaration(): File_declarationContext | undefined {
		return this.tryGetRuleContext(0, File_declarationContext);
	}
	public alias_declaration(): Alias_declarationContext | undefined {
		return this.tryGetRuleContext(0, Alias_declarationContext);
	}
	public attribute_declaration(): Attribute_declarationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_declarationContext);
	}
	public attribute_specification(): Attribute_specificationContext | undefined {
		return this.tryGetRuleContext(0, Attribute_specificationContext);
	}
	public use_clause(): Use_clauseContext | undefined {
		return this.tryGetRuleContext(0, Use_clauseContext);
	}
	public group_template_declaration(): Group_template_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_template_declarationContext);
	}
	public group_declaration(): Group_declarationContext | undefined {
		return this.tryGetRuleContext(0, Group_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subprogram_declarative_item; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubprogram_declarative_item) {
			return visitor.visitSubprogram_declarative_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_declarative_partContext extends ParserRuleContext {
	public subprogram_declarative_item(): Subprogram_declarative_itemContext[];
	public subprogram_declarative_item(i: number): Subprogram_declarative_itemContext;
	public subprogram_declarative_item(i?: number): Subprogram_declarative_itemContext | Subprogram_declarative_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Subprogram_declarative_itemContext);
		} else {
			return this.getRuleContext(i, Subprogram_declarative_itemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subprogram_declarative_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubprogram_declarative_part) {
			return visitor.visitSubprogram_declarative_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_kindContext extends ParserRuleContext {
	public PROCEDURE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.PROCEDURE, 0); }
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.FUNCTION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subprogram_kind; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubprogram_kind) {
			return visitor.visitSubprogram_kind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_specificationContext extends ParserRuleContext {
	public procedure_specification(): Procedure_specificationContext | undefined {
		return this.tryGetRuleContext(0, Procedure_specificationContext);
	}
	public function_specification(): Function_specificationContext | undefined {
		return this.tryGetRuleContext(0, Function_specificationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subprogram_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubprogram_specification) {
			return visitor.visitSubprogram_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Procedure_specificationContext extends ParserRuleContext {
	public PROCEDURE(): TerminalNode { return this.getToken(vhdlParser.PROCEDURE, 0); }
	public designator(): DesignatorContext {
		return this.getRuleContext(0, DesignatorContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public formal_parameter_list(): Formal_parameter_listContext | undefined {
		return this.tryGetRuleContext(0, Formal_parameter_listContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_procedure_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitProcedure_specification) {
			return visitor.visitProcedure_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_specificationContext extends ParserRuleContext {
	public FUNCTION(): TerminalNode { return this.getToken(vhdlParser.FUNCTION, 0); }
	public designator(): DesignatorContext {
		return this.getRuleContext(0, DesignatorContext);
	}
	public RETURN(): TerminalNode { return this.getToken(vhdlParser.RETURN, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.LPAREN, 0); }
	public formal_parameter_list(): Formal_parameter_listContext | undefined {
		return this.tryGetRuleContext(0, Formal_parameter_listContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.RPAREN, 0); }
	public PURE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.PURE, 0); }
	public IMPURE(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IMPURE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_function_specification; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitFunction_specification) {
			return visitor.visitFunction_specification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subprogram_statement_partContext extends ParserRuleContext {
	public sequential_statement(): Sequential_statementContext[];
	public sequential_statement(i: number): Sequential_statementContext;
	public sequential_statement(i?: number): Sequential_statementContext | Sequential_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Sequential_statementContext);
		} else {
			return this.getRuleContext(i, Sequential_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subprogram_statement_part; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubprogram_statement_part) {
			return visitor.visitSubprogram_statement_part(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subtype_declarationContext extends ParserRuleContext {
	public SUBTYPE(): TerminalNode { return this.getToken(vhdlParser.SUBTYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public IS(): TerminalNode { return this.getToken(vhdlParser.IS, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subtype_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubtype_declaration) {
			return visitor.visitSubtype_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Subtype_indicationContext extends ParserRuleContext {
	public selected_name(): Selected_nameContext[];
	public selected_name(i: number): Selected_nameContext;
	public selected_name(i?: number): Selected_nameContext | Selected_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Selected_nameContext);
		} else {
			return this.getRuleContext(i, Selected_nameContext);
		}
	}
	public constraint(): ConstraintContext | undefined {
		return this.tryGetRuleContext(0, ConstraintContext);
	}
	public tolerance_aspect(): Tolerance_aspectContext | undefined {
		return this.tryGetRuleContext(0, Tolerance_aspectContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_subtype_indication; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSubtype_indication) {
			return visitor.visitSubtype_indication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SuffixContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public CHARACTER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.CHARACTER_LITERAL, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.STRING_LITERAL, 0); }
	public ALL(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.ALL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_suffix; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitSuffix) {
			return visitor.visitSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TargetContext extends ParserRuleContext {
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public aggregate(): AggregateContext | undefined {
		return this.tryGetRuleContext(0, AggregateContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_target; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitTarget) {
			return visitor.visitTarget(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	public factor(): FactorContext[];
	public factor(i: number): FactorContext;
	public factor(i?: number): FactorContext | FactorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FactorContext);
		} else {
			return this.getRuleContext(i, FactorContext);
		}
	}
	public multiplying_operator(): Multiplying_operatorContext[];
	public multiplying_operator(i: number): Multiplying_operatorContext;
	public multiplying_operator(i?: number): Multiplying_operatorContext | Multiplying_operatorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Multiplying_operatorContext);
		} else {
			return this.getRuleContext(i, Multiplying_operatorContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_term; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitTerm) {
			return visitor.visitTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Terminal_aspectContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public TO(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.TO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_terminal_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitTerminal_aspect) {
			return visitor.visitTerminal_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Terminal_declarationContext extends ParserRuleContext {
	public TERMINAL(): TerminalNode { return this.getToken(vhdlParser.TERMINAL, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subnature_indication(): Subnature_indicationContext {
		return this.getRuleContext(0, Subnature_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_terminal_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitTerminal_declaration) {
			return visitor.visitTerminal_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Through_aspectContext extends ParserRuleContext {
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public THROUGH(): TerminalNode { return this.getToken(vhdlParser.THROUGH, 0); }
	public tolerance_aspect(): Tolerance_aspectContext | undefined {
		return this.tryGetRuleContext(0, Tolerance_aspectContext);
	}
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_through_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitThrough_aspect) {
			return visitor.visitThrough_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Timeout_clauseContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(vhdlParser.FOR, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_timeout_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitTimeout_clause) {
			return visitor.visitTimeout_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Tolerance_aspectContext extends ParserRuleContext {
	public TOLERANCE(): TerminalNode { return this.getToken(vhdlParser.TOLERANCE, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_tolerance_aspect; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitTolerance_aspect) {
			return visitor.visitTolerance_aspect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_declarationContext extends ParserRuleContext {
	public TYPE(): TerminalNode { return this.getToken(vhdlParser.TYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public IS(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.IS, 0); }
	public type_definition(): Type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Type_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_type_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitType_declaration) {
			return visitor.visitType_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_definitionContext extends ParserRuleContext {
	public scalar_type_definition(): Scalar_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Scalar_type_definitionContext);
	}
	public composite_type_definition(): Composite_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Composite_type_definitionContext);
	}
	public access_type_definition(): Access_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, Access_type_definitionContext);
	}
	public file_type_definition(): File_type_definitionContext | undefined {
		return this.tryGetRuleContext(0, File_type_definitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_type_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitType_definition) {
			return visitor.visitType_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unconstrained_array_definitionContext extends ParserRuleContext {
	public ARRAY(): TerminalNode { return this.getToken(vhdlParser.ARRAY, 0); }
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public index_subtype_definition(): Index_subtype_definitionContext[];
	public index_subtype_definition(i: number): Index_subtype_definitionContext;
	public index_subtype_definition(i?: number): Index_subtype_definitionContext | Index_subtype_definitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Index_subtype_definitionContext);
		} else {
			return this.getRuleContext(i, Index_subtype_definitionContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_unconstrained_array_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitUnconstrained_array_definition) {
			return visitor.visitUnconstrained_array_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unconstrained_nature_definitionContext extends ParserRuleContext {
	public ARRAY(): TerminalNode { return this.getToken(vhdlParser.ARRAY, 0); }
	public LPAREN(): TerminalNode { return this.getToken(vhdlParser.LPAREN, 0); }
	public index_subtype_definition(): Index_subtype_definitionContext[];
	public index_subtype_definition(i: number): Index_subtype_definitionContext;
	public index_subtype_definition(i?: number): Index_subtype_definitionContext | Index_subtype_definitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Index_subtype_definitionContext);
		} else {
			return this.getRuleContext(i, Index_subtype_definitionContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(vhdlParser.RPAREN, 0); }
	public OF(): TerminalNode { return this.getToken(vhdlParser.OF, 0); }
	public subnature_indication(): Subnature_indicationContext {
		return this.getRuleContext(0, Subnature_indicationContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_unconstrained_nature_definition; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitUnconstrained_nature_definition) {
			return visitor.visitUnconstrained_nature_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Use_clauseContext extends ParserRuleContext {
	public USE(): TerminalNode { return this.getToken(vhdlParser.USE, 0); }
	public selected_name(): Selected_nameContext[];
	public selected_name(i: number): Selected_nameContext;
	public selected_name(i?: number): Selected_nameContext | Selected_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Selected_nameContext);
		} else {
			return this.getRuleContext(i, Selected_nameContext);
		}
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_use_clause; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitUse_clause) {
			return visitor.visitUse_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Variable_assignment_statementContext extends ParserRuleContext {
	public target(): TargetContext {
		return this.getRuleContext(0, TargetContext);
	}
	public VARASGN(): TerminalNode { return this.getToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_variable_assignment_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitVariable_assignment_statement) {
			return visitor.visitVariable_assignment_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Variable_declarationContext extends ParserRuleContext {
	public VARIABLE(): TerminalNode { return this.getToken(vhdlParser.VARIABLE, 0); }
	public identifier_list(): Identifier_listContext {
		return this.getRuleContext(0, Identifier_listContext);
	}
	public COLON(): TerminalNode { return this.getToken(vhdlParser.COLON, 0); }
	public subtype_indication(): Subtype_indicationContext {
		return this.getRuleContext(0, Subtype_indicationContext);
	}
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public SHARED(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.SHARED, 0); }
	public VARASGN(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.VARASGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_variable_declaration; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitVariable_declaration) {
			return visitor.visitVariable_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Wait_statementContext extends ParserRuleContext {
	public WAIT(): TerminalNode { return this.getToken(vhdlParser.WAIT, 0); }
	public SEMI(): TerminalNode { return this.getToken(vhdlParser.SEMI, 0); }
	public label_colon(): Label_colonContext | undefined {
		return this.tryGetRuleContext(0, Label_colonContext);
	}
	public sensitivity_clause(): Sensitivity_clauseContext | undefined {
		return this.tryGetRuleContext(0, Sensitivity_clauseContext);
	}
	public condition_clause(): Condition_clauseContext | undefined {
		return this.tryGetRuleContext(0, Condition_clauseContext);
	}
	public timeout_clause(): Timeout_clauseContext | undefined {
		return this.tryGetRuleContext(0, Timeout_clauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_wait_statement; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitWait_statement) {
			return visitor.visitWait_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WaveformContext extends ParserRuleContext {
	public waveform_element(): Waveform_elementContext[];
	public waveform_element(i: number): Waveform_elementContext;
	public waveform_element(i?: number): Waveform_elementContext | Waveform_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Waveform_elementContext);
		} else {
			return this.getRuleContext(i, Waveform_elementContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vhdlParser.COMMA);
		} else {
			return this.getToken(vhdlParser.COMMA, i);
		}
	}
	public UNAFFECTED(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.UNAFFECTED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_waveform; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitWaveform) {
			return visitor.visitWaveform(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Waveform_elementContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public AFTER(): TerminalNode | undefined { return this.tryGetToken(vhdlParser.AFTER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vhdlParser.RULE_waveform_element; }
	// @Override
	public accept<Result>(visitor: vhdlVisitor<Result>): Result {
		if (visitor.visitWaveform_element) {
			return visitor.visitWaveform_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


