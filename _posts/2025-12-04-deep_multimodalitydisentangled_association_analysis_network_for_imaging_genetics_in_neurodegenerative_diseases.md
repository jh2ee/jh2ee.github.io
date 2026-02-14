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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOAD7YDR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIA7Bm%2Bo%2F%2B4h1KTVemHdK0Nva%2Bsqcf6NvdlKRldJcTZ9SAiALNi1%2FW2Tc0PRI7iitXyMOkuQi4Xnz47%2BwyX5lxVOnYir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMZ%2Bhboee6P2RAX04ZKtwDy6yjQ%2F0QdZS4bFGVbg4aI%2Fg75KOHvwaD09gSG1veoN0hmvJMD7GLNR5Y8BaER23zuuHybHq23EjMLMlLtXWK3IyE767zG%2FC3qqOEA1xGqfXXherT0XN40TJ22%2BH4hcXjnR5iVqnHs4mNZr8d7iA7Uj2UTLK0ikKK%2FBDqbGC%2B%2FUoibce8AnXtNNT5YG3mdIFGoOu9yEJ5NQ6YTNWsYa39hr8K7zXsWqCnR5PXtIXiH2iKqw6SXm%2BgkE9py2MEMSDf%2BCXgaxHuVjdf14nQ23V9fgVDAgczeS%2Fe2FI3TC%2FOqaCNFHN05CCqgbmybcymC2z8KNwujEterSugBRiBX9HjKNYtW1m8LdcTd1HPvryDwSWRNsvRrci%2FW9s8wtqw6%2FayAXCuweE%2F0LrQTHhK2fZqlJOc9nY0LhlnxzVq0%2Fh4NzRw9XJPiQPBCvIv3UYDUXLiGi1MtAiEMUG42R9e%2B7OM%2F8AddfGQgS7CKRmcdvAVc0lp6Q%2BID5g%2BtqmahM%2FKWwJKBLOJBCKv5j60EdaagYnsmuK6mcpq%2BHIdMwVGesBevAlX8NfTUm%2Fp7k4mpcRqSW2MMWY4f%2F4mRKeRhrijwSTQ3%2FK0EKitA5bMUrOzmiu6y2VkkjiNEVKKcL8fPhMw7rzCzAY6pgFCTxEGnYzz29%2BZJsL4SfnQCM9f8kVQndeKKQabVnL8u25cmyUpshu%2BE3rhW16fWuvTy8jqneWpQtTJMDXp88xEMYYMHUzfKNSG%2FW6x5XGXrGN3nwNGtzhjqhC7YNu3RE16LRy7zb7zLZRtIYDjBzAkkK7NsRBO3HKKzHsX1aiiqAEcJe5lFJEKIMZ4cdLkGP4%2BXp%2F6WPoZGFJ6jDbEcEEKq01VA8ZQ&X-Amz-Signature=3d88a2ab373cb30254e1ffcf074fa7fc9c9f9487f67227ade129b65ffd68c64b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOAD7YDR%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIA7Bm%2Bo%2F%2B4h1KTVemHdK0Nva%2Bsqcf6NvdlKRldJcTZ9SAiALNi1%2FW2Tc0PRI7iitXyMOkuQi4Xnz47%2BwyX5lxVOnYir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMZ%2Bhboee6P2RAX04ZKtwDy6yjQ%2F0QdZS4bFGVbg4aI%2Fg75KOHvwaD09gSG1veoN0hmvJMD7GLNR5Y8BaER23zuuHybHq23EjMLMlLtXWK3IyE767zG%2FC3qqOEA1xGqfXXherT0XN40TJ22%2BH4hcXjnR5iVqnHs4mNZr8d7iA7Uj2UTLK0ikKK%2FBDqbGC%2B%2FUoibce8AnXtNNT5YG3mdIFGoOu9yEJ5NQ6YTNWsYa39hr8K7zXsWqCnR5PXtIXiH2iKqw6SXm%2BgkE9py2MEMSDf%2BCXgaxHuVjdf14nQ23V9fgVDAgczeS%2Fe2FI3TC%2FOqaCNFHN05CCqgbmybcymC2z8KNwujEterSugBRiBX9HjKNYtW1m8LdcTd1HPvryDwSWRNsvRrci%2FW9s8wtqw6%2FayAXCuweE%2F0LrQTHhK2fZqlJOc9nY0LhlnxzVq0%2Fh4NzRw9XJPiQPBCvIv3UYDUXLiGi1MtAiEMUG42R9e%2B7OM%2F8AddfGQgS7CKRmcdvAVc0lp6Q%2BID5g%2BtqmahM%2FKWwJKBLOJBCKv5j60EdaagYnsmuK6mcpq%2BHIdMwVGesBevAlX8NfTUm%2Fp7k4mpcRqSW2MMWY4f%2F4mRKeRhrijwSTQ3%2FK0EKitA5bMUrOzmiu6y2VkkjiNEVKKcL8fPhMw7rzCzAY6pgFCTxEGnYzz29%2BZJsL4SfnQCM9f8kVQndeKKQabVnL8u25cmyUpshu%2BE3rhW16fWuvTy8jqneWpQtTJMDXp88xEMYYMHUzfKNSG%2FW6x5XGXrGN3nwNGtzhjqhC7YNu3RE16LRy7zb7zLZRtIYDjBzAkkK7NsRBO3HKKzHsX1aiiqAEcJe5lFJEKIMZ4cdLkGP4%2BXp%2F6WPoZGFJ6jDbEcEEKq01VA8ZQ&X-Amz-Signature=3d88a2ab373cb30254e1ffcf074fa7fc9c9f9487f67227ade129b65ffd68c64b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F6E6H7L%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIDvyF8yxQIKzfsSWiMGIsA6GXlyrt%2BVLPP6LByrPOANeAiEA009Ml0iwyi7psjFQI%2Fh0ZS9ousylGh4fab8Aoi47KdMq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDDzzMu3LjanHc%2F3uHyrcA1328CgoeXpeQ5lrkvhp%2BXX%2BEQAcap0iVIOYe4UYPh62XwfttPE7ICUI6grFvlWwF3iR8DXgRMg%2B7lN%2FcmIrZRV6VL6n96oV5hSRf%2FbcqvVcmXBvNgdVzVgWPlj08osd026%2BjVTnNyA%2Bhr04%2Bh%2BGQ2rS0vlHYewmfpBN7oNuB4qvAD%2FLghKfbkH0E9GMWFtTs7OTRfW0V%2Bf8AvW%2B8SwtYrWNTz1cWuGSRMeNEHyYQ6a4Dqtz%2FsaD9XZcX5%2BId%2BUcINv452vFW45OhZi%2B0MFQuxXVZdBUi5mCAKD4VO%2FIgj7EPSzH88hjsYuPcYC4vthZBi8fzrFr1xr2PoEKYrOp6ObaRMv2jupFJjaewt2LQuC%2BCAIMRx6zwHIxTtwbo2DyquOVkM8GUmnlOCuRkkVZ3JcGa6y8fSEilL%2FJOatJwULaEdwdn3Z%2BxTtmZIIJapm2bNpDO%2FarQeo2ZbkrfpOppFY3fAAGHHtIYNBKV5OHCqAPg2kfuaujMMtxNYDjo0xBalP%2BBmfz6QnIF7mFAgP8Tx2018ECtftEd7rrYxF5bxMBEnbSwLz33UGTtaPRBgvFlJtboTChON4x5gufZGzZyzUvhLzweEfpDztGUC40NuM2PqroJmj0e8ZTn%2FqSMP27wswGOqUBEMNrlSD%2B%2FgCtqIRwC7E9TIFpsGP8h6M0Z7%2FvlIjIWoare4AMRxQlZyCUoY6mpH8oHqRCXwS4FsHowNP2bfhR7iDJHmP0ub%2FiTtO8j1zXl1OKGqP%2FaOxo0INWztJTyeW5lB%2BUOnb3VyTQ4nvih9ZHcCYtXHqWmp9wV7znQgjgVPSYBEjY1hTpVycBwyfmTlp6sx0%2FlHFxzE3sQhW7KHJFkhft7x6B&X-Amz-Signature=83bb91b6ee6cfe68fa0c9c208d18fe0db80fc81bffbe27017f574fbaedfee090&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQGJBACN%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIB7mYVJDne%2FFY3FD5cHtZk1987fTiAJHs81HFuuy4ByXAiEA1Ve3qLr0Jz9TII%2F128zsrwVdW8u8GrE7xOBjS%2BHNkfIq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDB6ozUFZH5LsaOq6HyrcA25yjpTCrvoOXWrCnaRlUm5dILa96LC0y9zfGyIKJy%2BHFRrMjLsHwTjmsA8ikCotBWX985li7AQy07S3KNCcYyDhHaF51MJsrBdJfeeG3oPZ5Wuu9IqUDlbANSPhm4COyXd69eIGjnXd7DZ4p629ZoP7zlCW6E4LoScrJVk4z9q61dU16SCHN2wyMNdN2GdFBQ7%2B5TH8fKdlF39g%2Bn%2Fzx3tWD%2Ft8tdtZCdofbYKtIgzxY5Rw0mJGih0WW9Z7SPHKt%2BaoCBGbEWYWuUY9PljIohy2f1ZTd%2Fc9vL6MG57%2BQOgnxm%2BG9scxcUQsp9RvziGXJ%2F0B2iCZDk0CuZwC%2B%2Bn2dMABkt7knEx4zR%2B44NR3LQG3ccjGU9vuAqBbc14pjLuWYdJNCUNZg4a%2FYAPutMCGOcKoYTozspemm1Dau3hRO6CI60la8udfmdvy5HgjqNpc6YSp5Wly5CiVTG6FCjpBda6fFGI5WR7XFuTErMEmwXRlCHcJOFWcrazL91rF2Kxdq3%2F6S1Z6LV3gCB5MVrlEOBZkO%2FhRHy%2B19MxYjIVCAiKtB9Nnp9Y6PzQfVuWSFwp%2F35jwgsthaOEiLD87H2rh4gy2%2BCBsqvR%2FF1y6LF9RxucjTPtGqYCSidNWN9ddMLy8wswGOqUBAHsvGv7%2B81oW4NiV5U0Cr0Pk2OqcVi6CbWDS5cwgG9CzIo51YWRArWjbTjvWwD31sQca3aGMl%2Fu5uWxiT0DBGiQGJgs%2B8KwcqyBh9uFx9EzWlyyN2jHdrzrLgww1IFjMjuOa%2F4%2FmjIYZvxjHQkfgUr1vX0d5PiZ8Lm2%2BoeBubILt9BPqiF5LrlwVHJeyDGGTeI0z4g96Owxoa0YJnLqYeKBnsHLc&X-Amz-Signature=7d7993c4398c96f028cbac5b94d2b2ee5d166543924e5ee49faab004033bb558&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQGJBACN%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIB7mYVJDne%2FFY3FD5cHtZk1987fTiAJHs81HFuuy4ByXAiEA1Ve3qLr0Jz9TII%2F128zsrwVdW8u8GrE7xOBjS%2BHNkfIq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDB6ozUFZH5LsaOq6HyrcA25yjpTCrvoOXWrCnaRlUm5dILa96LC0y9zfGyIKJy%2BHFRrMjLsHwTjmsA8ikCotBWX985li7AQy07S3KNCcYyDhHaF51MJsrBdJfeeG3oPZ5Wuu9IqUDlbANSPhm4COyXd69eIGjnXd7DZ4p629ZoP7zlCW6E4LoScrJVk4z9q61dU16SCHN2wyMNdN2GdFBQ7%2B5TH8fKdlF39g%2Bn%2Fzx3tWD%2Ft8tdtZCdofbYKtIgzxY5Rw0mJGih0WW9Z7SPHKt%2BaoCBGbEWYWuUY9PljIohy2f1ZTd%2Fc9vL6MG57%2BQOgnxm%2BG9scxcUQsp9RvziGXJ%2F0B2iCZDk0CuZwC%2B%2Bn2dMABkt7knEx4zR%2B44NR3LQG3ccjGU9vuAqBbc14pjLuWYdJNCUNZg4a%2FYAPutMCGOcKoYTozspemm1Dau3hRO6CI60la8udfmdvy5HgjqNpc6YSp5Wly5CiVTG6FCjpBda6fFGI5WR7XFuTErMEmwXRlCHcJOFWcrazL91rF2Kxdq3%2F6S1Z6LV3gCB5MVrlEOBZkO%2FhRHy%2B19MxYjIVCAiKtB9Nnp9Y6PzQfVuWSFwp%2F35jwgsthaOEiLD87H2rh4gy2%2BCBsqvR%2FF1y6LF9RxucjTPtGqYCSidNWN9ddMLy8wswGOqUBAHsvGv7%2B81oW4NiV5U0Cr0Pk2OqcVi6CbWDS5cwgG9CzIo51YWRArWjbTjvWwD31sQca3aGMl%2Fu5uWxiT0DBGiQGJgs%2B8KwcqyBh9uFx9EzWlyyN2jHdrzrLgww1IFjMjuOa%2F4%2FmjIYZvxjHQkfgUr1vX0d5PiZ8Lm2%2BoeBubILt9BPqiF5LrlwVHJeyDGGTeI0z4g96Owxoa0YJnLqYeKBnsHLc&X-Amz-Signature=6da9f811754afee5da786df4809c5c21ce21e4a54c1beebc4bd6dbe2fd44287c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBAGGBVV%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIAjWnyrr9xOJhqODrHIYvdNYp0PdANxIvbP0YYzQ32hnAiAB%2BiKqVjhlZRKMFIsoPQ28szEiX1UUO0rtPKugnMYLzCr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMA2FyQP9ZQ2lPunWVKtwDQkN7lDCVHqQwIhUJMuoBT3DaW3WWT7Oreo%2BCY9v113haqqdW%2FbGcBPdit7DW59jgDruauQkhtRRIUDpMPKC6vVtYWQyWhbqgKbWA8%2FmaZl3pqPRVfWKclHQ34%2BZ%2FdBzzZdy3FYMpAg50%2Bs053llsc7T5SeypUuVCRz5wk9xTOdE%2BTZTg%2BfRdlBItAEnAv4xdrcpZPh4VeZ%2BODJ7b%2FcWEhxqFQsGJHJuaFhPYftGQjYKpykoonsZoSLZjHujjDoReAZb96sOdcgnSai2ilamXlUl%2B2i%2FnoUlAr9ZRlhM%2F7P2EEwDaE%2FRlpdEbLjpSrxNJyogJBIcICEoyZE9WBAkkj2lmVdxu5q5lJM9YQGV%2FrgqjXyuwVQsjwklburqZQAm24SPATsf3rxWiO%2F0RFkkqlUE%2FzYNTHfwc22%2FHZMMJf7eHB0oaUQayEUnWvGCyEGKvlcgVmbvgKktlM3BXtuwDNoBm8ErYmS0OXRbcmeAXXMzjQK0OUBFrKly8psMEVWJ2HdQ93dWU3l4GcpOGd5x7Hyw1T%2B6P9ji62RrVOC6bCaYMVTSGCbYZvnsQQzu820NtaoaOMcaXZkQDAgTwPn22X6I8qzrKq%2BLWac8EkYPAGg5IIFIOfcnNDzcHQ3ow2bzCzAY6pgGrjlotoo0zxgCh2Jv%2BddqTp36mAHEgx%2FcRc%2BuhPwgrIeeJ%2FnKFRC6ksCuR70g4WEvFA1Jb9xqo4LoH5tYoGZ9hFX59ZbGOqhVmpf8naobjrhvkeMAqOpleLzGy35By%2Bxv%2Bpi3Oq6nHBGf%2F%2B0k6iVes4rnlwEGIQGZx5Mqu8n%2BsaqXycr9JN15ba8Z60Zg0rjxqvJUgx3YotHcdNbavzVnd2DRXwegq&X-Amz-Signature=99f64c6d1de092144a74771eafcfc3d92b687c25c24862ec3d5807219ee67fe1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZILZCSF%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQD8u5Q8VIS0af9C7o6%2BwVSmrhYNJmlf%2BXREj8UhNP8TvAIhANisXQTCuhD00K%2FJ3HtFDhT3b70Ju3Zrz8gviF%2FQBkctKv8DCAkQABoMNjM3NDIzMTgzODA1IgwN8HPimVijT6qiTiQq3AMJDkm5VIr5XxqJvAIyMercfDk1ifv7o%2FVpuPZpgwJuBdR76amVFTDhbo17sgf0MfKJ85MfticBXKBmzoK6Q5ayWMHaSXmrMkVdUVHMGBnL3CJcQCXDi0tkRhxxHxcT%2FXbQ9VKlHa4YqpmwmISknDlefjrz9VtoZYcDq3IwSeS5NHJonrDShJUmdIbTZ3aV5711mVVynPA7XPczVBSAhVgrM%2FO%2F7sl8BgJVeWwnnwZPovjLlwGa%2F%2FPxFZGb%2BUjpZwtO3otEKbDI3sEnXSHUjkFdwv8MZn8fA%2FeOoDaH9rwf%2FiGYDdkn1xEqVxWYI9KMCODsBbUAWGKjjJt5g%2FJjqxAIILiiGOYqf6pNPHR39rdtMW%2Ff2bE1tbi9fSeH9Ky%2BaLssV6xN0VTP%2BEVRpN%2F8qYXFdzxSLxYRtYvCKc8mGVVVdf49%2FfDZ0%2Fj3kjUt96W7YnF3U34bGVnQjuQQ8wE9gvay1%2BRVpxACDCKAh7mZmxx1QTnFmDFSLBRjG24Rn7h4rdbvBycznDwIWHvjd95R1jPI3FQlK%2B2IARz01VyoDC4zhVTVzWrPtSPiyE98iz2EbIPxAHmoV43aiEUF%2BQrIiIQuTLXiUSs0rsDzX7Dg2qdiwuUhe1Z%2B3QqWwMvxTzCGvMLMBjqkAVppGBTSmaIBFXWRv0rtspn2%2FCU9dLsRsDGpPN9HZxIWONQbTtb1b8aKPmPonEoq128mafX87MeDc9kb5c7fjT07UojmBqVUfCBYiQ0fe3cr9Q6ts8UKWr5zZD6DYu8n%2B6xRh9Pdk%2BcR%2B%2F6%2FTyHoR8mgiD15MeJydNUd46F8susFalgJvMcRn0snms1%2Fx0QrHBeDb2nW1zNt5hXdY9o6nL3yaXlh&X-Amz-Signature=97faee3f179682aa44b04ade232f90bbd4d88c197a7fe3567c217159ce776916&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXCCEOA4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIHnGjTTpzyn2ngXaTcUXHu2pA%2BUOoS0mF6A6GSJr2QkBAiBp%2F4vBXMLOfoUATlivevzN5lAjwsrp%2F5SLOBAT2a%2BN3ir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMBMtpU%2F0E4hsKollxKtwDPblnA5LGZcK%2FHUbyMwPPonIVkb%2BJ%2B%2B6be5pHd%2Bo%2FU%2FLKc%2FF7XhF%2BlhTUm9VJteSIKFNCb5sg%2BXpr0bGIZCeHL7HXe5ZeBnMl40u5LNOL5VkwRr%2BChIphWNUORpF56h3K%2BjFnhGSF1ef58SHYxKf5usGDDTLdmz0Yb2pupCPBNuW2mmBo%2BzqBO66Nom5ohWsvnavQshQ%2FV8R6q0Q%2BeuDUGTw4Dkr8op8BHU4Gn4tB6Qs%2FfrXkFuCWK%2B3mDxhCID2SU1okNxp%2B3KEyYTirEzTeh9VcJFXKmtogAZ%2FrTUnvhwuTry666tIpqPvIgcB74j1UU0EkgAIY%2FzMJutJCXiDgrf6B%2B%2B7g72hiDMBSfO%2B6fa8E%2B7GzT9UFj6mP6mcBzXI9TsfZKvmx%2FLK2i7N5b2Rp0AJx%2B3DwS2wS6X23GV0GJpMwicS9Z0gMr%2FQa31CHQAqj7m5c4nCe9FYm6JdEJ7olwxK1JLsN65JDJxf4TsZPrQQ6rAwRloRVbq99CQzEpCxqU58nlF%2B6oaPAibHhApgoMMh1tyEJtpCLh%2Bbg7FShHvk3yIfzuGtSt1Yilg0KMhy0%2BAwzfLMTxzR5iy7m0WV2M%2FpKAOb2tFO1kMLBZ7nISFrjEGa%2BavfUl%2FRDp2oworzCzAY6pgFAyHscGsrRQoylbJ72h%2BMy6YwfQfYOeDfpOX9ljyoHx0lcjlPh3biqfqoTg2odEy4sMLpdkdZlok8j1CDAS2N7uaGdvKKWmpyse6f32QN4A01%2BEvQ9JTecYLDttLXe3RJ3aHPXQaFsfpVKB7i%2Fxnp7LI3bidI%2BNHwFgt5pJxA7947mVdKU8Vxmz8rxr9n4GfmL0ZscbE4DdzHTCnRTHlDS%2Bo82%2F%2F8g&X-Amz-Signature=e0c258d9619d224e7f6dc3bc70a768ead4b8504fc1e6d065a352321d1792053d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V762J2FG%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQDyTwq0kNom3SJRhDvxju8oaxYTTGDMh7NGMiREYQcCHgIhAMRf8mkvmoEcW%2BloTA8i3%2BcLTaHS8FPiBI1QPxNFWoGzKv8DCAkQABoMNjM3NDIzMTgzODA1IgxajS2qagLyYa6luaQq3ANDDXpJF1Q%2FrnMJZemAaghIkzYKQ5yT4aezr5g3PUnYjfbBlZkNHPqL2znX84q4HYFpjXZU5e%2Btaw83GM5SctfbFy2pdkwsnMSj0r45%2BpNNXssMBJ3c5HFkSXzTxpj%2Bxhws2xEHpJD1gkBFSjHkaSdQSX8jxpa2VqV7VQ1Dg2iiYaq8i%2F4WJEs%2B0jaN1XOEHvzjPGHHO6ic7Jc%2FRiftN5PphP1JLJCsntIziEMMlzx3AEQ2hbKCD%2FYF5owiJ%2BvIdVUBrY44W3nNK2NFe4sFdEfx5zIqJlz8Wagx9%2B4BrXYJ50ZsHb8CTzISbts8NcMYFSF%2B7TsJRJnuzfenayD3TaVi30Sz0SiYlelGjVyOnbTsEGsA2ElfVtUp4fA1vHE7qcKlnsfqtbTDEOKO74QeHR9EM%2FYzCNpeMV2QZtgsRldudB9MSyQBNUPMFLAi0151LtBXXob3hGSZK8y6hTPmxK9NxTUrkfvPmCB64r5iTWrr9auoKajMxb1xouKFjDK8nOlKqz84pTH1TUXrOzyY5S%2FkCN%2F1mAg9ypdrG1z7RosPcUMOJHGWyKSlIFtp9A8FpzUKWyUIyysg871x1KBIaBtyYFJp21unnRAvW9FZx7O73gucNwkFRNSCsUPsRDChvMLMBjqkAciqPjPJLVliN2b4eMM81wkiF1BVlO5x63sNpij1%2FBot9D0XIzka1Z8hcfdluwlTCBVO7vJVlbCc60zjXvcs4YGdXBbrKRRhe%2FtRLCLw7XcGitO1ufpr2S48tzcN%2FlhFL7IFOgRLLegxBiGAdPoM%2Bf0JwErMFfRzp9W1w%2FQFB0zNmdpRFSb5PQxOUSMiGpzk9%2BMYMr737Ldf2Ge3XnxWWAssjOLd&X-Amz-Signature=979d78f102d99b7c90ab98a5352a30d6e3b8135ab798f1f9ef533ed2061efb30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V762J2FG%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQDyTwq0kNom3SJRhDvxju8oaxYTTGDMh7NGMiREYQcCHgIhAMRf8mkvmoEcW%2BloTA8i3%2BcLTaHS8FPiBI1QPxNFWoGzKv8DCAkQABoMNjM3NDIzMTgzODA1IgxajS2qagLyYa6luaQq3ANDDXpJF1Q%2FrnMJZemAaghIkzYKQ5yT4aezr5g3PUnYjfbBlZkNHPqL2znX84q4HYFpjXZU5e%2Btaw83GM5SctfbFy2pdkwsnMSj0r45%2BpNNXssMBJ3c5HFkSXzTxpj%2Bxhws2xEHpJD1gkBFSjHkaSdQSX8jxpa2VqV7VQ1Dg2iiYaq8i%2F4WJEs%2B0jaN1XOEHvzjPGHHO6ic7Jc%2FRiftN5PphP1JLJCsntIziEMMlzx3AEQ2hbKCD%2FYF5owiJ%2BvIdVUBrY44W3nNK2NFe4sFdEfx5zIqJlz8Wagx9%2B4BrXYJ50ZsHb8CTzISbts8NcMYFSF%2B7TsJRJnuzfenayD3TaVi30Sz0SiYlelGjVyOnbTsEGsA2ElfVtUp4fA1vHE7qcKlnsfqtbTDEOKO74QeHR9EM%2FYzCNpeMV2QZtgsRldudB9MSyQBNUPMFLAi0151LtBXXob3hGSZK8y6hTPmxK9NxTUrkfvPmCB64r5iTWrr9auoKajMxb1xouKFjDK8nOlKqz84pTH1TUXrOzyY5S%2FkCN%2F1mAg9ypdrG1z7RosPcUMOJHGWyKSlIFtp9A8FpzUKWyUIyysg871x1KBIaBtyYFJp21unnRAvW9FZx7O73gucNwkFRNSCsUPsRDChvMLMBjqkAciqPjPJLVliN2b4eMM81wkiF1BVlO5x63sNpij1%2FBot9D0XIzka1Z8hcfdluwlTCBVO7vJVlbCc60zjXvcs4YGdXBbrKRRhe%2FtRLCLw7XcGitO1ufpr2S48tzcN%2FlhFL7IFOgRLLegxBiGAdPoM%2Bf0JwErMFfRzp9W1w%2FQFB0zNmdpRFSb5PQxOUSMiGpzk9%2BMYMr737Ldf2Ge3XnxWWAssjOLd&X-Amz-Signature=2908a51817b861322c524d91cc8f32db57ae3d45c7b7d1f608e2127ad5d5dab5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627EA3UY5%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQDvvEshEvQNTxv7Ho3GgZizutjK5molbYGwXQA2OtFvxQIhAICe%2BVHEtQifIhhLr6U08w7S%2BOWuL8BUKCwNj21x69IVKv8DCAkQABoMNjM3NDIzMTgzODA1IgxhU%2BGGBfPZcZC7ywkq3AOG17q0SY6HWfX3Xp9R67ibZpcZ0jxAVtC9aWa20M0btZC32eYItOadI%2FaPY2H4CeKeeuhAXiAr3WFFRZVq%2Be3Rio6LltuhPXJsskVDjudzLzzqA7UQR5XqNl3CmeI3CfjTiqkUUw7URUzn%2B5NyxsKTBQ7EY5ljj8DdDxpJj695gcmjiMiG6UWDIwFYSOFLJGf0V3vj9ARiJrUXPiUv9p%2BtCQx7YxxsW25mYZ6K8MIeJCkbVdxjVwPg7kTvjW%2FB0xqwCaY8%2FX6CoSd9HovEG5smaRF2ROFzzWL0mqFR7tNltGasCKGqzygkLLA3KM5tv%2Bcc2klaT7PYRre9xW5Ry%2BHnL3fvRw6PALDl4jZaemVXJRdsJM2TtpkXbnA7iAy5zD9t7k%2FErgcIbhzShXwA%2FGvhCMqJ%2BcRG8wzEoqr3bLvKwPyapMqVS0EZBLx3fPU9nj4WQHp7%2BdhNFIS1jwr5PrOHDGqixo3wVLP9UPq9CoCPlxbyQQ7fWoFc8OnfHp%2BE3dtGK6w704Rv1%2FR%2FiZ1XQSLww8AfucDYrd%2F%2F5GHGq23kpic6voHBHwBiaLOdwFj5DmD1WSVzMyTxxYK5kT3QIqmXY6w1wM%2B2SiA1WqKHry2scbpyCse396mKM%2BnBKzDwu8LMBjqkAeLtaK9MUNzWunAr3dmGtLAfpjuyvDCQUmLrqY9Vg73%2ByAnmeti7DmI35VivrQyIcDfdyjKcUET1MiZDnXmkrMcWY7fYg1k%2Bye6yKyLqaYKwtZ6Cs9AtinkJPcnVgaMowSBmgni%2BFCYjL%2FejDzDay%2Fdd9fJzMQQm%2FBlnS7g5FhwGk%2FBT2H2qT4Lwqu8n1Csglv4wZBX6qsB6N0ZreC1wy%2FatrO29&X-Amz-Signature=abed12d097e3368d8c7a8a364b9af7324eb1a7553ff995f0a63b48a2e6c64456&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZDLTA5J%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIE5AdumzsI6fDvc5EMofmABhOr9sAGQVQEsc5NoDTOyvAiEApemzd0OAoVxRffue3ZzSDxPPT3J9S%2BUy%2F501ehHWuy8q%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDNHrsa0bqXSF1LL6SircA4ateU%2FbBnguImO0FbI1%2FpFHB9md6b6zfEEHPDjDZWnMfpoy4a4iMK4tmzvW4PcmH2C33ZD7797XDUjycP0VQ7DPGji2pTTU64URZ%2FGLrEDphZX2swtiwmq6r1kjJTy0IBOoxR3sXYJ%2BbrmPLMZrsqRVFzqm3aZNSD2DBbEQVxKd6Hgz2yNwXe6g1bvR512T69m6HcKCXIZsnQhzuT7ILeQL4KSJ0xbVhkDOwI1ANKySf%2BnGoeKIDCeyfbFZOEvKOzTLQmeUPKJJBfPc%2F%2Fl2Kl9jb2gC9%2BRoRX0%2BKeqGtGN6unWQwRHAGB7Q34mhKDF720t96l64lBObyRG3sHn%2FBflHxRLJkDtnzp311VfhH3yvKECUqmkJCNGJ5jHz%2BBrauAKRyK0HbEuEGHzDj%2FZspFQdH%2BClH4Yf1FhRUvUt6H9W5yYnBQvqcWT7LW8i0xEizxdBpaKuYJaoLuxFBgDwhAlmmLOW40U%2Ft74CwF6A6mzJT%2Bof784AycFzDuIVUw9v5CuCCWLPML8viJaWN9Q%2BSzRJWQRnSr9QLdKPZDX4pmnZFSruYUlk1BrawRdxGn8VpB6A1VCd%2BGuj7Dp3p6wLiBdwBh0ck%2BMicFyJ2Nq5o6jaga3eTlRMgCeFWJODMJq8wswGOqUBDgnZ3dJMpbAMKVjF43Dl5KdFLqTLpd9pzKk3wZInNx%2FFifvk0RxowLI0YEgNtLkJeC%2FzsiunVPOUO%2F1%2Fm6LuBn%2BCRa%2Bsl21zKmWDYLr4872Qz6ZjxnIpOgCYASlTV4zWD6xcDmwG7C4w8wD96Rctbf8Ii9SCevUHS0f9V%2BH6nNH5h%2B%2BkawfLzmYavAnRwehS9PNtsqqOI5YHWaenJzhNa%2BT%2FpN9X&X-Amz-Signature=3994f03ddd092f71b02b5527fe6f9814c9ff35fbcb8891199b22648a5dfb4eb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZDLTA5J%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIE5AdumzsI6fDvc5EMofmABhOr9sAGQVQEsc5NoDTOyvAiEApemzd0OAoVxRffue3ZzSDxPPT3J9S%2BUy%2F501ehHWuy8q%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDNHrsa0bqXSF1LL6SircA4ateU%2FbBnguImO0FbI1%2FpFHB9md6b6zfEEHPDjDZWnMfpoy4a4iMK4tmzvW4PcmH2C33ZD7797XDUjycP0VQ7DPGji2pTTU64URZ%2FGLrEDphZX2swtiwmq6r1kjJTy0IBOoxR3sXYJ%2BbrmPLMZrsqRVFzqm3aZNSD2DBbEQVxKd6Hgz2yNwXe6g1bvR512T69m6HcKCXIZsnQhzuT7ILeQL4KSJ0xbVhkDOwI1ANKySf%2BnGoeKIDCeyfbFZOEvKOzTLQmeUPKJJBfPc%2F%2Fl2Kl9jb2gC9%2BRoRX0%2BKeqGtGN6unWQwRHAGB7Q34mhKDF720t96l64lBObyRG3sHn%2FBflHxRLJkDtnzp311VfhH3yvKECUqmkJCNGJ5jHz%2BBrauAKRyK0HbEuEGHzDj%2FZspFQdH%2BClH4Yf1FhRUvUt6H9W5yYnBQvqcWT7LW8i0xEizxdBpaKuYJaoLuxFBgDwhAlmmLOW40U%2Ft74CwF6A6mzJT%2Bof784AycFzDuIVUw9v5CuCCWLPML8viJaWN9Q%2BSzRJWQRnSr9QLdKPZDX4pmnZFSruYUlk1BrawRdxGn8VpB6A1VCd%2BGuj7Dp3p6wLiBdwBh0ck%2BMicFyJ2Nq5o6jaga3eTlRMgCeFWJODMJq8wswGOqUBDgnZ3dJMpbAMKVjF43Dl5KdFLqTLpd9pzKk3wZInNx%2FFifvk0RxowLI0YEgNtLkJeC%2FzsiunVPOUO%2F1%2Fm6LuBn%2BCRa%2Bsl21zKmWDYLr4872Qz6ZjxnIpOgCYASlTV4zWD6xcDmwG7C4w8wD96Rctbf8Ii9SCevUHS0f9V%2BH6nNH5h%2B%2BkawfLzmYavAnRwehS9PNtsqqOI5YHWaenJzhNa%2BT%2FpN9X&X-Amz-Signature=3994f03ddd092f71b02b5527fe6f9814c9ff35fbcb8891199b22648a5dfb4eb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCU2NKLV%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T171533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIF33qkKMw9ZQW91N4iZb4AUpYZES9X5DIoAb5fAQasNgAiBdo8%2BHoo0MMTbmBolLj2CBWJu17jWnF1kfYZxeRcVKVCr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIM%2Be1jL%2BJl51wN6sl8KtwDS4jBGMLKSnV6MA7PN%2BZFT38%2FM2l0Gc781sO5aILMCbzBVxi1uUHN6eirmtjOJ%2BDTVJJBF3HKFGa%2B2d9EwDJTh0tqyvgt1c64NLW3q20vMIiuehWv%2BPWIkZgktERNjiFRdNy540bMPQpMLyUsdnqqT83%2FZ0amKjCKBb%2BoBEG%2BjYcQSWuB5ZmDtiawPF%2F0QOfQgqWlDHUJx0kUX26YRtK5N%2BqvRzwxMMJ9xNpC%2F1vKS%2BxR9T9ryhetQy45hJvKvZDQuB3rYAwimOrxxRgfC5x76S7RckMJiPVA4QWA7IPbARWCIzQc%2B9o9y4IzrUM4ukpExozdJmQq3IqzNvyUq74cuDZKdAAao6W95QCsuBMbbTgMqQhChrW9vrGBHxGZccj0nKhTTEV2c%2FffDKsTYnVlG%2B1u%2FexnIlBA6lzlJ25o8c%2BUkoP4KDuuib22Diof2pMV%2BX3pofvUCU9ah%2FDzE2yFgLOjmzbeMEhG44Lp4rYaNoxceGchnVoyun7dVvHtI9AgO11rCNB8xY7wrHjlxprU1gQhbNFIsY7wIFSWUAZGC2M1WNFEPpXxH7uyZwBopHaR%2FoELVpeFCCZZ07vsxQ3b2gXjLsSAWLKnVuSLOzd%2FODkf0f6A1dfbec12Ci8w6bvCzAY6pgG9wgzIDz1CyssgpSyANfOKNjtKeBA2cx8plQ9Oz8iczUQ8uC58DkN72%2FXxY3DqmfiOkq8Li0pUT%2BnGK2j0JdQyzF6zZ%2FrGA%2BTeCeM3hTsq4knhW64L0fs%2BfevtiJYVvoIqbMh08qKIjgjXj7yeG0W6ZWzmGwU8c1hUt1E3qrCO4xFdAdh1lpsiOKtrYlDM14A9fObaqET20wRHkbBFm51X5Cz61l8r&X-Amz-Signature=d965c28ace92eac63d581138e0ecfd868d012cc53a20f3138dc11260710832d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

