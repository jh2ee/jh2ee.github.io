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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOWAL7GU%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQC0vH5bvS0cyYQ54a4D2%2FMLHazAAuCEq%2FYTek9q0BUwkAIhAIStPj1tO6JCmiIOolsywG61DIL81ZOBTAyral57thZvKv8DCEQQABoMNjM3NDIzMTgzODA1IgyVUfIjHeZSYsEEfBYq3AMn7QmVIHmu3n7YUrf8gyu8wXc3wq%2FtoF3Gmo0F0WXiwOtbXepexRJH91QNC95U%2BNwT6LwaORRjgxM0Oyw71vJ5GfR0PgVLx0EzNjJUmQVIHZs%2FbSmwsvHogu0sgi957Nd3gOjPVxkY3F24I%2BxI9Q%2FVeCCL%2Fs8Wti%2FzkOqJxFo%2FpM8sKWbzId55CjuI1P57AUpuY%2F%2FqhnJK9Q3caAZWjX9GwSIuDgOvsEhq7zKj54QrYGlIFWd02tt%2BB2LVknAWhQNDKMmgVvit%2F9PK8Tz7%2BeTaulASPXSFC7Ul2xpgIfNetHvQ9eM%2BGsapYTMdHPNFHw4vEFJPzdLQTMiJE29t6PKmdCXu1g6bdQuuF%2FzH8C882moyj6Yo8EkvYVJpqQ5WwPyMCFh5V4aHtOkE5vQV3NnWIL2tKjd4dc6wAoH5GLR2e%2F%2BzPhg1AuJRoycXJXJoeLYQXzr1cKMRsYtgNqH20%2FK32NQ8h8ry52NTiFUIAeux1lHxjeQ4Vn06Cr3If%2FJ7uEiPgxszT1cVmB8JLWHe4SNYXK%2B5RvuHE3hqKrlpHEXqoGlum0%2BbiOaIkO%2BCUX%2BSLBMsPKQS9cbf9hIDVeNbZeroXgfh0CzlyyWvqaPaOElpqYfjECioatVWQ%2FUSXzC767%2FNBjqkARzqwkAZ5J8%2FOruqdzhsegzQZ3KzTRpxcZJRRU0CxLcQflcleDETCKK8%2Bg3sObhDhvjEL2IdjddS7cW3al4nqGBdS701QX6vfrI1EQjWKjO9bNh8IEUB81cGTiTT0elvB6svETBpi%2Ftj4zMBZXYH%2FRuQ8RoVrkkFGveJ5xYEZCAgfHHubBoT5CzYBehxF%2B%2F%2BZWEezCaxWNaR6dpoaiHJg3j6L07U&X-Amz-Signature=1b5034a1e08c33cee8db304d00617b19ebcf4564166a9a175b83ab116a409feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOWAL7GU%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQC0vH5bvS0cyYQ54a4D2%2FMLHazAAuCEq%2FYTek9q0BUwkAIhAIStPj1tO6JCmiIOolsywG61DIL81ZOBTAyral57thZvKv8DCEQQABoMNjM3NDIzMTgzODA1IgyVUfIjHeZSYsEEfBYq3AMn7QmVIHmu3n7YUrf8gyu8wXc3wq%2FtoF3Gmo0F0WXiwOtbXepexRJH91QNC95U%2BNwT6LwaORRjgxM0Oyw71vJ5GfR0PgVLx0EzNjJUmQVIHZs%2FbSmwsvHogu0sgi957Nd3gOjPVxkY3F24I%2BxI9Q%2FVeCCL%2Fs8Wti%2FzkOqJxFo%2FpM8sKWbzId55CjuI1P57AUpuY%2F%2FqhnJK9Q3caAZWjX9GwSIuDgOvsEhq7zKj54QrYGlIFWd02tt%2BB2LVknAWhQNDKMmgVvit%2F9PK8Tz7%2BeTaulASPXSFC7Ul2xpgIfNetHvQ9eM%2BGsapYTMdHPNFHw4vEFJPzdLQTMiJE29t6PKmdCXu1g6bdQuuF%2FzH8C882moyj6Yo8EkvYVJpqQ5WwPyMCFh5V4aHtOkE5vQV3NnWIL2tKjd4dc6wAoH5GLR2e%2F%2BzPhg1AuJRoycXJXJoeLYQXzr1cKMRsYtgNqH20%2FK32NQ8h8ry52NTiFUIAeux1lHxjeQ4Vn06Cr3If%2FJ7uEiPgxszT1cVmB8JLWHe4SNYXK%2B5RvuHE3hqKrlpHEXqoGlum0%2BbiOaIkO%2BCUX%2BSLBMsPKQS9cbf9hIDVeNbZeroXgfh0CzlyyWvqaPaOElpqYfjECioatVWQ%2FUSXzC767%2FNBjqkARzqwkAZ5J8%2FOruqdzhsegzQZ3KzTRpxcZJRRU0CxLcQflcleDETCKK8%2Bg3sObhDhvjEL2IdjddS7cW3al4nqGBdS701QX6vfrI1EQjWKjO9bNh8IEUB81cGTiTT0elvB6svETBpi%2Ftj4zMBZXYH%2FRuQ8RoVrkkFGveJ5xYEZCAgfHHubBoT5CzYBehxF%2B%2F%2BZWEezCaxWNaR6dpoaiHJg3j6L07U&X-Amz-Signature=1b5034a1e08c33cee8db304d00617b19ebcf4564166a9a175b83ab116a409feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633K2EYLT%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQD9EFTdOMJ%2BlpuZQ0DubQGDK%2BTM7%2BDIHj2RAce1YW82oQIgODYU1xCuPxX%2B%2BsivuPyynwc05%2BTrwkdGwEAMROtoqAMq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDJ0qhNUowFA%2FPHOlBircA%2FL3yHv8fVegEXKT4DAWPbkoWu3IJSXYNrEFD0wudi%2B6JuZAgO0OkUbbDefDHP2cGV1fnafQ48GdrtcW7Me6WOB3HVhdkZHNZL3w6Cd1STawEHgM1Bw6wCFZdmQbuhQsej080FspIg9ncMB5%2B%2BE5fkGzS1IWaxe75KoEx9vWYQ9AulcagHLr7tNOEjMfGm6uloaj8Zv%2BKXza366IifEjxK24vtRXSKzlAxqVcLjuoFILr9coclMBqQ8C%2FetkPH%2F7Zu33M1rnMoOhB5z2u%2FOW8ojLyd1jREgHsHhtwJ6Uoq5sklj0S4x5XMzMOuNyMKSTuOcdyOmQ%2FjYj7XhSYDkCdVriX6OMyEl5m7KS5TovGYnFxTSaEqxgA%2FZOJcTpzWlVrfh0t30pvnbqA%2F8A6vISeC816VqmTlWaqeGxrE0NacPuoL0ixE3GjQKftq8HtrZ61pbUnplBIC7sIxK4T%2FxEudihv1XsEL%2FMKoPdAWLz3W8FbX9f6qzCxIGUJccbi1O1oElsNMBzB41U4kcLz0Fg%2FjJ4QUS%2B9j0zkdxU1pPEi%2FxDasLpGYmiGZL%2FHRrYmAwmt5PZBSA1K%2BMbV4iv7SNtCbaPJIRppsJ%2BJo0WtG4x30%2Fag8%2FfYRurNsICC36BMOXqv80GOqUB5VNq7KBaaL9B70uvKV%2B1k1l5ya7VIRpkF94obOG4Tc7f2JmTfzspfCXCIyyh%2FV%2FMNdGFwwFCQMv20g4lAzqDK4B67%2FgRjKQM84cSUNN5ZlmRXClogeg%2FW0ZXGA0Vy7HRwTdKHconVuIU8zWourGeVnC%2BvICdK4MTUrAv57WnTPSQbWQnQoAFZ16XhDOyW83zjP0VGlcnNLAenxN4o%2FrKLLuk6jAi&X-Amz-Signature=d29e724513a693cbbf4d579f4758a1cffba60976e4e2bcfd2186b6c7d3455615&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YYQU4YJ%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIHmWutnrQngwqHwTqSDjeMi%2BLe2hxCbeIq%2FBKDBq06lwAiBmIN4gQXLynomIXvAASVMVUsZidw3DCpIJgxQFW5x7VSr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMi%2FFkV5D0Km0QYCAIKtwDHKZnCFge8eZRfyAGJR1j9c%2FaP%2BnI4qO0JJ9YMoXz%2BhWlshzukV6RucDw%2FtuWA5BVEHU0zhvT%2FHkI3cfoHMvN%2BDQjDwZdcFMo6we7tePsbnw9mbQaOQ1BPJogtO7kWMFyv7zdtjKaIxTB9lXDhePjXn1n0Q%2BimB4sh2kuu4wFEfwJqzi4Mc9PY%2FqpkDmGttn53hnrriWApWdeQsasmxfb%2BBiFswPIafZpz%2FVJSJp%2FxxUE2nO5nrZoWUGhiPk5KaezYsz5iD%2FV9ozj6pX%2Ba5LcWAlmSc69K9gy3MpV64HJU74qOXs%2B1l0%2BDF0nyy6r7%2BFB67QsLBqQi3jQJdb7rn%2Bo7K1hyeMp%2BVK36LFTuxennz9muZ2IABnPaqBn%2BP0HfaTX7X%2Fcskqt%2BS9tr42SX%2BaU80Drmlu2EI%2FZ5a4LokhRXFfefAhGCSquPGacAUMI%2FzC2okaVciBGLgl8C58NSn1ZbIFRh0rVfZRrifEUNu2CbmhrKWg7mgmCy9bPRqqRuYhUHr%2BKUijYPuMoMQRA7pX5bEcjG3jjuAkIOoVA8araYbLEsJLWrEmpA4ag21xICmI8HheK%2BrGWvU%2BpT6iHvjl6UM8QaXrIGr2qDdW8TfZnpBel6cj22lXiAfHltRkwjeu%2FzQY6pgFsleYzdTfJTA53KEemaNdaZCrIptlGF2rnfEQD6DcsZ5sIz0UoWg82NLY9Ln5riqezFL1SkQqxYhX9GqXqv3EG2zk9D7mvpLVV2S3UN81hrdDZCJY%2Bl42NEV0a5tWLhmBpPmEyrFvM%2Fnq%2BM%2FjDufYHPTQMAtjPdnb6l5fOENZQhOqAw7srMELJR%2Fx%2BjkHpGJB3WnloPfDVGTnzsScYDNIol%2Bi9YwCT&X-Amz-Signature=eafedb4fec9e0f853c73df259457ccaae3e53451cab4d914a686f9316c21f92a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YYQU4YJ%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIHmWutnrQngwqHwTqSDjeMi%2BLe2hxCbeIq%2FBKDBq06lwAiBmIN4gQXLynomIXvAASVMVUsZidw3DCpIJgxQFW5x7VSr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMi%2FFkV5D0Km0QYCAIKtwDHKZnCFge8eZRfyAGJR1j9c%2FaP%2BnI4qO0JJ9YMoXz%2BhWlshzukV6RucDw%2FtuWA5BVEHU0zhvT%2FHkI3cfoHMvN%2BDQjDwZdcFMo6we7tePsbnw9mbQaOQ1BPJogtO7kWMFyv7zdtjKaIxTB9lXDhePjXn1n0Q%2BimB4sh2kuu4wFEfwJqzi4Mc9PY%2FqpkDmGttn53hnrriWApWdeQsasmxfb%2BBiFswPIafZpz%2FVJSJp%2FxxUE2nO5nrZoWUGhiPk5KaezYsz5iD%2FV9ozj6pX%2Ba5LcWAlmSc69K9gy3MpV64HJU74qOXs%2B1l0%2BDF0nyy6r7%2BFB67QsLBqQi3jQJdb7rn%2Bo7K1hyeMp%2BVK36LFTuxennz9muZ2IABnPaqBn%2BP0HfaTX7X%2Fcskqt%2BS9tr42SX%2BaU80Drmlu2EI%2FZ5a4LokhRXFfefAhGCSquPGacAUMI%2FzC2okaVciBGLgl8C58NSn1ZbIFRh0rVfZRrifEUNu2CbmhrKWg7mgmCy9bPRqqRuYhUHr%2BKUijYPuMoMQRA7pX5bEcjG3jjuAkIOoVA8araYbLEsJLWrEmpA4ag21xICmI8HheK%2BrGWvU%2BpT6iHvjl6UM8QaXrIGr2qDdW8TfZnpBel6cj22lXiAfHltRkwjeu%2FzQY6pgFsleYzdTfJTA53KEemaNdaZCrIptlGF2rnfEQD6DcsZ5sIz0UoWg82NLY9Ln5riqezFL1SkQqxYhX9GqXqv3EG2zk9D7mvpLVV2S3UN81hrdDZCJY%2Bl42NEV0a5tWLhmBpPmEyrFvM%2Fnq%2BM%2FjDufYHPTQMAtjPdnb6l5fOENZQhOqAw7srMELJR%2Fx%2BjkHpGJB3WnloPfDVGTnzsScYDNIol%2Bi9YwCT&X-Amz-Signature=42644f5d8968922f8199dbe823cb0f177f87f8a97f693eff32eb05b7eb174c38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKTOU7N3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCf9%2B7Gx%2BfiWPmanYlkMjYC2%2FQ%2BfMUeGsaKAX9lMPZD0wIhAPgYY1ahgauZdbtVhCNn3DvuMxzW1ohCX0G%2BSd23ErzzKv8DCEQQABoMNjM3NDIzMTgzODA1IgyPRRLFtfOlZ65SSUQq3APJDtR5gOCaZjQtM99FOYGEbTW5rNWIy87PEzvpwPGzXiz2kkNcGkMlw69GTbJ%2FFmkyYxnE0lf7tHjEfZh2eWWb5JrninTFca7HcOBGra4tOwyJUx93Q2WOEDtJnsxgwtvIYqhuvYmPcWWug%2FVseOGvkopKKn%2Bg%2Ba0xj16ipku0CkT97btN4og1iX44FkP5oheQiO0ruojzqnN4FdsX29pRFgVSR0ABznUicLCNiVRFP8qbxseUfxILu61NggFasR21dfHYBMJcxMBEK3g291XFAaerIzbXwhRYd8rPWnR%2FoZ6Alnxm%2BkgVeWQVBB4VlME0eQOddVjD5eddO97%2BXPZ3qFQLEQXd79Nz5O0D33MDECOAilZliqEf%2FEYfG45LWxg%2FvRy9VWCtR5Ay72QnKK5j9ts7KWdaVIoM1gg3N7myNget2N6kLza9Q2nJdATUQzzDOWJLQEvCRBlzfXHcidTS%2F4iqMTasozLxO74tW0s0AcMVlnarOwiahIO3ia75Aitxppdec6H%2FgnplJThIdjEuqW%2FKD5YJnQiBuflIZqL4m5JexVGsCn2Gm%2Bot0UyYA%2F8D3CVoIPVQ4A8csMFMjWeSmXwGmOuJseBbVG7lG2lTsrihz05koF2RD%2BP0lDCT7L%2FNBjqkARRwTaa5SyPOYGl53%2BQVUzEgOpCk7brXfHDDXfglpvxpUTybWSWXnkxAOsZfMZo%2FysoeLMq1%2Bk7awiUsfxyAv%2BLRjDuriCT3lfClsFQmk%2FyIuEuEeOPDmIdSNYzobzY4dSxo64Ab9%2FkYWCn9GF45636QZ0MldqEPZM1dLdfN8%2FR0KQyKxVUro2KUlf6zZ07DX4AOtPZzG4SgcjOQQjM%2Fw8%2BdJWES&X-Amz-Signature=e53d7f4ae21ca85b90b591b917a3f268c0aecb4cfe2986127010302aa1086ce2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3MKRBD3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCTa33eiR%2BqMnCuZBTt3mUEC1OnDJjvcAg6SmZitHnNSQIgE%2FXvgeMViciejJTYAMaLkZfvZ7Jk%2BJLcHtbacN5C7mkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDIaX31k8PMBoaZTpFCrcA9jUFYsgSlEbCN%2BrmUHkHBcHKPWrfpDww69%2FOoC0hhtAJ7Ss5xEEArOJFJ8ONBsDgS7aK3oS2VHur9fFct4esJTk86oWao409aYi4pW6WNxi0XpfJMq%2FbRrAAkfM%2F%2B31u6MvIXOPv8iknxLQ3JKfdibdxD275DlTgh5yTEgNhKyzqe3dHyoDJcoHvw0ENg9QkG0FFNFD1vWyF0j8TS6FTbNHuCOvfZsc3fxhwoKmQ1w%2FbmvaPwSMA55xhwqMrxgw5xhlIY%2FidYEWxU3D9RReTG1oQDvYTm5V9NNTvhJ8c%2BhlrTfDo1kLUIwXwD6qwiztUeG6BC77xtKAkYtRFdAbGUEgpKJ9cjJSCI6B04MScnHBpEEa6aLoHKzKWICQykIw6RB8WS2F0%2B37wPg9DB9%2Fc5S6UaoVWDAWKiLm%2FiOnYIyGs0sYsAYo238%2BjG1vfdcNf6SARU8h5owu5K2LZzPupKUI6iAREdJaLKnJxV2CoA%2BKm%2FU1SUCQqfva6%2FMw3marXGgCN7mK6Yh7OWA8PM77DT8t%2Blq%2BNjRzCTA0qETJQgRhXbM4VmVOVHJ%2BnQwFs%2B0fe1orbBcqg6LLjbsyB3LNqbyBqsJGpI2doWexwMXp1AudRadxJQIhMGmKOS91MJrrv80GOqUBlIo0kJ6820Zm9zr41d7FU0wfJ2WRAQl4evlHN6kQP7Ey6J2P4aio9zkUsxaO4CjQJro3vNjgMHnXKMVmp3eW3sao%2FlKmGdfprxHGSO9XxM7XeINqC5pcABhwOEEL0frLqBMXkjP4rgzJAkFeA%2F310PIMklHOK0pcQ3UGi4ATeE%2F%2F3MYYjRJe1IsClRZnt603DASEp4AdBbgW2xaH3kmMqv6JPR60&X-Amz-Signature=1c947c1cd110a55e49c81c93fd26f58257269f71a35f4bea9b8e2db8e0b110cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4O5RI3N%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQD2wrDP7ht75pt93ZxowbgxS%2FCtAHu5YC%2FETjx9sQlJzgIhAJrXaeJ2Z6GU9Ts4UONfjQlMqsydUaLI8kK7JgISUPKLKv8DCEQQABoMNjM3NDIzMTgzODA1IgyNDOXMV%2FrL0Wxj%2Fokq3AO%2B21aRFq9oYHAGiCrVVMqaDj3WKMDVvo67cOZ0wpl1TYnTHDpKOwfJST0IfuhFO3Sb3CNsRO2xLzS%2BOdrmwGG4CRhI9fbXGQGJt38CjdcqRzG%2BuwqRyZrZE%2FU6gq9B%2B8ls662xRjyr7RFKYycGzOJrxxG7VqHZAKuO1nZjK2CCzRazhFWUiHPy62viz7Y7c%2FdOpit2JCykej56bz5dtvBnznc3Ik0Sn8roe2rECy%2FRJXoxsjvC8zDbPCw2V8JUcpFaSvzUXsxqCCx0Fzx83AaGC86Sfw3zfI9MSJJhzj23jMYq%2FmkjICy7L4vbbAKiKjOoMvyR1Omu6YQONZvUJjRZu45wwvHLQQOyy%2B%2BbBk4eANf8nYbpE82uchmzeqs34obL2bXrxT2qp%2FTLnKmJssVXLmnchGhzRW45b00ev7Su%2Bq7e7AIpFEbTtKwv0kUuyoOY%2FK9w10arQL4iBqnHDElXUvpkm106iC00EI0D5i6q0K4GllQ0U1Z3MC9FrKjMFkVHQiM2pG0cOJFfMObUFHul02S2dum91k%2F3%2F%2B7FFgCO%2BK7wLttUSTLLPxMPQGihPnBtUuWnSjRLNsjYYf92YIZwaLSrx0oUXvq%2BXFmo6r5jNlsS1WVsQb0vaoaQjjCO7L%2FNBjqkAaQCRL9APcilfbf8mb8cg2MFowR7TSNj4bzbzVawk8HgW5Dim%2B%2BvJaBTT5d0mN5fi1BZvNgHSPkkhK%2FT%2BLqeYpCE3XTzssPHPcgV7UZHJ6yEN3UU0U%2FDZ5IdkOGuU8nwBE6sMxnBl63QwrF1YdOSB9Rim%2F94fwv3idPNkaRRwghvGi8sS2EmSrF88vI0xqg65labKG4r5yOYTBz8dI4GdQMspIvH&X-Amz-Signature=a04f922cf2b41db9d2b9804ef47de1e1ec570999b807f59195a5db93d6e5df74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFUCJL3Z%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDSBWky3RBOBAetVScaTqPCnOGGEdzTsWiRRbqToWfNaQIgKfdOwtbyU0mFlEPLD%2FL6VSPc0OqjnJjippj62KFfwIEq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDL4g2XuipZXHMan3bCrcA%2BgZ1n%2B4cRrOydPkzSuRoAScQ3KhUbfqpRrPcVuEYbMqkp8H%2Fzc2zzQt4QnhE%2Fd19Mi9XLDhxtiIZUQ%2BuKIyN6qCg%2FVg3vJ6ShezjVhfdEgWmJUsmSKUohkQ%2BEpyMwOSQHyuE4oYHYuz0sCHI9z9Un6UehjCv0HL9Q%2Bal7zbT%2FNg3OlMMjpwCu506ujzYf7apVcSKfZIh8C7gxCGCjCiMDYDhyNzmr6v1i7FunB0NDuES5zd7zm16ZEg6lUACt3e9acmEAUD5Wj7EWPlpm%2B41C3XrMqWHHPL1Rp4S4dzM%2B8pmYsBTlGo7bszlQw0qAHoadP97OFIaJoBjcifMB3C7reNr%2Fqsg6fab5FjRt54Dsqzg9iNj1tifVASE2DMkThEMutgpWyLpQjP3ai1Z6OFpUlYbey%2BuM8Vi6RPaOh6bx2MTp17UlFtgCMd02AIvtGcx4ca1U%2B%2Bi8SYbRmnDoPeyBJjVntjfRWZIF6i7nBkDD2uTigputUqdkIQzeFBFHYrNEqpIb%2BKiudp6iMYHx%2Fh4Zq%2BBhNktVf8qy0g1DP2wgI4J08lIUp152S9u4xZvirRgRQqqhusUU0gNY4IQ9Xyn82jQYRNgSH%2FkigE5VBn89Ku7NsZxbRNYwrD22gVMMnrv80GOqUBA7PyrT2jhEWJ3P6W8Jfa3QROHH5V%2Fv8HnXoREIE9yiShUjwXUafp9mfhTxvXbOXoyLIaHKFIGsC6ptzgPZFRLu0LqLYrb66gUGF9uGweMJn1G0BNvpx6IFpNzkh06piBsdwz%2FXO8ond4Z6jUGWi%2F8HWgJkDXslvnzTq4UL3LpcBWaOCkgVpSKSf8rm2uAMTSNk%2BBFrs9fE7JLIRZ6x4LO8s3TUjl&X-Amz-Signature=9ff58e0108b1e9c09274521557d0d61d60d88ece2f7e1932c1c97bd628487c13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFUCJL3Z%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDSBWky3RBOBAetVScaTqPCnOGGEdzTsWiRRbqToWfNaQIgKfdOwtbyU0mFlEPLD%2FL6VSPc0OqjnJjippj62KFfwIEq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDL4g2XuipZXHMan3bCrcA%2BgZ1n%2B4cRrOydPkzSuRoAScQ3KhUbfqpRrPcVuEYbMqkp8H%2Fzc2zzQt4QnhE%2Fd19Mi9XLDhxtiIZUQ%2BuKIyN6qCg%2FVg3vJ6ShezjVhfdEgWmJUsmSKUohkQ%2BEpyMwOSQHyuE4oYHYuz0sCHI9z9Un6UehjCv0HL9Q%2Bal7zbT%2FNg3OlMMjpwCu506ujzYf7apVcSKfZIh8C7gxCGCjCiMDYDhyNzmr6v1i7FunB0NDuES5zd7zm16ZEg6lUACt3e9acmEAUD5Wj7EWPlpm%2B41C3XrMqWHHPL1Rp4S4dzM%2B8pmYsBTlGo7bszlQw0qAHoadP97OFIaJoBjcifMB3C7reNr%2Fqsg6fab5FjRt54Dsqzg9iNj1tifVASE2DMkThEMutgpWyLpQjP3ai1Z6OFpUlYbey%2BuM8Vi6RPaOh6bx2MTp17UlFtgCMd02AIvtGcx4ca1U%2B%2Bi8SYbRmnDoPeyBJjVntjfRWZIF6i7nBkDD2uTigputUqdkIQzeFBFHYrNEqpIb%2BKiudp6iMYHx%2Fh4Zq%2BBhNktVf8qy0g1DP2wgI4J08lIUp152S9u4xZvirRgRQqqhusUU0gNY4IQ9Xyn82jQYRNgSH%2FkigE5VBn89Ku7NsZxbRNYwrD22gVMMnrv80GOqUBA7PyrT2jhEWJ3P6W8Jfa3QROHH5V%2Fv8HnXoREIE9yiShUjwXUafp9mfhTxvXbOXoyLIaHKFIGsC6ptzgPZFRLu0LqLYrb66gUGF9uGweMJn1G0BNvpx6IFpNzkh06piBsdwz%2FXO8ond4Z6jUGWi%2F8HWgJkDXslvnzTq4UL3LpcBWaOCkgVpSKSf8rm2uAMTSNk%2BBFrs9fE7JLIRZ6x4LO8s3TUjl&X-Amz-Signature=31f395df9e9fa7c28c71537b4c3125bdd517c921edfd7cc8185031061211fcc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DZKF6NN%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIHUpqcfqmtyM51grjyRDxbQsFabtDpK%2BixKGWM%2FDcJ1DAiEAwvuTnSfD7mKx6ZcXLFWDy2Igcx6AuCOWT52%2FI5dpmOAq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDBzPfqTG8Q3UuD7dpSrcA3TkEiEMqAfYnJVfrvgGHNY4mbidjraI6nXDVNPHuy88mDIZuktoEGLrJjVk8bWXPAvivYqYDAmD%2BD3ebPIvG4U0GkJ%2FNfgZfYXREBAz9CGNsuccsjgrVbXNtWIuS7BNEsSA0BHNNRQhzcQPxdAFjBNZH21Km%2BD1woLRBwi%2FBKedV5I1RlkIpr3oDP2kMyAp9svXRisjJT8Fkm1nduHd18Vzc22C0x7Ko4Txfac8SvzB3tTWNAAOb09k7dniMT%2FanOMTXcirLoiPstSO73Ost5KPNgx%2BJkeDWQ%2FGkhHX%2BrC0E4raGKs5SjLfmHpsS%2BG98wU9QedOv8ydJdFsBM3qZRC%2FgEkwJhmcF6OrnC2marBcQwp1%2FQmN8RTeRAyUil869krESU9utiGEeY31TAQLWfaLw%2FaKL%2FgVXJxNc%2B%2FwkLVoZHmuJeW0V8PfGd8kilPkZbIVGohhZ8ePgx%2FpTjWG2t14CfxYH1Poi0DMdtM71UVYgMrCaLdjgOdbOqKum8WCUQtr07xPqZwQqQFkVds7i5coEsCExXt1RkvW8Wx%2BwdLrzKEcyQieK2Mcy7NzgCQDZ5XRZIWI8l8xLGVeIsVjzo%2Fz%2B10d8A7c7NExM3t%2F5lWBpkAwfr5QFSnuiuJWML%2Fsv80GOqUBkjDb%2FLOT%2BFTK4HjtJGg3G4Pp3R4JYbmKkKN%2FBCSlAsrV56AbYjmO6ZrL3Ee%2FO3h%2B9qFvmNtdyrerk81YfLwUBYuadEoDOx1D5Z7u08oYRQzWO1nFPEp0bl2MEGlPYrCfHFZ7kWJcL9UMGDnJo7cAWAnNF4Xg0WI3nllWsRO5IeneXTxbUfnQ9tHWAogp9dMmHsXEomXz5EcmuxVx5V%2FEJouiEESK&X-Amz-Signature=10e3c2733092f6b06bee1db9bdaf913a94b3fcf5df4d8793bb99fc2faa7ac991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXAJDSDN%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQChe%2FCdaR%2FaLikzgovD1%2BkMrumbTcQ%2FhUD9n%2BMa%2FxIOegIhAMDHjFX3QZ%2BjWSIK5CpdJivJfBI5N3Y654vVp0zROJ%2FrKv8DCEQQABoMNjM3NDIzMTgzODA1IgxvyK2scVeA9E1RTUcq3AMdTJ7UfVtMRadVX3FfNJZWmK8%2BPVNXdJKZTU5hsnMpDaMGVfN8vHF%2BxDhmw0%2FMqvedjrqRcuneuqax86Z4s1p%2FSQFbNAeJASgqQOE6JDgU52Yz8BXDtNxpDMIRtVIaFEdz%2F9ZomFygnj27XtUk4OrzJUayHx1UclG1GoMLe8HwZSHR6F98pQyRifqdEw2Hy7NlgMXCicPNqO5V33wPIA2MDUM%2Bcz9lJ423lDypadH9hJN2NOpk2u2SiADCA%2BlMe1uUTlWAW5pPBBXTdpcTHdXz6ec%2FaA3PtEskyAeSnvhSjth%2FsEvxjvcZJm5mhaDgJo%2Bj1Z9j%2FWx420QVZd2xqGEuOcluVvuQXaB%2BLWjO7ODQB2FVyQD1q841WcEtm2J3n35km2rDWG4Y4kYwfwLCAp2HYmhA9C3ohVB1s5V2qERNDZKXWP4XHGL53xCfqrlpTt7XrjQL6S0UXqrQJG%2FliX6%2B79hyFnkTC2%2Fz1siytNVe2%2BtEG55DeX2UT0HNFdFkYHs%2BW8KJasoKk0MnAYVLMPUE1jSQGMclYio6ggKJ9zPh0%2B4vDg7fsBJ9eaYm7TAhQ9xkFAYBreoFXgvY1Sn0Z1Tvv4%2B%2FdN0OueA7gsCkCtNIYjbByfOzUTXfy1j4PjDt6r%2FNBjqkAYiDAfuah%2Fh8W4OZqKPcUzVFU6dOBTn6onuKVScA%2BE%2Bmk1JmTm9K5fhtrGQUd8sNX96lz8BRE4TKY0a2YGFVIK0frVR4%2FzKHplBmXZZhkdIFLbdHQOlZa9QBVVKTOML2gWeQwzJMo1XlWjp34PnxBZUAm5ZdgcbKNeH8nYGNNzciM2J5DGlimWKEoLWOGZHIw9rnm7zwCvOS3DSN08EB%2Fy5whS%2FS&X-Amz-Signature=daa3885a0d2988f0eb6c1d740b13699cddfd01461b7eb44ca9e5df65e04af971&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXAJDSDN%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQChe%2FCdaR%2FaLikzgovD1%2BkMrumbTcQ%2FhUD9n%2BMa%2FxIOegIhAMDHjFX3QZ%2BjWSIK5CpdJivJfBI5N3Y654vVp0zROJ%2FrKv8DCEQQABoMNjM3NDIzMTgzODA1IgxvyK2scVeA9E1RTUcq3AMdTJ7UfVtMRadVX3FfNJZWmK8%2BPVNXdJKZTU5hsnMpDaMGVfN8vHF%2BxDhmw0%2FMqvedjrqRcuneuqax86Z4s1p%2FSQFbNAeJASgqQOE6JDgU52Yz8BXDtNxpDMIRtVIaFEdz%2F9ZomFygnj27XtUk4OrzJUayHx1UclG1GoMLe8HwZSHR6F98pQyRifqdEw2Hy7NlgMXCicPNqO5V33wPIA2MDUM%2Bcz9lJ423lDypadH9hJN2NOpk2u2SiADCA%2BlMe1uUTlWAW5pPBBXTdpcTHdXz6ec%2FaA3PtEskyAeSnvhSjth%2FsEvxjvcZJm5mhaDgJo%2Bj1Z9j%2FWx420QVZd2xqGEuOcluVvuQXaB%2BLWjO7ODQB2FVyQD1q841WcEtm2J3n35km2rDWG4Y4kYwfwLCAp2HYmhA9C3ohVB1s5V2qERNDZKXWP4XHGL53xCfqrlpTt7XrjQL6S0UXqrQJG%2FliX6%2B79hyFnkTC2%2Fz1siytNVe2%2BtEG55DeX2UT0HNFdFkYHs%2BW8KJasoKk0MnAYVLMPUE1jSQGMclYio6ggKJ9zPh0%2B4vDg7fsBJ9eaYm7TAhQ9xkFAYBreoFXgvY1Sn0Z1Tvv4%2B%2FdN0OueA7gsCkCtNIYjbByfOzUTXfy1j4PjDt6r%2FNBjqkAYiDAfuah%2Fh8W4OZqKPcUzVFU6dOBTn6onuKVScA%2BE%2Bmk1JmTm9K5fhtrGQUd8sNX96lz8BRE4TKY0a2YGFVIK0frVR4%2FzKHplBmXZZhkdIFLbdHQOlZa9QBVVKTOML2gWeQwzJMo1XlWjp34PnxBZUAm5ZdgcbKNeH8nYGNNzciM2J5DGlimWKEoLWOGZHIw9rnm7zwCvOS3DSN08EB%2Fy5whS%2FS&X-Amz-Signature=daa3885a0d2988f0eb6c1d740b13699cddfd01461b7eb44ca9e5df65e04af971&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYLXIUEO%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T112254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCa2LYNJS0%2B5TRoJ7QO7TimF%2BoFDxtP8d0ykzEADmzbYgIgOs69zcEQsiQQ1bjvjpyABz5iaXmDUD5zpM4f3Fu%2BLTAq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDGA%2Bpo%2B%2FbWoTn7R3sSrcA1Zod4Qqk%2FanhCQpLCO%2F%2BUNgYLQE9r7%2BhnZOnQ7%2Fkaodz9%2BRHWH2sqVl0pRMjxYinZxW%2F7r0nqDogXlUQjaG16RiABLPsPOVhyC8NrVdiOoI5yLuy7MAASYLm7j4jp%2B57xL3FdfkOydLblAxzYc9fFPW6sT4RZKC2o%2FZdEz9Z%2BaAb2xuY21tU0S0eZa8Mom2mcqXosGUL5eTNvJCu%2F3jWMdIVVyTCgeDYNfYEfFQT6zwEpD5Y0x%2FQ7%2FHnlajMNq%2Fz97oYIgpWEIhqEZC1MtjPnqsYZUVCivNPlZM7R3KsYybXfo0kI08B2nkCbV5ldDUQnNfVsVVU3UcSlffv920apya%2FfRy65drDM4vuggcBDjfHJL0lj8UncZ9cE%2FzohjXYQfmiASHt0pc4vxl0hbwsnUy7yBEFxfOLKHTLlYOgekSpg5ObgjkDnGtIjhQrFa9kBnYDHEGsCogv7fguaaOtOgwLOv7U1y7N8EKOT07zgkqb9aPRXT7fmyi262hIcbect3j%2F%2Flj6dNcg3d08mA4ekWxjUSLOo722%2BigkRjGD23Juq7%2BRxYlrp6TYLjCYTMEe4zX33j8yqUUT4C6RHk4Tz0zTl0FZfMn4jsgxYL3v40yaPE8D%2FuzjbHC8yONMJzsv80GOqUBt9gtrM%2BP2O9SYn7PYC3AWlW4rB%2B687wj8pb5GobYeGJ4dJuxSb5xEubhbXbgeWdr6L1NTMgfkf9dVTCWKCayRyiPJDTy0%2BRAuLVYFwvhAJ1XqILdDIF8wCRmvdcN24WkCDlXwyUmmRY%2BRwAJAF%2Ba1Nn7Jd5sf5Q24LiutfwDh704FB2enSWr9xuGD1fjsnEj2kUzTtcr6kXQRG9FE8Jokf%2FgUCWm&X-Amz-Signature=99d50dc5d3fa02e35e27b3ecd807a26b548ebc13a88d2d7ad92d8d3566887fc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

