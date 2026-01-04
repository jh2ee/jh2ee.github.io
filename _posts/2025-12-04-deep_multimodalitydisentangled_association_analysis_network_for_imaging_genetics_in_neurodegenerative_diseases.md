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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TORVR3X%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQC0eGD7zVtkPNZycOhzm%2FfmW1bWhutHl6KJiUlFMFt4ZQIgFW7quH8Hw9pvxNmVGmPART2o81Y%2FmNUYmhqw%2FDNhx%2BUq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDKa9%2FfdnGfeFPpZlGircA9xnk%2BZFfNODIlKzFZPU4LxufgVzam0POK%2FiBgv3NtzgjoKHDOwFE%2Faz%2FVw73VX002md2NQ0tvDf6CEJ6OsDdsLMIQYoeMcNnfrDNZfDJB7yTT%2Bj2vNRAfOFY2%2FRVo8PLfT5k16PMaN1tnFmzJGt%2Bwriqkph7HOWGEQyzNOCl%2FfLhc8%2BGSvaXKWK3W9kWEuWkSYIVHfVhNlYz8kCXHwuATK3R51%2FqAPvVRooiUvkw7p%2BMGeUoDkArywo6g7kkQWfmgllZoggx73hmLew6mZWrfEbTB9QN8UzyGMZ3%2FxRbubWabayBj%2B1fAlfZN5pMvvkuT5vJ%2F9OqrYMRkwBXlGGloEdIUh8BsCO2JuxKU%2B9gfSFwowOBK265m%2FULhkEET7uVw3O4w2%2FsX032ilOcflpHeQYGx3%2FzL94bJ%2FD7LIDuegawJAfV7mcepWxQqgAkrNaKsLGKCajPajmN8e7DudmCFXNinh%2Fjr%2FXNYJeSUpCzZ8beKj9NbIBPaWpI%2F2Xa7O9uSJoTsjRvnAmMV8wqa3Y9U%2BhZkJ9V3ZaVMJGx91UM6ERsKOQPzZxf11789LJeMeABWp%2FipCz4txIIxXTfGGvcqSAA5HOcAEjKrdZuLy33L0nxxDsIxRIf3EGLdYVMKf76coGOqUBkRPehzLN%2BMFf2RQI4bDU96dlvQsBPfss%2FWSJh5cBH%2F8E6O%2FeYfnoHIk36LYoB3ZXa7pUcB0AHvZILwNDRMnXmhSLSq1ZjjBglKP0Gr0%2BDdnaFnhaEFYeLu5vYtYmeJ2jfDL7Li5G5Gp8gXWx%2Fq41HMxK4p6ZVW6PIzebvKdJFINd3gHhrcjbG%2F%2FWHSHI%2BCiKBSRTpOaB1qD%2BEs4VcrvON7%2BF2emg&X-Amz-Signature=8f20e83638961222d2c947afa1385e6b4eac17eddc893fd63b41653130b78f02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TORVR3X%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQC0eGD7zVtkPNZycOhzm%2FfmW1bWhutHl6KJiUlFMFt4ZQIgFW7quH8Hw9pvxNmVGmPART2o81Y%2FmNUYmhqw%2FDNhx%2BUq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDKa9%2FfdnGfeFPpZlGircA9xnk%2BZFfNODIlKzFZPU4LxufgVzam0POK%2FiBgv3NtzgjoKHDOwFE%2Faz%2FVw73VX002md2NQ0tvDf6CEJ6OsDdsLMIQYoeMcNnfrDNZfDJB7yTT%2Bj2vNRAfOFY2%2FRVo8PLfT5k16PMaN1tnFmzJGt%2Bwriqkph7HOWGEQyzNOCl%2FfLhc8%2BGSvaXKWK3W9kWEuWkSYIVHfVhNlYz8kCXHwuATK3R51%2FqAPvVRooiUvkw7p%2BMGeUoDkArywo6g7kkQWfmgllZoggx73hmLew6mZWrfEbTB9QN8UzyGMZ3%2FxRbubWabayBj%2B1fAlfZN5pMvvkuT5vJ%2F9OqrYMRkwBXlGGloEdIUh8BsCO2JuxKU%2B9gfSFwowOBK265m%2FULhkEET7uVw3O4w2%2FsX032ilOcflpHeQYGx3%2FzL94bJ%2FD7LIDuegawJAfV7mcepWxQqgAkrNaKsLGKCajPajmN8e7DudmCFXNinh%2Fjr%2FXNYJeSUpCzZ8beKj9NbIBPaWpI%2F2Xa7O9uSJoTsjRvnAmMV8wqa3Y9U%2BhZkJ9V3ZaVMJGx91UM6ERsKOQPzZxf11789LJeMeABWp%2FipCz4txIIxXTfGGvcqSAA5HOcAEjKrdZuLy33L0nxxDsIxRIf3EGLdYVMKf76coGOqUBkRPehzLN%2BMFf2RQI4bDU96dlvQsBPfss%2FWSJh5cBH%2F8E6O%2FeYfnoHIk36LYoB3ZXa7pUcB0AHvZILwNDRMnXmhSLSq1ZjjBglKP0Gr0%2BDdnaFnhaEFYeLu5vYtYmeJ2jfDL7Li5G5Gp8gXWx%2Fq41HMxK4p6ZVW6PIzebvKdJFINd3gHhrcjbG%2F%2FWHSHI%2BCiKBSRTpOaB1qD%2BEs4VcrvON7%2BF2emg&X-Amz-Signature=8f20e83638961222d2c947afa1385e6b4eac17eddc893fd63b41653130b78f02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F4ZY5FW%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCpAZyaXIYJHGCAfbDZqXMIO7z%2BsBnKYuSiWes0MgcGHAIhAPYMTCpMvR8m9jplj4awTWpR623OBTundSH9xFqXxTuyKv8DCC8QABoMNjM3NDIzMTgzODA1IgwGHeNJMIbI49BebnEq3ANm%2BruMFYTGwkcq5l3vQFpkcUEFkPNajRIraa8PllvbB5COuspUYDq%2F4VPmL4e2rttBn5cCSOrW12ZLgvvGrsEqtCoDKspCpsprxo9La%2FgVglJcgi8mC6feBVIwtFSMWMs6Pmw5YoRlIioud9qNggDxgasygEPvGnWL1f3C4%2FnFbzi04rt9kmgdTE42odlQB5wlQka9POTbI1YWxXVqaZL6WDS3NzKa%2BT7RG5Vu2VSOTwucRNdqOAeBR%2Bp%2BxUgzoW0PKqMNFp2GNJpA3Krdfq7xvdg2CupJhC6mSvk1cNrS4dTnpOVx%2BODnV4dCqVkAfWHtThlqYFsTU6A7CSvg%2FH07P0Y6kc2%2FNez0cxoxY2JyzYgAqK2VkSQ%2F0CKYzfiBfSebmEaHsu%2BINApKQzwXN2FzCCI49PaDhfQIneDjDcOc%2BFLiBTOw6XGfC0JAOioozz2VDWwINDKstxi8yfRyRCFoueDQvrU5MLCqKD5vZJdbAHY4HHhe7jY9UptXGjieZFNXhb7TFhhfNw%2FdArVfvYPFgnLlVNoE%2FH8aPGdj6oabqWdX0LINstNwgKjiOnoTCHOwY2ACdLBLerAUz06PMAK2Hy2Hm7FPRXnHeQFVJN76lUv9kCT3%2Bg7jt0xfeDDo6OnKBjqkAZeM0PMcPjO%2BkMJtiNuu6WViV5Kgu7vKMOvX7PKcd2EhR14XMivIa%2BJMMLvmkDLF%2FGGbH%2F29W0FIybQ3pry0XRSRqUe14rU39iUquCj6uCEv6QyitN%2FZ0oeht9Hyx4eyUycqeH5SMWaP%2BrudNz4yhBr2wVLED%2Fw%2BCcgTxTN6ni%2F16tAFz%2ByJ6k90anNP%2Fu8O8FGT7%2F8TGzLIKYZ4OE%2F1nN3p06%2FZ&X-Amz-Signature=79993fc6645e50dad79bb3c9f47bf66ccaf35aa82821a8e081f340ebc85eb548&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6QPTHG2%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIFTorC45kBghVi%2FN0Gww7OU%2Fsuv7xYxQv1sD47RB7TmJAiATXqoT4HszDEekC%2B3EDRipTd%2BeZhA7V5oUTYUWgx2J9yr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIM86P%2FhXqv976hqUnRKtwDqUrAEjWmoEHRx9CFln0iN64HIcMeP%2BPpJyLS%2FLcYX%2B5UR6obudzMNbLUTvIFdYrZJ0eJlhDw406vBe8hrFW4AlastxE2MNTb9825oDeKpI53YmHfUQywwb2siuyvwhPK18CY%2FYzbZkLie1I%2BtPBMNMjW6Ewp63YnMaV4YNhcCksc1JgukbDD2t51lZkKssZyc3TF8P0Jw9FrKsG89FikjV94VXT0WLMzK45cUj3k7NHVc4tBET0w6ZQ88Y6o3hJn%2FFuy81iZqRpIo8lphmqNiC9yGzjf20CA539T1jqVAHEi2Z1MbzH%2FaNyZGT1zfJDFcpomx%2FQOVNdcY2LQ6twyPL6wdUq7wySGzdcpJbuUo%2BXHzaejd9et2LlMkAMg9j5GN%2FMU6cuCQPRP4wy0VfUTDRYRDXOLURPucHSD676DJIEeuxjotaEv2t%2FMnvTKJGJg7PdzF3K52XrbZBqi6eGEgVOLaILgDko6iH15J4baIWZv9z%2BDfEgmxVXrlDqysevfIKyosYVNt4kHAtykp1Y3VdiI8%2FjtUGfe5wFCU52ysGBvMMo2KhFsRGI%2FoCQWIo%2BqGUv6S6CefqIqo6vE1s8H3xct7yihnqena9MT8KV4C7aWWfq5hjL1ARS17Mcwv%2FjpygY6pgHe7i5LtHhidGI26rQ4r79nr0m7Cm9buP1BrDT%2FmHMmbZcxdmmItGE7zlwnAgChupGWcLmGC2f8nFRlwzx40p1UDySYCDiBJW9BD5arQO7ZH5EFR92Flqvc8%2FYW7N2PGNRAR%2FP2Cr59%2FgQc2OAkxm9AsKf64y2L8iYjt6U8qn3uHzrxcnxsbxAq9Y6AlSspSWZBXHQ9dkkoVMaCG5GnFhkQc2YS6QsK&X-Amz-Signature=49fbb797e23644a9211e1896f42e5889abdb85eca84e86f40f96d6e6871018d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6QPTHG2%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIFTorC45kBghVi%2FN0Gww7OU%2Fsuv7xYxQv1sD47RB7TmJAiATXqoT4HszDEekC%2B3EDRipTd%2BeZhA7V5oUTYUWgx2J9yr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIM86P%2FhXqv976hqUnRKtwDqUrAEjWmoEHRx9CFln0iN64HIcMeP%2BPpJyLS%2FLcYX%2B5UR6obudzMNbLUTvIFdYrZJ0eJlhDw406vBe8hrFW4AlastxE2MNTb9825oDeKpI53YmHfUQywwb2siuyvwhPK18CY%2FYzbZkLie1I%2BtPBMNMjW6Ewp63YnMaV4YNhcCksc1JgukbDD2t51lZkKssZyc3TF8P0Jw9FrKsG89FikjV94VXT0WLMzK45cUj3k7NHVc4tBET0w6ZQ88Y6o3hJn%2FFuy81iZqRpIo8lphmqNiC9yGzjf20CA539T1jqVAHEi2Z1MbzH%2FaNyZGT1zfJDFcpomx%2FQOVNdcY2LQ6twyPL6wdUq7wySGzdcpJbuUo%2BXHzaejd9et2LlMkAMg9j5GN%2FMU6cuCQPRP4wy0VfUTDRYRDXOLURPucHSD676DJIEeuxjotaEv2t%2FMnvTKJGJg7PdzF3K52XrbZBqi6eGEgVOLaILgDko6iH15J4baIWZv9z%2BDfEgmxVXrlDqysevfIKyosYVNt4kHAtykp1Y3VdiI8%2FjtUGfe5wFCU52ysGBvMMo2KhFsRGI%2FoCQWIo%2BqGUv6S6CefqIqo6vE1s8H3xct7yihnqena9MT8KV4C7aWWfq5hjL1ARS17Mcwv%2FjpygY6pgHe7i5LtHhidGI26rQ4r79nr0m7Cm9buP1BrDT%2FmHMmbZcxdmmItGE7zlwnAgChupGWcLmGC2f8nFRlwzx40p1UDySYCDiBJW9BD5arQO7ZH5EFR92Flqvc8%2FYW7N2PGNRAR%2FP2Cr59%2FgQc2OAkxm9AsKf64y2L8iYjt6U8qn3uHzrxcnxsbxAq9Y6AlSspSWZBXHQ9dkkoVMaCG5GnFhkQc2YS6QsK&X-Amz-Signature=93b5ce78258a9dea02d8348a5ad5d5528e5c46d8a1d1bc7ab62fe8d79ab69d65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RROIVB6%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIBnu95hJCOlo8Jfl%2B%2FFozm82qIW6waKuXaWLLA4nuROOAiEA%2FbXrpIiAsmk7uWP9INfUOgjkbgw1womCxJ4F9mI2M64q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDG0REWABwluMRBeRPyrcA8aG%2BXhDYSW00PaWrlkhGG3JMO%2FLfx5z96rxir9Bx6WrxEfofALsRdDgUPc1E8k79DZ8C1X%2B6uodniYXdA01BYWP8sT8l9SZP%2FDraJ91qKIlMTB7bvbYpRiNnG%2FISdeMCS9k7iBChC7bFq0kpUEmoELWIrvJeLsOeBp86%2BUlVZTDUyYzsxdad7PCrvTVFWSnO9cP6EmX2z17%2BaqWioxlfsqPG7qnnAF2ZuALyB90eVTmcvp9RqMb2iAurFW8lS1lHgErk8rhhk8CPAvX1%2B4hVdprDQLlsu6Rslpwuy%2FSB1sAAixbdxB4niY8QwadY0xIgOtSBbSj%2BNSPYyhVfrvJerk9K5GjdjmIxt8Uu8tz8ZiBysIJcThQH4DtCZBBPoM8DOr92lQCiCUTdJtYDOOKIEi6qxoEOMTYLhpKJVANHy%2FaMDL9iun6v8XsDLubmH9HoajuBAXgk6S9U%2Ba%2FvuFGBrbQxJszhy4xC7pPP2XNI7cmSzxaeuslovQpMDXwdyEUJX2ZK6l%2F9raLDENlKTS4EZWBAzExoBe809voCW0S66Qh0SAM%2BPbEml8UiEajYOsu%2FQ2l8cJvyFooDXZ7IYgTw2rdf8j7dnFpvoyAAsjSnIFtnb3%2B4g1TA4jpeZotMOHp6coGOqUB0EXoUTu0NSkm%2ByH43kkEW8gEmlLrteb%2F7zVd7oEYP3P%2BZ0nbI5MwB9MHOwKnB2MXB1xSuSF7ZhAdM7BBjCnbpqIOZ62qHaYzdDAoytaxF2QOihwVuSN1AdhWb%2BWCyuPQJm%2BNg5D%2BmbL0IshUUUBelnE%2FqyHZ8WjzJsjwXm7xbi62CanFxs2Jtn2Qt8Mqj5qc7tbyjULjYNIzq%2Fj8DlaWHifiOtWU&X-Amz-Signature=00f71b12cd5205e6a8cf95d71ce516866b0e769a7a8e1e17a710cce473108db2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JYLXKYF%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIA32c3IgUOJDCWqinBybjb8YOirbst%2Fu5ttcg59nNhjGAiBVYi3NThXjG1LV6feDX7TxgUZvCUaB%2BDj4k9MAOVYnWCr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMm2602xpiXLKwR%2BaeKtwDVF%2F0kMEeq0N6XgSSNuKaq7TMMlTQ%2BRf8ChoQHnuBhkjB%2FfIMtmvo5lDOHOthsoSmQsMN1sueC07XFz%2BAWB3elbBHYE9Rh96R7tlZS7tdm94iMZ6A5%2FAeqvoJkfbQUu3hXwPa7FCYmxeNB%2F7xkIuhWEeDLUUnfEoa%2FofnMUcZU7w7JZiLF5JJei12PtgaEtfkLiXnChgRb02QQnvF9m2grIm6bbIIIzW1jx9GBgIgCunzozdjIilEF3vlv2PTgEYIBqOhYYsjZCZRTftaA1WEgh28IY%2FhF4TFZLTM2UXQiwo%2F0NeslhW%2BJkPyiJ%2BUoSFHuZ4%2BcdZWK%2FlfmTWCuq3KzHizR9MA8KnJh%2BVT%2BhABBnhZEWrI3iITecb8TmwnLx0xcftorV2G%2FzKp9m0x8c30KlxggdtjaT8YsVmwHNEp5XmkfgHsm7UGT4dBUWug4zCi6Qqt9Wm%2FEMvNbf6P4y1H1w64zPMUgZBf5LnpkdelCuKa6Ruli6k3watm2oiYii4a5eOzZvYM9LL%2FRK%2F02x%2F2MrkO45LKDNZlSGan8ddBGem26HNz2sP4hBwmzKOn6EdVomw9B3hOx1QuLVNcZhA8YNZnF4vQEyFZ1WRxoOMt9QwvQmGgtUpG%2BL5MMR0w%2BfHpygY6pgHLsqQ6ILltXO3zOVFzxCXmKvSpjIQrDrs%2B3BrxeTOfW%2FF886tgU4%2F2Nuzgn%2BLGBv1hu7Sq60nHwS3cl4BawzHhPAKBdGhS7Sv5Fm%2FP3GOVrVt1of0PQIqgsXQexEsEWRV4P%2Bshfw%2F3Q%2BLs4PzcfdJ%2Fr0JGlhz72%2FLLeuljjn4DMDw5vVO%2FoSbbVIdg5YST4MvQhxLymLcEryf6wV%2Brw%2Fbhu4upoIDM&X-Amz-Signature=648118dbccfc24bc02aa4d8d4d2ee4af5cf71851d767910f6dfa21fe8eacb9da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BAUW3PR%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQD0k83H%2BoRjFUPr95IokwtRxGIOlzjWVufLKlf1l9hGcgIgXeg9Rwfw%2BbVGdgRAwFRfIlRTXies%2Ff2aRgRxBIMvJcUq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDOcT8eBbHQNYc4DDpyrcA23Sq%2F1QNhECarIQQW5DPS4Y8Y0feZ%2F6mhcULRf7eAO6JquYr3MPu8aDIoHAQwJGrGctyeSh5%2BfAqywO9tV0T4ezNOYZNh3J0qWchZoyLGzt5dfNp5cJl8DWaxQazDLcFKnjk4OYSV5LVsTUW0Aeuh%2FEOtERQgcecENHerMPS5th41173liL7eNlBcgORVpNaxpQCK7HwGkVqgnMN%2FxVuFvS5CSRrioVkAwGsqj0LANYyPP1VwhjHat%2B0beirDb3N0I9sWH97VsHBtVvMPakn7PHzauFaCG960uqrhxVtZb1%2F%2BhypDXbo0%2BNvsHby6IpHY773jMKS1k21WT3ohnhvIdAftYXj3yj%2BFhwCG%2FlQiT8lnkjShXZm%2FU%2BBi%2B7JRtDmczQZkxBjY26e4wCyxiQPHYVdDs%2BwbChaOwHb4ZCzYaVVVYTk%2FTabHO7gIVa3lt8uWvjLAt3BwDHD%2FclTFOMr5byi6gJtfP9Kk2SaNn4kFrRfu8hKvdhkJDE3BK5ZFvJxXvvE1bUZ950UStSiyYioe2F2teYzULmA0VxbKREZAFHv51FznBuFTCfmq6NB4bxy75c8HxsrEJGAWCoXPTNFu7X16tZsvnsrglI%2FP9kQT4zzXxshackbTTU6kqWMMzy6coGOqUBWbvDydm%2BCmo6QUhj9KbI37vep4evqEXZCe4tPOk0IREXonR1WpZVZ8fuP3o3KAl3MLrv2DUzByAF4JCgnwpI%2BYmRrmhHt0cc3jskDoJ0tvTqurepahcYsc9eOD2dFyVVYCasEY97D9JtkmN3e9VPnd2efn1f2OSNvTw4D1e19IuZ6gVLkNMZBWqKcBoBcRPhLd5jlR4ZSylhK%2FOIm6H7VbwIu0%2B9&X-Amz-Signature=24c9c4daf7135bac5023ee2bb4bcc6e1bd7e94a9b509b48fb6efa81a40e588d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6WNARY5%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCrVrgHhIYKTeKRYljAKR1QmjDKudbUXwsm0RbvtUr68QIhAP%2BKXjaqamd1pZKReBMmp3VRNDBwSLuhJEzUAJHsIHipKv8DCC8QABoMNjM3NDIzMTgzODA1IgxXyv8vUz6rn2mkF6Mq3AOqNyYdRlALGg9II7E3w4X5Lij99VsIXoXyjJWX0wiCxFLV5eLWOoZP03LzgvoAuaYPEJ4iZIsJ7T8D2bCoVFg3781A6O0kAgiuk3zD0Ed3hQvfnsQ2O5B69GogyRJ1A129%2BLaKa9O7mP1WGm72YM1L4o2Dj5GXkkOUSqewxEDP5OQaHAmvaNmnCPg8PbDM7W%2BrLCJnNynrHZl%2BBlXAWODPZEHqML5HpueD1PyUd7UuB3wc%2BiLW%2FWeOUOTmVs0kUiowgSrcVp74%2B9dJtDbbGz6ww%2FdLf%2FKaid%2FRUk%2BU6kTEjbQve%2FXaq5wo8ZQC3abedU4LmpdXbaNjpwLv47eu6hvPX1t3nm6TnaMwmXzMjEw5nzwRGtdxr6kKzdRqXCbUwb2P0VDdNgWkQBNqsfR1UydS9m8aF0YX3I9ajmMHfR7t7n4w87zBnFq7C%2FmgL7YZsIXBM3EeCPnKzD0IuxsukVxGuTYCWuMK%2Fz7es3NmMjti4TZHcsg3GMSJ2QqDchO5KBcPUU27YLhhfiUoEGAsswAuZHXvMfoXpHj8%2BR%2B5OSA2mT4%2BG11Tvws5jR2Sy9TcUw4FEzbvn6cOZp6D%2Bnnrd5%2BjZ8meyjf%2BWkbQ2%2BSzp8XlsLXLX0BIi%2BQfqzFsQDDz5%2BnKBjqkAZfnrnsPr4%2BYsWofLVL1c1xD8hnSjZdnIMVu7PuHvATcTPJxhwmWmAVvDJ7dpSAAHnspJyT7fkdaCFG0khZT%2FF8R75zS1dlWA2107UGkxcKKu%2FP%2BTOItNAJuyV9AJx%2BcqjARRgknVgrmaUf0aWp5RFyAFaUNCfAieeBElI7fqpCO3WWb2rmb9iAnlpoQQ7bjVYvbv0nfueDYKNcnPkeEmJaeoFoT&X-Amz-Signature=19d40111f3775d61a88631969ae82deacb503c52a774cb4a77de80ad7bdfe70c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6WNARY5%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCrVrgHhIYKTeKRYljAKR1QmjDKudbUXwsm0RbvtUr68QIhAP%2BKXjaqamd1pZKReBMmp3VRNDBwSLuhJEzUAJHsIHipKv8DCC8QABoMNjM3NDIzMTgzODA1IgxXyv8vUz6rn2mkF6Mq3AOqNyYdRlALGg9II7E3w4X5Lij99VsIXoXyjJWX0wiCxFLV5eLWOoZP03LzgvoAuaYPEJ4iZIsJ7T8D2bCoVFg3781A6O0kAgiuk3zD0Ed3hQvfnsQ2O5B69GogyRJ1A129%2BLaKa9O7mP1WGm72YM1L4o2Dj5GXkkOUSqewxEDP5OQaHAmvaNmnCPg8PbDM7W%2BrLCJnNynrHZl%2BBlXAWODPZEHqML5HpueD1PyUd7UuB3wc%2BiLW%2FWeOUOTmVs0kUiowgSrcVp74%2B9dJtDbbGz6ww%2FdLf%2FKaid%2FRUk%2BU6kTEjbQve%2FXaq5wo8ZQC3abedU4LmpdXbaNjpwLv47eu6hvPX1t3nm6TnaMwmXzMjEw5nzwRGtdxr6kKzdRqXCbUwb2P0VDdNgWkQBNqsfR1UydS9m8aF0YX3I9ajmMHfR7t7n4w87zBnFq7C%2FmgL7YZsIXBM3EeCPnKzD0IuxsukVxGuTYCWuMK%2Fz7es3NmMjti4TZHcsg3GMSJ2QqDchO5KBcPUU27YLhhfiUoEGAsswAuZHXvMfoXpHj8%2BR%2B5OSA2mT4%2BG11Tvws5jR2Sy9TcUw4FEzbvn6cOZp6D%2Bnnrd5%2BjZ8meyjf%2BWkbQ2%2BSzp8XlsLXLX0BIi%2BQfqzFsQDDz5%2BnKBjqkAZfnrnsPr4%2BYsWofLVL1c1xD8hnSjZdnIMVu7PuHvATcTPJxhwmWmAVvDJ7dpSAAHnspJyT7fkdaCFG0khZT%2FF8R75zS1dlWA2107UGkxcKKu%2FP%2BTOItNAJuyV9AJx%2BcqjARRgknVgrmaUf0aWp5RFyAFaUNCfAieeBElI7fqpCO3WWb2rmb9iAnlpoQQ7bjVYvbv0nfueDYKNcnPkeEmJaeoFoT&X-Amz-Signature=5c4fb916f607d4c5ade6042108487e5301307a8ce32b342fadb85bd21f7a8036&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662R672FQA%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQC0jardqRXh9CyyTXAAnsJLLmIBbtzO2C0siIMcp36FxwIhANM67mhyCQEHOa4lvj68XktPyPKfe%2BrPMM8YxWG7zPA4Kv8DCDAQABoMNjM3NDIzMTgzODA1IgxWzOpPGneg6dvl91kq3ANx8U7ZoGCbIZaqX1WayHRtb5ToabV9WBTX5eIM2%2B4a87Xv%2FxMQPveBAIs27%2FS2HSK0bO48VKm99sCr8gQQOy834AYGqRLOvMYp3MkAfMlrOduJ8M%2F6%2FgFDU%2BaE8aMcsbY6XMspsZO31StupGxy0CEhq5WrxXWhm9LvDhLRD%2BdW7h%2FPOTe1tGxC8Or%2B8n1qphlsoz%2Fmk7Iqwxg6c4rJWmK%2FBgvO9it2jn5bAz5r5s%2BFj%2BPQc9q%2B9ZNIQcY1iKkTABKdpvg0%2FKyOP%2BEHozzrhQPuCj23m8X3QVwLO%2F%2FGjtjk55o8nSBEexhLx6wlOGpvEwRyra2dFOoLQSrFvccgvsgXshs1UHXtUoEGicZ%2FQo%2B0R2x41YgGHVVbVVwOft%2B6FOHND%2FyrHjTAMRMxkLWSXvX0WWio2Tsptx1esIwBkW2T8Zaag0k%2FWOTq4ZDiHAtyhCnHLE8ajvTZw2hkBLz5MEEA5sIcXjutm5xHeYS8qtubgqDZhlvwp5EAEWINELzcR%2BfSpl7o4q9IiRJ2CcjDDtuUbejN2OFZi%2BCMOYDtd%2FbM%2FQopBgUokkreUcUTeY8CMpx18WT8H4uSlqFD2uks5dnHu1m7xfvdt%2FfkHamZ5HWevxSDpk%2B8Ii67pSnl2jC59OnKBjqkAd3UB3FfK35rnFlvgP1e5YoAQSIvuL%2Fhf5pS2Bk7Pw1EIF%2B1v9Q1OFPfFaIWwXylR%2Bf3GE%2B6IwXRm5Zp9pC%2BqBH1K%2Fj5hEkJ4Wfh6FSMFfpaN2mR7tunLdT1CguTFGgW%2FWeU1ly8dhmGoG4gFKITUYeXEGuIY4nQT1AIxXwNzoDpp0AlndpkDGXnIS%2BUF%2F9vlAZk3lYvrVUFovhyzCdNvYdNNkAb&X-Amz-Signature=ec101f29204767619f6547fbec79d13ddee3f71ddfec02c558eece50b0df8726&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664A73XZUE%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQC2ZkkfeJjQtO0sQG5j4BAyEhJTFlUlg32jN%2FUUiG63lgIgWiJdipgCBVLZGUntTq81JHZYhPJbheIcsMLXAxM0Tl0q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDIZThZW67PihXGgiDCrcA4QYQiXAKCU6Hbw5VoYpPauFG1zDwRDaiWDbCBgn%2B6FeiJDI8cLyqYT0%2FgQXA%2B6Y1qDQJH%2BHpPMjvyl%2Bfa6Vet99j9tBnetPLV%2F4KbBPXGwVl%2BK9sM0oX0Y7VJrXqVDtWuKNcMEa%2FBZomovVR%2BMU6c5B6Bakj5f25dCq9LoHpZEzoy0I2yj2osJ0B4FUEke8aMn%2FPqPipofN%2BuWGiGdpL84imZDuAn6ANrLCsw6U5qRy8TBJhw2Q9wfdm9vhxchmxeXqRIloReXe2CavgVDo7jpO7Yh003g84finxVyxTesrxOHssSFQ9shwvkxmDihLlk%2B4MheYJxUVhRzzn9pL5zBR1Bhq9U%2F4n%2BYZgEaBZWlAf1Qe8ptYligXOMwJdvQ1zUgCTF%2B%2BxBR5D1jk5NdNaq%2Bg6zYhoxmxYOBvvbztldZv%2FT8WTRy2u4Ux3J2qX4gej01N02kTDXEx2AvpJSQ2JcFTZ9vJGM1WgYhbZ5VniGjiYitXmgvCeweoOtJO4QJAwpiquu61mxkpIFT4iPHrmqPi4BhtfDG%2BrADdLjwC7jD%2Fp3TxhTpmsR6yeHxIL4El0d0Ekdx1VyUKuoizsWK2UOKDXNeQbR0mkbo3ZqHBr6%2B62Zf2lPYjn5m4roA2MNDu6coGOqUBn3FHuL%2BB%2FT%2BKAwcCRI2CQtEAKbhZ0kdeeFt9wKwLYGhtQ%2F4yhYvA5KiyMA0aTb6JDNtR2P%2FdNKllk8djU2XmKxa6NBcc3D%2BuBFfV1mnMvdnEtkamyTUH0S4uj1r%2FPvJ2hWa1W1BIniBY3uF2k0WLrA5HobZ94FD627zranE0NbAWasgdeIXigkiEZX51yhW8j9QelirYFaZP38NdGu2fMAcsaWup&X-Amz-Signature=aad297062518e7754c9dfaf505b918194ba965e45adab13df7e6c9190122c7e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664A73XZUE%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQC2ZkkfeJjQtO0sQG5j4BAyEhJTFlUlg32jN%2FUUiG63lgIgWiJdipgCBVLZGUntTq81JHZYhPJbheIcsMLXAxM0Tl0q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDIZThZW67PihXGgiDCrcA4QYQiXAKCU6Hbw5VoYpPauFG1zDwRDaiWDbCBgn%2B6FeiJDI8cLyqYT0%2FgQXA%2B6Y1qDQJH%2BHpPMjvyl%2Bfa6Vet99j9tBnetPLV%2F4KbBPXGwVl%2BK9sM0oX0Y7VJrXqVDtWuKNcMEa%2FBZomovVR%2BMU6c5B6Bakj5f25dCq9LoHpZEzoy0I2yj2osJ0B4FUEke8aMn%2FPqPipofN%2BuWGiGdpL84imZDuAn6ANrLCsw6U5qRy8TBJhw2Q9wfdm9vhxchmxeXqRIloReXe2CavgVDo7jpO7Yh003g84finxVyxTesrxOHssSFQ9shwvkxmDihLlk%2B4MheYJxUVhRzzn9pL5zBR1Bhq9U%2F4n%2BYZgEaBZWlAf1Qe8ptYligXOMwJdvQ1zUgCTF%2B%2BxBR5D1jk5NdNaq%2Bg6zYhoxmxYOBvvbztldZv%2FT8WTRy2u4Ux3J2qX4gej01N02kTDXEx2AvpJSQ2JcFTZ9vJGM1WgYhbZ5VniGjiYitXmgvCeweoOtJO4QJAwpiquu61mxkpIFT4iPHrmqPi4BhtfDG%2BrADdLjwC7jD%2Fp3TxhTpmsR6yeHxIL4El0d0Ekdx1VyUKuoizsWK2UOKDXNeQbR0mkbo3ZqHBr6%2B62Zf2lPYjn5m4roA2MNDu6coGOqUBn3FHuL%2BB%2FT%2BKAwcCRI2CQtEAKbhZ0kdeeFt9wKwLYGhtQ%2F4yhYvA5KiyMA0aTb6JDNtR2P%2FdNKllk8djU2XmKxa6NBcc3D%2BuBFfV1mnMvdnEtkamyTUH0S4uj1r%2FPvJ2hWa1W1BIniBY3uF2k0WLrA5HobZ94FD627zranE0NbAWasgdeIXigkiEZX51yhW8j9QelirYFaZP38NdGu2fMAcsaWup&X-Amz-Signature=aad297062518e7754c9dfaf505b918194ba965e45adab13df7e6c9190122c7e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDOP7W7O%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T200114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDhV8pj45dm%2F7xSpMJqg3BG0V1RhAfFcuIB2574WekkfgIhANW9OL%2Bnfcbf2OaVNkxTZKbVrZxuSD%2FIShim5OSUGLg4Kv8DCC8QABoMNjM3NDIzMTgzODA1IgxA32%2Bl6e0RPo9hyCAq3AN7vKPUiX06eTlSaL8nwRP9mOj30piJ0rj%2BVMKUCps0PDMTbXT9zUr2F2Y%2FW5Eosx48w6YS3lQcxcuo5HmHYyenTQalg%2BtscSSDC5PQ7wD7hAZ7qeQuMMf51kcD6a8QPFwWQTS1k3RsQHrl3aPjeLueTR%2BW2Jq1G9msEjWsHesTAa3gIn4lYyiL3AhdSK1qeD0HehYxC7mT96sS%2BUBnagUXKy7AeN4ZKv4hHCSWROZEnxfJGceaM6%2BIL2gbL5ld86dS1uvby0rOdZ%2BQWYwnR70DxxqlbEda1F%2FsscgEQfC%2FRti1XAwuPJ8j64jFBkAuFh0jr5%2BFq%2FxGo20psjbqNI%2FKPZt8lQ1AO7EJokz5R2NaOwHFmvzEw7e4BdUXXx2bV%2FmTZk6VBZrh7J1ZsOLDt5STy4H1ec80ZGVOzLBb6j6DppakBYBEyhPYiXEzzGrdkiPUU%2BIOsc6XxU3IpkzqGrg0ztiMtnzkZLnw9si%2B8n8PomAPLNu13ccDfB%2FZz99g%2Fi0D2f6HQGV7t0PY5AdC9GKtVL9ZOmc9fhH0YhcgcK%2BV9min96PUyqrI5xe7LTimO9vt9RU6JE2LSEmwJnXLH%2BevlZN4NyOZN%2F2zhIN7kqrTPWjJ04GQlz%2FsQUi%2B1jDM6unKBjqkAcMPFKWH8xWKACu4zUXyePTgKdYWg7AMgM90yfY8kMuf3BAT7tTTuvT9tpiIjx9zqXhBJ7djAqW0e5%2Fqq0z6ULfvBmvOVFzDvAkr0aQOltr%2Bgsm%2Fe%2Fgr3mvMr2oKPfcjkFFeOTXWn30mle4wbmbbKjmv22HCwXH67tsqeogkYb9CwEo%2B7tCNoQILpjwTUPUG9Y%2FnSA%2BqlnCr%2FT7vME%2BYo8XsqYp1&X-Amz-Signature=bb151eda881129aa42936a690165c705613a4dd83b5805d31ebb5307c9d08752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

