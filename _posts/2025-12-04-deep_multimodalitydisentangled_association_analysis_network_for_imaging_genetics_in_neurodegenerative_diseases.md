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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKPWD5UJ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIHjzkBmDHtzNegSoOWTQb22rsRIc%2BD9JpnGswxwef65HAiAUwoeJcXgJrpkJjvAy8q43R5oheWlLaMgZ7TbffglHxCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMN40elf0lL4LJTJekKtwDz8Df85CrJWp41HZ%2BhxxASPyPMaFSu%2F2vwSNWy91Rc%2FdUOmjjDdtXdpTHE3RF6O1LzH0LlLMeMwI613gCr46keHGGwyMvrT%2FUpNupQH2sM%2FYXPyYGcMTlzj6zheMY8NDrgvycDab1QX%2B2kMhUHWWn6jWdUog8baV%2FWSQgVVZqQihAH%2B5Nqh3yyNztOKokAmW2TNTYyegsTyEizAS7KNe55aYK3VAuMPaePxQJYYnn0F%2FjQyrgEDxj7Lu8QECNUf5gjKMGx50C5RjCOX3q7vG8d8dx3zJYz7Z3iNiiGvmkpoaAeMt%2FLoEcliyKUOIhmk55E1FQ9dfqsrmz%2FuNwqtPyU92FkJ3RNMtybglOzGbN3ROt3uyOk5%2BgqJ7xYgIJK6akLKZzVqT9GT7UPF%2FEJAZOeveMvmzG0LpK8hNDmcYBX4d0YNPmxSJNrt%2F%2FrnJkinMmeGSWJeyqzqDqnODU94sK9y9BoeU9TMMzJi%2Bibmj%2BvSfiWsyngBZyPg%2FwXHOncLBwMhL0NigLhypTGDRrEDBG6RSTj%2FwUcHKxhax%2BVCrURF88DwtQER6rp48tYeDibt9FatI7qda9dROcj1%2Ft%2Fr3wJrsmBde3NzfVp8kKS%2BmbkCg%2FdO7hMvkN0Frm8pMwyq3ozgY6pgEslxvY1oPAkTnIWzRWBbEdRtPrsJ2QoWu9sonXUdqjXccGIO8BWb%2FIv9Rn4KMqL4Q7e6TR8y5KjVklswg%2FtYIE%2FOpgsXuN9wYStRFhF96zMsH7AWOzi8jtXWgLoM6i8XGDEmzkSebQmanJ29RrsX%2FJMOW8f%2B2%2FxlaxJGOmh8HAnWWzt3F2frFH5ag%2FjmWJh6tlH1bPoyrCCuOJjuq2qSWzrr8jBIX5&X-Amz-Signature=f644c14382231050f3f696b860ab17de4e85a85e0c3d6ee351b86d53c04de22f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKPWD5UJ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIHjzkBmDHtzNegSoOWTQb22rsRIc%2BD9JpnGswxwef65HAiAUwoeJcXgJrpkJjvAy8q43R5oheWlLaMgZ7TbffglHxCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMN40elf0lL4LJTJekKtwDz8Df85CrJWp41HZ%2BhxxASPyPMaFSu%2F2vwSNWy91Rc%2FdUOmjjDdtXdpTHE3RF6O1LzH0LlLMeMwI613gCr46keHGGwyMvrT%2FUpNupQH2sM%2FYXPyYGcMTlzj6zheMY8NDrgvycDab1QX%2B2kMhUHWWn6jWdUog8baV%2FWSQgVVZqQihAH%2B5Nqh3yyNztOKokAmW2TNTYyegsTyEizAS7KNe55aYK3VAuMPaePxQJYYnn0F%2FjQyrgEDxj7Lu8QECNUf5gjKMGx50C5RjCOX3q7vG8d8dx3zJYz7Z3iNiiGvmkpoaAeMt%2FLoEcliyKUOIhmk55E1FQ9dfqsrmz%2FuNwqtPyU92FkJ3RNMtybglOzGbN3ROt3uyOk5%2BgqJ7xYgIJK6akLKZzVqT9GT7UPF%2FEJAZOeveMvmzG0LpK8hNDmcYBX4d0YNPmxSJNrt%2F%2FrnJkinMmeGSWJeyqzqDqnODU94sK9y9BoeU9TMMzJi%2Bibmj%2BvSfiWsyngBZyPg%2FwXHOncLBwMhL0NigLhypTGDRrEDBG6RSTj%2FwUcHKxhax%2BVCrURF88DwtQER6rp48tYeDibt9FatI7qda9dROcj1%2Ft%2Fr3wJrsmBde3NzfVp8kKS%2BmbkCg%2FdO7hMvkN0Frm8pMwyq3ozgY6pgEslxvY1oPAkTnIWzRWBbEdRtPrsJ2QoWu9sonXUdqjXccGIO8BWb%2FIv9Rn4KMqL4Q7e6TR8y5KjVklswg%2FtYIE%2FOpgsXuN9wYStRFhF96zMsH7AWOzi8jtXWgLoM6i8XGDEmzkSebQmanJ29RrsX%2FJMOW8f%2B2%2FxlaxJGOmh8HAnWWzt3F2frFH5ag%2FjmWJh6tlH1bPoyrCCuOJjuq2qSWzrr8jBIX5&X-Amz-Signature=f644c14382231050f3f696b860ab17de4e85a85e0c3d6ee351b86d53c04de22f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U77AQ2DZ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDDzVO9JlVRZ2KKxBuxS2xYS%2F5IbbrGigFWSX1066r8CgIhAOu%2BcytIWfSLH3vOJ7mWzp1n243r3p5%2B61oNUV2Lgx%2BkKv8DCEMQABoMNjM3NDIzMTgzODA1Igx%2FIPpgOkPZBiiEVhEq3APA2FfTEm83C%2F9VXCDgR%2BnLLtQpQoiN4JakP93ll54BqCGU5d46G7KLta%2B4fts1G1Tf95mqo3QP%2Bf8bkyQAOMwP70tvKkuTZTIKMproN0fDTAmjR9dY6tNCnzSLJTGPMRp%2FLJrXYOmJvmOHHWT1%2BlxE%2FhhLBJQgcqg3sW7lpDfuZI%2B3TlQ7hI0sD3vSCQ9ZjEkxWgN%2FtqJMrvD9knVGvkemqayyj8AYEUxeV%2BKTu4MhOPLMKrkJcUuKE%2FkqLJKwH4gwFaYML3VOcGDlIeaYplMBYF3QuGCUwAi7lZD6145P6gilOzzZh8IgvTbQnstg%2BiM2TTsLcYL6BnKlMx8gnV%2B5gGki7PVCmvaxnCQY4UBN8%2FcZsdaw1iCFEEuffPHBok8Y3UqClX5BLTnstLsJG2GyzGP4PT5XJmT6GDhiZnj2NeEhXsQTmkuvcQtZSrZoxl4J%2B5Ia6Mq%2B7bT6ckob6PsKuhyYnOKrD3GWHooCdjBEkra9EjKLcMvBmMbz0mYLULjX3lBTzvdWuOOyAzlmCFd03nCOV2bn%2B%2Fi8XEYyH%2FoVLiKwRkfqexbu768QWd1r3a1PqNzbZ25LWlcYJblRMvy5A2WtjQaTEFVtgCihsVLcHDqrOJCzFwIT0Z7iXjDTrujOBjqkAR68SvqagI5mdvQlW70s7n%2B6nL3fA0O4L9EQ5zag257B7SXGRQP2mvH4yyfxx2GpdMTZfYls8uqvWY%2FJa%2FZw%2Bc9rhW%2FmEvy8jErnTcVKi%2BM9KZxwU2xGVZ7h9Y6LYuCRWJE7kgIjfaq7Vgiuu26v0nmRn82cZowq7sGh70MZu98Hp4gldqvMKWIFRnG5fGb2M%2FyXle154ztus8xf%2FF1V2Nt4NR17&X-Amz-Signature=df66f2cd5456f32096e244e3bd09ac2cb76a4ba2b6fbef9edc1e3e1a1f06b8bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDNN4J2L%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIATzEm4RSRROY3qEQqzJhIIzlaj1iki3qhFQMh7qGj7OAiA5rOYry6vpQkdx%2BBRFJuAf5AMw0OgOzWU%2FMHkfwQWkjyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMMbJo1lwdEMRUZXXdKtwDBWOOamlSRCNX2bCPwf0nil6Sk9LlWLUZszf4C89YC3SSzb3yGOJmCuzc%2Bce5OirD4ZRdXLRGZ19qu%2F%2BX5hcE1B9qwVWe%2BaJgK7tdJA8EsoHGhc8S6epL6cVPAZ9NQO2%2Bbwv0SzXTPgVQ5bYrherKCPuMf7yIBy2QxRjCgpXyCruMAgPI94ti0sFcXpyYFvd2EwB1VJLQDmzaYavfgW8%2BuQVymNryDoX27vtQJn%2ByXMoTTTj%2BqY6%2BHNkxhkpwuftbv15j9L0l1EOH0feSvJNvLBLhL2%2BbWrhZYGCxPjUzmBfyMH4pTz7CUm6njSL5YP1IsLHqUCw3f4ZKypL1CkT%2F%2BpgrYTLBtGIHyZ%2FHLZnkbtf%2B3Cp%2FJQNTuAipNIHaTNh%2FmcANarSLzP8mZZm3dnVVTOKaTGecCy%2Bldb1zK%2BjcxGbXYIi7YquyKG4sudhqCidHR0o45Crk0ovSDoK%2Bat6XmOpa9aVkp%2FaZw%2FhlOkIFYRa16paDz3Dpvr05T%2FWLl6uS4eFsH9%2BagyRcCOU0RNQ3BsrJPHlwJWA8eOkKdLEvA0Nv4W39d45mav5SCPN3JBiiO8aXLRhp7S4Cxp1cMhSOkqVs%2FVRMAZCHvnXrMeKGrdo3KmH1jTIf99IGsy4wjbDozgY6pgHa6ovazhPIIkS5sx41l29Fq0zGrbpyNt1S9tcJjgDm9E1Z1983PKYodQuAZ%2BwX6w%2FesdxYO0JT2eujMR43MFhV0alltxqwAIRB2JbZqR8jRj6fRWaG3RyDyiVvttJET6db1y6xY8JquXMxd7QU3m6cmCLjqpHPV38iytL1ibwSoH%2FeWTTSeve%2BC2wR7iRMqwT%2FCWtPScU6dT1YHru8MYY3ARm3bCdF&X-Amz-Signature=a0764d363d3a450663cabdeb93dc0fc97df70809da7c9da86429d7bb454efa1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDNN4J2L%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIATzEm4RSRROY3qEQqzJhIIzlaj1iki3qhFQMh7qGj7OAiA5rOYry6vpQkdx%2BBRFJuAf5AMw0OgOzWU%2FMHkfwQWkjyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMMbJo1lwdEMRUZXXdKtwDBWOOamlSRCNX2bCPwf0nil6Sk9LlWLUZszf4C89YC3SSzb3yGOJmCuzc%2Bce5OirD4ZRdXLRGZ19qu%2F%2BX5hcE1B9qwVWe%2BaJgK7tdJA8EsoHGhc8S6epL6cVPAZ9NQO2%2Bbwv0SzXTPgVQ5bYrherKCPuMf7yIBy2QxRjCgpXyCruMAgPI94ti0sFcXpyYFvd2EwB1VJLQDmzaYavfgW8%2BuQVymNryDoX27vtQJn%2ByXMoTTTj%2BqY6%2BHNkxhkpwuftbv15j9L0l1EOH0feSvJNvLBLhL2%2BbWrhZYGCxPjUzmBfyMH4pTz7CUm6njSL5YP1IsLHqUCw3f4ZKypL1CkT%2F%2BpgrYTLBtGIHyZ%2FHLZnkbtf%2B3Cp%2FJQNTuAipNIHaTNh%2FmcANarSLzP8mZZm3dnVVTOKaTGecCy%2Bldb1zK%2BjcxGbXYIi7YquyKG4sudhqCidHR0o45Crk0ovSDoK%2Bat6XmOpa9aVkp%2FaZw%2FhlOkIFYRa16paDz3Dpvr05T%2FWLl6uS4eFsH9%2BagyRcCOU0RNQ3BsrJPHlwJWA8eOkKdLEvA0Nv4W39d45mav5SCPN3JBiiO8aXLRhp7S4Cxp1cMhSOkqVs%2FVRMAZCHvnXrMeKGrdo3KmH1jTIf99IGsy4wjbDozgY6pgHa6ovazhPIIkS5sx41l29Fq0zGrbpyNt1S9tcJjgDm9E1Z1983PKYodQuAZ%2BwX6w%2FesdxYO0JT2eujMR43MFhV0alltxqwAIRB2JbZqR8jRj6fRWaG3RyDyiVvttJET6db1y6xY8JquXMxd7QU3m6cmCLjqpHPV38iytL1ibwSoH%2FeWTTSeve%2BC2wR7iRMqwT%2FCWtPScU6dT1YHru8MYY3ARm3bCdF&X-Amz-Signature=79b9183f0543b0952dd0c52fb55bb6b75af0509f272369804528c746845d550f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THYJNRDJ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCoXWiBUN%2FgR%2Frmm7JlItm78hvbguaQTqE3ZOvKHv3e2AIhAOgg2tSZAjlkQKomizdSV7dkko5Jgzsu5DY0OwLXMMZ%2BKv8DCEMQABoMNjM3NDIzMTgzODA1IgxordDXlvr%2BeAtSN%2Foq3AMfCQ8ckyB2DJlFuLlu4l4v%2FsRSFOKZ5tPhZhPZmmstZMADkobML5Bf0l%2Bj%2Bh%2FwQnMAiTeguRSziepS1mo3bQF9kZ4f8kFBYOk8NudlBHKur1%2BcJOiYvIx6Mc9u3fWo6G7JQzwltMNXX7nDABvyAhft476z18wubWCZkjHNEsHqxRZXLeZGIryzT1WhOY%2FEkvbuDiCKGFbhKYteINxf8sqivPKiMBcdvp%2BOszq%2BywPVU%2F4HspVz5F9npZQAxDKpqkTFpuF2Yh0P%2Bk3lIGR3JQfYVdqBU75JRjX8XHc3NCRpaRst2q3gU9kTknosklNPw7q0%2FMh3MeGXnY9f6UjKMdd%2BfSXWEQtpPB6D8EOUPQ0U%2FgPQOnfkwLFSZsi9ZwAi7xQjFRLHCc7d8Y59E%2Ft%2F4DPEgfncW%2BhF7znqE8tkkcBCJCquZxmj7WZN6%2FAfV%2FHS7nF23QexmqaYCU0Vhh81OLKaOrBbCN2SmTba4%2Bbyhd2sB6tSBYJaHGZdpqQhe2bAmJvNxcLIgoUKybwfaeB8Is7oaIgShMMCk5RIhwui0j4GkZqgnX8yV9eEMozqaJo5i2XgtmNxU1AEIQhXz67YhLNDrKM8aT0sLXgFrNUMDewcQF69khPFf6nZzhRA0TC8r%2BjOBjqkAT9iokO9PBT5W7HRogzoE3IOcp11BkJENoEklCTUYZksD7ekBMnmfivq%2BRQTAoevGYDvmdBLPcYDuHL%2Bnsi1X0VdrGT7t%2Fk6LBjnWmt3Yv0FK17zkWOKkFwlMF7sXAedhn2Byzr%2BT4njSoIptha5AHXnPt7cv1w75J2CkbClyD%2BF%2FOBz9UL5uC6RYHVSiHd3u8BCquL9YhvvQ%2BDPKdq2HOwC8zd6&X-Amz-Signature=3437e8a92caef30ed619f7bf294e66a5ad1f1090006b987acf4c59d85ad39357&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YA2NNHEX%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIAHTTZn5ZsCzOgc0pVP5u19L7rGCIKGaM%2FqlUno6NiriAiBMXnfv3t0BGtwaKr6Uofs0uhxlSi%2FmcEdTpUdxTAiHSyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMKdRwQt85UvmAWRyIKtwDDDwwKRNbuIWMxeKVpEf72mxXul5B9UHNcyrQcHiris%2Fhz0JKyOQPNrnLcB3EPJz9GIwlr%2FsB%2BsSvXbSlgAfYeks1bdLmHHAeg8KJ%2BwgwWOy9tUOL0%2FRGvti9brUbC7iPqcoyihGLBYabbAt0RusK56WizwywITxnHzlZnXIh6H%2BDzhL0J2cGWKDXXtH3XAP26NbtwLmzXMq%2BGHdIqwYNrE8jM5oAzOPPhQKxun9f87LZ2uUUQvq4zVk0mgjniqZ%2BCJx4OE1B0qvLi%2BswRz2oKxyEyA2K5bcWyfJ4buDYfMh9Iw9OMI4%2B0mkr38YGJyVmBkLD57FXKvnw1Ml9tmYiZz6kIZyKYqljJzNTTuUq3PRw5ad3ePanYPboJ%2FkRL4T5SZbo8a3vmg1BV8J66iQ6t6VPsdgD6IB4i976RagYrmI2FyyDbBS%2BwWmES4NsNxzBdJy9SNPh5r6hoFPPIAEPyKh4oNG%2FS6BltqyCGAw5EyYycfRXyxpfZG%2Fm1cRufDGexQdFLp2U1uTGPocDvnapRfGuRKZEE2zjAf6Cr4L1paea8DwH3j4Tb%2FXED2HFKwClEywEvNEAteEbSWTvcSGX9srNJXCU%2B%2FZTBmhvqf8eTxtSlAfth5OAZBgaLikwlq3ozgY6pgEpw0s3SFLbd%2BKlXCokuGjB5BZkVOwAkPLRTF3fIH2JwPIKHL9LZ%2B0C1%2BpMY4eTGTL0GlO8qjbW3ofiqzHsN3aSS%2F%2F2ze6oJpXZRZi1MbPg7Q2AqE9sqrYZ%2BqhmZz1z9UhFJJHemNMmujg3g3E4xX38l8XVvB4IBCFRBR9Y3jm4%2BKOWpwrHwC66qwqI%2FVkYe%2F1Kd3S273HvLfHJDIVGdzD8HQKaGDYV&X-Amz-Signature=c17f40494a71ae231a948ea14541d1c54872a569bbdcc920b3829a3981dc873e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMBYOJI4%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIEb0t1nJ0A5OD0lOHmbgJpOpYVjHYLayJCluz4yqpqBSAiBTRzzvaiVOgAgnjuneno%2FBGJM9eMPndPFYG5a3U4uJryr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMcnukgXubgH%2FYUPC0KtwDbwWsWeO1yFjJiC6Q0q2JLW9GUBD%2B2xtts6DCS2gNcNZxbooli1XCirGrW85J4VBSabDfS4aFmbMVSJzzoIyvHDq2ka9deelVYMkgWiCjTiC8oWP7vFcdeH6A9%2FSN6Dh%2B4mJuuyIo5yteAaZt4VzuUDV7RrAG%2FzTE2ypEerLy0FsqYWxcaiaU8OK%2FONOAPJlPpKkZHuwRFm%2F4Osf%2Ba9J4PrJM4uMr%2FcbqWDNSTURXzfbdkYE9ap%2FhJUa%2BbHwFSTSwthbrZh7ADOgEI3WZaENF%2BiJB%2BwFPP7EiBKszzDZL4Bl0gIcIogRfDHj3vqerNtJcCmG5T3eaiOx8v5FIw5Le2i7HguDAqqgR55AQ5yozBjeZ2ARLS53KQeVor1GbLDuHBWuFt0%2Fgy7GrDGHnB03S22rosI%2B%2FAImRHtoSNGiT9YcfuOfYO6QQHlIgJwUqLIxR4W9j40M4dFdyemM4sEoYAkVcMbgOfdMcPWsgBITBE3R4russOjbv6WBGSaBjsSUA7nR702545EIWkqpZzrXwFUBaHdsF%2FrUAp2FaTL4Rl3cbkxykxWH7WtDsO%2F2id4LRpYOzbPq%2FZqNLFGpYPO6JFK0xjbNBMQTjgoG8JnS%2FrmGro7zy%2BTV7c0AQ4FEwvK3ozgY6pgESnaRGwfcM0ptVbaJtNFpzyiI4JpUG51KJD%2BbJ4%2FBfUtsrdjJc%2B00mYJn8oimvVbWh4ucfFFBYld7UVKartQ1FnjUwzOnuzb4v3FncsNIVPbpXfZlLF7hLLJZcNRkcA%2BjCAxeEpgFEgETnYbsCmu7YSnUtAOG3z7S0spGUqieHiMJO1paTHYVA6iRLXAGe8H1AlG4LXRRoFq1Lwh3O9Y55qWo6nbNA&X-Amz-Signature=de8a7fe166cd01468fd7177f8defd9fddf85f21dbbab4909f08a5ba54340db85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667L6PVB5G%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCr1pNPQNqFqdzBgR0c8IidmJp1pxnKJWspqXZWAb%2BEHwIhAP1bOvHnZItl02sqSQbq%2BiCZ%2B5hDrCr%2B%2FiekA72TZ5R7Kv8DCEMQABoMNjM3NDIzMTgzODA1IgxF7Im0PsvYgR6OqMQq3ANZPvPRNf4R2WZn%2BX%2BCdEXlxRdPWx8b4j26VQhc9O6kY88q2iEBo2uRwVA9SAIqCrYw0BEK3%2Fgih1hLaN2hfrLzmbuAxvJuwS6nA5UAIANus0triqgESUZ35WBww%2FKhe8IkFbSflESdAOqRYMt5fAowNoPtUaKWgZjkMJMvWCp8nqWF9qOFrDbGR6S2UAB6rLLhsdu4TeVE%2BNeL9c30BG6WmQBDf8C2Y6Gjp2HGpJcAnuIAx9zdyPrMZvrLOjPG6qgkGrxW0TWCw8dp8FX3RP2a7aPH1zOexbqriDF1H0VrPeysUhsd2iw%2BvUCl%2Fu1JoALwLRcA6OzJck6eWSGb3leCcp6VFKlZCJX4LF1ti1ucv1pwBipsq74uLrPV7oeHIM2Uu6I%2FO%2F4GFCvNry00jKOYHOs02kNjyCZ%2B%2BWHzgDJMrANFWtqRwdYshe5eX0RGKJ3PedgLDI0Ok090jP%2B2P2Zgcz7acGqnR3d7gWPRkxbxfvUiMh8oVN%2FvAtmNhxeexjHwO2S5Ogm%2BCdBk80mZPkbbYuldrilcLaJjln4hbC1Po3cRaacIXr9mDRk988%2FL52lKzB0ZdKr%2BFJ6HNNB2QfhV5NluR%2Ft0P8qaVoftifN1v%2F9nKTQPafOlA2LI%2FDD%2Br%2BjOBjqkAbc%2BFUBdHUPjojLFpcb4d%2BJiGF%2Fo6jwunTwoLyeCzPmUnipzEUBXJxkfyqmVEWcwzSqKZLWn5wpnUNxc%2B98%2BjJlK1nwK2naR%2FcgLGD1Tvm9s%2FKbY8LManKFnP23UmwRT6K65hVT8eGUpBEur%2FKflo5JST9bAY7WiHkfAfxU9VY%2FVKhXlVXF7oUs0i4ZaFqe%2B4BGMi6zQtOm5C%2FGZ9DUuD%2BsNqrPB&X-Amz-Signature=a046ca4907dc4e57e4d617639fb07672df899b1584630864f7091da1d580ff2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667L6PVB5G%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCr1pNPQNqFqdzBgR0c8IidmJp1pxnKJWspqXZWAb%2BEHwIhAP1bOvHnZItl02sqSQbq%2BiCZ%2B5hDrCr%2B%2FiekA72TZ5R7Kv8DCEMQABoMNjM3NDIzMTgzODA1IgxF7Im0PsvYgR6OqMQq3ANZPvPRNf4R2WZn%2BX%2BCdEXlxRdPWx8b4j26VQhc9O6kY88q2iEBo2uRwVA9SAIqCrYw0BEK3%2Fgih1hLaN2hfrLzmbuAxvJuwS6nA5UAIANus0triqgESUZ35WBww%2FKhe8IkFbSflESdAOqRYMt5fAowNoPtUaKWgZjkMJMvWCp8nqWF9qOFrDbGR6S2UAB6rLLhsdu4TeVE%2BNeL9c30BG6WmQBDf8C2Y6Gjp2HGpJcAnuIAx9zdyPrMZvrLOjPG6qgkGrxW0TWCw8dp8FX3RP2a7aPH1zOexbqriDF1H0VrPeysUhsd2iw%2BvUCl%2Fu1JoALwLRcA6OzJck6eWSGb3leCcp6VFKlZCJX4LF1ti1ucv1pwBipsq74uLrPV7oeHIM2Uu6I%2FO%2F4GFCvNry00jKOYHOs02kNjyCZ%2B%2BWHzgDJMrANFWtqRwdYshe5eX0RGKJ3PedgLDI0Ok090jP%2B2P2Zgcz7acGqnR3d7gWPRkxbxfvUiMh8oVN%2FvAtmNhxeexjHwO2S5Ogm%2BCdBk80mZPkbbYuldrilcLaJjln4hbC1Po3cRaacIXr9mDRk988%2FL52lKzB0ZdKr%2BFJ6HNNB2QfhV5NluR%2Ft0P8qaVoftifN1v%2F9nKTQPafOlA2LI%2FDD%2Br%2BjOBjqkAbc%2BFUBdHUPjojLFpcb4d%2BJiGF%2Fo6jwunTwoLyeCzPmUnipzEUBXJxkfyqmVEWcwzSqKZLWn5wpnUNxc%2B98%2BjJlK1nwK2naR%2FcgLGD1Tvm9s%2FKbY8LManKFnP23UmwRT6K65hVT8eGUpBEur%2FKflo5JST9bAY7WiHkfAfxU9VY%2FVKhXlVXF7oUs0i4ZaFqe%2B4BGMi6zQtOm5C%2FGZ9DUuD%2BsNqrPB&X-Amz-Signature=f1d4ed093b3b72abcb7d6f71883f298150b4e3789ae276c45b9c903f11eba247&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IV4EDCN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQD24ZZhLE%2FAIi02E8uKZSKRVerYDDyu6Xpu%2B6MU8wvRIgIhAOu7%2FlOgITDMUqC4Cyn%2B5f%2FkUMGWmVrmul2PmbVkiM%2BcKv8DCEMQABoMNjM3NDIzMTgzODA1Igzo6OjPhW5nrc4Q%2BvAq3AOwz3RpWjjdT%2F28L%2BPd9xPNrKza8QVqPkyVmbKWpCvggjlB9WxKnDz%2F4LroJUTgy6kwYUQw1ylTkECyKdnL80gYsD8TZhUXzm1o1c%2Bol7es6HnDxhTst0mO453nGvQdC6rabJwpCKDzHgmXOuL9IfTZ1XhZkjnCzG4uMBVb2%2FFmvEiDxcYw8O1kbyofNsxqBh9wzqJQHUeb%2BW9Xs1aO6QPWipFpz%2BBqa73a79SUINmby4FaBW6dFb7uaeWE8LjBHsWfR%2BnjSgsx607vfpMrLRT2dqvmeXrV%2BT1cwFhlLDEiWhCqAkLoxbrG4so1kLA9HjImyrzVhSuQ8Ei60u50QryJzWuu%2BOMGUxd1wr9rm8pB3h%2BlS3YsYpElNQB2RuPs0pz8%2BQzNGV8binwzaduriNFcRmtqt6pi2Gy1akt9iN7ld8JsD6E2nESsxj0lk%2FlCV7Ux7CyjPXOXIbDLEOxOg3e%2Fy0pkID9yt5C3SAiDK%2BHP79YX2cTx%2BeTpAD3w7cjzeWAuntGVkABt9DWTJM%2Fhgk%2BjzoLQWzS%2F9m0w%2FIwMJ7lb9TRLa7Z0xYAXDIqwfj6gnnCD1hVZa6OyjNUqJidqAvPL%2Be1cVPfePop0p9CMKk2lOqoFsTsmvcHX%2B2sW%2FTC6r%2BjOBjqkAfSEDTkVkyKwr8V11UsPHOGoiLipP%2FrqkV3FWZVpH3JWBFh%2BMWZleWMDs2rdq11rh%2B8YAjg5IUtSyrbM21WGF4GX%2FuhG2iZcu9oSNEwEKFk2NldljTf6Z4RsVksvwp7cmVVAH6vkAHZWF%2BpeAp7nvwLFfliS1EelznSgquYA3Hzv4xSWn6pak1UVx7%2F6K8YSEiwDvvEEOQBS5auzQq5xoXjgIHcx&X-Amz-Signature=200f93947ca7c0aee80264ca652b891de7b33753c921cb152657c8846773d47e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y72OPY3W%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIDZ8ZMnqT1MYQELFaWSrejSN0%2BxadG%2BBaRu5v0YEHVYOAiEAjzpcU7Wo%2FPN%2Fh9Ya0H9hDa0tUA0DXn44BOh11U%2Bp3uoq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDNQk%2FQOvaR1HePU0YircA1fJJYoiAgrMC8kZa1rkFCZK0qLRJY6ONIOjcdDLY9yXOkNbDF1N%2FWboFXOMp2SzzyJsbHnak5tfqKDzT1uaPHO4lc9pJyAoxZICsQFENUxJcAPV1l%2BtAcMxM9xi7lEkkMgcOxvV5uUUiZc6%2FQaW7Wq4iohHd2qLcCtp5cnKR9GiRLVaEnqLiVvHJgb0X7Soda83muHN7kEBx1e4ypIiAyHHImmv7krjxFgmAhFtsWgyrs%2FQpXSazkkkmD%2BnD%2FsM1HL8NgoxS%2B2c8cEiuXn%2BTM6JJXkpdESL5vEr%2FWfmvdpfCDVykxkOVk8BXqu13xIETZKD7pqsNe%2Fl5AUhDU%2FhgD4izuIcMv%2B%2B%2B8Z2xNCcYct47aKODc9xzS1nsffAjHbfZNheTRYEOGs5RD0d2f0qKag%2Fl%2BwP9rQzLdOLMUknawVKmhS5g%2BlMZ8mch74dovfuIRmN1gVHsTSVbWF2L1jgqwjDxYOJFOUd%2BTISuxMgIl%2BKFCkEArwA4%2B8WYLCffx%2FhEvZCjeSPfVj0sU4poyWHUsKNc1l3SO%2F8mgCET7ksSathM1EjibRLVzhzPUQ%2FDi0QuygGSToIlWeeyDgmxz%2FwXX8KM4AEYPzmlwoRLA99ycQPsuhMrcWCB5%2FAIySPMMit6M4GOqUBvoh4sUSkj2arX5k0xkJBTj6AUX2wfDqmMdBRVqi0qT1nFS6DMdXYAfj26uy95C24eaZlZ8fjqoYmD7skvDoejyc7x0tU6kMpgvftbSX3j53%2Fw2XhwK%2FDqT7RL9UYzkZETI7Uzd0DNTS4cFncvreVQMQnRVAYqYT5gII5V3YA%2BDrLSsSDXU5ZurVfEa7vWbMTPLbnYnna9Xwu1dQgYJbfMf2MThZ%2F&X-Amz-Signature=e8814823c7a3485f4948c037431b41500af7bc6e030a9ea4863d9816065c751d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y72OPY3W%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIDZ8ZMnqT1MYQELFaWSrejSN0%2BxadG%2BBaRu5v0YEHVYOAiEAjzpcU7Wo%2FPN%2Fh9Ya0H9hDa0tUA0DXn44BOh11U%2Bp3uoq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDNQk%2FQOvaR1HePU0YircA1fJJYoiAgrMC8kZa1rkFCZK0qLRJY6ONIOjcdDLY9yXOkNbDF1N%2FWboFXOMp2SzzyJsbHnak5tfqKDzT1uaPHO4lc9pJyAoxZICsQFENUxJcAPV1l%2BtAcMxM9xi7lEkkMgcOxvV5uUUiZc6%2FQaW7Wq4iohHd2qLcCtp5cnKR9GiRLVaEnqLiVvHJgb0X7Soda83muHN7kEBx1e4ypIiAyHHImmv7krjxFgmAhFtsWgyrs%2FQpXSazkkkmD%2BnD%2FsM1HL8NgoxS%2B2c8cEiuXn%2BTM6JJXkpdESL5vEr%2FWfmvdpfCDVykxkOVk8BXqu13xIETZKD7pqsNe%2Fl5AUhDU%2FhgD4izuIcMv%2B%2B%2B8Z2xNCcYct47aKODc9xzS1nsffAjHbfZNheTRYEOGs5RD0d2f0qKag%2Fl%2BwP9rQzLdOLMUknawVKmhS5g%2BlMZ8mch74dovfuIRmN1gVHsTSVbWF2L1jgqwjDxYOJFOUd%2BTISuxMgIl%2BKFCkEArwA4%2B8WYLCffx%2FhEvZCjeSPfVj0sU4poyWHUsKNc1l3SO%2F8mgCET7ksSathM1EjibRLVzhzPUQ%2FDi0QuygGSToIlWeeyDgmxz%2FwXX8KM4AEYPzmlwoRLA99ycQPsuhMrcWCB5%2FAIySPMMit6M4GOqUBvoh4sUSkj2arX5k0xkJBTj6AUX2wfDqmMdBRVqi0qT1nFS6DMdXYAfj26uy95C24eaZlZ8fjqoYmD7skvDoejyc7x0tU6kMpgvftbSX3j53%2Fw2XhwK%2FDqT7RL9UYzkZETI7Uzd0DNTS4cFncvreVQMQnRVAYqYT5gII5V3YA%2BDrLSsSDXU5ZurVfEa7vWbMTPLbnYnna9Xwu1dQgYJbfMf2MThZ%2F&X-Amz-Signature=e8814823c7a3485f4948c037431b41500af7bc6e030a9ea4863d9816065c751d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3A6AN7B%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T102107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDPcAaEugt95wnrqQ1gCUTNMNpytXfG8QMiMQbCQT3lnAIhAKRkbtj3817%2B7xPAieZ0vbygnpY5AVyuBiDyx7OnUqKtKv8DCEMQABoMNjM3NDIzMTgzODA1IgyCuebsqTIAXJ15YP4q3AOkpceQXau7qVgw059mU8VhDrcxJrVmLcIsQ%2B5fjJtfUVE4WCYqQshiFXcOtw59%2BugU3m08rZ0i3U8i%2FRH4jDgqoRqryFyckZkGnzZ1IGKEOX30R%2BBGsJphKZ0dC6K%2BawiIu6f1VnoPd6VJ0cMiILQs%2FC3dRQA8j5hbBIr8PZPz5LIhFH0F8NvdNueR1Zjs2ojJVEw9jV85jFYYhYuPraYb5XZUDif9lcdXc3NC1Ofc5x8Rry4MJsr0iMHlhQDBOYAfK0QmA6%2FvBZL6V0I0TH14u31JfZQlip5DeRS%2BetclXuYv0Iz%2FxDAZp%2BmRiBYBHEIdhX2XOA7a%2BcMTBmRHw56vkTcuFU84cgsAA1mcOgvbrfK7xoB5W%2FqnDd0qUJeDc%2B7tqJX4wCTrRyOvPS%2BZv0%2Bs5JAEmMrVYTsiNPnXpkM1IFIr8LSNKz3XUQdITQSwFPcA3E8A%2FD2DmQFoBJ%2BScKPRBDWYTKqj2d03oNAWeHBjx3VgUXbgMRdVrV%2FD424QvKvbozcFRbBlvVGfW6uHbw6yLo39yHhVNOX5PpAFDHRsxG1czdlIBLEZpnBBwPzU6G7eHRr4H%2F59sUuxoysI914N73BOnvk3BjJuNPOIQks6PzLBbNR4%2Bdo6Ow%2BBejC%2BrejOBjqkAdP2OWTDLfjPid6c7zvOv0PrsDqXbNt3w6WMyUuKAOgqo88P7qrZv0brFls70V5bPedayuufB20zAatP3kc7zRqc6EaVYlujgyKUjpZbbANyENmLfWjN8llcfW4QIDGYF0YPl0VTpAS92zc8eeO5TMMDgOJsuus0wFz3cvsS0ZQyBVO%2FWNyJ6tJr0J4RJM%2BRsKEdYXhigcV6epcmMBZqSXuxXXYc&X-Amz-Signature=588881452fc065912ed70b6cb3a3f10bb804682a3a9f0b9e745bbe8da6df1cb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

