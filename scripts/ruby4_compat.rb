# Compatibility bridge for Jekyll 3 / Liquid 4 on Ruby 4.
# Ruby removed the legacy taint API; Liquid only uses it as a safety check.
class Object
  def untaint
    self
  end unless method_defined?(:untaint)

  def tainted?
    false
  end unless method_defined?(:tainted?)
end
