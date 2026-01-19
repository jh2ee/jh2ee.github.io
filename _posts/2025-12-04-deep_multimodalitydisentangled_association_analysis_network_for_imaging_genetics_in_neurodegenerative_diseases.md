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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZPMIB6Q%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGmlO4igNFVaDa1Bx8ZS1x0x%2FkjFJs90cQpLlm%2Bj0BwFAiEAyShTCWfUNMmqiFg76KWwamrhU4i9QgqnudRko%2BbffacqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDExL5k2gA1DPPwBVtSrcA%2BqGu6c%2FesUIuZ82gTkhMXXQNklJajZFk5UOh8teFFNozJoAE4%2BU9aNAfXMZMnopNUnHFOthFVeg6L%2BKBuaT9F57RGMreuRp%2B0UbLjU8ciPG2eUj%2Fjm6KXsVcCwLzsBdTYRGLT2t8jBucOxksL%2BhEMrxsjA99fVuOipqmOFr4h2wdth%2Fv7KZV2mMH7gHa5%2BcJ7JeeRM68F%2B6zy67WbW9mdx7Q5vFJtWdV1NAqT7GD5q42gvQzgoIefCd7AVzHZssA8ICy8X9ymFoVUJN%2Fatz0nsLnG3Yy%2BobWL4hCAkxFXXkEyKbg%2FRLvZ9VbAexO0FP3mj19JcUxHEncF0wpiuD%2FIm%2FLlraK6lu%2FHwiy5qxV9Qqymuy7mVMssfTlxH0u8U6pMe7OID2BqMFVvRZRHmVunmYlA0pbBRls%2F2R6h3wQ2FjjuhMeHpoCM1cWFpDpCJ%2Ba1%2Bty%2FPobkTHbB1lUqEIWmLT%2FTE2wSNhOTMK%2BlyTCyVTNuynwefJVqWWQW0teOrlyX5qfbifEiTI0SuvBxDfmOpm02QqZAb07eJDg6p6AtMGbMu%2Ft6u5N5%2BeH6mlBVHZspb4dLNTT%2BYbiWyMYVODivU7NgA%2FL7qLqqaMNLRhM%2BkuV2d34l1ae4Qcn7meMMLNt8sGOqUBOComwRl89LHKgJkKigc4HB%2F%2FlZjEIqGl6YMvsdPPW6kZJxmNxI1fqpjhwQn2NnnoDGBt%2FZgq0p6hAIU%2Bf%2Bzc2SCt%2FjEM66MzZRUBKCYdNJCWxRrOk18PO3lxWjl8fOvkV2aidnGl85sIjthB2bikF97rmEv%2FejgS7nGbfo8ccw8J37NISnk%2Bjs9VNVDVcF852cEp%2FTUNaTmRdqWD6NoEuU%2BX66ho&X-Amz-Signature=3c49a706fc0cb7495ac28495263589c955d6ad60a4c9e6df5d0c25decb50dde4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZPMIB6Q%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGmlO4igNFVaDa1Bx8ZS1x0x%2FkjFJs90cQpLlm%2Bj0BwFAiEAyShTCWfUNMmqiFg76KWwamrhU4i9QgqnudRko%2BbffacqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDExL5k2gA1DPPwBVtSrcA%2BqGu6c%2FesUIuZ82gTkhMXXQNklJajZFk5UOh8teFFNozJoAE4%2BU9aNAfXMZMnopNUnHFOthFVeg6L%2BKBuaT9F57RGMreuRp%2B0UbLjU8ciPG2eUj%2Fjm6KXsVcCwLzsBdTYRGLT2t8jBucOxksL%2BhEMrxsjA99fVuOipqmOFr4h2wdth%2Fv7KZV2mMH7gHa5%2BcJ7JeeRM68F%2B6zy67WbW9mdx7Q5vFJtWdV1NAqT7GD5q42gvQzgoIefCd7AVzHZssA8ICy8X9ymFoVUJN%2Fatz0nsLnG3Yy%2BobWL4hCAkxFXXkEyKbg%2FRLvZ9VbAexO0FP3mj19JcUxHEncF0wpiuD%2FIm%2FLlraK6lu%2FHwiy5qxV9Qqymuy7mVMssfTlxH0u8U6pMe7OID2BqMFVvRZRHmVunmYlA0pbBRls%2F2R6h3wQ2FjjuhMeHpoCM1cWFpDpCJ%2Ba1%2Bty%2FPobkTHbB1lUqEIWmLT%2FTE2wSNhOTMK%2BlyTCyVTNuynwefJVqWWQW0teOrlyX5qfbifEiTI0SuvBxDfmOpm02QqZAb07eJDg6p6AtMGbMu%2Ft6u5N5%2BeH6mlBVHZspb4dLNTT%2BYbiWyMYVODivU7NgA%2FL7qLqqaMNLRhM%2BkuV2d34l1ae4Qcn7meMMLNt8sGOqUBOComwRl89LHKgJkKigc4HB%2F%2FlZjEIqGl6YMvsdPPW6kZJxmNxI1fqpjhwQn2NnnoDGBt%2FZgq0p6hAIU%2Bf%2Bzc2SCt%2FjEM66MzZRUBKCYdNJCWxRrOk18PO3lxWjl8fOvkV2aidnGl85sIjthB2bikF97rmEv%2FejgS7nGbfo8ccw8J37NISnk%2Bjs9VNVDVcF852cEp%2FTUNaTmRdqWD6NoEuU%2BX66ho&X-Amz-Signature=3c49a706fc0cb7495ac28495263589c955d6ad60a4c9e6df5d0c25decb50dde4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUAB2ADJ%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDcTXOOgXbFEOcLy8ayJHO7f7yBhGOYa5E7tJuzNntTCAIhAK8XnDfC3TERfPLzkftbD0hSb4M0i3NMlZJcNBe2GFliKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzArSCWwG5m6cls2S0q3AOP%2FxIZsdho%2BsKUnFrpx8%2BayjnCMYJ6b9VBwt5bw19uwCMhdfe6IyKzrYyhFq6eu18GjaL1%2FvnHis29nIf8lOdcjoijeOcwn1s9hD27lL91hTgUIm1Sw2ufUrQtICIyse0XKxioiQfEuKbTDjsCS8LVE7Afs7jWkj6gqm3HJvOSgtbwv2iby%2B4rHIF2l1ZaDyRY6MGJ6phFMJeASaWCRcGxrCzR3yUSdOHCilY2hzwI45HWQxV17jQinL91kGPkEXGcwN5lgTWJfmy1nZUwNP8ppTh6wyH9lE%2B1r5YpfwLA8LmGp%2Fqt8alkxf31RXtRd4XIrCz6dwlq0aLrrGzmijiuWlW3riIMzXWYNDP%2FZqULrPzI3uiy08YcaRdCg6lnwPLLQsxF2UctHZzHWiRuBHUZm4TeyXsVyx4N%2BoYWrYsmp3Vj8fFH7Be2pNtYBdwPcMBNLGCcLJo4tmo4IN0rXKBYfFRAYh1anNnJYm50h4mIIC%2FESWFPO7nlPObs51xqUU%2FloR5e3rtqVLqskK8z8LgEhAEsy253F4qLL0O0DHc7u2wXFlPwv7ey5pe0027l%2F0rZgF647FbRBZcbQlEgxtrMql8tE%2BbFROA6j4efmCRz%2BRppRW2uZrYYfeF6iTDDzbfLBjqkAXlEuhya50T0Fdzlf30koY08Ft7%2BvR7RAU1%2FWqk8mfWMHEB2MrvdxdvAYQF%2BXMIKvWKWFSuMLE3ZTyykb0wJ7OkD%2BDq0bJGE34SDJuSnCvsRrJypq94JLv%2Bqf4ldmYfdnfwgiZ3NT3vQhOYyjTH%2BuAaN4bvL7GIv8eL1TlyrIUT7cCOlCqjXdAx0dMc3cCwQ6Y%2BLB1tQEFJ4Lav3pBoNhDX6SfUu&X-Amz-Signature=fd12609e04c392c6070d36eb5776d6217efece842934af8ead614614f41808f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOIW6A7S%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHdoQB076lIJynHqAZ%2BgYLWndzUbx8YXj5PdmnpGxS%2BgIhAOs1na9%2BW7gGOdpK7RdLOcz3u2IFmVP075sd7qhwFbKHKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzK6smZPYcdi%2BXpdKEq3APkYGRd7RsRRXUbEAzmUQvdVoVH64UQJ0gZM%2FG06IB54Ecv4xcrtTb2UtCEwVxHYjIYr%2F6oyprbdwypsJAOr6w9RKLoby407Ca2mVzQUbqaYByCYQ%2FY2IJzD8R9ARUdugdsxNOQ%2FiwoV9%2Fk%2FKBhWi%2F%2BKIAgM2QIRLEBMvmc6GlzaJ7bichRoVUMa14haM0XMrx7XBlvxFnajJzVXPgLzLVA2qN6b9zX9Yk7K2y7weo299v%2BuxeUS%2BqscqmCAp7Mqb90icrOVnWK0wvVzCmw7G%2B5IgxhS5DwxO9TrsiY8swlrBUaF1j%2Bb1mPj8sbXPlKxQkIVO3ykMGJ0zVdvhI%2BVHqeEga3X60xuBWxnKTrvLJGM65FLK2A6FOuqCPGAztQHaZExpmk1ZGqXhGoDRHZr2vZOMVeEK5V4ezt9nvmc2j7RlDLtK1ibC7DUl7n5HVwmE5cAPLIuJZzwNTTs0rgzmkfmw2mYun1SYpFj3C65KtL0DiRDUZJ0xW5C2Y3lPD8B5UMA1YMS8b%2B010GWdKDNXPbrS%2FG%2Fx0xPZClzIaLr%2BhSt40%2BH0NuLdJNADerZmSvNNJ2utwx7uXTzCAc%2F%2BmYVSfvwB4E5hk9m3hkapQ0OED1g6XN4I%2FsggSyD3F%2FnTClzrfLBjqkAWA1benXgHhTZZbzJq5f17147mB2QTSmjepNmLFZIFta%2FkMJlyRlVaoSpRn7fXfynam6pBnFaJ%2Fuc0QwKACwzlUxPoQG%2FkbBtCx%2FdfpvIL97YYvriYkKNRg%2BZO8KRDb1Xj0oSlMQsRl59UNyLAVJHDp49sW6lsO1918wmdQoc56ZkmSgmBWGFYatOvlBtCu3rUXyhe3NTvpVzsaHUYtiPwQ4hwKe&X-Amz-Signature=3a6431efbc7c41b3a6390a49291b6074a9d4522db239c99050ec31eb82f70f58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOIW6A7S%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHdoQB076lIJynHqAZ%2BgYLWndzUbx8YXj5PdmnpGxS%2BgIhAOs1na9%2BW7gGOdpK7RdLOcz3u2IFmVP075sd7qhwFbKHKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzK6smZPYcdi%2BXpdKEq3APkYGRd7RsRRXUbEAzmUQvdVoVH64UQJ0gZM%2FG06IB54Ecv4xcrtTb2UtCEwVxHYjIYr%2F6oyprbdwypsJAOr6w9RKLoby407Ca2mVzQUbqaYByCYQ%2FY2IJzD8R9ARUdugdsxNOQ%2FiwoV9%2Fk%2FKBhWi%2F%2BKIAgM2QIRLEBMvmc6GlzaJ7bichRoVUMa14haM0XMrx7XBlvxFnajJzVXPgLzLVA2qN6b9zX9Yk7K2y7weo299v%2BuxeUS%2BqscqmCAp7Mqb90icrOVnWK0wvVzCmw7G%2B5IgxhS5DwxO9TrsiY8swlrBUaF1j%2Bb1mPj8sbXPlKxQkIVO3ykMGJ0zVdvhI%2BVHqeEga3X60xuBWxnKTrvLJGM65FLK2A6FOuqCPGAztQHaZExpmk1ZGqXhGoDRHZr2vZOMVeEK5V4ezt9nvmc2j7RlDLtK1ibC7DUl7n5HVwmE5cAPLIuJZzwNTTs0rgzmkfmw2mYun1SYpFj3C65KtL0DiRDUZJ0xW5C2Y3lPD8B5UMA1YMS8b%2B010GWdKDNXPbrS%2FG%2Fx0xPZClzIaLr%2BhSt40%2BH0NuLdJNADerZmSvNNJ2utwx7uXTzCAc%2F%2BmYVSfvwB4E5hk9m3hkapQ0OED1g6XN4I%2FsggSyD3F%2FnTClzrfLBjqkAWA1benXgHhTZZbzJq5f17147mB2QTSmjepNmLFZIFta%2FkMJlyRlVaoSpRn7fXfynam6pBnFaJ%2Fuc0QwKACwzlUxPoQG%2FkbBtCx%2FdfpvIL97YYvriYkKNRg%2BZO8KRDb1Xj0oSlMQsRl59UNyLAVJHDp49sW6lsO1918wmdQoc56ZkmSgmBWGFYatOvlBtCu3rUXyhe3NTvpVzsaHUYtiPwQ4hwKe&X-Amz-Signature=3a7623751ebf4ecea203cefde2b915c75e8c06c4e2fb96dc3357d0570c17b24f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WH6DKHX%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8obVzNWOLGMicnbmuB3wlBRG5%2B1Q3BAFuM8jNfrqFFwIhAPmeppw6QtZHudYdO5NXOxag%2BlpSJ1rW4iYwOdlbJLMYKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrZ%2FhGuxdRycBOMUQq3AMb4wISjC4oVzHpRZNXI1zB2%2FhZYaBy0w3yNVUcrph%2BLu0K%2F%2BNQWFlMNbBeqgNtLSUdoqf06kXs8KRfJr%2FgzK%2FxfBPanSci3XpxjVVzHcSGLEiqL1XiatQyxKWv9Srs7vpbB7Y6vFRaHryotWMc8T2tPBXhcaSPoRyxk5M2acwk5fXT7WClFo6ZhXM0e1gsIpI%2FjR7FUVxrfmUAv0Hylt0mYiqRt2nopB0rnUfMjkfPTwfiAjFA5IfUElLklP5TDtg0pN8vECIDC7xvvasevBywYSN6nqmUgvfZMau5%2FSNyOfBK7wizp%2FJT8iEFThsURYOc1DWJxPK2uqsdWuUm1PXr5%2BZBFNQTBzfUoUXKsdzdQanWLX17usDpalQ6xNj5qGVNzy6D9%2BHXFzGOMyklFywR743eem3ocli945itSi2E0aaVdQLvhawWf8uXsZlOKx2KkKcYZI9XVatXEseigRPY49dju5q6y70HCE1J6SmgcuXhSt%2FDujDjeqRQ09nYvU9k5hDQS4cK07Ktwxjf22A%2F1seiX1MFiVibN%2BDcQBXjc6hNEcqmn4VHeMMZxGwOYprAQtnbPdr%2FwAgUn1m7PnAOQg7HL7ufnDpI5nlohMm8he2ZHEZLuoUaU4qFkTDezrfLBjqkAYV26u8zkA%2FUbk6X%2B2yutnrEYos%2BKR6DSZXHvEeLNsbjHaraR5XNcAnsAMSsfGzmnSe5n13JFDeWV8r2wzsjoFNDBmgY5GNk%2B5hZ07E%2FLnDv4LB%2FVQPRP1PQTD%2FZjPEZ%2BrzPEDngl2vwem4%2BwLuvDiYl0b%2B6uSCP0H75VSvlwPNCaMt9QBIRDOix8bHL0xtiErV7wSSMvnTgB4w7yOuwm1rwLb%2BH&X-Amz-Signature=cdacb6971114a752dcb3a682687debf40a70202a04fa0864ba9c810508eef7d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEY5EHOG%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0GAAQBi1Cbwy0WofYe%2Fg7F%2BoMuoSwA7f7HkHf2M9EzwIgdXcT3YniPJw5q1sX0hW1xeSI43XawcFm7MaSAqlASb0qiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPx9AXU7Y5f6BfUk%2FyrcA2lbdEBXSVj%2BFGBAsS3dBtrLJzVQaF4N8R2otgiuJ3fR%2BTuav5WxrawuH4PKZ1JLvIeM65p5fp%2FwKSVLnvRGfbjfDJaQpLoaReHVN86mytZxHLts0fLxFJchHkMV9sacNKFIGe0KlGUW1Q42L98EYgCU%2BRuzcf9STjP7As%2FvHEB4NBbyb4bOXqNpxZwG%2BqwocZmiuLsk0PU2X2iiBCb4QUSXDadWcurI%2BqeMmfCuNeTZf8WOif3U%2BFVQvl6Fx4lH9pGhusEiLWzOFIRQ%2By3UaM5VWfYQ5Lrac3%2Fh7sTxzmKcJNuu5RoyWGp4jVwbIpn1aqu%2FXPg7oK5ruZONSif6n2LxGDvLqKOvWjhWDE%2F175NDBPCZP3fYJPnV89wOEiFe0z2pGwBR59o2odbVIH7oo8dfQY2t6mmJkxde6GyCF4cRaLNH3H%2FOk9za7lHgTvCSYerRD%2BnOfu47h5UEzffFhMJN77Fl1BkKU5MSjSOhPCjEasuH9nSi2T4BRFcCcu%2FfN3iPHd4g6qx3NGwAEFz9nzkQkSBWDd72SqZSrOHffaJNl%2BDqgVKDOi%2B4SW0jQ1OPNP4%2B0hKaj6rR11OE3MeO6E6KwjxffOUEypKlUIYCxno%2Fi6xhH%2FJI0q82XXWzMK%2FOt8sGOqUBXsDpYLdYeGOB5oPGY9qQBv%2B3l2dWE4rneFyoclFY9un1u8q0muHtNtqE6PFilmZMhxyHdXz8QFfmvZaz6MNq7aT76tC6MYAGnvrxXEXoow19dExI6LJMZgt%2F1gasEfNTahh17mh8vEE%2F9ItfFtssSRzucgLF2UhoB%2FAO2XirDGV2BD73QDPsHFhwR5wRCbML7SitnjcXj6F452h%2BkRKXgyusC0zu&X-Amz-Signature=562c885e5cf5b9d72fcd3307b6686ff9050b83dc1e237a1f6dbf082cf183845b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YW6QYZIK%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCV%2FKypxA848mIJnqc4qyqsJOltwS4xYo9dAX2NYKY%2BQQIhAM90Nwj2UnjFe92Oz6ZaonAfBaTR7HRg%2FconCp5fCfj%2BKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwZrGtt2RslPoji6d0q3AOtIQRkD0j1FNOnUKfStA8OWC2rLwbcKLX%2F6cQjRVjx7YPQKgda5bBJxQrhDTUIMraTpaHJtgOAIr8DwcDGUTO5Wr30iw%2BATaazzAIQyYN5hwPzMsNswC7k2rxKRkkG0LA0RH6J82cM3PXkUCyP4Z3CCmJ79HgA9V0OTKbIfgz9nAD3w1Fk%2FGm4GRAZ0luBhLB63%2FCo8YrLa%2FRx4nG1bSFLe2WNYfYi6lVSgvFyAJMC6GKZJpVQOsVrsS3imfpMti%2FI9vDd4F8AsCI%2FtZ7X5i1bOZ3NlkhnB7NMLfWI2hyTY6wn8oj8tTXCSmx%2FNeqInB4PjGbWQEapPHOCTpmThaB2Oqt9abngIBZXkLHUKmxnZTmJgnq5Iu3UB6M79yKCueP5Us9IfqA4IOaRb0Iv46WMCoT5E0xIKe3WYn%2BblDrqtMZ7%2FSlwVNRdqfOV%2F%2BHQ81JQ3eh8lRcxH82aofgyAiYoAPxUN5GarxWh5Pfo8jUSZMkp5K4QyCnAhBnzEVnKfafzR%2By38iQlSp%2BA9hpIsoOcbRMbMGUDI%2FNVHZZ%2BcF48fHyvY%2FPdEsTNZosENy166DOEUFeXSRQGA6eZ0oBMlIOdy6Ym0CVXLmDRwqIX2p117iWGrs9AkvprxbXWMjCszrfLBjqkAVZYTsJzS0LTeIoqf4lhT2XyDBwWqBrd2r6njXbEesa9CjZYI5FlR4FnjXdkkklTx5eUj4%2BkfmZXlFdeWKRFJ6yWH8o%2FHH49gDrLAmyPrl8X%2FXmG0VOQYkgNYt3u3rci2qjlWaqeNJtx6YtzOlsQQ5ojvluZNy2pe14sRuYnteyIQcCAvPHRyHW%2BOmsh6aRmeVL8MblBmAYQgIXbsHUo0rJwy6zU&X-Amz-Signature=7546681726940ab666c84afdff1cef40dd5bfc9101d18ff7e27e0b405e7850c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEPOAHNF%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNEKzFciwrnHSmwDwQMq3oKTiyeX79pkEmTj9rMwUUzgIhAN%2BICKBzFCxwcpLyh%2BabEhZ0S0VP6%2Bi9reoWkeh8KnX%2BKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyusikCPi1Mssp6NiQq3APCKRor0GmN4QNvE72%2FLLZy38TNElgjMVyqC3mqq2WdPU36sP11je%2F25yeZP21SKQYFUf9JSovSImo3vrnNZeHm3WGGiBIOdNsY34rVrNGoryXFNykE1mOheSSvoGorXybOeh%2FRW%2F%2BfssOFbHZiAlRmOdVNIjpPuqbO3YjVlfLwWsr6GKbpgPbYDXfPxm28FUYdgiM0F%2F4reP5yBLXn8QGmY5UcVfuQBKOzTGK8bQagtCtcPQc3xjX9%2BRseXlvoI%2BnytHiZ%2BEeY1ra3WBTLr1V6csxFcOFitRGSvyoEqdVRUyGbSMFsPkKcQCYV8qPW32spKKaBAvVgCL8WJeSxJpOcDGdRx%2Bhme3TpWEMgvyPGnxzFVk0x7s2UKxNMDct%2F0Jqom70dgVTwH6CF2%2BJgv%2FNcVU5Q9M4eS0sABSzNLth8uFyUxTguhCYdeiiusds5Yc%2FGnle6WZ8FPHPjfzfzR%2B2UEa3iqmtmGSjv62FlPihlDjOXD5%2BBBKKPpwFwsSXoEmb3F%2Bl9LZ7oJJbt7252CCMyZv6j13o0I7gPthGJMMrgju1%2B4JY9gXyrUX5iTfGHQ%2FD%2FEpwXiZ%2FB3cvBTMN7np1Rvl2EcojgJKmJ%2B%2B2Wa5NcTKhlMR3ZrPeqsumz%2FzCozrfLBjqkARQ8K6qiGbHPCmzKIPRGJG4sGvRggcwXuZ8cweIyZIrXsbClINDbMSOMzj2LPCiZuFGcN3SCX7Kqg9GmfPggpW4nwBnANCEZqVL2QcbWjMZazdA43aHwoiOghW0jJxKWTNJrsvEGTMc5KyZEAvVVqq3MDOOh%2FhMubgW%2B9cMSk6fH%2BT7y%2BHAFfRBWLhGf5HWFnFJ%2FhiIFDVdl723PfCehKJHzg4vb&X-Amz-Signature=5d9d34473e016b9ec2bb35e870f32e711228ed076139bd907af4b14c785a1fe9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEPOAHNF%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNEKzFciwrnHSmwDwQMq3oKTiyeX79pkEmTj9rMwUUzgIhAN%2BICKBzFCxwcpLyh%2BabEhZ0S0VP6%2Bi9reoWkeh8KnX%2BKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyusikCPi1Mssp6NiQq3APCKRor0GmN4QNvE72%2FLLZy38TNElgjMVyqC3mqq2WdPU36sP11je%2F25yeZP21SKQYFUf9JSovSImo3vrnNZeHm3WGGiBIOdNsY34rVrNGoryXFNykE1mOheSSvoGorXybOeh%2FRW%2F%2BfssOFbHZiAlRmOdVNIjpPuqbO3YjVlfLwWsr6GKbpgPbYDXfPxm28FUYdgiM0F%2F4reP5yBLXn8QGmY5UcVfuQBKOzTGK8bQagtCtcPQc3xjX9%2BRseXlvoI%2BnytHiZ%2BEeY1ra3WBTLr1V6csxFcOFitRGSvyoEqdVRUyGbSMFsPkKcQCYV8qPW32spKKaBAvVgCL8WJeSxJpOcDGdRx%2Bhme3TpWEMgvyPGnxzFVk0x7s2UKxNMDct%2F0Jqom70dgVTwH6CF2%2BJgv%2FNcVU5Q9M4eS0sABSzNLth8uFyUxTguhCYdeiiusds5Yc%2FGnle6WZ8FPHPjfzfzR%2B2UEa3iqmtmGSjv62FlPihlDjOXD5%2BBBKKPpwFwsSXoEmb3F%2Bl9LZ7oJJbt7252CCMyZv6j13o0I7gPthGJMMrgju1%2B4JY9gXyrUX5iTfGHQ%2FD%2FEpwXiZ%2FB3cvBTMN7np1Rvl2EcojgJKmJ%2B%2B2Wa5NcTKhlMR3ZrPeqsumz%2FzCozrfLBjqkARQ8K6qiGbHPCmzKIPRGJG4sGvRggcwXuZ8cweIyZIrXsbClINDbMSOMzj2LPCiZuFGcN3SCX7Kqg9GmfPggpW4nwBnANCEZqVL2QcbWjMZazdA43aHwoiOghW0jJxKWTNJrsvEGTMc5KyZEAvVVqq3MDOOh%2FhMubgW%2B9cMSk6fH%2BT7y%2BHAFfRBWLhGf5HWFnFJ%2FhiIFDVdl723PfCehKJHzg4vb&X-Amz-Signature=b15328e49ce6a4c30e422ae8aec9e2cbdc0a8eba83a3fbbd24684241a8d1692d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SMB7DCF%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICcjnu5yOX5zkT6R7v13x1zxT9VD%2Br%2BEn%2FLAGgtJm%2FLOAiEAkkAtnga%2FBW%2F8Hku1g3dQIxs0aLxnfsysm9lajlH%2BVNIqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM8b1b0%2FNedGRX5WFCrcA0PyO1rFqJVbofmSS4CoQRJZ02NW9oaamF9UIe%2BCkgB4k9Ach2rL0sDgloq%2Fn%2Bs4a6YYaSdKu3IpFG%2FniR085cGWIvUDjjF41iIMLTD8FD3IVbqish3Jp9TYm1DkoRM9q2iJ2kuj%2BAhDOdE4hAvz52kjj%2BoM76%2BxXleCLWFel7AAHeJGWBEeu0dGYiq8XOEH9fBgbCQ6pKr00Q9yAr1oqlk7piGafJhlDIluqS%2FW5lmyWBGVkFZH53DpB6Prhb4q5thh8lvtAodRqLb0ePSi%2B5aN8KtZtSjfmjPe0wVI5zyw3ZfHcQzCtbKzzI4uj9LlN6QnUwuPgNIJIEcUIePXBdflec2soMBEK5F0L%2BJCzgHIA7zBRrwO8DFIJNhfz6%2FzbXG4IM3Wefi5vMhJFKgRGxLdxsVbjUlvMRa6M1GcRKFg1OIACm2tgPvmHxZe066aCPkq5dAPiAxoD6%2FJZgF5zkp46dz5hGO24TJoNX2cNQLxNvEoZd73EwJh913o5Q9K15c9ZVewZOJyUUXWZpK9qD5JQGT47JtOeAXYFy5WcbaM%2F%2FJ8mEk9aBWJeBuVJZ117rSIXlTfiqo5LQyJTDJudcGENvHWhrFoLi%2F9xvs8%2B7kF6bD1%2F%2BFT34vAFzejMM%2FNt8sGOqUBqBjzsM2hC%2FH8uUPhoJLNHZ0q2RVZJ4pQNy0RU%2BvaJenc9gI5f2NqwrQ1fUkMhuY6pAYC3tocLMxqk9VyLqR8XpHSyAiIKPkG%2BUioYFKpF9%2BcZ6qtNs7BmpggmpeHy5bjNbw%2F%2FGaZo4%2BHAY%2FBhZBV5ssJU6pbvT6dTyetW%2Bz%2FQp1iu6F%2Fk15SciwHeXy6iUowyVNF%2BR7OrcQ4stK5vfJGqsKXqdcP&X-Amz-Signature=9642b53ea38204d357a920ae92bae956ee5573e0a07d46f13320d7eab20f0a7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTMTQR4J%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDocHcJcb3f5m1S1cJDg5YJ9whWNvqVn9PNV5AcvHX1HAiEA%2BBNai0Sz4fOlgHhBcFwwSJT6MGG0RaNuHtFO4lSk7ssqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE4RSCf5jxP9Zeu58CrcAwJcQD%2F6qJpa9FbJrXfl7AA463jRGUJ5fGIR4yckkYQSNl0WSvfy%2FAqJgdVijd9Ekp2hvO75Dfarjscy4REQqIMEXm76eVfQDB7Gaiqj1Tug6CGsW%2FH3yUFfX%2FvnUC%2FeDfIJFlhOH1JeMngGcBqY7d%2Fz9Hl%2FvDVEx1Fgg5hVxQHw49rV8SM2WaYdZ3Vxw%2BSORxAyw%2FSXf7bF%2B%2FYYpRWoJrzkc1r%2BJHnJn4XJAmtpMq7X80xXJx69oUjBq4%2FnDyETrut90n0HM5w5SEn%2BcapTixP8ipW3MBQhioM28PtzsddfVMMcQjwEn%2FekYKFHlD9uMNN%2F%2FzlvneflH9W3yKixVw0hpjNW7SunZ%2ByjU2xqzvP0INWno3LTZtjKAPqU9MZuaMBtTZbCvgx%2F7AUXzj09Rz3rQJHGYsYAlSHZp2dw5YADSyqmUaN9hAHbVobRm%2F8zRiBg8ylsabfAb76UfZ8Ga1uMrZdkDz5nw3tQPBBhrjYuV4u06QxyWpBt%2BcufkQRw9%2Fv5N%2FNpfpzIHHiw8pqVjYIzJ79vofoLrYWT788w5vsO2TkRXbbjQGtspPRwn2SJ%2FwZ9s6xA6mxg9ibx0AITXJfA8FLsx36QSxGkUMZCmKzeRTkAKjK%2BRScRndlEMN3Nt8sGOqUBmAHS%2BH%2FGd4s%2BIMRVjEOkvgY7XtqI3Z7vWs9DrkMIRdkIqeMf%2Fk2Rp%2F%2F8HJyDb4L9nymW0pfupIWGDwVDBU%2BBtkE1yxRNNhbResnR5s4mP0h0dfawmXeQOrvynOn9RS2MxN%2B8yKbvlDLzUbFdb2nZ71o7gK0ZnHgORFeOc4QGEOc6905hKCyGaC1EPNzuqG66SOFQjKqgu3gWVTnoACnVrglX7vN7&X-Amz-Signature=c954d33fa89f950ddb48451e245ff29c29f8537e0f7f6ae8d88f462e33126f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTMTQR4J%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDocHcJcb3f5m1S1cJDg5YJ9whWNvqVn9PNV5AcvHX1HAiEA%2BBNai0Sz4fOlgHhBcFwwSJT6MGG0RaNuHtFO4lSk7ssqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE4RSCf5jxP9Zeu58CrcAwJcQD%2F6qJpa9FbJrXfl7AA463jRGUJ5fGIR4yckkYQSNl0WSvfy%2FAqJgdVijd9Ekp2hvO75Dfarjscy4REQqIMEXm76eVfQDB7Gaiqj1Tug6CGsW%2FH3yUFfX%2FvnUC%2FeDfIJFlhOH1JeMngGcBqY7d%2Fz9Hl%2FvDVEx1Fgg5hVxQHw49rV8SM2WaYdZ3Vxw%2BSORxAyw%2FSXf7bF%2B%2FYYpRWoJrzkc1r%2BJHnJn4XJAmtpMq7X80xXJx69oUjBq4%2FnDyETrut90n0HM5w5SEn%2BcapTixP8ipW3MBQhioM28PtzsddfVMMcQjwEn%2FekYKFHlD9uMNN%2F%2FzlvneflH9W3yKixVw0hpjNW7SunZ%2ByjU2xqzvP0INWno3LTZtjKAPqU9MZuaMBtTZbCvgx%2F7AUXzj09Rz3rQJHGYsYAlSHZp2dw5YADSyqmUaN9hAHbVobRm%2F8zRiBg8ylsabfAb76UfZ8Ga1uMrZdkDz5nw3tQPBBhrjYuV4u06QxyWpBt%2BcufkQRw9%2Fv5N%2FNpfpzIHHiw8pqVjYIzJ79vofoLrYWT788w5vsO2TkRXbbjQGtspPRwn2SJ%2FwZ9s6xA6mxg9ibx0AITXJfA8FLsx36QSxGkUMZCmKzeRTkAKjK%2BRScRndlEMN3Nt8sGOqUBmAHS%2BH%2FGd4s%2BIMRVjEOkvgY7XtqI3Z7vWs9DrkMIRdkIqeMf%2Fk2Rp%2F%2F8HJyDb4L9nymW0pfupIWGDwVDBU%2BBtkE1yxRNNhbResnR5s4mP0h0dfawmXeQOrvynOn9RS2MxN%2B8yKbvlDLzUbFdb2nZ71o7gK0ZnHgORFeOc4QGEOc6905hKCyGaC1EPNzuqG66SOFQjKqgu3gWVTnoACnVrglX7vN7&X-Amz-Signature=c954d33fa89f950ddb48451e245ff29c29f8537e0f7f6ae8d88f462e33126f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAPDC5FL%2F20260119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260119T092119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDPVXrmsNcnD1taeQot2Vkxs6rsxWbpoKfLH%2Frgu2WkWwIhAPTDYEKh1EmTeIgjoQVKRo07cvflJvPlVdaLHFMMWHv%2BKogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwaDalknThBaR8lGzcq3AMLrU7n8o0RYile21EqVv8yE2KeCbfjtjmEBsqRZQl%2FUtQaTl6l3ZaeX0lYUINkN35FbF0qoktNJZ7xqpx6UjOCX%2BRxEiuHiS9ipHZ1w%2BGJXgizvx5BfogjzRGyoJZVryu%2FZ1iXtKaf2Lva361fZd6Yuw2zudiX0vZ%2B3aULJCdcYTGnRQFHLKHc8m4dkEvaCNMVbBEhdV9P%2BlH0BZ10AjDAKQY6Rq%2F%2F9qCSD5evnwWwWqhEz4MiNFI%2FvDzBYRqNxOkqAzviVs08HPoo4KruyMz%2F%2Fta3Jbg%2BLIjDx8XNBKJI4YLg8KBAjjiBzxZMyRfa0aaNQN6lcRj6J%2BmpN4i%2BHQsFiaMyKKFjuuPYMnDNODh4hJ14L2Fk%2F3YaQByEEitW6ifSLt%2FtnRxpYs25%2BHdmnct3PsTMaPGWWgmwj50i%2F8udEMjtZN3HAQIfZYB43sLfcsAfqi7g8o4oFvFtGHfL5VJO00TI9FPJqcsMwmXJ%2BWWm%2F9JI7RegLl6wJp%2B3IP8FGKMzCsh48ZfPBrByvN0P41qu%2FuxppBUc%2B3oFJ%2Fkk%2FCpeFbxyploAGiPFrxkvvylvI3Y4U3tPkVlfqJsbic7b39GCA1eWBRa5UHHksYQFXvDm%2BZ4QdJrmPFC%2B8OvJ%2FjCzz7fLBjqkAXUbxXStK5Vsdhpmy1wyUHLkticQ1XbQOOuPjDvOwAkAySpKJlcJfsaJnXtPVKRmFetzudoRYGSeSD2chISMu2jjZH4Qjqpx%2FAFLwnyfpKfqQGrelsQFAmjemdBn7PzUj4CXU%2ByqVTlWUt1sbekcizFrnMhiYRfp2%2FvQg0gz4C9XpeipbtzyJNPLqYgrsege%2FIWE1PuL%2F41a9OMfqjtJgTp1lGXL&X-Amz-Signature=65a970809df3843c61993002205b31dafae9ebbc6044150bb84c353f745f2dc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

