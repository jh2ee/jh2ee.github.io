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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKCRLOHY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFgFoo8on%2B%2F45tOL%2BusF%2FzJscoMhAr3RNxVjFuQJ1xa%2BAiEAm0H6iMij1ScbKcP1L8NVjxycyPwwQOjDdOUMR9lgGHIqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFFhCqJtbOZeVmOFxSrcA7UCBvBjPZnL3egRRNlKvp80W00AGiPrlJNMd5kLdsTmc%2BbjKeInfGcsYxfeBMe03F6cp6KwRufKN%2FaOezuE%2FcykIbR03s3XZAk4gI3koLkEkzahD2exZqiQKyZkvn8owjKiBRsy2oAw7ZeltFZiZIFHQR%2BeEEtEpXhC3SOE3f9sq0UVdWTqGUtqxiz7XfgnV29MLku5ECbhBHfyIya0q0zwgUe3GXnz9o8KEFiFo31WiyTboCEiCD1DNiqgvLp4xFXj3Vxpthnr8kckPujAANtHNS40IWb3oJDYC3CNk7Q%2BpNg2hTLtYBj6pJt8tuZ6CN6TRslipgaA4qZGWMZ%2FxEVlf8%2BG45o4OPDpBpTSkaitoIQ0bkWSxQh7Ws30xpCz6DDlXLXrMIYfjfEA%2BJ7E%2FBflFqNkvMMRU4xCP9tjOl6i1H23CKcNRrpOlOSYIb9RPCtwVLhYtmGG1fP4i0ldAC6dE9JJdO%2BatoZBgXMnstj%2BxPZPQOuI9OmKia79IM0X%2BsQWXM60qIjUpPX1eEygudg3O3JlPX0Hii5ZgULPaSiIQjhE78j4MWqsYPlKJ7ezavZilmpKVyVETUqSeBDIAQFrPKTE2R%2BCYgJPouAhDySIA1xzYZfcg5NcbvE%2FMO6Ilc4GOqUBLBIUimYTLgJbuItxbSofhiFlmkxEKAw0kwiKH9B3g4e0Zti%2BCnpYgSMlzk%2ByZKqrtpkHsNBxX9rbPiDCoc5KMcdDzFxIvK2o4PzhlWaHiYnwV7gdldUBfJCqLyQfIel9KGRoSFOVfp3boENWN5OH3eqcYiw4qVL72r6nswyk6UvwE8EGYKnU%2BgPrGd5oGACJIF1wcmS4i0YGkxdPlOZLoYuBbfLW&X-Amz-Signature=46126c09b7b335a5ffe4caee2c7883b57cd697f6b4c7144487299920a58f7057&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKCRLOHY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFgFoo8on%2B%2F45tOL%2BusF%2FzJscoMhAr3RNxVjFuQJ1xa%2BAiEAm0H6iMij1ScbKcP1L8NVjxycyPwwQOjDdOUMR9lgGHIqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFFhCqJtbOZeVmOFxSrcA7UCBvBjPZnL3egRRNlKvp80W00AGiPrlJNMd5kLdsTmc%2BbjKeInfGcsYxfeBMe03F6cp6KwRufKN%2FaOezuE%2FcykIbR03s3XZAk4gI3koLkEkzahD2exZqiQKyZkvn8owjKiBRsy2oAw7ZeltFZiZIFHQR%2BeEEtEpXhC3SOE3f9sq0UVdWTqGUtqxiz7XfgnV29MLku5ECbhBHfyIya0q0zwgUe3GXnz9o8KEFiFo31WiyTboCEiCD1DNiqgvLp4xFXj3Vxpthnr8kckPujAANtHNS40IWb3oJDYC3CNk7Q%2BpNg2hTLtYBj6pJt8tuZ6CN6TRslipgaA4qZGWMZ%2FxEVlf8%2BG45o4OPDpBpTSkaitoIQ0bkWSxQh7Ws30xpCz6DDlXLXrMIYfjfEA%2BJ7E%2FBflFqNkvMMRU4xCP9tjOl6i1H23CKcNRrpOlOSYIb9RPCtwVLhYtmGG1fP4i0ldAC6dE9JJdO%2BatoZBgXMnstj%2BxPZPQOuI9OmKia79IM0X%2BsQWXM60qIjUpPX1eEygudg3O3JlPX0Hii5ZgULPaSiIQjhE78j4MWqsYPlKJ7ezavZilmpKVyVETUqSeBDIAQFrPKTE2R%2BCYgJPouAhDySIA1xzYZfcg5NcbvE%2FMO6Ilc4GOqUBLBIUimYTLgJbuItxbSofhiFlmkxEKAw0kwiKH9B3g4e0Zti%2BCnpYgSMlzk%2ByZKqrtpkHsNBxX9rbPiDCoc5KMcdDzFxIvK2o4PzhlWaHiYnwV7gdldUBfJCqLyQfIel9KGRoSFOVfp3boENWN5OH3eqcYiw4qVL72r6nswyk6UvwE8EGYKnU%2BgPrGd5oGACJIF1wcmS4i0YGkxdPlOZLoYuBbfLW&X-Amz-Signature=46126c09b7b335a5ffe4caee2c7883b57cd697f6b4c7144487299920a58f7057&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHJLU5MB%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDFnx2e%2BjLlrW4hRr3dbKzd60xnEncphNYa6v%2F03W9ycgIhAJ4HHGzfoeNL2FyomtnHdg6grBdV1hGyChYgHIdgdST%2FKogECMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy1JelzNxOKSGaz3WUq3AOMrnkdF88CTVnxFjKEAzUofdtHI7UquTtGzfqdAoaES5srWQVOWDOpmbk7IkYjhDFp53QfvrM%2BB0397XWcDMExkQGowgQf3qtUdgPgX74o4yKtjaGYMXXJ7YddhoaMbZfIDGAmP4vcQQpZmr04lckXwwZvth4FHX%2Bb2gHiN6eIwpJ4u5cOJ8zPWQqSSOaRq72MBXx2AAV9AIw6uAdzN55J6wB89VipwRAhwvvowCiKvEPWwNlQjSKN1oWV1c%2FoSRTgY15%2BxpZS7PP6CMCWmjfhJ6dEcqfZ7f5Nj7xluaoKnLs%2FBqhDPtVOgVJO9VeK7X%2FTfj7%2B7NlLHYWkjc8cYb%2Fm4sRRiqUZOZXwytdSAcifyjPnt0QrqJctC3KNPJJP8hMPF7Ge7ctwpCghctBAYJHKnsJobOoF4NiPkIGDGzFnpDZ0w%2BQDCqB6DGhwsxfEGMdKydrpBHFKV48%2BxM%2BUQ8vkmQA4FbQ%2F1g4fzyMiuhntz4m%2BtXYYnKSCnz04vCS4ytfzgFUqu3un4dAHM%2Fq7uuJzz%2BszKAx2HWJkYZtU7iu2PLgplf%2FE43RadnZvHRBs%2BMxA5E2eoAQifF4EdN%2FBxB1inDPVcldxSo%2F0x4%2BZwULdwfTDTJv%2FWSTxbnXJFTDxh5XOBjqkAQmX81AGnbonXKJmkT8ySx4il7FFNjEU047ZoWhr8zK0L14HhWNb%2ByJpajh6W4hqcluKI4Cfrnm%2FoYO5Y5WmpKO9OWYF93HQTCwC%2F1oBIwzvdr9ZRUQfnKxe01GAKNmXw%2B2uOuqrkkrRwVW364idNMDSkH2yt2c%2FDUfyaC1KUkuabSnsZNaIaAk2w8OTqRCwP%2FNLMCKjqaC8hYT3XIqM%2FQPAF8K3&X-Amz-Signature=66d84e68616d1814fc2c5da8d8ca955bb8b9c493230dd5b75789df3f877449f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTLZUG3G%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDh40wX8DEzT84bTFZwo5XL%2F%2FZpx6yDZGllQAwDvS6WLgIhAP%2Bf6BfotGwJ%2FvuQ%2B6EhTvEhsHLbKJD%2FJULbpRorRLtxKogECMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxxHR1ReSwYl1yZBGwq3AMhPZFnYA7dGm1WbxW7pYPxOfqtOoVL0Dq9Q495CtOHhfk8A2Czkb0kwyP6aGxjT9nosdiqomwaSxJISCsGAJeasuueV%2BTtkslRXArVpxnuXWMrXOH4wow4%2B9iqoEcx0x4ph5MNOk3qFzClWfa%2BigDX%2FemiFZrA2eLitwrFqZQY3u56p0TSYM5nO9dPDYRiAm3r2oY2oaCd9bYoV9H2aGCgYwP7qVAfSIfiXZQzf71kXvUOOEYTl%2BrP8hhrpuSSi5qD5wjFdBtBWDOXEx440Z7%2FRJEWL%2FMTcwmi%2B9VtmkDpUvReEUeldzE%2Bh0G72NrmHzOl28u9%2BdX0AjguKv11XKkrOd%2F5YKR3ABWlE%2BEn96rRPwFvkdbG6gH8kmQAoXm2ONDNoW1BD8BHTaao4B1rYPLOVFueB%2BbW8Z7MUTOOLU0xjwxZlDCyvpLdv7zAQJH6o3Mgz0srWkVMyjceHYR0%2FhSv3%2BzPC4%2FENAA1dSyJL1H5E%2FaTTenbWM2ith295u1IWk1MObohVKMBfR6Hy3ZxtzPeTBf56WOvWjGL8BjUGLdaEargDsf006i9ePS665PQvJ0jQqgO6GTrvHt4ajN7qOBs1KJvh96UmpYmVHid0zUk%2Ffr9gZZ%2FV9FVWWB9JTCYh5XOBjqkAdNVgdmOHx2fTMFpvHF96RdYlcZx2iRfFlV57G9fMngZZT%2Fp6C1419zKeyUf8AHX2gK%2FeCEapNRLQjWJvtq03CTf%2F89LSL65NciPLfLXroQoXzw0ZFr%2BSmQpRk56kd1qmC%2FstVv1eF3UXrGMqeUtJomXBy9qOHSKoqwcQZlqGddQFL1mnDKKrLsnp3uGKNlUNuTsK8faqK82jw9de2HjCQqzQdTo&X-Amz-Signature=6d2835c2680db72b6a00631aff1f634d91580b26adbda4be125e166e885c5d4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTLZUG3G%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDh40wX8DEzT84bTFZwo5XL%2F%2FZpx6yDZGllQAwDvS6WLgIhAP%2Bf6BfotGwJ%2FvuQ%2B6EhTvEhsHLbKJD%2FJULbpRorRLtxKogECMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxxHR1ReSwYl1yZBGwq3AMhPZFnYA7dGm1WbxW7pYPxOfqtOoVL0Dq9Q495CtOHhfk8A2Czkb0kwyP6aGxjT9nosdiqomwaSxJISCsGAJeasuueV%2BTtkslRXArVpxnuXWMrXOH4wow4%2B9iqoEcx0x4ph5MNOk3qFzClWfa%2BigDX%2FemiFZrA2eLitwrFqZQY3u56p0TSYM5nO9dPDYRiAm3r2oY2oaCd9bYoV9H2aGCgYwP7qVAfSIfiXZQzf71kXvUOOEYTl%2BrP8hhrpuSSi5qD5wjFdBtBWDOXEx440Z7%2FRJEWL%2FMTcwmi%2B9VtmkDpUvReEUeldzE%2Bh0G72NrmHzOl28u9%2BdX0AjguKv11XKkrOd%2F5YKR3ABWlE%2BEn96rRPwFvkdbG6gH8kmQAoXm2ONDNoW1BD8BHTaao4B1rYPLOVFueB%2BbW8Z7MUTOOLU0xjwxZlDCyvpLdv7zAQJH6o3Mgz0srWkVMyjceHYR0%2FhSv3%2BzPC4%2FENAA1dSyJL1H5E%2FaTTenbWM2ith295u1IWk1MObohVKMBfR6Hy3ZxtzPeTBf56WOvWjGL8BjUGLdaEargDsf006i9ePS665PQvJ0jQqgO6GTrvHt4ajN7qOBs1KJvh96UmpYmVHid0zUk%2Ffr9gZZ%2FV9FVWWB9JTCYh5XOBjqkAdNVgdmOHx2fTMFpvHF96RdYlcZx2iRfFlV57G9fMngZZT%2Fp6C1419zKeyUf8AHX2gK%2FeCEapNRLQjWJvtq03CTf%2F89LSL65NciPLfLXroQoXzw0ZFr%2BSmQpRk56kd1qmC%2FstVv1eF3UXrGMqeUtJomXBy9qOHSKoqwcQZlqGddQFL1mnDKKrLsnp3uGKNlUNuTsK8faqK82jw9de2HjCQqzQdTo&X-Amz-Signature=87af8c92bfd2049a3d2fea8521c9f0dc428fd19ae9080f836215c090d34edf23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRHKIYZY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDLkD7pLfEQinwv0ep14FCYmvE3GWfTZxB2zXdYqEqhhQIgY9Fi50MXKSh45eyjGbcWFxJOOiNBbRPJJ81kifRaU2oqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLNElyg3jHBuQ%2BJQKSrcA32OlYRVZ3a6YhZ8rYbo2TIfZcpgrSWWxeVqD011t3XnjGKNs%2FOd7a36SyRpA9iisTlZCujLrNWzNl2QzhcEebxH%2BCUT1uCZjil96iAr2rsFEgA1%2B%2BiYL2YBpOHhLCRrBNrPaeaJXZJTybgOTzH7nKtrAfbXtlxHzqm6uXCxZvzVziyBmmFs%2BDO86FZdyogowvMHQDLqfjDOIAyUMW97eRlxuZwusHuPV%2FsTegvzbTuxMnJ7me3ddPrKyiJ81XnsmiA9BN647CyutwQ08t4oFzrZfEVZgqenz8EL9c%2FvKhHoaNo2IXmqzoYcYykFoDGpw7zrV2tvuL%2BFlrYuEdyXygqCUWzjtqNAJGb1epTxr91avyIw4nhqTIrlxrXx5StCJOHi8KLV6SLfYz%2FgfB%2FKLDZLSIsRCd7xF7uVD2cFHNuf0HXC9EpD%2BPqFg4n40je3TrBQVPRGI0pSkjKhjVOQsz1u7dP6KxRm7d0CtgayqZf%2BBMPiNHPinogOqcOKRRp3HAD%2FhVU6LDfxUtZNfiigacYeO8ItiV8pbYPxEu6W8oMzI1%2FPFroy8sDchBZPAB9ZhmDsKk3j9L4PlD6KZvAMyDWIdXxJWbE%2BKhjQ%2Fh1WfSR9iLh3orirdOuxyk8eMKeJlc4GOqUBsrCXA15fSsW3DdjoNwVhVGJO1P1AucEp%2BVDc95P1kNH%2BpqRjovpn9t6LJBRZE%2F7WKMaPQtaLAGe1HjF%2BfhMKuiwP8HSM6gTHj4Xt28eJhDdM3hUQoX7Nnunm7xujRwLk8nTLGyuJMzz2UGRxHJ9z%2Byx5kbGjwVioxEiTGrViMq7JUII%2BZEOLkMO165%2Byg5UG3caKnMS2oxaBDyVSPuD7s1oW2JMu&X-Amz-Signature=7ef4994da5b2abe7dc46c6cc8a4701de480518bc4ce41b66d2c38bda54790eaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEJYSNZ5%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155850Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0oXdDdsw%2BbJVEZ8Vz6dX8MexlmEoH1No3j1TMgB72tAIgKEY0D3V31BiaQVm5i3Bbos8y%2FkODyzDsFGeic9IwgrkqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEVBzVF1aXCs4lm%2B3ircAwtAk7TkH6nbDVK4cvqP6LnnEXxotKS%2FK5%2BSFF2JyQcqXj9AYgtUicm8vHu6ymXX7%2Bcl%2Byz6xNFs3fr7yIgoXG4GcCwDSGguuxtvecrMtafmt4ZuagS0oANwW3g8JsPmNopNM0ZZCYnOeYjzQjmWx7dHAqYbAAvT6UOpy7Sz3y63bBKX7GViYPiz77Ilsrpb55Pn5iUw72WMcc%2BpDOB0eS0NIL%2Fquot5v8rIRVcZm8pcb9R4ENMJ51S0VaZiqerqTd1jvgboxZ8LP%2BTyIfB%2FoGJEHiC1TbbmZua7jW7hTZwAfhncyi5aE5crwQSn%2F4PPQnBBKRbUHPYAZu957YA8wsG3dwHA0dT77k5IyVGOOLW80KaRXAhbVm5Z5iBK5giqRKez%2F%2F8ULJCwOhxVLcHpNWzzg5HeF7NznxfxnMKwhR%2F8sXWT5pimRKS7s1Ge9oGWp0POq1tGcfsPFYuBoDdAIgkh0%2BdcbLINWQ9ih%2FASYmBPDOUjoCY5bqlozyzXZhaK903ZIqnWdLn8qgEBPblnw12F1njjnMYJItQP%2BVoVOhhamXJkYk6yjSHbGx88hKR8fbufKVTbVOd1ryvwkmJMKPabRotH7q%2BYGdIPa%2BAv5WdvV3d4M9oYeZUW4nwSMM6Hlc4GOqUBdWK0QKovoyt30JvEX0uGfj2rdgiwfzGL3bOPAYHJgDsQIodvRI5LNogCeg186j7SPmhybenabhzAJnrBWYsJndTr3OrfJw5Res8%2FL32L0lboCPTCRDtufJlC361v1TjhaKhAwJH%2BhaDyvawcb2cGjl3grF7OP%2BP0q%2FtxBVz9koEZwzUXFF4AfJ8SQEDUxJpi0iso4Fmq3yW%2FAuMdTv1sdx2fZRmp&X-Amz-Signature=64657c427c7b714db6c6bad162b44922babec90079f2bea1ea61239e9beaf88c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UROWVLV%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICld3MPclI907NaazQn%2Fd5tQQBp1gotPyEuPzEt%2BfoDkAiBaBQk1kJHRxSVUGoIB6UTsSgywrPYP09ZPhzQa4hBrqyqIBAjI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2NtbZLsISRw%2BUAz2KtwDXKptAKuVJxMWEPf6HtumdtqK9GBJKsv2IHS7fvJ43PCquDu2dBzOKPtaP9N5%2FDvlzrBp1yPQMRrtQL0%2F75hYts4%2BK0cJsrqxx5THywmsdJGAAIs1Vq1T5wWAL3q3jpIND5MIA3f7VcyCLDLcdmccgrnfh%2FhtYx4i1rRDIq3bWt%2BwMZRqgsD0mstp4K38JnQiZ%2BhuFZNY4z7pwnkl9w%2FoDuLt7m0DifJvjH2C5bOZVTJVUYrYueU9qYLwT5Q2HKyJXJ6fXOeZ2LSF2ucg4LLCD6By9o5khTQIBmb%2By6qDwscQ1EQRt8a8X41K536WRP%2FeC71eCamMKFaDYCYEGjRlo%2BuA%2BLNfI%2BFtnxTIPaGh%2Fp7IMRylfvFfUKgFBNt7sA9MG4Sevr%2FqM3umfezO1lxy8PP6NttGS8ZJGLUmMdb%2B12CEl4dvRd4iwKzUJzG0rwmQV0TDn%2BP4a2mjdsPaOXlcv1yUuzE%2B0TAEKF7k2E0bOfSBfv%2Bs1VWWunbx3xfU2Fl9PSLZjmkim67Gf6rR8eEG0ET03JIK7bCKdLOiW7f8mcHPxl1CFoDJN%2FhgegO7nlau1IaGgzWzRYrZbDTavFx2hQF%2Fea71WwBTOueLONEKJ9k%2FtSrbRjYbQPsORwswvoeVzgY6pgFY9yaUnNOhcfIJTBq7bApCCjsiIF7EaDj6HoMDXoQhstRETYpi5zC0Ew9IwRMVCYIqgcNptgjBWHBLqAl03bH%2FxH8iOeX28UcHq2FerBVcbX1bdV7PcoIpTeSJnziBDwBEoO%2BYx3T4eKrdSoH9jZvbJXdzKPBJIgb%2FqDfuOtlXRso%2F0F4yFMiHDjbHrb8Wku0a7jxrrLNWRomcI%2FYApqG4V3zGi%2BE%2B&X-Amz-Signature=49648c727a07e2df87a02368888d283eb3db8629bd4d5adcab3d2d936a83ca6f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYFQITNA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BCbcmZf938tbpy%2By%2Bz9kb%2BcUHnv7eWtkSCUNxyX1mjgIhAN3Yr1IPP3JuarXi%2FWNVKRLY7DrGKkyzXQsPijsIoE1IKogECMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyMIN%2Fza4h5%2FgUOUaEq3ANhc3RA%2FP%2BR%2FOTZ3cg75X62iJMPeDSHX31J6lt9V%2BwXsc7HyeoGvDDXB2Wneoa2qYJsivHwTwWdC1dgZOTIYtJlQgI2QRz3xF5aMd%2FCYIugHN8DGe7Scucp5%2FJ1hpdAtZsbo%2FDL1mWIABmZU98Imiix%2BpaDCzRy8rK12zcl91ZEQfZtFd%2BAO2X5aw00RWT18VRqRj7JNyu8WtT8q13tGivil35ux0phOJIj0A1UUds7XiqXP52sLuHhoE%2FnbGucNwb%2Fif9RPH5AmzKa%2FcpHS7LTcIB1q394UG9Zvydr2T7uV%2FsDjKnq33fw47dY233NL%2BT%2FF00wyLbXqQs%2FnKqWfbkqHnmBEKciOOOCm0qObg78573bCQaHPp7pefYY1CVmEeICh%2BlRibM3DMQBai%2FLO4q3DcVOGpSSMo3z9gXdxGUUaoy%2B9gnI22HGHS7qoTDaY9YjUmrJ%2FlgE%2FiUUnTjbx1YsTKuBBKSqY73FfSBOxbnbpZ1HL39bcQ9iYiIHLv6Z9yJ0XzVYimqw7%2BYGduWYTR6xK10V1r5%2Bw2oo8midal9TJuTVALiRoWlPoTQaosa29iMoL3yRXmonrZ6L0WfbvL%2B5%2FZzx79QVch3L4k1Qjwn%2BnxQsBhCvCxxKn6MjTjDGiJXOBjqkAQHmvuZs91dIVB5BlxZ84uolMotYZ6g9wJg4qBkd%2FupoEWFJxPJPtIspCv2YbWlg8XVTurP%2FtA5fc1mbKlhK%2FUO0lYYQXXuMedyeCk4A%2B2jQj9fQjAX2pDXG%2FDD%2FtKgkIu%2BXmn7SqdlyeMBBDTQiFW%2BgE7sUOjNQmY%2Bhxg6ItwORS%2F9S0uPwV0PP7xmETdI4LQizQYbWaqp60Lb3jRHJxqSSJZfr&X-Amz-Signature=f9c3fe443481abeb21a32eddc96fc2ca3550fcd9710a5dd7aa1b9666ef51ff08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYFQITNA%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BCbcmZf938tbpy%2By%2Bz9kb%2BcUHnv7eWtkSCUNxyX1mjgIhAN3Yr1IPP3JuarXi%2FWNVKRLY7DrGKkyzXQsPijsIoE1IKogECMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyMIN%2Fza4h5%2FgUOUaEq3ANhc3RA%2FP%2BR%2FOTZ3cg75X62iJMPeDSHX31J6lt9V%2BwXsc7HyeoGvDDXB2Wneoa2qYJsivHwTwWdC1dgZOTIYtJlQgI2QRz3xF5aMd%2FCYIugHN8DGe7Scucp5%2FJ1hpdAtZsbo%2FDL1mWIABmZU98Imiix%2BpaDCzRy8rK12zcl91ZEQfZtFd%2BAO2X5aw00RWT18VRqRj7JNyu8WtT8q13tGivil35ux0phOJIj0A1UUds7XiqXP52sLuHhoE%2FnbGucNwb%2Fif9RPH5AmzKa%2FcpHS7LTcIB1q394UG9Zvydr2T7uV%2FsDjKnq33fw47dY233NL%2BT%2FF00wyLbXqQs%2FnKqWfbkqHnmBEKciOOOCm0qObg78573bCQaHPp7pefYY1CVmEeICh%2BlRibM3DMQBai%2FLO4q3DcVOGpSSMo3z9gXdxGUUaoy%2B9gnI22HGHS7qoTDaY9YjUmrJ%2FlgE%2FiUUnTjbx1YsTKuBBKSqY73FfSBOxbnbpZ1HL39bcQ9iYiIHLv6Z9yJ0XzVYimqw7%2BYGduWYTR6xK10V1r5%2Bw2oo8midal9TJuTVALiRoWlPoTQaosa29iMoL3yRXmonrZ6L0WfbvL%2B5%2FZzx79QVch3L4k1Qjwn%2BnxQsBhCvCxxKn6MjTjDGiJXOBjqkAQHmvuZs91dIVB5BlxZ84uolMotYZ6g9wJg4qBkd%2FupoEWFJxPJPtIspCv2YbWlg8XVTurP%2FtA5fc1mbKlhK%2FUO0lYYQXXuMedyeCk4A%2B2jQj9fQjAX2pDXG%2FDD%2FtKgkIu%2BXmn7SqdlyeMBBDTQiFW%2BgE7sUOjNQmY%2Bhxg6ItwORS%2F9S0uPwV0PP7xmETdI4LQizQYbWaqp60Lb3jRHJxqSSJZfr&X-Amz-Signature=ba9d9cfd0cbd48b6d3616cb88dc1ecf13b0fe9c2fa4df3d030dcbf137046d96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTZ3QAAZ%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFZWp%2Fez7mG1fV%2Bozx35UtW05Q32YPKbM07vwIw0ahRZAiAHSWe8nmEDNn3LkRPArFjf3J%2FYv1y3jJ01RI%2FadFW2uyqIBAjI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWHPgaKue7w7jqaIdKtwDM4GfKYgwqlbNL7RkKHMHEurYlLlZPxuPtvuUksePILdONgHI3H1hu8De%2BzMQJfoB5ffduXCKPvbOwaoPRjs427CZqdwLxACYAOSxqjLzLsIFjf%2FccLDVP4ihy3EYe7ITSfhEGLJlOlmhnk1qQ%2FQ3paHjpviHtDdwpnxbrtzp90XB3YogPzK5fhIKWRu90b25grUWlBFQkIAGD9C3TGOuDRtL7dqleROTq4hhN7Cu2CEzgcFPHimgZOHBX0Y%2FvPdHQ4Dym7sWxN9nu8nd1HRR10PxmVOcLjNLusSC2CLAvMTkVk9QWCi%2FgPW%2FT6PfNTvIOQwjCTgy11VDZFAp8HsIfo6IXYQ9ax9mzycP9xn%2BZNeKA190vevlVNNbtjR3Ckishu0%2BBjO5HcEgOx03LThr8A97OV2Nnya4cMWXhG2w4psj1sQYdwgMoA0rYp1Sl%2BE60LERVic5qCNH3KV%2By1iKZ4LO%2Bj8%2FUjW4BPaN%2FQcpxEUOP8gW%2FCEPwfVTyq%2F3ChiDx0pBg7qdpUuuifPfEUa59FXLE9uG4fltVh3KE8ZxoWKHj%2Bn5M4Hpt7Xqqe4JFbovmxrHSGdU746AE2Uj9EBRVr9QR0mv4htMBpA7vGBmjqqLAU5S8ljj98LAo2Uw94iVzgY6pgH0%2FkPkv15xJQ%2BeDFQs4SDKBwgwm2uJzPJyinTxfXrZpytrVr3V%2BYngt%2F9KFqlmzSa7KfhfArk8g76aMtzf5n0r18tBzeK%2FUUCnUGYdcg6KLenrlRAKh1wDqmsbb%2BUwX3UF989EjZJuvg5VO%2B5F0pjnbx1JSQnaLartSS9GY%2Fg9rMW4iTKyjUSV5Y3RR9sh8uGqkNX7FAiXOQkAsaZQkP%2BlDs5hX8Yr&X-Amz-Signature=caef407b46f6a6ff62b7d29fd69c9d28e6461db1e44f2ca0864773584d099347&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664E7APXQN%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFeWhX%2BPCtJVf%2F0tKms1FOrWaN8zxe90GAkRcXjGMaC2AiAJTp4n0tqY6uy4b5t1t0lo0zAtMKclGryDxJXhvBN0PiqIBAjI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfk9Xceaad%2Flmzkx0KtwDzxne%2BhP2UL52HgcPaTJWqRp8cHfgnBVt%2F9m12YZRmFdKSEu54VzNWk5FyYu2ULZLae28YEwrdppOF0AL5JmBrx8N1RwJirwz51LCyFFYhXd8eZCQxql3ap%2FWzBRngmSdkEU51PChaghljPLUtVxMwG4noFN6C%2FTOpEwvbDpTQ9%2FBMJsPYz6%2BmtgfbidzYJn%2F1der49WnHt8dDiR1oJdY3wmrdEPOjP%2FZmNCXrY%2FXeREeY7Zy1toCNgRR7QEg9AlHOIsmZe54dA8vVITcqiSHaIOReRAv1U3HhQv%2Fan2%2Fpjq39SWdh3EhkzxIVg3E1P7AweSWL0%2Fh64oA%2FyPoSLI5N9u82onPr2V0qPdlDUks0xdc6vJVIfI%2BpuIOgTbV4iwAAZWPggVQM%2BSga91G2btzNzQnAHY2tZArTFQRAk5zCveErmJ498LOaCJuUhah%2FFf2kY3F0OFdgYz6voBJJRn8g1c0KACs2fUshStLJqQ14hrEynhStnv05ESwN%2BZbhd%2FBfhfxZotqHJKA6XKdZN89TRaxDJFdDULrt6DPh8h%2BST6hFJk5ZnQLbUPApZjjoACHWu0Xvorrzs49U3lAoFyO8lhlPKwF3KBoGGySthxCIe%2BRJf9gUvvbB4BbEBkwyIeVzgY6pgH7byUiY%2B5c6PcGgRCf5E4SeXYERxLNyo38U%2BXq9cnIhTlk0nGK2Nc2lBnAHt8Tbz02ntiU5m9LLLKlRQ15sDjYbruU3ABoDyNRnQycxpMRGyePLXnOwPJXwOHP3k3tPRYkdmhegMar6%2BmMDMDzEqE1EpI5XKleAz01bp6RZrWQqmBhoiDa1kLITTo725QfDOmLcVXLu0j5%2Bqu%2BigCQ4iDo1mSkfgSn&X-Amz-Signature=0248cacc35394a1c7bf3df8de929c2270afdc80db901fdfe9080f6b6147473d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664E7APXQN%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFeWhX%2BPCtJVf%2F0tKms1FOrWaN8zxe90GAkRcXjGMaC2AiAJTp4n0tqY6uy4b5t1t0lo0zAtMKclGryDxJXhvBN0PiqIBAjI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfk9Xceaad%2Flmzkx0KtwDzxne%2BhP2UL52HgcPaTJWqRp8cHfgnBVt%2F9m12YZRmFdKSEu54VzNWk5FyYu2ULZLae28YEwrdppOF0AL5JmBrx8N1RwJirwz51LCyFFYhXd8eZCQxql3ap%2FWzBRngmSdkEU51PChaghljPLUtVxMwG4noFN6C%2FTOpEwvbDpTQ9%2FBMJsPYz6%2BmtgfbidzYJn%2F1der49WnHt8dDiR1oJdY3wmrdEPOjP%2FZmNCXrY%2FXeREeY7Zy1toCNgRR7QEg9AlHOIsmZe54dA8vVITcqiSHaIOReRAv1U3HhQv%2Fan2%2Fpjq39SWdh3EhkzxIVg3E1P7AweSWL0%2Fh64oA%2FyPoSLI5N9u82onPr2V0qPdlDUks0xdc6vJVIfI%2BpuIOgTbV4iwAAZWPggVQM%2BSga91G2btzNzQnAHY2tZArTFQRAk5zCveErmJ498LOaCJuUhah%2FFf2kY3F0OFdgYz6voBJJRn8g1c0KACs2fUshStLJqQ14hrEynhStnv05ESwN%2BZbhd%2FBfhfxZotqHJKA6XKdZN89TRaxDJFdDULrt6DPh8h%2BST6hFJk5ZnQLbUPApZjjoACHWu0Xvorrzs49U3lAoFyO8lhlPKwF3KBoGGySthxCIe%2BRJf9gUvvbB4BbEBkwyIeVzgY6pgH7byUiY%2B5c6PcGgRCf5E4SeXYERxLNyo38U%2BXq9cnIhTlk0nGK2Nc2lBnAHt8Tbz02ntiU5m9LLLKlRQ15sDjYbruU3ABoDyNRnQycxpMRGyePLXnOwPJXwOHP3k3tPRYkdmhegMar6%2BmMDMDzEqE1EpI5XKleAz01bp6RZrWQqmBhoiDa1kLITTo725QfDOmLcVXLu0j5%2Bqu%2BigCQ4iDo1mSkfgSn&X-Amz-Signature=0248cacc35394a1c7bf3df8de929c2270afdc80db901fdfe9080f6b6147473d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652NRX7NI%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T155855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIANTQ%2FRwRML%2FF%2Bd87%2FFAHqautm5fwsEJMvRXpkSuCZfbAiACjDomJlUHAPqTeWL%2FMa2kvNSI71dRDaZD9DuAIA7TtCqIBAjI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxIBK37hm6Md6RsMpKtwDfAENWU88yPfNDhKUegDh%2BCZyTuKdq1JpoH%2BvzPZjfWKtHcMNGQTuIJWc9%2B2Kb8nNBKIglpVeX6OLPoishcnD%2BaQGcytSaFin0DRM9NjN6Q2YNXbNHmoqcBPCBGbTuLpWZVbUH90QY2%2F%2BUGHPQfWLrY6VLye64B8UJo0EUCvJf2lbqU62CXBbsOH%2BTYNftz2A1emrbT%2Bgs3H%2FABLA4rFiCya5DuvRV2Oye2e2VbAT%2FWjsMFR9yA%2Fqxp8aH5hC8xW%2BJ65Uaacy59diicYMOJHhms46dOpWETqPWGcesNhzoqfZkbhhNEbhG68ziMYO7lBM6%2FFoFyrhAwUSbOsFX%2Fy6E5mA8%2BVTZGZNB4xRc%2BtDZA1FPQkMGWR8R0Vfhx3MTPIcoMoDEvP7RdcnAFOxgmj9gbXbjBV2Z0rITbptCV7%2F51dhdMHI0%2BvsEwD34BuS24%2B8oKS2B6PUQEFf7oSuDnLsiEYQlhAIk7MKdn%2BYkQogwOp0tzPGWzMIUjrbr99S1zT7tiuutzGLvRZAvEAdF5I5MEQFpT%2BV%2B4LrYVKwy25Sk%2FpbDLqcOWfLviDEpBSSsztpT8%2Fv8zMmRTiZc05Dt5yPAWaplGhACM0lbWqBQC1dmJYsZURjYkPNVl66K7AwlYmVzgY6pgF7d%2FLnqVo%2FCnhAC45V1W2TmzRId6E74nI9sSCZoxR0bl%2BXUWFkK2%2FKVLENBv8cIOKxMlzZiQHV8UpiOu60vhu9L2uFbjGq8p%2Bgvtb42JouDnaSXdWauaK0dYLsRIk48z5UNaiDgzOrqT%2BrMiGRbZIbbdkDURvf94dq9SsnT0MWFzcPZo7DGVttJfU3ooNJpNNVxpRmfw%2BkpIMosYNU02eN7KUqpnb5&X-Amz-Signature=587547b8d518f20434f4dc3436776b993145fdbb5e03777030c3e73ddbab4f43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

