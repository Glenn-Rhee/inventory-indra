import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormLogin() {
  return (
    <form>
      <FieldGroup className="space-y-2">
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="JaneDoe" />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" />
        </Field>
        <Button className="py-4.5 text-lg font-medium" type="submit">
          Login
        </Button>
      </FieldGroup>
    </form>
  );
}
