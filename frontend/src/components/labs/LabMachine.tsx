import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw, MoveDiagonal, Minus, Play } from 'lucide-react';
import { deleteAttackerMachine, selectAttackerMachine, selectTargetMachine, setAttackerMachine } from '@/state/machine/machineSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LabMachineInterface } from '@/types/machine';
import axios from 'axios';

interface LabMachineProps {
  isAttackerMachine?: boolean;
  isTargetMachine?: boolean;
  labId: Number
}

const LabMachine: React.FC<LabMachineProps> = ({ isAttackerMachine, isTargetMachine, labId }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIframe, setActiveIframe] = useState<string | null>(null);
  const [LoadingAttackerMachine, setLoadingAttackerMachine] = useState(false);
  const iframeRefFA = useRef(null);
  const iframeRefFT = useRef(null);
  const iframeRefNA = useRef(null);
  const iframeRefNT = useRef(null);
  // const baseURL = "http://localhost:5010/";
  const baseURL = "/api/";
  const dispatch = useDispatch();

  const toggleFullscreen = (iframe: string) => {
    setIsFullscreen(!isFullscreen);
    setActiveIframe(iframe);
  };
  useEffect(() => {
    if (attackUrl) {
      setActiveIframe("attack")
    } else if (targetUrl) {
      setActiveIframe("target")
    }
  })
  const handleCreateAttackerMachine = async () => {
    setLoadingAttackerMachine(true);
    try {
      const url = baseURL + "vm/create-instance";
      const data = {
        "labId": labId
      }
      const response = await axios.post(url, data);
      dispatch(setAttackerMachine({ id: Math.random().toString(36).substring(7), ...response.data }));
      setActiveIframe("active");
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create instance");
    }
    setLoadingAttackerMachine(false);
  };
  const handleDeleteAttackeMachine = async () => {
    const url = baseURL + "vm/delete-instance";
    const body = {
      "podName": attackerMachine?.podName,
      "connectionIdentifier": attackerMachine?.sessionIdentifier
    }
    try {
      const req = await axios.post(url, body);
      console.log(req)
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete instance");
    }
    dispatch(deleteAttackerMachine())
  }
  const attackerMachine: LabMachineInterface | null = useSelector(selectAttackerMachine)
  const targetMachine: LabMachineInterface[] | [] = useSelector(selectTargetMachine)

  const attackUrl = attackerMachine?.guacUrl
  const targetUrl = targetMachine[0]?.guacUrl

  const refreshIframe = (iframeId: string) => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe) {
      const currentSrc = iframe.src.split('?')[0];
      iframe.src = `${currentSrc}?reload=${new Date().getTime()}`;
    }
  };

  if (!attackUrl && !targetUrl && !isAttackerMachine && !isTargetMachine) {
    return (
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64 bg-muted/40 rounded-md">
            <p className="text-muted-foreground">No virtual machines available for this lab</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isAttackerMachine && !attackUrl && isTargetMachine && !targetUrl) {
    return (
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-around p-5 bg-muted/40 rounded-md m-auto">
            {!LoadingAttackerMachine && <Button className="gap-2 bg-red-500 hover:bg-red-600" onClick={handleCreateAttackerMachine}>
              <Play className="h-4 w-4" />
              Start Attacker Machine
            </Button>}

            {
              LoadingAttackerMachine && <div className="gap-2 bg-red-500 hover:bg-red-600 p-2 px-3 rounded-lg" onClick={handleCreateAttackerMachine}>
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Launching...
                </span>
              </div>
            }
            <Button className="gap-2 bg-cyan-500 hover:bg-cyan-600" onClick={() => { }}>
              <Play className="h-4 w-4" />
              Start Target Machine
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isFullscreen && activeIframe) {
    return (
      <div className="fixed inset-0 z-50 bg-background p-4 flex flex-col overflow-y-hidden" onClick={() => {
        console.log("Clicked Full SCrenn")
        if (activeIframe === 'attack') iframeRefFA?.current.focus()
        if (activeIframe === 'target') iframeRefFT?.current.focus()
      }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {activeIframe === 'attack' ? 'Attack Machine' : 'Target Machine'}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshIframe(`${activeIframe}-iframe-fullscreen`)}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleFullscreen(activeIframe)}>
              Exit Fullscreen
            </Button>
          </div>
        </div>
        <div className="flex-1 bg-muted/20 rounded-md overflow-hidden" >
          {activeIframe === 'attack' && attackUrl && (
            <iframe
              onLoad={(e) => e.target?.contentWindow?.focus()}
              id="attack-iframe-fullscreen"
              src={attackUrl}
              className="w-full h-full border-0"
              title="Attack Machine"
              sandbox="allow-same-origin allow-scripts allow-forms"
              ref={iframeRefFA}
              allow="clipboard-read; clipboard-write"
            />
          )}
          {activeIframe === 'target' && targetUrl && (
            <iframe
              onLoad={(e) => e.target?.contentWindow?.focus()}
              id="target-iframe-fullscreen"
              src={targetUrl}
              className="w-full h-full border-0"
              title="Target Machine"
              sandbox="allow-same-origin allow-scripts allow-forms"
              ref={iframeRefFT}
              allow="clipboard-read; clipboard-write"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className="shadow-md" onClick={() => {
      console.log("Clicked Not Full SCrenn")
      if (activeIframe === 'attack') iframeRefNA?.current.focus()
      if (activeIframe === 'target') iframeRefNT?.current.focus()
    }}>
      <CardHeader>
        <CardTitle className="text-xl">Lab Environment</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={attackUrl ? "attack" : "target"} className="w-full">
          <TabsList className="w-full rounded-none border-b bg-muted/40 px-6">
            {attackUrl && <TabsTrigger value="attack">Attack Machine</TabsTrigger>}
            {targetUrl && <TabsTrigger value="target">Target Machine</TabsTrigger>}
          </TabsList>

          {attackUrl && (
            <TabsContent value="attack" className="p-0">
              <div className='pl-4 pt-4 text-blue-400 text-sm  font-bold'>
                IP Address: {attackerMachine.podIP} <br />
                Pod Name: {attackerMachine.podName} <br />
                Service Name: {attackerMachine.serviceName}
              </div>
              <div className="p-4 relative">
                <div className="z-10 flex gap-2 justify-between mb-1 dark:bg-slate-800 rounded-t-xl p-1 bg-slate-100">
                  <div
                    className='cursor-pointer items-center justify-center flex bg-slate-400 hover:bg-slate-300 dark:bg-slate-950 p-1 rounded-xl dark:hover:bg-slate-900'
                    onClick={handleDeleteAttackeMachine}
                  >
                    <Minus className="h-4 w-4 " />
                  </div>
                  <div className='flex justify-end gap-2'>
                    <div
                      className='cursor-pointer items-center justify-center flex bg-slate-400 hover:bg-slate-300 dark:bg-slate-950 p-1 rounded-xl dark:hover:bg-slate-900'
                      onClick={() => refreshIframe('attack-iframe')}
                    >
                      <RefreshCw className="h-4 w-4 " />
                    </div>
                    <div
                      className='cursor-pointer items-center justify-center flex bg-slate-400 hover:bg-slate-300 dark:bg-slate-950 p-1 rounded-xl dark:hover:bg-slate-900'
                      onClick={() => toggleFullscreen('attack')}>
                      <MoveDiagonal className="h-4 w-4 " />
                    </div>
                  </div>
                </div>
                <div className="h-[35rem] bg-muted/20 rounded-md overflow-hidden">
                  <iframe
                    onLoad={(e) => e.target?.contentWindow?.focus()}
                    id="attack-iframe"
                    src={attackUrl}
                    className="w-full h-full border-0"
                    title="Attack Machine"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    ref={iframeRefNA}
                    allow="clipboard-read; clipboard-write"
                  />
                </div>
              </div>
            </TabsContent>
          )}

          {targetUrl && (
            <TabsContent value="target" className="p-0">
              <div className="p-4 relative">
                <div className="z-10 flex gap-2 justify-between mb-1 dark:bg-slate-800 rounded-t-xl p-1 bg-slate-100">
                  <div
                    className='cursor-pointer items-center justify-center flex bg-slate-400 hover:bg-slate-300 dark:bg-slate-950 p-1 rounded-xl dark:hover:bg-slate-900'
                    onClick={() => refreshIframe('target-iframe')}
                  >
                    <Minus className="h-4 w-4 " />
                  </div>
                  <div className='flex justify-end gap-2'>
                    <div
                      className='cursor-pointer items-center justify-center flex bg-slate-400 hover:bg-slate-300 dark:bg-slate-950 p-1 rounded-xl dark:hover:bg-slate-900'
                      onClick={() => refreshIframe('target-iframe')}
                    >
                      <RefreshCw className="h-4 w-4 " />
                    </div>
                    <div
                      className='cursor-pointer items-center justify-center flex bg-slate-400 hover:bg-slate-300 dark:bg-slate-950 p-1 rounded-xl dark:hover:bg-slate-900'
                      onClick={() => toggleFullscreen('target')}>
                      <MoveDiagonal className="h-4 w-4 " />
                    </div>
                  </div>
                </div>
                <div className="h-96 bg-muted/20 rounded-md overflow-hidden">
                  <iframe
                    onLoad={(e) => e.target?.contentWindow?.focus()}
                    id="target-iframe"
                    src={targetUrl}
                    className="w-full h-full border-0"
                    title="Target Machine"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    ref={iframeRefNT}
                    allow="clipboard-read; clipboard-write"
                  />
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LabMachine;
