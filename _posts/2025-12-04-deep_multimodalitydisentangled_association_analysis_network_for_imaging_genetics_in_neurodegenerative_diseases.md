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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623WQTNH2%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFmOYh7cszO51nRFx2w0NIjXaq%2FU2JrW1ygoC05O54F3AiEAwrpNiJfQ1UfD1Og3HYZQD%2Bo%2Bi5t5zjaA46IsTSd5kZQq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDAmxHkX0%2BIvCPsgKbSrcA%2BC5DhfHFj3gyx7MlOe3gE7G4abzNJMfqxtxQyPXpAI43MjWMSzo5T0n8J8wXoTGk6fCkeU7i4MF%2BGqoZw1OL609J5vlEJvR0pQF51kgl54Vq87L5XnqMrvrptiPVTrKYBgCMtsy3j7AuhZZUnjDcwjZGKTMU%2BnG8xxjVxdsfbkXtfLROs%2FPxwWRIAiUzDurp7HBGgGcuR03MaZWNuuWZiTlnJC1U4os8aicYE375kNLgGorv10IHXEZd9YfhJqcSxoLhuhzjE97sas55Ox8eUPyWppPrSdvZc1LeCxhq80VdMEl9F%2BPuvqgDnsWkIGIm96rg0HfZL6uAxckJblwj2ivEouqG5z5b%2F3UpllohjuDXbxwWsMfnvxHfZkvaQdXltMrpEw8J0ehSmCS2NDw93uiGJYKb0B91298j6WWrS2t6NYDPbAGTDaMloHpM3JkN7sHgYkcOvoVP7e3wOW7A8t2IrldBSQdkKen865oULX8brr64jAZGJVXqaGPFCbdLHgBPTTWxtLM172yZs829yysT9QKOaYudnisN2I5CLXZn2RPEQg1SUJ0EeE88FeoDk2amo7ehlUJs2YrOV43siQEjd%2F026Yc9v2DPfSCegNms8qIkriwQN4Rw4%2FfMLq2o88GOqUBCd3%2BiFRSuhb14r1muc7Q2qKZ7xdXRBwzmahJOTcA0wsxqKIifJhQdYl51kBRJ6NxbMKD5Q0bDJWnxfyXbbqA8rZUj%2FeZa92F5JfGm2JS2BA5X8xM4v2nl0nS6hakaZ4mhK9Kym%2FGriWSE1aJJ%2FHQcj0ZyDiu8ncwnFN0Bd1trL%2BwsXEV3r8QpPJcrhAfvwNcYeKqFKuHDaH3%2BFOquJlyTnNPLATp&X-Amz-Signature=dca336fc7f5060773e463243bded72ccc1d1b55cfa7163c83f777ab022f9e3b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623WQTNH2%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFmOYh7cszO51nRFx2w0NIjXaq%2FU2JrW1ygoC05O54F3AiEAwrpNiJfQ1UfD1Og3HYZQD%2Bo%2Bi5t5zjaA46IsTSd5kZQq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDAmxHkX0%2BIvCPsgKbSrcA%2BC5DhfHFj3gyx7MlOe3gE7G4abzNJMfqxtxQyPXpAI43MjWMSzo5T0n8J8wXoTGk6fCkeU7i4MF%2BGqoZw1OL609J5vlEJvR0pQF51kgl54Vq87L5XnqMrvrptiPVTrKYBgCMtsy3j7AuhZZUnjDcwjZGKTMU%2BnG8xxjVxdsfbkXtfLROs%2FPxwWRIAiUzDurp7HBGgGcuR03MaZWNuuWZiTlnJC1U4os8aicYE375kNLgGorv10IHXEZd9YfhJqcSxoLhuhzjE97sas55Ox8eUPyWppPrSdvZc1LeCxhq80VdMEl9F%2BPuvqgDnsWkIGIm96rg0HfZL6uAxckJblwj2ivEouqG5z5b%2F3UpllohjuDXbxwWsMfnvxHfZkvaQdXltMrpEw8J0ehSmCS2NDw93uiGJYKb0B91298j6WWrS2t6NYDPbAGTDaMloHpM3JkN7sHgYkcOvoVP7e3wOW7A8t2IrldBSQdkKen865oULX8brr64jAZGJVXqaGPFCbdLHgBPTTWxtLM172yZs829yysT9QKOaYudnisN2I5CLXZn2RPEQg1SUJ0EeE88FeoDk2amo7ehlUJs2YrOV43siQEjd%2F026Yc9v2DPfSCegNms8qIkriwQN4Rw4%2FfMLq2o88GOqUBCd3%2BiFRSuhb14r1muc7Q2qKZ7xdXRBwzmahJOTcA0wsxqKIifJhQdYl51kBRJ6NxbMKD5Q0bDJWnxfyXbbqA8rZUj%2FeZa92F5JfGm2JS2BA5X8xM4v2nl0nS6hakaZ4mhK9Kym%2FGriWSE1aJJ%2FHQcj0ZyDiu8ncwnFN0Bd1trL%2BwsXEV3r8QpPJcrhAfvwNcYeKqFKuHDaH3%2BFOquJlyTnNPLATp&X-Amz-Signature=dca336fc7f5060773e463243bded72ccc1d1b55cfa7163c83f777ab022f9e3b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XL3YLSPA%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDuJHj0j4wf%2B6kDQw%2Bcx5T%2F4vv9XJ1Rn2NPB7XmsG6M9wIhAOso0xZ%2BfQCTwr6JWbwTNEH0J877sft5%2BhhOAN3XWyXOKv8DCE8QABoMNjM3NDIzMTgzODA1IgzaR66p0MBpWvliLukq3AN0BcgrbZZanjD6DQWCxM%2FK9UxDBUak4jNxoHo0mkeGWMNZVpOTn1az4Zx32nRWMkoeBWT6K3t1B4sCmatE9uJRBGBbG0L31X4zleoNS2syRtowy9Vss3cZF5XleDz%2BPHJevxM6C8JllEpiDtUzBH91EyPha8QE74On7mBdFHqxopxUOMkowE2Co%2B6nZAk10OpyoTMh3dwLG009XVPiOn9QNRHCYSRzRDOkC3Sfi1Dd3X4YebnoNO5YCewyYq6jI4yLNf4VKp%2FjB4H5Vt08by1XcGq45uuwVi0sWApGWCs5cd2hCoGGhNcHCugO6ra46jDTQ04TR0AnYpVUZg8BBlP0X625UXzInMwGPh31dOmwpbn%2FMu%2BkXVK8OS450cvsnez0yfrGVNn3u0zX5bJlfmhORYnidsp%2F2HYuCMHeWq6w7rtK94PELAH09%2Fxct3M4RB93m48EhPa%2FCUlY0hdJot9%2Ba88xSkII5s%2B9vVzAQ7l%2BcG%2FF7zg7Ogh00U6vKJtm9P1NjxUG7eQMLhe97wq4aOqsmBnSLjvyvvpjz6xcP0kP70se%2BpIhIADrvFkHr5%2FYQtDiGkamxrjCkYW2wdUvqfdG%2BOHRPZ6fxWM5cmWp0UQb7kLM8jqRkPgSrsG3ZzCNtKPPBjqkAQPEMWkH5Qs1Br5%2F6hjbI4gB77zW1ZqrKfPqKPu80IfGMQMEvHuRnMqAXVsYDAgfsUvCZKBF9qj6NKiczGn%2FLHmLxky9wtJUTtpUIr3MUU2C4XCAPLPzO%2FDSo0ELdJ0gzhJj4ZV0%2BFkX9IG2E3QsTomD3lF%2F0IYXT2vjuxM5sUIb0EAbwjWyBDUaYPh7j04TYqknUIUOeUNlzGIa6yWM4BWRZnP%2F&X-Amz-Signature=4204fcab0e8b1486da58bb0a2992e02f98914000f10196b859cb3abd2d88fb8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VCMJHFW%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCH2qkhlh06Xgbl5hPJUBTjeT68aucojEJ8CzMUER8mPQCIDMKH78gbEAEFwBWNsEeLOU2YQpzdHplTMYrZy8b4XIYKv8DCFAQABoMNjM3NDIzMTgzODA1IgyR%2F0Xo7%2BodKQp13skq3ANVEWgL5Yyr7sUDqWPLbnpoN9SNm9%2BxGSHEajadenPlDyo9UozDcnFMdhG%2FOgBpmrH84iYveuNKgPt8XjlaMhwpHK2OiUJOa4ssvmDWj590fqBiMnFf7wH0IDy9DnzjOJLGn%2BfsS6Jnu2sYFzgJMpQK0vIfKURQOiTsZyPOPgMSrwfZZqAh4f4SsQXXz%2FqGKfBVVAdFfoQt%2BuYJIk5edKbNt373qHfAJKPCwbGRO3JbQUoosfDLIMoHJwFpY7NUqi1ZFDKtsd2ahzZ2NnjCkdukuqkDGDGz7maxvg3q48unilGahOCP3jStysWdV2SBzBxYZ1aVeNsUYyQ%2FSSWqu8Arbkehc4NooHPulUqJY%2F8IfU%2BdViWe3KfJeqi7mPC2gxe%2BaaUpAmkEdb%2FIKzfdMbOtrHYE7c2oj%2Fmjax0Uu06BgHQsDkwpxVA79baZxAPC6ncpyz9%2F3iO1IbDWFxJ%2BFwOW92LByvKHaw%2BhRBzNOOzD3DgO7uEtqzvhgtxN3ZzSEouyoFrobbiVcs8476yiaLEV0Wq79EFD4k4fX7E8NijlgX6DRlOf51siUXPQrr64bQQom8%2BbbPCQKRWXmZEMxSBJojxnSXTMaNT6DVkdH%2FQvILPbEOoP1M3iDo6zGDCwz6PPBjqnAegty%2Bey%2B%2FnCI9RxbW%2F0nFU1hpkYxKIWJQ%2BJD708CP6DHK7KU71u4VIw%2BQ17BYgh6ok0273U40PZ3vTLSwHyoumNWEcSh2608beiw%2Bvat2FrY%2F7JSN40ix94mP39VMdgJ5NXqciXc04kdFl3XO0qHyHrMRRJi7EigYsLMZhHwzgDCRfsGYP2e2rAylG0w7j00fQSqWCpoB6GR4DGKk5xXNu4uRqEy2I%2F&X-Amz-Signature=647f7408f677fda44381977a64ed59c634b2fcf74749f43f11ff451059995835&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VCMJHFW%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCH2qkhlh06Xgbl5hPJUBTjeT68aucojEJ8CzMUER8mPQCIDMKH78gbEAEFwBWNsEeLOU2YQpzdHplTMYrZy8b4XIYKv8DCFAQABoMNjM3NDIzMTgzODA1IgyR%2F0Xo7%2BodKQp13skq3ANVEWgL5Yyr7sUDqWPLbnpoN9SNm9%2BxGSHEajadenPlDyo9UozDcnFMdhG%2FOgBpmrH84iYveuNKgPt8XjlaMhwpHK2OiUJOa4ssvmDWj590fqBiMnFf7wH0IDy9DnzjOJLGn%2BfsS6Jnu2sYFzgJMpQK0vIfKURQOiTsZyPOPgMSrwfZZqAh4f4SsQXXz%2FqGKfBVVAdFfoQt%2BuYJIk5edKbNt373qHfAJKPCwbGRO3JbQUoosfDLIMoHJwFpY7NUqi1ZFDKtsd2ahzZ2NnjCkdukuqkDGDGz7maxvg3q48unilGahOCP3jStysWdV2SBzBxYZ1aVeNsUYyQ%2FSSWqu8Arbkehc4NooHPulUqJY%2F8IfU%2BdViWe3KfJeqi7mPC2gxe%2BaaUpAmkEdb%2FIKzfdMbOtrHYE7c2oj%2Fmjax0Uu06BgHQsDkwpxVA79baZxAPC6ncpyz9%2F3iO1IbDWFxJ%2BFwOW92LByvKHaw%2BhRBzNOOzD3DgO7uEtqzvhgtxN3ZzSEouyoFrobbiVcs8476yiaLEV0Wq79EFD4k4fX7E8NijlgX6DRlOf51siUXPQrr64bQQom8%2BbbPCQKRWXmZEMxSBJojxnSXTMaNT6DVkdH%2FQvILPbEOoP1M3iDo6zGDCwz6PPBjqnAegty%2Bey%2B%2FnCI9RxbW%2F0nFU1hpkYxKIWJQ%2BJD708CP6DHK7KU71u4VIw%2BQ17BYgh6ok0273U40PZ3vTLSwHyoumNWEcSh2608beiw%2Bvat2FrY%2F7JSN40ix94mP39VMdgJ5NXqciXc04kdFl3XO0qHyHrMRRJi7EigYsLMZhHwzgDCRfsGYP2e2rAylG0w7j00fQSqWCpoB6GR4DGKk5xXNu4uRqEy2I%2F&X-Amz-Signature=07deb5ef07bb71aad9638bcf620525ef319004731c5b45ca84eedbe8d5785adc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDTB5SA7%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGAqsuPysuzHaOX4u6v5DwkmlNENIUYFMP5ghNnToCYfAiBFx127OK3uHI6HX%2BteWCxZYJbOHVSn2s71LEqDwMfWrCr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMwqxWNfx%2FHLo%2BFxdEKtwDJbJm5tQfhRM85SgosM85gZHQtrocBsDigC51PaTV6LyO5KGbuPWJ5urVho2knVPlaNBP3kwi5HBnWFHuZTYdo89PDV8Cke51t1owd1MTkQsv8J0Hyl1aFr310q61yS89yH%2BJWxf0jvsFN4PtElzLHF1TNEzR4X%2BSNhood3%2Blp8hF7A2Jk0T%2FRJM%2BFCNFIqPU3j4WaL40Q8OvJs9Lyr%2B1avsRd6LH%2Bnl%2FsdQx8035V3WNJhBCYlwJ6Vl5MYzA1nk4p3MsmEE0OCNs%2BxQtGPJi3brnYiaDZBARN8zoZVgvooyrANVtqfQBl3YwBSlCgxfpAHgkiCLsC96eLICpTEFV%2FnaOQuYA1yguFgx6Knm9kEuCyTrkKdoyRFINx6qaoZ%2FpoWQLOKhwQXiimT6zm68RuH1l1d9zyrR2OorSDvWFa%2B%2FeR5hv4zGxG08oPBE2J1meJUnT%2F0QC5B5qzYr%2BGwAjGx6gwjqIBzKTAup5BytEB4imjeRvvIo6craLYcVowns42Z47t2P%2BKiikefNGQmm2OVsHBktrPPgqmZEs9fNm52dLPkgLKaLXxTpz3Bk5TaUfWQtEia6jb%2FxnKkdmb1Dvrz701VMO%2FArE4zNKkT0%2FZ2tkg35O54PWbc%2B%2FpcYwtbOjzwY6pgFhB9VWCYyN%2FJhUxYZCYsW1jfFKEtiwau%2B%2FMPJn2NjraH3Lsb6rMnaiq64baT6ibfdq98D4OXjuzK5h4CRl0sI5vUzY5Cyvrzdd6X6jKjuL7ad6WdJTXpM2IqPn7FqFMulU61h3Ut65%2FO0La4CV1qYZDgOSx8EgX8em5duieTiINvf8H46oHuMGavOgtNfxEgIzem85ZAKX3i2hInjq880UvywGRGvB&X-Amz-Signature=97e91bb2be1d3a53cf853e039c02afaa6433ee23fc34505a4a863c128fc1be2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I42R5QA%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2BSy4xinVkLB5in4uwFaaONbALhx4RsMyTQtmF9vxxnAiBx6hxDepvEVv0RsWXCB6wnbtFSeHn3PrEt0kbAyXFVTSr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMykINaTobHIKBvgZFKtwDM5TDnM7REkjjgyozhBiOrIQVvH%2BWUPoqmG%2BEl%2BCbTR0dwhY8daREWqsk%2F5VIcN4xeAEH4rrEL7fut%2BdHUgdOgLoCYB1zLydfD%2BQ%2BfTbWLhybRUenAKUR47C8oXftq%2FQfy5xBT4x%2BHf5RNFxCJ9j%2Bje5Ca45ja0B2DH349CJy%2Bqt9IFEbHsNZECNoD%2BzrUfo310vjzmfT6VUTcXurBy04sXwMfaDR7B4EtuQTShp0aRYwIXIeQgKwtXxxcbLaaEGwSayQiDvx03nJ6RdA13Opf0%2BbvgDl5KtXjD3X%2FnidCaCaOJmviV9YJRomKJzfqlmjuJzjPz6o4OQ213HM5hmHFIE0Sz10HRDM6Rnjcl3RIe3t%2F0%2FhacrYVwzz8d7GwHzmKoawcdeIB3X4LDeTYORwwj4MZyJhSdwYZiijQ7FAJaaEG6vM%2B8poofUqmz%2B8Y88FT5m6rtRBNQFngfK7M76B7wLpGA%2FTgqKc%2FGt3Y0KxiLD%2BZc2%2Bbwm2bK6f4TKnpf%2FyZDHpv8Hr8%2BDFZpib2wFBEX0aYvVD8pW34d1t7KpPhZ9r4j1YnDbPbgVD2CbQHM8nk6gU6gWZNXQBV%2FRxtLco416Hg1FlYANSnKdzR7egfUUXeoQMLL05cf3xxSowyrOjzwY6pgEfgKMYTJu6LgW7xAcG6wqz6Z0YzHTP0lyHne%2FJcDhgJ56ftv8ukmFgr2BQY%2B%2BEgG3abtJGRNKvQKprYDOAlaNIECRPnHOkwRGjBvn6HE6fJQbPxQxyJNaM1MAkfL2%2Ffv%2B1Cvjcmrlq5P5iWYv52L4vcJOkdEkuifcWYUvO%2BN6SbJf%2BMOF0nw7xoyJJTIzudBBiD8hsB1SWUHWh%2BPOSzrCVP15s42Ku&X-Amz-Signature=07fc5dc4b5d44238714d17394b93df03c69b2ab76a9fbb311f2de7d3590ecbcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B26U3U7%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICMcHU6X5oN2f%2BwSRDgcHyvReQc21yLxqzlyVIgyEmr0AiBFLK7aLVQ616pnHKhlEU4lGTOneYd6XC%2FGqBGw3gFCrir%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMsMjfRI8R9h5RWbW4KtwDw%2F8KOav7XgBrEn4DtGR0HHExsx8TIF3On6m8LFhN4N5F%2BUmElNT%2FF5pnT2HU9q7nLVD1aEf4LJnEQP1Mnn0cJ6Uju5BfdfngUcEhBK7BiQnLTp5i%2F0G1VvfwQHzaGUbyR4E2wKmjk7rjf2Y1MVVwOTSnljbIIf1Il%2FM6R5pqhYsK9PyGYADOrCCMaUJq7q%2FEmJ9ytpB%2FfheBziCv77fQ2ARUzruWmETO9QWNoipUl5AHNmcjb3Yq6qxDg%2FROIALRfVoO6ZT0VkebWAmpvHxJ4Rgk%2Fa1bKv4JIgu2zUDBBTNhFLW%2FZ0Wgapzf2m7TgO%2BwMT4PD0MQEyPTLzJYuZK3CAz0pnCKrlTsyDPHvJeqMmzW6XWNrU4ySPgEpfBQP9wEgGPdZJMle9P6eLT%2FyvYN%2BQ6HtZewMHJ6dPslcMH0PZlyEeeFWSmonQyPqZhB1XnEaZoNIpEmAbcJUjJ1chOqK33bEpR2bChiNTJMLyUrje4xJAKf6fU9fp8%2B1rIrmont3pYt3E67dHaHX3c0ObK4suRGYfWM85dY7m95aUniq6hOmkNwyKk%2FRrjcFtjY6nKKLSJbEsh324Rd3GH3uAQrDSqEGQ8SXrhQdjx6tMm1mdoFqEZ1Aq4QN4NpgtAw%2FbWjzwY6pgHNCcUoxOvy5yArYPnK9zN8Eh4KnPzzPidgG7Gz4WmQ1bf2P42WD2Xd6r8IrEtxRwYgD7%2BIIxsJ37BOgGTX%2Bfz6XsoKQsEjxEZGcO%2FSjnbzQGCo%2F0FKD3CW1V3NJLPuHVaTu8tYkT3fCDiYjoPvdQCrQibcoMFETTWd5HKzKx30KRC1BBAKxxavaIVcy1X2Mr2krwJRZVCMqGAybTTfjxgh%2BVS9R%2FM6&X-Amz-Signature=fddba0e49892d9fe1664aaaf7e85e02584bbe475eaa9a9558d91ccf2081ff296&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UT2HV4PE%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDW17KBH3StWFVMzZynvdyKlHJDQ0b967s16N3YC626TAIgFt5GDHk8g7DwkLAEfypIcSl0SchRgspTUW0%2BVoM%2B55oq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDPJ5WZb5WHWGZFc0eCrcA%2FC6rXN1etC7MF5JJDejNFcqWw04p9gwf%2B8d9V0zrlKvYkuaNXfNbGRJi%2F%2F4uPzz6jiIATMUzFb58YLy1UrjSKg0v59hT3rEqLESDkacs4TdHnMqgeXiiCDi8Tpq2liTb6WdtV6ZRW%2FE4eGyNCrTJcMJK3xMpjJGhFyqtK1UubuseJbDlfdT2uh9fLJVrOiKS0LYOURMwEJwy3Pxfg%2BlJP6dF2QlvNMxIzaPYvyeh%2FlsgHyQlKHOfxPKdVylQ29jMQdNDfyEQ2CpXHe2TPZAjfPIb2nVFzFTniLMVcvoSGMD%2Bs8civqdTNo2F5BA%2FqyUbQ6PUWE9q5vr6NxUKY73BOV%2B6I70z%2BJ0J0CaBnhazfbyziiMPKfL7BDZMBq1Ar1NaCSYlbiUrKTQQg3%2FM%2FMuKdlNEWVxm0bpiRHnaTuJtdfgXnpCF2%2BBfcKlahDM%2B9DiO8fdS5k03I3h5IyD3keRwCZhS%2BUTstLqC39Bnx9dE1XUzUHWFzemdJ8IvlL0OBzdOksceOUIkna8ju4gyBxPQz15Yjqu28H3GI26hEnoV8bvq8XFV4rEZp4QJvyE9cgC8uATtja4yOYJvZGt5f1t2vodhI2k5ll7th7j4qLXk0%2Bmsck7AGUewLBBVJ1jMJS2o88GOqUBOXuapn5OOxAq3YAWxAkQqOQnJYB3cm1ueGF5BDjCf0LnbQg9X2NdF2a7ArTCdI1AAD0Jl6pxwdjM18iSvWmnlwZTXtGyf%2Fc4lGUobdbXoeUXt6LYEb09RbTatrtrCSGsQSmJDZZrUjTkvlBbVgOXrxJIoVIHogxUvexqN3M5l5PAy2tDe9BUXvc2whzurDIQmTso%2BS6TBnqIVvnw832nPwfxRERg&X-Amz-Signature=47cd9926866f2ae60988ba0f306e8d8ebf454b18430c937b573634c6d5138cf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UT2HV4PE%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDW17KBH3StWFVMzZynvdyKlHJDQ0b967s16N3YC626TAIgFt5GDHk8g7DwkLAEfypIcSl0SchRgspTUW0%2BVoM%2B55oq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDPJ5WZb5WHWGZFc0eCrcA%2FC6rXN1etC7MF5JJDejNFcqWw04p9gwf%2B8d9V0zrlKvYkuaNXfNbGRJi%2F%2F4uPzz6jiIATMUzFb58YLy1UrjSKg0v59hT3rEqLESDkacs4TdHnMqgeXiiCDi8Tpq2liTb6WdtV6ZRW%2FE4eGyNCrTJcMJK3xMpjJGhFyqtK1UubuseJbDlfdT2uh9fLJVrOiKS0LYOURMwEJwy3Pxfg%2BlJP6dF2QlvNMxIzaPYvyeh%2FlsgHyQlKHOfxPKdVylQ29jMQdNDfyEQ2CpXHe2TPZAjfPIb2nVFzFTniLMVcvoSGMD%2Bs8civqdTNo2F5BA%2FqyUbQ6PUWE9q5vr6NxUKY73BOV%2B6I70z%2BJ0J0CaBnhazfbyziiMPKfL7BDZMBq1Ar1NaCSYlbiUrKTQQg3%2FM%2FMuKdlNEWVxm0bpiRHnaTuJtdfgXnpCF2%2BBfcKlahDM%2B9DiO8fdS5k03I3h5IyD3keRwCZhS%2BUTstLqC39Bnx9dE1XUzUHWFzemdJ8IvlL0OBzdOksceOUIkna8ju4gyBxPQz15Yjqu28H3GI26hEnoV8bvq8XFV4rEZp4QJvyE9cgC8uATtja4yOYJvZGt5f1t2vodhI2k5ll7th7j4qLXk0%2Bmsck7AGUewLBBVJ1jMJS2o88GOqUBOXuapn5OOxAq3YAWxAkQqOQnJYB3cm1ueGF5BDjCf0LnbQg9X2NdF2a7ArTCdI1AAD0Jl6pxwdjM18iSvWmnlwZTXtGyf%2Fc4lGUobdbXoeUXt6LYEb09RbTatrtrCSGsQSmJDZZrUjTkvlBbVgOXrxJIoVIHogxUvexqN3M5l5PAy2tDe9BUXvc2whzurDIQmTso%2BS6TBnqIVvnw832nPwfxRERg&X-Amz-Signature=75a5d81c20e4b0be79a1160cfd2b3b70cf180dac4661086bb2d08dc9ac71e76d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWYRFKBU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDBo5wroYCKTp9NrI0loBDb%2BG9E4rxT9WbRA%2BnVxGtTkQIhALq6Ojd11FF4y9CsnfIbR80mRN5Kq1r%2BhVRKBni2ZLY4Kv8DCE8QABoMNjM3NDIzMTgzODA1Igyj6U%2FLgbr%2F0Vy15SYq3ANqNmBYGZtfEHnGAiUO%2FO9ks82SLEUvaU3NW08jj4mYamMcXr7auLPxIyhAm8yKhGhW064yReeSVhrDqVgwzuhN4n8EgzIHPczj%2BZdwU2OvqGC8v%2Bp4eVNRNF%2FNNLFdqYWyfBSE2oDCrYb%2Bz6q8L8u4uP0pHYY%2FGydaJVI9DWQBSw9zl1Va7q%2BtvAG9QAag50OowvcVcAX4leEpMpRr6dT%2Btf34W%2FmXUD9P93B5s%2FFdZQik4GSxxZEZZBRToL9Z0aZGwQJfl1TPVwLpQhfUSkxFtnSyOu8Lf9xa4Yn9jLOdbNp2JwGMdAJzNKez0ATtIcbBL3F9fY7yQt3Ag8ZM%2BhN3Gas8RbHXdNdliIJqbXMWA%2BsMz9TWQW8U4RefK4kAcONyNGaT0mIF6cp3YFkLM%2BgwgzSDFoqmyIl%2BgVrW5z%2FUKIMkyUv%2FLjAsOno9RP3wvWXGWvS9xe%2BW0tSFkO%2BCE9vs6Hz%2FMrFdz0Qc928wSsJrilPCA54ztGgng09wF53TKA9P3tKBXb1c5NOE1%2BYPfA99GKxzxcNBx62x1r5NSlGICadaAWtB%2BeSO8PalZNyJEcBsJa910nW7GwCfndblDWEOVuRe%2BRIY63UP%2BWsV%2Fu1xlaF013evH6hdFV8cIDD9sqPPBjqkAYHg71DkQWjqf8uw3uzu1B0sxlkdENGC5pw%2Fw1RFCh2eWGn7nS7xnSp9%2BD9j57oRVL5ZWBpFhUUqZ4cLF9HIhDOPGD%2Bhb7iJK6g0ttHQSj7qz56NU28z82x2VxFBcW0GzviZUixWAW7ZOvBvc1GSxJ0HmRxyt3lFlzCzt6cvGkW8VaGGhGni5uKBPb%2B9O14jV4Gj2nwM6e47bIW8qEnJHdS52Lho&X-Amz-Signature=71919918ad80d1ca022c8217875a51049df7c68342c169fc71d57477a4ce037e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PXKPJTF%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICgOIui6jcAtHBegVCaoLsZVARS5aqSFxEVCLlnY9EgRAiBUA%2BBzsgPKdd7V3N3fZsGRs4a25oIN6lBsJu6ZIe6rdyr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMQ4sWHf%2FNPqkx7uMqKtwDkVLZRU0D58V3gplzj%2BZMLw0bvQPBvZ%2FBZuss1CfSa2E68X7NkHM0l5YLgODZOsPs1l0JpqJ6ovXSTG6qKJPA1JybMU%2B%2BirZ4NDRZQLQ%2FvxrDcgx4nL7yWCwbiAhsoGqxdyp8SKxEAo9fsOzc932Zf6r44aPnBqlu3Sxr5d5jtapi0zxRQlzB8W9dz5jwWEe9Hn9wxHeel53vgRSasev2dV%2B6wWJxYwwzy0zsnKZ1%2BC7dFVzmmR%2FFz0Gtkq%2F2pScStZQdi4wtiYcqSirB9qpL35mvu9Cp5lNfVuYkAk5iPXEc3hIUgJ16lXv8oS456M4Oui%2BfjJybRrohhGMtCHNqG6du4f6fw3dhBXnrhAO%2BLJUYNJKIfsWsju6JRQuSYc1Niz1KeFeJ4iLo2rWKwyHPsWCdrGg3RrCJNz9XJ96wL5SFsQ0idYStQbY36UflT1%2FOCxhs4Aa64O9lgcMQRMKbQb5H5aAC6h2AN%2F%2FJQlVxUT7HqUKX0vGjnvx4uRaFRk5pctFNq5TYhqtpOq8ffSYIwZ5ZbCpJJ7LnKHn0Wyr0SAPYyTAZc25PKU2hNdQ5ylKpltb%2FCCVJxKe6ryeYFE1ZbcUHSk5yIO2UcSYpGSyVYlDt09%2B1M%2BaPDO3jKikwmLOjzwY6pgHjrOBv0rFiR8VxHAy9Fw1n9v2F%2F%2FaNtJQm3rYkWtdibgCkYQsHNXFiPO8bkGKBAOR54zAjs5n6z2zhniecfVj1wslMY4hoqCegQ3f7EFwrOyQFgbBf%2FeeY%2FAE7dsBCzEtFvmbL3%2FglPf9dFW%2FI93trrthsdmQfq9zOjrNwNwi4VxIVs0%2B7lxYzYFtELmymHKD4hyGwh1IV85F5Q73WExuXQXaB3dit&X-Amz-Signature=e1bb0be003cf6bea5e34b7e82c24f9ca12aad8b8ae832292abc2e7beee7f030e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PXKPJTF%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICgOIui6jcAtHBegVCaoLsZVARS5aqSFxEVCLlnY9EgRAiBUA%2BBzsgPKdd7V3N3fZsGRs4a25oIN6lBsJu6ZIe6rdyr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMQ4sWHf%2FNPqkx7uMqKtwDkVLZRU0D58V3gplzj%2BZMLw0bvQPBvZ%2FBZuss1CfSa2E68X7NkHM0l5YLgODZOsPs1l0JpqJ6ovXSTG6qKJPA1JybMU%2B%2BirZ4NDRZQLQ%2FvxrDcgx4nL7yWCwbiAhsoGqxdyp8SKxEAo9fsOzc932Zf6r44aPnBqlu3Sxr5d5jtapi0zxRQlzB8W9dz5jwWEe9Hn9wxHeel53vgRSasev2dV%2B6wWJxYwwzy0zsnKZ1%2BC7dFVzmmR%2FFz0Gtkq%2F2pScStZQdi4wtiYcqSirB9qpL35mvu9Cp5lNfVuYkAk5iPXEc3hIUgJ16lXv8oS456M4Oui%2BfjJybRrohhGMtCHNqG6du4f6fw3dhBXnrhAO%2BLJUYNJKIfsWsju6JRQuSYc1Niz1KeFeJ4iLo2rWKwyHPsWCdrGg3RrCJNz9XJ96wL5SFsQ0idYStQbY36UflT1%2FOCxhs4Aa64O9lgcMQRMKbQb5H5aAC6h2AN%2F%2FJQlVxUT7HqUKX0vGjnvx4uRaFRk5pctFNq5TYhqtpOq8ffSYIwZ5ZbCpJJ7LnKHn0Wyr0SAPYyTAZc25PKU2hNdQ5ylKpltb%2FCCVJxKe6ryeYFE1ZbcUHSk5yIO2UcSYpGSyVYlDt09%2B1M%2BaPDO3jKikwmLOjzwY6pgHjrOBv0rFiR8VxHAy9Fw1n9v2F%2F%2FaNtJQm3rYkWtdibgCkYQsHNXFiPO8bkGKBAOR54zAjs5n6z2zhniecfVj1wslMY4hoqCegQ3f7EFwrOyQFgbBf%2FeeY%2FAE7dsBCzEtFvmbL3%2FglPf9dFW%2FI93trrthsdmQfq9zOjrNwNwi4VxIVs0%2B7lxYzYFtELmymHKD4hyGwh1IV85F5Q73WExuXQXaB3dit&X-Amz-Signature=e1bb0be003cf6bea5e34b7e82c24f9ca12aad8b8ae832292abc2e7beee7f030e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDBGWUUH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T165550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIuRcTwjN4yQvrcnFn%2FO3HcFlNTEHK5nO%2Bh5u41VOGIgIhAPPlIWhLEt7ESPTlAufbk26my3ny2EskDUq4epOkjYHNKv8DCFAQABoMNjM3NDIzMTgzODA1Igy22dkIdj640Q7nx08q3AMpPMqWCAHSgcbG4oMWFlAIxYPALK%2Fk9lpA8oHr9APOnZQd7FEYRSF5ftGJc1T6Xo5ssOb3XsKgudygPoMDHz%2FEAW%2B85mXpirDlh6N3bsuwqvzVU4UhFisjt3in4hLi9rPsJTK2anLc1KMn7HOdw9sl%2Bq%2FPwTzflpAQv%2F%2Bi4tVCRdZL67JwugrhiSFEx%2F%2F32ydVhRprk%2BRlfWRZCWQRtHAIXJ67vJ7Wrl2DS66Azd%2B8%2F3%2FKKD42Uy65lEpm4qRLnOqJctqV8HrjoU9h9WD2DWa3m%2BGiRP0jtxz%2FjOFpowkknkgr9hVMqX9gBQy1%2FC0192DrSANINjf%2B2oagaI%2Fm1t0uHeQssMRxJa%2B28nQkC%2F515T5Ae8g9gGfBW0xjBBu8ntr9dB7H5YN1LrAQLSTH7Le0Bhu0587Hw3DRLs4auXOjADKc1KWgGGqPeguFyFYP95RLKBT7Vt7bqV7LsC5G6QERPVOS4oVI42l0lBb%2FfvIRAk88lXfFN0G7BMXDTKbcW4i1ZdLKvfw0gpyvb7eCupZPOIaba%2FdUZK5a%2FAPhUE8mzdC%2BuZWjhnbs%2BQQaOjyud7IR3ZJS2e67QXkLy8qrHu3Yzzr6X%2BmJB9d%2BUkLgnTU8ne5RNO9dnIwBWCzMkTC5vaPPBjqkAfs%2BtZ4B2i%2BdY7ELWRv4iSAi0XX0jtFkopeOzPzg4gAaT%2FuDlsh2kuv3WFWfqX3xOMQZygWeg%2BRq4nEsx4YkLvHx4K29JxuaMBhqFLkXCZxNFF%2FbWSduiwfIO%2FLJittlHkqSByRqfJ0z1tUBmVCBTLMvEexYnh%2BL52rjOx0JNwivHklcd%2BClJYpMaW6bG7sZ6Y8JQeI9f9Akx%2FC7031JgzsKF%2BI2&X-Amz-Signature=723ff400999cae51470a0ded8660123ab9de587b66ebe31eedc056b066e8d04a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

