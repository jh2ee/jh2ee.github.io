---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZQMNCW5%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQDs%2Ba%2FWjm0tYdLgHWE5dwTjlDnG8TdxX%2BQrCV%2BYsE5ctwIgKxldl0ScNjLrAjVA56Lcn3bRk7eVp%2F9TNGjt7KVSIO4q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEkzBwIF1%2Ba7uUBN3CrcAyxNyChTDrar398X1xJurezZlUE0sGyfswYsCXmx1Cr%2BfRutZURoClgNggvCLuoXVBKddT6eratHTLWT9Y1Ki0cjjXdRGE%2BXiU9TqIGqNz1xVfn7xD092aujKSq2BF21fSYWCppxUDAjwRmmriTDbL7ti%2BH3Kv05s6z11o8iMbYh5uYmwxgqiOhsCoPqPTjt1Xr2mYgLp1m8l7zhS0BX1MS5xlm0M5aOBPpdWjv4MhCSSC9PVhWi7UYbnPpKE%2B23atLM4Vt8Sk5n1HQ37zwHCAd7XO1ip0TdOHJjSsM2UdBFNFguQ9Gd1VOir05IGtqfqyOqLyZHpvQC4HUQZ7FSC9G3%2BEFYzlcZezROGwQvo4xKDRLtUEDS21l%2FgqjAIzC1Wvebmd2sJmqzKmGMcsO1qcT56w5nVKJdTRE5n23NsB34Hco1DTGNc3LiE0PKI2w1KsxhU5cYCN2J6wdY2baCOuOVBWDwMbduqCZHjQaX0POE8M0ruN92DEsGDpOWuu5l%2FyjLa1r2mBKxZkACPWU3liIfI5B39Q4L5jmMgnaZ8tgG9B0Gp8S8VQJo8ODJb5%2F%2BN1jBNN9e8sgI0dTbXfcTEi%2BKp2Q3pNIghhN3TsUt7oMB3JlPNycqolahvBWwMO%2Fh3MsGOqUBX4S932WNju6Pdhgxlln6BpP4MpZLwQzuS6HhDHqINkRGryZU6sIEb1eWPmc3hi4dtDnj43dpg8X2R7AoC8sKgu01dAkHIetNbRtDu9tWrhg%2FHrsUTdIY87TiW9BPVF3ng6%2BpQEkbUxIKFi3KJIdcbYG4VIe9nAO1pV%2BvnaqylBaIL33jZOgsA4etqAcGIJaNQLb6Z4drpRRJQUod12iRFdRUq0AA&X-Amz-Signature=72e9cd5641589570a824fdb569d870aa7be3d19a67e1dec0eebfdb7210991389&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZQMNCW5%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQDs%2Ba%2FWjm0tYdLgHWE5dwTjlDnG8TdxX%2BQrCV%2BYsE5ctwIgKxldl0ScNjLrAjVA56Lcn3bRk7eVp%2F9TNGjt7KVSIO4q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEkzBwIF1%2Ba7uUBN3CrcAyxNyChTDrar398X1xJurezZlUE0sGyfswYsCXmx1Cr%2BfRutZURoClgNggvCLuoXVBKddT6eratHTLWT9Y1Ki0cjjXdRGE%2BXiU9TqIGqNz1xVfn7xD092aujKSq2BF21fSYWCppxUDAjwRmmriTDbL7ti%2BH3Kv05s6z11o8iMbYh5uYmwxgqiOhsCoPqPTjt1Xr2mYgLp1m8l7zhS0BX1MS5xlm0M5aOBPpdWjv4MhCSSC9PVhWi7UYbnPpKE%2B23atLM4Vt8Sk5n1HQ37zwHCAd7XO1ip0TdOHJjSsM2UdBFNFguQ9Gd1VOir05IGtqfqyOqLyZHpvQC4HUQZ7FSC9G3%2BEFYzlcZezROGwQvo4xKDRLtUEDS21l%2FgqjAIzC1Wvebmd2sJmqzKmGMcsO1qcT56w5nVKJdTRE5n23NsB34Hco1DTGNc3LiE0PKI2w1KsxhU5cYCN2J6wdY2baCOuOVBWDwMbduqCZHjQaX0POE8M0ruN92DEsGDpOWuu5l%2FyjLa1r2mBKxZkACPWU3liIfI5B39Q4L5jmMgnaZ8tgG9B0Gp8S8VQJo8ODJb5%2F%2BN1jBNN9e8sgI0dTbXfcTEi%2BKp2Q3pNIghhN3TsUt7oMB3JlPNycqolahvBWwMO%2Fh3MsGOqUBX4S932WNju6Pdhgxlln6BpP4MpZLwQzuS6HhDHqINkRGryZU6sIEb1eWPmc3hi4dtDnj43dpg8X2R7AoC8sKgu01dAkHIetNbRtDu9tWrhg%2FHrsUTdIY87TiW9BPVF3ng6%2BpQEkbUxIKFi3KJIdcbYG4VIe9nAO1pV%2BvnaqylBaIL33jZOgsA4etqAcGIJaNQLb6Z4drpRRJQUod12iRFdRUq0AA&X-Amz-Signature=72e9cd5641589570a824fdb569d870aa7be3d19a67e1dec0eebfdb7210991389&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652GZVYUU%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIDM7JUGiOnJG9HRb%2FcQI79qjGx%2Fp4fRWg9BJTi5ClSccAiAps3gsmAP5w%2FutxgEcn%2BeQX6BnMxCGK7spaliQigLj6Sr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMkBLlhyGQA6cQTt8XKtwDF%2FmVzErFh3R0CdjZbOUAGXaAKhrcvR5dSj6W9kSGSFZnePNdKVd8zqVe4poYZAVqB8JRGB%2BOwgxOqRfUkJkKDP8VezrXdfmrymY%2FuK5hYtkdNZpIB6uXjVNLl5O8PNK7O3xUk5RXyk57tQfgAsvC4uxKyfuqpd%2FVWyTtj%2Fn4Uvp%2BiU3ocK020plweaGlX775lZ2uCjVj5BlUQOMRMZQ5OEQbMEw7jbNvRepfZ6%2BhnY4zFW0tdZWMOAxnwvZLumJKboP7aNBXF9Qyk4u8RFCsfsW%2FUfsmsR43uDdXHCauYLAXYXA8cl9ojjPAQO7oHuBvitl6%2FeVyCLZMEai12Yxy7GNzXcCS41YPlOuZBUjz%2B0Nbo8G4VUhnGFFd8YPPlUAnmk6%2F3jJGWQNvLFsJsT5uXz%2Be%2F0vDQqoKVVm4T5uNKJCMv%2B2Psw1tvs4ZEOfKBYsiZgCIyhZtr3TLBefdSTeWWcsdKkaFA%2BBPv%2BwuXfub6%2FwOEyCY86UL8BVQmjIwh9IPogfAULUFa%2BWyEEpV4zcn40afnAuayE%2BXF32xGGr9bu%2F3ByZcVrFMCRKmqiRb3j2yAUoGgSOyKywVxBotC3%2FKhQcQTTU2jYHHIUIyfNsub62ucnKFapF%2FRi7KXIcwn%2BLcywY6pgGixY5oNUhbhhhXqoQZWMFqB678X9cUhJbQHEq2PWafNDRpMILlq5hjEiaJvUR1m5ve%2Fl%2B4yzF2Hrgly1sOeQhNPfn97NyzpL5fVxHe74M%2BZvTVBhORkmcgsT6rAkhWhb7WoZj5AyGOdlpIuPmSjppphiBNcfOY9khVDnaQ1z%2FVMUN5gpq2d9rFJN3%2BNAJjkfoU5CjxpR%2B8LGbWXgrj9X4HJIW8WYTL&X-Amz-Signature=b75351ff4e92298d093f50466cb8232d682674561e06c8c401319f93e4d05693&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6T4DI7Q%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIDr%2BWp%2F4ldngfhTwRA2ZVNRBooF7jWrXWtCtsSszJ3%2FWAiEAm03jJSiVQxKGBW8qIj4elOACdFW52fnOmtBpJJLBoqoq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDLGQoBV9QDxZk0gKByrcA3pd28c24FBC974vo%2Fl3v2U0fW8984hpSEpEAR8mE2zusKqlBev0uB60XnwQkoKbgFcTY4%2Flnc0CB%2BUutpeZoAnQqqM3qHRWnIvCeSwm%2FObQEOaq%2BXA8g1CSr3a7LW8B%2B4rKRAEbQc2Y9CQqLXa%2BBIRYxBtrQ5WiIRVODiaUC3ZIUDiCO%2B8Y4AGrdDCyuO9GGyDeYgVcy1njI5K%2BKziO9nVZlqaHI55%2FZ%2B%2BX60ROCqzZUHqOes3Mr2Y5K5%2Fdaph8BxhLH2hl43w7k0VwLEn5LxeI8izsgwww4jt%2FWLPzHhrHzHKIZ3zkDrKk3tOn5slLDW%2B5y2gHkUFGYVp%2BfJNEdWx%2FoELSF8JaIsAQ4CyQ9dH33FJ%2By%2BlllMwUMC6CppAiqUjDNzckqk8hoVQbvK08CkL5UvPr5LCMtQlP3fvDW2vN0MmPvRi3QgQ%2Ff623ZkLIkIh25ApXd6RfWKZ37lT0ZcHhHIlyLArbY4wdg4tcfLH5Z%2BkSYEXECc%2FaqEAjUFWfMkey6Gwd0ldB0ZnDWWpHVZ2KduI67TjgmiNajMWB%2FK%2BYglER%2BsmfICePyr%2FVDojPEzIP6vfZF%2FQSUfG9%2Fl7NWFZUkZDIiFP%2F%2F1Czgpd3ERs67MQHT6pZOZktRb7tMIbi3MsGOqUBwEft%2F9aXwQdLmFZF9cMcD5Y7nt%2FTafq2xFZmEuQemEHF%2FzY1jp6XhZvklNsrxIJOmfbCIzKwI0oVwIVxlvNtEgUWFfT98%2F%2BKsJ213EfT%2FrwQE429MBopsFtSPL5j%2BxXgrpQxv6xLSE6w%2Bf6XwIMFZEwgskP%2BAoS4%2F3KCrNh6J0%2BTksRNbw8OfYl4nZuJjRpNUdaYbceZZhk4kyPXFph5A7vbJhsB&X-Amz-Signature=1d270eea48ab58d31bafef333f2352e6010633f0b2b94ba973c28eead6089c6f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6T4DI7Q%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIDr%2BWp%2F4ldngfhTwRA2ZVNRBooF7jWrXWtCtsSszJ3%2FWAiEAm03jJSiVQxKGBW8qIj4elOACdFW52fnOmtBpJJLBoqoq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDLGQoBV9QDxZk0gKByrcA3pd28c24FBC974vo%2Fl3v2U0fW8984hpSEpEAR8mE2zusKqlBev0uB60XnwQkoKbgFcTY4%2Flnc0CB%2BUutpeZoAnQqqM3qHRWnIvCeSwm%2FObQEOaq%2BXA8g1CSr3a7LW8B%2B4rKRAEbQc2Y9CQqLXa%2BBIRYxBtrQ5WiIRVODiaUC3ZIUDiCO%2B8Y4AGrdDCyuO9GGyDeYgVcy1njI5K%2BKziO9nVZlqaHI55%2FZ%2B%2BX60ROCqzZUHqOes3Mr2Y5K5%2Fdaph8BxhLH2hl43w7k0VwLEn5LxeI8izsgwww4jt%2FWLPzHhrHzHKIZ3zkDrKk3tOn5slLDW%2B5y2gHkUFGYVp%2BfJNEdWx%2FoELSF8JaIsAQ4CyQ9dH33FJ%2By%2BlllMwUMC6CppAiqUjDNzckqk8hoVQbvK08CkL5UvPr5LCMtQlP3fvDW2vN0MmPvRi3QgQ%2Ff623ZkLIkIh25ApXd6RfWKZ37lT0ZcHhHIlyLArbY4wdg4tcfLH5Z%2BkSYEXECc%2FaqEAjUFWfMkey6Gwd0ldB0ZnDWWpHVZ2KduI67TjgmiNajMWB%2FK%2BYglER%2BsmfICePyr%2FVDojPEzIP6vfZF%2FQSUfG9%2Fl7NWFZUkZDIiFP%2F%2F1Czgpd3ERs67MQHT6pZOZktRb7tMIbi3MsGOqUBwEft%2F9aXwQdLmFZF9cMcD5Y7nt%2FTafq2xFZmEuQemEHF%2FzY1jp6XhZvklNsrxIJOmfbCIzKwI0oVwIVxlvNtEgUWFfT98%2F%2BKsJ213EfT%2FrwQE429MBopsFtSPL5j%2BxXgrpQxv6xLSE6w%2Bf6XwIMFZEwgskP%2BAoS4%2F3KCrNh6J0%2BTksRNbw8OfYl4nZuJjRpNUdaYbceZZhk4kyPXFph5A7vbJhsB&X-Amz-Signature=91c9ecacd0690f1f8413ab232a5121f4e1e61e545ff77bfcce2c8b30178eb3be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOUEDGVS%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCICtUUU2FsAp5oRDYVnCx002XhGavhCfRQ%2FUZPma2QsKBAiEArRsCgVxvc5N8vT6gG1gNjmzhV953DlXFupHyT2IjEm4q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDJN3dm6mR7ZENKaKhircA806lInoKuxYTaS57YNuIG1io%2B6Sxo5wsbWQtKGlDrrAKGVmaz1XRYDSfXfHQHESx0hzatyUPoiJ0kfS2OqT6FCbK7qcj3Ge5jgPla9JqKvQfzlzu2R3o7hDGCRIG4lrpH%2F8v4adi7pdMi5Hu0CXZIItFTCPAdxymb8veQSWJEt9XCW5Tn6%2FQ8PzkXabDLX43QjHwSIyom%2FbBbtYV2yS0YGa08g2OBHXDyARX76kMrYpVoLlQzNxtzCYoFvsj0GrEULeCpERbQuXP1%2FTdLEBnlFm88chZCLfiTicxmqO%2BMy67G2VUTkeKcpb7VHFG2%2Fd6anLcdfE6xdnemDJ3fjcueiDZZlMUlx09zNwMNFyH2iIKQ1tXmv70x2sEgwmh4oZk%2FQbsb%2BHqc0p7heQl9g1RhrR%2B%2FMHOO6NfBMyz%2BS7UVfwZypoghdlrSo%2BvGyikRGCGuRvj7V9Ef9Cc5y3dJl6EWiSzKRnpT0z6N44ylYEz%2BnMSsPHPerrxw4pm7aJgsxyQvXS%2B2uapKZueHCkoPJhL5NlhSKYzHHfjlYLWOdwYDOikaZwkmQeYb9y0ARPaKuW1Hq1SdeX7tVm4CRUQ06e9S0X4s9Y9Ui%2BbKtpBw%2B0gKotTuXfkrFXbJSELYRZMKfi3MsGOqUByR1mfgmmg2eRIUzxGk25F1fjIDnflRauAF69UbdZrbRE9fP7xoimdzzYfYShwtwNYQ6csI%2FllTwApY9vHiywKxpTLnTEUBsKZzbasPgHUFW70cHN8wOfVzhjFaLAzta4mOtCwjd08cTVu%2B%2Bd0WUdDAjHvvA2Eez6rRtlg8WDZ4sVpEP8rp7oWc%2F69qbSNoZnPSQABMHZdMZzW%2BAEH6fNmdXezB7t&X-Amz-Signature=7f3a16d3277c8e984afd219514b6ace11cfe2906815567b6f69f339a79d8243c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMJ7T6FH%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIC2Xu0%2FtKBBmY5BcLWi6LnWPs8SoFdwUtDl164uvPHFPAiEAu6dgozb0nWYrypsktjb5Ix4DEfL41rZgD0x%2FtGWlhKUq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDF7oeS7nIshGecthyCrcAwfEr2yUjnXOXKsdE6%2BLvd8mA%2FoesHv1lkGphQqn05QZ7qtQp6Xlv0Mxit6uE6Mk9tMJw%2Fw1qbKNg9eHZDAmKqeZVyssdNH4nW9bBROiCrM3YgBcjw2gqizQ4tkD46V35fCYc2pplfY0q9aKlXN2HHMO33%2Bl0bssSIJlj33%2B4DaJGsSI7tgA6h6wObtyeyTEUu6uU84aUxfXH5Oxt8hf7ROI5nEC8vhYxMc56tKZaKQTlRp%2BvN2zGqbRbc2gQlwGzx6dWao0cvMVwzv4EbV5momaL8LassmzHd3iF01Yg5qpL6Iamp7%2FB0xEOc33xEQuYZjP48Pcp9glQnLfgqijnYfNk06HLlbyHe8TFpi0SQ0OO87%2FGd4Xm1lQ4gSavnl48KTotVrVdE%2FU40Rx4TJTH%2BVynijeJ9UgHDtyC29IgWNnQ9ecRwrli7yFH7tSnRT7hxewvszBMxSlF1BFSqdMwYyrlklHTk413R5ahO2WRPLMBdQ%2FfX8k8F%2F3K819a4OuIMLoU3iFmtE%2FeuoR3Py8oI8hVtzeNCm%2BTzxHvXxfp9OJU7%2FhrBy3m9p7pwPAA93QBZh4yLGC4iD3wV4BP9nKRGO2pQbNZKveTnrBZQqsJYhFf%2B0oAodFvFdMubVKMKfi3MsGOqUBryTAoAQIFqBxlvHysv1782jA2OqSS0pvvO6cPMmUlaRehF%2FhUBLE%2FLMYKn2SZczf1wZjmHRPvujW62EVxcM%2B58ojw%2FC8txfNUy73vPEu16yLsuMNpMepJHfq4NWYjqzPnvRiUawwF38HB839JjRcVTLAlHfIxT2LU0ba46SMeOs8pp6ZxGTzYQi8kWGaqrHTZj11kVjiGaYZ4L7FovD7%2FIOt%2FB1y&X-Amz-Signature=a9c18eb2d32f99651db6c5194d560a97009d000118f0c0338db114b2d916b70b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662J7AHXBC%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCHicgKRCTPH7gz4lowujlQZgzNEbWmpRwzQbcJGPXAHQIgbEncqGnWD9AbKnipE23YrVPPlW%2B2zoUMaXrVhhi5CZ4q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDDcUQpYFoeQV4QMcXircA2a3UQQcfH%2FGS1B2Yo5zksC6XzN4kZlj5vF1fW4IbLPPKJt2XKsOmUQIvYIMJV3fCQQDlOaTofy%2BJZUG7cg9H5EbAxaVrbcdhBPp9p8iUnqUPxnF5k0x0PyUo8SA%2F%2ByA%2F1JbfFD81%2FPmxEfXeN5j93awa9kh5YnpQ4nyw7TxTKhwfLvdLJaalsC0QbKVvR1C1dS%2FFmrJ2a%2FkAo8iyXuC%2Ff6WbLLWLH60qvtZ8s3R1ZpC21ulqMyOC6p9%2BAqe7AJ3TEvKeVo%2BlpzPKf2gJokJ3KaQldDul8eGMpIhjWaBXC9VHLvQYbsYDRUXJmOnR41nUzEbAQGra%2Fx2yrnvylxAldEArPZ%2BMCJVZ8%2FqsElTDXaRndInPCX0W7NBtG0LFFKa8Bwp8SY9LDxnP2kGFRSThABEt5kZW1altWJvu40hbz9IpYS8j7q%2Bdw6kPuwqvwdzPLNfgQQ46X8U6a%2FEaLNNH6Exrnq0oEQL6iSSLcDgp%2FMvAdvwvtG5tC7XxxLwdnAtPNE3RvGIVQI47CLiqHCGztdk4iD1KSlYxuFR6Y0pBe6l%2BsdiwC00IDdKrpHIjrfHqRrHCoMp1UoFZam5HSxn95COKC4JTtEjm2tU39R2uCKbdtUIDwlz0hjmb65cMPTh3MsGOqUBxTM15RTA1jUVo6GZQnp%2FAxNOsWypw619I14plZzzCYWwaVV%2BLrqYyL4m3zSWpo0ebUcJI%2BE34E%2BWh297ogblsaCqwM91w8kvci8asxTfD2PLKTCv6cYWOSJDjBd8%2BfmPV6AyLxCmItwWiu3eGGcZnlqa57WbEcq5a9NtnEPPW85bySeKaWzFH86PRGKmN2arVIEchsbem42Wf334UFK3FdB%2B5Fp5&X-Amz-Signature=94862cdca0ae27f976c09e45741adeaf8f77f234ffe20b7d8705cd94f8cffc27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MJNUQC7%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDLcnASX7SGLalo8khcCcC%2F7q54Am7gfDZPR3HaioLtdAIhALuJmn7HJNJemJ4EvdORktGzj7rqndT9E%2BJeG%2Bie4qeGKv8DCDoQABoMNjM3NDIzMTgzODA1IgwQ5pNaOcVyUGpFQnkq3APOg4%2BmbxyOB0GULeEWrm9ye3f8pOO3w%2BBjKH1eUno36cS48uk0d87IYrzxBSyXREsNNS2r6WnFBInKojvdwW%2F06f5xaaCzBI7DPH6jcR0p3W0egEAMOMsbQBHm0gKfORwcGxIwS2y3m6NugwQlO6u8v3DfjlOMISKVBiPsda1zEuRYyA0HKEIY9INf26lAr4ojBUmN67yvlFnyuz7voaGvdECJOs9lBKDWjhPCouaJVsatQeBiMzWcA4J%2BzNNqofG3zJDyWWETC%2FZz8NhAUHMwQQA1vP%2B481kKmOm5908x8ewVvLa3uN0MW7ovxYwtKMwQ%2Bx9tJN%2Fw%2Bkv%2F3flj20vmBY8OydMe%2FZ%2FVzjnpL7XqZewgnptwA96%2FOlXEGkrZkqK8w3GCi34X3tPl08pyqUGqUlSYoRGH8VVZf6kQ3mtOpriSDSOwvxbxCaXozTa9885fWgHNRvW7E6KicFCnRrXJksu9JxboS8DEKvILV0V0ua4XcDO8ciIwohRzDy0IhRHqvpzo5lB6w9%2FolVI3BBW6Y4tCUwUec93eITfQRJupApaqxJAD8V6BHj3FVwFXsGxP8wh7dwaD1jpgNpwVu4bGkq2%2BOk5dnmkTg4F4ZXfA%2BW7APp0J%2BQyKMR3WijDU4tzLBjqkAbX5eLmo6PBhb0LpauKNlvDNbIZwPq36FUbH71WUMcos3MRuAyXJC35xD%2BB5fSBQl%2F6xrt7%2BtD1e%2B4IGtMawKQowFFsXFaggGLeojkLPSZw%2Bsgb1yJUCCZ4YriVoYFf2ni0MJqbtJ5C%2BDsKf2OfwO7xGlZbuDUtfGvqG0IHX7soQqGU1RHoLUT3dCgf%2Bz00XOcESxIsZun%2FQ2SfgGlUaKEc%2FyGh6&X-Amz-Signature=c469a4df8304c7dc97d7a85c8826afa546140668ced645d5c6a4f8bfce621d7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MJNUQC7%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDLcnASX7SGLalo8khcCcC%2F7q54Am7gfDZPR3HaioLtdAIhALuJmn7HJNJemJ4EvdORktGzj7rqndT9E%2BJeG%2Bie4qeGKv8DCDoQABoMNjM3NDIzMTgzODA1IgwQ5pNaOcVyUGpFQnkq3APOg4%2BmbxyOB0GULeEWrm9ye3f8pOO3w%2BBjKH1eUno36cS48uk0d87IYrzxBSyXREsNNS2r6WnFBInKojvdwW%2F06f5xaaCzBI7DPH6jcR0p3W0egEAMOMsbQBHm0gKfORwcGxIwS2y3m6NugwQlO6u8v3DfjlOMISKVBiPsda1zEuRYyA0HKEIY9INf26lAr4ojBUmN67yvlFnyuz7voaGvdECJOs9lBKDWjhPCouaJVsatQeBiMzWcA4J%2BzNNqofG3zJDyWWETC%2FZz8NhAUHMwQQA1vP%2B481kKmOm5908x8ewVvLa3uN0MW7ovxYwtKMwQ%2Bx9tJN%2Fw%2Bkv%2F3flj20vmBY8OydMe%2FZ%2FVzjnpL7XqZewgnptwA96%2FOlXEGkrZkqK8w3GCi34X3tPl08pyqUGqUlSYoRGH8VVZf6kQ3mtOpriSDSOwvxbxCaXozTa9885fWgHNRvW7E6KicFCnRrXJksu9JxboS8DEKvILV0V0ua4XcDO8ciIwohRzDy0IhRHqvpzo5lB6w9%2FolVI3BBW6Y4tCUwUec93eITfQRJupApaqxJAD8V6BHj3FVwFXsGxP8wh7dwaD1jpgNpwVu4bGkq2%2BOk5dnmkTg4F4ZXfA%2BW7APp0J%2BQyKMR3WijDU4tzLBjqkAbX5eLmo6PBhb0LpauKNlvDNbIZwPq36FUbH71WUMcos3MRuAyXJC35xD%2BB5fSBQl%2F6xrt7%2BtD1e%2B4IGtMawKQowFFsXFaggGLeojkLPSZw%2Bsgb1yJUCCZ4YriVoYFf2ni0MJqbtJ5C%2BDsKf2OfwO7xGlZbuDUtfGvqG0IHX7soQqGU1RHoLUT3dCgf%2Bz00XOcESxIsZun%2FQ2SfgGlUaKEc%2FyGh6&X-Amz-Signature=0aa18e2a3352b66f98259cb4976ac47854c84c69f3e0d780616a790b8bfaa526&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RECJ4YKN%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIA8n7fhbZozv573DGUbAu7H5sQNr9DIVPWrYI4Kst1XOAiEAhtjhoAhnRLOSiIyYKUmptXnpzICwB1Jno47UMCbcgUIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDICl5uSfxcEbf6DwYyrcA6vubT4SjCt0nd6Zm6mQ%2BuG9JTXMYraxUpS3Q95h6xDG5%2BTmpWA%2F2I1USRgZbfsQDKHa4Kf28pLpplen3GjVrdmaNrK4oYe2vfA3tvwg1x91GBfDlLIXg6hKS6ieSf3Q9nBMSYlsr5%2BKVpLsr582Xm94vWrPVpEQXjBFYjl%2FXtsedcg0prhHxDSOYJcpZ4JZPpt9gTx8nV8ofAOiVG%2FyOxUooI793VT5iDUiR5wtxliv9oAraMImr3qPQWCfbliHIJ3UHXox3db0RsTNVpyDZgE0a5K%2F1wOpR%2BG5q1KqcR%2BQm9lD03s50lgBCuiF04NmFWQwExgOuVQSWjeCAo4IfTJhpJvR%2BD9uyNriM1QiorfvUxdQgpZqgM5Hdfgs7XJiOraJvoisjLm6nqZZDojcFiDip44Fn1i0g2QOFFPr8EiRA04iX5zqwsMgmtBsjcDQbI84iaoBXG2fon5i3Yuckv4zdevdTaNhDX7%2FunmuRiLRuTlKeutPop5qy3a36y742vJMR85jFQOSStEhzswR9ft4Nw1aIm78NLvlkXB7%2F%2FwpbmuL7joWRG558x22rc4Dtx59cpN7J1qg00q4RxaCENXAv6qc%2FaaFfjHHJIjcLwP2hK0hfInVeR2WZTggMOTh3MsGOqUB9Eks3dzZE05SCNZ2VGZjcBHHrknMqpXlCdAwbEa08r%2FFtBWPsABfN39428cEnf4sUVusQh%2BKjjBeU6uf14cuHHkD%2FBR86SfI1EehkjD0%2BKvim%2BMbsVnbXNP5hM9N9lTHH2KzGAPA4ySykRMGp2twrH%2Fs715e9aBOoEsSvnj6DSyxgV%2FfjG878Pasyxh7XccUilIWM7oy2m07lHKziLfMtjLNW2JL&X-Amz-Signature=5063128a30a5aa74a153ede6b3e35e99819a3137b81a3b978c7ff1d94426fe48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GMMCVZT%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC5iqeHdKMHAJSjDDbeRh%2FwAqa0U%2BgfE3SKx4e1sjvTcgIhAM2Quo51UhLcWqro8WF%2F3ir3fbvHsLN0TNQUuJlB5Yr%2FKv8DCDoQABoMNjM3NDIzMTgzODA1IgyMFROSfjqwe%2Bd0lQUq3AMMzfWRpZj%2BfHIeARHs2Mh3ZBTSMu5GtbY4wMtVm%2Bjcirvt3s8848BvR3F0u%2FUQwk6moj0ClXwU3m4bJouQNJZlRLvjgNtoqhsupzRBzSzz6nn9m3%2B67Dfb9SR9UWdaFcdH%2BovWojG5w0u7ydKUMPQG7Wqn2zmJY57Zee3%2Ff3Ybkk%2Fo%2F7xH37zQZ2f2ww26etida1GwCjCvol6n%2FDXvaNGGqsnbQA7btF6o8IihuXi4RK6Q8BEjUjfDxyDWlAncomT4g6ROxsiQKwhrjLL5Re47CftC9ixPihbFH0K%2F0omWOXobv5I5Ya2ICfy9Mpem%2FGIsFkeWXokX9sTWyk6hyV1DcYYhfuu5oWG22kcuhk28EGUJz1KkLGOskguQy8m%2BF58w9x4ib%2Fy0a0JUhSqC3SWCvTlyDp2swC8MWO9MSvkZUoaPLl%2BgSBQFMradzbzSEzwnjv0bpZzV3L5ZH79%2F4zPsE4zsGhJeE%2B2sDwzeqVGfU7O%2By9R%2BZlmZp2pzojBUJt1lhYlCvLIfa%2B08RfHY1IjXoA1kGrxohKuESrPS9B%2F%2BuElpNAotJDbCspA0woIlxWepY6TXvLrdPaEiKM7jZiDee%2BCYqwaFC8NA2qLb13Z5h%2FtsTCJaT5yBOzyB2jD54tzLBjqkAa1E5eE7kdn6TglkDfDXhJ3m20yIYN7XS8iC%2Fh3Ur7GGJ6KNSj6wBFnm%2BIkfzdU8hP18vXTpcJyPYZeeeonEGXzzwdN93fKIh1HCudnv9KtUpe41Eaoh97qWdkGb4xy9WU3L%2BdorW5iO3ffAFKT0qPZSvhM7ymXJWJA0%2F%2BzdrRrZsYjv3nuz7ridpiMgGV6Dw7ofQ5LLw8kYl8PeY9%2FtZ9Q9fxYr&X-Amz-Signature=259c95f1377b726d0a2a48cc230856692feccd8263cb577c61a14bff96d8925c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GMMCVZT%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQC5iqeHdKMHAJSjDDbeRh%2FwAqa0U%2BgfE3SKx4e1sjvTcgIhAM2Quo51UhLcWqro8WF%2F3ir3fbvHsLN0TNQUuJlB5Yr%2FKv8DCDoQABoMNjM3NDIzMTgzODA1IgyMFROSfjqwe%2Bd0lQUq3AMMzfWRpZj%2BfHIeARHs2Mh3ZBTSMu5GtbY4wMtVm%2Bjcirvt3s8848BvR3F0u%2FUQwk6moj0ClXwU3m4bJouQNJZlRLvjgNtoqhsupzRBzSzz6nn9m3%2B67Dfb9SR9UWdaFcdH%2BovWojG5w0u7ydKUMPQG7Wqn2zmJY57Zee3%2Ff3Ybkk%2Fo%2F7xH37zQZ2f2ww26etida1GwCjCvol6n%2FDXvaNGGqsnbQA7btF6o8IihuXi4RK6Q8BEjUjfDxyDWlAncomT4g6ROxsiQKwhrjLL5Re47CftC9ixPihbFH0K%2F0omWOXobv5I5Ya2ICfy9Mpem%2FGIsFkeWXokX9sTWyk6hyV1DcYYhfuu5oWG22kcuhk28EGUJz1KkLGOskguQy8m%2BF58w9x4ib%2Fy0a0JUhSqC3SWCvTlyDp2swC8MWO9MSvkZUoaPLl%2BgSBQFMradzbzSEzwnjv0bpZzV3L5ZH79%2F4zPsE4zsGhJeE%2B2sDwzeqVGfU7O%2By9R%2BZlmZp2pzojBUJt1lhYlCvLIfa%2B08RfHY1IjXoA1kGrxohKuESrPS9B%2F%2BuElpNAotJDbCspA0woIlxWepY6TXvLrdPaEiKM7jZiDee%2BCYqwaFC8NA2qLb13Z5h%2FtsTCJaT5yBOzyB2jD54tzLBjqkAa1E5eE7kdn6TglkDfDXhJ3m20yIYN7XS8iC%2Fh3Ur7GGJ6KNSj6wBFnm%2BIkfzdU8hP18vXTpcJyPYZeeeonEGXzzwdN93fKIh1HCudnv9KtUpe41Eaoh97qWdkGb4xy9WU3L%2BdorW5iO3ffAFKT0qPZSvhM7ymXJWJA0%2F%2BzdrRrZsYjv3nuz7ridpiMgGV6Dw7ofQ5LLw8kYl8PeY9%2FtZ9Q9fxYr&X-Amz-Signature=259c95f1377b726d0a2a48cc230856692feccd8263cb577c61a14bff96d8925c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZB3KD6V%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T101452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQCwh8k8FM7I1gDiGUoPD4LgHzPUVroe65Vd9Hnu%2BLkZRgIgVACuOZqt9h6cOE4LlLIc7Cux2yYAVKByCa4jyo8kqtQq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDDZmfmjVW%2BasMiI29CrcAyTE9Od9LJoKPoidjQE86XXds5kHA89%2FT7Y2%2F8M%2B5INP6BMZR3YkV2Das6%2FK4scuqbuE%2BxbFsqeQMGooK2kcaGgjirv1SW1E8Sfp4DtJYv9bjj8K2akmtolxI3hhhuthTXNwRhMZKDajc7JWQooHVdHmPfX5dgt3T2cMQkTEUCxFCnk4RYzgrXujcUpaE5QzX%2F9s1phEIALFpyFGSazgb%2BP5Tv8zbma3f7RJz6JTEW5%2FySBpvh1wvp0dBOrhihJ5EjTTkMJDKfn3Myvq73kFeXvTd%2BQXTziSet070sS9Ro837Ln5w3gCrwE1MOCH%2Bp4F34Ub%2BAmvjS%2BOuxAau8F%2FrFe7VKZvt0E5XGRlLNqr4edg%2BLakYNN2q7A2lHl4QNw0mOO5g8WvKh0DbXgdPrq%2FWXmuNjSHmZf504X0%2BoHPYZSsLvrbHIdRcjAk5YDU7LIVJVAUG0Xo1agxe7Bapy2cO0FRnFQ3q0rSN2kLfFiGjFO%2B5xc9hFpelhwXmzWl%2BK%2FyhF48pHgq6C0xLoWhL3ZCqr8qgkb1OVaH1GIIXo3tNS0G1U8NDDtNrnIvP8BwQ%2BDPl3dWvi76O9phAKMRERQf%2ByQVzv46EHakRGowymPHwyj2n2xi3juecTcVvQyAMOXi3MsGOqUBZcRcP5NWOVZov5EYHMFrrYwTyvNkt1mZjWpSviar%2FG3kpkFO6%2FECrUKt8XATeluzDyYRuiONbUiL2rSYbgeCKSqvWohmnMFDrmBGda1JsL4UIUaa%2Bo2KT3O3FKBUhD0GNNtFzKJWSKDYByBFRgy%2F5apNvLUKy6qLGjLjYK%2FPl3T%2BrKyEjPbWsZxwcMC8ertdiNge6tfu2l2Ciu6HtRpPmj9sIR6b&X-Amz-Signature=fed6eb2b648486d9299d810202f089f9717af545ceb93d395f09100ae39ea7dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

