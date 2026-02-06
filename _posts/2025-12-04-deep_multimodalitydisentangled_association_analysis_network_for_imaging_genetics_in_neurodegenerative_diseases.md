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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ7YNHF7%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIAiybfIDoaAiE5bAjJmBAHeHSqlDQas6KeKuCSn5SoVTAiEAm4tOYitno86eQ4sq%2F4J4ZjboIWAu7IFZ6IEug%2F51kyAq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDJzBkJMi7JaZn2Az2yrcA3FPTiklw02AUysIWluTbw9W9O%2B99Js9hN4g4hdTy%2FINR118quF5dnukX5RX9pC8JgndZjDY6jjCnceu80dyhezbhrtADbFsWpnzORdWffw5YYNUnKrkILMHZnD2SW%2FidBc%2B1HzCAV2R%2FZzW%2FqPqw0wd1hLDMakxZAq8E1pb6q%2BlEvSEnpMMkfTTScxl0E%2BOSgtyXw7FW4Gy15jivoC22asOUlBn85gDMIB8PPItF1UNKO7UkMeoUY6yOV0V%2Fsqqv1twul3Jgp1Yo3XUQ6eGO4QijjAsV1rKwqm8yMfs5ViwufKjEBjN8MoPbCjIJbSd4qnSmaVdI17M69O%2B8A90F3aqYsL1RceIDyqGoM5f13b1FWIapDjxnf4O%2BMg5DHKu6j0Qb%2FUnqAt5x9juP%2B4c7UiVV%2BleWUsPOJyQMlXJk2L2g5ubqSChxXGSa1il%2Fp6jaE5kRFJDmBPx%2FS9pcvcgw5JGh1NR6UPw0Ltk4rSvbdVJIh%2FuHIzRpP17tlcut3TEGBEGArqi%2BocoAMZFCleO0VTUTewGBdpnmPInzL8wDYYEfnCQklFopYXjvQvOj8BVvgQFJAIkAmYc4dW36kBMWF1swEQRP4iabZ2jnruO964n0IrNJVYGP5dt%2F4sIMMnjlswGOqUBjPGC0yc0vj3TSrRl8i7hWXnNc7uhnMozDS1JrIac4Sf6Fj4uRCi98IcgNOIJTrRBeRM9L9pCq3uyr2i1pWMet486YbUX3jtGtoRhaq6FC%2FxnT7%2BGVZqYYL4MrSVgZw40xJaGtDP3fjFT2%2BMAxIDjd3UTJRHJLJuRO430P9kTxFU3L5krprJ6rZjqxhV7DG%2F405kz9o64p%2FyqqCypniWUfeMNfOEz&X-Amz-Signature=9af7e629e03e28292df638f4a6cbfd984bd9d57f7d0c378f694b32198604e1e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ7YNHF7%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIAiybfIDoaAiE5bAjJmBAHeHSqlDQas6KeKuCSn5SoVTAiEAm4tOYitno86eQ4sq%2F4J4ZjboIWAu7IFZ6IEug%2F51kyAq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDJzBkJMi7JaZn2Az2yrcA3FPTiklw02AUysIWluTbw9W9O%2B99Js9hN4g4hdTy%2FINR118quF5dnukX5RX9pC8JgndZjDY6jjCnceu80dyhezbhrtADbFsWpnzORdWffw5YYNUnKrkILMHZnD2SW%2FidBc%2B1HzCAV2R%2FZzW%2FqPqw0wd1hLDMakxZAq8E1pb6q%2BlEvSEnpMMkfTTScxl0E%2BOSgtyXw7FW4Gy15jivoC22asOUlBn85gDMIB8PPItF1UNKO7UkMeoUY6yOV0V%2Fsqqv1twul3Jgp1Yo3XUQ6eGO4QijjAsV1rKwqm8yMfs5ViwufKjEBjN8MoPbCjIJbSd4qnSmaVdI17M69O%2B8A90F3aqYsL1RceIDyqGoM5f13b1FWIapDjxnf4O%2BMg5DHKu6j0Qb%2FUnqAt5x9juP%2B4c7UiVV%2BleWUsPOJyQMlXJk2L2g5ubqSChxXGSa1il%2Fp6jaE5kRFJDmBPx%2FS9pcvcgw5JGh1NR6UPw0Ltk4rSvbdVJIh%2FuHIzRpP17tlcut3TEGBEGArqi%2BocoAMZFCleO0VTUTewGBdpnmPInzL8wDYYEfnCQklFopYXjvQvOj8BVvgQFJAIkAmYc4dW36kBMWF1swEQRP4iabZ2jnruO964n0IrNJVYGP5dt%2F4sIMMnjlswGOqUBjPGC0yc0vj3TSrRl8i7hWXnNc7uhnMozDS1JrIac4Sf6Fj4uRCi98IcgNOIJTrRBeRM9L9pCq3uyr2i1pWMet486YbUX3jtGtoRhaq6FC%2FxnT7%2BGVZqYYL4MrSVgZw40xJaGtDP3fjFT2%2BMAxIDjd3UTJRHJLJuRO430P9kTxFU3L5krprJ6rZjqxhV7DG%2F405kz9o64p%2FyqqCypniWUfeMNfOEz&X-Amz-Signature=9af7e629e03e28292df638f4a6cbfd984bd9d57f7d0c378f694b32198604e1e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652GARMSM%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIHLAv5Co7ub0sz2V8w7SZaSUQyAgktl7YUkDzum%2B8AMsAiEAmsOm2b3UdYBWPeGt4%2FlR9tXGSytX%2FL%2FhiemMUXvIpKMq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDHWl5iLCwKRU3bGrvircAwCyP18Lq8Bx0ZyTyYY5oaUiE68Pkipz27EPJ2n7QDZxa8Q1GVigwkR6%2FjORXvfv7P74Bw30Nh2hvQes8yZBeyCOnvXSnlsTCdleP5oMVXX5JsJnzzj8AB9ceogn%2B6PNU1AKwqcje4ZHrhRv6uXtDWbEINoo%2BR4LNOIGDxy8iPLdt9Au0XHvzD4V8rHVhYewWsqeMf7AQSwxvdo4O5QErV70gaqbS6IJ8WhtD0%2B97vzev%2FFXky1q6z5UMr%2BtXe4sAYz2R7fCUMOrjFrwNBCBIcXsFjQwdXJA7xKJCDA1VP6ZOzG7vQb2uvlEcyaiN40d5voRs9yTnk3vqmFBzgUz4KGRzZ7uOKJjqWfIzoibtGcH7srNUXFBoOZHXOjRNP0nJD8tsDGJMdGd0cqz5466xZEhik%2Bd5mKNmDwVqi9F7WvLK%2BWRJN1RMEiF4MmRwG3DPRoouvLMnilW7tb2%2FlP5kk%2BOk%2BAxNjP2%2BBJ4ba10rD1D6TFV22M2Gis3jhNwQS28GrImMIpI1wsdKSOB31mfCzo9sln56La8QWWHrBDk9vngJ4t4VaX%2BvNo9tPWjJdqNBxXxfoOoBkmxUWQWJHmvLDatn1r9Evo2v00VipDKMgsFFFOqrPGwAE5lHCzPMOfklswGOqUBkkGoCVjELPJ27M%2FhemyZnN9Dk7JGwFtSyUZ3m8C9i%2Bbc82VaflE5YV0s51FOvsAhTEJItNkpJP0aNDXxK070EYhXrGsUwcLmzlqcdMNt%2BUQL6cI%2FtkiwqIESg%2Bk8NfuEFVT9yqyfP29GkslKGgwdLeZVBHShXnmTT9at9ZJaWFD%2FM0QbccpvhVUNwuaTKl2VKf0UWRdZWebwf9mzXSiOAcbldNvs&X-Amz-Signature=9f9f3c7893c9eefadfd1dadb534238798cc3d0e715d5f4f34cd734bd1ce0619f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HAPM24I%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIArxfIZ9Vbjv3IG2%2FjkaAEncQlZ%2FPs9j7Mx6dLl%2BnaesAiEAmwZJBMKHxKsrKE8zn6RFfSOsI4f%2FzqTYjcaWpnpH38Eq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIG25sri6umEk41yfCrcAxsgR%2BOxrLSIZIYqUrJjjvpkHS2k3yMQrqP3zan%2BUkNVs1sxx23hTxDIn4vKyR0sUYaVI7S5VhjlfmahuXNx%2FP5dKLaRTpy%2Fylh5dL0kxv6XyjpFz5jcQFEYFagY%2BBOYXFLcNiDPySztBYrE7snpVcIrsEGh1SY1zzX67%2FdqvHj%2F%2BTbMS8TuNUDsMsZoPdBWkXp%2BuQV%2BlAFKck2D55bTtqIcUCNdJ6wXSE5yeORh7rXDf6UQE6DrHaCy7ecgVsIiDvWgYkarBQ32T3pgK%2BOoObJ5uTSBBwnEl6BiPCHPIrj74y%2F9rEO0SaF2lacOLW%2BM3fa26G1Mx9Dh6rDuAVcz9c2u9P5rzFqbTb6d9mT8GEq0O1R4KoOvh127OEh13KQWJrEta%2FaGOq0ARypYEO7DsPwg3FTTFv%2BCk3l%2Ft80dGFoh6gKeZS4A6VGi0%2FDmIbk1tkdkH9Uj3w0CcLJ%2F358wHphCu1p%2B86XssQyaj4WSMD16IfqEfNZfg6JG96AEK11orWixg3PBPq01F7M24Nv328vrpBWkUagUHoHMzjvFCh0o4UAMyMn4c5FnFFgOaNnhNMqBHRTeIKX4v1nHd095Ts7QBDJYsN%2BrtAtO6D8%2B%2FOpFpU8IybF6lrU9Iez0MNvjlswGOqUBwEmuBeTAFxBalL%2FUItX%2F%2BCwzfy7pywgnaROTt%2Bta7HTpxFgok4WSnplPhqmxv1YitFoOqUKa6jzyXLfbx2Bl4RTJe7iAYaESHIzdgfpThwQ9oHEKXHnDbKMXFDHTV9U0zljy1mltjObW9iTFL9dbLAu2c5rMoRZDSoiPRTXMwxfLHqDnyAdH8q0HVWJ7dO%2FFhgPZQ3wDnL2UXI0Vmqgkwo39w55W&X-Amz-Signature=5d1c7be90ff2982b5397d678daf05fd4fda66830151b0530337f5a992ac46952&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HAPM24I%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIArxfIZ9Vbjv3IG2%2FjkaAEncQlZ%2FPs9j7Mx6dLl%2BnaesAiEAmwZJBMKHxKsrKE8zn6RFfSOsI4f%2FzqTYjcaWpnpH38Eq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIG25sri6umEk41yfCrcAxsgR%2BOxrLSIZIYqUrJjjvpkHS2k3yMQrqP3zan%2BUkNVs1sxx23hTxDIn4vKyR0sUYaVI7S5VhjlfmahuXNx%2FP5dKLaRTpy%2Fylh5dL0kxv6XyjpFz5jcQFEYFagY%2BBOYXFLcNiDPySztBYrE7snpVcIrsEGh1SY1zzX67%2FdqvHj%2F%2BTbMS8TuNUDsMsZoPdBWkXp%2BuQV%2BlAFKck2D55bTtqIcUCNdJ6wXSE5yeORh7rXDf6UQE6DrHaCy7ecgVsIiDvWgYkarBQ32T3pgK%2BOoObJ5uTSBBwnEl6BiPCHPIrj74y%2F9rEO0SaF2lacOLW%2BM3fa26G1Mx9Dh6rDuAVcz9c2u9P5rzFqbTb6d9mT8GEq0O1R4KoOvh127OEh13KQWJrEta%2FaGOq0ARypYEO7DsPwg3FTTFv%2BCk3l%2Ft80dGFoh6gKeZS4A6VGi0%2FDmIbk1tkdkH9Uj3w0CcLJ%2F358wHphCu1p%2B86XssQyaj4WSMD16IfqEfNZfg6JG96AEK11orWixg3PBPq01F7M24Nv328vrpBWkUagUHoHMzjvFCh0o4UAMyMn4c5FnFFgOaNnhNMqBHRTeIKX4v1nHd095Ts7QBDJYsN%2BrtAtO6D8%2B%2FOpFpU8IybF6lrU9Iez0MNvjlswGOqUBwEmuBeTAFxBalL%2FUItX%2F%2BCwzfy7pywgnaROTt%2Bta7HTpxFgok4WSnplPhqmxv1YitFoOqUKa6jzyXLfbx2Bl4RTJe7iAYaESHIzdgfpThwQ9oHEKXHnDbKMXFDHTV9U0zljy1mltjObW9iTFL9dbLAu2c5rMoRZDSoiPRTXMwxfLHqDnyAdH8q0HVWJ7dO%2FFhgPZQ3wDnL2UXI0Vmqgkwo39w55W&X-Amz-Signature=8cc2d1e6be59fbe652474fa3714b4e3dd24b6484ad80007e0f2a0230c452b2de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJLJL46K%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIGPijvejWSUPVjmxFh2OjJSHbmUCYtEfKg7NKNpz4VBfAiAAwa7WaLztHxqfAxW47sv2fircQ4w4mXY8%2B4Jlr%2F%2Bbxyr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIM6jU0wH7MukzvnWrXKtwDlE%2FZ8agDehswwpR7y92ezodbAzNX5mP1EwCPhYgBWNDbpprE70LKO7yYjGJ2EIhiY3rQVmleZSbXEDNZGujAN6MSv5w5fvCu3j5EGO4jvenWtihO01pxuBnVZYjAl9FpRRk0vnXBz5lq%2F9HmSCiHwzEoIXWQZa3X5h7d0GTe81MM2NP3HcPRvO8DaHX0tIBVyxLCSb5fT4nDm4qd9AQxvMD8sNSnhq6tmzyjBiBjBoIpXVWnlmaax8o%2FHvul0%2BZHNB3dLQkDKz1lj2DrnlcLAv4hEYSi0UGutw0I2fECdyX8Y1g9OeoROGMWRN%2FGyC7bMYRphXFe9aDYBF8oU3d6fl98s0ogj262xyQOIQmC23fMwif%2FJfKHNr0Hozn3y0aEX7%2BoJPCGee%2FhnI8ZBZey0j%2BmaSyALMLyiBp23gmcWMu0ar92xmN3E9YPtIn5ikaDymAkippoMJMrAZ1PjH4eSEdToxZntfIOhhqgz069x8m91YV%2BR4J67T35iX7uPFxTgHxMveBS03wPsunH2jtytoPhN1sbAkp%2BTjyqXXchfYG5ZElPAClJ3lv9Sl6%2FworykIZaD6EY%2BFQ69lf%2Fa33WzE7H3fVWA7LvRRnn33y755xOptMSjonIvjIp%2BWUwv%2BSWzAY6pgG90LHLhmxSJvdRlx82RBs%2FsVjwC0%2BrWAPPaO2Ex1Vt66%2F%2FAYGoZB1ZILqt94PRB3IHhVvWknP%2FhVZwB5HbSJlUpqrbpSOE12%2FBiX2CditcVcYK95DLPjtdfst%2FCnFpj7HUqKr1CNDVJ3rw8hP6XwMxFfY8D37pNcRhvPQ0jhxD%2B4hNChOdN88DwAQpY2RDv9stsCkw2W6jajOuEmqFKCcXdpV0x7CN&X-Amz-Signature=8a4347f149e87093e336c2eee237911cb48b803520b49161710e47036482856c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJUB4AKA%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCqtCUrSg2ERPlWJrPPQ2lCD9EVwzX7mYHpAN9zkiB93wIgFM0A%2F3F7Io7z2rwyuOhp6H5yQa9H8cWvoagCFm6kJbAq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDDsiauz0oqSuZyWK2SrcA10vpSEPImipejFK8znQo4w25Tpiqf6DVTy7w96%2BLnoPKB1xpZB50BhV4LI%2F2LAw7wJs5Dd4FPTQv9jSf4%2FBHdDhl20c7ZcEUvzsJoNGVrp%2F6AgH0n2BLJXVJvjwqojf0B7%2BpOWBHFX9K%2BOvHvsUKvIrm27G2ezm31TKvRoU1sWtbxAOZ9D7HJHB3wytWExUpv2EpQDTAvaMd1oyzKzsq2tHe53aJTzFZSJOlqS35NfU944Jg6gb8gbeej0MmpWth2PjIhublp%2FqNXjPRXTPUKaJaKVWJ1r8EWZmGfiNX7%2FV%2BzZr4RdwwSf1zhy545T%2BTCWndSD6qXtdQrPWtsTPXSmywQccEMDHwSk96B56gJPOP3iUp3VCuj1x5qR2MeNZwVXafGUS1YONJDpuPum6DkboqQ4Yd%2F3S8ClhoCjFHE4ng%2BSXSD60M4UJZrJTIIsrHc5LH4cRjJTvmVenPqQ89bIPSyNxdSC79Q0O%2FIaOjaiGijPuURSYEl5t9WOrjb6ppBqUXu7auPQ5vkvAVXpR7fHv4375kXwlqzOb403J6knOvuJozgGC2G%2BKXr4ErjBgTtsmK9kItWkCrxgqgeJNeSsUTtojl5AbgDJhv4qoIJ0E3l%2BBmic%2FMFv3sqggMPDjlswGOqUBGkp73c8sNYQ7TOlui5py2m12yfieB4lsu0vlyn0DwceC2DBytwS9ZB9admN34PtQNdpxNNfklEsC97wl%2FMGVqQr346dLe5fVXP7FpXPiejQwGjmLQhDnigcuRLutETT1eP0qz183FA8grXKq6GbPoNoi0tYwrCuouMcIi935FTq%2BfbNiorAsN9X3zeF%2FpBNQbqwpjH552q%2FOFk4idtsbyY3G152E&X-Amz-Signature=0d6f5203774d3b4b58a1d1caca85ea935d3249262129e18330fa071ae03f568f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZBE5OFL%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIHVykZj85608ljyiXFZIQ9LSF7xeborbNuBHrdKWjiKmAiEAggBuWGFNdALyjwH0AZiMrUbBFg2%2BtTT5L4MFzM7Ofk4q%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDCicQomJkwSwYRLQOCrcA8LA4EEueB3vJLXXesPYSUZz0VKNpUlFgdatBDNa%2F7d3FQehaiM%2FwrqpGvf4uxEMxwyNVM9VZc4Mm9uOPBPLqjikmFhs8y%2BpnSzpWIamrZL2M7X5V81SfeSYgafzvmE8NHcJpcha3b9bablhcwNHM7NYjooyTgYuBVlAQXpbhc5D3NTpvdRQUllyzUHjbl7DCwHFQbaQCbKfoT9%2Bv8N2y52ymaWSCfPT8MJhYzHXHG8UkL4aGiKrtP83Qp%2Bm5JHTF4L1iRBTiBLIV1mU70P1FqeM%2FjXnk6%2B54%2FcaLsGuXdD4U9M5Nlx2mZ7a8jK1wTpBE9xvYiuz4Bzcy68g5TEgJPlbPD9o1aRWmDbA4%2Fm2piNdHmYVq%2F23Y0UXGlOljW25UBKt9yWcdRKTE9O6lvIbG259K%2FRQD%2BsmlrwMneCRvdRH0CZnvlqbUXSyY90v2wtrpV0Z%2FeDu6DCATtaapMBUKtQtIwsopn0MTT%2BGl6FwhUukgSQ4eX2%2BOZlM%2BRPeS8RC9GF8mCC3%2B73vffpv%2FzA6at%2BFrIn29JYIOxJcj0XcwpLB8vAVrs6xxybtFeiK7RqUBMuRLr06i%2BhlhgJrHt3bys41nbglnuU%2F%2BQFbYrqLX99lqZ22aczrBeK0Q8%2FMMLTjlswGOqUB14W8ccXerpIrfzEnzfpn%2FNBa8dEV1vlSXfOHHT2f6MF9O7RL%2FWr8FpmoWi%2FaL2QlD8d9K38%2FOX4rkntGHfSxNVGd84kIos%2BDuf28KXygGN5bu4RGBuH4GtYHOJT279apru2Djyt7VElQl7XJ2cRkbiHrhjX1jDSj22r0wBgzdJp9axaRzHGxGAfDqS7x0y%2FBOhcqhunt7ymbkyZoNz1exD3tAy4R&X-Amz-Signature=465dd0c4c99326229179f949aafa6c35e850f62fe0518a3b49e0e2a11cdf8424&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5LCBYJS%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIFNf%2FqcNWjbFtWj1bRWQrVKkO5Y0xK6VIZlcq0coocgZAiEAuzFFMXAnFAG%2F38YFqTJH0KMwUi9%2F4fcAvIgyMJkDCsoq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDBxlXBmhS3X%2BUfGRPCrcA6x2%2FiQlh%2FoKaPgf0sSv9K5kkh0gIk%2Bjd2WLiXludotTxVUUC49KxZBEkB9hfTEmiRY3c%2Fp2ZcNoJ1GL3iSKT6RIkScresFyZfX8F0HWtFT9jmuKYDlEvOuMULjI9eV3iezOF2FWDZGZC2pNMVPz7ykNdlyHQilELasaqfr9CHLMVIzU2Hw35jEWLCXOYMw8BqqQWBCXeHQih58G5YVWu6Fa8UW1cAPC9l7DH%2Bov3Y2AQYpca3aZYEdSk4bFq4OC%2FLpbO%2FodpjuIy3W6UNVuvNPrGSws5ljOiDzA7Njcuy5oFe1NKrHqOmGfT%2FJqcRVWN%2F%2F3GhtrwxW6XZ0xSKgB6anJ%2Ftzv41qMr%2BlMLPC1%2B4kRnDOrj9r7Luh2ic4P1RaUmQo725%2BF7Y3yNslCbAfkpUm3b%2FgZULnbbHOi7wN77LCN6xHPsz2BKNwcOiiosZt6lz%2B2FGzjDdfm9Z%2BSbaOhymhIQInPAyIcvdxh53B%2BRDEO%2BQQ5FyWsrT28JKWRAcY%2FoKy7rHg061eOVZrE1HNQACzNYK9QaqI4N8eLQ1zYOd%2BIOvVxDhC%2F8zmI%2FDZkJxOpstkvhKHMxjbp7RwJTDMwfCSHwtc935JuiSnROy%2BvwzWk8KtFfbaO%2FR68wQ2QMLLjlswGOqUBINOoDLKhXMDFI56%2FMl8TdMvuFti0IPKod9W%2B0%2BagmIfmKTN68iYJA9DwP9bVbQeN%2F4DVv2NHqDM5COW%2FgZtwKiR9abjAfgtg38ogsboJIG7oQSz4JjK52wF9Y1dexA83VQFuoiiqD33w%2FQb1jOweLEa1CE%2FSVpEnQoyaQ7VsH14w0ewRXFC7XKTl7tiTBWeXE9%2FI%2FN1UTxYlxlqrLFu1hEVVdCU2&X-Amz-Signature=df9ad0aa4c963da3177f4946c45f9934080cf6af700c0a31623c935c0415fe5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5LCBYJS%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIFNf%2FqcNWjbFtWj1bRWQrVKkO5Y0xK6VIZlcq0coocgZAiEAuzFFMXAnFAG%2F38YFqTJH0KMwUi9%2F4fcAvIgyMJkDCsoq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDBxlXBmhS3X%2BUfGRPCrcA6x2%2FiQlh%2FoKaPgf0sSv9K5kkh0gIk%2Bjd2WLiXludotTxVUUC49KxZBEkB9hfTEmiRY3c%2Fp2ZcNoJ1GL3iSKT6RIkScresFyZfX8F0HWtFT9jmuKYDlEvOuMULjI9eV3iezOF2FWDZGZC2pNMVPz7ykNdlyHQilELasaqfr9CHLMVIzU2Hw35jEWLCXOYMw8BqqQWBCXeHQih58G5YVWu6Fa8UW1cAPC9l7DH%2Bov3Y2AQYpca3aZYEdSk4bFq4OC%2FLpbO%2FodpjuIy3W6UNVuvNPrGSws5ljOiDzA7Njcuy5oFe1NKrHqOmGfT%2FJqcRVWN%2F%2F3GhtrwxW6XZ0xSKgB6anJ%2Ftzv41qMr%2BlMLPC1%2B4kRnDOrj9r7Luh2ic4P1RaUmQo725%2BF7Y3yNslCbAfkpUm3b%2FgZULnbbHOi7wN77LCN6xHPsz2BKNwcOiiosZt6lz%2B2FGzjDdfm9Z%2BSbaOhymhIQInPAyIcvdxh53B%2BRDEO%2BQQ5FyWsrT28JKWRAcY%2FoKy7rHg061eOVZrE1HNQACzNYK9QaqI4N8eLQ1zYOd%2BIOvVxDhC%2F8zmI%2FDZkJxOpstkvhKHMxjbp7RwJTDMwfCSHwtc935JuiSnROy%2BvwzWk8KtFfbaO%2FR68wQ2QMLLjlswGOqUBINOoDLKhXMDFI56%2FMl8TdMvuFti0IPKod9W%2B0%2BagmIfmKTN68iYJA9DwP9bVbQeN%2F4DVv2NHqDM5COW%2FgZtwKiR9abjAfgtg38ogsboJIG7oQSz4JjK52wF9Y1dexA83VQFuoiiqD33w%2FQb1jOweLEa1CE%2FSVpEnQoyaQ7VsH14w0ewRXFC7XKTl7tiTBWeXE9%2FI%2FN1UTxYlxlqrLFu1hEVVdCU2&X-Amz-Signature=3db692021f2c3b8af76897179e9d557b3b3f31116bd9b6dcfb199acd09d19969&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWZ6VKWR%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQD6cWvgGZTZFEVMZbvgA6F%2BtuTZZfLNQtIvLyJr%2Bwi%2FbgIgZTff%2F6m9F8CBhz252rWuk%2FsCzIHTTWwlYNuWK9%2BE6Msq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDH4Wz6x7XpnkJ%2B72wSrcAyYLh84vY6Q0KIzN5F5LQRXkMuQd%2FLYGo7FIRC9a%2BWdwkXOa7na8R3%2FmHjDuldxnxZx2DYxecz3HI46ljisQ9Oli%2BATDZANiYYGsdheu8gAmXFyDSQgU7raq7qbGxJoDg24j0rjREoN0OKC%2B6SW1hjPMubrJxHSjkyilRv0H2B1Vahb6%2FnwI2UpNFmiGwVn%2B7AuxQnFzzyRhhGxp%2FZaIyV70g39LZzkA%2Bj6SEbsXZYOjvVror%2FhAhS8c9NjgIa4Myd3RHChfwiC%2Fc8Mk%2B1vRND9gecCkynE%2BoPl%2FDxmGOdF70907906CRzTl5ktCfaK48nrABU%2B6nY8vsPj3TppBZEhca7Ax42MHdA5BXtjCE6g9%2BqKN2s6s9dhVeBIqwHIX62pr%2FyVipVkmzaRevU2cfe%2FrqSQvosY%2BPek2xyR7n34J1YNT0NGzz0ohR0scTE7ajVKCYAePbQ7WfLQcmxd5mYwQpWOz6herBw83PpN2oTUtZd1yDWbia44zFqU%2B0ebU5QQKgf%2BdKeUMgbNr%2BylXRqWTywS5IGNLo5b2U3ZNOXG7PFR6S%2BgPGRcQHyPCeqBTWjvfONTO%2FcVNt6NC6ZJUpatfB7%2Fc4BOj4KpqTuAmhGPicY3pjnpbJZb25jLhMITllswGOqUBIQzxrMcGzkDlenUAUL3UprnUC7yAD9pRaDVHoNoepKJWfx6NB%2BJ1k6E6xqpso1GzZbwWUiutVcO8FXG0sVZVEV5aDJgNWBmCuKvLt1JPjg2rKJy00QAYqiTj56kY0dQTMRILQp92cvx34VQcWJlp1Cqm%2BRyu5vAtM41pg1%2B4rfP%2FNt5rtsCi2oYxkjNPS0n%2BU61tn8mUvbYIkIMnMIPNXk0QBLn5&X-Amz-Signature=75635497a4fd01d497684f0b82e481e6beaa41c977a95aa5dbc7a70376d856c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCFM74J5%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIDE94a%2B3cENrTgJEv0L6%2BnNmFNl3gs6agYe8yb%2FiQ3XOAiBz7XLfGadoZImQsqdItIURYb1a%2B3rmm0SujCGwVGiYACr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMJ4vlLYYyfTj%2BwZ%2F%2FKtwDIj5VcP%2BBhFmnVfIW1QvxQMiZ4z90CZwec3rZu7Gef6DqrlGIDoW2AZtQL7ZqAgXS78JL5xOt085fbdVIq72wKElYOOGRtNOmaDxVMce7Y52L%2Fz3PRuGocm7Sp10Lu5Hd8G7theo0N8stYM%2BufqGyzBdCuY2e8cPmga1I5gF8OLJKc71rmFDg3Bqsyz8rX7QE%2F6MUbG70AsobvWI0obpNDyowgTSg%2BnvmJy3BIF3eRw0is%2FhfXOh3cuvyYm8BC7x8U3PUrJD15PtX87JMmwclChe7CGnGCXfMb1uvrFVyjCg3Aukhl28eqDkBhHYt0HHVLLtLUU08EzRSwtrZY1YQmnN5Zafk8uahDpTLBggwiAuroSe2obNgg10icIZTY1ewiVpFTVCJs1Gi8yXDqCacN6fBIeeX2kgYTIgrxiduKdAMV8qDGi9cxJAAtSr6nJyrUk412r02N4mVEyu4EHjrNIChKZaTwe9tA3m7exFoDQaokP8qH2bbt8iBdn2k4sLle8cusmYNJRJkQ37cHncx5KxchE07cEwDdkVsMQ%2Bg6tP%2FZ8eLEX0Td%2FqiIL0Zopbvle8ac%2FVamsAv6HG61zE5go9fPmMu%2F791ZjmH7KrdAMnY%2FE9W%2BzBHunCOjVYw6OOWzAY6pgFKUMMQcUEWvzgxRKtE%2Fbn%2BQ892fw2Jkv9mFlRe1uAF%2Fdmr9F7LfydJUU4liTpRm4eQJt86zdF%2BJP6tFrjoCaawfAglFgIkTi1%2FTOxp69%2FNWBdIKK3mO1Uo6wQzA0B1eUl9kNJGJfn2VjisfX2IZdofdPEVtBk%2F6QrgXYZQt%2FMA8u0y93yvaGADJ2XlUXoiAGv8%2FkjeIMy6eylCnjjUMobJduh5bJOC&X-Amz-Signature=dd3225e8de08f97a6e4fa8bbee6533dc734924512002faaaa7ffb436a492bbf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCFM74J5%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIDE94a%2B3cENrTgJEv0L6%2BnNmFNl3gs6agYe8yb%2FiQ3XOAiBz7XLfGadoZImQsqdItIURYb1a%2B3rmm0SujCGwVGiYACr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMJ4vlLYYyfTj%2BwZ%2F%2FKtwDIj5VcP%2BBhFmnVfIW1QvxQMiZ4z90CZwec3rZu7Gef6DqrlGIDoW2AZtQL7ZqAgXS78JL5xOt085fbdVIq72wKElYOOGRtNOmaDxVMce7Y52L%2Fz3PRuGocm7Sp10Lu5Hd8G7theo0N8stYM%2BufqGyzBdCuY2e8cPmga1I5gF8OLJKc71rmFDg3Bqsyz8rX7QE%2F6MUbG70AsobvWI0obpNDyowgTSg%2BnvmJy3BIF3eRw0is%2FhfXOh3cuvyYm8BC7x8U3PUrJD15PtX87JMmwclChe7CGnGCXfMb1uvrFVyjCg3Aukhl28eqDkBhHYt0HHVLLtLUU08EzRSwtrZY1YQmnN5Zafk8uahDpTLBggwiAuroSe2obNgg10icIZTY1ewiVpFTVCJs1Gi8yXDqCacN6fBIeeX2kgYTIgrxiduKdAMV8qDGi9cxJAAtSr6nJyrUk412r02N4mVEyu4EHjrNIChKZaTwe9tA3m7exFoDQaokP8qH2bbt8iBdn2k4sLle8cusmYNJRJkQ37cHncx5KxchE07cEwDdkVsMQ%2Bg6tP%2FZ8eLEX0Td%2FqiIL0Zopbvle8ac%2FVamsAv6HG61zE5go9fPmMu%2F791ZjmH7KrdAMnY%2FE9W%2BzBHunCOjVYw6OOWzAY6pgFKUMMQcUEWvzgxRKtE%2Fbn%2BQ892fw2Jkv9mFlRe1uAF%2Fdmr9F7LfydJUU4liTpRm4eQJt86zdF%2BJP6tFrjoCaawfAglFgIkTi1%2FTOxp69%2FNWBdIKK3mO1Uo6wQzA0B1eUl9kNJGJfn2VjisfX2IZdofdPEVtBk%2F6QrgXYZQt%2FMA8u0y93yvaGADJ2XlUXoiAGv8%2FkjeIMy6eylCnjjUMobJduh5bJOC&X-Amz-Signature=dd3225e8de08f97a6e4fa8bbee6533dc734924512002faaaa7ffb436a492bbf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5XKPY32%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T102626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDYRGaEay4DNyfJ9dN3GsVD5aI1qxgiqaAnu8bTDEmN8QIgGt7M2376MmS%2FGOt0aBzPUKo6t2rnP8Ics7fwzJ0f%2FC8q%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDM254zQe4tr7QNiHJyrcA%2By06rgx5HEHqaDjkvA1EJVQ2L1YikuUrObAtQk5n002h4D0clqJgVSRmDk86GaZy89xqlsMj%2F4HMRHFimCkCYbclZxBmPWhAwo9TxWxlobIWSbfCLIT0oR6smZgl6H%2BTrJWWUb7oH30FyQFjjDh97xFb5xQflPG8fFObeXbr%2BobwqAie%2BSln6P%2BouqqoPX5NN6rwIz79oNip6SiXAEQ5JYO3ED7I9FD2IrydG0PztPN7SjJZ93drWMKj22SmMY9T%2BP69qNe59UsrHSKGWnwh5J4jSq%2B19pmJuBj%2BQ7ojCc0Jplle%2Fhfu9N1NO9dDW%2Fzomtvmp0zr9FwzY%2BltHJk7PPTSjlsnUbBK6EKU1fz4ce3yXdL0%2Fpp17lZEzLLHmSFTAiyuNXRomPxSmoJvnDKjEfjdfNb02%2FZNG%2FEVkwUz%2Bvf6kPDAMyaO0hmvWIHuNDcA9a10kxaBf4HT%2BpOgKKms%2F9UD4oN5GjFsLR%2FXad9mP6qsj5SALR8I6axRr82ijPq6hKtcqY%2BECVzz9ZguMpZXTHCH2nkI7KcHqYMaFagLZu%2BiSD3%2BQYTMPn1WIvR4eqrxwhFg4Hpw0%2BKJeDSqon6xLvEq88vW9rdcUAl3R2zlXMpHikemif2Uv0U2OWMMObklswGOqUBcOS3RDY9ONsxWrlvjpC8%2BPzBnfY9Wlq7eTyE1e5g0olj4%2B3bSj9x8zmF4LrN%2B0m%2FYWZyE%2FX%2Fu9%2BgXtf%2FggrdaV9ANMjoDNoc1njOdQGyENaI0PbF%2BBo2RGlr6K6gdP7TTLuW%2Bc761ePGuk1UPXl9ZGPlx5dO9krOIj3ImbO76Q8eblNzqSCuvzsCbALj7ab3hMQ61VXOQJKlDu8%2F22Hl%2Fa4IJ4wk&X-Amz-Signature=864c988824e7dd902bf29ba03ca16513d46141e5ab6f45aadb0ffbab4813afda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

