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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5C5KKGA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIHE%2FjIjG1oVcHnm%2FMp4yNgmpTwd8ESB8Cl8pLKuqfHfJAiB%2BcjPc5J7dMdcwPa6YNnC%2BMwistStEX5fW8JgExRXTHSr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMxbnQ7pjo6ssa9QlRKtwDeTwek5QjQ7jIfCj4aRVL8s%2BU9m0iP3dwbAKq3ycAqf077I3AsXujV0%2Bd%2F5cBHQgDFvrL2RtTI8y63NtgxjXvsKws9h1STsag6tWRP%2BW%2BLkj%2B25REK7GHwfpk5stXZqUVtjcaTuumHqJDSRSpBCGvQarL9urpJTH%2FimE5XI2AhaSR3uTYF28KDwdS1RMUf5qcXBZe9sFY8cp7QMfvZqsUEgGrsrnfqArDMTGseJcG1kYUfV0bh10qAdoEQFfNmoRDZjq8Snk8msMYSUVA61qKJ59xGYJBWqD8KS3dqQd%2FW%2Fg6yCoWe66B10FW%2FU51QPibhpFNL6nXvMo3Cng0ru1lSoxupMTgQ%2F%2BHbnGeFIiDdK0GczYU5NupNUSwQBk7TZlTJlxDACf3QA1QSF8LdAS71CoHjbdViYyfFIn8IUC45fCCrofk%2FwVou2njzKdZD%2BXtTfnnfDA8zOI8thrbKE%2F2qzkGL%2FlRHFf0kdDB3yef8f1go%2Byc33wYWcv8ahHeji7y20JKwn8qMwy1naHuZrbr7exEYu001FctkZtS6Uuk%2FCV05wwDXNRMnwqQHv5e4brRbUKXk5vivBYxqpYWQOgZtPu7MzaAirowy70dwDO13Vd33BRbPEizfABX8x0wx5KfzwY6pgEcuYfBqLzwyHmKzrj1igUGV%2BAnyGeLUG0v8uVMav%2FFpohZKkZ7OQOzsYr2BrVjUvGAgXbef1gQ20EYhNELMpHB0KioFjecVvcbtzTccrGFfx0nhMqv3pUhULd%2Fant4yN6IxEnkVmCHP2Ph8SfYUbqC8vC3LN6jA73uSsCn5ECLNvkmqc3Bke6kaVsm34kmBHRQbYVGMKjm0q6aOzlHjLr%2Fgi%2FVenFB&X-Amz-Signature=d7cd9bd37cbca410c9b941dcaa18987b8c80738e47f362026e0abf7a664c8203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5C5KKGA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIHE%2FjIjG1oVcHnm%2FMp4yNgmpTwd8ESB8Cl8pLKuqfHfJAiB%2BcjPc5J7dMdcwPa6YNnC%2BMwistStEX5fW8JgExRXTHSr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMxbnQ7pjo6ssa9QlRKtwDeTwek5QjQ7jIfCj4aRVL8s%2BU9m0iP3dwbAKq3ycAqf077I3AsXujV0%2Bd%2F5cBHQgDFvrL2RtTI8y63NtgxjXvsKws9h1STsag6tWRP%2BW%2BLkj%2B25REK7GHwfpk5stXZqUVtjcaTuumHqJDSRSpBCGvQarL9urpJTH%2FimE5XI2AhaSR3uTYF28KDwdS1RMUf5qcXBZe9sFY8cp7QMfvZqsUEgGrsrnfqArDMTGseJcG1kYUfV0bh10qAdoEQFfNmoRDZjq8Snk8msMYSUVA61qKJ59xGYJBWqD8KS3dqQd%2FW%2Fg6yCoWe66B10FW%2FU51QPibhpFNL6nXvMo3Cng0ru1lSoxupMTgQ%2F%2BHbnGeFIiDdK0GczYU5NupNUSwQBk7TZlTJlxDACf3QA1QSF8LdAS71CoHjbdViYyfFIn8IUC45fCCrofk%2FwVou2njzKdZD%2BXtTfnnfDA8zOI8thrbKE%2F2qzkGL%2FlRHFf0kdDB3yef8f1go%2Byc33wYWcv8ahHeji7y20JKwn8qMwy1naHuZrbr7exEYu001FctkZtS6Uuk%2FCV05wwDXNRMnwqQHv5e4brRbUKXk5vivBYxqpYWQOgZtPu7MzaAirowy70dwDO13Vd33BRbPEizfABX8x0wx5KfzwY6pgEcuYfBqLzwyHmKzrj1igUGV%2BAnyGeLUG0v8uVMav%2FFpohZKkZ7OQOzsYr2BrVjUvGAgXbef1gQ20EYhNELMpHB0KioFjecVvcbtzTccrGFfx0nhMqv3pUhULd%2Fant4yN6IxEnkVmCHP2Ph8SfYUbqC8vC3LN6jA73uSsCn5ECLNvkmqc3Bke6kaVsm34kmBHRQbYVGMKjm0q6aOzlHjLr%2Fgi%2FVenFB&X-Amz-Signature=d7cd9bd37cbca410c9b941dcaa18987b8c80738e47f362026e0abf7a664c8203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPQGCQFU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCrqyay%2FHW8ZXfewyNHDmGuMXzqlZXLMEzG5uLFQNLGOwIhAIIs8xmHBFconBE3jgs1SuWVsU9PzfJDsvRdOHbhjQfcKv8DCDwQABoMNjM3NDIzMTgzODA1IgznPFEwgzi0d1t1lGgq3AOP5tKHiGyjMx%2BLH01MfpcktAuWSRbfXHoJZMRUYJs9yJ1XANLKVTt65SqhJpfLhrb%2BVWPZuoys%2BUBfcz1gPNB4r3SbGFpvNcT%2FLpp7VVqFT5kOJ3%2FB0GBsLc4FEVE%2BbZ2qU5nhtDq98CuXqXxv%2F4qkhhYG8Sf8y%2FsmcyqdEZYwH7l9UOf0e1h%2FIVrDOVEzmdIytFdpxTzRoKAHe%2BS2CZXaOoVTrzRUcAs5wOJUQ2MFXl0tQYsYnpje7xiXpK8QKcI%2B9J7lnAFRjQKC9qdkSHutkCqG%2FpyHYl0T43LpJ%2BXNNimcr%2BsF4ynKRS20ilm%2B%2Fs0V4V0cAzDZ2xKUe82abqorLB3pVBFXM%2BrgLxXJgkbDvdgxIjsK4DTs9GjKdLF6I4JoarsCS9uYO39nd6S2y6VIrNUIh5fYcVyv0nvS9gbx7wfL7tKCTDMR3JW7xYR69t2qJG8HHB5gC1QqL16GRWxh2aISf8WbAMBdZtrY04bdPMF%2F09y4Ey2mX%2BMh8qYlN0Ke6mN63DbU2wrkS5KOOggmHoamERb6qTG9p6nl5k6QpQpzwRTZoWV23Gl5pDOvWLke0x2XSV3ESEKxG2mwrmFgQwXdYxtZkm17TaN%2F82PaLxTWOO%2Fg7lEXtv1JMTD5kp%2FPBjqkAZDiSYC%2FD%2BagK3Z5yHB1vkia7jo2UhsJvafaYG%2FSBK%2Fuan2ADMLw5Mja9mXTVw3%2FBU2r2w3QC81C8UDGmt9rhmbc%2ByUYxbyVBd1GxB4pCTPOOZp9R%2FKHYnnebDw%2BUTYlHHkfnGjp8SqruxnUgE%2FSdiA%2FFssAwjiQXSYxrTCtgAs5A8qC3kZ2FNPXiVDhdbz%2BmaL1DbEDaZ%2BgKo%2BfRovO4uoOgT%2BE&X-Amz-Signature=e0c70e8eaf2b337fd87718e6c70d24fc27ab74e4aa8da1a109d4f9e6cd977e23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627ZVGNN6%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIBtkmvLv2QuFFamLGXVOCxYa27SALBOe4rYLYDPbqsIrAiEAtmGLXAfeZXdeuJLNVNA761wpyBJiCrHaFAd5tQs6bfcq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDOcnuUr91qxdJcQDSyrcAzEeR6SYZ%2Bk17L7AztZ3d7plZp1Tfss3j%2BDu4Y%2Frcb3imVEy7I2%2FaEMiGltoSvzyOphnpoW6TLnTnZuCeppfIjt6kKgAZQ6ZZEdKt5eeFQNsFwDCU9xkvWmNOn%2Fz5isvumCHP89UNnwyl0p%2Fv05%2FpetANEc9ujNMdyrre7zFCfYVE%2FBgB5AKJSHq0ebc5HUGY4dHSfrwuHINHK7rQOw8r361snjy8v0iNuhKnGqpHL8TGfU0VdH3a0cRXPjVyaadWMpic78A8k9jcJq1Pw%2Fm5mY9bTZ7j1AhAB2tx8A9nF9HqeDEgCuR%2FMFP21bjL4QBTEbvs%2BWrqBJQk3tM29ScxbXO%2FuS%2B6YIxzZ3VJry%2FJ9r1X%2FOhY9TfKACSoOlhkeU428iaqCgoRMWGis7ws0scsYFWc6QYzmY5AHpzswMdFESBF2by4KxThb3pTS0pn8RFYW8LaXbdMmdk52xbioTKoWBzYh%2BMijd5hjJxXr%2F3KmWCLtRvKCgIf5fXc3i1QdZ8Cl0w3DOquHit8ni0COirfEpcbebdokdVQbX1G32u3X4mwj7nvtod5w52g5M31G9DLZDm8W1pltGXTr8bcDINCNFt5ZA2AwbUzF0pOX9gATU2hsPyL1%2BtzRi9Sf0XMPaSn88GOqUBj8c3%2BD3X%2Fv6IMB9zQ52MEcUAk%2FBTU5z0NbuAylKErLmORsw4kv4IJSgVfElvWo4r0C8RapluP4EHm6FYWLL8pZtyPG5DcXw0Bf40l%2F%2BZjGk3pSBC1LQ0mmPMqEph4aDhWPWZagkkaPjMf2uJSknCno0WOPT8ka5Ll5WnDhnj%2FOL9wOkZ00fyXdP7T5BBsvZ6KXjXDXM%2Br5QfqLTqmmxpgmqluuyt&X-Amz-Signature=b366071a6c15123963e08f36bf8b2b26d0b2a2fcd75a4b4718d73fa75f45d3f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627ZVGNN6%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIBtkmvLv2QuFFamLGXVOCxYa27SALBOe4rYLYDPbqsIrAiEAtmGLXAfeZXdeuJLNVNA761wpyBJiCrHaFAd5tQs6bfcq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDOcnuUr91qxdJcQDSyrcAzEeR6SYZ%2Bk17L7AztZ3d7plZp1Tfss3j%2BDu4Y%2Frcb3imVEy7I2%2FaEMiGltoSvzyOphnpoW6TLnTnZuCeppfIjt6kKgAZQ6ZZEdKt5eeFQNsFwDCU9xkvWmNOn%2Fz5isvumCHP89UNnwyl0p%2Fv05%2FpetANEc9ujNMdyrre7zFCfYVE%2FBgB5AKJSHq0ebc5HUGY4dHSfrwuHINHK7rQOw8r361snjy8v0iNuhKnGqpHL8TGfU0VdH3a0cRXPjVyaadWMpic78A8k9jcJq1Pw%2Fm5mY9bTZ7j1AhAB2tx8A9nF9HqeDEgCuR%2FMFP21bjL4QBTEbvs%2BWrqBJQk3tM29ScxbXO%2FuS%2B6YIxzZ3VJry%2FJ9r1X%2FOhY9TfKACSoOlhkeU428iaqCgoRMWGis7ws0scsYFWc6QYzmY5AHpzswMdFESBF2by4KxThb3pTS0pn8RFYW8LaXbdMmdk52xbioTKoWBzYh%2BMijd5hjJxXr%2F3KmWCLtRvKCgIf5fXc3i1QdZ8Cl0w3DOquHit8ni0COirfEpcbebdokdVQbX1G32u3X4mwj7nvtod5w52g5M31G9DLZDm8W1pltGXTr8bcDINCNFt5ZA2AwbUzF0pOX9gATU2hsPyL1%2BtzRi9Sf0XMPaSn88GOqUBj8c3%2BD3X%2Fv6IMB9zQ52MEcUAk%2FBTU5z0NbuAylKErLmORsw4kv4IJSgVfElvWo4r0C8RapluP4EHm6FYWLL8pZtyPG5DcXw0Bf40l%2F%2BZjGk3pSBC1LQ0mmPMqEph4aDhWPWZagkkaPjMf2uJSknCno0WOPT8ka5Ll5WnDhnj%2FOL9wOkZ00fyXdP7T5BBsvZ6KXjXDXM%2Br5QfqLTqmmxpgmqluuyt&X-Amz-Signature=7c971941f588c11b42d2d16957d90396519f52d553f4822a6864b944b2bdc2bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVOCTRI5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCICz3R1hsW%2BRdrXZ6WpdqmhVztHWCsLySWzZ82GHxe%2FMZAiASZscILhIM2qcaX5R5FxKdSK1%2FBpZWKMq0h1x7%2Bh3vMir%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMA10JY0qoYSUacftKKtwDx1jgAkufupFpXc5vI5IGmiwS9ZNtIybOWc8teHS61T%2BiBAXm8JeNVEZBc3Ny9pssK9hh3RHHqXE7oBI%2B5zqaNsN3LjcIFgP%2Fbf%2FDME7CpycH2sW%2FZYuLkIUb%2Fp%2B9PRAM1%2ByFnNlgcYncUGWl23qFUOK%2Bsu3UCRKOjcFJGPWciinLPxIfNf2ipXvxwosj63%2FRIutl3QR82wQlVqiNMTMxvAXRX8we09ntFtB2s72RFDi8oCBzb%2BQcSkvlDzGv21sCBPxdbhm3wSigIGvZuTq0G%2FSY62qwO9ZGLOR7CWaCSEsnTIBpzU8R3gE3wC%2FdZlmPm%2F%2FsZx9Dv%2B3RoB%2Bkq6i2q5CJ3avmr4Eb8Nn5moaT%2FD%2FdtH1yY703Ff6a951jAEA0FPtKIfFl73zuq3UJYxTKVQBpWH6gwjZel7OIKleMXJw9B1e%2FjMfb8t0u%2B4RryJKRksD7eWkawZ9Sdb5uCUeSQiZWMqbDnUhrcxi905F1z3nWewAPrZsJHqZdCL8grMVnGfLrhqi4zkuHcaldGFF4oyXeaGDX1APgcrWCpMi3K1xoDX%2Bvqs%2FzJ7u3E8WNpPY9sUuzYM%2BE5EOMmZ3HhgoP8AUSeZh2G60TEH%2BUxcudGmGmItnw4mEPQo05JHIw4NqezwY6pgHwm3ZVehK7ONk0gGoccm6KuIVpFJWf%2BqRTSjW9LN37jMlMNWWnuhhJzRbvuI62%2BdM8lSlTLVvDVAC8v%2FffHlDHuLW0M4WShIeG7iHEFO%2FhFSAdyUgj9y2zUWwfKpoYBQ3i1WkTifDYRyRzLnDfEG4UxpuNvcUh6xKZAwue85vBDsQcRtaUTF9jt8bCycdnxQlmKOr0w%2FMBbnyjbL7S0egoJ8vwNEvy&X-Amz-Signature=e9b95c4ed3f11aac663c1bcf4a48bcddca0f2b51f8d5969b21ef5b98f7c487ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDOSWBDD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQC9csG0bHdGdk7XAWxyDoK14nyFDUnZ2OL%2F9AKXOOqgpQIhANCNpvbbi%2Fr48czDFYLScjFVpj6bDQe5pTBOFyOPNpLUKv8DCDoQABoMNjM3NDIzMTgzODA1Igz2fhTj970MgstBcG4q3AP5bi6GYgaMILO%2BZNS3%2FtLNtBk%2BJlhWRxrhYPoF97JlB0sDvNG59og6ZAPzL8gxz6AVC9KgT8gB9diw0gg22xTdsmyfCAkEagnv13QFvMSqUHB868WQb15zcTyccX1uhHMiOt5BR7LAMd4LOu97AWGQx%2BVAHH7jLjKVSw4KuUoqPAyJsX1J6vHFCblHIqPv5xLtQDAwWG8QorVOQnObrVmYn7ymb0%2BqtFWbKnC6QihEGrUm%2FYJPLw4jsR62XdbcFC1M6Jrmw%2BmPrhNWvv5Dbw%2FS8OYwh5iidN7vIb3V6tHhzpGDRuqV2%2FKhM0fk9nL02CbKJQzpH2PAQ4CMj3Uk5Szx0h9MvpQElYFnsHr3FFgsF5A0pNA0PEaqDVo2c0ut3X4NliStsgeY9zYsXcbkUqumgRcSINUui4qTuDq10QVLlKfja2fg5NBBOuP55zrF2Tni1HKxjWb5tfFqY1EF9KJMpKCZU4e0%2BkcDrYB1PtfP39txoovw%2Ba8LeV0vEoWMrs8gDbbTthh%2Fph6PGRjSsWmFRAQcKmo5S2nlPAE8sQks7MBnesFD0NU%2F283yfiWYXUg9Rl0anUEK3oJ7L5%2BM06O0nP9m9i3qGZFG8r7dv%2BUX2kI6RIOdImPklzBjJTCc257PBjqkAaTGWGkOsH86UCZzYbtals%2Fk5TLiOwg3%2B83tvp30JuOAeRJieY1Y%2BS8RJfH8QkOLvyOJdvDvMRnMAD0zKZh4zTaz2JqW0PZ7%2FlZID3cCXfsUMRscgpIIfKF3ZKBW%2FMlVSeyNxr3cznMLjUH%2FgNQHHAXBm3P%2BzG21RAIWyOfwCU6IEbxYVqMknMxKLW666mwVT5McEIz7XbQGhQbAOGSuG95MMInv&X-Amz-Signature=f5646c1229d08e4ca781fd71435d55bd26ac93206119432fd88c2e8de49c5f18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WQ6ITSY%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIFowBDhBp%2BxUx%2Fi316ghrK3fpiX%2BXbBxYzqGcoTI0UXMAiEAg1JW8sgcETplf4IhcxK%2BWxylIaC41AVQdVrsOEBVBjYq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDJDpNS7R%2B5hPFUyrVCrcAyfrVf1CMpbEnxxtdYtZR%2F1Hrue6gz7mEl1kKfnJJP3rRba0CdatGsQGp83d0LY%2B0L8S9Nvp0GTZ4aJBwFpu9JdIZ%2FR464K99RdMmHKPcwoMn3w4t9RchcOMJ5mxql8qxfL4a%2FFrv9fw9AgNBwfLIt4%2BK7MH15jN6RS04jxA4Vutzvqg7Gg1UHktuUA5KG4drg%2Fzo88ib6O9n1QJ1O98VmM6UynZFw%2BDh%2BwmsHdkaRxmZMbouy2LibeWPSewZqNhr5ENdUkHoPsi4WrCorqKk6UPLjwUXNBXfjXCx4pcBXg2rBCe6kA6ZMoMBjwdJxEoS94DAT8NuKQlxdsTzpyXkCfH%2BxxKV6jCeWCtLFUPixXoP1PEcBoUQcIi2OmxcP0KAfu536cPDKQlRwYY4bZFtdQVq%2BM83FDNX61EMEJMxKL61mqfA7Jb9VwSo8f%2BsbfYqiqbO%2FkzhDgqg6qYDJuvAof00KcNXT6OAEEjfvze%2FLoNLp%2FbhBOxSxrBbeZyCjPX7SKB7NeWDBhKA%2FMdc4k2bxrazSL14%2F%2BNNrdFA7Qqy%2FP7egs86YVih3J4aaZal%2FzZ%2FxC5InvSqRe2UmUUmQrLJoIGXif984v8DIgW22zDVaKM%2Bzb44HgJ8Y%2B4sc%2BZMOyRn88GOqUB%2B9rO8ykhJyjG97L6Z8zZYqUqHa31xUvzrFPSmf6d%2BdilNR2FtwmdDw4GmJY5IuFUFnwksMZiytM4zSSb6B3ocXUkbTk9NHStIIj3kjq74%2FU8Du6MF4629ioMTNZd69mdpGW0213Ct1SiS28or2FZHnHPwiAZUg1XF3QBOXDIVfIB0HOvxoEQuCCG6xnAq0RMqPUmmb4j8dXaHOcbHBZfzQwlJtLK&X-Amz-Signature=ae1a2334f6a2fea6d3494e6be8e62a0e5bb786fdd281f2509d4219083ce41b5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSFW7WII%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQDt2LHLV0LK825mULipJzF2N4NGrEywrZWe67%2Flyw1GtgIhALN5vrXtVHtqoJQb5EjnHM67gwOFtrSq7SUzKwLworuwKv8DCDwQABoMNjM3NDIzMTgzODA1IgzQ%2FIoIG7QNANms880q3AO1ILbUHhaOslmFIoobdt%2BdFRgDTMI%2BGpwHuPkpU6yPU8ZnuENM1FT%2FnxEoZhKUY5gXXnhAQrgu5g52rHbclejeEpTxz8a4KWp9eQ7PxWOIZQDFKKOYzFTrNVdfBSp6quesYMhn0TIDRocy8wSVxd1puBMk1Lf597CgPzxVaQNgCIIunN77yESQHVydsitdR4qPnxI0n50p3Xh2FAT%2BKCzQ%2FWtV0D7erBppiwl1UUOUaY2pJ9NWMI8L7PyiGW9qAWgwQ6XqHwAfL9Ty7TUN126oKjbmgrtQQxGEWjpnj5GCm%2FqLEzwWEPsFsloz50lz30TYTM6nGlc1UxSIlSfsd7EdBEsIKAJOeRQ6GX7C5x3B4SdGKf7pj3WYKvXSI%2FNJ8UXagD9hBRZjSlGX1pX6bUGTA4JuAz5bkH9msXWu6sp3iSwI%2FzR88ipkCC2KWUe8maVYNsibN2cF6DDAoQqUCSWula1z%2FpEqnRbQsys3GLVf59Xr3pj7iJXBUybDdNz%2FIvbsPSrChEeuEnf3EO3MFZEk%2BhrfxmCTPVbhIt18CzZ489xghpePk0EaboW4cjhkTmVhoiC0Hq13eUP8x%2Bdb2GXSfEGwSmnCmyhHAUgvL1lODNkf%2Biuwo5lyrk0XuTDYkZ%2FPBjqkAWc6l%2FUs8LQQmdC7fzv5bsORB7BcBbD7FGQX0H3bgCixocBx0OslpMC0OIiY7z%2BeBzmzJpyn7hlOZf%2B03tW4127aiJLqEPU3WthApIAdUPIyHX5QFUl%2B5US6dxGWR5ng1NXoIcXU9ZgfOBXCZJ9CyxsLRcCAWjZWMXDkQo1880wmR5MwNjiDberfvaYT7Fech7EQ%2BTprEfFXObAaeG0VlycOk82O&X-Amz-Signature=e60429b0c68d169ab376124c44d0f1799e286acfd78fd225ac0779b2bbdfdb74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSFW7WII%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQDt2LHLV0LK825mULipJzF2N4NGrEywrZWe67%2Flyw1GtgIhALN5vrXtVHtqoJQb5EjnHM67gwOFtrSq7SUzKwLworuwKv8DCDwQABoMNjM3NDIzMTgzODA1IgzQ%2FIoIG7QNANms880q3AO1ILbUHhaOslmFIoobdt%2BdFRgDTMI%2BGpwHuPkpU6yPU8ZnuENM1FT%2FnxEoZhKUY5gXXnhAQrgu5g52rHbclejeEpTxz8a4KWp9eQ7PxWOIZQDFKKOYzFTrNVdfBSp6quesYMhn0TIDRocy8wSVxd1puBMk1Lf597CgPzxVaQNgCIIunN77yESQHVydsitdR4qPnxI0n50p3Xh2FAT%2BKCzQ%2FWtV0D7erBppiwl1UUOUaY2pJ9NWMI8L7PyiGW9qAWgwQ6XqHwAfL9Ty7TUN126oKjbmgrtQQxGEWjpnj5GCm%2FqLEzwWEPsFsloz50lz30TYTM6nGlc1UxSIlSfsd7EdBEsIKAJOeRQ6GX7C5x3B4SdGKf7pj3WYKvXSI%2FNJ8UXagD9hBRZjSlGX1pX6bUGTA4JuAz5bkH9msXWu6sp3iSwI%2FzR88ipkCC2KWUe8maVYNsibN2cF6DDAoQqUCSWula1z%2FpEqnRbQsys3GLVf59Xr3pj7iJXBUybDdNz%2FIvbsPSrChEeuEnf3EO3MFZEk%2BhrfxmCTPVbhIt18CzZ489xghpePk0EaboW4cjhkTmVhoiC0Hq13eUP8x%2Bdb2GXSfEGwSmnCmyhHAUgvL1lODNkf%2Biuwo5lyrk0XuTDYkZ%2FPBjqkAWc6l%2FUs8LQQmdC7fzv5bsORB7BcBbD7FGQX0H3bgCixocBx0OslpMC0OIiY7z%2BeBzmzJpyn7hlOZf%2B03tW4127aiJLqEPU3WthApIAdUPIyHX5QFUl%2B5US6dxGWR5ng1NXoIcXU9ZgfOBXCZJ9CyxsLRcCAWjZWMXDkQo1880wmR5MwNjiDberfvaYT7Fech7EQ%2BTprEfFXObAaeG0VlycOk82O&X-Amz-Signature=55b3cb54a808d2282c4f411d8d55b3bedb6f5dff24f9215be6dbab3507a731a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNHCORPD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQC2Qg%2BARQCDiQ%2Fi66LloMa3fRGkRDiVnUwL7GFNra6bbgIgFyvBlzq5q08njCvjz0f3qmZm2JYC%2FjQetT8bu0pMILsq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDKnVJh4xXYyPnobNDSrcA1rEWoItJNOlcXti9opsgdCL1CBCePaR%2F9NXjIogClckeey5oIF%2F6w7EhrxmoLbe2PHM30ow6e0qCeIJRygGi%2BOd0ojYGaJxiCo8Wosg%2BXBXMpSLH3r%2BkiqgDzXW2riTSmPXnSIdaQR0i0sUCRypHFOLUtPOIg7GkChPzNFrIk12GWik2kkdUr9nvuqCZz4sYd7oIp1SGK55ENOVjwKgDMc0ZLK6m1u60LI%2B0g48raKirpJ4zH0uHiABk5D6drTTPUhs9Lrwf%2FZDy%2FisgYGrKYqvK2%2FH4r2KXohdIQ1SnU312K2mDJ%2BkyxtFlxK47LI5DQhtXEsItJl9VdaJgL3waIbOO%2BWcjY66javN%2F%2FgZcCznTlyuFmhhR%2BTdxs8HBCSOnkYh9d9wXpyspuMEU%2BXBeawY%2BS%2Bpcr1ronr2dae9NtN42KzcN%2FCaiQDbXn1HU%2FJ8247AzWqCYjsK3TB%2FtUE4e1vF8H9M%2F3W%2BNnyEpfdBEYMi5yZa%2FPimwZceWtpjNS%2FkTKbNFMNnsi3XmMIVRrrOLp2pGgMfs161NbR2O1NZVhH2gWJd5KM%2B3jQeHQvIRdyP0Shf7NiSa8sXXzhcFbgtSVmeguklxw4Tx9dLBfpyGEhM8er1Icz7MBXhz758MI%2BSn88GOqUBvPWaB4W28aZFCSIhVBgDyAMZjbiuoQhL26DXgaa3RoPwfDdU4IgY7iWzF3VA1qtlx4dHqmRMfHNpyQ%2FuDhL4CttW45TwfFQ%2B7ZQUnSafI0MAf6%2BMjsGulwRPraM7muMJJ3E%2BbGXXBGxOnFfErVH61UYzThEgiziPIGrHBgg001MVZ9VW4%2FUUkkO8nNvhdEMvzkkfIl%2BJLJK6F81VRfJwx0j25Mug&X-Amz-Signature=36d4d6a36bb4415f92c895b92d2d1347c34c97c3c1f2d202edbb748b5b1fe03e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3DCZ6OU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQDNUc2ohGNtAc2jKOfj75UINXTpj42ephmtfOTZe6CNlAIhAKWkmPMW6Uzl8e79DSWDCJEytKT5Dya6kaL8GGDbyL4jKv8DCDoQABoMNjM3NDIzMTgzODA1IgzSzlFj2Y9EDNUWNkEq3AO6%2Bhn%2BKJF%2FEMHEabyraJnaNpNCT29IZI7EBBHbk5xVJB781L3REv8SkqUhu91pFEvIsRVFjOPOTPlJhK3cLkVxzvLPrDOkJKkFN87UBOJBko%2BOH83DVukLTk8Qx2iqsZ9BtwS89bi5OzhqXDjJNIwnEoS0aCJaH%2FPOh4IJvT2BPeEe%2BCozNRMIOrKogFoS7nkiW3Xj0TyMYundzWTVKqRIbp6D6JHuARzeF2WgDi9Z242k6kw184dIkh5lR0fXbVN%2BsMZSUz22O8v9awrWmazPWUUiUsozKzjCwp6CkoAmtn0DYUhsacw5ggZi1L29X36IwYr95ZzDViYu05EmOkBLzkcsFg8g0wxUy1mJt%2Bj9bZsFzWSQ9Kchv9OXyof8f%2BEkJydgTC63NjVCosUxBBNljZAV4hpqVP9CbK50AlUS7g1CNZ3X4roDDBS3CAf4L6ggX8BcwL5AoU%2F3ef5EKmJs5K24Ytck6bkuzZe1%2BUYL4qRQe1QWLG0UK8Dsfs3F8f5bnqxOVQ7QFqZjIgrBjFEZygY6i4bQnIiU3BfloKOEuI1XOwePGvtQ3Lyy9Da90ZplUJwGdglj8YRyPdcbChYxajFZ0Ucr%2BF2S0B50jwO%2FsVZ2RCiObloyckVtSzCb2J7PBjqkAdJGIVQOeX58lOQHbxUyUjDhBuzh3h85T5BaYz6pCguV0GFYXiQtzZsyEX67mOa6pp0aj31qqLKZmo2u%2BhxDD%2BBh2U5Jhg%2BfB2LWIR9038FB9ZFE7A8T4ZQL0erSMDR%2FxPbbE0415rtJxcTBe26%2BI22ihT6kPuvYDnEriT%2BYdkqbPjgp6ggCTv8DZy4tNCTAifbIjKh2QQNnxTsFdvpJ6A6ZXjU%2F&X-Amz-Signature=38d803c0373ecdbb1e6b55131198c8979ce8dd1adf24c4fa46f1734411bf2007&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3DCZ6OU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQDNUc2ohGNtAc2jKOfj75UINXTpj42ephmtfOTZe6CNlAIhAKWkmPMW6Uzl8e79DSWDCJEytKT5Dya6kaL8GGDbyL4jKv8DCDoQABoMNjM3NDIzMTgzODA1IgzSzlFj2Y9EDNUWNkEq3AO6%2Bhn%2BKJF%2FEMHEabyraJnaNpNCT29IZI7EBBHbk5xVJB781L3REv8SkqUhu91pFEvIsRVFjOPOTPlJhK3cLkVxzvLPrDOkJKkFN87UBOJBko%2BOH83DVukLTk8Qx2iqsZ9BtwS89bi5OzhqXDjJNIwnEoS0aCJaH%2FPOh4IJvT2BPeEe%2BCozNRMIOrKogFoS7nkiW3Xj0TyMYundzWTVKqRIbp6D6JHuARzeF2WgDi9Z242k6kw184dIkh5lR0fXbVN%2BsMZSUz22O8v9awrWmazPWUUiUsozKzjCwp6CkoAmtn0DYUhsacw5ggZi1L29X36IwYr95ZzDViYu05EmOkBLzkcsFg8g0wxUy1mJt%2Bj9bZsFzWSQ9Kchv9OXyof8f%2BEkJydgTC63NjVCosUxBBNljZAV4hpqVP9CbK50AlUS7g1CNZ3X4roDDBS3CAf4L6ggX8BcwL5AoU%2F3ef5EKmJs5K24Ytck6bkuzZe1%2BUYL4qRQe1QWLG0UK8Dsfs3F8f5bnqxOVQ7QFqZjIgrBjFEZygY6i4bQnIiU3BfloKOEuI1XOwePGvtQ3Lyy9Da90ZplUJwGdglj8YRyPdcbChYxajFZ0Ucr%2BF2S0B50jwO%2FsVZ2RCiObloyckVtSzCb2J7PBjqkAdJGIVQOeX58lOQHbxUyUjDhBuzh3h85T5BaYz6pCguV0GFYXiQtzZsyEX67mOa6pp0aj31qqLKZmo2u%2BhxDD%2BBh2U5Jhg%2BfB2LWIR9038FB9ZFE7A8T4ZQL0erSMDR%2FxPbbE0415rtJxcTBe26%2BI22ihT6kPuvYDnEriT%2BYdkqbPjgp6ggCTv8DZy4tNCTAifbIjKh2QQNnxTsFdvpJ6A6ZXjU%2F&X-Amz-Signature=38d803c0373ecdbb1e6b55131198c8979ce8dd1adf24c4fa46f1734411bf2007&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JK6XTGR%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T190347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCID3trSFEKCzPypBTEX3vsBwk7z%2FELvY6HaQRCJmvZBl2AiEAjXFdpXqZ3UP4WVuQBWTASvDDWmMRvNJKhcg0q5qQAvIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDBXGVcKCtmfKRA1CBSrcAz9%2BcutI4uoUFGBjdiecfgrPYCyaukkutAZvWdahMRqFXOAcvw7O5a582A811vhKDMpDLwzgi%2Fs0cCqmvrJOvuW40NPBhkbX%2FzUSrsw%2FKqRuDHZXw4SRlLSeY8k1zp0uQb6a5BkVKedzawpHnh%2BPvYedthtX7uTlrpGVVXmDHitlfPFmQkDIgKfJmD2rfX7UXGNj88P5OBoDDTKuaTeMIyVCCj1awoyEIez2HPUhlIpzvgZcRY2hVwoGLZctEqNcgVbV6F%2Fkxj%2FcdRR1ZXfzXaCJXwAiG3Kyp1SwOp9uNM%2FL9fXNIeFopw3ZV1vKYn%2Bd6P%2F4tIRWVgGG0QKS9cR%2Bl0NgWj4dQ%2BTE3ASESFFqU5Bb3dhU%2F9trhhyKPfPfYvoGmsxc2S3TlEcsozhpJulfJa%2BqNPcf91wsOcjoDq0B5ZdBkjbGJ3RFX9d723Ov0oLAg9jvkdrkhwAAGC5QBXlU55SdB%2FJFJeDkbWCgEmxg4MKmXAsyhu8UpLMrzCgiBuPD8fD2LflLvMJGE5MTReYnIXbhRRmhQ%2B%2F1kDY1fNJli7%2FinIJ9y2Zkzf8NwOSsq12iSMAlvn5V5N5nD2ryUuW5svmpsFlo72UREYSYXgS%2FNrFA9MsyxCJqrvjS2wgdMOjYns8GOqUBzCeXvP0gZJtRNqADHWQ%2FQ%2B8MrZBvNVOJhu8rpYobU9qQr9NLdbslEdtPwCioQ090%2FV9FmgGTRztrWd4YHnvV1%2BN%2FfRqqtemA1gI4%2Fv15MkcMSmdkx%2FqxmvF4TgxW1rTj%2B8LXkhaEIgWdF2TGTloURBqkoEQ1vY6BrwA823sC5GamEioh5baYsMKStELkdlgaG281%2FkhI%2BiTBQvo5KGg9OO3tmrTA&X-Amz-Signature=f2b3f673118d8d0cfec556b87c3b75729ea2be29c975987bd725b451dcb9f20d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

