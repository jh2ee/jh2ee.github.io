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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZMCRCHH%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICoL%2BDddvZb5xTk%2BB2at4iA43wUHTmGx7I3RXY0aSSYzAiEAiXCdF3%2FC12ir%2F8pWhwG6nwTztllPztXfIM%2B7S3gaCoUq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDGmNqbP0TTH6ijKltyrcAy%2FTh3V35gz4BxxDC09D%2B5JOtWvlabH7vuo%2BjALyYJSVOCd48JfEt3tx0oeQyU1a5o1EEzNiIa5Ved1GepQ2uhMPvFwOcyqflMX1XjPNPdbh8yZMxwFlYWH%2BX2mP1E8B3vpRgXgVmOqy5gLlVVz8IqkYeF%2Bk%2BssD7FgIMhgcQ0ux416%2BBwMj1N8UmQqniajG9wv1eLlxyeRwwnpAntPfOV5M%2BCG4C0lJOf4L5cxReibtW8okLFcjsu7QlM4AwACjLWbasEJaueEjswbBoFAPcy7OWp1D4MR2mfsH14bs80XWz9nZY9ffgeH98Xiew48%2BjjPeolVlQNGsrpXTqAXy3S2c%2F%2Bb6fyXaUh%2Bpx%2B9%2FYpisoFNnKlDOpYC%2Fm%2BUqSDxzmIUwzNG7%2B0cynyreccniiE7bNfpgA36zeN5T%2FbWBrobteFuMa1ilG2S2wW74TGS8MN%2B0ueTNK%2F8kWssY6PGFDZ%2FJuVGjClU%2BJnzQ%2BEkr0XC2OlXLw84Abua61A7rgMwOuPErBZJpdrKkiOp6HixYsSHxAfxhPHYl2Qv58rhzDhE3o4%2FGsX6O9MYvEqkJBLgxMqOuvaTidchVRWOI0RdhuMuXha7JWxjJLeUmyHeJ6H%2BYPs%2FyjMDdBU9wdOEbMO%2BVx80GOqUBXnnh1c7dFU2FKOQwtEBk%2BRBNQjoSIcNG17soEurqKPgFlgiNyIZ%2BuK%2FAzZcDil6Umo7t0XTory99VIj5C4K11xgvIfh7s2prita5lMDfZkjGqt1AT85HC4Z0hdNSu6vFfCtzXW4B0E1mXXK6Q97MXYRNo7BtY6518DN8u1RjluCvFj2EJiQFmE4lVhWZQsL3M7mwHGh8tyvFlabndc%2Fdxz6%2FG5NW&X-Amz-Signature=06020b6419cf3c641a3e343fe7a84e9b5fb0232c8eba5328c82bf3dd4af5dae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZMCRCHH%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICoL%2BDddvZb5xTk%2BB2at4iA43wUHTmGx7I3RXY0aSSYzAiEAiXCdF3%2FC12ir%2F8pWhwG6nwTztllPztXfIM%2B7S3gaCoUq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDGmNqbP0TTH6ijKltyrcAy%2FTh3V35gz4BxxDC09D%2B5JOtWvlabH7vuo%2BjALyYJSVOCd48JfEt3tx0oeQyU1a5o1EEzNiIa5Ved1GepQ2uhMPvFwOcyqflMX1XjPNPdbh8yZMxwFlYWH%2BX2mP1E8B3vpRgXgVmOqy5gLlVVz8IqkYeF%2Bk%2BssD7FgIMhgcQ0ux416%2BBwMj1N8UmQqniajG9wv1eLlxyeRwwnpAntPfOV5M%2BCG4C0lJOf4L5cxReibtW8okLFcjsu7QlM4AwACjLWbasEJaueEjswbBoFAPcy7OWp1D4MR2mfsH14bs80XWz9nZY9ffgeH98Xiew48%2BjjPeolVlQNGsrpXTqAXy3S2c%2F%2Bb6fyXaUh%2Bpx%2B9%2FYpisoFNnKlDOpYC%2Fm%2BUqSDxzmIUwzNG7%2B0cynyreccniiE7bNfpgA36zeN5T%2FbWBrobteFuMa1ilG2S2wW74TGS8MN%2B0ueTNK%2F8kWssY6PGFDZ%2FJuVGjClU%2BJnzQ%2BEkr0XC2OlXLw84Abua61A7rgMwOuPErBZJpdrKkiOp6HixYsSHxAfxhPHYl2Qv58rhzDhE3o4%2FGsX6O9MYvEqkJBLgxMqOuvaTidchVRWOI0RdhuMuXha7JWxjJLeUmyHeJ6H%2BYPs%2FyjMDdBU9wdOEbMO%2BVx80GOqUBXnnh1c7dFU2FKOQwtEBk%2BRBNQjoSIcNG17soEurqKPgFlgiNyIZ%2BuK%2FAzZcDil6Umo7t0XTory99VIj5C4K11xgvIfh7s2prita5lMDfZkjGqt1AT85HC4Z0hdNSu6vFfCtzXW4B0E1mXXK6Q97MXYRNo7BtY6518DN8u1RjluCvFj2EJiQFmE4lVhWZQsL3M7mwHGh8tyvFlabndc%2Fdxz6%2FG5NW&X-Amz-Signature=d3591272b14f27f22aa4579162bc7fd9823b1bdf148a0ea4c0f3812f6a8a6c9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FPZ3JFZ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCbT6RtGvWk9F3NOua9B26J2tie8gtt1zPQI3hVgDti2AIhAJsyiyX7hx0tC6bBP6zN%2FEWS8mdFpkjxmWN%2FOjMS%2FP54Kv8DCGUQABoMNjM3NDIzMTgzODA1IgxBgd8zL9pmy9xrF1oq3AOQbOZfMecoE%2FtrX6s7%2FEgmRMCiVadXUfU6GCg3%2F7ymyIPWE0rG08Av8KLX7yTERxCOFmL3bZGKy9X41nAWQLW8%2BsGeJ4t039XdB2GYKYDzVGpTqRexrGdT8vzzGipzY7houFhtGLXY5NxK2whiZAi8GbvNdSMRcsVIOsfhu0Fd97cuWFlql3aYppsam7xYa3I2RDPgU3jLB7A2aJ39tS9VUjpzNwJFzVLV96VLpT6gcaLJGZ8pt1RXi7xcnspbMkXr8BqtqCkAR189JLbXqFApebTjq4UfI0%2FbjLOdWMev3MR8m6XqMQuSpQ0DUIjR0O1R6%2FYfy5A3tQTVn1rNSY285LhO1YGbkdWP8MrePUDzprylAJ5n9Kq85Ist3IZUps9vtjQmCsbcr%2FO11kG8cusDz6kiJ1gtGqhudb8PjCwISR1O6pC3fL%2BYZqEL0a7x7Oak5lfZHMXqqKenKZqs7MBlHCNLL1EMP5CxF1%2BtCoMfo4rDq7Zn77l98HkmJK0cZepg4%2FAuFWAqRPhjJJxCjUJVslsjxHph%2FXFOUJC7bn86v5r12ny8yOiiBnAcy5Z7mKfj%2F2JVuB%2FqVGyw7is9R4v3bspB9N84rbf5R%2B7AIISm5%2BqOESHftziatl8e%2FDDolMfNBjqkAbNyTqcx28eK1ITbpkHajOdQ3KHR73ySrCDmjMNsyE5EH%2B2IG1nflTrlKZ0x1GAt3Yom4gF3Rt9t498432UaE%2FZ2Hi9yNydkYDSY3wL1jvkVGiGYMbecGQVTMC%2F0TKQE2a2sWOonSom3zIMZWQhcffloJTRCbS26hORiqgk0vW8x2wdAYhClQ3aJL6tSGwOWY1ncaef3AQPWoEnUQW2pB0wh8ie0&X-Amz-Signature=8f32a35422787dc99df5bfda7683ec7c2549e69afd5ded7679afcf346dec5372&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSCEPGYD%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwLGghWLi5ut8kyb7TQsDtaAjSzNMoUHrIebb0Vu7YcwIgP%2Bzaa3sNsTZZpf22mR47tkBum0mj6sEW%2FdWE4hiUap8q%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDJ9GhNih3xhSUXqZCyrcA2nRd020OEGE%2Bh4qo6qOowxTqM%2Fcr7p7plJrXFUsUYJbn1daKh7CmU7eLWjgWH%2FzIok7h3dIvMLmfBn9%2FChnXDdCr9PoE9ndrh6izL%2B3xonmgywc0TcNpM4YHa0DcFNVfgM1gTla4lSz%2BpQRBcEBgL2jL5%2F0P0TdFKrscB15HAcHLl4V9EDPlN2LzJ1uCp4%2FTTCy9kkdedSu8%2B3pHWfekBr0Xchrg%2FUJDEpCEUNt6ySzDq7iTHbfFFwPzkoRQwVtsyPqT91xkqvV9DlmzPJ6JDyWu01rOrnmliLmM7PLw3yeg4dUeCuTvFhXXJqoaur3SEfRoQI%2B5kiz%2BvB4YEBHn04ZllzO4xhVduvW9q7mvNgWwbSMt0Ozg6JtcLTcv3rnDQYHMoG2NX4jxxWvO238XK0fqcW6xhUkLpEsmEGdML6X%2FzsD6Ry392YohRm7FqEOHf5OHG%2Bh1chtHG%2B%2FhGi9Dt8JEXfZI14RZTzsZ75JPXiEpbB%2BkNo8VCBKqchRWZaUpM6ZdcGDdfx6nSP4h%2BEexIibo0eTCjXXGHfcSp3TKU4Y56O%2FNbVdprPqLEvwjkT8pVADTUi2v48bCQBOuKs9%2BKFkWbv3Mtf3HusrL%2Bt4pYwLdbypNEbHEYKLV8FzMIyWx80GOqUBxreMtsZjIUQD1EExUBUMmc9tFtNwmgnia7SczH3LvYmmdGarv1hgigcv2maqFuoc8HpokGYXJ10caGvJnUAlwHVXukBFAXWtRm7cL562cfNa0IfGSMVLOGS%2FGERsZk5FOy%2FtqJItexZhyUcKsugtURiThisrz7QGvuJkxxNIN2f1rBGL3NS4RexSj41aDCtXhb%2Ff9dK2dPOOTlydlSXnWOWubgHb&X-Amz-Signature=bb9e47d1f769fe1d1c7f2167512b24a2e8fa52670985fb2c278d57a471945d5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645WQPHJJ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDW%2F%2B6fxinLKCpPdmrvK60MBTPlC0M50QJzOn5NxNWfAAIhAPY%2BkijCBw4NXrP6IvjphjUTznj2ZMZxtKakc3XhCmBgKv8DCGUQABoMNjM3NDIzMTgzODA1IgxEWjwPQSAlmZHRO3gq3AOIji6N2gOnh2hWMbcUkkJ3tXRjodiIumRZo9Y7nzPc99aRSHUCWzv0cgyCExOr6AbXQf9zA7LV0DU1dIvoOLIHHmocTwupce4BznlNypxTrEv%2BBRG2UH%2FVeIq5gDTjqUYvQXjLIWgNjlGy5BHMeDLV838SMuguNYNp%2F9lWxtjD2If897DsfMr1I%2FBGPGBqYNVzfOWVjbxwaEVcfM983NNfwgTJkT2zqo%2FHtOeQkblnH14f2Q49nxZ8qmeNJJDQ6uONqrf8LRv7qnGyU3WEcaum%2BzYoLRHdxkFSFR%2F24uimP14BwX2ZdmqNIqPxULcgfMo190nWQo9wAancrlKjHgjTJqVbcj9vtEm9KvQvYrzk26VlE%2BJZ7UdEec7Uzk44RLRIXy6cQYfiVrSxkGf%2Fd5c7fqf%2Fo18GpD93t2p5F%2FazLM7HY71yA%2Bkv8RKfa0ZQ1s0WNo11cQi1zSaDJuntfjvjcXiSjPn8tRK3S2ljZ8PJ0s%2FmBIeygzs%2B8Qp1KXaon0%2FzdseIo7FMBP5XlRgOHcBpjGf3FVkOYUvq4ssfKck4%2BcTaTH8fc5aIAxtqsD8nWnWKSBJeRQYrecnelhINGPWnoVjywxGTJ0v7QvYfOqDQb%2FS52oeM7rKiKIB4hzD9lMfNBjqkAeBlc4OEIZ7wkkm5mDGyjJUgnOEl%2BUXTCPE7PbBP4qbmNBKwuQ26YB95xN6DzQrZr83HjcoxuN3t%2B3WS0fXOoOFHLrOpn%2FIwTrLgnaDeHI%2FgwLkYy2Tusu3RczIf3bjTef6otbOHpMKjjOY5hfad90%2BnGrOyn0an1Kh9T6hasqOnxNiPd9GJ%2FDHe3zfFuj35ooJB7tdONoPgwi4Tpq910xeL5mvW&X-Amz-Signature=78d5ef335642fb478bec8a6c2c4a1848343f0c7b3d52bdb27b8faeb4ee93ffda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSUOPQZQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAWRfnseRjxK%2FJ30mCG1aKpUtycPKk7%2F8h9AlzJFgNsMAiAPOH3l%2BXlqZz3gdLP1YBqO61mVaerpX%2FAoKLwErjqiXir%2FAwhlEAAaDDYzNzQyMzE4MzgwNSIMnsuwqV2upHaPL%2B6aKtwDRe8rNLoQiJhBbHpgM0X5Jb2ICT8LzzLP0KuhwwnTDVdTimQOe31npFO6om0o%2BIL%2F9DstKuvpF3spDyUfbXj8YMjdZNoUFh5vfLoYW9uvD9yOZ1yUZlUh%2Bxpa4a6AP%2BmVGWRx2Xsl3hmKnLPbDIr1Mxw8pAt4Mw%2FNjO1BOCcYmwlCGlGQhgnpjMTV0%2F%2B4l%2Fc2EwaCBh20%2FKSehJdSvNEWhmFFKfkD3qoIw%2FGZR42cY7hcIZ1DB6A1BkABmGqC6OJfW44MYfz4ltyenZkOno316txLB06F8qT6FG9T7xEeZGahITY0kCWpwwiVyr9%2B4%2FIakx3NhZJfDoDE2TgaFDJPrnvIscnamwyfBq17e8XOBYDdUUGdO%2F3Gmq%2Ber%2BzkVL3bbTtyb4IIUkezfSPOqCMSIGN8hkoCydjTpNOJf7A%2Bbe0Nsqv0PXjvaM%2BUJeQKdj1TOnGubcm0e3i2HPwx9TqNg1OOEzAQ4bRVUzyE3GTCzbP0r%2Fakinr4VOtKkSlJommZM5ZLmzb9xnFRKbb6V%2FN%2BhTHV9cUtz3jplUwgpkmjNiTnXqpbv3VcTiZBXd2ntxWsf7KtXXTYS8XFPNdJqe9ZCFW8Om6HlRf2OH3DqyuNGzfGDhdNeJk7PJ26Wj0w%2F5THzQY6pgHHFAqfRvc7VwYLLBaowDD2BpWS%2FqLAtKJ5vO5UqWBlMSypY7Gr1s4kMTg%2F128id%2BFFoPI1TBln2eiopvQbtLqWqw3ygzvJtIzbzO%2BdvLSG%2FtRTpRQ7LUAE%2BvgvqKTcJ54L4Kv%2BnO5r%2FN9YnTSMgBoOaO9sXQhQFq0kshOCB31GuslOb3F4mwFcWG6HFUQXesxPaG4JblsyLtl1em1nYO0fvZiWH2hl&X-Amz-Signature=1a7673c18b058a1a4957305de3643ba415bec5f0b418ea91414078eb7b4b301b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSUOPQZQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAWRfnseRjxK%2FJ30mCG1aKpUtycPKk7%2F8h9AlzJFgNsMAiAPOH3l%2BXlqZz3gdLP1YBqO61mVaerpX%2FAoKLwErjqiXir%2FAwhlEAAaDDYzNzQyMzE4MzgwNSIMnsuwqV2upHaPL%2B6aKtwDRe8rNLoQiJhBbHpgM0X5Jb2ICT8LzzLP0KuhwwnTDVdTimQOe31npFO6om0o%2BIL%2F9DstKuvpF3spDyUfbXj8YMjdZNoUFh5vfLoYW9uvD9yOZ1yUZlUh%2Bxpa4a6AP%2BmVGWRx2Xsl3hmKnLPbDIr1Mxw8pAt4Mw%2FNjO1BOCcYmwlCGlGQhgnpjMTV0%2F%2B4l%2Fc2EwaCBh20%2FKSehJdSvNEWhmFFKfkD3qoIw%2FGZR42cY7hcIZ1DB6A1BkABmGqC6OJfW44MYfz4ltyenZkOno316txLB06F8qT6FG9T7xEeZGahITY0kCWpwwiVyr9%2B4%2FIakx3NhZJfDoDE2TgaFDJPrnvIscnamwyfBq17e8XOBYDdUUGdO%2F3Gmq%2Ber%2BzkVL3bbTtyb4IIUkezfSPOqCMSIGN8hkoCydjTpNOJf7A%2Bbe0Nsqv0PXjvaM%2BUJeQKdj1TOnGubcm0e3i2HPwx9TqNg1OOEzAQ4bRVUzyE3GTCzbP0r%2Fakinr4VOtKkSlJommZM5ZLmzb9xnFRKbb6V%2FN%2BhTHV9cUtz3jplUwgpkmjNiTnXqpbv3VcTiZBXd2ntxWsf7KtXXTYS8XFPNdJqe9ZCFW8Om6HlRf2OH3DqyuNGzfGDhdNeJk7PJ26Wj0w%2F5THzQY6pgHHFAqfRvc7VwYLLBaowDD2BpWS%2FqLAtKJ5vO5UqWBlMSypY7Gr1s4kMTg%2F128id%2BFFoPI1TBln2eiopvQbtLqWqw3ygzvJtIzbzO%2BdvLSG%2FtRTpRQ7LUAE%2BvgvqKTcJ54L4Kv%2BnO5r%2FN9YnTSMgBoOaO9sXQhQFq0kshOCB31GuslOb3F4mwFcWG6HFUQXesxPaG4JblsyLtl1em1nYO0fvZiWH2hl&X-Amz-Signature=fc2ee5a9f69480eadc1efe82b53809d02a5029ec2ea721b327164bb6ec0d39b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NAAZKFJ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T201955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4JIGjapJbc8Xv73GEL2YBbsjaOmke8ADJAhgE5KufkAiEA6CrYWoYSdpQqm%2B7OsyTpupd3pLDy%2FRoFlTCXQwNg4Csq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDKRRw5fu%2F3edMGBrKyrcA5yI4Zl2P%2F78m3WwvW2EWLj5VItaFXoIVFk6hbzY6dDLj7oV4jgOvQtV3DgF3JHYcT0KHBkbdiw895EdYw2QcjDmNLYDlbMutm%2BnccBZFjEW5z4VIYNIsda4bwU5dE1t%2B%2BBqidjM%2Bk339fYrYUdlTX6cIIe3Oqt6pcQPKfPXP1Jramn73aRVoZfbTjZ2yVHgn%2FjmFaQLAiWx5qztZkZRTbAOHwky8FHTfg8Qn%2F7b7eoTA14XHKOTs7aY48Zibwy%2BTb4wKWW0WCMC63QCTkTuJ5LZiZNUkFzJNUp3qvlBO1q4JXknR6qjOp2il8pa%2B3jUXLdNBrFl5g1GfojXuArSBISa%2FjP01FxmLXWCYZPiS8cqRmYGQgb4T8WoaUDoT85XPz41jHY6fmNs4gB7Cw5SF6Nejsy1M0MRGZhLrIfo9%2Bm7kbn48Mhe%2BW6Ty0NCZ8WLZOZ18MDcxL9vgo5efvyPLu7wwFAUXrgt4nH5alc65vsvErA0izsLhZCbjqZQVPyW1BAg1FwK7Xj10xZ4F5mpO3Ru1WLwsBsha3Ocim2JhxNQ5MfQiFz0cG8ods1yuWd%2B2V8zS3vIyvY8kVJTamgbqI3%2BUWwVZwjzPZsYqyh%2FYl%2BninFWaDrF16drDZg7MJWUx80GOqUBWlibiiu4mXXuTMojNTmPrhGlW52q%2BlhOlNopeAiSQi4IKQsnhIPBQeQ9M5zcVszn2JTla2%2FEmbKNAKzd2M04bcfIhjyIc1hqwtjCtvKzZws6f%2BZSInuwmcdlMptdVlAnSOLO%2BFk2HH07jbznswBvux%2FJ2EZS1vYmUxHbHlkIxCEv7Ck8haRkvU1ajndw1C9EItmMJF0PHwAAT3yA4oWTj8%2FDG17N&X-Amz-Signature=5c66d8e6baef1034dc1f45162277690c24c4721c41f9dd0c7f35465ebfdeeda8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFKNPEOM%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBWHuxxX4OFCYn6gvfcB3HQ%2Fzwe8JtNVJfIYxzvYD35DAiEA82Ck9iTP01L7eO3FuQ3Q3apixWLRASCT%2FhlzIowGexgq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDDjKlEFAqZfVQnYkmCrcA%2BTOlY4u7y7LgYGW3zeHVda0lXMg4qMHFmD%2F10VHLUL9PWX%2Bny9NFJWimvXIX%2B7t290htP5QB88KIWXKjeIn6cBichnt1JMAT7Dvm9penA3UDDEgoS0v9LbQWLQ44Ze1txUz1E%2Bt2SRzIXHNI%2FwnkuwvA%2Bd%2FQN3wNppbLOEot%2FF24pWEyF2ctqREPruEsfz0vME4cbSGTqhW57296kdd6u5sxEhLj0bRIGd8n4xcixR1obV%2FpA7j3IkBnmxlThTfKZepvnVZgqnRZi5Nh40kxC4FUP57TGZ8HgVJngAKEtGX6R1whV%2FA2LaNSV079U4YO5wFoxf%2F68VVec3C7807ClX137%2FaV%2B5KoPea1Lyn7afgSqfIaZs9vQarqHOU8cA%2BgLLyCMhRQ2Hx%2BuyE4H8pc548wOKBFU%2FZbcKp4LCGoTWOD9jXEIEUbC79Ww0o244kfFUjdvYg5yhLvBC2eBrZOH5RHwew0WUwbaP1rKRM8iyWwvz9ykDVMKsbXxCpMit1A9Lm16tm2lSi2H%2BVRf99Pyty1%2BB1gVOFO%2F0wIZKPaQKCJK2vhuEHtdgK9GwLkB3c9oSMtGPRdkciN4BfdJFgExgO3NLlLgqa37CtMZGQteWfzI%2B2P91un%2FKwXu5AMMCVx80GOqUB5m9Fdp59J25M2hee7T%2BxHOwnhaVQzJMqe2ik9SfuNGT7FlBC5Lb7TOdGN4eLmY%2F7HKV%2BMstCsoJRtFg1h9BKzi%2B%2BcnLEFiqDXAAuijygPSTAZ7QC836A38mqt0LUSVi7%2BsbdTRVyWL3LB6xC3nALf%2Flu4n2%2FsWWIqMoJoccCQpR6AUVWrmcZ9PG7zLIuzzFY4fzUlepcQu1gzOpGktebVNo%2FbgCg&X-Amz-Signature=881868fdb3881ae42c3c1c78bc1be5d9e058624326640fd37be697f951efbfdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFKNPEOM%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBWHuxxX4OFCYn6gvfcB3HQ%2Fzwe8JtNVJfIYxzvYD35DAiEA82Ck9iTP01L7eO3FuQ3Q3apixWLRASCT%2FhlzIowGexgq%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDDjKlEFAqZfVQnYkmCrcA%2BTOlY4u7y7LgYGW3zeHVda0lXMg4qMHFmD%2F10VHLUL9PWX%2Bny9NFJWimvXIX%2B7t290htP5QB88KIWXKjeIn6cBichnt1JMAT7Dvm9penA3UDDEgoS0v9LbQWLQ44Ze1txUz1E%2Bt2SRzIXHNI%2FwnkuwvA%2Bd%2FQN3wNppbLOEot%2FF24pWEyF2ctqREPruEsfz0vME4cbSGTqhW57296kdd6u5sxEhLj0bRIGd8n4xcixR1obV%2FpA7j3IkBnmxlThTfKZepvnVZgqnRZi5Nh40kxC4FUP57TGZ8HgVJngAKEtGX6R1whV%2FA2LaNSV079U4YO5wFoxf%2F68VVec3C7807ClX137%2FaV%2B5KoPea1Lyn7afgSqfIaZs9vQarqHOU8cA%2BgLLyCMhRQ2Hx%2BuyE4H8pc548wOKBFU%2FZbcKp4LCGoTWOD9jXEIEUbC79Ww0o244kfFUjdvYg5yhLvBC2eBrZOH5RHwew0WUwbaP1rKRM8iyWwvz9ykDVMKsbXxCpMit1A9Lm16tm2lSi2H%2BVRf99Pyty1%2BB1gVOFO%2F0wIZKPaQKCJK2vhuEHtdgK9GwLkB3c9oSMtGPRdkciN4BfdJFgExgO3NLlLgqa37CtMZGQteWfzI%2B2P91un%2FKwXu5AMMCVx80GOqUB5m9Fdp59J25M2hee7T%2BxHOwnhaVQzJMqe2ik9SfuNGT7FlBC5Lb7TOdGN4eLmY%2F7HKV%2BMstCsoJRtFg1h9BKzi%2B%2BcnLEFiqDXAAuijygPSTAZ7QC836A38mqt0LUSVi7%2BsbdTRVyWL3LB6xC3nALf%2Flu4n2%2FsWWIqMoJoccCQpR6AUVWrmcZ9PG7zLIuzzFY4fzUlepcQu1gzOpGktebVNo%2FbgCg&X-Amz-Signature=881868fdb3881ae42c3c1c78bc1be5d9e058624326640fd37be697f951efbfdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YHRCINA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T202103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGJNcIHID%2FdJFdKN2jwIDJA6LAeCnJkcGaZPKQScEeNSAiAp4n%2BOnreoxY0mEehX3oWWgRiHozdOEgiwE7Tdj0bHKir%2FAwhlEAAaDDYzNzQyMzE4MzgwNSIMMJc1bfcXfUURRVsRKtwDLY2cf6%2Fj5I2W2n6muXD9WjxrYWwl4SRH6LKmBDZSV7W6HySBdKj3nbklS0ZDkSfsf%2FLrUgsKXzjMzKB9%2BH%2BnxlAqfCLN2UIR0OXqS16iyHcN8GHgqQMVb1lvMSkSRn9AuhZXEeQAMsVQAxjvuaH73pJHViFIBtwPl8QyrFlOe6KUmO3gYceuPUFNKwYVpxMNl5I%2F6VyAA3VvUDDMg3pZ2p1UToMWGsAEKKiezua8cT%2B3Q6zafqA%2FAuJE%2BrMutvyANd7gmZakkRF8pqN9kmMClXNqHH%2Fl5%2BqJ5mVuMGKx%2FhoNYkr1ZhQwFDAU%2FkdZyCSvhJSP0KTBF2zlVa1WQzDAxmKHu3oJ6wsk4skdrMvCkoezPq9UisRQwGaS64XJVCBWdcnm8Hs6wCOzG22oA6jI8rIehL0xLaqUYH8tSShh%2BxJSgFcK77dzLF6HPF2d6ygSYfpF88QWUdEQdkjf1P%2BV%2FsBBeYjFvZTSBiNmZWRXauc2FrkWhpeQ%2BKLPCTbVx1TH1IoNqS%2FjRUXxNdqbukwv%2FIiJ4Sn%2Bidvx0xVJUAg7zLJpn%2FnRwNnScZgqgjePJtYkl9dkJ94%2F82%2FFcUaEF4XQ0aR33%2BDq4ceyw254qrNdjHYzExmnLXdxOIv8uVgwg5THzQY6pgHLk915T8k6CyQUECRBbPXzifHSvvkYzZZXjh0B1wcQ1uU9jZWSfhy3NWs4B50sCPy9FvcktgXvfegB8QJXT7Cut8%2BFZP6Lf1tUgkzDwmNh1muBEkv%2Bvka42bqGpQfVpDzdvu%2BbUyRKDGPfhnzP8sdHUZtiN9MDjB9pBUBTw4O8p9MPIjvLMi9ChK74LEkPyOgzqydjPeVEcdoP5wiCMn4947hlIItq&X-Amz-Signature=6106a04ec34537f3c5f6c51cab2e4c0e236e1f9184b9fe5140dd98b0c23ae3f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

