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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVZSQAFO%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDB0BP4jXjXuwE%2F8xQHbcCigiTpPRrdUQag5ziGmcHzkQIgDpijwNIfiS1fau2dDgcZQzZLeZabxrENXwYd%2FdlkHKwq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDI5vMR0tYYfDxDJSxCrcA2kSxpzJqJjv%2Fim3vnYgfDMGmu1wKfRBFLtuse%2BoKHdRB2QAGPBsVwPjzLKYGS1YKcBWejxk7YKnS8hX2h9%2Fzo17zRWRjXQHsMhO0ZW7HLcWFmeEPC2X0ktYcutqlTMGsbDYBB4174QzJtoTmKfAjAV5lBzwjww8s%2FV5Tu6898IfFoGRKCuX%2FlVlGyzmCh61pGIt%2FGGZjQSichevFd9jX6ZF63ROLN903S764mrWGFwUAlFSVMZroUYK%2B3zJxPELzNGOlt55azlWtdBJNVA8v4nkvTcG2ton8Nde%2B2af%2FZsxJ9DSDmDdV75i5w3GL22PyySLfgOLH6TwGqPm7%2FewQHE9SDGfNXfw98GcRNdV4fGV9nbMeOLXs02dlcNJsi7dXLDoUuiqU0qN2ekW6POinTxjghQj%2BhVrd%2Bn2LtMocDb7MLqSsKhIizcmZkN%2Bx%2FESJ074c2LBAV%2FjhPOtPMDu6ksi6SGezbQFIAkNtp7eGzzIj3Rff4fEKbZtDbYPIWhlu4B5FZIGfkeJgjAv2UBh%2F0N5AbhM7aVSELD8DY9C8XyD5tZIlm6eFIG1FSuHsv7dPY3uJwFF%2F8LtsHp8Z65PZuUNpsCsHlNR0YGrRPwOAeq9Bt6ISd0McPMagVgGMIH81MsGOqUBcLz40uVYMNOSdi0q5a1jSrTHPTGFFvlvj61z%2FDRs3AaYtNigldsfmWAqHZXPtKSxM1ffJ7mb5WrFuUeYH35c27b%2Flf%2B5xQp%2FSGqqjU%2BacCuVBdo0H8wsGPGBxqfdT%2Frpv4IbKtOKGxZqZIijfYN4EwVz1t9FRTXasTAU80GOjK8q1X9YOzyYft%2F4D6Dj1yJoJwrVxeoBSc5Ueucu6mG99KWFsA3d&X-Amz-Signature=81deb717450c005ebd03e147c8dbb7bd9341f663169e7732d1a5156aa18afa8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVZSQAFO%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDB0BP4jXjXuwE%2F8xQHbcCigiTpPRrdUQag5ziGmcHzkQIgDpijwNIfiS1fau2dDgcZQzZLeZabxrENXwYd%2FdlkHKwq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDI5vMR0tYYfDxDJSxCrcA2kSxpzJqJjv%2Fim3vnYgfDMGmu1wKfRBFLtuse%2BoKHdRB2QAGPBsVwPjzLKYGS1YKcBWejxk7YKnS8hX2h9%2Fzo17zRWRjXQHsMhO0ZW7HLcWFmeEPC2X0ktYcutqlTMGsbDYBB4174QzJtoTmKfAjAV5lBzwjww8s%2FV5Tu6898IfFoGRKCuX%2FlVlGyzmCh61pGIt%2FGGZjQSichevFd9jX6ZF63ROLN903S764mrWGFwUAlFSVMZroUYK%2B3zJxPELzNGOlt55azlWtdBJNVA8v4nkvTcG2ton8Nde%2B2af%2FZsxJ9DSDmDdV75i5w3GL22PyySLfgOLH6TwGqPm7%2FewQHE9SDGfNXfw98GcRNdV4fGV9nbMeOLXs02dlcNJsi7dXLDoUuiqU0qN2ekW6POinTxjghQj%2BhVrd%2Bn2LtMocDb7MLqSsKhIizcmZkN%2Bx%2FESJ074c2LBAV%2FjhPOtPMDu6ksi6SGezbQFIAkNtp7eGzzIj3Rff4fEKbZtDbYPIWhlu4B5FZIGfkeJgjAv2UBh%2F0N5AbhM7aVSELD8DY9C8XyD5tZIlm6eFIG1FSuHsv7dPY3uJwFF%2F8LtsHp8Z65PZuUNpsCsHlNR0YGrRPwOAeq9Bt6ISd0McPMagVgGMIH81MsGOqUBcLz40uVYMNOSdi0q5a1jSrTHPTGFFvlvj61z%2FDRs3AaYtNigldsfmWAqHZXPtKSxM1ffJ7mb5WrFuUeYH35c27b%2Flf%2B5xQp%2FSGqqjU%2BacCuVBdo0H8wsGPGBxqfdT%2Frpv4IbKtOKGxZqZIijfYN4EwVz1t9FRTXasTAU80GOjK8q1X9YOzyYft%2F4D6Dj1yJoJwrVxeoBSc5Ueucu6mG99KWFsA3d&X-Amz-Signature=81deb717450c005ebd03e147c8dbb7bd9341f663169e7732d1a5156aa18afa8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUF64FYO%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIArYP5rCkTIup0y1Im7DUQept%2Fgjq5we%2FBM%2BNyodrLCfAiBm%2FVGRz57ZCNfXWFYh2LZglXCEC2OcItd0lCFEeZ76QSr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMDeAqTVbO7Ez8zpoXKtwDxlsG5XP6wXwd2iki95u1K3Jy0yDHFrvfGHP31lIILPK81hcZiWnGyIKmeDC2F5NtwGLYU21FM%2FCJyPPA6M0F9lO7UObjB%2BFNLIlz5q5OhnauQyPufC56WS0YuZtnlQGR2u15O3yHfXaqW4msHOcRciJ1Eyp048L7OB7S4vXL2a84dglq2oA21hhrdVa2RjE741f%2BmEn0gHiheMsM7JSNa72zEGFBdUbC4O7V9%2F0f2DzQyegnz24sfHm3WYyJBBlEcvrA8NVbTYpZJCQk6sOgk9FIKl%2BLNb%2BYS1Wylp9KaCwRy1aT7IPqiAG7wSWCAg3Oh0QkXj7GqSevv19JD0QV3IhTwkcOBx3TUdd4SgOEqGNXnfJCEKqSd0s8B36L1U2dyMITGMKGAmINgM9v4PRTxx4LuqVM7w%2FwCjciPEdFvkNTJ7z9o3%2B8wDJ8NHfj4voCMlj6AaJm%2F5mU2eIgfFq%2Bv24ZZUzupup72MwBQSfqt2wmOGenTLj9iVwOVm4V7vm9uVn7ShoqRrOgzMQpXFbdEnAqJZKpwXgDIzSyIWbV3VyJroxkVRnR9vMf0FXankrxaqeLl7jypCauFpLv8PYpQkJ%2F%2B042cr6RJ03W%2BZAY720NCxINdZk0W1ohe5Ywl%2FvUywY6pgHz2E%2FYiPtVQg%2FHXXD3bsQoatrI1Z13SA4X2KtVTYQoTx13xHeePIkzSK9sGwIeAlWOecdlyb3Lm0tRT%2F3BQfy%2FlKnavhVLkrh7HrIlYTZK%2B%2FLnsAA40XhIQaxmCNy11W3OUMZ3ppHq8XOUSxA3eEWJF2pOWqBYwDMC6Ob8NXLX3FNk17dLBCln5lHmjvOht6vgVWSUk4jDbvDMVCCkgey0W%2BVADAMf&X-Amz-Signature=3db90bfc1e5480aae15c46fc4a1651875a245bf358028e7ba769f540d4acac44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJGT7LHX%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCICxH4waunIKphVQf9H7BF8PvP0VrFbNyQDu3wbE2jtIXAiBufU2%2BioXwUCfQ6p6kL7ivKQh6RdcbFXk1aMVkTJwOoSr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMNOoyoLgOq5Yem07VKtwDRpzfAcYa6spNdUSGWuY61zbq%2BVAwHbbzu93gqPgth9zYkLpft%2BtYgdbl%2FS5eId5sxjcD9dIaCKb6iGp7xIfmUpkwNxX1G4h8tWk1xHzzfdjZvuDoKBs4or29vMB%2Bq1S4ZbnOiMIwFSkx6dHcHIQ5IHCZyboIkfJK1YhSz4VfPo%2F9M8qnGzubFEy2KIVZdH77EmTiQUcWMh8ZqysTyImRb%2F3s9yDnszIT%2BpavPWcxej%2Bz0O3qagj%2BxNrLxtlz1vHSvh71sqhQjocNQRNOEEAkAG9kQHqjw1voZcFqQzSEc2qA16PVI%2Fo%2Fs8tN%2FicL4SqHY%2B1HybLB5xSgq1tpcoHFqGZmz53wPDlF0QEiMd87roHoE4jq9JYuaDdaUh1gsqwIobtK1nnqlHPV%2Fpcb%2F5aji30731yA%2FzgPK8kEyZMgan8EXAbpPsSt7X%2BZc8Gi7T%2BT%2FIiWeVygpS32q2v4bGSUII0n4ixPHEtpiKPGtdmt%2Fdx%2FtKjox33HmXNgDF%2FTXDKHDxU7OE36cX8gUyeUbwBTpCnap08i997Mr807Or5BfR876XQjasMytnvNPdP61au%2Bhv%2FkWLGMordTFEVcogDxfq3dOsKCwDgo317q4QzfQ%2BjoflEwjIEb4Ris3IUwpPvUywY6pgGH82Cj0JO555T9PT%2F3vRZGsLvYXg4LO8CB5l71wWnu6gitq%2FE3tQY0OuZJRY9RuT%2FS%2FKB%2F0H7eQ%2BFuCEhXeJzfdSjpM%2FjNIF0xd5DAGRVuwVZVMegm5RN5VkYab%2BGYvKJplLb%2FCJhMlUaoCGXjDMr6%2B4XzK%2BdT4xsjwppi4xE4ugc7Pe0wvq4B3GAAHverJ%2BcfphH5TyNyw1hWXle9jB%2F1sV3K%2F%2BJt&X-Amz-Signature=d2b83199ffb8297351f539676966fa8f618f118f11fc7d60a86f38f78c4061c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJGT7LHX%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCICxH4waunIKphVQf9H7BF8PvP0VrFbNyQDu3wbE2jtIXAiBufU2%2BioXwUCfQ6p6kL7ivKQh6RdcbFXk1aMVkTJwOoSr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMNOoyoLgOq5Yem07VKtwDRpzfAcYa6spNdUSGWuY61zbq%2BVAwHbbzu93gqPgth9zYkLpft%2BtYgdbl%2FS5eId5sxjcD9dIaCKb6iGp7xIfmUpkwNxX1G4h8tWk1xHzzfdjZvuDoKBs4or29vMB%2Bq1S4ZbnOiMIwFSkx6dHcHIQ5IHCZyboIkfJK1YhSz4VfPo%2F9M8qnGzubFEy2KIVZdH77EmTiQUcWMh8ZqysTyImRb%2F3s9yDnszIT%2BpavPWcxej%2Bz0O3qagj%2BxNrLxtlz1vHSvh71sqhQjocNQRNOEEAkAG9kQHqjw1voZcFqQzSEc2qA16PVI%2Fo%2Fs8tN%2FicL4SqHY%2B1HybLB5xSgq1tpcoHFqGZmz53wPDlF0QEiMd87roHoE4jq9JYuaDdaUh1gsqwIobtK1nnqlHPV%2Fpcb%2F5aji30731yA%2FzgPK8kEyZMgan8EXAbpPsSt7X%2BZc8Gi7T%2BT%2FIiWeVygpS32q2v4bGSUII0n4ixPHEtpiKPGtdmt%2Fdx%2FtKjox33HmXNgDF%2FTXDKHDxU7OE36cX8gUyeUbwBTpCnap08i997Mr807Or5BfR876XQjasMytnvNPdP61au%2Bhv%2FkWLGMordTFEVcogDxfq3dOsKCwDgo317q4QzfQ%2BjoflEwjIEb4Ris3IUwpPvUywY6pgGH82Cj0JO555T9PT%2F3vRZGsLvYXg4LO8CB5l71wWnu6gitq%2FE3tQY0OuZJRY9RuT%2FS%2FKB%2F0H7eQ%2BFuCEhXeJzfdSjpM%2FjNIF0xd5DAGRVuwVZVMegm5RN5VkYab%2BGYvKJplLb%2FCJhMlUaoCGXjDMr6%2B4XzK%2BdT4xsjwppi4xE4ugc7Pe0wvq4B3GAAHverJ%2BcfphH5TyNyw1hWXle9jB%2F1sV3K%2F%2BJt&X-Amz-Signature=e2c8093ba667b6d17e8c07aa5fed80330c1730874450cf6c01262da36d8de3a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFRY2FNL%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIDoC%2BxanzenV9uBfnbqnyZhS2pfoLTcMeO7hOi5qDKIoAiB2HcLV82%2FzDzrYo8cwX43IzLk0WfNfcJ8aQ2LoUy5jDyr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIM2gTkXNQm2NMYYd55KtwDfwxBUgcxxAMzGJYEtdJOT8jyDetUHj1D%2FQODyTVN85LLnCivZ0%2BoZrE3jCTPGcwvBdGWpzUmeeThnlJ8IUFPy1ycu73vm%2FgBHM7elkIDf1uWxZfZaj4MnKhHAQrZYImq1YKcPoqHFBmSHbRmLKt35NQcJ5h9jLJEHrXhWJ6wOA0z6REpNLiZ3uZkH6WaRu9Pvqth6KHhRXOHqnlKN7JF9kmJSkiT%2Bk%2Bn2P2Mg2K%2FHW6mrcbGDDufyj43LFNYdUz2JWNc%2BtYE8M%2FKSD2BMYa0zFRf0FHx2tSM1tdiGjvNk4LT2aaeh5GM7%2B%2FndDzW%2B1V0eOW%2FX6qHX%2FJqICK1Oj0UGqM%2FaeQpf6hySCZ17QRSrBilR3HYR7H7SArCMX1%2FkaJ0%2FZa1XSb%2FlnZjlyjfFFw3gMrjGAIRTBVgxc5fMqzIAAPPuuGMqRIv%2FoMs23qScZasL2Muat083kgLvsyQWzi3F%2BQKcw0cyeURbttDr4lmCzg5FZ184D3jcICKdxru2Md1FSmcjLqNcCrWdDCYRgeAe9irCN9rIIEf9S4EKTUkd4tvHav1uzNQynKATykdgEotG8viAHSKo0IhxnAucLmlJSNhHaMNQ5M0XOab9T4IQsAbiN%2FW8Y73EPiG%2Be0wy%2FzUywY6pgENd0PleHlKSqaShuvmSVIlXT2VEDRwu6dpXdWeMfbMaKOqRpsyyR6hR%2BSKWlT%2FD1RE8gP7h4nxyKzDgDh23WGbAQgY963Ur%2BOMhBHm%2Bk4%2FXNcyh8ZcaTcknKaI4dRSycxTrqkTfiIs%2B%2FV48y1LL0XMFGWU90x60BmrlHbBX9Nsda34S9gc5AIOt%2BYTSf9z1ETg2%2FnluT%2FUlsoHnx93tJqKGm84pHlb&X-Amz-Signature=7dd691d70d1621ba1498bcc4ffcadc5b25db996dc5db42065630bcdc1059478f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAI5GRMD%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDhl4Rr10P4LfS%2FlXJ5G2nhnV7eAweTH4p5QhtkMsTdVAIhAKvNDUboe1o0H3mssgMuUNdUtRgyw8mZEW%2FatC8y6Q2KKv8DCBcQABoMNjM3NDIzMTgzODA1IgxRndaSmiPDTNo9JT0q3AMMNQYBgJV72d9NRqY2CfOr9SYRx%2F4I1cvLC%2BeThC78p08lsONb7sJa2hQbawfmZmTdysGznQvv4JtWgiVCzvq0pP0opUIF7v5UxsdoN%2FO%2F7MW0IO%2FoI1sRIXuXLPMReGfUX3FPcCvefB%2BJsUS2DtoA1lcpKmCKJHJHyCbjZ5z7CGFZrMwEI8zpHd0v2OKk%2Br56847DSSPjkD0HxoZsLI25PdkAeefqk68eWIyxq1aTRLdpiHk%2BNsGls%2FZZ6Yf3Vc0Q%2BhSPfUrjwPTQnfqt7HHRCAFaFuYbYPqzP%2Bq2fbHNEx5TZWgrwqqLKKpBFMjMH1TKvVsJqHbfQJOZ4jvFj7iVwKZlmXfUTJFf2mf4nDBDhrbgItGzij0Gn6DAqRbtOJwXxsugYNQ8xvA1PPqwrGpIlDmOeBBLYrANA7g8qHz7FnzIWRdWj2Kn9Vh6TzZd8vMUBSHCMiVAWKuk0fOmn1Bsq4SbZqqTdLz5G%2BJjKsGz7zvGEg%2FNQw9O8RmjDRMxtG3f81CQoQuJYV%2Fp3ncRJs%2BKeXVrS4z%2BlyjmabZEfOvOfRecTFAaYfgkOHDnTAHOoIcvquCrnL6yCvdJODhlKtsHRvbg1Oh9a7a%2FKfdnu%2BrXwR%2FsO6vUFuXj8m5knjCw%2B9TLBjqkAZtivwUnByWHIyOLWAeiuSKqPJ3ET6nz%2FDJzP9G1Ta2kuLMmBVkBMoihpzMOVBrggr%2FGnNaaP0m5m6ex%2Fs0BwX2X9yk%2FzY1%2F833cF81V1p1aZN%2FsmzIb37GkUw%2BcBTJSAFLmOT%2F2rjh9lWiT4TgQh9e5dIQSslrTII7wU%2FhhBM1dnGSq1zXtBJwJqjVbYqCmdq0cDn3jzJBY6QDwVTjyeULjJBwY&X-Amz-Signature=60d357185e85752d4e7b2cd5843650398b08ac88fec095f851b354df200ad629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUGEKRTL%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQCmDtw%2BKbEiaGI8qsn72ylKP6Cf96qOEOSRD5GaR4SXywIgcvxGCCGottuj6esmEFFZJFGxzR2aGBVBnrge3qZ84SEq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDGnPn3DkFe2qesbGyCrcA2puMnTXejVcYuAA7aNBf%2BTlU3Uw8cn55y%2BNztKP6zEhD1eDZO2%2BixKP3hRibkHv6pPjpR%2BWw8ovefIER%2FWmtv1vM4CkWr9OJaQ1MyoHWF6pzsoFbUxeNghIQ%2BCuCUi%2BDgMNsual0I6fPJ3hrolryrv2D7Em2Mt2jkttLMY3eimT4sxsORzUYKN%2BozpxxUQEz%2FB%2FYI4VQTpJNfFSj1TBEHJu%2FzQAjzpwop7E%2B6GdimFLZJsT6mk4AlYFO16OOla3IKdrBtfNciSiXSL4sUtIIhDDPHUTqHs48ve%2BuidAv%2FmP1XD%2FfLFLzDVw1CPtaQrvI8xE%2FiigA0uGw991SAKvACf53gO%2FvKz3aV3yz%2F3o2%2For91mBXCXo6%2BwsQucCdMpzXpcUkp6Avh5WD3kw%2Be7wIm%2Bn%2FUH8yQ8P%2F2JhJjcB2pmGs3z4tnVW1BrOh47MUoGD7aYjYN%2BKc0fm6k8zE%2Buzq2P2Wh6J6WJKg1r%2BLMmulfvOt6iEVyyJpZ5xxKBIjROKf5%2BShZYAlvWhenxdza8203h4eGhluU8qSsCuC6so5zITVOhpqsUXgPk8BY8HOPHBrSM2AfNa%2FC9R3JI2zJ0RYlcsavhz%2Bx%2B1cJv1J83QheUX7WFI91AnRdaBiO3MMJn71MsGOqUBUcDOQ0xqqX0xIj3rsHEqmfpAsK1FTBxzHwVoOYA7yb3vjSvY%2Bt2HA2PPBVTTqKhoCcbjGngtp3n3KeU6jxOt2EI2Tuh3En3xEReUGGSCuN%2BmwyWGgJvov1aYDBiYe9%2BBeyt85Tm8YcvdbRnxfy7D1tad4etK0mz%2FfVPUU%2FAb6b1t9l1KBIF5NVolQeC5kYyoe0rDC%2BMFfMiaIPY8k4ZszMAjLs%2Fv&X-Amz-Signature=570333c0565e1d0f2a0b90779e1718b1003ddb0464272e92fce80de80bccb9eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3GJCDQQ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIHebIZ%2FlsyjLS6%2B9Okovs9FMz8FAjSSoKAhLkhuq4WRFAiBOobT8OM9aEhRd7rOPHyhyIg5bI1ohLrV0PrHqlh0FkCr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMM7DLr73m3wOux40BKtwD6xqSQqEDdn%2BT76G%2FK4kB8hMB3b4X0ihgtrYAX8F9kcepsbNkgGz9p4CMMX09r8vED00o998CijqLPYER0sbaoacqkbI3EgnIWP7mEVVTvvHQa34AQ3JaslPeaHoHuc%2BP02b%2B2tHcmDIT9U54k1NZ%2FRD0ODZlyJQiFyDvHpAKZz6BkGYU%2BEmshf%2F3wTdFG3wTlwYRaclInMk3nKfBICOjMEP88swm5vbG4vVFEEeoABrrTd%2FMQ4BNTpktud01hSiawo48R0NxSPUxJSlnA42mmKGQq9Cv%2FV6jrY4DPmAwzhZ%2FtBaS%2Fy1zLDk%2B3hxB91glKE6L4RKkv8OBsC3XB9eLNfYR1OkXIgvdi0E876ASqOS98v7yYctRab2%2F3uJ6GZHTs89QVISRRVwihEvmEI4DzjXyBc7dhO2lGdFSoCnhitIvT7yk%2BbfXqFObcz0nFiwDAlgsKz3364FitMtvnDY53hDRuBk260cODwPdK9ELF%2FS7lOtVM4HpLhFfWCFSPKZ40IC59xhNZ2xsN68R%2F4qou%2Fmlzoe0BywulLRDsVy0f7v1%2BVHCHKO0OIgO7hbDuNv2o9nyUZJqwuXUO6%2Bne%2BQ%2BnbhQpiSvyGoDS1pYa1Chc%2BFRLKcSqrK4Racf86Mwr%2FvUywY6pgFhOwHJnCHTzo9DQ68eBTAcQ3WVe4dYwc54%2F5JUJGfeTc1ygu7n7Z26p%2FOTUoksqcQJilUg%2FQmV20yI2J1qv%2BYPHFaKUh5A9rlNY1blhXP0kEJhWFUsGLbPmmn3egQbOlHu5NRPwEEufsgl7c4WbmMIeQVpE4D59z1ff1UJHYzii4cgdjHp8H%2BiWA9SKseuEnWfS%2FdFhyQ7pgFUl0GDyPT6XvFu5doE&X-Amz-Signature=4ea81a3e731486f6ffbb4a4ea1e4649af1b5550248567db4630b8747eb6e615d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3GJCDQQ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIHebIZ%2FlsyjLS6%2B9Okovs9FMz8FAjSSoKAhLkhuq4WRFAiBOobT8OM9aEhRd7rOPHyhyIg5bI1ohLrV0PrHqlh0FkCr%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMM7DLr73m3wOux40BKtwD6xqSQqEDdn%2BT76G%2FK4kB8hMB3b4X0ihgtrYAX8F9kcepsbNkgGz9p4CMMX09r8vED00o998CijqLPYER0sbaoacqkbI3EgnIWP7mEVVTvvHQa34AQ3JaslPeaHoHuc%2BP02b%2B2tHcmDIT9U54k1NZ%2FRD0ODZlyJQiFyDvHpAKZz6BkGYU%2BEmshf%2F3wTdFG3wTlwYRaclInMk3nKfBICOjMEP88swm5vbG4vVFEEeoABrrTd%2FMQ4BNTpktud01hSiawo48R0NxSPUxJSlnA42mmKGQq9Cv%2FV6jrY4DPmAwzhZ%2FtBaS%2Fy1zLDk%2B3hxB91glKE6L4RKkv8OBsC3XB9eLNfYR1OkXIgvdi0E876ASqOS98v7yYctRab2%2F3uJ6GZHTs89QVISRRVwihEvmEI4DzjXyBc7dhO2lGdFSoCnhitIvT7yk%2BbfXqFObcz0nFiwDAlgsKz3364FitMtvnDY53hDRuBk260cODwPdK9ELF%2FS7lOtVM4HpLhFfWCFSPKZ40IC59xhNZ2xsN68R%2F4qou%2Fmlzoe0BywulLRDsVy0f7v1%2BVHCHKO0OIgO7hbDuNv2o9nyUZJqwuXUO6%2Bne%2BQ%2BnbhQpiSvyGoDS1pYa1Chc%2BFRLKcSqrK4Racf86Mwr%2FvUywY6pgFhOwHJnCHTzo9DQ68eBTAcQ3WVe4dYwc54%2F5JUJGfeTc1ygu7n7Z26p%2FOTUoksqcQJilUg%2FQmV20yI2J1qv%2BYPHFaKUh5A9rlNY1blhXP0kEJhWFUsGLbPmmn3egQbOlHu5NRPwEEufsgl7c4WbmMIeQVpE4D59z1ff1UJHYzii4cgdjHp8H%2BiWA9SKseuEnWfS%2FdFhyQ7pgFUl0GDyPT6XvFu5doE&X-Amz-Signature=4034004c1381d2ec29fcf592a939df26fdbf3ccc9661f9438e217366ec0a82ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BGU3NFA%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQDNfl425wdrTnP4d%2BXAyM5KyJg26oWdryhZPQjXJGuHaQIhAJB6qq%2FkJE%2FH79gBrRKaGI1Kqc0DB7KC%2BdaANvPtK5lgKv8DCBcQABoMNjM3NDIzMTgzODA1IgxNnm%2Fqgd0v737byZMq3APdTfX69vnad3P%2BtmOOGf0HfGNwh7ICjjeZegR%2FtDICnGtgAIuC4261twC1vslVYLFetyQ1WTAhZrue%2FfXQgiIp5GJ%2FCa4yTPzwh0YeHcVum09McaGl04To1DB2ZLxhtoLnnVyv%2BxJchzuYcq4G8AD%2FgZncBarEjUPagblnpicP9aptrrdykbDpo7cBMiMdIRCiXS3gpLuv3fuDGXCjLoj7L%2BhBUX9U4FN%2F52q9Lc8MV5FTpoUYThrUX8jShIuNt1iCpYKlW%2FzZibVU3p8F6jZdLnMxW3vpgTGFFUn57FPbIp1duIvFK4Xwfmswu6jwtlgL0pJyg0I2DG5st18I%2FT3RlOWWdmBTtatq8Z6blBN1LUsKMCgaxFUj11Kn8mMCs6UNh5Sqxw13dLLJKifMFX01snfuqC30CTAaqoBL4NM2RlKSzOW%2FNS9SYNyIz4gP%2Fd4kZgrv6JyuvZT0I69g98FT%2BuG69ppvV8vH7eqz%2Bt25zaJh6pBxgPOeZRpAAcdUn7yNbQ9Mx2arWpj%2BpmtLF%2B%2FTr3bNRscMLs3BtJRWvFs%2BtzWx1i%2FB%2BZHY8P1NbGqR4yztjTfxPex66telIu8k%2FbRwTPLwIB5Tnmb2ja3AGjkfvI0fU2rhp50FqFhBgTDm%2B9TLBjqkAVorDD%2FPNYPkekxOFOZPS055QQfhjIKTj0%2F8mVTsllPfmWMojkqmKmYrlj%2Bc1kGKHoKbRl%2FCx388wl%2Fc1l6Brq4mW6tZHPMi0RmMx4WeuGjLr9ebBbeFiVApanC6C8q4rmDIt%2FUnx%2BfH%2B3GCuayg4FDpp8B9ebO%2F6qGXwFQ0YohviNc63LWi3RmhOO9tP9Ryrti%2FH4hzhsJ2ykkIckTPfvxB8qZE&X-Amz-Signature=4d7629d19ea3bbdb1e47fec1d8baca9b5cc62b9cffdfb7c19379edb36ee7e2e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCW7EP4P%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFx0wnXHhEkCTDhA3vVLgzMhUlnjx%2BcN8y3ii7UjRcmBAiEAoymxAj%2BZ%2BFgS%2FADQyopuC5314rneOS8pf%2Bkf9alReu0q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDHnAUbCpG5sUr3u5XCrcA%2B6c3ezK56UgXD3OhaaUQl8TUYEYfEDfccFSex5gw%2FTqATSMc09%2Fn9Ka3%2FSGnbtIrR1togoDC3mz6W%2FWK2fBhyAFfr8qI3pPTxchQG3bGQ53IRhdoejGe4BxcLiMavJe%2B1%2BGNg8uC16nOHF7F9suvZoGntz6VYLjo7F7sR4morOksYgKwCId%2BGWVr%2FhPzaPR6DgJaVoJC2k2652M2uzS8ZXZuXZX4p5CnMBS%2BonZKqyACF5HG5%2FMw3olPgt3j6uHx0VQOcxLdkf5enhs6Ug%2BLDUfi4Xw0z3B4T44JqVZ%2F9I%2FnnrRtYfA3wjUTpLdMZcZ7zWaAEUvB1JXaudNeH4%2BeNkmCgjrgpiJ69VIZhdYp0XuFBU1eQHN%2BR6J8kJe35IjJMvoFnFprbVFrEUFq89xpIqXXD0hg2s8KIpCxBlxIVQyiCcSQS4%2Bj1my1bhWTHk3kw12J%2B7fJL6%2BEN4GKSRHWfAemv83Jgj5zRFXy3uyNT88WEo6z0L6s%2FcOzHU8c6DeA1RgbYPQ5zyCxiPVm3vf8AFGF1x1Ccce73iEhPGwXtBoHDt6uzFCGDJckd3sUFCoZP9kdkCWF3W%2Fvl6pQ5huCu8%2FxN66cBysN67BWnEgRaSqCpbu%2FJuN3wB%2FGTfvMOn81MsGOqUB%2FVBC8bJfCN%2B4Ka9i62IjR7wc8rpsCaQGsFEEmOsOwx9HKq1JBPRUsT%2BY1JchaIKsvAl5EOnQDuQ2U9ws1QfwDWkS6m7j2Tft08HqgqCCbUThd67Ko%2FKnErA1BNGdkOVpcbZBTzBUvjNOumEaYlQpQryjXoGRX4KR167%2FoBkdQgQaI%2BIYMIK8MSCTjONa2YTQr0x55C3NcQhipvN37HYNbc5Vw9HK&X-Amz-Signature=d9de840a58fe96e6c67c350c5a0b199392bdd994b89dfcc5ad797dea93088ced&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCW7EP4P%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFx0wnXHhEkCTDhA3vVLgzMhUlnjx%2BcN8y3ii7UjRcmBAiEAoymxAj%2BZ%2BFgS%2FADQyopuC5314rneOS8pf%2Bkf9alReu0q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDHnAUbCpG5sUr3u5XCrcA%2B6c3ezK56UgXD3OhaaUQl8TUYEYfEDfccFSex5gw%2FTqATSMc09%2Fn9Ka3%2FSGnbtIrR1togoDC3mz6W%2FWK2fBhyAFfr8qI3pPTxchQG3bGQ53IRhdoejGe4BxcLiMavJe%2B1%2BGNg8uC16nOHF7F9suvZoGntz6VYLjo7F7sR4morOksYgKwCId%2BGWVr%2FhPzaPR6DgJaVoJC2k2652M2uzS8ZXZuXZX4p5CnMBS%2BonZKqyACF5HG5%2FMw3olPgt3j6uHx0VQOcxLdkf5enhs6Ug%2BLDUfi4Xw0z3B4T44JqVZ%2F9I%2FnnrRtYfA3wjUTpLdMZcZ7zWaAEUvB1JXaudNeH4%2BeNkmCgjrgpiJ69VIZhdYp0XuFBU1eQHN%2BR6J8kJe35IjJMvoFnFprbVFrEUFq89xpIqXXD0hg2s8KIpCxBlxIVQyiCcSQS4%2Bj1my1bhWTHk3kw12J%2B7fJL6%2BEN4GKSRHWfAemv83Jgj5zRFXy3uyNT88WEo6z0L6s%2FcOzHU8c6DeA1RgbYPQ5zyCxiPVm3vf8AFGF1x1Ccce73iEhPGwXtBoHDt6uzFCGDJckd3sUFCoZP9kdkCWF3W%2Fvl6pQ5huCu8%2FxN66cBysN67BWnEgRaSqCpbu%2FJuN3wB%2FGTfvMOn81MsGOqUB%2FVBC8bJfCN%2B4Ka9i62IjR7wc8rpsCaQGsFEEmOsOwx9HKq1JBPRUsT%2BY1JchaIKsvAl5EOnQDuQ2U9ws1QfwDWkS6m7j2Tft08HqgqCCbUThd67Ko%2FKnErA1BNGdkOVpcbZBTzBUvjNOumEaYlQpQryjXoGRX4KR167%2FoBkdQgQaI%2BIYMIK8MSCTjONa2YTQr0x55C3NcQhipvN37HYNbc5Vw9HK&X-Amz-Signature=d9de840a58fe96e6c67c350c5a0b199392bdd994b89dfcc5ad797dea93088ced&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XT5X24X%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T220117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJIMEYCIQD%2BwkxnpAJbI59e6w51HvBmcTk%2FgfSON8h7GwSZYXlOmwIhAM3laggVNMuSDlnjpcpzJ8HvjwxYv3bFn3O2jyKG3GVyKv8DCBcQABoMNjM3NDIzMTgzODA1IgzjeOTt5AJbSnbg3Eoq3ANoPF%2BgxUN8wxeJa597XREVUaAKNg3Dq8kM%2FOdmSjLpZDMZaEq%2BHeWsF3SuVE8d3DinZ2wJ8u2RnjWZhnrBde9qnDEdNV8Gb%2FUXezAuHUP5AoRVUW%2FteZ%2BMLzQHnYIfCC3Yool31Y1bF4nyqxjrCd2yzAE7GmcoSW0LB6%2BYIzZhEHH2l0fbUWoBxcjlUJ8imhpTuMjmS04IklxMOM9wFrBWcupX6aGPtNBy%2BhV3vxHtiobqLSxu3RfNOYmJYM7P5QXmMyb0Im62J0BMbBl3myeVpjVC2KA0GHuP%2F7yyYmcX%2BXTcIwULGgFqR82ddaViTFP0xYZcuSMNp%2BV7xj1MQD7BcpOalFoSIUjCcuROZRhS8ad9EHcDsLlciK9Cz%2BuVvPV5BAh1FZhXSWJhPmxs2dJGRLJ%2FyVDX%2FRnj433cqjMqfx15X%2F2%2FgMJMpGtPX6RblMlkHFs93EboY7gh3GqR9PDw0SSpoREXLMD4UoH1ttxbbPsWQ%2BIlvMX3KsA9EWbrbBwkbTXH09dXGBBb7%2BeW97XYySlH%2F4wajGuh%2Ft4vMSvzlfdq2DSIWZvTdDcLmNEN6LbXMehAaOx999FBY%2FM25VcvMI3xqp1ECOXTK%2B8itdl7lxOE%2F6M%2B1VytYEDX4zD1%2B9TLBjqkAVtI3qEE88S1%2FnYM8paF31OtDHA7ebCWthfftJkIYTOPO%2BCP7KiAMbw9Ce2UlKpuOEwd6hIHQJkR5f622f5pYWONSkJfE%2F%2BzQRpFXmug%2FTv7elV%2FkQZsKUY7Oqf1GWfJS%2B09eQ6fHuBYMcvb7k%2FdTbfVo4Luz5O282WaFAAM6imTcEynfAQa6328a8%2BY9lKLaRUtYwihp%2B55t2UHBds6nNYke5wC&X-Amz-Signature=3f9b666addc853c4d6c0a7e9276e585d4f059560409e4a13d190c8872a398a9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

