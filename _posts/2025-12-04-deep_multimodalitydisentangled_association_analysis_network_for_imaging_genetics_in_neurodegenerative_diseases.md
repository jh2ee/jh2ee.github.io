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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JGO46YW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQDNDq4fkfxABgZMLqmvAUEDO4gSHBWB7erhfUc2hhWMcgIgA5A3%2FP0V4KnEKAzY6DSejkMJIWjK3EzKjlrd%2FV%2FD5LsqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHNdviFAuj3whW6CEyrcA4kCnwdPdGAqjNqvUmynMoMJuy7HD9R25rrHqogrJ6bva8C4GrH1h6kzzPJKNmUI2DSgH88DN1PZYLpsOT3bzLHZVvMRn5cm1hZOcU7SlpzRJ6UciN%2FdWHKx19Q6HtbYVwLjAKUgOSYwRHhio5XucoDi%2FaFsiJKqNU5joyJsvw1TBpWR076MUC2mH3nhA3Qe98VQ8%2FsGQH%2B2o2BngcV1%2BP5baaNQ7eWGfgH5ksasgbVfEUxuG5%2FewvsRn2%2FiJsymXrU9VKGHrULFoSgGMcb5jBEPlGlIIIgpilmQixPNptgFmPHtyWdHhgkks%2Ba3grXGnRYrFxVFlt3LAdJcZZKKSvr3A4HVq8rSmlAMRQU5ZbLNZVa6Iy6UOeJpL1c08e8FuLsIz%2FoNkzgLpj3HKWH7%2BBE4GWIBqEL%2FuGpvC3YOonBcbQIs2SOfIJHrTw31dlqe8o5wJGiazfNo3cmji07liBiKSFXO18KsRrq53jBDigtYOd8gQSJtRYHpADudX7sS87jbrRqQgwXmbaqpyjb7FigZQyc7Y9U%2BpKY7zkMjmtAthUePcLyDVSJjfQNEKQsKjoRSdcHCi%2B0gKOEVtjq8wUH5AXNwB%2BHSRSLMS06xrnMZzY%2Fb3wj%2B8zLMJxYAMLjyjs8GOqUBc7RbkfstkUsvCwovBRWpigpYOkVxrk3YR1a%2FQvSHR24YgLdsvYRwE6ZSbUXSuWUkyMyInvn06IzYiF1kI0P8o4A8n314qADqwcrmwQ7tYY7gcObEQ3PCJk%2BkSuc%2BvEnGuoKjmUXzjkSQT97%2B%2BXR8zyJ43MzvahHVBud1ZkMPAHiMh7NscReLl5pGGkobGwi%2BcryRAvYYdKHZzOKga%2Bosu16eM9r%2F&X-Amz-Signature=c78fcdf0f7e98678cb9938022eca2ee490db3df890e09390a717337c67617e24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JGO46YW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQDNDq4fkfxABgZMLqmvAUEDO4gSHBWB7erhfUc2hhWMcgIgA5A3%2FP0V4KnEKAzY6DSejkMJIWjK3EzKjlrd%2FV%2FD5LsqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHNdviFAuj3whW6CEyrcA4kCnwdPdGAqjNqvUmynMoMJuy7HD9R25rrHqogrJ6bva8C4GrH1h6kzzPJKNmUI2DSgH88DN1PZYLpsOT3bzLHZVvMRn5cm1hZOcU7SlpzRJ6UciN%2FdWHKx19Q6HtbYVwLjAKUgOSYwRHhio5XucoDi%2FaFsiJKqNU5joyJsvw1TBpWR076MUC2mH3nhA3Qe98VQ8%2FsGQH%2B2o2BngcV1%2BP5baaNQ7eWGfgH5ksasgbVfEUxuG5%2FewvsRn2%2FiJsymXrU9VKGHrULFoSgGMcb5jBEPlGlIIIgpilmQixPNptgFmPHtyWdHhgkks%2Ba3grXGnRYrFxVFlt3LAdJcZZKKSvr3A4HVq8rSmlAMRQU5ZbLNZVa6Iy6UOeJpL1c08e8FuLsIz%2FoNkzgLpj3HKWH7%2BBE4GWIBqEL%2FuGpvC3YOonBcbQIs2SOfIJHrTw31dlqe8o5wJGiazfNo3cmji07liBiKSFXO18KsRrq53jBDigtYOd8gQSJtRYHpADudX7sS87jbrRqQgwXmbaqpyjb7FigZQyc7Y9U%2BpKY7zkMjmtAthUePcLyDVSJjfQNEKQsKjoRSdcHCi%2B0gKOEVtjq8wUH5AXNwB%2BHSRSLMS06xrnMZzY%2Fb3wj%2B8zLMJxYAMLjyjs8GOqUBc7RbkfstkUsvCwovBRWpigpYOkVxrk3YR1a%2FQvSHR24YgLdsvYRwE6ZSbUXSuWUkyMyInvn06IzYiF1kI0P8o4A8n314qADqwcrmwQ7tYY7gcObEQ3PCJk%2BkSuc%2BvEnGuoKjmUXzjkSQT97%2B%2BXR8zyJ43MzvahHVBud1ZkMPAHiMh7NscReLl5pGGkobGwi%2BcryRAvYYdKHZzOKga%2Bosu16eM9r%2F&X-Amz-Signature=c78fcdf0f7e98678cb9938022eca2ee490db3df890e09390a717337c67617e24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UX5YTYGR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQDJuZJMjAYoevge23uiA2nfiSZc5uFToR3OmNnUw5SJyAIhAKVtc53p2WB45dKKIAvVlFtk0ril9B1XcsCVTTfWSkcFKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx2i0%2BPqW%2BwCKbwTqcq3APjh4KcxsC4cgBXbB3CFMZM5Nlgucea1dD14KNmkaG2Mm3BZ07BtJ1QrQUl%2FmlpFjXfOnsC7D7tj%2BYw8weVm1ORGUNwKAihQ7dQHFT1%2FRFB8A5d6Gn0xvIH6Dj%2F0pY%2FgzOPpUfJ6dHtuRwu6HC3uDXUg0qioXkIHFB3uBbEoSEMOnbeP41vMcHZgf3SLtCe%2FZshERmMH2nYW3yATty10DFiu8gQ3uiSJ9UGTemWfdxqF5i9NvyMkem%2Bu2%2FO9v2Jck9kFDRYsPmxlEM45oSAevxYWkMTk%2Bu20rD1QWYk5PTbpo%2BDJdHzSf30ESzmuGnH07QKx5JLU05VszKmOfzZ%2FJF55zkM6FJiPokavnxH82s9ZsgDbyQBilCtPvbahlyazWdcmNui2vqDaDBYQhYHtshx2ntl3OftwqjpM%2BL%2BimmfP%2BA%2BJfTvtLwQaTx75v09eqDXNG6R1NNNLe34W7Xv3XrFRPqFUEks4PgKHaqTQZZNhhGj3J2snWr1k0GPjZdAFWvSGTByXEzB%2BEaSo8L3WEmMfXF1Vts8zDuh38RA9wZoEXrlJGyqogDNlJc0DqeF3feQ%2B8rmccAw7WIwns5dgzwBunYirEKHXmJ9mJrgC%2BPx17YmdZjdU933v8IyYjCh847PBjqkAdIkDNPIi1O9eYfNLQoCtl0csOVJ1eYGWvtYBRWE5blqTe8981xmtCLG3Z2NO%2Bumhc9hbqCymZE%2FRKYiJKrcIxJubDXgiBD%2Fd9ik1QGi%2BuSa2f9cICfkrn4R9Al7cUBFvLQcl0bHW%2BYNHJ1OlL4VeMxr3p2CAzr437sG92YGTGr2r8p93zufnj%2BsKXmQISiSRTl3X3Sr9oPQuWGM6ZGowtz0e314&X-Amz-Signature=1eb3120c9234c8268a7c7df5f71644b89a1a2c9682fb6aabbfb7467046fd5ec0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFCHZSA7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCcS47yCygdmT563H0OOfVQKY%2FIwk0%2Foa%2F7fqwXJhAOgQIgdDzd7Fm3rC1HK%2BNDLGx%2FNhiRNHehGrUfIMGQJa3SN3UqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJQkrxRU2sxA4LyEhircA9utgXCvvGdKgd1TrtdDXNIxLiDYdR8QTmc0ZrSQTTLEROylnNeZnhrnVh6NAq2dicP25flbCChONaaC5WbBiv2nLbQ%2BSyxDXOVBHFKJ%2B0oVHIQFcw5ga6jD3uJPO1rPbH%2F9a5ny2kEZTOTZtg0d7f5Ipo1CKcLQx50unD%2BYHdC%2Fnlg2aqRAN9%2Fll2BMm9Maqq8SwffTnkSyHIavuJ0pDKcYmwqgmcQVRXGqtBolgbLz0eWL93Jn0ZfoypdA%2BCXfjZwELfl5DzS%2BQpwHwVFn3JnsrqQhz62WVMW%2FuJYhmiTH6OYtj1skvPsqmV5MsS9oJnQORk3WXZtIK0a4lKKkxt0tkEdBpKDutRv%2F2QQB6r0TfC0oZXMPIBq57c7lTLZb%2Fq2CglyJN6jJMSc6bDTWNxkuAzXbbzq0VbjmXiPq61IQXGp%2Bx%2FZDHKl00rV4%2Bpat5lAtNKxeW29Idu36qVv%2BNMGxRyuC3PoXsJTNjs0zkzQqR8EQBlzKM%2F1jqoHe6PicwxTv9%2F%2F3wa7srO%2BDdFwoDwB8cmvu1eEQ1DZrRPCdZPviyd1jMVNR%2BrRrCN8Jga2yom9s0X9dQrdSx%2B7adp7FRkvAForUoinaaMODKjczE9brVqDd%2FrYLaLIU%2B34SMJDxjs8GOqUBuq%2ByNOBxVrxBqfNdGfqkbqvUWFIQSm4uav6TJ0HTtCBhy7usNVcSyk0ESSbdipDHWKvo%2FpSgfcTqzMa%2FEtVQsyY%2Bvien0cjzsrxDsm6Id3EAA3EjfMzRywBZn%2FVZ%2BovW0D9Jpe6UvPCKfOoqklf7CPz2rYwQbqmVlxsv0L99I%2BGpPAiTQoIxaoNQ2Sf7%2FwyVriy3kp1WBNyrG%2BdSHhfxt0qZM1BM&X-Amz-Signature=6886d1033e7ab5072819c06bea8d49be54d3f79c4be3fd8665e7ef63e4b7fbf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFCHZSA7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCcS47yCygdmT563H0OOfVQKY%2FIwk0%2Foa%2F7fqwXJhAOgQIgdDzd7Fm3rC1HK%2BNDLGx%2FNhiRNHehGrUfIMGQJa3SN3UqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJQkrxRU2sxA4LyEhircA9utgXCvvGdKgd1TrtdDXNIxLiDYdR8QTmc0ZrSQTTLEROylnNeZnhrnVh6NAq2dicP25flbCChONaaC5WbBiv2nLbQ%2BSyxDXOVBHFKJ%2B0oVHIQFcw5ga6jD3uJPO1rPbH%2F9a5ny2kEZTOTZtg0d7f5Ipo1CKcLQx50unD%2BYHdC%2Fnlg2aqRAN9%2Fll2BMm9Maqq8SwffTnkSyHIavuJ0pDKcYmwqgmcQVRXGqtBolgbLz0eWL93Jn0ZfoypdA%2BCXfjZwELfl5DzS%2BQpwHwVFn3JnsrqQhz62WVMW%2FuJYhmiTH6OYtj1skvPsqmV5MsS9oJnQORk3WXZtIK0a4lKKkxt0tkEdBpKDutRv%2F2QQB6r0TfC0oZXMPIBq57c7lTLZb%2Fq2CglyJN6jJMSc6bDTWNxkuAzXbbzq0VbjmXiPq61IQXGp%2Bx%2FZDHKl00rV4%2Bpat5lAtNKxeW29Idu36qVv%2BNMGxRyuC3PoXsJTNjs0zkzQqR8EQBlzKM%2F1jqoHe6PicwxTv9%2F%2F3wa7srO%2BDdFwoDwB8cmvu1eEQ1DZrRPCdZPviyd1jMVNR%2BrRrCN8Jga2yom9s0X9dQrdSx%2B7adp7FRkvAForUoinaaMODKjczE9brVqDd%2FrYLaLIU%2B34SMJDxjs8GOqUBuq%2ByNOBxVrxBqfNdGfqkbqvUWFIQSm4uav6TJ0HTtCBhy7usNVcSyk0ESSbdipDHWKvo%2FpSgfcTqzMa%2FEtVQsyY%2Bvien0cjzsrxDsm6Id3EAA3EjfMzRywBZn%2FVZ%2BovW0D9Jpe6UvPCKfOoqklf7CPz2rYwQbqmVlxsv0L99I%2BGpPAiTQoIxaoNQ2Sf7%2FwyVriy3kp1WBNyrG%2BdSHhfxt0qZM1BM&X-Amz-Signature=6060dd97a34aa0c6db9522cf53bb9f551ecd1900a06732ee461a28d63bea4ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL7ECGJD%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQC7%2FtlVdLouu04Sn3HJa9MVFf4gzNJmb%2BNYmt9UZ%2BNe8wIgCZvmi5HBC%2BWzda%2F6xOrrmIwCVAnEm1YTDUnSqrz7LDUqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPcralVpPJKYtp8vWircAx%2FAr6HZ8jfVVEUy%2B%2BrKlxf%2B1rhDOpUUw3rCkAdR12gxJ%2BL459t0aWweecGdUz4ccpu4XsbxWNkLlnMzf19hp3nip90KP%2F3T%2F5z%2BXMxNJpwZxPVF55zy1Go4vSHuIVg%2B%2F5ykY1TX6mP4WAwJlGVr2kYaIPIlefF01vwIo7EcDfLJ2%2FDb%2FsevGg5yYEhdY20DVT772ASc4LTsqKru5Tiff674aanHz5lzcvoMvrRiqfiDUHDGmsOLjbu5St0SwVAibtTKdfuocyneh1KqaUxOtjlSC4hkL9vNtLaGTae7e%2F%2BdIGBZKKLFnMOfsHQXDf0A0hB%2FCAn%2BM0w5Bch14bhr1pmXieSz4K5D45U4pRxEYJya5JyfSK7j2Fz9GayCHiq9qC1YYmg0SvVXaF%2FEk%2B4FylCDSCBsXW2nWVCdYs0nxxA4Zb2xxF853u1bFS2oGao20KWj%2Fy4UMbO30OCte4cBuvdQvLCfDJptbFzOcfeWV40bNyoggUeDnZ7UbSV7mkMJpvx%2Ff%2FKYj4fn%2BwZKA3Ss7mH22gK7UoJKYufpmEJg8niEn8fPSgzUebmfJZcw5bNyHJu7J38T41LX8iC90Q3JMtAcH4YY1idNJnG1F54gaGL%2F0F5sxSz%2By3nttznOMIvyjs8GOqUBfWv41cIysWEtYiqE7q04pKiXWcKIi2DLMexpqGAKfvZDVetqkOZEDN2e1aNWLcohYcBN21iwpkZfViLHFn6QgoF0hws2E3uQnGRPZek1TtXWC3mt50YXAXlY3EBpVxvjgOSBt6djJFYZkj3uFgsmAFXjUUPEcNCCNwtVJ9EejA72sCMqp8gLDI7Y9X5N2AM6RJLRdGPK5%2FFJnAoXeI0x8AAcS4c0&X-Amz-Signature=7fb6afc70d29eb9972bd52870ed4eae5bb8f5825847d8aae67492d67c58330f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJWRADXP%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIBlGeSoZUtE3l217D4m2iNmBKdfPcfUiCsZhbpdeHkrDAiAdyW5gctmqzhVDSyZ95J%2BlLndVhAJCQzGBhiL4F9%2BxUyqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlQDUFe1LNLlwmH6aKtwD0moiuvS%2B2pE%2FMfi%2BsPV8FJBooVzx8csKXpEV9DTNFNsSlFcdKTfzO%2BxfkQhl4Ua7AfNMDt3bzD%2F7YOZQrehfsrO6QFGkQlX5Xm900bxoTbpBWfzBkyYWWKKxSjpeXzYwluNzBChEfKorKCXeo3K6IjnfMRpNozlz3FtBW8%2BfnHylxv9c9vUYlKzmr5vvHam0o8a4MJVebEkurnm8CCZKWcj5ZlPFRre6uP0DqE9vgKCcU7GzYmPi07h0%2BbdDhyj1N%2FeEgwGpKdjCjn8ZxZif72W5lm1hD0wfBeWXlysZbKjspBB0P1zrkSa9dMXvFD7mBfV073BXBQFdIlM58D8dit7InwQMPU0NY6nch1N0Tnq9Xq9Apt6G95uQkliVobnR7dHq86E2TmmlU0%2FvRDzeQYrBE2KXonwMftKn5uOt2vh7oir2cK2QdLUbt5Gv17Y%2Fc8XIV2ARES%2Bj7zJXQL4yjx7GSMjTDxCBC5M%2B28hwAou2i3veT4WkNX6buKAbH9vzgdAzyHAPXW%2F4jQkBwsPdll%2BzOR2x3u5pS1kPwSty2Wa6kkHPNapX9UUMHAaCyGCGNDX6oH1L8gmHpV6VXfXf9gvzYG5Hgg2Lh7B7hZ8LAx%2BUBBg%2Bkh1EsL5h3yMw0fGOzwY6pgHiOidkWS8f23QCSylSNx3lKmjOUaGRQC6Vbq5zLonnTDNAly7cyURrXI8lEL7KKJTQgwt6MoWafxWL3QfDdsXruLR0IjSjJhRRoh4vN%2F7DOmNKlw%2FVE3%2Bg6Z1Ry8%2Fu3hBRXy5IDvVXKhjQESmbCyHnMx3LyklgxPjAPEwXVnf%2BZ5GDRcJbqvAawmhBGki%2BeMjkjl0R7MZjPXrnLfg0nu5CE8lWH500&X-Amz-Signature=a95b7f0fa111f7cc0409126ce08ade75f68e0e770f41fa4e960d18c64bb5cac5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7ONF6JT%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQD1%2BMAUi2F%2F20HV%2B%2FhMnuGF7vDX2PGRrCiaZ66t9mGMzQIhANXFQDwQFS%2B9zG%2F88NtR8n6RQ869xjUzu3jFZxv%2FNLJ4KogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzUhEU%2FjY8PAYtZrrIq3APy48D%2FPitb6AHPlfHlcAB915f4vCGFSJYQbKeTFODwN%2Brdr7vdR9a3NPkkGsr5%2BoWKW8RBxMa5mNy1JwX0ftPTVALpvQKCOfrub23ozyZz%2BaK7qg1M5fjLJ2HgjJ0t2qw1oY0LlO7Q1t8x2lQRzaI%2FrVdgVMdG6zGufqIN6XVflb2zC%2FiSDuuFbPA2%2BdIpWkMuOi%2FGRHOqumwagu4n7cAoHV7jxPppt9Vd30fSYmas3HnlTAd3CJy6reaRiIGjSZHrqVqYMmBsqPxOgJx9gUy35xpdjjIoHS5XGNSfM6y8Yj%2F0ZvkPHi7l%2FJungX1RN9AhSpXEVtVLCsHuTYck5trJi1qQeZxipUyUpaqX6xXZvUrEBdH%2B%2FehU9jMbsPQrpF01XWJm5hcRfjsKc3gcmYIgalkVMRVOnwrvfkZrYQVw2mGK%2FirfAhSZwcLPpnyITTg6ZA3aBHqI8D%2BPSkcirB4FdAYIFotrCnIcDC%2Bg%2FiEN3gYIveIj%2BGH4UxwjgjIow6UzcOzLwlyXukUEIeaxbwKiPx8bQ9%2FqOHI8v93JLPMK3O4iMnPbhuQM3daIXICjarlgo50GxWtVQ4KBqyiXy1qnkaYax6lqaVLyoEGqJtSVBwF46vv5CLlT%2Fj4cSDD4847PBjqkAXGzgjZpPfmJ3b6BNXzOWytfp80DpIThjcwyVKE43cSlU8NcpQVsRalVJVmsXbM4s6cxbZuc78f3jAv6a4aJ0LosVdmtPMXZtkh42QNOmHPc9yrZEtYKOaO%2F4QabY2nkRBPYMQqszTyZ9curiQmDqaZx%2BM7HZn82Suxo%2FZLjF%2FNfR8ZlWt2AR2FRDWEfhOEmDPu7ks9kV7yO55JfjbdSApIHTjNA&X-Amz-Signature=aada8d54292f7ce4ff6aba67483b79366c333505214a3ce7c4d0b433bb4750ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4WDKM7K%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCICmYL8p6k6zU4A4OVrhW2yEhyTaaFQ298snjsppRPjxCAiAPqF2ynB4Yuv3Fm%2F0KLCszJk8SJM%2BNbDBeKIo6A9zMuCqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM55K9SticX2Rw%2FV3%2BKtwDdpH%2B%2BxUg23bTBmJyD2lUoO3R188lG3e0gZiX0dF4i2Nw9s5VdOD0ROczuSCMh%2Fcu4BHh0gvLDzXHtAYRAt4%2FHmNhlAOuvEOmllr7BVbAtb5Agx3OJBiKbOWcc7aJdqtaxMNwpdPJ0N908llwr%2Fo5nwFI2s3cazboR4srfxva0ckR1Ds9o1TRZqRXxJ3T7n4gXjD7L%2BkOXcoeM3Ux03xDHTGxfxr1jZWPBl6SnPU15HcGpYjy%2FqSU93ZdDHst1spTpwp2I6cUo6dM6NLnwyvPHz1KomGp2aUVrl4%2BV9d5%2BTSQq0xnx6KDDxdyEPk0UJcxM6qwUUj2BmAAzzqKa%2B060yqvuR%2F3pOVdjWp67Y9E41ouNlayWt5B929USJXyQn%2FQEFOnZyLBtIAZsKJdWbWB6GWn90hvJ9Az%2FvfyUCfYT%2BW4P3STgqJsA5C83o4etFKDOi4PsbQoqSmibHQls5ZgKTi2tw8TyYRL4DOBULTE4iJoc%2F68LPMIzQ%2Fvc5NjsA1dWlYW668KJrSffMRJJQ%2Fyppvdlve%2B%2BnFNJ4IcxTgfakfOqF1RLs%2BiWjp8VsYCHRn%2F%2BqN20kPrqgLjbSYwyRAFS%2Bl3oluHm94s5et%2Bq0dvQsnSkryqQs8l4C8FmDYw%2BfKOzwY6pgG39ZC61ivqVSymUC33Qtb69LDa5DghcE1AigxYXUKaBMnhmUVL8TccyMrOL5Kn3p%2BDxrWRElpxOavfo9TV8jiM1xqHsLWwTLYPOulxsTuuEahBx0M6IacXVoW%2BETtmsoVAY7aAFjOUV9sX2eQYHA4H%2F%2FyeYw4ZOspjmtC5bif6JJXgq9tV8qyNg9KZpRXAuzzrr7x3k3gU2Zh19DraQInlQWzwiexy&X-Amz-Signature=13ad58d807a0c7074d79fe93470a53724f0b65031e0f00676b43bd8e7217c2b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4WDKM7K%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCICmYL8p6k6zU4A4OVrhW2yEhyTaaFQ298snjsppRPjxCAiAPqF2ynB4Yuv3Fm%2F0KLCszJk8SJM%2BNbDBeKIo6A9zMuCqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM55K9SticX2Rw%2FV3%2BKtwDdpH%2B%2BxUg23bTBmJyD2lUoO3R188lG3e0gZiX0dF4i2Nw9s5VdOD0ROczuSCMh%2Fcu4BHh0gvLDzXHtAYRAt4%2FHmNhlAOuvEOmllr7BVbAtb5Agx3OJBiKbOWcc7aJdqtaxMNwpdPJ0N908llwr%2Fo5nwFI2s3cazboR4srfxva0ckR1Ds9o1TRZqRXxJ3T7n4gXjD7L%2BkOXcoeM3Ux03xDHTGxfxr1jZWPBl6SnPU15HcGpYjy%2FqSU93ZdDHst1spTpwp2I6cUo6dM6NLnwyvPHz1KomGp2aUVrl4%2BV9d5%2BTSQq0xnx6KDDxdyEPk0UJcxM6qwUUj2BmAAzzqKa%2B060yqvuR%2F3pOVdjWp67Y9E41ouNlayWt5B929USJXyQn%2FQEFOnZyLBtIAZsKJdWbWB6GWn90hvJ9Az%2FvfyUCfYT%2BW4P3STgqJsA5C83o4etFKDOi4PsbQoqSmibHQls5ZgKTi2tw8TyYRL4DOBULTE4iJoc%2F68LPMIzQ%2Fvc5NjsA1dWlYW668KJrSffMRJJQ%2Fyppvdlve%2B%2BnFNJ4IcxTgfakfOqF1RLs%2BiWjp8VsYCHRn%2F%2BqN20kPrqgLjbSYwyRAFS%2Bl3oluHm94s5et%2Bq0dvQsnSkryqQs8l4C8FmDYw%2BfKOzwY6pgG39ZC61ivqVSymUC33Qtb69LDa5DghcE1AigxYXUKaBMnhmUVL8TccyMrOL5Kn3p%2BDxrWRElpxOavfo9TV8jiM1xqHsLWwTLYPOulxsTuuEahBx0M6IacXVoW%2BETtmsoVAY7aAFjOUV9sX2eQYHA4H%2F%2FyeYw4ZOspjmtC5bif6JJXgq9tV8qyNg9KZpRXAuzzrr7x3k3gU2Zh19DraQInlQWzwiexy&X-Amz-Signature=736f7697ef58ea7157f45eae3a119355bbf0e01ff9e7c61db880fa37dfc51f60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVAZOCOS%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIDuGT5dqH8nZEX%2BUU3R8I8n74Unate9ewupuxQAESmd9AiEA3Fh3o7mKdRCDNKq2zyVOlNec3e%2FkIEG5RsBZToInVGUqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMieCZ7q3xum225%2BNyrcA2sPXTON%2F%2BewKmlRBjCsF88m%2FvN3Of4NWGRTqjx87CGsoynjTMx5CvHK5vJeFj1mJVmW%2BsNKCFGQCMVE46dpe0Nb4SvM56xR3AlxK%2BZr7KcvVcnxZ6vTKCWHj8u8cNPkTzVhiORpADYr%2F9eoAvOi4Q%2BtO9Sgm04UGU%2BwtvJ95DsQVTqifhtjvgQw388299lJik4Cy5E7SNPnapJInUFBR2PcGhwMHntMQ%2FlDmjBVPjTgYeU6FR3noCH1G6GjA1DINZAp3%2F%2F2WuYtsupM7k3g2dNvxU46yp1r%2BqtFu0cFT1z9NwKKekC1fXNvkFKc6hoh4%2BMrxpAkWtHPFirXvnT72syWL%2FXR0s4DgmtclrohvBhpehCKXg7GIv5CMRPhPl8mQwWXYXqVtKSCjKHNW2RVzfVnWmpUJVI3FGJyG2R3%2FAFVfXdpMmcATUiArIPMODHaeygkYn7JwhxgYHfG1AAijTC6Y5AMrc5ZTgVZD889%2FO6H74CmR8lJvXhNQWWOmgZ9y5P7qRHsYOvE9P7yNTQ4Oy9DQI%2FkK5uiXJNv%2BV%2BLXLxxLhrufCRTkQO1bpLH7BE9qZ4UvT3kscvD3DgxzfxioBZDZrPK4neC4E6698Br6PpdPPp9yRKABH6Tu0UaMOXxjs8GOqUB%2F%2Bs8TO0y%2FEP88P0a0sVVNFX0%2FPbz99BPq4MPDzPAzZBInVzh78yHJxYrca4BtkZ5tiEJIcscFmZhRYWa3Ugqs%2FO1qxJJu%2FX1pTJ4AsOxGYuE7EUfQb%2FUuG1eJRCb6rVMCyAUogbNZSIXJ8TMrysOTxHMF6pDnhUsajJIFjDo0ZBULVEhWMn1FlN1mRuCSg4d2Khxe823JjbNqpSA%2Fw%2BlUWrVjyFc&X-Amz-Signature=d99754da92622d41759d316e9c8b9a96ba0b5b0222fa048d9d2ae2891942dd06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SN4HR352%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCBd5h90D86IqWS6q7BsFZ2dgYAgZZ7lZO8vkfd7201CAIgPZTYO0%2BZiQruz51wmfcIp3xtJj7EFpbTHsNfKW3bIPIqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMcp6A9JnYfCRwBmpSrcAxyg07MHV4ZTMgrnBrypJ1sM%2Fjo6T%2Ft6vhpUVkq19LJLp48laKyWfUiUouSGWL8PvjI13eU4cdXiFJ5hTsWHTr2WoDmFCppdaQAwfXm3BFKCPAKXGTeKRRlNRnDlqO1BuBZ9qeFn32hZbeS5%2BFUEhPZvRpiIyh1XJt8FswrV4BGj4co995R9SsisxGodWDHked9dtXvzIQWro%2BsNLnPiNkN3WFEnkqcQjzGK2I%2Bu%2Ff5APfO4ZY7x6F2PVOHEoSgEDKeeIoeh5mQ7bL0DqHEyubllKxB9g6zyvpa6n9x0JdWmA%2BC9gtdxqs6GkumxZnzXr68uX%2Fi15udIrIUETtafazmHrpsC1gFbJZxwDTCKKNopnAjgXVMvwuFJk%2Fi0wsCNh6yZIW62lZEyFUvGCpDWJonHk1ETjxamHztaB3KBg17Y2r3p%2F%2F7IV2ZuMMcR2MD2xAY2AMVru9pNiZqvWEy1ppIORphZqEuU7ig69l6hvAJjrlFab2%2FlgMElnD6s6h1HunlAhof09857gz8HhwbaA8rczFPbqmMGsVB9e21Q7F3bGkp1aHuYgUoilU5aCqS67wtLJe8%2BtqEwZNHwQ4LRiIWWIyeYUBsN1XuEeKPsug5tkVzyv59R6zvSYoCeMLryjs8GOqUB%2B2WrsIn2wB2eLGxJwBj4MMDvIeuwzyLY9KHi25JI44QHXP%2BEIZ05CjWrNT4YJ8pr9xjk1xJWk7xiMmBYsCUFO6oNDO32SY9ZmojVPucVbXrLSfLD7vJ7%2FVoNC%2BgMuLJuMW2cI8YOz6HhOb1KODlbcsqGPOt6awpN5tRu4%2Fr5WFJ%2F4MxiVOs9pFXE8VQuteFCw25xB8MCjHxwrxYFp8mGC%2FfCyK8%2F&X-Amz-Signature=bce3a92837ef7b9f7a24e1f418090b251eb5a16f10971de262ae5f11c9ef265a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SN4HR352%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCBd5h90D86IqWS6q7BsFZ2dgYAgZZ7lZO8vkfd7201CAIgPZTYO0%2BZiQruz51wmfcIp3xtJj7EFpbTHsNfKW3bIPIqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMcp6A9JnYfCRwBmpSrcAxyg07MHV4ZTMgrnBrypJ1sM%2Fjo6T%2Ft6vhpUVkq19LJLp48laKyWfUiUouSGWL8PvjI13eU4cdXiFJ5hTsWHTr2WoDmFCppdaQAwfXm3BFKCPAKXGTeKRRlNRnDlqO1BuBZ9qeFn32hZbeS5%2BFUEhPZvRpiIyh1XJt8FswrV4BGj4co995R9SsisxGodWDHked9dtXvzIQWro%2BsNLnPiNkN3WFEnkqcQjzGK2I%2Bu%2Ff5APfO4ZY7x6F2PVOHEoSgEDKeeIoeh5mQ7bL0DqHEyubllKxB9g6zyvpa6n9x0JdWmA%2BC9gtdxqs6GkumxZnzXr68uX%2Fi15udIrIUETtafazmHrpsC1gFbJZxwDTCKKNopnAjgXVMvwuFJk%2Fi0wsCNh6yZIW62lZEyFUvGCpDWJonHk1ETjxamHztaB3KBg17Y2r3p%2F%2F7IV2ZuMMcR2MD2xAY2AMVru9pNiZqvWEy1ppIORphZqEuU7ig69l6hvAJjrlFab2%2FlgMElnD6s6h1HunlAhof09857gz8HhwbaA8rczFPbqmMGsVB9e21Q7F3bGkp1aHuYgUoilU5aCqS67wtLJe8%2BtqEwZNHwQ4LRiIWWIyeYUBsN1XuEeKPsug5tkVzyv59R6zvSYoCeMLryjs8GOqUB%2B2WrsIn2wB2eLGxJwBj4MMDvIeuwzyLY9KHi25JI44QHXP%2BEIZ05CjWrNT4YJ8pr9xjk1xJWk7xiMmBYsCUFO6oNDO32SY9ZmojVPucVbXrLSfLD7vJ7%2FVoNC%2BgMuLJuMW2cI8YOz6HhOb1KODlbcsqGPOt6awpN5tRu4%2Fr5WFJ%2F4MxiVOs9pFXE8VQuteFCw25xB8MCjHxwrxYFp8mGC%2FfCyK8%2F&X-Amz-Signature=bce3a92837ef7b9f7a24e1f418090b251eb5a16f10971de262ae5f11c9ef265a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7KEOSCT%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T172541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQD7oCoT%2BO7ClHMAVdsZZCfgaGzZ4up9LTOQHVKMn0dmtgIhAICECXGHR2kZg%2BkQmocTX1Hc9805M7qTPd%2FigTVy8%2B7XKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyAZsg1u6GeLK%2FjRZEq3AO9B1LkiezSCi9pz7jkg4Z8sQ6wOSJ7Scjbw74ongGNZBK8EGeMhhwGSSgzs1cPRE6PQ5cZlLP7eoVYOsTSMrIZcZtlj5UGi0aA5HNPZFDpcijllMNB%2B36qN287BxHnqprDtfKPyTV4zn24607efJHCZNXaim6VFQq6ufEMuiVtMQb5ZcvZuXHJju07bTwserJ0pXhVmGCrqbWIrXmuGNPPQLwqXSo5lHiBCWMVsD4fGtn4oR01dnZT6tENDAiivoQT1h%2BR62S85R19FJow70lpPBmSlTzsBYlNgS6SN847AD35bFXpmCO49KPWhszm5np3pLKJ53GVLFjJqAiGX1%2BhlQQolb1mr0Lx6LN09pPWRsdy8UF9UuQzI%2F9zxQxwUZuCH7Fxb%2BZO4Ff%2BuNHjfbCHNj8Md%2FwCZcQz8AmW0TlPXZ0raarZytk8J3biTmaaAWZMpsqjY%2BUiOIgJ7cHC7ff1T%2F4Vvu7dVyIrN27l9KFKGdF8wbXYVrBbkuV%2BggVxyQhW2N%2FFL4qj9q3zN1z3E3%2FGDfQ5%2FePr54H9bpKiAuoWjvEBeTl6cWejwkVBxLuOwX%2FZwdkIONmBSN8iYal62nXf0BFQkBOFX%2BjAvGR6z1WU9N7RYnrqqCCluZH%2FljCg8I7PBjqkAQiID2pQtprzMf%2F7JQOj03TiYyEjHumZawEJFKMLUOJPvyezjOdS4s77QpKR1zRD7s9UPvf5u8z8jY61pAEAUAa9JfHZFoov7Szo6MaXNQtdNARJOk7%2BgZnvbVsLPWGKUjAueSMclhJXJ1%2BMh6IWJjnXisa9Uqp0Htvuf55BEXiaLBRAFRvo5%2Fz4Tc6v%2B4Hja3j6LTL5WH3aZCOdd2v0jFh0nfcu&X-Amz-Signature=cf4a4013e32c8e1414e7e8261b40074c658d6e8c8d758afa79129d3de03386ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

