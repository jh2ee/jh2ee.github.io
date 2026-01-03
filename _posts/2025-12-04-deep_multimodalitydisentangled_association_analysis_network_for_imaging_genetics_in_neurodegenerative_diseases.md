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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USGKKWZW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIBFSrYbmSwXZL7HVlv%2BJJUsHwKya7ea0xW00I2ex0CgPAiEAoXwzqeFCrxSLCm5EC%2FIv5WjvfiT5uS4pXQjKylI%2B1pUq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGtRbmotTL1yyo0GPSrcA4MljYjpaIlvscyyTATTbm5fXizGpqFe8MedDcbqEElJYBhzXJ6ci47JQhFzcxcOpxdGKEXnaDlDzrIxTWweuuL%2BZyMu1RcpIuMmkh8%2FpXNC%2BSvF46GLtZCMWKUhsjr30kMghVIlClIgLiWnq0Y1%2Bp%2FBSwld8eC9sZYwY3KM138rnGI9xtWUPoEUGu%2Fp2H%2BaSe5U5mK79RiN%2FPDBU%2B1AaD1euk%2B64PgufI38UoDc7Ixg3xv6DpcTCH9q%2Fwujs5Qcm%2Fize91VwWnDM%2F1cJpbZyd9jPKgmW2DszMCmK4jLboz2xKUdBTjS46GTaG59%2Ba%2FClmzf2mgO7p9ROunjL3CwZ6nuLgAJywWede03bitebYlqOssVWFin7dw7mPf6rNOKwiBZyrnoweilUG9tlB3R6s48Q%2FlffUFgHQ4V8ZZz6cmGmwlHhJmpLgSJIQdcQDhCNbsztWKgUNlO%2BpXeXBUK9gxl85Yxw95b6yQM014BlEuSF271xdyVwaqlGd%2B2iLk3Zbm4yePbmQ%2BTf4LDDAwtA411QQZ%2BevpBBUQDnk8JhiPhCfyht%2B%2FOsADWp7k%2FcbGuW9NvVeZdWhse0Cr3hTeXzyfI8tDIBoQL70KYl9Pz3uM5fCt2H0INbvQiGStoMKzp5MoGOqUBCAITp%2F%2BXSWCvf2zUzZpW%2FLvcykc3mAUaG2J4meDcDm2UiZAqiP2kpu60shYr3v7mqEh85GioMY7TkoO7B72ZvQ55Ow%2BpJfB7ISwYQQJRH2wpcPwyy%2Bb%2FhEGcUr%2BfCBG%2Fq5YVIqp%2FRUBkgTT6AiHnk1p2U7X1RFOb6iXBYA1aryPe7PSDIzL2pdAbghleXsRCz6SUfJ9tfGEW%2Fa01tcs69moCPM%2Fv&X-Amz-Signature=ea5d97a382ce725df6cfb845d546e0b8f0b5c999df3e0e81855f714c486cf7b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USGKKWZW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIBFSrYbmSwXZL7HVlv%2BJJUsHwKya7ea0xW00I2ex0CgPAiEAoXwzqeFCrxSLCm5EC%2FIv5WjvfiT5uS4pXQjKylI%2B1pUq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGtRbmotTL1yyo0GPSrcA4MljYjpaIlvscyyTATTbm5fXizGpqFe8MedDcbqEElJYBhzXJ6ci47JQhFzcxcOpxdGKEXnaDlDzrIxTWweuuL%2BZyMu1RcpIuMmkh8%2FpXNC%2BSvF46GLtZCMWKUhsjr30kMghVIlClIgLiWnq0Y1%2Bp%2FBSwld8eC9sZYwY3KM138rnGI9xtWUPoEUGu%2Fp2H%2BaSe5U5mK79RiN%2FPDBU%2B1AaD1euk%2B64PgufI38UoDc7Ixg3xv6DpcTCH9q%2Fwujs5Qcm%2Fize91VwWnDM%2F1cJpbZyd9jPKgmW2DszMCmK4jLboz2xKUdBTjS46GTaG59%2Ba%2FClmzf2mgO7p9ROunjL3CwZ6nuLgAJywWede03bitebYlqOssVWFin7dw7mPf6rNOKwiBZyrnoweilUG9tlB3R6s48Q%2FlffUFgHQ4V8ZZz6cmGmwlHhJmpLgSJIQdcQDhCNbsztWKgUNlO%2BpXeXBUK9gxl85Yxw95b6yQM014BlEuSF271xdyVwaqlGd%2B2iLk3Zbm4yePbmQ%2BTf4LDDAwtA411QQZ%2BevpBBUQDnk8JhiPhCfyht%2B%2FOsADWp7k%2FcbGuW9NvVeZdWhse0Cr3hTeXzyfI8tDIBoQL70KYl9Pz3uM5fCt2H0INbvQiGStoMKzp5MoGOqUBCAITp%2F%2BXSWCvf2zUzZpW%2FLvcykc3mAUaG2J4meDcDm2UiZAqiP2kpu60shYr3v7mqEh85GioMY7TkoO7B72ZvQ55Ow%2BpJfB7ISwYQQJRH2wpcPwyy%2Bb%2FhEGcUr%2BfCBG%2Fq5YVIqp%2FRUBkgTT6AiHnk1p2U7X1RFOb6iXBYA1aryPe7PSDIzL2pdAbghleXsRCz6SUfJ9tfGEW%2Fa01tcs69moCPM%2Fv&X-Amz-Signature=ea5d97a382ce725df6cfb845d546e0b8f0b5c999df3e0e81855f714c486cf7b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXSOT6CA%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCFz2TsudBkwQJdpIShB5RvDofObAee0wOVzAKPb1OxOQIgQzSd95D9SPZuvINiiL86cnhTtyW58HT1dPsF9xmj7SYq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDJKGYL9GwE78ZnWyoyrcA8f2Du1k8NFqCSZAPmeKU5OA88aOkhxGOzCHweazg%2FLEM9Oi9aBE2Ic7Vo7kziAZo2AeAhBko5PnFSOf8bmUYZt7x%2FLdvZHSkCDUAW2YC9VIvELhSHQIXA1iPEFvXkneu8S9gTwgdGJY7QvS0yDp078RHSeQ%2BE69556lt%2BNNuRjihIYrJNYnVpORpMx5njI07pXfnGjh%2BjqhmJcBKz4JPkSHujA5DqMjEVwZcIt0r6xZtkKcnKHvO9%2FmktrrlcW%2BgcIhK%2Fu9UQhRswulAPCPaQDqSehWWqf9WZWhTbtNNKGaB2yZunNeF33WtytUlRtH1SnqPvSdNEkqKzrDNeniIfCLddyrC9F72wMVdfT8ylFKaG2g4OtKt4JhSDxHXBWMo3LvJYlS0yDdBLi%2FXG96HUz8OoIh8KlMQrMetTQpzzItRcEzP7scmM304OV0A9vv%2FTNMzwH3dELHnxufdOhbtRLHpzcMvr0%2FT05fqpK%2BSDgKVd3diaZZ6STwfcConTEeEiEntF%2FvefkGHleSpkEs5RLVnfnZhf0N%2Bz0VDDjamwYT1Rpwqzd1ykw77PrBp8b2O5941uNQ8HRcsHN9ykgjoB28k3a1mPvPZSm82kXsc9IQgTrNlp0dceA33eDaMJ7w5MoGOqUB1uVtTRccVB97ae5p7OuYGyLgTgzJcZgjmlC8aHQioAvKwUkK9%2B%2BRhTaNJqYdb58O%2BTeufNxMmAGuipRJJiozu60e7HwoZw5hFCt2gCUXZ2obn%2BkUiv9wrfuQxIHGR%2BIB3q8eEqgYw72HyZZ9Q1%2BAPBfAzsmXEfYD52R9HaxB3GUmjdqQeobXNDMsApbR%2BcFs0eLmHaZ0Wt7lBbNDLmphNi8VzkHG&X-Amz-Signature=b899650ca3fb2f1b3ee1bb773f66b621fc80e8dcbdf58535ac53cc3f4de5e4ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZKMW2M7%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIBqwPPn7UWHV9ln%2BbfTj6gPaznsJ0smoXAjDTLo2L%2BdRAiB4EDVyvOb7dKv5JJkBwfeemCfKtc0pq0g2ArRvzdmyWCr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMeOgMoKDSLsQJGHawKtwDYHJB1w6z9TY0L5Ab8pRdWFmVXNo2jsSIg7g7qRV7Cw4CZfYzq5R7F6FxzKyYtXy1sRHKC5SioYNfRkD5VdejNe9XmVbTnZlPnuunSt4rEWNczM%2BFjjjnbvrBW2DmENhg9qoP6iEZQyxtq72jq3zlOEMarExix2Wrdd0NxIfuKrJ5%2Bqj5kaszcM0jNdFsbnpwQdLjfaOanUDltUxJdJ3aKInC05YNDUzP8%2F3mBEPKVCisnOVxX874LJHySuOjtx1dsGlRdtdL5TJBVH3E0MucZSnm5nlY2LGFAZVQBvfT3KQ9nnZjnw%2F3uThzZvgRjIrgN0S%2B4%2FW0V9wMwLbYqHPHOV%2FT9cX8W%2B1aUCfmHFK%2FdQUoSNZ8ZEywa2A1IhHks2GP9Jp8aUXaNXf4DjjY4ojsSwOXYtmNv205AvLG%2Fv723CzGp%2BZNj5qOwu4UMIbaQAma9a8130WkG6RsbABXXj9NCxlquXLD7oHV7bjT7ROKTKntRfSjxVrR2g22CJGVTFh6z7vTqYg0Q2w1hPN7H9O1iGczUk6OuEnSnt0cE0VOb7C7VA8440RmRXlh9Qj84os8fQ61cv8lyJBlQvQKN0X%2F0aDyewyj2%2Fy9lOl66evpwYms8%2FDVmTrtZLNFBLQw5e7kygY6pgHSFXbyAq%2FDTU2BcQx5mn8QrVNqgES7ejSX6f%2B%2F7dmmW7liqkQX3y8MwF5nIwQDKIhUgrsQ4EIVSRQeNvkEPLYNQV3yVq%2BnZNjcY97kMSQ%2F6W8iBiKt9FO4PD%2BgvHz8%2BshIW68b4nNXQMBfeyAwt3XDfEs2XVAcbYtMW8qeLwrwZMqHFjP%2FViBBehrwmCmx5zlvlXMgBYydoWbwyYkmPXuAfsHnaQt%2F&X-Amz-Signature=083edbee4360a8fcc086e7526fefd9e5303a9b1e6003a2ac2a9def85ed050578&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZKMW2M7%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIBqwPPn7UWHV9ln%2BbfTj6gPaznsJ0smoXAjDTLo2L%2BdRAiB4EDVyvOb7dKv5JJkBwfeemCfKtc0pq0g2ArRvzdmyWCr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMeOgMoKDSLsQJGHawKtwDYHJB1w6z9TY0L5Ab8pRdWFmVXNo2jsSIg7g7qRV7Cw4CZfYzq5R7F6FxzKyYtXy1sRHKC5SioYNfRkD5VdejNe9XmVbTnZlPnuunSt4rEWNczM%2BFjjjnbvrBW2DmENhg9qoP6iEZQyxtq72jq3zlOEMarExix2Wrdd0NxIfuKrJ5%2Bqj5kaszcM0jNdFsbnpwQdLjfaOanUDltUxJdJ3aKInC05YNDUzP8%2F3mBEPKVCisnOVxX874LJHySuOjtx1dsGlRdtdL5TJBVH3E0MucZSnm5nlY2LGFAZVQBvfT3KQ9nnZjnw%2F3uThzZvgRjIrgN0S%2B4%2FW0V9wMwLbYqHPHOV%2FT9cX8W%2B1aUCfmHFK%2FdQUoSNZ8ZEywa2A1IhHks2GP9Jp8aUXaNXf4DjjY4ojsSwOXYtmNv205AvLG%2Fv723CzGp%2BZNj5qOwu4UMIbaQAma9a8130WkG6RsbABXXj9NCxlquXLD7oHV7bjT7ROKTKntRfSjxVrR2g22CJGVTFh6z7vTqYg0Q2w1hPN7H9O1iGczUk6OuEnSnt0cE0VOb7C7VA8440RmRXlh9Qj84os8fQ61cv8lyJBlQvQKN0X%2F0aDyewyj2%2Fy9lOl66evpwYms8%2FDVmTrtZLNFBLQw5e7kygY6pgHSFXbyAq%2FDTU2BcQx5mn8QrVNqgES7ejSX6f%2B%2F7dmmW7liqkQX3y8MwF5nIwQDKIhUgrsQ4EIVSRQeNvkEPLYNQV3yVq%2BnZNjcY97kMSQ%2F6W8iBiKt9FO4PD%2BgvHz8%2BshIW68b4nNXQMBfeyAwt3XDfEs2XVAcbYtMW8qeLwrwZMqHFjP%2FViBBehrwmCmx5zlvlXMgBYydoWbwyYkmPXuAfsHnaQt%2F&X-Amz-Signature=43482720f7277a6fd7ca658899a998ee6a89aa7ae0028732532594490950d7bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCIOUVDN%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCy%2BTwAEHo9Q6wtZJvc3RsDf39RQb0KK6nYCXEKyweR%2FwIgVkpdDQ6KJ2VT0Sgy%2FsOz%2FIoXVh3AVLxdSv0xo%2B8dVtEq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDDfK1s0sRKAyfj0WaCrcAzqhcmetG0ycrLPZBlGxafS%2BDEttg3yalDQvS%2Ff7a9KmeQuynQvuGOymZevKqfjFrONT4GuRPhI%2FW%2FBnMxPfciQHTf2dZ9gpIJv5sbAbAnXuvYSUxDljPNj9ME1p7grb8rquRFtziggI8mqIv8gNnojVGwfk5FRaMVjsTwwduMoAY2zaVwUvawTukHSqTazX19SQrDjks%2BDfclIGrYjbQn3bTJsqWntMZFsbvra3V5X2WLNoo7yYuflhkLjYO6ainiP8Q3XY67W45NBtDFHZl5B5j1OGa5%2BQw2%2FhhmkXuPtgLC9cgfWzBZMp4k4326O52zuRW27AFEaeODmm06I9uXkYL%2FEQ70nBueKja99zxNE8INvZPoax9hJSNGL6DBgnetQeCBeJrsrq9LWVxiMWXj5EHZTILG3IgIDUud6%2B1tMfp7430shQ%2F0BfN0hR%2BFXBvOvYAk6rGelITiRQDkXTaTrh%2FEaRJ8FRqfPO1p8YwKjZHEyXXeCDKv%2BRIGmbVx7%2BIMqfjJdl2IkMdMkb8IlICV7pGCiPn4P05%2BK6Y%2FWgPahIU%2BLLlSNFWuZvly2rlIRwR8Dz7F8nHjJ7lKX9U4zN1m2uVlnf4Yce1UIOCtyWZsxun1aGn7bNDAgfB6QtMPzu5MoGOqUBaiMMVU2w9UwRK4q%2FiKWh57gLjOCUZxqgH0pmuodQXJSngZ1ynBNtlAq0WhKZxNJm278BImfx08nIBdsT77CaTfSh1mDdncsGu09uklH%2FSCm%2FABDWy7AAI7vea8h1uSkJN2TvyyI8e5lB3jachPgCJEA4nvF2WOuPlBACUApDNW2jXC1UsbhnB9RtuHAA4hXPbI%2BfK68Un842JpyF4cG8FziPviH%2F&X-Amz-Signature=35cc414fe927e801b11b737db719464b2d3c73891f88e4f56570fc532d9008b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3GBSQSZ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIF%2F1TC7SPnJeE8ifO4UbTFi7uLVEFwiBWgKLG9cyqsbHAiEAm7dzDtnIgLG8zmhzUX1NJkIf4pqKJvWGd01TERL6%2BE0q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDLuoJpSrvtBpbl6%2FTCrcA5EvpzuB0yl%2Fsq%2FAsApMqfFVyYb7eNStM91kSw%2Bhx5jVf9bsp1mXzL1mhKPHqc3rLfrgKRk23gsekeEHru7UldBQXDBdWBQG951BmOKSM%2B65pact74d2uVGJR2Rr5hkOSj4SgXw%2F%2BkHPu7a8Paos2QE36JAjFbw%2FxJTNjfUjo8ES4AHFfKWzXZrJadtX%2FOfnNhIvoiJaQswWuT7LH25b7lqzlOTucJU0U1Zs%2FeSXssUgqWic8oUYutgMDjK12W8pLXf3hmUtgdksBKMPFwsvh8sq0IaPItBcbby19H%2BLBpV3irZj9lxSIFm2wKcNYARBiZkeFwdO81XZ7H15OnFWAQFkILBaG69%2F%2Fc8d6HHjl%2BHp6C0WoVLOAEs1VrB4YOsCe9d0yFk1ya4JPP%2BAgZJ0ewAaj4w5bRgJLEXHbCYVai5GWG8CwCyCyBjZU%2BTyFsI54sQPwt5IABDB92He2ELZvC4RQVPatooYk48lN%2BXo8jE4GYOw6X230My8pdrxwLPmEL94mXycZyZFqLDHJ%2FiOQTmonJXu52%2BY9pIi16G%2FYwzNyS%2B20qq1td6zQe4CAwh38gcp%2Fwrk27rtYFO4vi2qlIxeVRb%2B9cCvRellhpARnZ%2FyWZDDKR5xOWIPQgC1MLXl5MoGOqUBvLfDQ3KITl73GNj0kgR99PPOKjiQZlrvE0Hx9POngICVopNabMEdNLzSz%2B7QWMRnmnfnytlIm5mzsJYB0UGiC8038uztpqLku76htD1pOi0%2F1Fv%2Bik%2BFjL%2BEGZRvQHZhOEdXrgwyMsCz2FnKnS%2B5MLdkut0H0U4Cut5q7oll0Wj2uRxhbBPv9g55qXPz82jMr6ODKVfl%2FE07FAuLQxA2yU3%2BNc5L&X-Amz-Signature=262897805912e90f5da6fd45f939c620e933d80ca034e6dd5b0413ab0f18b7d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIQUQ2AY%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIAOrUPI7hvZ00nez%2BNuFEjQBbnnECCY5e9wfsTfxBiHmAiB6cCRzsePCS%2BlIR7kfGYJjFJ55eOcDE3Lv%2F2iJMD13uSr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIM8277hG15emIGH7deKtwDhXDtH%2BnI%2Fao4qU9MVvV%2Bu2KA24emEty7YuIKsPKZQf%2FaOOwMf0A4NHYZJorQeMUtizh17BkvOcVTMDQKia7pdn2xPRRD4N8ZtuLAX7FCFNlwUa6DN6Y%2FHrGjahcnWN7F%2FIot9xId1rN9MtvYS4Hhrai2ltDpkVEv2b1tAbhJ7uaUYsWtasu3%2BE9kticZlMEutMWNlcCeaxR0Bsor1nPMgTR2Y3xN0zIr%2Bm2cARl6WLB50%2FsvU6ZiPHOl5yUY1iH7IxvAlk%2FSaT%2B9DdFoLIgHH8%2F%2FGBgrxaW8%2BY7LkP%2BNYFguF%2B7%2FW3HcgZtIrrxiO8LNXCpkGgNJxZCsa4SFHnrKfFetFaRPXUZfuAxKXEI49KZSkSZkM2UjWZlVDs2OcLXOvwGhWJIcTCS%2BUh9sjOB%2FOB868pE%2Ftf3vb15yjyhzsdRKk4MQofN6jtjb6SYZOouAlaUq3SXnhAflx3FWuKzuuMuHAAL24kldBM%2B2GBX7RKfx0lomH6SjIudKBOzP%2B%2BEsK7S3dULz2spTNHaA%2BD78QlcVcwbVz23Ni7oIaICbvgAf3CB7%2B4%2FjQFg3Bx5WwM6SceB9yu1%2BIzKZPYM4uLZki72AlJO4sR8rjzaWZzqaiLVGP3YcADGVDLSOX84wp%2BrkygY6pgFP8skGJVkWnLn%2FrEh7XJp8BwGsvJmB76M8L1ybISLph8Yh4b2XEdYr51pKiPMo%2ByVLjD5H3KJ8ltz1Bc4YXcT5pb6m2c7IPKqSbysLh9RhlHJXHWU2ARYJmSSj6qMSa2pqmDKq3odM4CDO7pzlSE2MHjDS%2Bs%2BXDZ4NWxWrbkfW1CPoVOYwmYWXGREuDilFyTyDxaJgXx98V740gY1uWSWBAyPMEose&X-Amz-Signature=d8d48d8daef3bd0d4b3b24acaad9d3c27bd16c5f21ebfbe5be43b237c7d24469&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVOHUYSM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCLjs5hs5mYdtw7q9BLfhqwcWEaR1wA6u%2Fq%2F5hkSp8hSgIgPuoW4tTU6qFBRMtgnlJ5zbt7xdHjBfxQIsijN4LkE7gq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGgHT%2FCBUmkXPpRGBCrcA9OdjlvOlZGSA3FxDLY%2BRCGfiN9Zo9Bi4LGykHQo8d%2FcQ3J5K96vM3Oq6mUmgYH2PU1PAhOgh%2F9A5%2Fd8vjAAkSThdyuIke9CK1eNuy3FuVkHmZ1m8UT%2BnVbXWdLefuuQE7wgvymWcBJ%2Fyqlld3JMoS6laiMVzSolHDpa%2BaWlpMcBUzhR7F51IUqqGC2BKh2aZi%2BIblhXZlb%2FtrBTNJtnt4XO99Knf3R9%2BJPMFicRhsITiUhb7%2BbOmrMgb9tJPbb71d7KgVr9%2FIhpqmWltBuuA9yfEJ84giylG65p%2FW1goo%2FgPizToQRFVchkYX1Mfy%2BX84cipcHVt9tRRV%2FBtpyoPHi2%2F9v2cDIvwruCWOBv4ZpKHUS2fvJntv3r3DL19ckjqDvdMCfuYGPJYzYy6WwcKPZnKc9E76jnznkW4RgHMIVLUepidY3Kl%2BDUSMhw0KUpmfYnqXaCwtTvuO3m1ef5dXzLP5qjdTixp07wZwnieQOH4zv%2B%2Fe3OCAqywdJ1Hja3dVRcrrvuzHuCtBm8iIifqH28eK4uFYsYgQ8vc%2B7OuJumY%2FsTlu23Rgjar6lnCsLw%2Fa6PFRyCkGuMKPYN%2FHtYchXa6T94mCFe9JGI%2BJGBJzfP5MBxYtkX5U3OnAWHMObq5MoGOqUBmQNrb%2F%2F6avUpm4feMLZC69KzZ%2Fsa8kvByNhcFpg2L4E4xJJ48k5yaKxA4yGfC%2FwclEUj8U7Uax4J0QcEZne93Bj%2F69VyEAH17SHy4d7boXqZ2fQDpiAHS9Und5DfeLtCZG4RdfdLtew%2F2teCgutFZTlvh7gtCxjLpWhIv9jjFdP2X0DOWz5c4wXU3E7H3XuGqINBysu6a8D774sIpv%2BFRW%2BenuDi&X-Amz-Signature=0954f54edae7a5537f68f98b889e0e0c5e9ffdde597c2d3a432753e9dd92a1e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVOHUYSM%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCLjs5hs5mYdtw7q9BLfhqwcWEaR1wA6u%2Fq%2F5hkSp8hSgIgPuoW4tTU6qFBRMtgnlJ5zbt7xdHjBfxQIsijN4LkE7gq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDGgHT%2FCBUmkXPpRGBCrcA9OdjlvOlZGSA3FxDLY%2BRCGfiN9Zo9Bi4LGykHQo8d%2FcQ3J5K96vM3Oq6mUmgYH2PU1PAhOgh%2F9A5%2Fd8vjAAkSThdyuIke9CK1eNuy3FuVkHmZ1m8UT%2BnVbXWdLefuuQE7wgvymWcBJ%2Fyqlld3JMoS6laiMVzSolHDpa%2BaWlpMcBUzhR7F51IUqqGC2BKh2aZi%2BIblhXZlb%2FtrBTNJtnt4XO99Knf3R9%2BJPMFicRhsITiUhb7%2BbOmrMgb9tJPbb71d7KgVr9%2FIhpqmWltBuuA9yfEJ84giylG65p%2FW1goo%2FgPizToQRFVchkYX1Mfy%2BX84cipcHVt9tRRV%2FBtpyoPHi2%2F9v2cDIvwruCWOBv4ZpKHUS2fvJntv3r3DL19ckjqDvdMCfuYGPJYzYy6WwcKPZnKc9E76jnznkW4RgHMIVLUepidY3Kl%2BDUSMhw0KUpmfYnqXaCwtTvuO3m1ef5dXzLP5qjdTixp07wZwnieQOH4zv%2B%2Fe3OCAqywdJ1Hja3dVRcrrvuzHuCtBm8iIifqH28eK4uFYsYgQ8vc%2B7OuJumY%2FsTlu23Rgjar6lnCsLw%2Fa6PFRyCkGuMKPYN%2FHtYchXa6T94mCFe9JGI%2BJGBJzfP5MBxYtkX5U3OnAWHMObq5MoGOqUBmQNrb%2F%2F6avUpm4feMLZC69KzZ%2Fsa8kvByNhcFpg2L4E4xJJ48k5yaKxA4yGfC%2FwclEUj8U7Uax4J0QcEZne93Bj%2F69VyEAH17SHy4d7boXqZ2fQDpiAHS9Und5DfeLtCZG4RdfdLtew%2F2teCgutFZTlvh7gtCxjLpWhIv9jjFdP2X0DOWz5c4wXU3E7H3XuGqINBysu6a8D774sIpv%2BFRW%2BenuDi&X-Amz-Signature=6c807ec5cda0e063bcc55557bbdbed37f7d9f50a6f80b77512dad2326cdedcec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663K7ZG6RK%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCn54jeHHzYpv7g8nFRBtWrTQ7%2BW6gQNecXpsHay4%2BJwwIgSoJCIEx5sHqA3ziAHYO%2B65ASFCtQ3mX9fSZ0AVo7ddsq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDK7E%2Bp1kBcfPhGWN7CrcAyQeutVG7xZ4UjeN7pv6qe3FfkwUoAKDiJoq2WkCCVf5Xj5A2shnOWuzwJVIQiV67zCegHqkikwODkkQ7Oz%2F5FVrSlvm5Pm274XTkYDicLEH9MJ3JADC1H9M9ZJjQtWXM9zVdoGMkeiqB7wnVL%2F5Q4yVIT69oG2QLjfZR0q%2BmgvPCd5dKj%2FMnyE6%2Fh%2Fd7R%2BHe%2B3oc7Xjf4es%2Ba5oob6lOpJn7mK50n14lZ7gzCfFamwcQGKVqt3fB6oRjcGx0QjKNg2E86NHU6qWKdXOIwrzukmJocMQRKizH72JrPpEoo4Ma0C%2F7m5VqHBj49i7Nl3n6GmWm%2BIhkESTejIwV9NDLkwFAiroMofq2ly9VfqiUbva8VtY3PvQbqHnseV%2BnbnRLmbpdG%2FRz0rhAArmjn%2BzDs40x932OR9%2BKiVqZkLuBgTeJiYDYNVcNOsindhaJ%2BkOTNzuw1FMwxKzMLGK4Sa3XZkgOzhZeElz196NUSVecuc%2BAz2TyQnseed938oH8LsE4xmQYU8bqIN2u7NJ1we4UIMBsRhhFhEljclX%2F%2F6%2BhANnKGpl2%2BBXRO0Fu2rPxOKE0EX2ZxBJUz3Qbvht3Vge8UHVMR%2B8W608%2FeDFej2jVsvjGouK3ntl7GkS3yjgMPHe5MoGOqUBqn0LyH%2BECUmim799hdC%2BffqdV2eWhM%2FPH9DDN0Upr6uJj7TQkQi29lX8PhxTMC38OasLeCStNOORy5Q0VJzg33dbRMSq0lPgIVlf6rieiC2rlIGbPxFYuxb9POO2b0saDiQKxDhAhJDSicbPFh7OsOVz9EQyBWpD2CCx0xaLBJs8D%2ByyuW701xnsYO%2FI05jaZGhDP9PZY1ZOmtRY9WufPA2TdHjE&X-Amz-Signature=bee708c0d2ca1864a9482769d1611820ef7718b13fcd23f474bbf6c84b3a1c47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEXYZEIW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCICLZwYZB7UOcqDv%2FpcsvRnw13vvKHC3byNbnnGJBZbmLAiEAqLmGPwx%2BAskh%2B6E%2BjXNg8%2BDYPt%2Fi3Nn9%2BhHIuRyuHUsq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDI%2BLFCQIrifC6JIqjircA7T561hvWT7G4UAbIw95hL%2ByMczjw3GOi4HqsB4Eg%2FRbP7p%2BMo7qrNlAomXPNAFwq6MP4uG6xM2J91HFzOvACY5VwuOirspqhmsGbCXb9e4LKf5Vh0xrkxlhR8s8IpbA2Qs5lj7PUAA5XH1rrOrtE78xzgMuzYqQ6UJHn3amrmcXssA59PnbUmOA9XF0Hu2fJHKYaL3deJJ%2BJ6JpXZu709YI6cKzKJbylKnkTII%2F%2BcTt2TJEVxzVTofQxGnWnZSsb5VgK7ZZxxtkSAEDHgVn3SmLVIfkM31mjXK%2BeV15DVn0jN9BXDE6a5k1U4DTJqh6Gum1qNf1Ji8p6xoj7Sf%2BNDpx5I1HqWM09gTRdIk%2BZlxnVHvlNKGcfEmI9QrzkS6EXNnDBWnWyhgj4wG%2FglBI6ARW1jA9ypkJcURiRNN%2FZHSZld5mynrA6yTv%2BnLrntdwT0mfqPpG2rryL2xEo2oClwuSbJvvMFtjjVEUC3i2jtXbtJHJb%2BzdfO76JrM1n%2F4tu2G5mtN%2BOW3ydAZpvWHdCw36hD%2Bf%2FoF0RU5k7x6jr%2Fv8nDN4uG93LL7zK9w3k%2FsqqraphSCNBEEY%2Bje0Ori00Y0MjIhgVKmhMisPgCfsHdYTpI0YKzAMm3UCr8J0MObq5MoGOqUBKe4gBlmg5Y3VAcMvRdvXS9WogMlEESEulDgsAUBmg8LnSwhegh8VFCN8aiOQTfU7q9Kw0%2FQHaYVZJ3rcWgzACSXZHOIyH9w6bKrh6ySlhNGxmvMlnxnEzGZymFGQKSb7VZQQ5nLOXfHc5zrSyKP1Ip%2FUmAs51ZGNJmEkGdboAe6qV%2FoLZhStTSqs65uvAssMKirXZBAdJWT0QJ12hvq4CG07pUZT&X-Amz-Signature=d302d4ead0a8905fee77f9c72c1489166c796c91763b59fbe5ee3666b18bb787&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEXYZEIW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCICLZwYZB7UOcqDv%2FpcsvRnw13vvKHC3byNbnnGJBZbmLAiEAqLmGPwx%2BAskh%2B6E%2BjXNg8%2BDYPt%2Fi3Nn9%2BhHIuRyuHUsq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDI%2BLFCQIrifC6JIqjircA7T561hvWT7G4UAbIw95hL%2ByMczjw3GOi4HqsB4Eg%2FRbP7p%2BMo7qrNlAomXPNAFwq6MP4uG6xM2J91HFzOvACY5VwuOirspqhmsGbCXb9e4LKf5Vh0xrkxlhR8s8IpbA2Qs5lj7PUAA5XH1rrOrtE78xzgMuzYqQ6UJHn3amrmcXssA59PnbUmOA9XF0Hu2fJHKYaL3deJJ%2BJ6JpXZu709YI6cKzKJbylKnkTII%2F%2BcTt2TJEVxzVTofQxGnWnZSsb5VgK7ZZxxtkSAEDHgVn3SmLVIfkM31mjXK%2BeV15DVn0jN9BXDE6a5k1U4DTJqh6Gum1qNf1Ji8p6xoj7Sf%2BNDpx5I1HqWM09gTRdIk%2BZlxnVHvlNKGcfEmI9QrzkS6EXNnDBWnWyhgj4wG%2FglBI6ARW1jA9ypkJcURiRNN%2FZHSZld5mynrA6yTv%2BnLrntdwT0mfqPpG2rryL2xEo2oClwuSbJvvMFtjjVEUC3i2jtXbtJHJb%2BzdfO76JrM1n%2F4tu2G5mtN%2BOW3ydAZpvWHdCw36hD%2Bf%2FoF0RU5k7x6jr%2Fv8nDN4uG93LL7zK9w3k%2FsqqraphSCNBEEY%2Bje0Ori00Y0MjIhgVKmhMisPgCfsHdYTpI0YKzAMm3UCr8J0MObq5MoGOqUBKe4gBlmg5Y3VAcMvRdvXS9WogMlEESEulDgsAUBmg8LnSwhegh8VFCN8aiOQTfU7q9Kw0%2FQHaYVZJ3rcWgzACSXZHOIyH9w6bKrh6ySlhNGxmvMlnxnEzGZymFGQKSb7VZQQ5nLOXfHc5zrSyKP1Ip%2FUmAs51ZGNJmEkGdboAe6qV%2FoLZhStTSqs65uvAssMKirXZBAdJWT0QJ12hvq4CG07pUZT&X-Amz-Signature=d302d4ead0a8905fee77f9c72c1489166c796c91763b59fbe5ee3666b18bb787&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4TEVEVQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T200109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQD5vC4BsU5ruuBeOGveUXRW6S1f1CPS0uOHIks7hLzrzwIgF1TxiL5rr1M0nTzfzZdfVomstHOEBdAy96r%2FOA8oV6wq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDI1Ku8hJHxm95wLEUCrcAxJWT4d0VbSvQh8CCywn0KD1%2FE2yqmY%2FVIqAcVGoxShQkoLTx7vPbho%2FE36uZ5Z4WowtUoXQWzHroG602J5Iymmtm3TekDUwdC44lgphCc7IObeJa83af3dbSyUvsueeB5CaVdSVP7ye2zOFwvcQw9lovyEKQX%2Fx96HUbZoL0KjFserAfidGIetVKtp%2FvA1aIyk3lr5jtQDKqcPUL8d0YkkCeGwf7YUYPLTgVgGTqTLNrzdtTALHs7STC23%2FyTxIvDzm0XwPycLKhVxtfC9hqq78s5PYxj7LcexDEww7IHrbXOkMSgyb632x9d3bmyAfGSUvKiIOWRVIhDwoydWxSyLVJWSJYWo0trFUVkLy3ncEvCkMlf8MRhRw6R0Cx2BiIHH%2Bm%2Bi8suDeOe0KWgBqiUqLRnyHL16zvmuVzRc0nbvVkWgKxYQdAqc6oM5GsdkRc9O5gqcySwYuXoshEa3fAqJl5ypbn76xuZRfTSW2TcZAbU8wNLCuUFfNjmppM7DlrmGuVlSj3j%2BrWZpC0FWwx88urb9dzkDZTPoNLwBGjKWbXh8vP8RrETYT3dVc6iOVle5khfl7TCrp6EGT%2FUAeL5%2F8werIm4dVQJd61B8Z%2F76r2rzkNZ%2FnhMoQK1QwMObq5MoGOqUBl37DYLJ%2BgxbOM9fHGhTIvwiZu7f2OZuxBe2lvv4hrSv%2FU81Zt57e8pl89JBCOB6%2FKGd2q%2FcGdzG9OQ%2FSG2W5CP2jFC7nz4YdC0w5cfGZLV839fTED9NgtnSda2gruGpDdAOdammHdvLRr%2Bxe5ldPHgKbgVv%2FCnpsqkJdLyEPI%2FTDchVCcZeHxbThZhBpMcnTBVj9LFAECgmWcwAdENV71CyVQcB%2F&X-Amz-Signature=a6e18c808f1771d96bc1bdd565f7e227ed85a96c8db5614a648a9b7334778e28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

