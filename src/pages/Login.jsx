<div className="space-y-2">
  <Label className="text-studio-silver/60">كلمة المرور</Label>
  <div className="relative">
    <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-studio-silver/40" />
    <Input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="bg-obsidian border-studio-silver/15 text-studio-silver pr-10"
      required
    />
  </div>
  <div className="flex justify-end pt-1">
    <button
      type="button"
      onClick={handleForgotPassword}
      className="text-xs text-studio-silver/70 hover:text-studio-silver transition-colors underline cursor-pointer"
    >
      نسيت كلمة المرور؟
    </button>
  </div>
</div>