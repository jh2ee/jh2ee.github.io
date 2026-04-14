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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TISBUYV6%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC2WXVk4swGbVwijAEzjn%2FmxDPosxt8ke4dvnKNnQ8hyAIgGAyb0AsCT6poYso7eDu%2FnMOKDObhffO581EbEMn4angqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL0%2FlUDnlm3IRst2NCrcA4x7VMIhYlY5wOkLsymhNZEBDvZUWHKJxrRbp3e%2By%2F9Z8thAV2iA1cZHViBJW6IYVhub9%2Fnh%2BfNOnln2TwerTHtzRUVor3wqc47vPJ1Lchn5TtdQ9L2pp8VB2uciY8IX4SUKwjO5%2FFP5Qo%2BLl%2F4EKCgMSAD8mjAgKh635rYJLsPvJvNX00Vhl%2FVcBudgcu1BSTyjBg5lqH4QobZTsKDUy4%2FYJYrAk7tKVS%2B%2F9qJC7H6kb9ZHqO2%2BSCYQqphu7qZwu1uXJ8BvCh1c%2FMxNbKw%2BmpZwbw3CRngtRhrQHb3kI5YYyg3l5edjsVG%2F0n4FiQFkCFGgf0XCCFhJQWB%2BjP%2BuNil0j4wIdclX1sIEHY%2F524RO02q2JxBMR609sW3KH46COfIeLrPUQ3CyWv3Oc7XRxjlN9BHTxL47fRKuoUi7Txz0KZJAWcZx6RK1AzJahhK%2Fpgy%2FPqCdyUfavDp8pRoKkwpg9GkJ0pchsClVvyIAxKcMxmyNFMGzVbNWIyOnhyaHDe7M8qMwjA22eZYzvvO6qT2RNTieEI0asrrhzwbQMGug8Fu247Md6fTv06nTX5Br0PjF%2FnUz4LdLPKauT09yRre%2BE%2FRXjNZ%2F6R3znEpVqkkY8lHPn%2F0mmp1FCgOFMNHZ%2Bc4GOqUBl1VDXPetqoJ6%2Fn2Wc2hyw06JV2ZT%2FyYqhWHo3GDQokzXjc2HtobzeIc6HdDNmlVugQ6rG8OXjqTGNxTUIXMXx2GhbEILvvLU0DCpkGmKq2J0zpyUtHmlBWmZP9xxvMIFnQB7u1uXDSBXeAQYtv6n%2F2etlrCdth3khZQHtHiXrr5oRdb1ZcG8QzWnk0IIDin3c%2Bs%2B0wMkGTimc8p4gWSmCmD76FIf&X-Amz-Signature=9fc2439f20737d46889015ae92115377751d7ec5cfb01ff3a0f53e4c381a360c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TISBUYV6%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC2WXVk4swGbVwijAEzjn%2FmxDPosxt8ke4dvnKNnQ8hyAIgGAyb0AsCT6poYso7eDu%2FnMOKDObhffO581EbEMn4angqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL0%2FlUDnlm3IRst2NCrcA4x7VMIhYlY5wOkLsymhNZEBDvZUWHKJxrRbp3e%2By%2F9Z8thAV2iA1cZHViBJW6IYVhub9%2Fnh%2BfNOnln2TwerTHtzRUVor3wqc47vPJ1Lchn5TtdQ9L2pp8VB2uciY8IX4SUKwjO5%2FFP5Qo%2BLl%2F4EKCgMSAD8mjAgKh635rYJLsPvJvNX00Vhl%2FVcBudgcu1BSTyjBg5lqH4QobZTsKDUy4%2FYJYrAk7tKVS%2B%2F9qJC7H6kb9ZHqO2%2BSCYQqphu7qZwu1uXJ8BvCh1c%2FMxNbKw%2BmpZwbw3CRngtRhrQHb3kI5YYyg3l5edjsVG%2F0n4FiQFkCFGgf0XCCFhJQWB%2BjP%2BuNil0j4wIdclX1sIEHY%2F524RO02q2JxBMR609sW3KH46COfIeLrPUQ3CyWv3Oc7XRxjlN9BHTxL47fRKuoUi7Txz0KZJAWcZx6RK1AzJahhK%2Fpgy%2FPqCdyUfavDp8pRoKkwpg9GkJ0pchsClVvyIAxKcMxmyNFMGzVbNWIyOnhyaHDe7M8qMwjA22eZYzvvO6qT2RNTieEI0asrrhzwbQMGug8Fu247Md6fTv06nTX5Br0PjF%2FnUz4LdLPKauT09yRre%2BE%2FRXjNZ%2F6R3znEpVqkkY8lHPn%2F0mmp1FCgOFMNHZ%2Bc4GOqUBl1VDXPetqoJ6%2Fn2Wc2hyw06JV2ZT%2FyYqhWHo3GDQokzXjc2HtobzeIc6HdDNmlVugQ6rG8OXjqTGNxTUIXMXx2GhbEILvvLU0DCpkGmKq2J0zpyUtHmlBWmZP9xxvMIFnQB7u1uXDSBXeAQYtv6n%2F2etlrCdth3khZQHtHiXrr5oRdb1ZcG8QzWnk0IIDin3c%2Bs%2B0wMkGTimc8p4gWSmCmD76FIf&X-Amz-Signature=9fc2439f20737d46889015ae92115377751d7ec5cfb01ff3a0f53e4c381a360c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTNMZPVO%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDp9NEv4gPzSO052O7rUypSniNc5tC7NgQMcKSchWjT7AIgWuhQti9FuxjV%2BH2yVqsBKS1TBFpPoMftopbexhn7eXMqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAdRKJolP1WX%2FZ33TyrcA0Ekl0Hf1zAbExNNXnt%2BzKd%2FEho3fqkXGp8p1hI%2BgZbaM3WTY2tGeeShaS4bpF56CKqW2MURi1uVQeWTFrFGeallnh5nUrQTBtVdaSk1jdFYuYlhL5BF0ysVPzCml5zLziNs25kESbsinALXUXVO6FvCWidtGnl5EKcSmqNNeFtdW0%2BUaFzqoadlutXkn6r58Raxwia0r9l%2FPdB2DOExZt%2FOVQ1Q8wSAfGV%2FPyLKyfihECsgLBxnvvq0nmWIc8YaWf3gAHELXh4dSFfvcjjNUCwnuThmxjKNi1PwHW3GhZOco3eGyA7DriQYO1Sob9Rq8nuURz3miu1qnf%2B9hXxDDEhFOYHcuKPO3Q%2FV4yXGajR32WGtXN1HSr9JLIwi1FxdAXs2gaqHrmUZ%2BZEZsU6bCsl%2FTSkWq7xixvdyIsD8DxqsN77MCz6MKerxoV%2FbYmMRJgDchb8ieiRylfuRtPKyshjBBZIlK1w8alnWe9dh5%2BCc%2Fd%2FG5RsT2O7ZNiUT9pcGS5u1uDJUUQ7I5aT7DcotHMQtzV1rNUJvyB6SKFn35taKA38oGYArYFOklhP%2BUYipupQQV4t2KeUrtf2G72T3KJBZ1sWyCVraoFBWLcsXEhdfGDAtF5XIP2yLUvpPMOTZ%2Bc4GOqUBoSg1zMg84UvSVXksFdO88nMI7KYZGLNX8ic%2FulVyN7k1qVj9d%2FgZpGYnFGcXe1rEusOw7zWMvthuU9MSSDu0UNbKUmDxUK8v1%2FMvD6%2BtzV5CxcV01Sb1Z9nL4fuGkNw%2BwNyolTXFe7qvMT4cLKms57A0jF9SaJCOg37if2n5ZWH9FynBydw%2BqgQJR5MDpGy%2BEZBbhtVUpz1YbcXMx7NE1%2B4qr6xw&X-Amz-Signature=b13d485496b57c8cf8f025eed1f11ee54cfeaddc7230a2ebfd4dbf03a58c3ce1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622OPDG2M%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6exTQgBYWBsEGZ%2FYQhW2Qf0EZ%2F5b1ALhWXayjCmFDVQIgRRIhs%2FOI9p2ug5sWRf0Fi7oZVxONmDJcgkg5Z3whfOoqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOdyH6bP6fSB9ZakvCrcA1QrA6tXa2yAavlsv9oEnbb0Nn7U%2Fq90s%2BCc8MyvdQP9vxWtdzf9Rv184KeJpdVR5pd90W0nbz5VfTlfSLIj8e%2BfM%2BCkxQLgf12aXIb8F%2F7efVIMCdzvCI2E%2F1MtS0QoDdBYqkmADVkJv26iDY73Z8rI0NwKpMH35nxcw7y1yPhPh7Z12lRuJsVcXS7SOJNQv%2F72acSTcnJZ6vD29rjEjmMBdp2QOVXpZPIUQcHe0rNYOZwvC2fyfiYZniAqKWFNxVjkIKHuRCgkLdC7osqdw5VB7ery8B5IPDn0QZof3zq0FydZeyVVUXNb6h8pQF1udEbOYFsIVUQyWBi5Xb4LjSeh2A9%2F9nQKQc7s%2FNVq3Hdy5DV2s0kb2DAW6xMyKCHvXLw93XNQHSKadU1pV9ocfNB3UblPA1OoHaAnoz550Bb8ILntlCxzHeWPsysUEQz%2FLC2EGO4bHCJi5rcynuTIFQYSsazEfV%2BpldxgLIi%2Fn1pDi2ulZITO%2BkHikeEdF5mk3GvzWgmscOB28NbUGoS77lybnDv%2BaeFfEfGwj4JT97BjEtcBIEmdcrT%2BfmytnUVVs8%2BPeSkVOVux12pSB4sPbdbPsjgntWWAl8W5sRI69KzXVqb7RWsx%2FZOu0ImTMITc%2Bc4GOqUB33EZKZZOlfdnbU%2FDZu3ysxmggS6uCUQ85CdZTT%2FQHWC8zCdDYFHjT58sytE3aRyitRGFWIyc3pGogz8zUFaA9UFWZo1t5%2Fgp5aEFOn1niySw1vV79afXShFblKH%2FEzSQ9gcwNUUyu6U2HrSS4zrcewtANGqrRZ5u1FvyFbU5dvGNZtyhRLQTeIWvROIW1vaaae%2B5HXNBzp1hTYxbyde9RFiP7D%2BO&X-Amz-Signature=f6a489e9605523aa41019f0834713719b5b502f32b6d9852c80023fbe5b34b52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622OPDG2M%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6exTQgBYWBsEGZ%2FYQhW2Qf0EZ%2F5b1ALhWXayjCmFDVQIgRRIhs%2FOI9p2ug5sWRf0Fi7oZVxONmDJcgkg5Z3whfOoqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOdyH6bP6fSB9ZakvCrcA1QrA6tXa2yAavlsv9oEnbb0Nn7U%2Fq90s%2BCc8MyvdQP9vxWtdzf9Rv184KeJpdVR5pd90W0nbz5VfTlfSLIj8e%2BfM%2BCkxQLgf12aXIb8F%2F7efVIMCdzvCI2E%2F1MtS0QoDdBYqkmADVkJv26iDY73Z8rI0NwKpMH35nxcw7y1yPhPh7Z12lRuJsVcXS7SOJNQv%2F72acSTcnJZ6vD29rjEjmMBdp2QOVXpZPIUQcHe0rNYOZwvC2fyfiYZniAqKWFNxVjkIKHuRCgkLdC7osqdw5VB7ery8B5IPDn0QZof3zq0FydZeyVVUXNb6h8pQF1udEbOYFsIVUQyWBi5Xb4LjSeh2A9%2F9nQKQc7s%2FNVq3Hdy5DV2s0kb2DAW6xMyKCHvXLw93XNQHSKadU1pV9ocfNB3UblPA1OoHaAnoz550Bb8ILntlCxzHeWPsysUEQz%2FLC2EGO4bHCJi5rcynuTIFQYSsazEfV%2BpldxgLIi%2Fn1pDi2ulZITO%2BkHikeEdF5mk3GvzWgmscOB28NbUGoS77lybnDv%2BaeFfEfGwj4JT97BjEtcBIEmdcrT%2BfmytnUVVs8%2BPeSkVOVux12pSB4sPbdbPsjgntWWAl8W5sRI69KzXVqb7RWsx%2FZOu0ImTMITc%2Bc4GOqUB33EZKZZOlfdnbU%2FDZu3ysxmggS6uCUQ85CdZTT%2FQHWC8zCdDYFHjT58sytE3aRyitRGFWIyc3pGogz8zUFaA9UFWZo1t5%2Fgp5aEFOn1niySw1vV79afXShFblKH%2FEzSQ9gcwNUUyu6U2HrSS4zrcewtANGqrRZ5u1FvyFbU5dvGNZtyhRLQTeIWvROIW1vaaae%2B5HXNBzp1hTYxbyde9RFiP7D%2BO&X-Amz-Signature=8806da346319aa2c63e2a713addc29c7403e6e8fc9a1aaaedec4f473b9dab623&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K2FYWSU%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5Wu%2FbomMG9rlMbx4srjS4NpfLHTeeGyZhDcZSyH7IZgIhAPH%2FUHgIgXnFwxf1AUCAae1t4TCObJmCZIAXszANJTWdKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwaztIPMcOvvczk13wq3APkJG%2BQjvfETPMtDrnz%2BrVaDZkvgUFxafpIW4xjAjVPmesYMs5cR%2BC44xquoq8UD096YEtgTWZQsjg%2Bgai864bV%2FVeQzr1AScW1Obg6N7EeL%2BYGsz%2FvL3IW9zY9D1BfhdejRa1S7H9%2F%2FK9NUbxyAFFtKXYkC3X2b7nICak9RqzItujTzEbh6oaBfbOTQtlGrW1rRAc5d%2B9ABG6SutUWldN0rgOodV2lMwLe1ciWwHYLzG0%2BhwU7hGb2fVRFaMyRvb87jyZKcOeaS0u5wM1MXuULt8wUqeDbMnUeu4PnXhXt%2FoY4nf5nGv8s8WC24n5iPjOSt9rJgLzX0BGO37Kkabtbdp6isbRYDpbalKbd9ZKqgaroqdcuOYVtxUxEQ4fN6HN2Dx3hP4M38oANeTb9iLoIAfaIyBdJhjHyY%2F7nbT0caLo1l5AUCgl1jiwGguonJHv8tza4l9ktqjZmoDTtTTcg9IrfN2fJEQ%2BykqRYxMZcMdGjQAgButQNEUX%2BHO6LKg%2By8BicCXng%2BlYKgRpjBJo3aU%2BwGsr0qS%2Bu3pTX4o1SiT9VzVvFa4GurgploniVHvxlyaOl%2FDtxvMa051Mx6D94aFBbDJqKru6z1vq16tZCifvavzcX1%2Fh%2F5PBLljCL2vnOBjqkAbClSgt9caDPMTusBVGxpIfzVd46rtCZtuQxTbN8bOK70w9XDCXhkRb9rVmvtRV13tLpfAcfvfhHkEOpsyqiRgP6niVncWDj15e%2BS7xj0Mw8LK1uGiiEOFt7yt5aOWqTql14WARQrRC8u7YlZ1cTAnmTN6aOohUW%2FL3x5qnDm5AyBvpS8z3VWGaZDjzsf4G%2F%2F4KIkZbwY8S0nJciKv3U7DBRdNFZ&X-Amz-Signature=85c3c82f776f862783c5b317b667729f030c6dcdc8cb7ff5769df3a277d977cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHUPPE4V%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCULMA2Civ8GeEW%2FRN5PMnA2WiG2Q8uyDYzN12ad4YP6QIgHHeHJlJ1SJa%2BG7iudnmzkNHsu%2FKYMLJyNaMLOtnHeXgqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHN4b2tUEDDEQu4W2ircAxLU87PkF%2B7CIYCdeBTunjXvBbjmkJY%2FnAsVa76GWV3Z09DU%2FKzeMHAw6i6sEti1lIk1KalTpMfzvKI%2BVoVLKEVfSJZGog%2Fy9cdIyJaC8BohSaOWCuAH9pHTJolA71J5YXCE7zMR9mrH8WPq3pTh86G5SnAILDeVPi8BkgpITeMPcO%2FK%2BHCbhku%2Fkpm9JrGgtmTIV9VMrH6EY5geGa3UQSfUfry5anctV8j3NmFRlMCEDLtqWLLnSYhyGJ3HK%2BMpSM8vJ7QTQ%2B1%2FL0mq1psMkCtjAAqZZ284EX%2FIN3vxmNzRiHRwAZRkVccULJ9A8EZUYl6wvA2NEWOH8lm1A87zN%2FH0mNR1XAAKhkGi61byZfr%2FGqmOFLBGpr3eURv%2F5muUBDcxFqb6Mr78Oeah8kH%2BYP%2BS8e%2Ft6cXxfcrx6fQ8Sl8Q6KznAivdtl0THkw5zH2CAsiTGGlOdzwfAjnkgXGf3%2B3veqASZ62Zf19jJyT5mDYHY%2FGfOx24KEzY3IeGBcvt8hrWXNaVa7pm1NZW5bXoIKsKAa4kZ4uexscGl9MdS5kcziPGWYrMqnsqqYuLwGv%2Fg2PnadIwQdNRdCgsfUTgUgx5LGFDvEcKAG5sN4nk2lvsB2Nqa79Jy9VlgQNhMNTb%2Bc4GOqUBFBSqgKDeo5YazB%2ByVy5%2Fkan5Au27yVwuzbE5wY6hp9fr6aVOzt34JKvoeGL7Acb0BepXepB8tDtII174a4ABTDzcxZC12oBQQ1zqOytBs40d2NIm%2F2q%2BdgbqzuRy2GDBWUE6jjXW7a69h7D3oGTOo6YdPwICjWq6LwR3uOaxk9rTyaWCxN%2BbARFSp3t%2BXZP%2FREG4OfmlM2yzNuLXchtYJpuV8k33&X-Amz-Signature=1f6c9f2e3b70d9884f43f4af110ea95fadfabd4e4b1b263073567062d03f31f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUR6WAE6%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQColyvn8KE2%2FOR1kHeZwMnwl1PNnRUrGiGW9nyolyn56gIgHZRp9blvbnj21xJkUObVwVRcQ8XYeCC3YWShciMLtwoqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE1PGoygaVCRAZAi0ircAzsiYl%2BXPadGRrOmJanPfyc1NEqMHju%2BymAmxYfk4c%2B6qwa9GN21seGsgviLl7yw4NJx8BIgF4Jb%2FqiJ0fIxBycfriMNtTNjKfh%2B4W7w8C6QcLSSaqQkSPrDPIxH10pTLr5%2F1taPX5UPQcG8JstNXYmbqWgMmoeP2lWqBeZ4iioFAxNp%2BlgETh6rlAkyGyllvv79fFXhrxGx%2FYyJraGghm1M8QkQ1%2BSRiGigcwRhju1DZ6bxhtQZ2WOaHhClR71KaTOXw0C%2BNiZLLNamxv5fwjZfwpr7C72wSS2AFrQAK23BOPj7BusezPWgYFygjI8ls5xhrH5fk2nyMA5LVQQumLftC2l7oOSK3zYvgCvJNDaYm73ZxFvVgdeYs0dIN679sqhzbx4SyZcL3TiocDzQKM23qIqNDRCM1qH0qZ2adb9GWCXdLPv5cBLcNgh71js8zTDmJmY0DxeSNPYqE1316Bu9CujWQ9kAsBxmGbOD3nf8v3%2Ft%2BEyTfccfThyY3nGr0S1mz8Rd%2FbDIHzR9tiOjtfbCPpCk4pwmTOw7vKQeRSOM6kAdCCD1Szx2bopm7Ta%2BKOvdbxZTlwc1tjNYuEtb3TUyp4MQ7L%2F%2BfICFH1%2BP5ehlSpS%2ByB%2FP0Q5eQCwKMKfZ%2Bc4GOqUBpVK9W384%2BdoFTKDht3fCgAqxdfljF8dnOwHaR7OupQ8pKbDWDxsI8gUQys7i4yRlbZpgDXV%2BxgQB%2Bi93ltVU5k7aifAacip6hSJGSb69dPR%2Fr4tEZmjmt2sey8uO7F9V0YbraA5Yo5Meblcc81qnEG8cZ2Q6sHqIx4WANkIB0D82Xt932fw2k9UvRTBVwiG3INWIcE07lYPQ6%2BH2qmjQ1GjUpLvA&X-Amz-Signature=5000bdc299c16c6a4822031a12b38ffb7148a19866f319f41897b49844c5b992&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJDO57T3%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDWLyI%2BjJywtgQ8IjldeDSM3jcRJ8uK7GffyKgnr1Y3gIhAI1URTHT7MqP8S9lY9nDGHFxbMy2IO3QI54j5WM9VlwlKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2FIqGAI7SZbYcELgYq3AOSrlGCaPSrbF3CKWNsPyDvU5YEj%2FYBLCsgQSEm0soabu%2BcPuM5AbsDeE8svksgXErSC5PU4MqKphbeommriWLx7cFNWV3t0NsS6GGXeO8dXUo3v0QCGt%2BdxtB9WjRkPB2tHHVBZdcK1uBp4APsSk%2BfGpu8k6Tp7b%2FxsUq09blrYNQ8q30j52iylEXIlOqMBBm%2BgVyLluKrysIJd6xyVEDUdvNz83eryDlYAeyqorJjECwtRPoRVAiOm2azbBIO53SI8v8XeCzVKCGnVc%2FxiCfY8U6OMkw%2BmxTjnpBsk3cxcPNL6d%2BZsOGVz1YwBu3iNAN4M%2FH16tvWnipoyA5wsm4aY2l2ABHxUbdUilSVNc0hM2%2FmKVMk6VbddZ6af999EVv95TQlbuYtOzrBH3g7UEIW1T6qAHxezDpMy1R%2BWNbDUzyHcuCuBPek52fk7ZPabl9Csfwab1%2BndFrxuY0xaf3cjxrFPrB71MUVCpRcVmT2clLXdn3J7PSXLJAsIdfHUItuGwFF%2BBRrRCEC8tVE3xaU2odfU%2BPDUy61esTxL%2FJqYDSmsV1cYwNisyNErviG6bLNhARxk3vNIYJTQt8aEDS0%2FWBDkRZCu8J9srcMqDjxQDErV2ELx2rvKZDx0zC42fnOBjqkAXFZUJOVeYS2JzYCC6hJD7vqBNyjoylJhnIgPH4pFuvoITenyAIcAsuRSG%2FYIK6zfWjErpFFToFeVNDCunifr2flWxDsmtHXDCA4CF7XUNKZGqknnX6E2gl5fr%2F%2FKwO5HH6P5CvJyILOosFrdeBNllmbkv%2FOiWnZ4fMidcdQxsAx%2BXL35vK4TxXD1131I1WOG2uB7xlKNuhZdHqhZfignlf%2BoBVT&X-Amz-Signature=b342cebe8d9935eb88c12feab9656df336b386cf493d5312d532c821155ae85e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJDO57T3%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDWLyI%2BjJywtgQ8IjldeDSM3jcRJ8uK7GffyKgnr1Y3gIhAI1URTHT7MqP8S9lY9nDGHFxbMy2IO3QI54j5WM9VlwlKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2FIqGAI7SZbYcELgYq3AOSrlGCaPSrbF3CKWNsPyDvU5YEj%2FYBLCsgQSEm0soabu%2BcPuM5AbsDeE8svksgXErSC5PU4MqKphbeommriWLx7cFNWV3t0NsS6GGXeO8dXUo3v0QCGt%2BdxtB9WjRkPB2tHHVBZdcK1uBp4APsSk%2BfGpu8k6Tp7b%2FxsUq09blrYNQ8q30j52iylEXIlOqMBBm%2BgVyLluKrysIJd6xyVEDUdvNz83eryDlYAeyqorJjECwtRPoRVAiOm2azbBIO53SI8v8XeCzVKCGnVc%2FxiCfY8U6OMkw%2BmxTjnpBsk3cxcPNL6d%2BZsOGVz1YwBu3iNAN4M%2FH16tvWnipoyA5wsm4aY2l2ABHxUbdUilSVNc0hM2%2FmKVMk6VbddZ6af999EVv95TQlbuYtOzrBH3g7UEIW1T6qAHxezDpMy1R%2BWNbDUzyHcuCuBPek52fk7ZPabl9Csfwab1%2BndFrxuY0xaf3cjxrFPrB71MUVCpRcVmT2clLXdn3J7PSXLJAsIdfHUItuGwFF%2BBRrRCEC8tVE3xaU2odfU%2BPDUy61esTxL%2FJqYDSmsV1cYwNisyNErviG6bLNhARxk3vNIYJTQt8aEDS0%2FWBDkRZCu8J9srcMqDjxQDErV2ELx2rvKZDx0zC42fnOBjqkAXFZUJOVeYS2JzYCC6hJD7vqBNyjoylJhnIgPH4pFuvoITenyAIcAsuRSG%2FYIK6zfWjErpFFToFeVNDCunifr2flWxDsmtHXDCA4CF7XUNKZGqknnX6E2gl5fr%2F%2FKwO5HH6P5CvJyILOosFrdeBNllmbkv%2FOiWnZ4fMidcdQxsAx%2BXL35vK4TxXD1131I1WOG2uB7xlKNuhZdHqhZfignlf%2BoBVT&X-Amz-Signature=c2ba089e4ebf1521eb4625fe1fa2ef2a69624290e04c7550d1e2c07548bcbb39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HYVLVKI%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHHJAPMsKNgYcFxIaAsCPk61fhNQRCuyVa28YajqIF7MAiAprJyzU2W8Jg6z5kwjmaPqZV0txifY0DvL5J2t7aFZ%2FCqIBAiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMglIp6GlgAQRoJXFbKtwDaiQ8LP3RSxdM7ztsNkE72yFcX36ZXAHhBBsV5iqhQjS2I%2Bgi2TU0vY0kNhqtha12qTpnzYAaWjdfN5GHjQSZKIvin9N29nP91v4BWvjW9boz%2FdYBC7%2FgWZxfFZg%2BhjDeburW3%2BDJNxaergMqFHgoYdMz5hBWKy%2B0ad8egZo4NQIoZMkQ6BkqIOECpbCMoVFFLMoGactDdqXiL9sQB314RbUEyQxPZ9Xn7XPfuFvB8WK2qYGm6cLa7iV4IvlPy%2BBGEzpgR1N%2BWAwxepfyXQ0HLmAb7NL%2BSjq45rUld2ZfjU7uC2Hdcwh1NuJ0nsabXwBfmMTnojt34aYYR2JuIhiOAKZ8DCePXbAMYsufUSfhK%2FqgCpgxiJrKvVAHoVpdUCoBYD680V1IxsUHAX%2FdGQIaDfm2jFVGHJ1UzXaXJEfEe0btl8N2iJniOF5hMo9bDQNAKPuvCKHRo4JtrvEyx1AK3BQ0UdyowL%2Fh%2BoUl7I%2B%2FOqT2Vgzhdg5E%2BaKgwwSr5Xtbq5FvzLmPBxJW89x75eey1HscStSW9uwi1P%2F6ncGR%2FDxovE4JetRPQdoslQJ86C3i0z1%2FaxlJm1dk9gDSQm%2FOsKTX22brw%2BYmNiisDHGrSD5bINJYWA%2BjIT4IEq8wntr5zgY6pgG%2BmjxaWJA%2B5ymaMKMEW4OJE3IF2LOkyom1Csx6NvBdBqnz%2FURA0gNgJ8PQshMPQLKA2abr%2FQkdbWxQo0NK%2BudKuTKI04rQj0Hk2XZWStosMM6MXC2xYkH2lNOmcyS710KHZcphMM8WPSKqsM6clnknBHEo1x8x2LlMl%2Bi7K90urpSaiM1jKGlWoy18MvCT1LKkcMHQvcBtDrEFOMVJ4Syj4RGF%2BBUq&X-Amz-Signature=f21c46047b0e0a0d11783dad79370b05937d5efb0a0755375057302211ea14bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647MS5FGQ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBxS%2FADqh0H6Ji4KScSv8wrQ85yzSGls8ghLSFwK5SkXAiBw7rraMMjM93cTJdV1VOhHkBeecp%2FxwPufW7QwMrFFNCqIBAiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5r4F6G6OHa%2BXXNOZKtwDAkh4%2FYfrpVriLr1rTArNqKbEc8kFs8SQqPRuAwDDFCUBT9tlGqUYhKpZBN8LP2ttpjUVlIK5CzkEXeKQf%2FKeuZ54jbVFhkMypPbSY0MLuhqsA%2F4LhzmXsLIBcmC5EHrRjxxVBX3N5Q5%2FWmw8IfLVeAogtQH5n8qmj59l2t6jWABXODHxlK%2F8HUoTq9dTPbn7oVPLlNaMajtmuyw4NWtFVo%2BI65b%2BN6SSPdBzWqE0FLSPt%2F%2Ba%2BNg1XPfWjFu8X%2F4AzjfO3CaZa2T0vl3NQN41W3smDqj0jw5mjjYY2XUy7hkQNWHPWQbSvvOfWiazSTdOzvhOaQbeGATdWCjYTuPc%2FGd8%2F01Uhq%2BVXsCZK%2F1O4OFogoMiTFCfulTTNLadby3K%2BCrfQySRWk9YSVSPZG2ZJhMfD5hHwyHfvgqTu%2BCBgN%2FIiJfMQ6myRZx2GJo2nMw2TeX6Au5PQ8Mf5aqK2EgRLD%2Bkm6M5cKBtWoqElZOTUXBc%2BJ9fbdZFmYf5bBmRlrbIVyIvKicSgvZY%2BwK0%2FpBZXOWhcS%2B6LlvftvJ%2BdnM7b8QwX54ucgnk2S8KE9754Lo0JyU2UBLWAELanNZjjCrstBcVtr%2BlqBVhPPmNj4c6rdtvW7VvU%2BqXJljQtMEwjNr5zgY6pgGfqjNkn1CVyeluGj2H2NMEnvBVSTV6weB407RS19ouUKM62qCMB85wS6UhYSBOXSz7zQIXwB7ZBy8sEADG482eQi1dRlM5qsehXGeXSpK986cV2jbNAGrC21JQPCQrgm7Tvx1nx%2B89jf6ICGc8tLLnvdTEWNPU2kVGI9wKO2HzrkgPyxMG1Iw7QSnYNvMR4h7DECsY%2BHLfweVgHZTOVGqx7a8qPjBj&X-Amz-Signature=f6e6ac9eecf831b65e6f0263cd8c3101d93cfebb653328330f9fc759cf98bcb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647MS5FGQ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBxS%2FADqh0H6Ji4KScSv8wrQ85yzSGls8ghLSFwK5SkXAiBw7rraMMjM93cTJdV1VOhHkBeecp%2FxwPufW7QwMrFFNCqIBAiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5r4F6G6OHa%2BXXNOZKtwDAkh4%2FYfrpVriLr1rTArNqKbEc8kFs8SQqPRuAwDDFCUBT9tlGqUYhKpZBN8LP2ttpjUVlIK5CzkEXeKQf%2FKeuZ54jbVFhkMypPbSY0MLuhqsA%2F4LhzmXsLIBcmC5EHrRjxxVBX3N5Q5%2FWmw8IfLVeAogtQH5n8qmj59l2t6jWABXODHxlK%2F8HUoTq9dTPbn7oVPLlNaMajtmuyw4NWtFVo%2BI65b%2BN6SSPdBzWqE0FLSPt%2F%2Ba%2BNg1XPfWjFu8X%2F4AzjfO3CaZa2T0vl3NQN41W3smDqj0jw5mjjYY2XUy7hkQNWHPWQbSvvOfWiazSTdOzvhOaQbeGATdWCjYTuPc%2FGd8%2F01Uhq%2BVXsCZK%2F1O4OFogoMiTFCfulTTNLadby3K%2BCrfQySRWk9YSVSPZG2ZJhMfD5hHwyHfvgqTu%2BCBgN%2FIiJfMQ6myRZx2GJo2nMw2TeX6Au5PQ8Mf5aqK2EgRLD%2Bkm6M5cKBtWoqElZOTUXBc%2BJ9fbdZFmYf5bBmRlrbIVyIvKicSgvZY%2BwK0%2FpBZXOWhcS%2B6LlvftvJ%2BdnM7b8QwX54ucgnk2S8KE9754Lo0JyU2UBLWAELanNZjjCrstBcVtr%2BlqBVhPPmNj4c6rdtvW7VvU%2BqXJljQtMEwjNr5zgY6pgGfqjNkn1CVyeluGj2H2NMEnvBVSTV6weB407RS19ouUKM62qCMB85wS6UhYSBOXSz7zQIXwB7ZBy8sEADG482eQi1dRlM5qsehXGeXSpK986cV2jbNAGrC21JQPCQrgm7Tvx1nx%2B89jf6ICGc8tLLnvdTEWNPU2kVGI9wKO2HzrkgPyxMG1Iw7QSnYNvMR4h7DECsY%2BHLfweVgHZTOVGqx7a8qPjBj&X-Amz-Signature=f6e6ac9eecf831b65e6f0263cd8c3101d93cfebb653328330f9fc759cf98bcb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XXLWZVL%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T165802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCffxIvraYowDAfKU4Ad5TAqDtLj%2FjFWmEpGetUJlaMSwIgSI3N1%2FM27qQF5jnrJWQDsF5I5vyPvp3d2IVzRZEgpuIqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGGQliQVJkzvGb1JOCrcA9S%2BYr2Dn%2Flyh8IFBSAEasr9qPgn8aJl5K8yuMmJNzeoAlU38R3ix63Ne5J7Wb2uX6hwmy0Rn1qhTp1q6K%2BNy5Wkva%2BFDBMaeMqCKolGjjaJRz3aqebaeEDikumf%2FphPbC%2BZ01GJ0K8iYZbNrBTbUrfwC%2Fz8rETxYiKYTDuqUtX4RbbG5j9B55a4StTPMlNnMh7Vc%2FUTH5A52nefjRLXvk7nRwGm%2BuYufwtSDJc9vgqFUBY68iY%2BmGxgDwv00%2FGJkT4HZIIlBbvuxIQHDj%2FBV8c6Ogt1iIuoNF7W4S3qKJUDhVECisXBqYtmBvKKd6MmBnr6sgv%2Blo8UJz1LpMp0RIsw0z6dJMl09dzNGNYa8d6BHcLWbUA0Rmn9SNqd42J6fKhFAP4BTmjinflZ86C%2Fmew2r9Sor6pg0coScNAEG7SfDktvQaygWGuT4UGrrtyG63qhnmKAqFe6Ztus7x7oYy4hbkXMET4XFgqUQpgbKtszl41qzZOQDoCZRxT3kKbiebYl9vPysGuOf%2BRnJEIEnOopUQ2N%2BAAjSHTt%2BqUyFvqNKkrDnQhBQ4Y4D%2FEEkji%2B%2F8zka1nIMSZ7CJE%2FrEAlbcwoZmSJw5G0zWoBuJCywUcEvx90Fqxez5FfXPdqMOHZ%2Bc4GOqUBpSiTBmCzIHBzWwwGi8g6SFeITxHp0hzNBvgs3%2BUfKr9eE%2BiyyToNA%2FRs4MUiC1%2BGqVDqWQ1Jguxm6xNvOOTKBgxD7J3ry1wp6CQXfrMCEsueSdhUy7Gr2%2B1T3%2FjkPXMtwSo9J6R5T%2BUs7kafSQZb%2FJLCAqTFofNf0rfnViL3jie930UP4ePvhIV%2FgckuBfukwL3jtIpgfmY6MZuQqjb5%2FpAi3cxx&X-Amz-Signature=314a36387ecba9a696d86e7eb3a99a62e7e6998647d2509b0fbb16a70324ee44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

