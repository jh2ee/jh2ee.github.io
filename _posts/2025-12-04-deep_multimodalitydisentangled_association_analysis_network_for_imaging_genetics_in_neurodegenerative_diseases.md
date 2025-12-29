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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KE4HP6P%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCILPtbiBJ1Jc9FWi9zje3Mq9ohVROmLk7WYxSZgBrtFAIhALclYZ7fvwoMAvkROYRS6vobqzorzPq2D8eU0UCBEjqaKogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxaR1qpL%2FFQw%2F0mcQIq3AOq3XYsD97eNPq41cFD1bhzmtQD0FAvw9dEIgH6wQrTC%2BvqiOPIdMhdIDkdysTDv4uFDDVm8XzJxs7kfR4%2BLcMKmaeJDX0CYxYX%2BlE1eSE4zKkJhzmgPy6gGL7DuB%2B4mc13MxIM1uz49onTHwkhpHtKGnfzIKO6I1eo7DG8ldMHw1Z7z5wmst7UxWlpQoDXa6GngKL1IbIFW1lnAVyhDLIECR%2FoDN8Q6V36HbCO9l%2BAqp1N5bLF4rHAMvBzutQQyv6YapXV8ZX1UJcc5CyBaXfj5gNEI5Zy01RBFHyMO9SJiL3bvpZG4cQlnkI6gVq%2FnP%2FVetS340WpUdcWQ6h4RB9Y%2BIJczfoXAJJi14wlYhM1vYZsq62CA6q%2FIzSe2U1uv68NNFjlnHf8ZmrAMpViUSlpoAneeNGKnrSG%2F5NRCYIpSxIasaDXJ06YNciB%2BsVTbLpAhxz7qWOJwn9%2BTdvgwFA0BylUZyFMTVllOL9DZdYtx%2BTeH%2FxpN4zqhXhJmglnosqNFY%2FUXKJgqOrtC7MP1qpmIGj37qmeGzM2xSit%2BnFPeCKag%2BltJKEtjXeY8fQpNMddyaFqby06eys%2FKUlKb10nbPRzzS1%2FyXRPeuLDS5IeeJlT19MBCdHHYLrS6DCvqcvKBjqkAQXTAqXCZKJnXc9U8o4sxN4T3zPz5kgBcV1Lr6IGj5VBY0Yt%2B0TvSaZk0m3XsQTu7sT0h843tlNeNQxvrfoDXf%2BZgyTzgBDeAA%2BaPAzHx7Ai9rYhO7W9ArWFwtGL09A4QkKVGqhvg0eapbn9KSAuBth%2FT948%2FuoJEbAgYAi66HozxMY62U6k%2BZ3fVFnPvyHznUow3oBk%2F8j7F%2BhRPbV4zk8gtCJg&X-Amz-Signature=e040fe515728826a5918d9edd3173ea705f32d917b4cdbd4e507ba02ed4c87da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KE4HP6P%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCILPtbiBJ1Jc9FWi9zje3Mq9ohVROmLk7WYxSZgBrtFAIhALclYZ7fvwoMAvkROYRS6vobqzorzPq2D8eU0UCBEjqaKogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxaR1qpL%2FFQw%2F0mcQIq3AOq3XYsD97eNPq41cFD1bhzmtQD0FAvw9dEIgH6wQrTC%2BvqiOPIdMhdIDkdysTDv4uFDDVm8XzJxs7kfR4%2BLcMKmaeJDX0CYxYX%2BlE1eSE4zKkJhzmgPy6gGL7DuB%2B4mc13MxIM1uz49onTHwkhpHtKGnfzIKO6I1eo7DG8ldMHw1Z7z5wmst7UxWlpQoDXa6GngKL1IbIFW1lnAVyhDLIECR%2FoDN8Q6V36HbCO9l%2BAqp1N5bLF4rHAMvBzutQQyv6YapXV8ZX1UJcc5CyBaXfj5gNEI5Zy01RBFHyMO9SJiL3bvpZG4cQlnkI6gVq%2FnP%2FVetS340WpUdcWQ6h4RB9Y%2BIJczfoXAJJi14wlYhM1vYZsq62CA6q%2FIzSe2U1uv68NNFjlnHf8ZmrAMpViUSlpoAneeNGKnrSG%2F5NRCYIpSxIasaDXJ06YNciB%2BsVTbLpAhxz7qWOJwn9%2BTdvgwFA0BylUZyFMTVllOL9DZdYtx%2BTeH%2FxpN4zqhXhJmglnosqNFY%2FUXKJgqOrtC7MP1qpmIGj37qmeGzM2xSit%2BnFPeCKag%2BltJKEtjXeY8fQpNMddyaFqby06eys%2FKUlKb10nbPRzzS1%2FyXRPeuLDS5IeeJlT19MBCdHHYLrS6DCvqcvKBjqkAQXTAqXCZKJnXc9U8o4sxN4T3zPz5kgBcV1Lr6IGj5VBY0Yt%2B0TvSaZk0m3XsQTu7sT0h843tlNeNQxvrfoDXf%2BZgyTzgBDeAA%2BaPAzHx7Ai9rYhO7W9ArWFwtGL09A4QkKVGqhvg0eapbn9KSAuBth%2FT948%2FuoJEbAgYAi66HozxMY62U6k%2BZ3fVFnPvyHznUow3oBk%2F8j7F%2BhRPbV4zk8gtCJg&X-Amz-Signature=e040fe515728826a5918d9edd3173ea705f32d917b4cdbd4e507ba02ed4c87da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXA2KORK%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCL8W1SMtqKxjK4AdDhecHQmYWj3dBuzaHGFAP5aeI4uAIgSZcaerovus6GMiWPUcMIppG9okoF8T4AoLq2gV7OWNsqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIZ0YdZLdAjNjoN%2BbircA3lZ0d8HEFFsrB0Bt86W%2FGj17IXy%2FvnLE%2BgMQ50CTsOgxjM%2F6ZHQ3CoP2YelC9Ne5e2pGRGBSuUGeY42llv%2FAaF%2B%2FTNexPk6T5QSXPwCqhP6NyUH2F0C7TgmQPYVnKD%2BkYZj7%2BYAf6VK4e1Krk%2BXQTqk1fgX7OP3FVVSzKWvuykRD7y77ZQXY0jVP825cv8ad5WNhxuOQkFIq7%2BE5Hrdga7ydWKCRFzcSLCJWH0%2FnV6dk9gEwcz6xLBpwL8R7R5R95i9VJvg6G%2BZ%2BSi8hXhGXL3JXNhPYqIAd4E6QTq6LFfZSnzUBPoTqP3J3NegySiIxWu1YM0hxOb8jp3vmcgeXetL5PwzM3UOMCV%2Fe1%2Bb5ifebSmCF5BgBOEcwK3vi7%2FYgqLDZK1KnuyRGU81Yrf6Wkb0TiE3JuLEkMMoOg%2FrAxqBqFpmYKfDrYtXoSIJRrl%2BVncWuOdHJe99qKmVCl2ES%2FVfUX6VWXghPDaJBKOOwv3yt0NOFvG8Z7aZFfwTE0WHRbII%2BFG4UN5C7LB7CIYdvflieVqNVepk0b1ibhtNusrF1t1VjZbnzrZTGOr29xJik8TbJoUDC8wRWDaAL5QxusQ63mV20Kt%2B1qhKLpmT4YzLRw2XT3c4JKvao9GXMIOoy8oGOqUBb5V%2FZyEYicNhJoKR%2FLce2D80z%2BE7kjfYgUaPIwJwwr3xOm3K2YJbKP1gyedFwOpsB%2FVtU7ALnDwOd6igPy9h8I943AlYEmUyArwHd7ZIe1NVkFR9k9dTjKRbFKxDnSz52vOoq1TIB1xDZss4zHpLf2j12%2BylfaViHpO9LaWaMRw30k1AvY4IhjXUOLDF%2FDGjHPxdWKU%2BV5%2FXFfXwcT0c3DdbK8fC&X-Amz-Signature=da1491e106c09dc61b75c11d62b90176fdcec90bc8770f658a6f64c292540e03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RVDAOSN%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5rzF5HI2QeW9kwPXl3nVkop4RBk4ZC4NfBbdO1vmE%2FwIgbdwUTH5cgsROw0mAmZzUejovLeLSkbCQtv7Ud40egX0qiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEZcaEWFkxOjKyPoFyrcA8UO7QEtwnXhhfClfXohQzd%2BdqplzYw7z60GMrY%2F%2BAo82JPY6z%2BzrItUfesZgxM6Se0zQbM%2Bv4abBtzajNC9aeGLtB5mq7uUP70bwsK%2FKdV7jqnp0zJhSvxSVRDlW%2Fw8dvvhGSa0tD8h2oq%2B2Jbh0bGrTtZhGEqNM%2B9yzKmEM5O%2F6LlnJQi9UA5xYMD3HRiNdICxehfIXO7g%2FcyXFNfNqSgPSIqnDa1UjypIP6Lk63NflL5hZWd1e1I14I%2FegDOvjbWuR1vowTUoVF7ySuJ2nekiky9La435AFOYFM2KRwZPAhUPTlGv%2BfLfw0m1OEdMCFTBqG4SBH31Vsglb2YwR14Ah4N%2BYaA7LK6%2B6FptGGcfYVf%2BOTT8AKlZ8Z3mm%2Ben%2FAnjFGKLiASj6HTWgEXHzpnCr5UkLNG2yRVpmPQUKRX0PRDeIVMP418FHlt1iQdXPSys2jHvgD%2Fx81j%2FLoyUmTirjdbwY6N747O8DlPa9kX%2F1mN3bzVKStYqXzPGlxxHu8TrZuDQQ8aJ%2FfruAQTqtS0XSwInOXj%2FtixRk4IosijsYO%2BX2gu7BjBrYyUhJ98NqEB%2Ft9oc8yH%2FnUeF7HXTgGjHNr1Uh9GbxNqZ5qSVHKpEefzKUjQTpfLilQipMKyfy8oGOqUBi5S%2FBu%2B1tu0KTEsg8u4uvfLHzxykhoQfS7TR2TptZdefcwYFcSG1lq3iSuI9e1CUFUCkIe3ZCum3gO7I2SSN4vMetqNOvtdHRdQqVFlxDVHEPNxwEEy8HUqcS%2BYRsW%2BZIky0kJFmKcW9xNOESzLMMHH4H8tLECR2JwVuBPu2WvcLu1kVzsnbFmO1lD5uV2kkCTROBQntqNYKtrcHk%2BUAm3N6UO5u&X-Amz-Signature=6ad649f2d357b8ba2b6d95c143436ee63bb212b525be61d767e83940ee2c1284&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RVDAOSN%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5rzF5HI2QeW9kwPXl3nVkop4RBk4ZC4NfBbdO1vmE%2FwIgbdwUTH5cgsROw0mAmZzUejovLeLSkbCQtv7Ud40egX0qiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEZcaEWFkxOjKyPoFyrcA8UO7QEtwnXhhfClfXohQzd%2BdqplzYw7z60GMrY%2F%2BAo82JPY6z%2BzrItUfesZgxM6Se0zQbM%2Bv4abBtzajNC9aeGLtB5mq7uUP70bwsK%2FKdV7jqnp0zJhSvxSVRDlW%2Fw8dvvhGSa0tD8h2oq%2B2Jbh0bGrTtZhGEqNM%2B9yzKmEM5O%2F6LlnJQi9UA5xYMD3HRiNdICxehfIXO7g%2FcyXFNfNqSgPSIqnDa1UjypIP6Lk63NflL5hZWd1e1I14I%2FegDOvjbWuR1vowTUoVF7ySuJ2nekiky9La435AFOYFM2KRwZPAhUPTlGv%2BfLfw0m1OEdMCFTBqG4SBH31Vsglb2YwR14Ah4N%2BYaA7LK6%2B6FptGGcfYVf%2BOTT8AKlZ8Z3mm%2Ben%2FAnjFGKLiASj6HTWgEXHzpnCr5UkLNG2yRVpmPQUKRX0PRDeIVMP418FHlt1iQdXPSys2jHvgD%2Fx81j%2FLoyUmTirjdbwY6N747O8DlPa9kX%2F1mN3bzVKStYqXzPGlxxHu8TrZuDQQ8aJ%2FfruAQTqtS0XSwInOXj%2FtixRk4IosijsYO%2BX2gu7BjBrYyUhJ98NqEB%2Ft9oc8yH%2FnUeF7HXTgGjHNr1Uh9GbxNqZ5qSVHKpEefzKUjQTpfLilQipMKyfy8oGOqUBi5S%2FBu%2B1tu0KTEsg8u4uvfLHzxykhoQfS7TR2TptZdefcwYFcSG1lq3iSuI9e1CUFUCkIe3ZCum3gO7I2SSN4vMetqNOvtdHRdQqVFlxDVHEPNxwEEy8HUqcS%2BYRsW%2BZIky0kJFmKcW9xNOESzLMMHH4H8tLECR2JwVuBPu2WvcLu1kVzsnbFmO1lD5uV2kkCTROBQntqNYKtrcHk%2BUAm3N6UO5u&X-Amz-Signature=9070a0442a0fee573a174d7a3f2b2b2574fa9ff1c41c2f1f077aa23cab49b80b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4NVGS2J%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0djZbdK7A92s2DtKZ7JmbcYzTxPQZb0QfF4ajEhLg3AIhAM6%2FSuVbd8EP8ywQVkt6lwVFmCQ9RuK1jsGfQ%2FvYQiQOKogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxce%2BD88O1KRhTJmIIq3AOZzPk3aH7lrlwWIHGPmdzE4kPbSCKjT0RO%2FaF9wjtIRyf3o187IVBWW4DjfwzHqNqVTHjrXE4JjPeT6Hpgj%2BOPTiUaSBlofwUeZNBi6HNVhQcbwONIWHDtnQGJGFP33oaa%2Bp%2BTf79FhkQYlOqk0mfkDJRxxNCOj8M3WZBNrl246oMRCWwOwfGi%2FCcLt35rHx9lKbE33Thi7kZqHPWLpln3gO3VPtWbdP58dc4v4XcT2HrmBVEgO5SqXCt1wMtMuGMg%2Fr%2BtGjXV%2FxVXlrWqVJZfEQUYEJYxnAEkVfWjlcoytZYVrARkJOovuNqiY9zi63cwIKF2zUtOcx2ocFWPfvv5IG7Qhgnf6bRuzulDIjzvhqiwXOfRV0vv6PKdqUmuxntjE98UQ%2FvFCoIcwSE6Zvhd%2Bv2wjbyttz1P5MiHgqIhCdnNQdt%2BeP5BgLaArt3FacXUWgiNKvKNEK2hNU4RdqWUyTUqLAii7PawZ0EXy0aXZzIET7QQalQhZyOs%2BDWzLG8B%2FvHTuXpc9nGhcmG7lECmBFYdkTQzahZXw%2FvuYgYW55uwfi60zELrPtvl6VsZotUZJTaOTAVDlGn5b0%2BdLpc9swroNf6%2BGRZp2v8twYKbFbHYg6U0KXGL3YDDMTCMqsvKBjqkAbHBGzSLEYxQ6YvUrlbfyK5p2N4LdI98ibsZxjUobPZ5VuBgchWXj3D4%2F2eYylZhwOwR5dhUV%2B5oUljsLgyz%2B2aJ4pmaREHw5Q57e7ixjUtVKAnoNB0p7nXS0UFJbrvmulFWmBnLlsg9%2Fuuj8sbFC8UHqmPmHZy9yT7p2YI3hN9ZqO8Dx9I2C91HGA6k6ovpy1BjoKS2QWt1lI9f3H1YqEB%2FSDwR&X-Amz-Signature=dc54281abd11662dbb4cfb557920afe55e1065b77812dbdd8c3965bb768b2f82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JGZYJNF%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHVg2J%2FTN%2Bs%2B3PaNZ%2FLeIgfi0f5oIUzCfa7snt34HmilAiEAvJ5ThzV9pAcSsTL72R%2Bd%2FK%2BsvAQSI9P01sdv%2BBkgQ8YqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIQH9zqa7%2F8WrszcxircA%2FE327KHpXRdcYwfpGmAJFf7mMBMGERTgXW1msDbUmt0m9JQoX9rZ1vAfhX2c11tDcwpEcrQL6fqCsIHMOL%2Fy0%2BHazcsC9XxIi0ljCqgYDQXR49gPMc1xt0OXk6CR2udZ9HZBrFm9RPGjvNqDleSgZXe%2FaSE9KwWjRpqa2WjOhvF1%2FQgpmRKH0B3Z9YtVjNaEQ3tG537Mc1GU%2FTdd16NpSPfZM2%2B2GwhRP8Y%2FUmiDOl1Hw0wht7dtY130HhZlbkaMYGctcAtkJaXpDfTwKQUoZI%2BqFu5fvYDg8QlfTL7OqdYguhHDr6UkZwUw0DX0FLbRnMKevZuBdpg4g1FkRetyVFYMWKa0AP9E%2FpwKrATaZKdezXPpthvbOlgST59S5rn6LyygW7HLSYANUZeqMXqMpH59TTxaEyAygSjDHMQNhWax81lG24YJ%2BsjMX%2F1CyVDBUyJTgKdL4ECRdwp1YbYUnQfqXCv%2FznlcB9kf9aq5d%2BSfx92PKToeni7UVbmYUaUvJdNq5%2FsdiLI89dz1eT7I%2FdNig%2B0OhI5bJsXm4zADGYI%2Fy8Pg5iIYpB4LZWWDK%2Fs7Xfg6HUVhBXhSfgAIV0fD5qVtuZYU3hAYbFSRt8gXcUuxwDvh7yfL76Cg3DhMOOry8oGOqUB33XSYpAENaEUziMvAWSC2KKSwoYsTIErms7CCLj8RaMnZ33mrJ5v2wh%2B0%2BXF%2BzAFrW4rDFJ0hWZX3PW2XSpUPy5x4CDAE%2FWX9mj2DgzaKidF88N3z7OS44F7QIoAqT5IYcCduqhxT7LTq8V11PKcxJoSO3JyegbpoTM8PtdcAC0dxzXojZ4EXtwmf6I25axfcVFFUGF1hpHTfqCkI0zboFTrGrTV&X-Amz-Signature=e040bb025f292912042e91e20a59719dde19ac86982b7788725c3dfe13cee1ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QX46TQJ%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKfvP%2BNJKjMzwn6dpW5DZ0yDDiWDk4lrWBTGAeC6DSeQIhAOQ5N4ij2wpmxD8R4%2Fmy5LdBJnAIYTnimHzmYtfOhT%2FoKogECKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwBBSIy3oryp3cylDAq3ANjR9dRpIvo47n0YDbSUgcHthCe6hZuh2uf0CinUb4A%2FehFixbn9Tv%2BWq83k1%2Fob4OUiD17lJbbGoMfvpO2zfivcUcn1Vbn6ekt6Fc1jlymZn0IsZ5s733Ql9dBvwW0A2v0Flx8riDD6aGZ4t3DZoeqoVCXWGT9dojB0frIByQYFn7cnffm8tm6sK9jqxoghnzLh4%2BQ4tYx7OEOXmcjH0KrPOO%2BHxVTKkEPzqvECmVABDNIUPKr1vnWtNtNYM1yQ05V4ZQ8Bwc2EWfBv77bRsZADbY7vVa%2BtFSmy%2FtRFyPokyJM38IgyVoUlQRtuAnHPwPvg6OWz6Ijy8gdUvfku3RXA3lgTQTCEQLv1uLaF%2BVvcEtPeAp92CJ%2FzTm6YsFJXWtdS4m16Y5uCxUEEBS%2F0F3lF6MKUdM68%2FT5EARMz4W%2Bv0IJPehIN07fAmEwOQBX5Knw%2BOW%2FUOtSNLSgQCQHxxu81hdLEA3EoAIXL8OcYhMqRajq7ixRBMGO4TO%2FZmOo6uuf9RMa2YH9s8igvwBKHOqM%2FapeXBUHOCcZgkHzIZWgcZPZl8wQwG1cCk79L7SkOjb9goCAuFaM%2Bfkvc9rR34Oqv1tJypD7brre98f7UIINF9kWgb1s4kajhSzH%2BTCGosvKBjqkAb27RHJ1XovlLH9ZuqMOEUp85nkIBvIE4LOMir4FSCfdV9XujoJWynHaL%2BKlN1OAPa2yUmBDB8F7VUmvZMn%2FCe%2Bp1%2FoC01mH7nG%2FFPEJnnhwIgsbjk1NCOi0IHsuYV67D8FcAKm32mMGWcu7o%2BdNPCYDi3cBFye9aGCIZZ5Tn1t5u%2FJqsgYNTneNSX5%2F2%2Fqz9FBbrBkOgp990JiedpZuRyiv31mq&X-Amz-Signature=0a23fa927651d78bb8dd5edcc735b64864dc366957bba473414f40a54cb66cc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDF56SBE%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD44yXdXl7KaFVL0sGboFmGZgjX5fGRWfUBYCTucj00%2BgIgfYDjrSKyXJQd%2BlX2u2IRwxE%2Fif8a6RcyBjSVIWMHKgsqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAAbmmxQ4fNTz6z6ISrcA4Hy3s92z4XVh%2FyGV2rMpn7IaPVpN0ipESmiDWuUm4MStQT%2FZjMn9RCUeI5BvzO%2FV2dFem6%2FXEU%2Bi3Jtg2aWe2%2FXVUxSQXCIA0rNpRgX3jLChmXqIweOPvA9YB6Os6N1HtK5R3C%2BIZvb9KojUt24%2F4MLQ4hwenoROPRkcj8qb9Zpizsh2kS88vZHh%2FDYNSTTpcnbBHS7hV7fN9YskdbOQkDiKU2TcD%2Fv2pYlIQlqc%2BU5L5WNmbD7uvgOlQMBz17cR4I1HQkp0DwNSoChFUCU%2BMrpriTZWy6rBlpQ2cesLCC2vnfpIbGVZClBn1oJKbJE86XkZ81FD7UpiDVz4LfR9h3Kq2o9CUwcsydpJaSuktDzTmgPq7k2%2FEQ7k9Ehc6itZhKsnzlSCiBjDUBcXd7qh8CdXxBDdY2zpr4D7HTruN0QdsX6ctDwv%2Fp7KJMqwm3LJlRvRS2ppTbrtNr0YeOjZy639br6tf4VvNoLES8GJU355FNIghLHxc3LouV411pcgLJBHQNMkj9UEYg7Dr%2BxOsJIbtRSk6AfMOouQaJpWXEGEyfR0p6%2BhmHkDhrhckXQealDSRquurMIevP7qPAB2uwsSIFqSRGiYl5MGPCwG2smh85NlCmk2xNugjUPMLOmy8oGOqUBLCD%2BOEYh3ofD5v6K8ZkOD6682e8uJVlcGmyfS%2Bm9lfrqG0kV7tZj3%2Fi0FHCMkS7wjPSJdvVV6aZDPy07LZBk%2BDZMA75ikXQhI1ogpU9ssnAva8TXcztKa4%2BgrZ0tZL7DjoprAINv%2BPfgJK8UdhzNoPYki3N1dEZN1DbJt9B9pxuJI0X%2By7tlQzPpLEgtZ%2FioavnYxwWAt4z%2Bq0XYMIJdSoXV696X&X-Amz-Signature=2a34003f3d4fcc5aa2e5c86e2ac1c5ee5f75b694b231b77d470b09f2653a81d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDF56SBE%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD44yXdXl7KaFVL0sGboFmGZgjX5fGRWfUBYCTucj00%2BgIgfYDjrSKyXJQd%2BlX2u2IRwxE%2Fif8a6RcyBjSVIWMHKgsqiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAAbmmxQ4fNTz6z6ISrcA4Hy3s92z4XVh%2FyGV2rMpn7IaPVpN0ipESmiDWuUm4MStQT%2FZjMn9RCUeI5BvzO%2FV2dFem6%2FXEU%2Bi3Jtg2aWe2%2FXVUxSQXCIA0rNpRgX3jLChmXqIweOPvA9YB6Os6N1HtK5R3C%2BIZvb9KojUt24%2F4MLQ4hwenoROPRkcj8qb9Zpizsh2kS88vZHh%2FDYNSTTpcnbBHS7hV7fN9YskdbOQkDiKU2TcD%2Fv2pYlIQlqc%2BU5L5WNmbD7uvgOlQMBz17cR4I1HQkp0DwNSoChFUCU%2BMrpriTZWy6rBlpQ2cesLCC2vnfpIbGVZClBn1oJKbJE86XkZ81FD7UpiDVz4LfR9h3Kq2o9CUwcsydpJaSuktDzTmgPq7k2%2FEQ7k9Ehc6itZhKsnzlSCiBjDUBcXd7qh8CdXxBDdY2zpr4D7HTruN0QdsX6ctDwv%2Fp7KJMqwm3LJlRvRS2ppTbrtNr0YeOjZy639br6tf4VvNoLES8GJU355FNIghLHxc3LouV411pcgLJBHQNMkj9UEYg7Dr%2BxOsJIbtRSk6AfMOouQaJpWXEGEyfR0p6%2BhmHkDhrhckXQealDSRquurMIevP7qPAB2uwsSIFqSRGiYl5MGPCwG2smh85NlCmk2xNugjUPMLOmy8oGOqUBLCD%2BOEYh3ofD5v6K8ZkOD6682e8uJVlcGmyfS%2Bm9lfrqG0kV7tZj3%2Fi0FHCMkS7wjPSJdvVV6aZDPy07LZBk%2BDZMA75ikXQhI1ogpU9ssnAva8TXcztKa4%2BgrZ0tZL7DjoprAINv%2BPfgJK8UdhzNoPYki3N1dEZN1DbJt9B9pxuJI0X%2By7tlQzPpLEgtZ%2FioavnYxwWAt4z%2Bq0XYMIJdSoXV696X&X-Amz-Signature=659b0b115a53676089e1387e31cab9a5aca4030954126f2a438ea2129c56a6c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNII3PPF%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGWyZLeHyF%2F9YNyWR5MgNJTwJRB%2FqT%2BrqhAlePYUfdWjAiEAtrmWXbOotb1sNhp3lCjfe3bhcHcMivdUavyujQye9MkqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJot9YIpEcSmEZQsHCrcA7eNVRvCK62Ju7B9bdMxhq1XCXcrsEscK5fXKTSThanSmFKKfY8kBLssxime7ttSaIQmVyjPqLOoKsPdNZmDBBzRa4UtCY03QLgIymwB6ZHPL2XdcCgL%2FMBhmza6PMKkk9K61Fd%2Fb%2BHeRx2axZ8W9xFOJrwcRtQOBsSxWl9g%2FRMCkByHAdEDuVWcaBoRUxTKTY4HrO1Fiq8RI%2BeCycqBTqTmbUYZyKaiEZSot7wUQGhiXHi5xuz7lqmzArxdfqVyf%2BgrmnfPw6wPOUWDiGHLZH2ASTceCROnLUve7J4fex2TsLeL1le8tVa345kdyD1CJ5L33FGLT75BRbbG%2BaTX%2BZe4%2BZGORc3HSPbd1OmdP%2BZ521xGFM4Gf0QdFxvKHAFZkAVuPCV%2F49PopzBqZED38W27LrzoFn4QTKY%2FFiTJSl5aSm%2BJPLeUca9d8kXA7%2FmiDYCpvRVyyNme2BsSIfohRKcmNpKSJMPAf26s2eZMrkiZE6hmKVq2%2FjQxDZIpfzD9vq1Z4ixhS%2FDZ29U85HnnL0EBRVpCCMpBGhy1uTWOPTS9XT4mU8ZW3S1chLEng18KpyCyO264DI3MdSAHy4g4IBuAJTWQ3pDHv%2Bi3KqSbIm04FpxVYOQVsdcF5VNUMNCqy8oGOqUBcWJxmbg4Ac63I4WSSkV3nlgqghBcRO0RYsBDs6IzQMd4xMPCdgZuVl0cTCSb7aJtjUHKOE3IenrFlN8QuFpPKvSwRU8czbQsZOfohJ3NvZ6%2Fk6FpKlVeLcDQnDgN7rn%2F017n8MMKGJwUqZcS%2B2W2dRpN4xa%2Fq8L8IatjgpOh4g0Zef%2BpVcgLbxDqoW3vKctg2yfM3w2hm0%2Bs6UDnsZAhnVcH4ts0&X-Amz-Signature=a25275a12605f1af1f15e1ac4331595334d3702f1570a4895ce97be49a28c753&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DLOQZWF%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF5IkwK2qiyP6ojnUqigN%2FnWAT7DJYC2bTi3ezHhnc5cAiEA9PIsWIYS08BLsv3mhNO16q5PL5QNLiNOZXW21lPlP%2F0qiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOmKizHy5P%2Bp0FXd%2BSrcA%2BrABvU7FWw1UGu428rINikMXgYmvyQgAjFIUH4IOOpdp3CWGyMMU6gDZmS2%2B0d%2FMFwDu4IKm3RQoy%2FRVkXIHl6M0mfCSAsXQJdQkEFeEwTU%2FZzqFheAk5hLu6f%2FR%2FrxlquHn4qDBuPblbnjy%2Fpk4TT%2FG1xXuM2pVnZ0jNpd3rwJ7OFHAfoGipMxXkORhf6Ip4DzJTMERei9PHCZU0RQr9f3EdXcGfKXcgEsB3x6zdJhBL%2FjtoQH%2BtOQqZwQ2LyoMWZRfxUJ%2FTyQ3MLZ%2F%2Bmvkw4g5ZOt280CsqwrF%2FdgpYxiw7C4lit0bRzZ3g45xuqhmmJMd%2FcCjfdiE2Gup%2Ffw%2Bmv4YIWr468JRp5oGkC0ArXHJ4EtufIILWfWqrXG3%2B1Y2xqT38%2FPMN9PpmJo3WHh1rG9KtV35TtHsq1NLmIqCFCnj87GPEF%2FRkB1cqHXvODBsrGoOlr48U3%2BqdJPpMdehn4FVJDnQUFHY1HQ%2Fjhf0fbvEL6rQ6BFkJeWMG0wFbisJHP1PBQKXLiZc14aThzS%2FnUG%2FqFhnUK21ixmvGIq5wM48STmxRhunX%2FqhOW1rLz24MLZKnM51vQyrnFVpppLbnhHYeTN5i0BpRMkBK96WufuQIZemGVsChzPjdo0MLGfy8oGOqUBv3wTRg2YjEJtZFuERf6EIojj6MxcpOQSWTGFA%2FdLofAi7SyzPEMyV3l21CvrYhXwtpxF%2B8LaUEgFoO%2FoRoRV2rEsMlX0bnBLrdokPd%2F2M6FLHCY1BjZx9IYZQ1xvLt4Ey3AuIRwPCv6ufgAP30Uro4y%2BF0fINryUZlfaxWilps1im2anYWCIjOjkpw1oIEUz7qWkZXWuhjCnt7lnr4Fc9VgxsupV&X-Amz-Signature=05faeb8aa7bddec5c5da28f082abb562530400d8f4e83127dd8a8774d8258f6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DLOQZWF%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF5IkwK2qiyP6ojnUqigN%2FnWAT7DJYC2bTi3ezHhnc5cAiEA9PIsWIYS08BLsv3mhNO16q5PL5QNLiNOZXW21lPlP%2F0qiAQIpP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOmKizHy5P%2Bp0FXd%2BSrcA%2BrABvU7FWw1UGu428rINikMXgYmvyQgAjFIUH4IOOpdp3CWGyMMU6gDZmS2%2B0d%2FMFwDu4IKm3RQoy%2FRVkXIHl6M0mfCSAsXQJdQkEFeEwTU%2FZzqFheAk5hLu6f%2FR%2FrxlquHn4qDBuPblbnjy%2Fpk4TT%2FG1xXuM2pVnZ0jNpd3rwJ7OFHAfoGipMxXkORhf6Ip4DzJTMERei9PHCZU0RQr9f3EdXcGfKXcgEsB3x6zdJhBL%2FjtoQH%2BtOQqZwQ2LyoMWZRfxUJ%2FTyQ3MLZ%2F%2Bmvkw4g5ZOt280CsqwrF%2FdgpYxiw7C4lit0bRzZ3g45xuqhmmJMd%2FcCjfdiE2Gup%2Ffw%2Bmv4YIWr468JRp5oGkC0ArXHJ4EtufIILWfWqrXG3%2B1Y2xqT38%2FPMN9PpmJo3WHh1rG9KtV35TtHsq1NLmIqCFCnj87GPEF%2FRkB1cqHXvODBsrGoOlr48U3%2BqdJPpMdehn4FVJDnQUFHY1HQ%2Fjhf0fbvEL6rQ6BFkJeWMG0wFbisJHP1PBQKXLiZc14aThzS%2FnUG%2FqFhnUK21ixmvGIq5wM48STmxRhunX%2FqhOW1rLz24MLZKnM51vQyrnFVpppLbnhHYeTN5i0BpRMkBK96WufuQIZemGVsChzPjdo0MLGfy8oGOqUBv3wTRg2YjEJtZFuERf6EIojj6MxcpOQSWTGFA%2FdLofAi7SyzPEMyV3l21CvrYhXwtpxF%2B8LaUEgFoO%2FoRoRV2rEsMlX0bnBLrdokPd%2F2M6FLHCY1BjZx9IYZQ1xvLt4Ey3AuIRwPCv6ufgAP30Uro4y%2BF0fINryUZlfaxWilps1im2anYWCIjOjkpw1oIEUz7qWkZXWuhjCnt7lnr4Fc9VgxsupV&X-Amz-Signature=05faeb8aa7bddec5c5da28f082abb562530400d8f4e83127dd8a8774d8258f6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654DLEWCI%2F20251229%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251229T220116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbEj9Zhp%2FH7c7DEAWoXvixduukTYaZV4KdiqE0RR2BygIgUl590ZZpCBZp2BZiz9V9k8i4OvSWs1%2F6j313LbsWqngqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFTsLsAZEWe9PwbJMircA%2Fs3I8pD%2BDgApDriBEG5kXYgyFhY%2FrP%2BEmfbk65%2BobaKWAeenzzxIFLu8%2B%2F%2BO3I30QftIDMWHoux6P4JwYdYOKHPVuJvjrfVyRPRbQNxhB2kh8ZghWqpuk7D%2FjH1htSH8%2BBNIyDZnTPtMf%2FnSTAkqPLuqwQ50G4JVXRP7LHli%2FmcKXzgM4ixwESw46JoonBw6WU6DG0DM9thA1X3aBq3N5Nuu0FP%2FdC%2B5al4aLbMyRpOR4QDhJ6P3%2BlH8C4%2FaS4FQyL4dfwkT5ovtgjx3UeznoIs3zd1E5sJFzYEV9%2BrQp5u0EltXno6yuVXvBIxtM%2BHojDIGwzmrXBZ%2FseHhXk0wsONhfsfNDLohPJJTKEx4Cjinmn4A57UC%2F%2B857Moh5qu7rVrnkYmxvTDQ3KRq1nemFCZodZfl0eLU%2FVVbFQmGpdCYtw0Dj2shHuRcJGCpsHW7rAj%2BnLe3clAYz6BW6wAb2jNvBkKFZPuJRz7L1vgx0ljfkFk981sZ%2BYLvOjnVKv3rysF0jVapqGgV9WpP6snrLLzTmn3Tzd%2F3PiYsNiETdo0lVI%2Bf39RZ4R9djxJQEQrJHTXzPYMQSGaUVntA8zShFIjarcyW19T1oDBa9Dhbo%2BrCH8wk%2BXCwj6q%2F6V%2FMN6qy8oGOqUBxDDGyEdoSJKISJUtH5Y7J83NbOcmJU%2F0wcQisIhDkUs9vG037Xf53jSMkj3gA9U57V9%2FXjtE8W2i4xZQRh2FD919SYn%2B3%2BcvtDiNMTh%2FJodGOBBJ4EyC02qbM0C%2Fu9oYQcW9%2B8pBn7vSG%2FW2n7tE%2BaqYefhyUfxKbcNSMEgDGQJahE49ZGJ7Y8tiIwZTxdfLtjgu29qmGLUlEPcR3ymubuYai%2FG9&X-Amz-Signature=361ef2c1be94f8884931bbf5857490fa3e8f0fb54893e58aa0a41191c229f7f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

