from langgraph.graph import StateGraph

from app.langgraph.state import ComplaintState

from app.langgraph.nodes.extract import extract_node
from app.langgraph.nodes.summary import summary_node
from app.langgraph.nodes.risk import risk_node
from app.langgraph.nodes.rootcause import rootcause_node
from app.langgraph.nodes.capa import capa_node
from app.langgraph.nodes.duplicate import duplicate_node   # NEW

builder = StateGraph(ComplaintState)

builder.add_node("extract", extract_node)
builder.add_node("summary", summary_node)
builder.add_node("risk", risk_node)
builder.add_node("rootcause", rootcause_node)
builder.add_node("capa", capa_node)
builder.add_node("duplicate", duplicate_node)   # NEW

builder.set_entry_point("extract")

builder.add_edge("extract", "summary")
builder.add_edge("summary", "risk")
builder.add_edge("risk", "rootcause")
builder.add_edge("rootcause", "capa")
builder.add_edge("capa", "duplicate")   # NEW

builder.set_finish_point("duplicate")   # UPDATED

graph = builder.compile()