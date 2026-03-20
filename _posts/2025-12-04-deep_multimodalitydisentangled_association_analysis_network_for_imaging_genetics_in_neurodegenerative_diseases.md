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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUYSNQJC%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIHHzOecFGK%2Bq3muoCTnw2sBP3H0Fa6M11Xi6RtXIodgtAiB%2FlSDBcA%2F0BBoUoZYmawL2ObdsxhaGgu0qd%2FhdQN2WHCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMMU90S9mygXWtDTD5KtwDyI2yM8rDnVxP037cET%2FjX%2FCZPiATIf2M8eXcM2%2BvbQu7aEm9wcTLsU9WL2SgG0aWMn%2BJHJTpwWlZvFZm7Krhe9gBY0aSNacZu4VtQcnxl%2F7H6%2FEYvrAbZLyqXli31VYvfI8qbyfsITKRGbrAAmfUwXvqgMt5H4eF5gJOv7ZLbJ7DtobMaDaZOSdbK9tX80ot1EQ2pD4oRXOQN%2Bsm3cKTlElIvCXRrNH845lG2mHN1sKQaASPzYsU4zSDoNSVu5MoESMxCje3VbJ73izFH7bLnf%2BV4IZ3DRNcWbA6cKlA1JNhusqetlLrTf3piU40NGk3awc7hpp71agK1qDLXZCO3eTkqcBFmIQ8d3F%2FqRZ%2FAlDSJxvicx85XFgtg7N%2FNk1nSVctPNrH3TxAyrEd7Mq0WZVlYF4LtD8DMm343bFU2wgaglWhGixNXWnU0Jpwb2FmmbxO9ttKIB4ILVM6C6Oyv3nRNcJ4ZZp66Hm2%2B9rCQVSX7kxKEQMuOjdMk9%2Bk0nwd2esypvp5ZM1XwW6ElRicbOK4ADAa4shuEUjmkhs1HSDky%2FES2xypOZM9CWrRkHq%2FJ%2FcTSOZtxizXU5rqCevw4919UO3y7R6Vu22UEt0HVuX63qiZgOjUFbwfDPkwhM%2F2zQY6pgEnj68lMc0t2SGmR9Vy8Ci7jlC%2FbpoKZOsdsPqyUFsR9aPI3poPmvrzfn8tedI%2FGC7EVTvuoh57g493qTqpkwcmNdle1KoRkbptm6%2BL9A%2FTxL2hKArhfLBD4oq%2B6Onu6DML%2Bbv%2BJ1ubgOKUCHCUDgEBL2kC9a5Wx7y3LrjGa0PwXJlN2uPKRInird38J4zNC9DcpTOWD%2FJsoeCcT4cOpjtoFx1boZxw&X-Amz-Signature=2c6d2a71c3d79a5fdfcf061a67ed797a883da515efa5ba664c38d0046ef9eaef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUYSNQJC%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIHHzOecFGK%2Bq3muoCTnw2sBP3H0Fa6M11Xi6RtXIodgtAiB%2FlSDBcA%2F0BBoUoZYmawL2ObdsxhaGgu0qd%2FhdQN2WHCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMMU90S9mygXWtDTD5KtwDyI2yM8rDnVxP037cET%2FjX%2FCZPiATIf2M8eXcM2%2BvbQu7aEm9wcTLsU9WL2SgG0aWMn%2BJHJTpwWlZvFZm7Krhe9gBY0aSNacZu4VtQcnxl%2F7H6%2FEYvrAbZLyqXli31VYvfI8qbyfsITKRGbrAAmfUwXvqgMt5H4eF5gJOv7ZLbJ7DtobMaDaZOSdbK9tX80ot1EQ2pD4oRXOQN%2Bsm3cKTlElIvCXRrNH845lG2mHN1sKQaASPzYsU4zSDoNSVu5MoESMxCje3VbJ73izFH7bLnf%2BV4IZ3DRNcWbA6cKlA1JNhusqetlLrTf3piU40NGk3awc7hpp71agK1qDLXZCO3eTkqcBFmIQ8d3F%2FqRZ%2FAlDSJxvicx85XFgtg7N%2FNk1nSVctPNrH3TxAyrEd7Mq0WZVlYF4LtD8DMm343bFU2wgaglWhGixNXWnU0Jpwb2FmmbxO9ttKIB4ILVM6C6Oyv3nRNcJ4ZZp66Hm2%2B9rCQVSX7kxKEQMuOjdMk9%2Bk0nwd2esypvp5ZM1XwW6ElRicbOK4ADAa4shuEUjmkhs1HSDky%2FES2xypOZM9CWrRkHq%2FJ%2FcTSOZtxizXU5rqCevw4919UO3y7R6Vu22UEt0HVuX63qiZgOjUFbwfDPkwhM%2F2zQY6pgEnj68lMc0t2SGmR9Vy8Ci7jlC%2FbpoKZOsdsPqyUFsR9aPI3poPmvrzfn8tedI%2FGC7EVTvuoh57g493qTqpkwcmNdle1KoRkbptm6%2BL9A%2FTxL2hKArhfLBD4oq%2B6Onu6DML%2Bbv%2BJ1ubgOKUCHCUDgEBL2kC9a5Wx7y3LrjGa0PwXJlN2uPKRInird38J4zNC9DcpTOWD%2FJsoeCcT4cOpjtoFx1boZxw&X-Amz-Signature=2c6d2a71c3d79a5fdfcf061a67ed797a883da515efa5ba664c38d0046ef9eaef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCIPHZ7O%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDTouGUZVirRI2jVfahfqH%2FJ2CZ6UHROGHM5tKqKXMqwgIgMzBvp%2BaOY5kcwB5nLYUoifJxBUXhJUYUaTipFYsAd%2FIq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDCK4EoZHr7a94UrRDircA5blMmDZIK%2FRKkH5M2V6kT3ARiBc3COLPaGjNmYbSzV5%2F8NZ0e%2BwA2Mx6swx4SjQEtE5Gtm5I5ZDakHF5OhnEpt6sq%2F1VAx74PZK2%2FkaZEVfLjDY6%2BuVWOQLHD8Mc0Z3OCgMy6giqSf7l4%2FXClsWHWavosueOuwv%2Fu3MrVG6xrBTwkZMCDVmzk4kCwfu34HA4JDJQghCUn4ZLNR27LigDUkPwSEGvJgjIPeAILGzNQOL6UIu%2Fg%2FAkszMvOmmIszJlz1GbHRYR5wdUjs2%2FzWEAUaWhhSdBwg3d2WVdA3dQncMjhdZIe9ynzH6Fd0I9aEU6VHTIL1lBbu9aPQAdt9%2BoEHYXKN10Bnk%2BIaghO9Fu86M4ggPGJNeG2jQ4OEJFdUrtUEOieg7Bc%2FByH6iEzmPcBXA1g5OnQ6Br9j9D4TVR%2F8zWuj1fQgiHI4h9yi49HHyArlYnU%2F4PFYFypOxrp7LjhOrupQPzsJzlxMjjOqUTPSSTXZXk%2BcF6Lwl5o03A0dIwVZpD9jKDfaeWm9u5lXmkPwURcbb3LQHHJctGGeOIYNJHVf9IUZf3tdngdojv9Pdhq3SghZSI8cg0ASTaBZEVNfksppYkmtzQXz07IAf6t7%2FH87cWXXPX3SZd3liMIu89s0GOqUBFTc%2FyEjrPmbR4ylq%2Be7dcukN3ioHrexTsapoCuR7rRIX80uEZJwKfcG8qjfIOVO1LEzJ4cxd8c3krR81ZbSmGzqTvgd8a1kyG041QLN6ILRfQjQ28Bs1UIxpRHebFe7mkO3rPZNbL6GAjpu1AEPOcjvptedq3xpBr8K8rBrDWG3qogJ3YzwE3JYLhjS6QmxPKxeV7iHfOxqnFfnbkuZ7fZn5STNJ&X-Amz-Signature=e2949a63174cce8bea9c5d78667ffd17a32fd1a678153e2857a3081c3b8badeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657JIJNQU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDqMKwinBvkq8T3W16ZS7IyoCKolsvvtBlW6iaxF6JYqAIhAIHXBvMQsQOeLlgD9ZhIUG2NuvIFPMfG7ZRpk1w3COrHKv8DCDwQABoMNjM3NDIzMTgzODA1Igx1swkn3Y5djQD%2BhFcq3AMjm8oOzd6OLKR6vfC5RUXvvAsF277LNDue1jUV0mt6jMOlsOTm2qj54%2BRU2sGmwIFoeMoraGf0KlLpIg22I8VV5N%2B1vjW00gtlwVYu0wUSSWiZCJgpYlY%2FDFDp3ycHuoQagf5OI7v%2FZ0NTUzt9DvDScERs3ibYFucqVGb4%2BGj3bVKgr3KP2oI2BhMeGoATupbKu5n47TW92rzGnoGm6kieKg9QQ%2FCbbMC7VCvh2%2FjJw%2F0C9Cfyuvp6q%2BBbwVE9tUXBsxdvB2r7iZN0q1ogq%2BIXg00cA1qBIt9fGtnW%2FeW1Zk0k1CqkGilIKv2CmbHc9c6UaIPjaHEXKeXmoQpX75qeWah1bAewlr3e53oA5oKnJaxFABaVBU2C1NA1R9eC7b%2Bg%2FWnA2QWZ9XKfQw81au1oBcpiIAdr8VLDmNasUchY6zBOph5vbAw%2BNN5bQhlFpuYkgB7Oa%2FblMX1D%2F1oNCbi2cR2MD0DK1oqrwyugXsazoWgZDaXkL9nO0v44NcRgPcR4L0aTqepJ2300xzDxgYgbdi8SYSoLqJP1yim61NhBrmy76U8xPMHi4bil3PNLrJaQUrao1ZT3XqXjAcN2yOQRKFKPp%2FSp6aIi6IKBwYHPfurqLJtZolhcvjc8UTDMvPbNBjqkAQg9yjR9MVHWe947jJcdHFCfyp8SSrmRnjKl6FMuKCpMjb17bBdWHcIFZ%2BmRArtRh7cr5ULzwFNQnofdKp684DwMh3i2nsu00jUaFui96NDkjwPwKgl%2BfUcIRie6jb%2F%2FEtv5xSO4QfqgjOeoaMQiEulJyuuqi8wNNZ6LwNZuDl5ytfG6PwTt2Ah4R8e%2F9LqQFiOevXBu%2BOhXrFQMqYB82SDLtroy&X-Amz-Signature=f6bf4aa3df716f273f967edd99f227cdf0a73e7b18e0fe7f0ee439becc101656&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657JIJNQU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDqMKwinBvkq8T3W16ZS7IyoCKolsvvtBlW6iaxF6JYqAIhAIHXBvMQsQOeLlgD9ZhIUG2NuvIFPMfG7ZRpk1w3COrHKv8DCDwQABoMNjM3NDIzMTgzODA1Igx1swkn3Y5djQD%2BhFcq3AMjm8oOzd6OLKR6vfC5RUXvvAsF277LNDue1jUV0mt6jMOlsOTm2qj54%2BRU2sGmwIFoeMoraGf0KlLpIg22I8VV5N%2B1vjW00gtlwVYu0wUSSWiZCJgpYlY%2FDFDp3ycHuoQagf5OI7v%2FZ0NTUzt9DvDScERs3ibYFucqVGb4%2BGj3bVKgr3KP2oI2BhMeGoATupbKu5n47TW92rzGnoGm6kieKg9QQ%2FCbbMC7VCvh2%2FjJw%2F0C9Cfyuvp6q%2BBbwVE9tUXBsxdvB2r7iZN0q1ogq%2BIXg00cA1qBIt9fGtnW%2FeW1Zk0k1CqkGilIKv2CmbHc9c6UaIPjaHEXKeXmoQpX75qeWah1bAewlr3e53oA5oKnJaxFABaVBU2C1NA1R9eC7b%2Bg%2FWnA2QWZ9XKfQw81au1oBcpiIAdr8VLDmNasUchY6zBOph5vbAw%2BNN5bQhlFpuYkgB7Oa%2FblMX1D%2F1oNCbi2cR2MD0DK1oqrwyugXsazoWgZDaXkL9nO0v44NcRgPcR4L0aTqepJ2300xzDxgYgbdi8SYSoLqJP1yim61NhBrmy76U8xPMHi4bil3PNLrJaQUrao1ZT3XqXjAcN2yOQRKFKPp%2FSp6aIi6IKBwYHPfurqLJtZolhcvjc8UTDMvPbNBjqkAQg9yjR9MVHWe947jJcdHFCfyp8SSrmRnjKl6FMuKCpMjb17bBdWHcIFZ%2BmRArtRh7cr5ULzwFNQnofdKp684DwMh3i2nsu00jUaFui96NDkjwPwKgl%2BfUcIRie6jb%2F%2FEtv5xSO4QfqgjOeoaMQiEulJyuuqi8wNNZ6LwNZuDl5ytfG6PwTt2Ah4R8e%2F9LqQFiOevXBu%2BOhXrFQMqYB82SDLtroy&X-Amz-Signature=1b7e33276b9658420d333669845aec4db6e677c54aa64b66c11cc22bca13a717&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636BSGSOA%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIC0X52GcTUOEY5hazifiPPnHM%2FZ4rzg5uZhwwWXBE%2FOkAiBUUnxilDYgX96yQyIkxgD1TIQP4KHrs8LLgKZbxPV0OCr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMEt%2FiNF%2Bn01NrQdBdKtwDTvBxwgMEN6AZZUyfmXInzIx2kdLifzdBx0VILZJhExsnGbo2OBj%2F1LeGixD7%2BEAKsjcPJXYlyVWYbQB3YwEYxhMbvafA%2FExiPnB6iBhBK6TRs%2FVk2eavS63EBXSylO3GEWmly6B88gU%2FKe1%2FwKu9UC8Ia2aa%2BQyiQXiV35fbTb9drwAozAP45GWQOboh0zW%2FG56InGdHK5Pkw8ZdRqQ5us%2FKnUAqGxiEjSoNIAcg4OHCqNGMtQNs77tk8UBY%2BpgjYQQj2s7scncDGeYYZ7P%2F2%2BQiajqi6KQsKV7xRBvlDBtgoXtDqqBUIC%2BXckcs%2BmigtW7amPCVSJMpU23%2BkHjIX83o0yOShIaB0WxB9rCpRQ0W9nl8GIpvFRyNJNoczoWfC7d%2Ff6eSuQb5XOLEuE5CisyYJeswUaGL3rKjCvSdvh%2FWEU6Bd0aUhNimBl5BfThQgaKzvhfDfr%2F6EogsuPKWX%2B%2FbKe0HRfdi5Giwykk%2FwR4DQxIU1K1POKGT4JKOeVxyx4S%2B73to09oifMAKYMifRYRannTBeQilig%2B7%2FRulhjdlAGwPvFQfnX7LOCOzhuAvMvHoxIzktVasigZP8lFX78HmGErWNdUlm%2B9lXdNE1gWdMC%2FJOq05vrr625Yw7bz2zQY6pgF1%2F7ksS%2FSfao3Zfvth0n6vWkKallYaVGTR%2Fnizel7diaRt7DOUX8oA4kolEDBWUToImwHcR18IFBiNe3Y2txgav10yK9TjFKUUmtL4RfNxVLWxOuhIbHi6gXcZ8YfYCyaYpc87HmT5p3rDDj5FKae%2BXMbEgVxdrHAITz0PrViD8K2Utwus7agO99bpirlCSz7zQNvsAGn510%2Fw%2B8fZKOZ2OIGIKwzU&X-Amz-Signature=d42992c0ba18b18ee2662965934ece54c90a3ae15a65463958d8effdcf82206f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666N4HU6UG%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQC7Z7CEUoggcwB%2FOFlp%2FkyUTjQuCTV0ZvPFOpZvYb5%2FjAIhAL%2B8Q9d2esg2wT%2FIkE15JpwanszJrECMnd9%2FubwmEz3zKv8DCDwQABoMNjM3NDIzMTgzODA1IgzeWgD8XyjSU%2FkzYhsq3ANI1fkUCjzyyNW7v73j%2BxL9AV9OhbsGZ5L32YpDoMmbpxoXzgX37hqFJDXknS5mxvxdzlAz8Lf7jfu7u2UyvYChHyw%2FDqtZcCQb90ExT6l00M99YVsBxfE%2BMZeyETlsXllvuI0Hq8cOXoDG2vQq1vg48kba8Ee7xm1kJybjt1x9jLc7JvRo6qfFOKkbL1fo%2FXW8H1QiBcLFgFEaeTLTsnjqMnkVXKlDcrbuV5ZtunNFHkeAFMdrLv9yS6BDllzNEzXwLHCv5TRV%2BuWkQ7tMm5%2FwV9afxHrt0bDLji1ZW2cxW1B9G4KyqpV%2FSi9OxC15zgvavnDKBWbmgsBOGS6dV%2BdNGIJ5MaUGZzGvIFsj6xmjnxpPxX48AxpyLr%2Fr4%2Bee84ZG5FFv8xONigidodb7pf1a8Cih2OXgY3%2FNF5lIMtXoR8cwOmXxvxZYBbNlE1%2BklxB%2BdzU8rjOWpIEPxcSqqCKan07UWM5blBqA4Tz9%2BLH9yCcmHD38qh7PL6XkOIlLghMuaprN6ay4wf2d%2FNOekfK5LYWnec7yKDjDMec8IUbXB%2Fa0%2BtVW4vRdD64iquK3odZEIoa4sU3KhepuTcmch6X1S9RC2SuWlQK2y%2FccZ1kCBVJtF3iybnvPKzPzXzC3vPbNBjqkAbc%2FS64tRN7QH4eaFJDAMTWsSWUJ6akLD9f763ELlHMBaJcTqC%2FJyCjyfef5Ah2pQ3EN1y5qBMtavOcJYCqa57n7iEUjIWjaIiQwYL94PUZbE%2BuYOHqwdbJBZ3od2gzWTfaHgHtxDRWQl6FS%2FQ4nfiBohS020R7T528c6YCsmhPnUN%2BfJ8FT3LVQiln4s0DQAzacB1iRz1ULDNcodHgYfODcLxMV&X-Amz-Signature=1ca7724ff34d81e5b6a0bdeac91140aee50ba216da66dfcdb48191473a963324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667A2MPXJJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIF%2FmZw07uocLFCTLtDWuttdcxGA2m8RG8lq25p0RNl3mAiBeWAdbUNCMjT7FtjxypBTD%2F1SFCVJbtMgdJf%2FR68m8fyr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMhoNJMRVqrmtnKi4zKtwDEZ3g9zBfp2tHQg6kDApplgTm6PQjdFd8GibT4atTjHFGaDBll8tZAdBK1ojAXPwdg8u%2Fi%2BmbXTuJVzxzO7ku4Onf45XDrnxhbI9eUOF5S6Jgb9Miah1mZZciGRy945bLavJqhRCbtZ%2FtNyrVcKLccbMZke6vFf%2Bb3Zgo4MiUxp6lOIfw7w9tydt39SkUXTigR3TZuJM2elRxvJ68gvSaxD1%2FX1%2FknEAHTh3hq0nw7dz6jsHKJ%2BElr8%2BaJOe6Tq6teXxwWPrAismhnxp4W0KZrHxbS5TnskzWDwM7hE15eL9WZ0sUGGFBBZvv57v%2BZ7E8trx%2F0Vm6yv1VcNP0Qoycg7UksabBQBCyuupIKIAY6IwuhsvTBcdi1ZiyW5LspeqoStysteqvI4kA3dH7k9hhSFJn4DXUwMpns%2FQvurfrz9SzcJbtm6XANtbdD4NvzJyNG9xrc9MEPAIhggkJzUX%2FjvoCE4SQRqpGPdM9SG%2BzE4haAsSJcnAe4e2sUdc7H9NPphibD1FlQhxKIK8d%2FUFG5y2fIPTn%2FEGqTG7DbwcoKZzByg8eiwmuZpVcLnAYGvnJB%2BA7C5FbBJ610S1B5T6T9UfIp0vrKVpacqU6zgcwReViL2dEblmZokuJOUsw1rv2zQY6pgFsMtC5dYtbi7U%2BWog7OZbG6M7XUcMzRM2IDOzYFVlJ47JN6poYgsHzdogfWgy8Niy5L5ETlO1by706znjWiSxM3cw0t5fFF%2FWbs%2BwNAqbD2qTwIm67K7KPbD23NC3%2BNe1q1TYunufRGvVbw3DZ29zsmLzQEC4UF%2B1tFa%2BD8O39AHfBeh6MDvGejNpc%2BGY89WRSYNOeVVrljVx%2FVvpkvhWlFP1vhkRv&X-Amz-Signature=e441f9b2c9e8b93cd69f95d58b8bb4a2809a8c17e0223e67fbe0c7163634b129&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5SXKJYG%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIGeJQPdkZv%2FdTGdoLpk5wtkzUWajT4%2FruJqCqTRDgAwOAiEAzoZtAIAkaEL%2Fyj6Rts3F3Sup5UDKJmJH%2FvGW2a5XflYq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDDzIt%2FDqNncvaTiJeyrcAzWY3Ef7ftvdzu1YQyJSOswBO%2FwXGLgLKU%2FVeXh6wVvfNNUhPB143uEfjuZF%2B9C5va04pOUI1DPE4pRxWMr6E7%2FVkF5ro%2By8eqVuZRM3D3uU9mfUAnWk%2BxQub5etfOYhKwIKx8QB9lmNzSFNpbCGdVGsL%2Ffw07vX1L%2FacsSiGI1IYRKK7m8D%2FxZoXXkjnA%2BKVehiMVW%2BV%2BmCsQPizP2bahcK7Ne5r1liu%2FrejGQrvoD%2BamlX0eUzPvDMWRESdB1rjhI9HyfqTmG0%2FAV6iELLeYymC5FeWLpRHMXRpfS779SWsSljU8N2BK1xMhajqiclChnkuHtAv6q3bT%2FgWB0ega1bHP3GZoC5OBxDZe%2FZaGreL4t0SVNRCRwGgNVrO9y3d446wXnYcrrgHqJ3HNVP4YqLdn%2F%2BZmul5R%2Ft3izGd2pM5gUBOWUFJJ8mBl4rw0dsv0dhf1s%2B8mgv%2FGbPHzvuuLW5topM8TdA3FFGS02BXqDFLWFS8A9VQor%2BRzXXCDR7%2BDg4MU5m9geUN%2FQznrhcVAV7gca3B%2BF1i%2FAvGU18o1Po67ZRFJ9HoTL%2BwEDovzDBSJXlvayBoE834kdEUKTdngIj%2BM%2Fsgv0uvrZYJkRnq8ZZlhUYLLid8wzBW%2BhYMJG79s0GOqUBLgM4DEKaddtqUlHcFWMu6Px0J5dZ%2F2G4eVIutojCUnAyAAVef2r%2Bdmw7gMtOuR1bfTOMp%2F%2BvGMDTt5qavHdmVPa5jMORKNZ4fbRRd6NKEHjsCO8f%2BM3yyMLqDV0%2BtTS15wL8pCJPSI27oLeTNsQiT1Ql2zXtL9j7FgdA6Mvw0exEisXxUsUt8KoERqeRwot46iXGmdNxhvI%2FeOy86VMMwd4pJNau&X-Amz-Signature=434895f016535851ccfac471be36a30bc5a5c508bc79b4ba320f29dea4640ce6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5SXKJYG%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIGeJQPdkZv%2FdTGdoLpk5wtkzUWajT4%2FruJqCqTRDgAwOAiEAzoZtAIAkaEL%2Fyj6Rts3F3Sup5UDKJmJH%2FvGW2a5XflYq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDDzIt%2FDqNncvaTiJeyrcAzWY3Ef7ftvdzu1YQyJSOswBO%2FwXGLgLKU%2FVeXh6wVvfNNUhPB143uEfjuZF%2B9C5va04pOUI1DPE4pRxWMr6E7%2FVkF5ro%2By8eqVuZRM3D3uU9mfUAnWk%2BxQub5etfOYhKwIKx8QB9lmNzSFNpbCGdVGsL%2Ffw07vX1L%2FacsSiGI1IYRKK7m8D%2FxZoXXkjnA%2BKVehiMVW%2BV%2BmCsQPizP2bahcK7Ne5r1liu%2FrejGQrvoD%2BamlX0eUzPvDMWRESdB1rjhI9HyfqTmG0%2FAV6iELLeYymC5FeWLpRHMXRpfS779SWsSljU8N2BK1xMhajqiclChnkuHtAv6q3bT%2FgWB0ega1bHP3GZoC5OBxDZe%2FZaGreL4t0SVNRCRwGgNVrO9y3d446wXnYcrrgHqJ3HNVP4YqLdn%2F%2BZmul5R%2Ft3izGd2pM5gUBOWUFJJ8mBl4rw0dsv0dhf1s%2B8mgv%2FGbPHzvuuLW5topM8TdA3FFGS02BXqDFLWFS8A9VQor%2BRzXXCDR7%2BDg4MU5m9geUN%2FQznrhcVAV7gca3B%2BF1i%2FAvGU18o1Po67ZRFJ9HoTL%2BwEDovzDBSJXlvayBoE834kdEUKTdngIj%2BM%2Fsgv0uvrZYJkRnq8ZZlhUYLLid8wzBW%2BhYMJG79s0GOqUBLgM4DEKaddtqUlHcFWMu6Px0J5dZ%2F2G4eVIutojCUnAyAAVef2r%2Bdmw7gMtOuR1bfTOMp%2F%2BvGMDTt5qavHdmVPa5jMORKNZ4fbRRd6NKEHjsCO8f%2BM3yyMLqDV0%2BtTS15wL8pCJPSI27oLeTNsQiT1Ql2zXtL9j7FgdA6Mvw0exEisXxUsUt8KoERqeRwot46iXGmdNxhvI%2FeOy86VMMwd4pJNau&X-Amz-Signature=e349d4eb4dc143dab21bee52023decb8d49a5a8ea2c32640ced27dfd0c4e08ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK52Q45H%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCHCiqAF2K3Ur7Sq%2F5SfjyRdxAZYG2FNMObmjhK7G83tAIgaPZ3kcwFtOWj9jdZBTcGa93DvWM7nK%2FqWU%2FMWj9mtMUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDPE0UGcWz%2BpQh6%2B6KCrcAzF9cLlweEjEX4ucwNtu%2FrV59i9FF6kC6OHxvJuoyjQK0%2B42B8gQnOdTsGieRND%2BSOBM5JtU%2FeeSH1lMWjLaPlXNzZJjfnzgUQ0%2BuEtHOx1XuQMM46yWa%2Bz9i%2F%2BS%2BrBcYFTL1oyGN1zhz33y4FosctLOQepvZEYxqkvxYb6kwt%2Fo%2ByjxGlFbGqkPoDi60Xe9uqNeEywqa1AAto%2Fb0CUyyd4LQDR7ACFmvf3u2oa8cDioZRfxD9r%2FzLat6uUh%2BRzpzN9oaE5qzpixKtoqtFwRtL44m8JGW28UexDA7zNH1Qn%2FAnNnoxPvMAACgsWpJi8RoQ825U88QHm7PqHk3VIMVKGIj4A78GuOvqeEdsxbcPej2F%2FU%2BRYIEtILPUnaYINE2QcT2Fgq2LYYEPQmZ%2B0pP%2FT%2FX9Wi%2ByRCTd2%2BtDE%2BzD3UEg2rw63ZAZv8NA1yKWqBBZ%2BBGXd5PKnpLihxj0%2BDDW8VXqyFXL6zY3900QN559MWcUgjHQ%2FZ0ADRFM9VYuf%2FGEv1BjepSCMkkH9XweRl8auQlS0zDO1jsI4qCdeXGu8MkhKSx6Hvmmo2hp5hpDVzX1Ie1JKPM4QhQFzzTJTNqwKekhubUDuT5alBojzrH%2BHRZ0M6dGDBO1PKPZ5HMMO89s0GOqUB3921MaJNW4FxsXjB3U3KI2lVs3ZhXacsQk1X3JItjD9UYro5GsdtU2byx5B4jx3b8Y0YAQ2cu%2BQgtABV4SOK6JaRBaSMggJhktfBrbBSDJ0guXiA8KFKC9AtW7kg0XqgcQK0zA7pecZtpmt8yTRZJpn2ZDOCfrVSNPFwMfr3vOMP4J%2Fc0AI1xXlQimMDgBnx4H0Fm5RJymzgq9YThuhvnQecOEDW&X-Amz-Signature=8a4951c68b84bb5e5389ec36d7226fd8b716221bc17a87f0bee12118ba5e412b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXBAZETQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIGKhkDSJKKH%2BSsuzkhCUTEM7UaNs8MG4AlJc0tLf2t2QAiEAtxcqSBAikOq0heJjIKKqQ%2F6viRUSS7vm9srJF5W5vhUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDPfWIg%2BuvTFIgfj3yyrcA75tSDdxtBcrKFiT5wFuyrbsQxhcAdD1x9i0kV9%2BENe7kHLc4j9JHJCSdYR6jgIq3xiprGwAUBtLXqNwi43sMdDFLjRr%2BgzGpJIdiGkZ1SrcsYtyVJsPQL4pZuF5ko6wTs5kVWdoE7kjharRAYvxtwfYMChAV0Nh2SMAhb3XLjLKM6rz2RetMjge7z7Tp9HuC%2BZq11JfuBS3MoaW7sKUHgA8M5dlAF%2FzSvfaM5tyfh5GI6D44ch9gtsmoNRJTiwigGnp0eOaa4P1jmrxg%2FHuaKOrLBQ8o8%2BkE3MRUWtOjEf4joshckTuGLT5IBXylIxFM0NHz%2FGdfWqvxKWIG8txjBEC%2BQbUz6quEHqpEqrw8wh%2FITYOk%2BQpe2aCWYSBaLu5YX1Qhj8h4UlssPbFm9xbPko%2ByC9mUgJWzIjOdFTBxvM6l5zfaYH%2Bm09JXXO%2FideueHMyJbDHkq8i0BPgiLWF654ueMjGza681lhN%2BAFpQ1UrqMzHI%2FCyupZPmEHcJwgpqZbsl3M%2FNGDfPDPmRge%2FBrf9jaZ%2B9uKtceDUpDD9nUrg8Od5vXJEtasFghQNWfGq5Bumy8q3Rv9zLnCrre2vjwqqD1zM7M0mcB49pKLX5fCX0ukqQwUULKoONr4zMLm89s0GOqUB39xzhBP%2BbyesTdtTiEoDHPZ4HC8hHV%2BdjFJYMoZQpbGvixPpfdY4okX09N3o%2Bw7cor0Na6G5Gcgi6RVAVSKjR40Urpi2eSQ9ZOshi5kqbbnOeZvIZ2FXrm%2FXKXCBMCshGRnEXZ0ar4Ot4UfJOTNpQLdccPkJv7XRHh9KkC%2BsHuNaQC6Jw%2FFbI8BdZC%2BXlx4xP9H%2Fla32IGUlHe0HIjhoW%2BR5ZWjz&X-Amz-Signature=989821e2970e28f82134dab738f65f68efdef940d6c28f4c3a4b7b93a22b0815&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXBAZETQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIGKhkDSJKKH%2BSsuzkhCUTEM7UaNs8MG4AlJc0tLf2t2QAiEAtxcqSBAikOq0heJjIKKqQ%2F6viRUSS7vm9srJF5W5vhUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDPfWIg%2BuvTFIgfj3yyrcA75tSDdxtBcrKFiT5wFuyrbsQxhcAdD1x9i0kV9%2BENe7kHLc4j9JHJCSdYR6jgIq3xiprGwAUBtLXqNwi43sMdDFLjRr%2BgzGpJIdiGkZ1SrcsYtyVJsPQL4pZuF5ko6wTs5kVWdoE7kjharRAYvxtwfYMChAV0Nh2SMAhb3XLjLKM6rz2RetMjge7z7Tp9HuC%2BZq11JfuBS3MoaW7sKUHgA8M5dlAF%2FzSvfaM5tyfh5GI6D44ch9gtsmoNRJTiwigGnp0eOaa4P1jmrxg%2FHuaKOrLBQ8o8%2BkE3MRUWtOjEf4joshckTuGLT5IBXylIxFM0NHz%2FGdfWqvxKWIG8txjBEC%2BQbUz6quEHqpEqrw8wh%2FITYOk%2BQpe2aCWYSBaLu5YX1Qhj8h4UlssPbFm9xbPko%2ByC9mUgJWzIjOdFTBxvM6l5zfaYH%2Bm09JXXO%2FideueHMyJbDHkq8i0BPgiLWF654ueMjGza681lhN%2BAFpQ1UrqMzHI%2FCyupZPmEHcJwgpqZbsl3M%2FNGDfPDPmRge%2FBrf9jaZ%2B9uKtceDUpDD9nUrg8Od5vXJEtasFghQNWfGq5Bumy8q3Rv9zLnCrre2vjwqqD1zM7M0mcB49pKLX5fCX0ukqQwUULKoONr4zMLm89s0GOqUB39xzhBP%2BbyesTdtTiEoDHPZ4HC8hHV%2BdjFJYMoZQpbGvixPpfdY4okX09N3o%2Bw7cor0Na6G5Gcgi6RVAVSKjR40Urpi2eSQ9ZOshi5kqbbnOeZvIZ2FXrm%2FXKXCBMCshGRnEXZ0ar4Ot4UfJOTNpQLdccPkJv7XRHh9KkC%2BsHuNaQC6Jw%2FFbI8BdZC%2BXlx4xP9H%2Fla32IGUlHe0HIjhoW%2BR5ZWjz&X-Amz-Signature=989821e2970e28f82134dab738f65f68efdef940d6c28f4c3a4b7b93a22b0815&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJH6HOGR%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T221420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCiP8II%2BLMU5KlC8EFNwPNo275qx6F%2BpML9OYDRNrnc7wIhALO2pPoTNNnDacbmi%2FAgdZcJWt7r5uwQUDbxuAKsMeBQKv8DCD4QABoMNjM3NDIzMTgzODA1Igwnd%2BLYRZuCbwn0UW4q3ANoLow3rR8tC5gGOnMBMOfMXbmwcCoZMwnbl0%2F51iAe5ujZxezdLZhciJw5Aoo%2FeHXLCvyYBJtwhsVwsQH%2B%2B7mTHCh%2B7fAfAW%2Blt231AIdg90zW5jxRylHgFX1RhLz9K09qldIUIZplITs0qbaXN1NwRBgh9MJgOATQflavZcFpEtabmyCJaSQUUCX8BzC5GYOEFxdfBIkAMnwgNjr0Oj8O3J2MXLkFB2MZXGmHodRwGzloKnqE1lvguV3ipNdU1qo20ZMYbeVFDtBuCo3CUInBKped0IU2nFTrITwSrFWW3tQ5Bl%2BwZg6B5muRGCV1lnkmd9dnwa5Yxq6YQGGDgOTPjivXgYmde4p9Mx7X8ZC%2BG0aTV3%2Bt7mcbdao3gdbuXYXkjcTRkmTT2qN8R9br0JSw59sgG0s6Xb7K8Uqd6yW%2FLedwOCish9n%2FRXWMrl2Egnx%2FeDayTimBmsWyeb73Z3YVlCZjUnDqV56%2BqnxHZ%2FZHjU69wCh8txGGpgBDOXJsNo3QBMaqK5NhlVDexOes%2BMRTqfBBxBCnPe8wtsJ6WF8eyeVkRIE9JbIzr%2FwqOEA1BqMB%2BIwONp4CpkQQ2fuBNymnYo%2FNURWE68w%2BtSSej8qLtNv2%2BME5j4etkqtKYjCQ9fbNBjqkAWP%2B5tQjJFUOeZ5AKUsBk5CtE%2FNMrVpcX7cMr9yMpv0p1EqxoVT%2FQ5mra7XgCJ64MIn23Mx%2BYQbWE%2Fxm7mQfn1rQOvIWJ5A%2BICjMxmsVWnboZ3M5Y7SrzHfQ%2FwXPKwHl7d16R8jsyiuLfM2bHFo5z4Etud4RvVUoRQJ4ygk51uj35FLUtL4kTzi065CRmeZLB8YPWhHUQccBK%2FYanioO%2FILbnFA%2F&X-Amz-Signature=8a1a927173f27659b837e64efd10b56ea2644e540feb7b50f68f1b5d5c2bd4d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

