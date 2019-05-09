package grifts

import (
  "github.com/gobuffalo/buffalo"
	"github.com/<%= organization %>/<%= name %>/actions"
)

func init() {
  buffalo.Grifts(actions.App())
}
