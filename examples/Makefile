# Render samples. Usage: make -C examples kodak IN=../bats/fixtures/in.mp4
SCRIPTS := ../scripts
IN ?= ../bats/fixtures/in.mp4
OUT ?= ./out

$(OUT):
	mkdir -p $(OUT)

.PHONY: all kodak super16 super8 digital halation ca vignette weave breathing bleach teal mute cinematic clean

all: kodak super16 super8 digital halation ca vignette weave breathing bleach teal mute cinematic

kodak: $(OUT)
	$(SCRIPTS)/grain-kodak-vision3.sh $(IN) $(OUT)/kodak.mp4

super16: $(OUT)
	$(SCRIPTS)/grain-super16.sh $(IN) $(OUT)/super16.mp4

super8: $(OUT)
	$(SCRIPTS)/grain-super8.sh $(IN) $(OUT)/super8.mp4

digital: $(OUT)
	$(SCRIPTS)/grain-clean-digital.sh $(IN) $(OUT)/digital.mp4

halation: $(OUT)
	$(SCRIPTS)/halation.sh $(IN) $(OUT)/halation.mp4

ca: $(OUT)
	$(SCRIPTS)/chromatic-aberration.sh $(IN) $(OUT)/ca.mp4

vignette: $(OUT)
	$(SCRIPTS)/vignette.sh $(IN) $(OUT)/vignette.mp4

weave: $(OUT)
	$(SCRIPTS)/gate-weave.sh $(IN) $(OUT)/weave.mp4

breathing: $(OUT)
	$(SCRIPTS)/lens-breathing.sh $(IN) $(OUT)/breathing.mp4

bleach: $(OUT)
	$(SCRIPTS)/bleach-bypass.sh $(IN) $(OUT)/bleach.mp4

teal: $(OUT)
	$(SCRIPTS)/teal-orange.sh $(IN) $(OUT)/teal-orange.mp4

mute: $(OUT)
	$(SCRIPTS)/desaturate-mute.sh $(IN) $(OUT)/mute.mp4

cinematic: $(OUT)
	$(SCRIPTS)/stack-cinematic.sh $(IN) $(OUT)/cinematic.mp4

clean:
	rm -rf $(OUT)
