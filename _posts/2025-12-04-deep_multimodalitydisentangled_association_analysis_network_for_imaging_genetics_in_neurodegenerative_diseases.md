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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMOCXKG5%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6ov0OjLNhKMADk6tZv3hOGLQSv5OYsRKm1aMBTdIdqQIgbRoUjXzdmkSQCoYYWodkaPQBjXDc0ctxoPLZ%2FWnpraAq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDCIYlyjkjq6Sa0DJsircA7syuPhAy6cVUHIBy4Ulihr0ete6m%2FtXkYSweOmY%2Fpzb2SBVPgFIimUOZx%2BJRLHyusqBSUOn8rKHBK8RHbtTZ0oTw7wF8y2Fn1C5Xzp2COYgkgUCa5lLy59%2FarOmT72S%2F7UNt5uFNOMcqGQLUryGjQ%2BCdPv9Ed5Y4zTDd8PhVnJ3F%2Fojf%2F18N18BVFIERn27fcChhDcFHszLGHByD5LfKsSJnNOHfZd8s%2FXn9hNJ5JzQmNG2p6Xc%2FG%2Fq8T838LTkMIZJVRMwBCDfy23gQCYid4ObZ6PY%2FEkFzhTX7fCzdhoOt5U6xm8Ag7FRkkkEO89GJQj%2FRVCajtFO1TKIoi9btYvM%2FMYhW1qUhKO1fQN8PmVZO3mlVOUwJt5KdbIcjLcYM%2B0xeWNfGCefqTaxFpf0IUZwLBHTSIXhF25BGKbZLedEnkHXALlVV8ziK6CxC8M5dQH8FDz92O%2FucIFY1AeCrP1KLjl%2FzUpz6fohmRTQOq0uE0Vn8n6t%2F67UQ4v2Pi6yfBARlphOeXPxJcQyOyQPmV0esHhpt7wBR3YwDDIq0pNEHCB0%2BT2ucFNaCUguHNkSTsj3eiehY292U1mQQFQZ0WGTmjethZd11HuoJ4gQWE3FysF%2F%2FeuKdfBTA%2FAKMMXVp88GOqUB22l4uepsn3W4TGYQg8Mg4DoklQB1U4cyBH57AiVKt%2FtuefnWvsv4MVtLlZIbv4%2Fivl1A2CQz167nC7abDGj3BBkg%2BZcyOPAzevvI44mW5WVvDFvSoEmcr8O2UrJ1kIL%2F9GlpbtR%2F4y%2FXnixwKXRlkM3ZVnx8jhgsd3Wdtq9vARhHfQVC7uW4B8qCcRgXPDUfpN0QIVCUtrDEpMnqWcjwtgMUMFY4&X-Amz-Signature=f081f00d67bccca957821c0860d7fddb40b4044efab1611d975e9c4d6372485b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMOCXKG5%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6ov0OjLNhKMADk6tZv3hOGLQSv5OYsRKm1aMBTdIdqQIgbRoUjXzdmkSQCoYYWodkaPQBjXDc0ctxoPLZ%2FWnpraAq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDCIYlyjkjq6Sa0DJsircA7syuPhAy6cVUHIBy4Ulihr0ete6m%2FtXkYSweOmY%2Fpzb2SBVPgFIimUOZx%2BJRLHyusqBSUOn8rKHBK8RHbtTZ0oTw7wF8y2Fn1C5Xzp2COYgkgUCa5lLy59%2FarOmT72S%2F7UNt5uFNOMcqGQLUryGjQ%2BCdPv9Ed5Y4zTDd8PhVnJ3F%2Fojf%2F18N18BVFIERn27fcChhDcFHszLGHByD5LfKsSJnNOHfZd8s%2FXn9hNJ5JzQmNG2p6Xc%2FG%2Fq8T838LTkMIZJVRMwBCDfy23gQCYid4ObZ6PY%2FEkFzhTX7fCzdhoOt5U6xm8Ag7FRkkkEO89GJQj%2FRVCajtFO1TKIoi9btYvM%2FMYhW1qUhKO1fQN8PmVZO3mlVOUwJt5KdbIcjLcYM%2B0xeWNfGCefqTaxFpf0IUZwLBHTSIXhF25BGKbZLedEnkHXALlVV8ziK6CxC8M5dQH8FDz92O%2FucIFY1AeCrP1KLjl%2FzUpz6fohmRTQOq0uE0Vn8n6t%2F67UQ4v2Pi6yfBARlphOeXPxJcQyOyQPmV0esHhpt7wBR3YwDDIq0pNEHCB0%2BT2ucFNaCUguHNkSTsj3eiehY292U1mQQFQZ0WGTmjethZd11HuoJ4gQWE3FysF%2F%2FeuKdfBTA%2FAKMMXVp88GOqUB22l4uepsn3W4TGYQg8Mg4DoklQB1U4cyBH57AiVKt%2FtuefnWvsv4MVtLlZIbv4%2Fivl1A2CQz167nC7abDGj3BBkg%2BZcyOPAzevvI44mW5WVvDFvSoEmcr8O2UrJ1kIL%2F9GlpbtR%2F4y%2FXnixwKXRlkM3ZVnx8jhgsd3Wdtq9vARhHfQVC7uW4B8qCcRgXPDUfpN0QIVCUtrDEpMnqWcjwtgMUMFY4&X-Amz-Signature=f081f00d67bccca957821c0860d7fddb40b4044efab1611d975e9c4d6372485b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ALTGHNY%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC9sZ63YBKM5YnpTscxvPft6HHGxeYQYQ7mWsoBT74GDwIhAKjK%2FEPFmxwBUTginrtlpF1tolVJlaAT%2FNgG1TPcNnFJKv8DCGMQABoMNjM3NDIzMTgzODA1IgyOzEp6g95LgtzWNqIq3APqxvhlwV2cBhFqc0%2FZfUoZM2Z%2FFRH2phPzIHDrCT4f4ZyCw1PI8KXBiVWpX7B8%2F1Cii7CajFjDgkDlqU10HRzmpdgAkwxgy6eX5hYON3XVrdKYuFpYgB%2FLE0jV6b4TYkuxhp3WprxnHnQODvFJEZJ6WK2ji2qK%2BiqaMlCtpuswuWQ7uh7jI1b0FcYo2iChzpRbtXrdxJAgHYBtO5A2okYJy7arbA75iiwB6CXUKiA9SLEtQiQmjCR%2FyvXZCl1bFe78O2NkfMPKTaj%2FtOqu2Lbo3NDxWhpqXJcUmV3%2BAGckxw%2FzeKeDclaMu97iKKp8jVUaicfe5EuSmD5NPAg66jHlpQCwDPn7zTFAKgWPQ79iLOIH%2BA7Pf1PtA77rtXsZD3gx9IXmmlpmnW6TBi5OonSAwkoHWYFjUb0eeKRSf8wRtFk%2BKGvaEP4cj%2F0byqjhnON6AAJJlL%2BMhG6ejMdT%2FAmC%2BvS2Nyt1w5WbI0zq0rkDFVFnHq1vmg9tWdjW7uWCc8tcbkw8e57HQZYems9ErFTHfHYPvbvwAvghrEuan4BnBA4V%2BnTtumGUEgtvESnI4j8cIZDIsqxXjC%2F7vq8QkrzmUQzQUnz%2FJxIiKb8X6KsF1weQQTkfV46VU05icTCO1afPBjqkAbHywuhveRpznU4zpsQFZD6saVBqLEiH0Y2h44xtFlLWqnUInDDapL2i0aSUyJcxuKcGYH%2BpOGTHMnjIsA0B%2FIM9s6XVuK1muqOrYoAbzx%2F0sYytJfq9yEvegd1%2BUE1xRiLSrjdCvp459bghkRG4q73VTcVjKEckLwPRtLrmoOHpSKN4ORJMDt51Awt9XgAWDaumcGaRiyYS0iinAkWR%2F79ItCL7&X-Amz-Signature=7fad1cb1b11574ba1fb691375ad4f94b2da5b612c0f201eb3361ffb773b3cc4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652FQM6PB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDj8WO5lztpzhAvzJlraK1SukiWihmTjsdLfnOFq%2B1oEwIgDyr8ifmOJtp0IPpZhdoG%2F6qLQ35DqVy6vA444r05BrMq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDAvrVSwyeQymt82tFSrcA8P7X9WWKnMUCQlT%2BzztthIM%2FHVLumGG%2BUCmbDaKgC8Skqxii77GUyniQyTYYeuI9cYU73Xd1rAlP9cHf4HXiFeGecQok7l%2FopcVYX18VPYF7dLlITHpYkvOpdIrNOse7ZNRc6m4Dxa8ohCJA2LQ07r%2FP1TDsQG3mixo%2BtSHkoQjCdrOLah1x%2Fm%2B6YNWoE5Alznxysmu49oMDCIG9nNVlcRVpqo1JXR%2FtLItH3iHXLDWw1l5HBxPan%2BKHLbWMlUxkVA4OjVaC2Rn6dG%2FPaYtFIVbocG5EX2wFqv1nxSfYO99%2FQhm5QVbbwEyG5sMTUr5QnsbplBs5tmVrvwrDW1MGH0JlQP3BF7KdZ3igudsEqE5R7kQsPd9PdURf8BxjaIiHPGKGvDzf6uNYYHfyArGc7HbTazLA6aUqYjBk87Ok4Y%2BrHzJ8oMwGTCWdBSEY0V8nnEfcTyykhXW%2FJSsNNRbBNKJ7mJkfOgVsSZ5JUTKB0E6DN%2FtWBS5xGH5VsA9rUwtf2%2BScE9EgFT2t7brzVpM9OiDW1nUf17whAeVbx8XHof%2B0KzvFPygsWynlMw0h7SEL38VA3n43M7thhVRn9Ml8ti%2Bmyb8liJ%2BJ0oTs2ULssUXXbhvUcgNYJk5uR0MMOfUp88GOqUB8YOi4mem6h3LTgM%2F9gLbVGO136TnJs%2FoxFd%2FAVjQJcv6CjVmywhpFgnRyiIJTg0h6eVxiPV3TyDxnq5NQ2gt7aZUF1Bjwo9TiPVBA0xGfxpITR79EZKsIZVzg2oHM%2BkBrM1%2FGGg7f82mE4PXdkqFbqgcorPWcs4ePG59hYRIf32QAr5cynxCQ3uLd%2B%2FojqWl94sRE7JAgLRQxKPOfHjsV0%2B7hjT7&X-Amz-Signature=92053770ef948854329bdcef930c2ffefe51fa53cab6be8fafc05cce771b1440&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652FQM6PB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDj8WO5lztpzhAvzJlraK1SukiWihmTjsdLfnOFq%2B1oEwIgDyr8ifmOJtp0IPpZhdoG%2F6qLQ35DqVy6vA444r05BrMq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDAvrVSwyeQymt82tFSrcA8P7X9WWKnMUCQlT%2BzztthIM%2FHVLumGG%2BUCmbDaKgC8Skqxii77GUyniQyTYYeuI9cYU73Xd1rAlP9cHf4HXiFeGecQok7l%2FopcVYX18VPYF7dLlITHpYkvOpdIrNOse7ZNRc6m4Dxa8ohCJA2LQ07r%2FP1TDsQG3mixo%2BtSHkoQjCdrOLah1x%2Fm%2B6YNWoE5Alznxysmu49oMDCIG9nNVlcRVpqo1JXR%2FtLItH3iHXLDWw1l5HBxPan%2BKHLbWMlUxkVA4OjVaC2Rn6dG%2FPaYtFIVbocG5EX2wFqv1nxSfYO99%2FQhm5QVbbwEyG5sMTUr5QnsbplBs5tmVrvwrDW1MGH0JlQP3BF7KdZ3igudsEqE5R7kQsPd9PdURf8BxjaIiHPGKGvDzf6uNYYHfyArGc7HbTazLA6aUqYjBk87Ok4Y%2BrHzJ8oMwGTCWdBSEY0V8nnEfcTyykhXW%2FJSsNNRbBNKJ7mJkfOgVsSZ5JUTKB0E6DN%2FtWBS5xGH5VsA9rUwtf2%2BScE9EgFT2t7brzVpM9OiDW1nUf17whAeVbx8XHof%2B0KzvFPygsWynlMw0h7SEL38VA3n43M7thhVRn9Ml8ti%2Bmyb8liJ%2BJ0oTs2ULssUXXbhvUcgNYJk5uR0MMOfUp88GOqUB8YOi4mem6h3LTgM%2F9gLbVGO136TnJs%2FoxFd%2FAVjQJcv6CjVmywhpFgnRyiIJTg0h6eVxiPV3TyDxnq5NQ2gt7aZUF1Bjwo9TiPVBA0xGfxpITR79EZKsIZVzg2oHM%2BkBrM1%2FGGg7f82mE4PXdkqFbqgcorPWcs4ePG59hYRIf32QAr5cynxCQ3uLd%2B%2FojqWl94sRE7JAgLRQxKPOfHjsV0%2B7hjT7&X-Amz-Signature=c07cf032a805fb5f4d1db5e054f0cac8b6bfedd33f2d6a9d4078492d481b3d3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ORGNBLT%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwNMQDqcoFPg4xVA%2B68cB5n44fbjBrZU%2FD0mAYFZJYpgIhAMMTCbT83dX5Et2Z4cvoOtHxFocDIpsvF%2Froo9VE3WgXKv8DCGMQABoMNjM3NDIzMTgzODA1Igxqoxm0AMvID4fR8sAq3APGV2o05wXgWQkoZbKtVLLdL3HCN6oo9rVNAOCg%2Ba6MxVK9YZx5zIgJSKA9fI5T5ShKu%2FIRMXG%2BfM2%2Bwg9zCMtlBDrORg0KIBmoNE8GHhkNLEilSsmtq7lv%2FkMRU3OMTJbto1ESgoz0Y%2BQ4eIlQNRgQ37WVdb%2BlSd5lO%2F1gdjaD2559RLlqrds9Er0xhFeEIxoAQ%2FJNwHk17lzJodxvLL9IpUPB3YysDIhnzDfsIbuHulZUVgDf32eE0tgfkcZqAzicKRV4SKcb3AgEIgzAWjAsuwLfNOtOKb8u2CkhaHIr5MsBl9133WYe0yFIKI8%2Fa4AuEwRc2ETwQBmRZiVmsZ5U8AhDhLNNfo0jO00GecrsIbzYlE93CQPUPIVVOroDPbV%2B4lhCfeGoWQpMQjnNo3BH2lNvlkySkMsmhvMnohxhfX82V7620ElDAkDLdRjlbxib5ngSA5hki43p76SlUN6QAgL66ydj9np8juHvxtTx4iDRMdi3COnW55hP0Rzf4Rah6FYCmkLfmc1dy1RI4Jk92ZtPNXeJh8wckUuWRcQ%2BmXfjg3pVbzyOgWl4fFx%2Fv61ydpMu4rYex32Kt6oW8hhCJ4Kmnv1ZNxPsFeODA5XD1Yv8XfjWvt2ZOTa4ITDm1afPBjqkAdKgTTFxkOsXWZQ%2FtX8zfYzVHSlVXYb1LDnPaImY9%2FXsCclm3kDJid4QAvbeP1CdCOrN5Wp2cs10fBbpwa06%2F9BbzAUQuLdtAcThiCUlwheks7g1E6Y7S5QbK0UEX2szMPaEd8MRXYDnA1%2FpNWS0qCDihmC6DFR8KpN9Y4M%2BiWbKS6w66kKrueYejrdsW6inCdjM%2B2Yo1N4DLkvdFzXmot4ltmR%2B&X-Amz-Signature=e044158e15e790d08c9866dc1a600c926d5ea2b724ea844075f2e49e3bc31372&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIL55S77%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEjS1IbglZJXneCQlvHJo3s2GCVCJdnLzJX4zFciYOqLAiB2g2rlRZ9Fy0oNf73xuSIZqXsnoMLFW%2Fo5cF2HWZAXBir%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIM5l3s%2FbNJ6SAenqpXKtwDh%2FuTespB9OZNHRMoiAVnR%2FELsnPo7djbcpRIhxY3xx9zdHh3BOkBCElMreEn3M74%2FlYxbcGS6ObS6y8F476NavJxue0qIZSHKYVSTWWl74wzywF4DjbT1glOe08ZQo91J%2BM%2B70%2F5HKUHIbSrPrQ6sSuOAWwtyRdYgIXFBi3E81T%2B78ojOInXITwgvuR5laRSzx47AcvbL5U3Te3lU4BT7CP4PigE8EdK%2BOnkgjZ5X%2BwdDAu9JVCGX%2F1yNIKXcxKegE9R0Ahozdcg7eRS5vh41PUiQyBiKS3AyxpOFotYvpd4b1COxOlnNMIjsuV5VWzN%2Be%2BsuYU47498As21k6U3a%2FB%2B5tINxDGIa%2BpWwVt%2BzzlKLjw%2F4%2BSed0ETLbnccH6%2FH59wQOUvDyMRdq%2FajzaK376CXboMUSo1gqJ2S%2BuOCggzvwdDYrcAgjK0veuILilKSfbCpg9AHW%2BU6GosKPOwA7s651uXTovbANoUIBmX%2B%2FCzF7KBtV74dxnc%2FyCnBXfBn1VfIPheXNr9HF9Lh6b0iEJQUz2ZJkKzjbNJku%2FhZUVzyh%2BpVfaIE4o056Gndlrh5aZZyRq47b%2Bxz74kF09Ou278EcgTiq8GfidybZNvCQGeU693ZcZDeA7IrBcwidenzwY6pgGhMPRetUwM7O5PFtHeDtZ%2FslD8MsmrcM2ki4wdOzapzmwFwDoOSpe6ze4GUPFCWAsMtYv8rpRcggb%2FbCsOTZ3e9sWsUelE0k3%2FuWHT1RNxh6hJQikunfOLwpcJ2cwbL8hedGLRm4WOK4EwAzFPUPwRSzW%2B61Vn7iI9k6M8LRGmu2wvphkg58fidOCwUOoeZNUqr26Pi8K%2FZc4Ut3BZnVlpzkB36Vvt&X-Amz-Signature=c7ec3ffa877ba15016948ef507fc45dc49a2b1261e8f8fbc94f5dde4ada91381&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6BWU2C5%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDsqP5vsaGW9l%2FJpxvRmEJdIhyaX08FMBXx7lGjDjnqJwIhAKyRJRtPr2Byx%2FvJGDCWfA7R3pm6sTMG38xLpyV2THC2Kv8DCGMQABoMNjM3NDIzMTgzODA1Igy8yQTuY0uYXdOBswgq3ANU1h20zd78ACv2b1HNWqdypEaeWYTisj0kO9XXUX3voBe2IfArayb0nW9lBp7wKMhnmqTJiSi442dA%2Byilkn21%2Fmv69zsTiWzjKFTfdmj1d4nBJli0%2BG65b2lPCPoNYwKioJlSQpf%2FiYYhbC6RQsTtYUgO7q2WIA%2FongKYoqdgH%2BoM%2F9mht%2FHFj3%2FMTZ1bV5hUDuzRvim8uLaKJAuMkskKXI5yv%2Fq4Ijg60eK55YituzRRU5d9LHMswAiKsiPldqUW9ZozXYPIicuaU31qiw7%2BEa%2Bjx2KERRjnk%2BFfJR%2FersfT2XtmhIe3ZUN4oAWFThqTnqIHWcV7nQqmAUna%2BJXcT5ES3WNodlDFbYYYoFBRh%2B5S%2BBpB%2FvKHxtany9kBTtc0PfM3mOXqbq7gTkFjx0RwFLLOw%2F2%2Fmw%2BhO%2FPtSchHmAFkNK%2FIToRrvClpLWnXQyiP255ZvtKH5B4fY5t23B0sSSUE%2BTrjmIfZy9GahQOZrtKbFCwB8yomcCv7YDyEfKyDSS6%2FhI78hMMFkhi7iGhymLPnd1SHxOB%2FOjZne6cgLV2sdfwLw7vNI4hHj3F4c%2F9EpL3eBU60EesD5Rb5ebDIgy2hVfkQyk7nVpa8WZC4qU8GXxa1SabkXjoVGjDy1KfPBjqkAZUjHwJWhP2of1MqQxuKkgXMvkYjhhvJUV03Wy42nE4gvaM8xcbW4YS4dc%2F1erjMnhw8ejzwPDCx0jNfxgmhimr%2BXybBBN%2FCSiAyn4WAAECnh%2Bbe1H7ewPRoE76EKD%2FqnTjxu8zXxGbHjckZ%2B7eE91a5wqBW6D8EwiyLvBxncJQojeN2ts9Q%2BKVLqil0N223hegbOq1ga7jdl0DfLf0JI1oHoDWY&X-Amz-Signature=34bdea74f8c7948e06efe5af11095addc3444f18c484f496665121c5b8fb1bdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIIS6ZIX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZgnUMSOxUPAaWCEN7FsmuZcFWZqNgGJ3cfOT0XRX7YAIgNdPioZOj3%2Fu4INhpWwMg1k3z1nfeG9pX2Za0hv1Lkboq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDNJ7UyTJg%2F8u2lhhcircA89pwid6iHkkeaHTReJFef3gUeDrc4KQ5uJ0Suh6Cfyh%2F6nutd3h7x9eBikmlB5mXg7UzHVBC7A%2BDvt%2BRAz%2FH9eoZ7lIbWqozfdhnVSt%2Fx%2F4dj7KEERZOjQoQ1SCxekaoujhtpIsEIAwPlUg6vcnJnG2q3CCAQqcuOoVIhdwnMjr5019dumlVizyc1iVVFJvUu2iGvqbvRc0h%2BVkoIbiy5Qr8BHrT7jc7Pcgi5oyoY4tDrgqozykdSF6ewzUkip4XKry1dhHpRFw2303oJu%2FDWXvFhlh5bpYUyqy5ANncnAbELiuzk5mcJv2Ga7i6O3HxDUjtGdDo8U6qtcRU4uJ3tQcUZKtbrwGadEGuu3dQ1WZqhSq6ahetBWA5evBVNBfkMU4HmuOMObA38E6kFUJdrZxXWR962sUKvsLEK8ICjQqzzWglspyBkNHXyaEYZu4LLxb4WXXru1eI7Oyvvrl%2B90gaxx1k7NnTPUAIlWSmKOh5gtEXh8M8LroUQ7iauwMC6y6W%2BI%2Bp0vQNzmAbXPsRhftFF3JsCG12Mch%2Bqna4Qnw3Dns1jqiZEBCK7KbsjbX23ODfk1%2BFMWCqfQsoQdZ%2Flk4i%2Biq0k3mvyFw%2BAU8AFbEysrIRkG0rn7gg5UIMNLVp88GOqUBwZh6IhRf2pzG18juBI5wMvPpKd4%2FlIPLpcvBjnFgpcF8omAn2RhSuWo8gLKDxGNTxoFFY6iJD9FRagzsMM%2BN87697gBRJN3t6bho9%2Bo86yh4fP25KxZG7oc0AKS4oFOOc9ed%2BKH2QXreJbRqUxRK2TH1DFYR9pP1jQlMgR1onMQ7jyVr7nouoEbbpQHEtfxrjN1edxbVRR6iyfDUUOP9XWDoPQW5&X-Amz-Signature=446ae8355f6bc746b4dcea5626be77573f33020d9d14b2dc267f0bb8a866641e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIIS6ZIX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZgnUMSOxUPAaWCEN7FsmuZcFWZqNgGJ3cfOT0XRX7YAIgNdPioZOj3%2Fu4INhpWwMg1k3z1nfeG9pX2Za0hv1Lkboq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDNJ7UyTJg%2F8u2lhhcircA89pwid6iHkkeaHTReJFef3gUeDrc4KQ5uJ0Suh6Cfyh%2F6nutd3h7x9eBikmlB5mXg7UzHVBC7A%2BDvt%2BRAz%2FH9eoZ7lIbWqozfdhnVSt%2Fx%2F4dj7KEERZOjQoQ1SCxekaoujhtpIsEIAwPlUg6vcnJnG2q3CCAQqcuOoVIhdwnMjr5019dumlVizyc1iVVFJvUu2iGvqbvRc0h%2BVkoIbiy5Qr8BHrT7jc7Pcgi5oyoY4tDrgqozykdSF6ewzUkip4XKry1dhHpRFw2303oJu%2FDWXvFhlh5bpYUyqy5ANncnAbELiuzk5mcJv2Ga7i6O3HxDUjtGdDo8U6qtcRU4uJ3tQcUZKtbrwGadEGuu3dQ1WZqhSq6ahetBWA5evBVNBfkMU4HmuOMObA38E6kFUJdrZxXWR962sUKvsLEK8ICjQqzzWglspyBkNHXyaEYZu4LLxb4WXXru1eI7Oyvvrl%2B90gaxx1k7NnTPUAIlWSmKOh5gtEXh8M8LroUQ7iauwMC6y6W%2BI%2Bp0vQNzmAbXPsRhftFF3JsCG12Mch%2Bqna4Qnw3Dns1jqiZEBCK7KbsjbX23ODfk1%2BFMWCqfQsoQdZ%2Flk4i%2Biq0k3mvyFw%2BAU8AFbEysrIRkG0rn7gg5UIMNLVp88GOqUBwZh6IhRf2pzG18juBI5wMvPpKd4%2FlIPLpcvBjnFgpcF8omAn2RhSuWo8gLKDxGNTxoFFY6iJD9FRagzsMM%2BN87697gBRJN3t6bho9%2Bo86yh4fP25KxZG7oc0AKS4oFOOc9ed%2BKH2QXreJbRqUxRK2TH1DFYR9pP1jQlMgR1onMQ7jyVr7nouoEbbpQHEtfxrjN1edxbVRR6iyfDUUOP9XWDoPQW5&X-Amz-Signature=a51ae6a9d8b0adecaa5ea788f490ca1306380e729660ae356dde83ddb1b3fb0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPHDZZTU%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAzZBb6A2%2FK90yGjMw%2B54hTStVp4%2F1OHVs6Sxh3dANLpAiB%2FuUJ1Z%2Bn7gUxcSsKUZ66r0RpQFpSf0lbYG65yD1XrQCr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMaG5XvHQ1tFoPRJTLKtwDVkTa0qyKYblsJpHV2AI8e8x1KsEsj%2F34aRKL9NqjUREyIuFCEyCznaELHAcuZYc8%2BL3CqsIno5TgmssXxpWBDYJpPK9i88r3ZSiICZIPL4vGPWS4x3auuIFWuuByK6%2FTpJDIyWQd95GA4Zkz8T8XriIbs5A5d6POnBDJzSZK9EbASWGCttCWv5eRtLDK1F0kGFXdh1afNS%2BEGdyzOgsyS5azgN1IghVvcs9SagP1mRTPG7jclR4np5sgK1O2%2BnZaHLJLJaJB1jN8VareHn1IaohyBh5jhFqouRDScvRHnYNN0ZhvUynXzSkSljS8oJ5oDWlTsywueOv2b%2FQt%2FWN%2FZ%2B0k2UYgPss3YTyAPm5TgrLlL1foeB%2FXWcba8uG8zKZKBd2qmnCNRO3XekF56670sgKwzk64h2JoTkKPJ6VuOVkQV%2F%2BLILfw5BzukfkmeT0aGvnuaEXeIQW715GntGtkPFzPWpOVpy1ahYSGpsG8CjFAcwTwBXlH0q5HEk09kqvfymg%2BnMq00W%2FxEwmPNQIQUpNrBiopfd2gBdbUBsNa3IrMlMxBWiVopdLyuC2%2FxHquUnmLtNeQ%2FDt09YKJRTP3yUkBVQHl%2FpoSWhjp6UIZPoCLczlt%2B1UR2MHVF%2FMw59SnzwY6pgHR1I9Au3REc0fIildUPMUJEmgMykQ9Tb6sah%2Fka%2B5FAZRvnO4WkKGAzDOPcyd9cpVEsrRgrzsfsmHxM0Beq3tPtw3KA5tfIfsDjXqSaPlsYxktniLu831m%2BlkZWrzpNYiivAw4M8svrYWCq8cvfYunZ3YEEAvvWf8gdrapObnXQJiUPydIXtPIl0YGbraHZiGgJOqBcXMI%2FVZV4%2F%2FYm5%2FB72KgP88f&X-Amz-Signature=c9c21ffb65720a8c05d41c3a25e8b214735091749634192f07d5bc8cb22998eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCK22BKM%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCp9Xmad70L1ijQblLdSQxe2DnwzxXxa9N5FOt9B21QGwIgB%2FdMHk64%2BSSchDA4ZtD%2FDSpNVVg%2BDm0lPVBNe8fwsdsq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDBCRSqJOUl1Fo6kb3yrcA1Vt9FAjkevZfZ%2BOPxJQZFR0oD7AC1am1YdpE5QlOPvxqxISQxtzfTNdzKzKzg%2BCpu9KHwgJMaoK9fV70a7%2BBbcsWXxJYU4nSlA3dol%2FiIFThrzfC9P%2BR14W6umQoSMR0z0bKpoloHJ3jASE2ZrrCaCO9QXX5zR3a9oVfPuq%2Fj8rrvp3CqbxLK%2B45QM%2FV3el4taUhO0hgKL0AsquaMwS7cx65rZNt0hwpZAJ4h1fYe8RKBDMGVs4001k4T7jsBtN1Pc7NPn5LXB8%2BIM54BGWj7O07sFi0nHxoEGx784hwpDMMWXUmexdjcGfwUlO9wDPQErMt43wVMvVl2UoVqCk%2BlzcCtjyjAe494l00RIVcWKWyLU97KA8sx%2FBY7OJu4GJg%2FCU5%2Bo3YznN1%2Fxgfpk%2F7c7hqczMI9sFyUipL%2F3fzQmjiuudM%2F%2BaUWde%2FoblSCrVQjo8%2B0bDTuomSA9Gnv09xIn236zsQrza3xV317%2FPJyaQs7gWp4rNynEHNoVdaoGvw4xNiJ7B%2BJ8RNJnryHPS4Cv9i3yUZ2T3Ik6MVweNf9RTDH9SodBRTW5wMeZhp%2FYM08SWYFNweG%2BTFQ09a2KFYLZrhdJKwnXpjr5TQMBqAHqMrzyOqg2Yc4KuT1RhMPPUp88GOqUBwD95%2Fhi1I9EultKgH8QsS7onuSUIil%2BVGKDh4lzxF8pgow%2FIfDwxLUaHnwxDjNRcxVoGgqvoN%2F%2FI4kiAmfbM6MAtUmG6fOwxGjgmU%2B5d%2FtV92lnpVtUcvzO0DXRQtzrneAfQ2fgcO54xqUcFk1neu1f5RRAL9CuDmkHTQipy1aV6quCXJLbTDqdHpSFh6QlG346PvRNT%2ByuGLVLnHKCSpdjJXd53&X-Amz-Signature=1dbfbebd202aef16098ffd61e622db5871f24cdcb42b902b9f5d71acfdcf6017&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCK22BKM%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCp9Xmad70L1ijQblLdSQxe2DnwzxXxa9N5FOt9B21QGwIgB%2FdMHk64%2BSSchDA4ZtD%2FDSpNVVg%2BDm0lPVBNe8fwsdsq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDBCRSqJOUl1Fo6kb3yrcA1Vt9FAjkevZfZ%2BOPxJQZFR0oD7AC1am1YdpE5QlOPvxqxISQxtzfTNdzKzKzg%2BCpu9KHwgJMaoK9fV70a7%2BBbcsWXxJYU4nSlA3dol%2FiIFThrzfC9P%2BR14W6umQoSMR0z0bKpoloHJ3jASE2ZrrCaCO9QXX5zR3a9oVfPuq%2Fj8rrvp3CqbxLK%2B45QM%2FV3el4taUhO0hgKL0AsquaMwS7cx65rZNt0hwpZAJ4h1fYe8RKBDMGVs4001k4T7jsBtN1Pc7NPn5LXB8%2BIM54BGWj7O07sFi0nHxoEGx784hwpDMMWXUmexdjcGfwUlO9wDPQErMt43wVMvVl2UoVqCk%2BlzcCtjyjAe494l00RIVcWKWyLU97KA8sx%2FBY7OJu4GJg%2FCU5%2Bo3YznN1%2Fxgfpk%2F7c7hqczMI9sFyUipL%2F3fzQmjiuudM%2F%2BaUWde%2FoblSCrVQjo8%2B0bDTuomSA9Gnv09xIn236zsQrza3xV317%2FPJyaQs7gWp4rNynEHNoVdaoGvw4xNiJ7B%2BJ8RNJnryHPS4Cv9i3yUZ2T3Ik6MVweNf9RTDH9SodBRTW5wMeZhp%2FYM08SWYFNweG%2BTFQ09a2KFYLZrhdJKwnXpjr5TQMBqAHqMrzyOqg2Yc4KuT1RhMPPUp88GOqUBwD95%2Fhi1I9EultKgH8QsS7onuSUIil%2BVGKDh4lzxF8pgow%2FIfDwxLUaHnwxDjNRcxVoGgqvoN%2F%2FI4kiAmfbM6MAtUmG6fOwxGjgmU%2B5d%2FtV92lnpVtUcvzO0DXRQtzrneAfQ2fgcO54xqUcFk1neu1f5RRAL9CuDmkHTQipy1aV6quCXJLbTDqdHpSFh6QlG346PvRNT%2ByuGLVLnHKCSpdjJXd53&X-Amz-Signature=1dbfbebd202aef16098ffd61e622db5871f24cdcb42b902b9f5d71acfdcf6017&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QKLDDWV%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T101033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGYraUi8OLkuFJ3yqE3hGep1Z%2F1Aj%2FheJPEwaea96a09AiEAipT3TfOneqS4XPqwaO95z26RX%2F0vu%2BLmCIixwue8ggoq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDGuvtUc2O9QEhc4BQircA56pO7SfORCGBkRWvjDlkKdQDrck0Z%2F%2Fr4GfIP7UPRBMzxIKS5iEwyVB%2Booh8JpAhgREAa0xfX2uPPfUyLpTDjYbEa4u05Ixtuy2GpOoC7VIslOp1Xe5pFxoIWVmZhak%2FTbO2H91TS89oSQtYV2Mf06PBuHgHF8mQIWcLht4xu5gqq0IIc6MEZELdi0a3yadBny%2BFYfS%2B%2Bw5iPohun0lz1k8gy98X3in4tcNkriQyCg4z0GwDTjsjt76X4imfkwe5NQzEXK1NWHoO9aMtgRIQ2zJJouj30Tx7gZOS5y9BaCftG6KK9YX8fWXbUItgc6cN40lgXkknPbD2PUR5GZWHYfjaVpUWDA015fuCgcWqIOg%2BPSvShhb8TlFJYsXRUh8YQlgN4uyq%2FV%2FZo0YAmrFImIXvj9qdUFpYSkif9gLdECjHQipO6tqQl3ZTEohXQGaFfWAEZ3yhttj5ITCI%2BmODWHQuFAObGghZRTf7D72quGmhIBydwjWkI0X3oDFv4JJyTgcyAUjhRvpXo7wbPBqfJ%2B%2FiszKquX6cdd3EJw61u%2Bc9bP6P7PXVEaRiiYAy5YdxQOCYGrk%2BjrJc7r6piY3x5BleMMWqrqkdt5jDxNnzftE%2ByYdHovK%2BhYIZ41sMInXp88GOqUBRvibKEQxPhntVsJ4r5BB8H1JswLdaKGbn48itGSeE8akMct93%2BrbhwAr7C9X2yXKiWM%2B3Mtvs7zl3JM1C8NpSf7N8dyGLgzc4qLNqfSdXo03PWoydTSG9HxbjQdPsE6QueLpG7mGe3vdxdAa8rRt8BBN%2Fj1KZiZ0%2BH7A2aWHB16k1zdjKQH7712y1nIbdYIYosH0T6WVeMkPOosZkzEvkjirZwZs&X-Amz-Signature=e4e722778c66251fcd0665069369771dd71963e73a7e3af105b428064bebe051&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

