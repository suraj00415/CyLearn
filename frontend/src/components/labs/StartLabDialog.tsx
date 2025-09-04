
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, AlertTriangle } from 'lucide-react';
import { Lab, LabNew } from '@/types/lab';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

interface StartLabDialogProps {
  lab: LabNew;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: () => void;
}

const StartLabDialog: React.FC<StartLabDialogProps> = ({
  lab,
  open,
  onOpenChange,
  onStart
}) => {
  const navigate = useNavigate();
  const [acknowledgement, setAcknowledgement] = React.useState(false);

  const handleStart = () => {
    if (!acknowledgement) {
      toast.error('Please acknowledge the lab information before starting');
      return;
    }
    
    onStart();
    onOpenChange(false);
    toast.success(`Started lab: ${lab.title}`);
    
    // Navigate to the start lab page
    navigate(`/start-lab/${lab._id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Lab: {lab.title}</DialogTitle>
          <DialogDescription>
            You are about to start a hands-on cybersecurity lab.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Important Information</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>This lab will launch virtual machines for your use</li>
                <li>Lab progress is tracked and timed</li>
                <li>Your score is based on completion time and objectives met</li>
                <li>You can pause and resume the lab at any time</li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-md bg-muted p-3">
            <div className="text-sm font-medium mb-1">Lab Details:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Difficulty:</div>
              <div className="font-medium capitalize">{lab.difficulty}</div>
              <div className="text-muted-foreground">Category:</div>
              <div className="font-medium">{lab.category}</div>
              <div className="text-muted-foreground">Estimated Time:</div>
              <div className="font-medium">{lab.estimatedTime}</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="acknowledgement" 
              checked={acknowledgement}
              onCheckedChange={(checked) => setAcknowledgement(!!checked)}
            />
            <label
              htmlFor="acknowledgement"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I understand that this lab will create virtualized environments and my progress will be tracked.
            </label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="gap-2" 
            onClick={handleStart}
            disabled={!acknowledgement}
          >
            <Play className="h-4 w-4" />
            Start Lab
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StartLabDialog;
