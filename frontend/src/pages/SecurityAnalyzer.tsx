import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn, formatTime } from "@/lib/utils";
import { deleteMessage, selectMessages, setMessage } from "@/state/llm/messageSlice";
import {
    AlertTriangle,
    Check,
    Code2,
    Copy,
    RefreshCw,
    Send,
    Shield,
    ShieldCheck,
    Sparkles
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../types/user";
import { useAnalyzeSeurityMutation } from "@/state/llm/messageApi";


const exampleCode = `function login(username, password) {
  // Directly execute SQL query with user input
  const query = "SELECT * FROM users WHERE username = '" + username + 
                "' AND password = '" + password + "'";
  
  // Use eval to check some logic
  if(eval("username === 'admin'")) {
    console.log("Admin login attempt");
  }
  
  // Store password in plaintext
  localStorage.setItem("user_password", password);
  
  // Update UI with results
  document.getElementById("loginForm").innerHTML = 
    "<p>Welcome, " + username + "!</p>";
}`;

const SecurityAnalyzer = () => {
    const messages = useSelector(selectMessages)
    const dispatch = useDispatch()
    const [input, setInput] = useState("");
    const [showExamples, setShowExamples] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const [analyze, { isLoading: isAnalyzing }] = useAnalyzeSeurityMutation()
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content: input,
            timestamp: new Date().toISOString()
        };

        dispatch(setMessage(userMessage));

        setInput("");
        setShowExamples(false);

        try {
            const analysisResult = await analyze({ sample_code: JSON.stringify(input) }).unwrap();
            const assistantMessage: Message = {
                id: analysisResult?.data?.id,
                type: analysisResult?.data?.type,
                content: analysisResult?.data?.cwe_output?.explaination,
                timestamp: analysisResult?.data?.timestamp,
                security_level: analysisResult?.data?.cwe_output?.security_level,
                cwe_list: analysisResult?.data?.cwe_output?.cwe_list,
                code: analysisResult?.data?.secure_code_output?.secure_code_output,
                mitigation: analysisResult?.data?.secure_code_output?.mitigation,
                changes_explanation: analysisResult?.data?.secure_code_output?.explaination_of_changes
            };
            dispatch(setMessage(assistantMessage));
        } catch (error) {
            console.error("Analysis failed:", error);
            toast({
                title: "Analysis Failed",
                description: "Could not analyze the code. Please try again.",
                variant: "destructive"
            });

            dispatch(setMessage(
                {
                    id: (Date.now() + 1).toString(),
                    type: "assistant",
                    content: "Sorry, I couldn't analyze this code. Please try again with a different code snippet.",
                    timestamp: new Date().toISOString()
                }
            ));
        }
    };

    const loadExample = () => {
        setInput(exampleCode);
    };

    const clearChat = () => {
        dispatch(deleteMessage())
        setInput("");
        setShowExamples(true);
        toast({
            title: "Chat Cleared",
            description: "All previous messages have been removed.",
        });
    };

    const handleCopyCode = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(id);
        toast({
            title: "Copied!",
            description: "Code copied to clipboard.",
            duration: 2000,
        });

        setTimeout(() => {
            setCopiedIndex(null);
        }, 2000);
    };

    return (
        <Layout>
            <div className="mx-auto w-full max-w-5xl mt-20">
                <div className="mb-6 text-center space-y-2">
                    <div className="flex items-center justify-center mb-2">
                        <Shield className="h-8 w-8 mr-2 text-primary animate-pulse" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Security Code Analyzer
                        </h1>
                    </div>
                    <p className="text-muted-foreground mx-auto">
                        Identify security vulnerabilities in your code and get recommendations for secure coding practices
                    </p>
                </div>

                <div className="flex flex-col h-[calc(100vh-180px)] border rounded-lg shadow-lg bg-background">
                    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex mb-6",
                                    message.type === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                {message.type === "assistant" && (
                                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow mr-3">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                )}

                                <div className={cn(
                                    "flex flex-col max-w-[80%] md:max-w-[65%] space-y-2 rounded-lg px-4 py-3",
                                    message.type === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-muted rounded-bl-none"
                                )}>
                                    <div className="flex justify-between items-start gap-2">
                                        <span className="font-medium text-sm">
                                            {message.type === "assistant" ? "Security Analyzer" : "You"}
                                        </span>
                                        {message.timestamp && (
                                            <span className="text-xs opacity-70">
                                                {formatTime(new Date(message.timestamp))}
                                            </span>
                                        )}
                                    </div>

                                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                                    {message.security_level && (
                                        <div className="mt-2">
                                            <span className={cn(
                                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                                message.security_level === "Critical" ? "bg-red-500/15 text-red-600 border border-red-500/30" :
                                                    message.security_level === "High" ? "bg-orange-500/15 text-orange-600 border border-orange-500/30" :
                                                        message.security_level === "Medium" ? "bg-amber-500/15 text-amber-600 border border-amber-500/30" :
                                                            "bg-green-500/15 text-green-600 border border-green-500/30"
                                            )}>
                                                {message.security_level} Risk
                                            </span>
                                        </div>
                                    )}

                                    {message.cwe_list && message.cwe_list.length > 0 && (
                                        <div className="mt-3 space-y-3 pt-2 border-t border-border/30">
                                            <h4 className="text-sm font-semibold mb-2 flex items-center">
                                                <AlertTriangle className="w-4 h-4 mr-1 text-amber-500" />
                                                <span className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
                                                    Vulnerabilities Found:
                                                </span>
                                            </h4>
                                            <div className="space-y-3">
                                                {message.cwe_list.map((vuln, idx) => (
                                                    <div key={idx} className={cn(
                                                        "p-3 rounded-lg text-sm border-l-4",
                                                        vuln.severity === "Critical" || vuln.severity === "high"
                                                            ? "border-destructive/70 bg-destructive/10"
                                                            : vuln.severity === "medium"
                                                                ? "border-amber-500/70 bg-amber-500/10"
                                                                : "border-green-500/70 bg-green-500/10"
                                                    )}>
                                                        <div className="font-bold flex items-center">
                                                            {vuln.severity === "Critical" || vuln.severity === "high" ? (
                                                                <AlertTriangle className="w-4 h-4 mr-1 text-destructive" />
                                                            ) : vuln.severity === "medium" ? (
                                                                <AlertTriangle className="w-4 h-4 mr-1 text-amber-500" />
                                                            ) : (
                                                                <AlertTriangle className="w-4 h-4 mr-1 text-green-500" />
                                                            )}
                                                            {vuln.type}: {vuln.id} {vuln?.name?.length ? `- ${vuln.name}` : ''}
                                                        </div>
                                                        <div className="mt-1">{vuln.description}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {message.mitigation && (
                                        <div className="mt-3 pt-2 border-t border-border/30">
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="mitigation" className="border-none">
                                                    <AccordionTrigger className="py-2 text-sm font-semibold">
                                                        <div className="flex items-center">
                                                            <ShieldCheck className="w-4 h-4 mr-1 text-primary" />
                                                            <span className="bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent">
                                                                Mitigation Strategy
                                                            </span>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-sm pb-2">
                                                        {message.mitigation}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    )}

                                    {message.changes_explanation && (
                                        <div className="mt-1">
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="changes" className="border-none">
                                                    <AccordionTrigger className="py-2 text-sm font-semibold">
                                                        <div className="flex items-center">
                                                            <Code2 className="w-4 h-4 mr-1 text-blue-400" />
                                                            <span className="bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
                                                                Explanation of Changes
                                                            </span>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-sm pb-2 whitespace-pre-line">
                                                        {message.changes_explanation}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    )}

                                    {message.code && (
                                        <div className="mt-3 pt-2 border-t border-border/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-semibold flex items-center">
                                                    <Sparkles className="w-4 h-4 mr-1 text-blue-400" />
                                                    <span className="bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
                                                        Secure Alternative:
                                                    </span>
                                                </h4>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 px-2 text-xs flex items-center gap-1 hover:bg-muted"
                                                    onClick={() => handleCopyCode(message.code || "", message.id)}
                                                >
                                                    {copiedIndex === message.id ? (
                                                        <>
                                                            <Check className="h-3.5 w-3.5" />
                                                            <span>Copied</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="h-3.5 w-3.5" />
                                                            <span>Copy code</span>
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                            <div className="bg-slate-950 rounded-lg p-3 text-sm font-mono overflow-x-auto text-blue-100 relative">
                                                <pre className="whitespace-pre-wrap">{message.code}</pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {message.type === "user" && (
                                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow ml-3">
                                        <span className="text-sm font-semibold">You</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isAnalyzing && (
                            <div className="flex justify-start mb-6">
                                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow mr-3">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div className="bg-muted rounded-lg rounded-bl-none px-4 py-3 max-w-[65%]">
                                    <div className="flex items-center space-x-1">
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75"></div>
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showExamples && messages.length <= 1 && (
                            <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50 animate-fade-in">
                                <h3 className="font-medium mb-3 flex items-center">
                                    <Code2 className="w-5 h-5 mr-2 text-primary" />
                                    Try with an example:
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Button
                                        variant="outline"
                                        className="justify-start text-left h-auto py-3 px-4 bg-gradient-to-r from-card to-muted/80 hover:from-muted hover:to-muted/90"
                                        onClick={loadExample}
                                    >
                                        <div>
                                            <div className="font-semibold">Vulnerable Login Function</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                Contains SQL injection, eval usage, and XSS vulnerabilities
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-border/50 bg-muted/10 px-4 py-4">
                        <form onSubmit={handleSubmit} className="relative">
                            <Textarea
                                placeholder="Paste your code here for security analysis..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="min-h-[100px] max-h-[200px] pr-16 font-mono text-sm resize-y border-muted bg-background"
                                disabled={isAnalyzing}
                            />
                            <div className="absolute bottom-3 right-3 flex gap-2">
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    onClick={clearChat}
                                    disabled={isAnalyzing || messages.length <= 1}
                                    title="Clear chat"
                                    className="h-8 w-8"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={isAnalyzing || !input.trim()}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    {isAnalyzing ? (
                                        <span>Analyzing</span>
                                    ) : (
                                        <>
                                            <span>Analyze</span>
                                            <Send className="ml-1 h-3.5 w-3.5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SecurityAnalyzer;