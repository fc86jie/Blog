[[toc]]

### Agent 核心概念
Agent（智能体）是以大模型为核心、能自主感知环境并调用工具完成任务的系统。

| 概念 | 说明 |
| --- | --- |
| LLM | 决策大脑，负责理解任务、规划步骤 |
| Tools | 可调用的外部能力（搜索、代码执行、API 等） |
| Memory | 上下文记忆，区分短期（会话内）与长期（持久化） |
| Planning | 任务拆解与反思，如 ReAct、Plan-and-Execute |
| Environment | Agent 交互的外部环境，接收反馈并调整行动 |

### ReAct 模式
ReAct（Reasoning + Acting）让模型交替进行「思考 → 行动 → 观察」，直到任务完成。

```text
Thought: 分析当前任务，决定下一步
Action:  调用某个工具
Observation: 获取工具返回结果
... 循环直到得出最终答案
```

### Function Calling
让大模型以结构化 JSON 的形式输出函数调用请求，由应用侧执行后回传结果。

```json
{
  "name": "get_weather",
  "arguments": { "city": "杭州" }
}
```

### 主流 Agent 框架
| 框架 | 特点 |
| --- | --- |
| LangChain / LangGraph | 生态完善，LangGraph 支持状态机式编排 |
| OpenAI Agents SDK | 官方轻量框架，支持 Handoffs 与 Guardrails |
| Claude Agent SDK | Anthropic 官方，擅长代码与工具密集型任务 |
| AutoGen | 微软多 Agent 对话框架 |
| CrewAI | 角色扮演式多 Agent 协作 |
