import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Mail, Phone, Send } from "lucide-react";

interface RequestQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultIngredient?: string;
}

export function RequestQuoteDialog({
  open,
  onOpenChange,
  defaultIngredient = "",
}: RequestQuoteDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    ingredient: defaultIngredient,
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Prepare mailto link for direct submission via default email client
    const subject = encodeURIComponent(
      `Quote Request: ${formData.ingredient || "Nutraceutical Ingredients"} - ${formData.company || formData.name}`
    );
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\n` +
      `Business Email: ${formData.email}\n` +
      `Company: ${formData.company}\n` +
      `Phone: ${formData.phone}\n` +
      `Ingredient(s) of Interest: ${formData.ingredient}\n` +
      `Estimated Quantity: ${formData.quantity}\n\n` +
      `Message/Requirements:\n${formData.message}\n`
    );

    const mailtoUrl = `mailto:info@svsnutraceuticals.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      ingredient: "",
      quantity: "",
      message: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border sm:rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left pb-2 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-semibold text-forest">SVS Sourcing Team</span>
          </div>
          <DialogTitle className="font-display text-2xl sm:text-3xl text-forest-deep mt-1">
            Request a Quote
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Get prompt commercial pricing, Certificates of Analysis (COA), and technical specifications for your formulation requirements.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-semibold text-forest-deep">
              Inquiry Draft Prepared!
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Your email client was opened with your pre-filled inquiry. You can also reach our desk directly:
            </p>
            <div className="rounded-lg bg-bone p-4 text-xs text-forest-deep space-y-2 text-left">
              <p className="flex items-center gap-2 font-medium">
                <Mail className="h-4 w-4 text-forest" />
                <span>info@svsnutraceuticals.com</span>
              </p>
              <p className="flex items-center gap-2 font-medium">
                <Phone className="h-4 w-4 text-forest" />
                <span>+91 78429 51590</span>
              </p>
            </div>
            <Button
              onClick={handleReset}
              className="mt-4 w-full bg-forest text-white hover:bg-forest-deep"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-forest-deep mb-1">
                  Full Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Dr. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-deep mb-1">
                  Work Email *
                </label>
                <Input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-forest-deep mb-1">
                  Company / Organization *
                </label>
                <Input
                  required
                  placeholder="e.g. Zenith Pharma Ltd"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-deep mb-1">
                  Phone / WhatsApp
                </label>
                <Input
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-forest-deep mb-1">
                  Ingredient(s) of Interest
                </label>
                <Input
                  placeholder="e.g. Ashwagandha 5%, Curcumin 95%"
                  value={formData.ingredient}
                  onChange={(e) => setFormData({ ...formData, ingredient: e.target.value })}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-deep mb-1">
                  Estimated Quantity
                </label>
                <Input
                  placeholder="e.g. 50 kg, 500 kg, Sample"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-deep mb-1">
                Specifications or Additional Requirements
              </label>
              <Textarea
                rows={3}
                placeholder="Mention mesh size, assay requirements, destination country, or custom needs..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="text-sm resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                type="submit"
                className="w-full sm:flex-1 bg-forest text-white hover:bg-forest-deep flex items-center justify-center gap-2 py-2.5 font-semibold text-sm"
              >
                <Send className="h-4 w-4" />
                Submit Quote Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto text-sm"
              >
                Cancel
              </Button>
            </div>

            <p className="text-[0.7rem] text-center text-muted-foreground pt-1">
              Direct Contact: <span className="font-medium text-forest-deep">info@svsnutraceuticals.com</span> | <span className="font-medium text-forest-deep">+91 78429 51590</span>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
