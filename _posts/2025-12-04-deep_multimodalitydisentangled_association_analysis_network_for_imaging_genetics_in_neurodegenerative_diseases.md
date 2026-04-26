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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNYQKSUE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCIBO2bnQ2AMKlb%2FcSi7FmbbxV1cBwIhCSxmP%2BFeX7emQIhALcR%2B7oG56cOEp5NhZwXX6IQ0%2BDxMGJIJf3swUrCFWQVKogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1fZptQ2IEU2ziTUUq3APcx1m5%2BqxwpT5PuY0HtB2wjrw9NiuTuM9o4hpekoD1oXQktJuWTrd3zbCSuf%2BLnrb51zSFphhhX%2B%2BHCXtDGlHK8h1wyp4EYbsH9XbcrumTnTocimsUjdDcbEadyaBsvaidLM2N%2FpYx9E2ImICR3uyNRUi9C0vQGgDNlmdq4W6FaeaR42O7ZHlgWbgjwlucUR40IW3LjxjaucHmXi3AYSNuo8iQm8g611a%2FlfFP6aHKnxNpBqeBEgTWyk43Tul6%2BI44opQyBfy%2FoStOs9tV%2FCSyb7qGpAkMwwxig4FYyFbfrTqZ8b%2FumGMf67XXkhZkcb1CcBFuCA2E3dKCfcZDOCY1EY3IWxZ0QTrfQr0iORNcMU3nw%2FzJWd62TMmjmxsp3WnMpjIEf9C8glGkB8FHfHXe69HVelL5xeySIJgtW7mC3MSICOqEZlelksMjlIr1vE3x1CoaK6tAS5HPrmL4Dpb3124inqq1GTcwPsGlKrOrERgLK%2FE0I5gjA9oMIW8BzEmYwbQIT41JdBZBUHC9HlkxLNq9EfVddHnFZIMKBotSWQWq1Evm4JFieY9gjO2xj0CDCwZJ3nhM5DXgF5QbFoymkveVuGr2x4VzfwV0LTsRO31tLIMw5sYBBdvkZjC7tLnPBjqkAfYcoOMw9esWSyq4NYtNGH6%2BhYFA10%2FArrK4Zu0t9jYwidSVH33srzmOXnp3%2F1ADGfAw3E4P3kSVYfIFaAtCDLRFaUEFfz6akSDB8le%2BjexWaWiRfI%2BEcJIgQAsflMnBwkj6ffpeDXq%2B7pl6F9ulpKzPqfotazUtr5tk9wtIb1dHwiXwxSgyPq33i1i37kn9D518YPQgBAZEr7jjHRoMUX3iN6a6&X-Amz-Signature=97996ce9898b7f2c874c82e7fb908558d081c2ba82775bbac5fea1229e52832d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNYQKSUE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCIBO2bnQ2AMKlb%2FcSi7FmbbxV1cBwIhCSxmP%2BFeX7emQIhALcR%2B7oG56cOEp5NhZwXX6IQ0%2BDxMGJIJf3swUrCFWQVKogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1fZptQ2IEU2ziTUUq3APcx1m5%2BqxwpT5PuY0HtB2wjrw9NiuTuM9o4hpekoD1oXQktJuWTrd3zbCSuf%2BLnrb51zSFphhhX%2B%2BHCXtDGlHK8h1wyp4EYbsH9XbcrumTnTocimsUjdDcbEadyaBsvaidLM2N%2FpYx9E2ImICR3uyNRUi9C0vQGgDNlmdq4W6FaeaR42O7ZHlgWbgjwlucUR40IW3LjxjaucHmXi3AYSNuo8iQm8g611a%2FlfFP6aHKnxNpBqeBEgTWyk43Tul6%2BI44opQyBfy%2FoStOs9tV%2FCSyb7qGpAkMwwxig4FYyFbfrTqZ8b%2FumGMf67XXkhZkcb1CcBFuCA2E3dKCfcZDOCY1EY3IWxZ0QTrfQr0iORNcMU3nw%2FzJWd62TMmjmxsp3WnMpjIEf9C8glGkB8FHfHXe69HVelL5xeySIJgtW7mC3MSICOqEZlelksMjlIr1vE3x1CoaK6tAS5HPrmL4Dpb3124inqq1GTcwPsGlKrOrERgLK%2FE0I5gjA9oMIW8BzEmYwbQIT41JdBZBUHC9HlkxLNq9EfVddHnFZIMKBotSWQWq1Evm4JFieY9gjO2xj0CDCwZJ3nhM5DXgF5QbFoymkveVuGr2x4VzfwV0LTsRO31tLIMw5sYBBdvkZjC7tLnPBjqkAfYcoOMw9esWSyq4NYtNGH6%2BhYFA10%2FArrK4Zu0t9jYwidSVH33srzmOXnp3%2F1ADGfAw3E4P3kSVYfIFaAtCDLRFaUEFfz6akSDB8le%2BjexWaWiRfI%2BEcJIgQAsflMnBwkj6ffpeDXq%2B7pl6F9ulpKzPqfotazUtr5tk9wtIb1dHwiXwxSgyPq33i1i37kn9D518YPQgBAZEr7jjHRoMUX3iN6a6&X-Amz-Signature=97996ce9898b7f2c874c82e7fb908558d081c2ba82775bbac5fea1229e52832d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVYJEGPZ%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDffaMQkCECd%2FPmbo0L%2BUgaBdXMxYgxlznm%2B%2BwIZCirOAIgGoxKSyP0v0sBduxOPSJOpzNafM4oR5vCeXFLZUDWcYMqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHN9oUG7X4lb6stzDCrcA7z5ofEhmUfK5E84rTxD1m10PLOlXxg%2B7SwRekN1qOJ5Aef3q7fQDHWft5OH7P3bK%2BOTDKIo5TaiUppyKSOp5FG9JbCLeG9gUXALP0HH6K8%2FYcj7%2B20WbEXy36Ion5R5T2vcFQWSWZmM2MyQMsHnMkXsCRccmFOuj%2BhG%2BGnsPdO2Nb2eMKdhxsHpgiefTxJoXOd73gIzUyS0Rt7UXjTJLeiZYizeh6if2k6mHPva8HWCkDVXDVliPRacxknExSuqJdusmAglwpKwlZHT7e4U0GCw6DftSx9P5diIhkJjCTOfodP4qDFZ3PykadRoVf24FCUn1vfX%2Bxp%2BlZGfcuzrXKOlYxOgfIcFCkTMzOkVX6LAP3OaJygAlECUCV5O80Qz%2Fo9DnP9Tuw5zevii5cqQgI7YlXL8lnNwCyUY%2FmeCdw1%2Fo59IJnVJnkJ0IVujRGbgj1mKB3rS8%2BVihOSssdJHHo%2F%2FF7GJxYeq0QJlWXyaOePG27xs4uWcjMOCfFSERsXv4BBx9WAV2xuUKwOfRqrThFy9sBc1l2fvrbGPAHawpmJYLxIFk7v%2BtCEoYwpFCQ8JaBltaI7sb2OFfhFNMAdHO7%2BQDwW2WaLBcAg7OBXCWD3Xv4Lgl20dUaSewsPoMPm0uc8GOqUBMhVoWroDx7fLdlH6fCFJdp8YPmUHayDb%2FItz2MXSyXE2bg2Rgij5R0erh39D%2FVNuF6qv6ToIPefYIsjLmVmYBnpDobM7rgPzLDafoutas5XjHTZ6iUeaY6TNQO%2FMP5xeYmsrrB3MhtQ68p0%2F3eXo7muf0EKD3y%2FPvT%2F0emPn4XxiFjGGoP3rX6QVysKNrAF%2BjUaSsleqDEfWHmooMmm%2FFnC0gUwj&X-Amz-Signature=d51f0380e9a78a081b06010989f3edfd12b9a7c85a4fefb9959e2cc6c3af009a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG3P5N73%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICgVhOZr4KcJ6clxat0oMAGh7M1LHbnVjlqs7XBVmkB3AiEAm1jLML9Cf400ZaJ3ax1sPyFaJhWopRMXBiC1L5XBSVgqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHfGowCxXKPLtt2GOSrcA0s2f9qqQBnwZKRSrq6g8%2Bf1by9WptES02646NQFPkAeLbOroCxTjZ%2BhMVEJGX%2BnnZCUAh9KTp75%2FQHLPA%2B5D1YOISkk8L0J1LubxhssDb0L7XtgJauqvPGhmYoxJn6Hc%2BrRsIHMarTtfaQydfniUmYJJ5GIiKNNC%2Bg255JEHbtnMQr4KHbNALrUXrnj8gIkR2wFD2gy90XaDXnrK32vGQd%2BV%2BdF3fnfqApSlv%2FQVYeOQdO3EE0dA1FcaxdUraHy72X%2F5bQzuSoM5NFlU4EdniR5PGmOnie8GD2vOpuYdehngzYuyJeXMl%2BJ%2FJfgaCEO3ZfRU6d5XKK4tbRADxJQ3hEqAiHKDtCREUDZf%2BP68JCL8j%2BL2P5TY9Y9Qid5533JQJ46ZidyLlhmNG%2B57naA4Z8QvmX5uvARFE19y6Vj1F1B2F21pYCIwx8k2AjnLcVPD79K1CUM%2Bwpyjr2gNrxdqtNPgY20MdUErHfNJ2eKN2Zq4SmAuQJywyLdEpI3WvzpQomMmIurRkGMNA9JTQNav63X33sLi7HwIMu4xD5Z8IJ4VOVtmMuUXKFCC7Tw4PuzMPuX3FeBz1THdu%2F1TJSr8zZojBnOAryY%2FSAMYnWzGmP%2F4F7fglziy3%2B2f5eQMPm0uc8GOqUBvsis6x0%2FwEWdlAar9Oh4F4SCGNG5d3Oc%2BZl8ebwW5APBU9e8g2XyEa6bVeWc%2FNTJTdY4p229PqCvAvuFPf2W23F%2BS%2Fo%2BvngJkBnapOmWoPMIfC4B2iyE8kpGQ75anWm1aHGgXNHFNCjQE0hOB2PX59dW9DIOdpRRBO3MlKzCgHQM00t6liVAsbGJx4LkbGJIGtdt7X6SmBAO5Eqpd4nmPhL8ezwA&X-Amz-Signature=57c445a826410c179ec36002f52a02a2029f7f5a929ba98b64d6faf1bf2da9cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG3P5N73%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICgVhOZr4KcJ6clxat0oMAGh7M1LHbnVjlqs7XBVmkB3AiEAm1jLML9Cf400ZaJ3ax1sPyFaJhWopRMXBiC1L5XBSVgqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHfGowCxXKPLtt2GOSrcA0s2f9qqQBnwZKRSrq6g8%2Bf1by9WptES02646NQFPkAeLbOroCxTjZ%2BhMVEJGX%2BnnZCUAh9KTp75%2FQHLPA%2B5D1YOISkk8L0J1LubxhssDb0L7XtgJauqvPGhmYoxJn6Hc%2BrRsIHMarTtfaQydfniUmYJJ5GIiKNNC%2Bg255JEHbtnMQr4KHbNALrUXrnj8gIkR2wFD2gy90XaDXnrK32vGQd%2BV%2BdF3fnfqApSlv%2FQVYeOQdO3EE0dA1FcaxdUraHy72X%2F5bQzuSoM5NFlU4EdniR5PGmOnie8GD2vOpuYdehngzYuyJeXMl%2BJ%2FJfgaCEO3ZfRU6d5XKK4tbRADxJQ3hEqAiHKDtCREUDZf%2BP68JCL8j%2BL2P5TY9Y9Qid5533JQJ46ZidyLlhmNG%2B57naA4Z8QvmX5uvARFE19y6Vj1F1B2F21pYCIwx8k2AjnLcVPD79K1CUM%2Bwpyjr2gNrxdqtNPgY20MdUErHfNJ2eKN2Zq4SmAuQJywyLdEpI3WvzpQomMmIurRkGMNA9JTQNav63X33sLi7HwIMu4xD5Z8IJ4VOVtmMuUXKFCC7Tw4PuzMPuX3FeBz1THdu%2F1TJSr8zZojBnOAryY%2FSAMYnWzGmP%2F4F7fglziy3%2B2f5eQMPm0uc8GOqUBvsis6x0%2FwEWdlAar9Oh4F4SCGNG5d3Oc%2BZl8ebwW5APBU9e8g2XyEa6bVeWc%2FNTJTdY4p229PqCvAvuFPf2W23F%2BS%2Fo%2BvngJkBnapOmWoPMIfC4B2iyE8kpGQ75anWm1aHGgXNHFNCjQE0hOB2PX59dW9DIOdpRRBO3MlKzCgHQM00t6liVAsbGJx4LkbGJIGtdt7X6SmBAO5Eqpd4nmPhL8ezwA&X-Amz-Signature=97ad1171b1191e257815b1b0d1930a1f38d45e3f231e0f55a56c357a2bc8e427&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RG46NKBC%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdrokD9WMBOC4Zuzuuqpxoq8pl5mUOCZGsshnMG4CjYwIgfOOWHUsMIPicp%2FgYLTAhyxJb%2FS%2BN1izBxqs9ml%2BNScsqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJfp6dy1Hfoa%2B%2FZ47ircAxyg79Dg74cNI0ALFt1KUJmyBCEfgDeQzH0HiJHOX5q46odFcRUMy%2FbrlJOts%2BzSo2ijYuy5LASzScTyWUS1tzIEw9hPMxo%2BqYNZ%2FSbE8AjHGTJiml3bEpB%2FgqdjgLbNpcaxDd9YBhrSq2OvGNhbKwHPx5kf0zPei1Edkjxe5ovKpiceSbXhTUSUYQM0S09Xsp3OBWJGUffnPMZoChSmHgFEBCNcLft0OzroC7kOC%2B2F0mgTo6r6UcaChZTKacKRHgp%2BQR6BQGOGhBtyIbsCQpvk4OhCQEFORnUPv5Nm%2Fv5sCMSRTmef%2F3HBEzej%2BPYHh7vrzosl0h0DE7UdNOkBGtrUVnMiUzsGT4Wv1gpwhjz65I3luiePmDImH5If0ni%2FgGFQmmNl9zFSGS4VVgksg4WQ5hhtjhUSzE53hmpSqbf6oCP1EVsIW9fRuBBgSwziLLv4O6Q3sbrj9uKMqgS%2FhjPUy5oQh%2BVVczTtB6Ngm6ppTaCeYL2PrCAaSPGUvQ7lV5uK4EMPOvYso273mdfn5k0Df6CeQP6O68ZlrvoLnWva95Ek836HJ%2FOf17fcdDUJ20DztQfXlZ22cEOkt7pyJZP%2BTD4qjFP4NdRFdUeVxxSsBr9wUB09pXAtyFD7MKe2uc8GOqUBRk9dFgUGWvsgVvx3ouQjlpFyaj8xqcMJ2Wx1QN9%2FfUANbMBcSr4KTcZZwBNd71PxZ21i1MuuTQ9dKp%2BxDcu%2FJDliNJVOrugcLyfjQGV8pqbgb3Nv35g2KifYeQkGq%2BAS11fbHRBTW%2F%2B5xVjo8CikcAl1sCgm2zSqUJ%2F3kYWtq87hLTQSp0q2KwzN6wzNnBLrQUMVA%2FG13lH%2F7Mhc3VNU0PwywbUw&X-Amz-Signature=e582fc451360a09536b77b45a4ab640986033844103489d94288bec50a16c646&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OD5UTMG%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCBAVHZbr%2Bko9uBfJrVvfJl%2FZFXRC82%2BlBuEU2SfdrRogIhALl34n%2BUvAgvAnznK%2FPjIxx0RU3rpxGkILlj9LEqpQCVKogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxCz%2Bj3CwTsnXATDOgq3AMwgk0SKrufqR4QLH6WXNtZQNy1yeirH6C1bfQrKvG6X5A%2BstirkhhWx06aPh5azk4K%2BFp8yEvHPqXAIJu6W2y3b8CXtYLm7sF8xNpqUiaHcl23rB%2BGsR0kUo%2F4%2Fjk95iHd95Xqm6UKV1kLLFmcidJg5%2BxTGgNtwBmwWlVJv4GI6VclizZX4PiFt5pYjeO5o5pKyNcAumPkfEwckNZwtB04DOk%2B3EsD1PGm5E1dbQ3l%2FVe107szhh3Ck3kN0MmTbe0X9hipmohrBvzjSGNl2AAMVCuVSVV3ACzOH22S%2B%2BnBi29sIm9L2pZvL9BAx1esLh2YNNM74YWENdXE2F4eEfnyvLJRKB%2FP34enhX39XllxgaGiNM23J5Ea%2BHTyQxQzL29%2FAYB4KdAIWMjeTItQl4gWHPZrVg3u9so%2Fhvt41Uq08jEmRP9KOwkewDtDhTz5tRwDPr%2Bt4hZyqdzyHy%2FHxTU7%2BK4rVUDiP2%2BsxFNXe46B3meHFdHCjZ7jqGUabg7SMKNQLAaaP5nt34JO6zZIuoCW3JvH3Hb5gSIkUtlWZhdgyuK27QGzfuz9X9izQE%2FO4qDRVmWdnw1hoKMWyQCA8GnaRznLW3%2BcT1UcmhmUzSRr6wl8qx8BCvUdzqcrWzDutLnPBjqkAYP%2BHeqkMt3EqOt%2B%2FfpRCcI4clC6qKgQz%2FUto%2FMJZ5kDSJfNNZhzVcwVXk0LWfmvXAJtjogBWWDcpJmH6V0LG8fVAEBm38Nxv7MR04G16D1L3eh6suR04gzfhYWD6QS0IphKPzgRT%2Bfm5EbNlry40IbvjyvvGE9XCgmrhTHnpNVpl%2BZybBwpjenXnxj6ShgfaqqyIi4EeDMr1TgO4EOqJ2%2BSWOCA&X-Amz-Signature=5de2d60a6f8172e8a2f4c0debc0858b5d4a463b546a9b2bdf04962ce839770f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6YN4TVX%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICmqo7JavhLcK296KAtXDrCWld6lvunT25V8UoRGilRtAiEA6kVHwfdymLQs44LpypfxQqjfU%2BFxMc%2BpKtWqtbHx4PgqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDATkLJrFrKQ7UEroKSrcAxOX0kxsO2tbFYr%2BA79K713u5OXR2LpXnjqZUNHWCICAvUiZTU2%2Bgb%2BPT0nNy8b2Y4mnDzeX%2BcO0pJW3sCfXiz4xiEmj%2Ff8ZBCCb0%2BD6EXmdniK4FnBvIltABYLQYar9h%2B5ukj3HseuuW08ZPCivnTJ7rgFovSjYg%2FUwQd6D77ek1OWiJKXUlKwIzupp7MKuEzmzsL8OvJFOBlDKYGgJsqCLfSnJ9gObUmeWjzmfH7DfdhfTYtYjDCOdb1R21TtROAn5Se1dAR4WT2nmq%2F32KKfjb2wku9BCMB2lsZRbWvWeVl%2Fp3vvwdLBLT2b8KNm1ff1QAXz%2FnGfAhM2illU5o%2FU%2BQW3iw9UeI5cFKSrrtCoYNo%2Fj%2Fpa7z409E%2BNLQqjKfnrbiKNupjAuLgAYCErNa3HNmQYiPqM5E1j0MvaIEwN8ccCkYTOAPOoTHuDwx6kpbCGJgrrj5J72kSgCStGEHmCt1VAdUVkvKiyhJYOSEwFj7gFVy68GCsu%2FkbnEuV8eTQGwO5iRFRfsh8EhgbWZZeREZIS%2FQDSE%2FiY81zE1JxJn1tkQ3q8DjYfEsiOZ7w2ou4nHO1FM8beDkagNw2nRxQhO9L4QbxVjkPyU0hExcvk6jjVXzAb4k3SAXtI1MOm2uc8GOqUBdFNuXfWqn1sQh%2F4349NnF6SoYdyurfkcbDHk%2Fc3Smbd1Ikde5LuC9lHJbIJTBbkHxUf7ZItFgBKng72aGq%2BC7lnfJv7wDR4w2p74lHPRvxq1Jzzr25zRNzvd5XKyljoUwfB4RT6XMCUp%2BFsUbtIFwnCQbyANaYUT%2Fa2bjKLLgS%2FgWxnokBbLAjks%2BWIOJ3YyuYnwW973rokWi1XzctP50qzwXZVX&X-Amz-Signature=9614e1ae551a5746f61119f633f46e3971275db4b34cf91163bea49eb99ca440&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XODMVL5%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVzmMZVf2XHmGmON20B6tTtCPBte%2BOg5NRbkz5uMRgnwIgBV5MHmqdxb9Rys9RJZcQZZfoG9ilqlrvlplt%2BvCHkmgqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM43uM1AaQBcYAVP3CrcA9s18IWLpyPqgtE5fSz0B4Q900b8VpozkX8maSruvkw9bc%2BIU2tAopqLYESL61g1%2Fm%2BtEp86510Hzl8yz30FAzbrPHKj%2Bt3XPGW2Uxz7cYi3An90m%2BtUPU9ZR8y%2BwdmIkmwrB%2BMbPBaK8LD1WfOwVmpe0aDbqLFT3XvQh1raoclN2yco3EVbOctHSLXAsGt9c7QBLqpuh6q1KceewAD7jgnXHYZoFsRgsQxMNzIcav0SMVsVDWyvX8yjtaCH0eqrz4cci%2BpLCALaNQdYtyf3mM%2BQ4q9bfAuZ2kOpSkfxH0gIFYZNJUaG7eV%2FzaXspBtNjSCuuXg7YfOnF4vNL4G355mPrSAKaRAWbXYBnN3wHKcdwQtcgFG418Fq5xZvXw%2F9s1CmQkTG2smFIthhjdNYyNYj6RypTaltt%2BkXxOWYlDgwtA3btoBEhXr5c2RLX45XVTOT7ue%2Fny3QSaI36N0OgPQSvPmlCAKBfxQ%2FAw%2Bl%2BqEY2Wqn2y6qv4Lhkt2sScNVfOKIWw2sVW2Ssw2RaZQbkMxFo9zyTDWlpWC4ru2MKcy6QU9fO3WpGChGPMJZI8W2I%2BFb9f7U0tr%2BXdw5qlds0096pjZlqpvusCsbRMdS0LpELmBLGK4Lo3HSorGlMKK3uc8GOqUBN7dnhP3gqbQSqxY4We420MZ656YLoV59MTdUPSErkzkeaitYh7mP%2F%2FWzjaVlOF8Wu67uBdOSDTUx4q4jfMvEczmA%2B3tM446ppbHzVafzhXM3h9IiGh5%2Bo4WJDK7SOyUEJEmG9g4lMTibD0VKbMfpMxxBz1V%2FhipZGp%2BQ16B5ap2H%2BghrE9%2FFcXn3av%2FzuoZg1l1asjFNVtbZoUwRDO%2BYfboN0j3q&X-Amz-Signature=a8b8c03dedbded0dbe16dded1dacb78a9fcdc058156deea7bf66260be0cb3d36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XODMVL5%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVzmMZVf2XHmGmON20B6tTtCPBte%2BOg5NRbkz5uMRgnwIgBV5MHmqdxb9Rys9RJZcQZZfoG9ilqlrvlplt%2BvCHkmgqiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM43uM1AaQBcYAVP3CrcA9s18IWLpyPqgtE5fSz0B4Q900b8VpozkX8maSruvkw9bc%2BIU2tAopqLYESL61g1%2Fm%2BtEp86510Hzl8yz30FAzbrPHKj%2Bt3XPGW2Uxz7cYi3An90m%2BtUPU9ZR8y%2BwdmIkmwrB%2BMbPBaK8LD1WfOwVmpe0aDbqLFT3XvQh1raoclN2yco3EVbOctHSLXAsGt9c7QBLqpuh6q1KceewAD7jgnXHYZoFsRgsQxMNzIcav0SMVsVDWyvX8yjtaCH0eqrz4cci%2BpLCALaNQdYtyf3mM%2BQ4q9bfAuZ2kOpSkfxH0gIFYZNJUaG7eV%2FzaXspBtNjSCuuXg7YfOnF4vNL4G355mPrSAKaRAWbXYBnN3wHKcdwQtcgFG418Fq5xZvXw%2F9s1CmQkTG2smFIthhjdNYyNYj6RypTaltt%2BkXxOWYlDgwtA3btoBEhXr5c2RLX45XVTOT7ue%2Fny3QSaI36N0OgPQSvPmlCAKBfxQ%2FAw%2Bl%2BqEY2Wqn2y6qv4Lhkt2sScNVfOKIWw2sVW2Ssw2RaZQbkMxFo9zyTDWlpWC4ru2MKcy6QU9fO3WpGChGPMJZI8W2I%2BFb9f7U0tr%2BXdw5qlds0096pjZlqpvusCsbRMdS0LpELmBLGK4Lo3HSorGlMKK3uc8GOqUBN7dnhP3gqbQSqxY4We420MZ656YLoV59MTdUPSErkzkeaitYh7mP%2F%2FWzjaVlOF8Wu67uBdOSDTUx4q4jfMvEczmA%2B3tM446ppbHzVafzhXM3h9IiGh5%2Bo4WJDK7SOyUEJEmG9g4lMTibD0VKbMfpMxxBz1V%2FhipZGp%2BQ16B5ap2H%2BghrE9%2FFcXn3av%2FzuoZg1l1asjFNVtbZoUwRDO%2BYfboN0j3q&X-Amz-Signature=af5e905a3b782fe0076ee9306005cb3ad5839dd31c283883be140d9402a93934&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ3TKZ3I%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICIR1yIkoHrGgw221QIP684vmoCilkmcndorVT1zjd4cAiEA8ZaaHiEL7fz7s5HTEPBILZX9skdcVSLWGeDnLyT29I0qiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIcs%2FBSR4GYwCpl5ECrcA5lUl3%2B2RVZA1b1F6zwiOYvjfDdC5j0jnKet8lS84aHSoZl0P4EDMz7tfO0PvgX3uyqhiupAaIzb5LP5mQPE7IwIeZ1HyKhCtP3AYMdERuFxFKbAiPWcvt%2F8Kvucm4%2Fjcq25R%2F248KA4b1kGW1r7f4MYsorBVsm2PcwxXQbllr54Mm1vbKJVPh6czZ8ryp9wwJ9kHtqGIzG70JlwUAaubnYzE5TYRkuZY2MKAxbgFYTQWuwJl6u%2B%2FsU51gCs2cnehFEF0Z4GN4OPfadh5Hq377VRyYyPbMPiEOkIeFfrRd0vdCREO%2B9XzeR5IN7CKIpMFMD54fvExUr%2F7%2BHTG5VZs67E%2BmYJEhMX31DwpHdAZxWo77faxbQ1lWdA39YfjOjK5pl%2BgZ0FElDmwfjSR2BP0epyebbFJwPB3o6F1b3h%2B6MGxprdNFGVaZxlspkBtuYuwQpSXhQU01rnOUKmIrFR0ogSv1oRIdCmis4zImUYep7eL8%2BDjoASxO2XtOK7VmlwoFePrMqFAqivyrrp0kdOsPs7fhS%2FGBisO%2BtDxxN2jM0okRrsgO2aYqOq6fBkx2cTIWzW1FNV%2F3VoTTZvj8ahrcgEHqrhbkoFjUoUdyTQbrWy132XAQfWEGL0ZKS5MNS1uc8GOqUBChGK5JHlIynmmQNdwE2Rq%2FeQaVIYasnuqmX1fDwoA6anGvhoVtyGRgGyK4aDBioLPmEipNdSiq3DezFK%2FLhfl37Bm4oYnqA3JI9iON8d9qf5VEg575O4%2FPdBsutnkjkMwVk4R%2BXHcdvN1ObGWUjVfhcfSoXn2lrFNTl7XhbbI6L%2Fj5j5qikKjP%2FDtZIFFCyW6QONIixKyiUzrsftc9%2FEcd1Xu92v&X-Amz-Signature=6dc8dff5c720ef80afd668dfb0de9e6cda4d88bcd0b7f65133390dacb300f9af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT2FKIHP%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0Emi1gaNoig6cSjrblkvW1JXaD48bwOOXNQ7bRFcx7gIgWPwfnEbLDrDTd4TDr%2BJVOEptAg24%2BPPUSyLed1cMrJ8qiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB68RDIyfa%2FeMGgFrircA51zmudVSPibja2MTIoKWi7jlxdP2busXR82M07kpyBzjqsfUvDQvwpCS%2F%2BVlaAWnmdfAl26yNScVkMdHXUB5hlSu%2BGvhXiyxLgMM3Fzs10BWSbFVD4J4UWs2a6fbyBQia9a1ECjYKa8u6FKVSJQyZHEgPMK3ecPPxzJTnpWiykJVCBm9zWiMN1yJTwqe4sMViDbas14cxH%2FYjL%2FNxmN%2B2Iib6hRQ4lCcm4P9jKRe09MNYbLIMxitdrOMahL1GH7RlCBFcE7fU9qDheW9h9s22ZBWUfps%2Bjlq2SbUdv5qvhHP7JO2u5mMWEnocjjBUe8RnoqNjFOjZEXtHwgcp12sD7OS2zOuUedinRNAxYUD5%2FPjWuv1XmIuGLrNT26dvs1xARWUA9kjf96Y6aPRLiVQjFuGRjsn8XCZThl%2B9ECwK2hXz5VhZC6K8urxJcdd6t8XYO0zbwCGB%2BI3oCnOT9Z%2Bg7rLXQM15%2F3kSbki2m2b4EiPhXznywd2ONdpmQxty7uZR4hAUbcyukQCz3aMl4ykKXjspHj4djvf0BEvT3WMnHpufTI%2BUMQUXrkA0rN4G3O6I5ndFyNBLBhBgaLhLuEGuk%2BFzbngmwPOqEO7%2FaHCuu6KBYCwB37Dw%2BqT9pzMKi1uc8GOqUB93E%2BhP8rSC9uOxNzow02b83o4PQO1kHSO1jEFByobZ3NsTcbhc5zyL0bvpExXCZUnyVwQFhLGqYgFvkE9%2B03RxMJxjJ%2BsIO4zQDJorOtvvnNgVpPIVfGHnIrPKEcN2EMHX9E8%2BhKJh9FQJSo6kkZ27G6k%2BIPGpEFcfDwtLewhnlmqVakZs09ELBKnbHLJwCdD95OgJdiRr8aBh8cFCfJwUD%2FCieb&X-Amz-Signature=5a0ab001d04623ce9d360966970253e7497bf145f3c0d6b5e4d380450f62e722&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT2FKIHP%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0Emi1gaNoig6cSjrblkvW1JXaD48bwOOXNQ7bRFcx7gIgWPwfnEbLDrDTd4TDr%2BJVOEptAg24%2BPPUSyLed1cMrJ8qiAQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB68RDIyfa%2FeMGgFrircA51zmudVSPibja2MTIoKWi7jlxdP2busXR82M07kpyBzjqsfUvDQvwpCS%2F%2BVlaAWnmdfAl26yNScVkMdHXUB5hlSu%2BGvhXiyxLgMM3Fzs10BWSbFVD4J4UWs2a6fbyBQia9a1ECjYKa8u6FKVSJQyZHEgPMK3ecPPxzJTnpWiykJVCBm9zWiMN1yJTwqe4sMViDbas14cxH%2FYjL%2FNxmN%2B2Iib6hRQ4lCcm4P9jKRe09MNYbLIMxitdrOMahL1GH7RlCBFcE7fU9qDheW9h9s22ZBWUfps%2Bjlq2SbUdv5qvhHP7JO2u5mMWEnocjjBUe8RnoqNjFOjZEXtHwgcp12sD7OS2zOuUedinRNAxYUD5%2FPjWuv1XmIuGLrNT26dvs1xARWUA9kjf96Y6aPRLiVQjFuGRjsn8XCZThl%2B9ECwK2hXz5VhZC6K8urxJcdd6t8XYO0zbwCGB%2BI3oCnOT9Z%2Bg7rLXQM15%2F3kSbki2m2b4EiPhXznywd2ONdpmQxty7uZR4hAUbcyukQCz3aMl4ykKXjspHj4djvf0BEvT3WMnHpufTI%2BUMQUXrkA0rN4G3O6I5ndFyNBLBhBgaLhLuEGuk%2BFzbngmwPOqEO7%2FaHCuu6KBYCwB37Dw%2BqT9pzMKi1uc8GOqUB93E%2BhP8rSC9uOxNzow02b83o4PQO1kHSO1jEFByobZ3NsTcbhc5zyL0bvpExXCZUnyVwQFhLGqYgFvkE9%2B03RxMJxjJ%2BsIO4zQDJorOtvvnNgVpPIVfGHnIrPKEcN2EMHX9E8%2BhKJh9FQJSo6kkZ27G6k%2BIPGpEFcfDwtLewhnlmqVakZs09ELBKnbHLJwCdD95OgJdiRr8aBh8cFCfJwUD%2FCieb&X-Amz-Signature=5a0ab001d04623ce9d360966970253e7497bf145f3c0d6b5e4d380450f62e722&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZM4NGRDT%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T193707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDWRsOwsJNJWJgkfX6lT%2B%2FgTjzYYuTa8bO70X3BCsedCAIhANCRLrOoSL1f6ufgcrxf%2FKvzSWFObaBeyLny6ZPEUVGnKogECLT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwdQSDwmij9jvpYuaoq3AN0rEGAu5JH4zMFPcIERijUAGynBtcpMuhPdpAipdsyN6K1fR1VmJcC5%2Fmn4ZqxMZxEA%2B35qk1%2FF8wFoddifT8pI%2FfOfP5oQDZ43GkKt%2FityBwfiaWDSk4a1ADM8%2B24mtcBKMOA2YS4Um9G4%2FCMIHptZhzfMCluD658z01KWa67PsRZu5uMMuNjNhoQIIzFl6JsLf3HwZzb6BB97MIBZUxX87Gnx1WD%2FFAq7z68bpthdt%2FC9RJOWPnKR9Ghh6X4mMJZFsDTdLcncuHzR%2BELRJG5ueUPfwu%2BAHsICnbV6oGrTRKSitlaRQPJX72hfCAFr1HWQozRciU4D0Yvz9enWv0ZOVBLfap1gScrnv5IyTSyj3GVizwsnIfwXaHGUa9sYT39GAkNCoXhQyyoX0FJH13r4g6MJ27xFImfCfDt2LlN2vVBfvnsU70eISB%2FOgVFT6NqGcFF5TSn5SIaVmHyg2b%2Bfi5u9uEchcqcjDaS1STwU5ycFEgRn%2F9k%2FEpsKpPRVfpOR3bX%2BZUlGtnxD2WPn6PC9SNh1DoFoW394F1RmD4e99ZYNIXvAf%2ByC%2BlDlI0urp8ddHDzLh7bPZM9C7ZkHUZcKTDksa8yvU8KdOhObqhWIz%2Bjd7oI3VkIn3jRzjDktbnPBjqkASgv7J7cDCAS19O0Chlb0Psht0gNO%2FN3yqt9Tt7rsketudua%2BZgcPcntwENbv5Siky3OYjOuGkAs0MEUFI65TaaGLtk8OD1MBt6jRCxOMuaB%2FZvbTolHVpk9Lo1LLDpDSqbX%2FjvP13TEnLfeZfcQ1quL8Id69a3BNHpQ3%2FAVftMcv4NtOTG9yUAXBQzWOo3k7q9C0DHV7qQkCtnZr8J0AOohrQTM&X-Amz-Signature=54fa5ef989bb2ef3ea0b49fb8033bdb4e641f4adde1e2ae0a6d5b5c95b911297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

