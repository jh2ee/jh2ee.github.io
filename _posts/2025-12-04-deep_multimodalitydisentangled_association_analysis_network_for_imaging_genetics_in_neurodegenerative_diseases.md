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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Z63NADZ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD8k0WeayaQjOHB8p6pVrfSWVMfd%2BG1rXtc81EBi%2FHW5QIgNBdG08%2BqGluqwF7%2B%2FRPHEOfHrsbRunDSUbmej1vXGpAq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDK3c5dJfBYmOiwDk8CrcAxSwrYM3Vwh8xjQWHVNN0QKg7zvshv%2FtzdNSDlQYW2UtI2NT932nVSqu3K63zHAZXPn6XXubaQqq7zCjL%2Ftqf79uQdX7MRV6mzKGLBv9c4twYIWgu%2BnlC%2Bv%2BB9Q1qD0Ehum2mxJXpflEEUwtfYhGsrOrL4irxxhYXzGKXIo79RKh47YZEkkAcJsk8Ia9%2FX7ZlAKwwyO2IGBAXU9wnD159oFt43q5bRjYH1D9L5Za7f82jBdMipn3Xezb3LhhuQTafAJkCoUUt69ndRCpn%2BEaqhkDRurjXGLAGzQcrhlEcUQF3n%2F%2FSuus5TnkmKNgdgNfSUbFsWqWOQtbemUm%2Ff3fs4I8OeFacSi5SM11bX25Sf1j0%2FHkofF9UjgBLlZ%2BYfxjj7QMAqWPI4ZF5ZvuPtK1x7OiVv5ab3ICexQm%2F%2BvU4tYTeZYekeO1oBCNROIcL0%2FmYaVGONmjC85oeyKLwg69EeYt8AaABQ6fdMqhCQ73h8z94Izvt5TkSIrEqCeWfBEUaawq0gV0r90QH4G4ekLSp6lGVqG0CVl9INkTyhSsSzOAgp6HfB6zm6QfrqdwskRyl24mqPRT53wfAyBeIqr9wPAik9GcABkLE50FpKJ%2FH%2FqoX2XlYlWMGGZYRkSjMO3GlcwGOqUBz7GXAy%2B3ktYtvwzorUIl5cx43mLjoPv%2Fr0ytB5rJe5w4zjkxL%2Fg%2FUl2KkvVGMlgi3f9OyblOLcvH7EIUY1F1XcY%2BO3hKpdct4h8C4B8QVgxJE7FDiDIzKe4%2B9VNqcICbra8lui%2BgwTHXoLZJLDJmZfygQTkwTbnL%2FzsDB85MBNICshTayEMFLv3%2Fx%2BuAwlalzdqf0Q53cvcBwex0IGvj5Pry0gv0&X-Amz-Signature=3675d77932d19c34e763a758d9c01028167086db3d24f950a5d0c1d8c5426114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Z63NADZ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD8k0WeayaQjOHB8p6pVrfSWVMfd%2BG1rXtc81EBi%2FHW5QIgNBdG08%2BqGluqwF7%2B%2FRPHEOfHrsbRunDSUbmej1vXGpAq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDK3c5dJfBYmOiwDk8CrcAxSwrYM3Vwh8xjQWHVNN0QKg7zvshv%2FtzdNSDlQYW2UtI2NT932nVSqu3K63zHAZXPn6XXubaQqq7zCjL%2Ftqf79uQdX7MRV6mzKGLBv9c4twYIWgu%2BnlC%2Bv%2BB9Q1qD0Ehum2mxJXpflEEUwtfYhGsrOrL4irxxhYXzGKXIo79RKh47YZEkkAcJsk8Ia9%2FX7ZlAKwwyO2IGBAXU9wnD159oFt43q5bRjYH1D9L5Za7f82jBdMipn3Xezb3LhhuQTafAJkCoUUt69ndRCpn%2BEaqhkDRurjXGLAGzQcrhlEcUQF3n%2F%2FSuus5TnkmKNgdgNfSUbFsWqWOQtbemUm%2Ff3fs4I8OeFacSi5SM11bX25Sf1j0%2FHkofF9UjgBLlZ%2BYfxjj7QMAqWPI4ZF5ZvuPtK1x7OiVv5ab3ICexQm%2F%2BvU4tYTeZYekeO1oBCNROIcL0%2FmYaVGONmjC85oeyKLwg69EeYt8AaABQ6fdMqhCQ73h8z94Izvt5TkSIrEqCeWfBEUaawq0gV0r90QH4G4ekLSp6lGVqG0CVl9INkTyhSsSzOAgp6HfB6zm6QfrqdwskRyl24mqPRT53wfAyBeIqr9wPAik9GcABkLE50FpKJ%2FH%2FqoX2XlYlWMGGZYRkSjMO3GlcwGOqUBz7GXAy%2B3ktYtvwzorUIl5cx43mLjoPv%2Fr0ytB5rJe5w4zjkxL%2Fg%2FUl2KkvVGMlgi3f9OyblOLcvH7EIUY1F1XcY%2BO3hKpdct4h8C4B8QVgxJE7FDiDIzKe4%2B9VNqcICbra8lui%2BgwTHXoLZJLDJmZfygQTkwTbnL%2FzsDB85MBNICshTayEMFLv3%2Fx%2BuAwlalzdqf0Q53cvcBwex0IGvj5Pry0gv0&X-Amz-Signature=3675d77932d19c34e763a758d9c01028167086db3d24f950a5d0c1d8c5426114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3ZBPZPQ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIAUBOvDNQ4NGDLaIxPKsIvYrl3ihV%2FpdAC%2ByfV8oRD67AiEAuufXgq%2F4MTFWIwxdddJFxdOZMK%2Bp%2FkleQR1OmQANUiQq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDDMg6i8j4fJrtguOGyrcA9YZrsdj0xxkwTi1KxXfM4VtKer1e2DslTxQM2s1LpG%2FpG%2B8A%2F8A5jVy%2FWcwhLLGGmLRrqaLwTf5iA4Rk8VZxwlajYLjp9jG4WEUTbVT4CRefgAQr3PPmsTyCRcUKual3jgt6dj%2FSP4Lo5U8XiMYlXmtV%2FdRGZ0G0F94vMDntNzMOSWO5EBbImmRMW5jQjO3abLe9l5wEhGcrhL4q4JoqxguT%2FR6c2zDhebTwKvziCutZtNanCZzX92vJz3bp%2BB%2B2aj7GaBIE%2Fvimc8uHjaqHxKSKaUYBcQSqps0cwwW5CAkH17VZCJGipuSRbbWxB%2B6cLmfJGdBxAcZH7yoSBzUB0PsC4MjYAjuKEuoGIqNbYo38afD7tuyX%2BlxCul2A9iPFr%2FA%2Fk%2FwtV32XwAw0r0KI%2FJW5te3h3NJSvBoKIS9wzPwis%2BzGPilb5I8Oago0g01S8w9s%2Fyy2yrtIBfrpfXfBcc0hK25EVS%2BzVt58sidAXhRXaa4msK1qIRvYJctbKfNIamg31a8NQ2pPnkeAvhR3dWIGYeMqdk9QDvG5WMrEhIQHJ%2BjD2Ic9Virr1sbWsUYs1McNSbe4pYQL85CgFS9VWeDcLijjwJTK97UfwGZRzcYMMAmtKrqrWdoFETEMPzGlcwGOqUBsd4bX3vNJQqFVVfyAOvpKF5bMDJMQHQXTHBj%2Fbzmxb0GT6exNxmff2kteX7U7%2BB3FYSMnSXt%2FWhCW9DZ6VC9JKneA%2BtVAGWd4g68Wlzyo3frHA4Q1ebdset57vEzqxQZxDIueGrmddoiL%2FmUhj6Wmd%2B%2FpE7h%2FWqj1RShvSitNVY4nY87qb31Y%2F8xt9BsiJmNatN6uOQB4HSR1e4N0V%2BYESx%2BRHEt&X-Amz-Signature=03683cdbb61e6b7595fa80b1e753815bc23c4a4aadca862e42390a7ac291cc41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPI7AHHA%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIAsBSAVRA%2FhxRhmZnmtZoerSHKatwM1YwDjmAHpHav5VAiAja%2BWec2D%2BjbAyGq0B5XCdZuukwpjVCgnBkiq0tVg7NSr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMfrwuaQkTm7EwLmKuKtwD3D3qIrmg7gEUpjOon2RKrpzfa03SzccvnVBSuqdNeK9hhwYjXO8TYdF10Gix79epSABJyWDY7yvI%2Bdh66k8ywusUZgE%2Bu04%2FI0krL2uXRfI%2F8op8usB1hb7nPJmzK7RuV36tMSFwCrcZZE%2B0AWbeazVa%2BxmYOTXfZk2DDrpDvkqLrH65FQWhGWb1%2BfmFmmYRR6ep7xv8F8SfqYVAIT1l0ndw2GhQdlFsU%2FW9HV8A0YH6KIELzgYTayTdYSsx8cytPDLL4WQklpO0DE4nKIErAMh1GDvJQkF4vunybCcJq2OuQGjBdxqTopEhxY0BhUeqaTbzaoWUStLbGQmvnf9NQh4PQQMej%2FUgvlgveyBEWbw9kgS0IvCNpBCcguj4NN5w26h70ubA1jJwKjWDAxUAgft2gBMwYJouc%2FfyRs5lL7faLz5Xaloz%2BGeUF8q0RDEJwVidLWIPQbMPH8E1QOE1vxOeDOreQnCxgU3yYpW8ch9kAjIwp60Mh5%2BuoiKeLvJCFRMVA%2BE0j8Sh06yCsG7grFUATwE02Y8aa%2ByIPWqZuhsOe7QGY4DSJFMiVzqRqu%2B3YgQd4xZOcGDDw4DdYcSN1lMJzZQiPfs5vZsWfF13XKdCuy3psxzHab1PnwAwycaVzAY6pgGPtdGqyEe7seZhvUsr9UZU1wxybtjnKAN%2F53xE9AIUVC0oQ7dQVBqdPdJOaYSol09dOHTz8K3A%2F5MhGIAJTBKd0TaFUw6pthTXqHUXTR50WOj2qLqD1scCLbR8O3noVF0WcVTC60a%2FUzoFAI2sqtPEBXqAtd5QWzEtISVQzjqy0haMVS93t5iz04ayy2gW5b2XvxrimvuN6TxBA%2FwloYKMmt9MPsKA&X-Amz-Signature=3ebf136f427fd0d406b89485765a5c8e17368c3377893638a202abce99bba54f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPI7AHHA%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIAsBSAVRA%2FhxRhmZnmtZoerSHKatwM1YwDjmAHpHav5VAiAja%2BWec2D%2BjbAyGq0B5XCdZuukwpjVCgnBkiq0tVg7NSr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMfrwuaQkTm7EwLmKuKtwD3D3qIrmg7gEUpjOon2RKrpzfa03SzccvnVBSuqdNeK9hhwYjXO8TYdF10Gix79epSABJyWDY7yvI%2Bdh66k8ywusUZgE%2Bu04%2FI0krL2uXRfI%2F8op8usB1hb7nPJmzK7RuV36tMSFwCrcZZE%2B0AWbeazVa%2BxmYOTXfZk2DDrpDvkqLrH65FQWhGWb1%2BfmFmmYRR6ep7xv8F8SfqYVAIT1l0ndw2GhQdlFsU%2FW9HV8A0YH6KIELzgYTayTdYSsx8cytPDLL4WQklpO0DE4nKIErAMh1GDvJQkF4vunybCcJq2OuQGjBdxqTopEhxY0BhUeqaTbzaoWUStLbGQmvnf9NQh4PQQMej%2FUgvlgveyBEWbw9kgS0IvCNpBCcguj4NN5w26h70ubA1jJwKjWDAxUAgft2gBMwYJouc%2FfyRs5lL7faLz5Xaloz%2BGeUF8q0RDEJwVidLWIPQbMPH8E1QOE1vxOeDOreQnCxgU3yYpW8ch9kAjIwp60Mh5%2BuoiKeLvJCFRMVA%2BE0j8Sh06yCsG7grFUATwE02Y8aa%2ByIPWqZuhsOe7QGY4DSJFMiVzqRqu%2B3YgQd4xZOcGDDw4DdYcSN1lMJzZQiPfs5vZsWfF13XKdCuy3psxzHab1PnwAwycaVzAY6pgGPtdGqyEe7seZhvUsr9UZU1wxybtjnKAN%2F53xE9AIUVC0oQ7dQVBqdPdJOaYSol09dOHTz8K3A%2F5MhGIAJTBKd0TaFUw6pthTXqHUXTR50WOj2qLqD1scCLbR8O3noVF0WcVTC60a%2FUzoFAI2sqtPEBXqAtd5QWzEtISVQzjqy0haMVS93t5iz04ayy2gW5b2XvxrimvuN6TxBA%2FwloYKMmt9MPsKA&X-Amz-Signature=1d8b28f134d7086f61a298e99d6a908abe088ab6cdc58346db828e04d28082c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Z63NADZ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD8k0WeayaQjOHB8p6pVrfSWVMfd%2BG1rXtc81EBi%2FHW5QIgNBdG08%2BqGluqwF7%2B%2FRPHEOfHrsbRunDSUbmej1vXGpAq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDK3c5dJfBYmOiwDk8CrcAxSwrYM3Vwh8xjQWHVNN0QKg7zvshv%2FtzdNSDlQYW2UtI2NT932nVSqu3K63zHAZXPn6XXubaQqq7zCjL%2Ftqf79uQdX7MRV6mzKGLBv9c4twYIWgu%2BnlC%2Bv%2BB9Q1qD0Ehum2mxJXpflEEUwtfYhGsrOrL4irxxhYXzGKXIo79RKh47YZEkkAcJsk8Ia9%2FX7ZlAKwwyO2IGBAXU9wnD159oFt43q5bRjYH1D9L5Za7f82jBdMipn3Xezb3LhhuQTafAJkCoUUt69ndRCpn%2BEaqhkDRurjXGLAGzQcrhlEcUQF3n%2F%2FSuus5TnkmKNgdgNfSUbFsWqWOQtbemUm%2Ff3fs4I8OeFacSi5SM11bX25Sf1j0%2FHkofF9UjgBLlZ%2BYfxjj7QMAqWPI4ZF5ZvuPtK1x7OiVv5ab3ICexQm%2F%2BvU4tYTeZYekeO1oBCNROIcL0%2FmYaVGONmjC85oeyKLwg69EeYt8AaABQ6fdMqhCQ73h8z94Izvt5TkSIrEqCeWfBEUaawq0gV0r90QH4G4ekLSp6lGVqG0CVl9INkTyhSsSzOAgp6HfB6zm6QfrqdwskRyl24mqPRT53wfAyBeIqr9wPAik9GcABkLE50FpKJ%2FH%2FqoX2XlYlWMGGZYRkSjMO3GlcwGOqUBz7GXAy%2B3ktYtvwzorUIl5cx43mLjoPv%2Fr0ytB5rJe5w4zjkxL%2Fg%2FUl2KkvVGMlgi3f9OyblOLcvH7EIUY1F1XcY%2BO3hKpdct4h8C4B8QVgxJE7FDiDIzKe4%2B9VNqcICbra8lui%2BgwTHXoLZJLDJmZfygQTkwTbnL%2FzsDB85MBNICshTayEMFLv3%2Fx%2BuAwlalzdqf0Q53cvcBwex0IGvj5Pry0gv0&X-Amz-Signature=3e22bd4cf1b369cc289d635c0bcfc928940ebc650e87012f5b7826c073d61e57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SBXHZI6%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJFMEMCICC%2F6uEtU0LZYEqexsAho7iHUNF5bpWGfa15bM2pCkICAh9oP2PGZCsh8jy9TvDPCiDMD%2BRU0yY2SkQPTusoCae%2BKv8DCD0QABoMNjM3NDIzMTgzODA1IgytNvMV6MIU0LP2r%2FMq3ANvn1%2FhaH6rbC%2Fbo7FnwbPcYj2YNg07xf9Cxd2A7fKzo86tJwa2dSg%2F6ZBo45w1VErfZBfwxcqwNpXbymylM7xFDkjhfqNzOpEwxv1SxzzINEsM21sPQYsa%2FQ4uJKOKLycriHSd9pfSX6K0Qd%2BC1unUM%2F5D20NwBp243Hys%2BN5MzOQHiWlgxPx92OGvTOBTCvWHdKL%2FTmxAUUA66gAxX2fRQlv3F%2FMjSgWaezAbyWzuW0p9GbMDGsjP%2BU4g7gFf7mVVCgeHyja7TZwfu6eGJ17Jnikd57TQDnEWoX3%2F7ZZ%2BqTAAWp%2FVRbXC0EdN3%2FpkilbvekRalkr7gec2eKlPpnZTU79zp30umfQmKTNT8nH8OnSC%2FlpByffCvmpjZSX1JfhiJ7pbiub74pSaiitnU7GubDFIG6TyLkQIGt0Ffbugcud6cVw56WEcJgUyxEX5XP%2BIJ5PDYv5U%2BnAMXzXh6QEPSyu2DGm1p68soNp76JLZwmJbKYg2xptICLpQgZo9paTnBWkmLqhwWi9PTWqMPG4f6pYYjW46mttvxR6AxJoZoHxeOM9%2F28ffvOgyQX6f7yFhBiSbWOcqtQUw7FzfL7o4PDc%2Fj5TSS2RijFni28r7Z6u%2BIAyEmIdvbJVbjzDsxpXMBjqnAcAj15AhYrCUIo3CfJzN1T6urTDTm4un0IH0oqxVbH6DHay6dx3VK%2FlWkETniPyjSEb9O5lVGRr2u1IrE3gOqzgirQNWXFAPBoNB%2FvuTYDM2Q1fhj%2FB0KEqedaSWKluneMUnT4N9Rw3sf%2FJ9bRIRltN0OPvVgO2b1gqkCsaWNOs5pVlIzqSZU94CwOHYtdfJBpYsx2w7rfbc5tGg34A%2Bquf1UpPUbwAD&X-Amz-Signature=f3e0f652db66911e8a00611a407e26cbea63ee883302556192c0de27e42d9446&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YC63PWKQ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDbouFxxpr5JGn7Ki3bs7QbNHMPvGRlMwBgATG%2BCm5qLgIgXNp7Bacgtnx9CXwV9QmoKuiq9nyAclk%2BwxIz%2Fh1B2tgq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDNsP7ZHxK5gI7tg65yrcA4HVKysMS5SGYrgd3Z5DRqlGmyEN7pwAwbbMrATPtH%2BbvuPLT7eojZP%2BEIyybBHr65X8vJ3eBJ4NqO2r3f%2BCUPoNkhLyN76WDp2BYdb7cZcp9hNg46iYBdqBJGcY7nHGmy30DafYl%2FvscnCqG4xtp0qL40%2BS8kW7xPd1kq5dsZrO1GzpcHX%2Bj0Gv6PH5AS9FqkQuAJnRzHmBI1Kx4IYlastxgpwYN7OZvbkJk4Xm0p0UfsB0IOJhnzWDaRJ7A2E8zbq0BVhAYfTdbX1f%2F7VI%2BxUWsWvrFu6XhD6%2Bpo5ZhEo3TuWCYzM3RMYEdysB2QUB95%2FMrEqNWMe4Le%2BRfJl33XKvDEN3N8L%2BMbpHmVWJjrz1sqOYF6tdn3I11qp3LEhkW3WB5WTOlLvmn0NWorUH%2FyvESxVCYIOrPmnZc%2FSNgTL3ujRgRWOCv22sygq2MqnHyZj2cew%2FsYYUG7s%2BM9nEbNzf0WGaR9wX5JjsruwUwiCIUr%2BsTY9tY55FNLN0Hh7E%2F7SgF0fmn%2BptM3xNREKQ%2F8srEKcUuQIvmFneG%2BJJijZXHMS85fYR0QVtwFQeK4xHvHflbeuwTAE3FMkB04MmNdWMEBxOQqumGHeGB9rZ9LeAwCpemQ0bDqqaro%2FLMOHGlcwGOqUBgGtXmm%2B8qdTE%2Bn6iJcBKpAEV85eHZpI6O9MBtp1n09su6WqqtMSWABz3vLz%2BtELDOPP948Yce0ltTdVXwfWGS9pSUSTFty81HnNXF2GUO01aNApd%2Fjf1t%2BNHSTbIlCgzmtVMjrjAvjoZ9vHTF5GOlQFEqx%2FduTJCMTFf6%2F1trAUBfEl1OLz08Uiis7APny4LCozmd8mTMgyu1HMVanJN5uJvX4hK&X-Amz-Signature=453a5ba0addccfaf4abb637af54c4aeae8588aa4b811fca6feb6210727189af6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R27ALDNR%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCgBZ%2FE41m0P5EFwTik7W242aWhfmkyWCaPyJLrFz2vIAIhALDQCrPvCwq2v%2FTPlEpzwg8KVPXXzEK1Yr7Db2gWki4HKv8DCD0QABoMNjM3NDIzMTgzODA1IgzdvR4QxHM2DVooJwgq3ANmlOSLn1Scpc4LoVsQ%2FBmmk1%2BSQPbBCnnu5hGMRLuqwBayBzvEwE4R4BeyrAdtV7Rxvr3K%2BfEGIc7kzjEbA3g1EyoCOcj9%2BrmjEUZqUUfWhHYCBATnxcVdqFxpc9I85z2U6Bze9eayxfSeDAdnRyMIp%2BUiZPfNGlskMtwgeWDVSwLgDJbYt%2BO%2B7ViHw%2BPnTDofgPIJTUlfRrSW9esR7ktsZVkR4vi0DRpjCtP6N5TBepbwtgQCZR1d4FoUm0NBXTR8nhXDF6DdE66Q2%2Fpkxrv0ECcv7LmrT3ruoRkGbjJ55ekfjQFsmFPhjsuUj%2Bdu%2FIRVsGsLBjmnw05MiWdlr43TaiR7ch3CkXiuI2EIjJiQQVFPy42xg7CKv1qZgdVLmpsLV9r4rcepOY46DfNtAGtLn%2B4CpWvbyarAutNZ10G7xM%2Bt2rUuXeP0ls7aK70CrN0rXgGh6maq5dpFPDPsAcce7a1agwlJf2d0I%2BL1W%2FxPYSLpnsGcvLFFE9kjOyud%2FGQ4AEhLnSKY%2FzB9ajki4KMkee0%2B%2BpFUaFgUnIsrKQ2dGcS1aGZivrsLd6xu8hGKyCtYV7Whs7lA%2BkUVFOnBLl5xa68wea8%2FNN8N2RD1jjhuctc2JEw%2BRF8tMdoTnzCxxpXMBjqkAYIvLd%2Bp%2Bp62iAjdi6%2B45a6yfkaCMifZSfJKeJ82vVLxuADlcKI0mOvV8vOjlMoN7cy7Nd10rL5hhe9fTrUuUHa4ChF%2BH80aedoRYNiSIpdV7rbGaLMRL4a6bogp8u334d4lEOjc5HBc3%2BHDC8BUumFp4wW9kI0WzJ4m96FVXuTGP2AgfRHnZaG%2FBFKi1c2ihxQsPG0mk6F5uX17tSqzgE5kXb8w&X-Amz-Signature=7805674b6e33d5117f7bb6cc7e170dc463827961fc315162db9690c9047f2cd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R27ALDNR%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCgBZ%2FE41m0P5EFwTik7W242aWhfmkyWCaPyJLrFz2vIAIhALDQCrPvCwq2v%2FTPlEpzwg8KVPXXzEK1Yr7Db2gWki4HKv8DCD0QABoMNjM3NDIzMTgzODA1IgzdvR4QxHM2DVooJwgq3ANmlOSLn1Scpc4LoVsQ%2FBmmk1%2BSQPbBCnnu5hGMRLuqwBayBzvEwE4R4BeyrAdtV7Rxvr3K%2BfEGIc7kzjEbA3g1EyoCOcj9%2BrmjEUZqUUfWhHYCBATnxcVdqFxpc9I85z2U6Bze9eayxfSeDAdnRyMIp%2BUiZPfNGlskMtwgeWDVSwLgDJbYt%2BO%2B7ViHw%2BPnTDofgPIJTUlfRrSW9esR7ktsZVkR4vi0DRpjCtP6N5TBepbwtgQCZR1d4FoUm0NBXTR8nhXDF6DdE66Q2%2Fpkxrv0ECcv7LmrT3ruoRkGbjJ55ekfjQFsmFPhjsuUj%2Bdu%2FIRVsGsLBjmnw05MiWdlr43TaiR7ch3CkXiuI2EIjJiQQVFPy42xg7CKv1qZgdVLmpsLV9r4rcepOY46DfNtAGtLn%2B4CpWvbyarAutNZ10G7xM%2Bt2rUuXeP0ls7aK70CrN0rXgGh6maq5dpFPDPsAcce7a1agwlJf2d0I%2BL1W%2FxPYSLpnsGcvLFFE9kjOyud%2FGQ4AEhLnSKY%2FzB9ajki4KMkee0%2B%2BpFUaFgUnIsrKQ2dGcS1aGZivrsLd6xu8hGKyCtYV7Whs7lA%2BkUVFOnBLl5xa68wea8%2FNN8N2RD1jjhuctc2JEw%2BRF8tMdoTnzCxxpXMBjqkAYIvLd%2Bp%2Bp62iAjdi6%2B45a6yfkaCMifZSfJKeJ82vVLxuADlcKI0mOvV8vOjlMoN7cy7Nd10rL5hhe9fTrUuUHa4ChF%2BH80aedoRYNiSIpdV7rbGaLMRL4a6bogp8u334d4lEOjc5HBc3%2BHDC8BUumFp4wW9kI0WzJ4m96FVXuTGP2AgfRHnZaG%2FBFKi1c2ihxQsPG0mk6F5uX17tSqzgE5kXb8w&X-Amz-Signature=c6d1834673bb18b327f9b67bb5d15864fb33a2f56e6e91767597dfdf936776dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBIDBQNC%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCCX60w9dOtr8q45szl21WT0Qe7yXl5XktmmXXCcWI70QIhAJUbrZCALhKOWldsDEApeAd2TucpCydXjJtUgZHQA1ekKv8DCD0QABoMNjM3NDIzMTgzODA1Igxen7xJeztHxe%2BnffQq3AM31oGh%2FIkNcb%2Fm3u%2BhP3cct3%2BXyAs3EFn22h%2F3wS1mqHCalgQDE2K%2F%2Bwoc7nlW8AfkkXdxU8IWJytUeTPAf5Nk1d7sRWJs4gGb%2Fls86n6ugKpMf1n76kjAC0TkR%2F4g8bK4hoQvNLmcxfLJY%2F0Gw%2F7PBYIfENSvoXh37YJsmpKecMXmq0Ntyyef1BOWV2LZ%2BcajJSOsV8da%2BgkZSRC65T9VFyl0xuN0iAlsi%2FmKiYv6zNth1y%2FJeHkBy4CW6lzdTiHTI67f7Wv%2FRpgmu623SDNuj9kgs1z%2B81x6jQlDNnX%2BUNnuc7N65EWRbT3hJkeEgw22a92lMnPUT4Y0okGZ51M2YJVUT5XADEVbepLSeUuP7x4IgqF02IVvtj7tGgRsRxZPE710pne3mAPkN%2FQY%2F0KES8Qg3QdKFUDFKO5yVCqZko7274FeQyVDrccSKquT1qoFSleJgwgyZ4zIbyEnY14PQ3iuWzvb8Yutgc%2Fh%2BaLZhtZ2%2B46RfP3Bq%2Fi8Et2T4UYyiBoAyo%2F%2BYJYum90rU7gu2%2BzcDM3iX2rAtZYQCfCMLVl1s50KvkdMy3J3Dz5O2zvVm4hPpKPAb19jpXyD1y3t%2FF5fGTRdfRxSaX%2F2ZM%2BD2Rm6%2FkXzapIZVrPDrDDTxpXMBjqkAQaxjUQHey%2FguA3RkRnyr2%2FDYeM0WPhGA5DD7CdwUHFJKn2glPZ7z1MqBeRkLibUP%2BBzhFhB2aWZovgTjv4GFzLTv5zqEpBfoDhGYe3oyN%2BCb52HAUyq3SQhKJLADvziMqK2m3Jxn7JBquqGyXODChxF%2F9QjQaKqK5N%2B3L%2FX8PHaKosn7LIciexPP57HvnjhN0tLWo0lU0H1mQrvAoxupUG2vByj&X-Amz-Signature=cfecf9a3ffea4ad9db34cca1212ba18236d9f1166a5f0244f5f61e35a3105dfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JGOARNL%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIDrsj3WCu%2FPYFqRotjWpdoZ0LDWQwcmkr9y9RH8dx8vjAiEAuxNROu1l%2BAkmLx2zB0g1rutFYRS9wiUYSEp%2BLGmanYUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDPsg0m1iE3EX3gvBPircAxzfgdqWIKwgoleGNLinZEYAmiEuS1VzKKnJNLyWUqsHUb%2FYGlSgfmlgA6TMYpmVnx%2FpP48R0rrAo9MFxq8A%2Fu3gQlU4rRMrYc%2BtUHROIQYxyPa%2BIUmGjH%2BP%2FZau0Ql9IxpeatIwvH%2FD4SMZ1PGcZmU1oI2QSdrqjdcKns68Igs31l1amodTJCBF7rmRqnjrBHYv2jJXnzgbm0ES41Xbcv7ND5PmJpGZ%2FVaw7%2FE5Tg1q8q7Ov7sk0lz5IYEGQDqYx8AeVeqANEjBubpZ%2BbDPkyCEC6k2ACGXuh7GjakBBDTkZcDBa6hGC1Xq4YI0E3AWby5kYK2odQpfVBXbN0%2FconhpJOILxVkowIPn6mQTVH4Fk2aluN%2F9%2FU6cEe9phZGI%2BdGdthbFHwfBFYUJ5tEZalsxSM34kFa%2B5mXD0wV3iJBWZuLzbwBHeiH5XKnDSKXzyoM0kwFdMRwFM5CbL6Hey%2FINbs1w3yEE7POTSZJEKlArEsZVkXrmmJPVg4GMR0WP3hDUWbk36FDHixh8WH6ooTXMAONhvBxGMxkAnms%2B8p%2FSqfZ60PfVeFRoT3M6%2FmdWH8yJCfRLNAGBSeQadabmUpTxzUscrzgmb4tjwb2HgwaDQhB6cPykUL%2FGN6YCMPzGlcwGOqUBF0nkKdlMGLoRprS8P8FtN2ji3Ox8igOGNjqhFDB0mproFYqrZkof2lO2NKZALXE8GjSi6CQGi78QxiugLxEyEMZt95dzS2YnfIl%2BgFmHiYS%2B5HIKjZgZbhzUSyo1w%2BEQEFOoUv9vsFz13Wsy4EG1rl6NGrvi6YI%2B6TAeTgUb%2FENHccLiNzoexe0HB%2FqA%2F0yFHH%2BZBQ5%2B5cNtZiPxQgMR%2BrdC70cc&X-Amz-Signature=50e19f784c1eebf2fe3009f12d04e24ab0a0f947b81e52268bbf0a1a21519078&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JGOARNL%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIDrsj3WCu%2FPYFqRotjWpdoZ0LDWQwcmkr9y9RH8dx8vjAiEAuxNROu1l%2BAkmLx2zB0g1rutFYRS9wiUYSEp%2BLGmanYUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDPsg0m1iE3EX3gvBPircAxzfgdqWIKwgoleGNLinZEYAmiEuS1VzKKnJNLyWUqsHUb%2FYGlSgfmlgA6TMYpmVnx%2FpP48R0rrAo9MFxq8A%2Fu3gQlU4rRMrYc%2BtUHROIQYxyPa%2BIUmGjH%2BP%2FZau0Ql9IxpeatIwvH%2FD4SMZ1PGcZmU1oI2QSdrqjdcKns68Igs31l1amodTJCBF7rmRqnjrBHYv2jJXnzgbm0ES41Xbcv7ND5PmJpGZ%2FVaw7%2FE5Tg1q8q7Ov7sk0lz5IYEGQDqYx8AeVeqANEjBubpZ%2BbDPkyCEC6k2ACGXuh7GjakBBDTkZcDBa6hGC1Xq4YI0E3AWby5kYK2odQpfVBXbN0%2FconhpJOILxVkowIPn6mQTVH4Fk2aluN%2F9%2FU6cEe9phZGI%2BdGdthbFHwfBFYUJ5tEZalsxSM34kFa%2B5mXD0wV3iJBWZuLzbwBHeiH5XKnDSKXzyoM0kwFdMRwFM5CbL6Hey%2FINbs1w3yEE7POTSZJEKlArEsZVkXrmmJPVg4GMR0WP3hDUWbk36FDHixh8WH6ooTXMAONhvBxGMxkAnms%2B8p%2FSqfZ60PfVeFRoT3M6%2FmdWH8yJCfRLNAGBSeQadabmUpTxzUscrzgmb4tjwb2HgwaDQhB6cPykUL%2FGN6YCMPzGlcwGOqUBF0nkKdlMGLoRprS8P8FtN2ji3Ox8igOGNjqhFDB0mproFYqrZkof2lO2NKZALXE8GjSi6CQGi78QxiugLxEyEMZt95dzS2YnfIl%2BgFmHiYS%2B5HIKjZgZbhzUSyo1w%2BEQEFOoUv9vsFz13Wsy4EG1rl6NGrvi6YI%2B6TAeTgUb%2FENHccLiNzoexe0HB%2FqA%2F0yFHH%2BZBQ5%2B5cNtZiPxQgMR%2BrdC70cc&X-Amz-Signature=50e19f784c1eebf2fe3009f12d04e24ab0a0f947b81e52268bbf0a1a21519078&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKN65UA3%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T050822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDeQPva%2BuLvV%2BzSkt6WDO3MIQW3kOEn8k%2BATyIHwN2UKAIgbyWp3vYPDHPaQbdXdYn16%2BMMhQ0sbDESyv6QUwIG2mcq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDFiEvB145VY7dlVTyircA%2F%2BoZ6%2BK%2BSejZPSJyQsD4DoxD%2BSSaJbu8FMBn6sb4%2BL0u%2BsxIsnF8epOWXxGrpqrUGoK5%2FGKHd%2FXRh0%2BAlGr34WGR8ITzbGRW0viP8Z1uftVZqYxuy%2FgHUfM9YbJThwtYrAzijfkNjP19T4YNeJDxap%2BoH1s4viY53Ys5%2FZ%2Boc8UhzhicO4QEaRDn6Pki%2FBiqS%2FIfjSaeAEbCsBV7rpj96uJLJgIOj6sSqQfSN8TSSTty6%2FcGNALGaOoijsVRP5IvGreT9WWndZb517jAdu6rVUlqPLCowIrva0JDAYdXBKDTg6oCw1zQ9Ye6Y3IocobLQkj9w5n0A5Y%2FAF3Q875hHudr%2BFkWGSn5376juDdP%2FNm5xMqqo7OCLu6F9Wf9CP3m7nyhyVKYFyaUO32qaTMjG86x%2Bwm8%2BwUXwc07pI8Z5clwF6ut8DKAYXAndRavXAWXoPb8JDVHo1ZhIzf7amfi2hYvIFSBGB6whrrRImdgsGbbGgB7uaopEsvYkMA4eZdjlAWsWVJdrcPG1lCQRD85rlHwlw4ZPUJhnCAPQy8IMt95Vg%2BGXZHXs9sZeSivOyBInzMV34JxGRLsztZx72TYpvov2o9LK%2FWyi4a4LfMIEgCkQPyz5ZklypBoKuKMLPHlcwGOqUBOSWc9Ls5Qpihy%2FfvqUXiP2h%2BgoRPHuT%2F7KOmLo4GI5%2Be2E52kKsKlnDGsgtfV94xHvqWRPUwf%2FTs%2FuwhLWhxoMVuzAIfnCxiJORJc0c%2B3i1f7c0zkeAQ1n1mipvZg9NUN0nBS5o14ZxE8qvj0U0Ahd06YbQPsj582G6%2FmY89g65F0dA9E%2FIMYv%2BAFAbwwTrqLx6MdWnoNvuUCBJp4I%2F2WilNGQTu&X-Amz-Signature=39ce483a8cd3c72ca7fffa509fcb7208cd10cf4f3b92f6e949985150fa779d79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

