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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDIOJAAH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIC4U988zGV9Kq0h089XRnSb%2BjxO2pmfiYkPygTCaOPI3AiEAzetn6Qmn2ToJLKKbtAt5a3CvOguo%2Ff5j22NOxg1ZfLgq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDPB360mslrz7s4RrXCrcA9cC1wHmQHRWyZGCZc5j9EgYE9rOX7vy6YahT0afOyi%2FOI0H8KW50i4EPgEGhPkvJMbsY1jygClcB1kVenUtooi4WwUn7mfKefjZ%2F1RB81CXREGR5Ic%2Fw%2FxTBs4d11QxGnaAIG1diNH7ArkumMIkTRY2rgLfuAm4pMdrUnrJCnTQF%2BMET3NnUmGTcfUn4nbkJTcTQ7fQLKgbwHPXElpN6t5jZdRUd6Cnrhc4n6ib%2FBBY7bSObgAPipk2z%2Fnewv2Xq87geSFjzGYOh0HJbNPzlBWasPvRehFqrzwK6bseI6fYIYPqpKoiiDlrNDSSqyMkeTrf8YcM6d83tMivjKEqvK%2FET7a8heQGp80hBmLdKN8UaUxXg1C5T0npE5rsgS56%2B8IShvGamnfgAAL2Dj5lHxVhC%2BFVmVONWTSJLjoi5E0GzobswywTOVbD5WFxrqxWTylEsWqm9p5DUHXoVXfkBDxemeNjjY2b0Vatz4PCbnrSZHG2hoh98aoamAbItX5bNnbPdTmsZPgYSUbf2rESc6neonsE2ZZivIoRNIrWOUsZw9XG5reNYMcS8cpEHkSEWAiqWBEFtc3NyMhR%2FDYxESXgeBz6sy79TcRLN9q09WtEOfarHxg9d9JwVSjhMN3B3c4GOqUBmz4yrCffJP%2FWxT%2Fd7Lbvi18RugGQ6gnNgK8RogmBfGeEH2NL1K08G110Ys6GH4IllHZhqHGlacqcZa%2BKhDRvQ%2B0%2BdsVilrkdMdemZC54W7v55YXTfQxq1C3p3wrUW1McnX2VdDW1y%2FNilFJruQZFt6Wf2L8UFvuPGG7wgZslr1UIgnjr9UI1uilD1IzglJGCPb75QFCai483AZLJhTP2qOvVz8tp&X-Amz-Signature=e215e9ce2e5cb84dad1d17b1b66c36770c537f027493a1ca75cc27ef987a5ba1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDIOJAAH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIC4U988zGV9Kq0h089XRnSb%2BjxO2pmfiYkPygTCaOPI3AiEAzetn6Qmn2ToJLKKbtAt5a3CvOguo%2Ff5j22NOxg1ZfLgq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDPB360mslrz7s4RrXCrcA9cC1wHmQHRWyZGCZc5j9EgYE9rOX7vy6YahT0afOyi%2FOI0H8KW50i4EPgEGhPkvJMbsY1jygClcB1kVenUtooi4WwUn7mfKefjZ%2F1RB81CXREGR5Ic%2Fw%2FxTBs4d11QxGnaAIG1diNH7ArkumMIkTRY2rgLfuAm4pMdrUnrJCnTQF%2BMET3NnUmGTcfUn4nbkJTcTQ7fQLKgbwHPXElpN6t5jZdRUd6Cnrhc4n6ib%2FBBY7bSObgAPipk2z%2Fnewv2Xq87geSFjzGYOh0HJbNPzlBWasPvRehFqrzwK6bseI6fYIYPqpKoiiDlrNDSSqyMkeTrf8YcM6d83tMivjKEqvK%2FET7a8heQGp80hBmLdKN8UaUxXg1C5T0npE5rsgS56%2B8IShvGamnfgAAL2Dj5lHxVhC%2BFVmVONWTSJLjoi5E0GzobswywTOVbD5WFxrqxWTylEsWqm9p5DUHXoVXfkBDxemeNjjY2b0Vatz4PCbnrSZHG2hoh98aoamAbItX5bNnbPdTmsZPgYSUbf2rESc6neonsE2ZZivIoRNIrWOUsZw9XG5reNYMcS8cpEHkSEWAiqWBEFtc3NyMhR%2FDYxESXgeBz6sy79TcRLN9q09WtEOfarHxg9d9JwVSjhMN3B3c4GOqUBmz4yrCffJP%2FWxT%2Fd7Lbvi18RugGQ6gnNgK8RogmBfGeEH2NL1K08G110Ys6GH4IllHZhqHGlacqcZa%2BKhDRvQ%2B0%2BdsVilrkdMdemZC54W7v55YXTfQxq1C3p3wrUW1McnX2VdDW1y%2FNilFJruQZFt6Wf2L8UFvuPGG7wgZslr1UIgnjr9UI1uilD1IzglJGCPb75QFCai483AZLJhTP2qOvVz8tp&X-Amz-Signature=e215e9ce2e5cb84dad1d17b1b66c36770c537f027493a1ca75cc27ef987a5ba1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MTPE7RF%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQCOwzJ37l73i3GXUeLJYQqM5ZcT%2FbZax%2Bsz7Sa%2FIxhV5wIhALLLM%2BajnpPoyGFdW2yG%2FfIkvenjHS4yOP%2BcAXsVsYTaKv8DCBEQABoMNjM3NDIzMTgzODA1IgwaE4xcEfNKnLejO9oq3AOpEkUCmdhHzalTJGgXsILOHfiA9bEiTWkKKZH%2Bt9gAxQl%2FAdxSqizq%2Bd4BpYtZHrQeaDu8nkBnO%2BeBFggiZzK26n9gk58EGYcRF3Qefgc%2B%2Fg0sBN2sLUpTl5jKiKzXCcsTyNn2f7zugy0YabFzVNHlwmZ5o9cnxsBzHYPyO7ByvoQ%2FzOqe3aof8XLJvNG2B7oVkdFBO2b7GYGb0LOpiE10k3pnk0HjxRX6za28JFQAYIyGwkph6BjtvZvGHw5hCXtEuSA9ZriUJGQ%2BzOU7DvGDDXTg3mXuNjKyBaDQnh7%2F%2FksHLCKvM%2FKwMFnmDqbGIPk6yz0Q9rcv1QJ5ABcXEFEHJnoXig4LAHvVemF2RK7NTTa1AH4lMRl4vI5coMzRu22crceJeDZuTk8mgwoWkvtyMnc8Zf38EceNLJxROaoX96X8RqyeKeG2YwntOvqEART1uiltvopHVThaAalXgf7EhF%2BpDEpTu7DmUvO%2BApM3p7waatH6WkqvPeI9EyUxc4Cs0ZQKiI6VGUoKh6pt%2FBa4vhkWEPZlB6PalW9VTWkksQ%2FFzZOpQagBzZcjcPhqqDzXpq7XnC7MajSQLHuw8RY5DjAfdohIRUx8O6Avgo9MFNJLVcVMg1QM1%2BVVhjDdwd3OBjqkAUiXkr2Pa8EC1NZmPdsm2z%2Ft4BMk0CrROg9aKC5i%2FE9gF6GG4T758LHTp2w7gM0LmRHnMLQlGfFgAUfZqyhPMOoFxIAvDjoDoH%2FAWfPzEAKXozPPVwQQNN1iTICMGf%2BlntTqerQbmjUm3p9h7xiBNR4%2F1YZhdOWRI4n3We5wM6k%2FA%2FrkSPxZcVmGzHZViA6yXraLowD4RsIW9qC9OMa6kc6QMnsq&X-Amz-Signature=6a267a6b4bdadea76356775cd5dfcecaa32bba8a1f6880f7be0ad9af959dcb58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWVSIVQN%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDqkcZVpLaaGRnZlcYQoJbHPzjK70R2ToC54QaiRU70TgIhAL3r8EDjyiRzQ0pTMdSZBNV3PHiDgBEPOPm%2Fvw%2FwQEUsKv8DCBEQABoMNjM3NDIzMTgzODA1IgyyEiKLLVgSnhln2Fcq3APB%2F2UJfm2tZZobFRk4KomTUJbLdL5b64G1mHKhQhRnTWqU5RF24N9qZJZ7pcH5jXOp8GOHoP9za%2FYEyDyGf2MiYlA32nwoUFtbZIvxMq03YNVxeS6lo9yAd3cj%2BZ6eHzqa7UGEBbErjKiz5Un14ccGWJYLUR9Ejq67gq%2B6V01TgnAne81D6t5MN2Lz7r2b31cjqH2cD8qm2WiwBwr%2F2vroTnnstJygSZPS0nvwYkyqGPmM6cRA70CsA5pNMKGU3P95wjuThWpeqdPn%2Bt3PSqQpr%2FuYh89xoGdDVmgNXjzvOT3xoUa%2FjzGv3oNAHxQiTa8ajRP0LtHFbvAjYBYbYeWqZMDV3mIss0M7gSdrNrLHoIR6hQ%2Ftpve20ukP6NIhAP0lhFRmxDjjQCbvK4ptGCjy2MFP%2FMb6aDX3tVKlfi2xkzKtnBrkoRz3%2BWzKB%2BUqHqgOGtueOgijt%2BNuHYwRkMNb6hH2Tatm08K6fZZV8zVnc3efzKd%2BwxznsleA%2FcgeZVd7eheTBmpvgKP4UaYAJAw5FGhci4nHczx%2FmLk9qdVFsN58V%2FwJW3Ls4M7YEkTmOSQlnz8cWhxTEyZXRYe6C%2FpWH4yVql%2FjiWAL7ewQpLvbJqKI5lAvbfKYSKBjnTDKwd3OBjqkAY9bcNMNKx2b4DMGalxjDD2Zr77SlYzxs9lq5W0rdU2%2BxQFzcWi5Id8YEYipLUH9TAVhd2aubSXIcnCZ5J8HSPn2Qjy3bODvBn%2F8FO%2F3jNv%2BbJWzTHSWzhlRdIvjT38kq9Jg2rZDUSGWkruKhFnpfKA7A0otwlPKgl3bc0SXQKJIMM9Gc6%2BrUYibXqRumxrvmfA5yyBZkew4udKT4XD4PxMGrKqi&X-Amz-Signature=9c276484de5e01afe0922c8825f7dfd5c2df46234bce1045946a9664e98a3434&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWVSIVQN%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDqkcZVpLaaGRnZlcYQoJbHPzjK70R2ToC54QaiRU70TgIhAL3r8EDjyiRzQ0pTMdSZBNV3PHiDgBEPOPm%2Fvw%2FwQEUsKv8DCBEQABoMNjM3NDIzMTgzODA1IgyyEiKLLVgSnhln2Fcq3APB%2F2UJfm2tZZobFRk4KomTUJbLdL5b64G1mHKhQhRnTWqU5RF24N9qZJZ7pcH5jXOp8GOHoP9za%2FYEyDyGf2MiYlA32nwoUFtbZIvxMq03YNVxeS6lo9yAd3cj%2BZ6eHzqa7UGEBbErjKiz5Un14ccGWJYLUR9Ejq67gq%2B6V01TgnAne81D6t5MN2Lz7r2b31cjqH2cD8qm2WiwBwr%2F2vroTnnstJygSZPS0nvwYkyqGPmM6cRA70CsA5pNMKGU3P95wjuThWpeqdPn%2Bt3PSqQpr%2FuYh89xoGdDVmgNXjzvOT3xoUa%2FjzGv3oNAHxQiTa8ajRP0LtHFbvAjYBYbYeWqZMDV3mIss0M7gSdrNrLHoIR6hQ%2Ftpve20ukP6NIhAP0lhFRmxDjjQCbvK4ptGCjy2MFP%2FMb6aDX3tVKlfi2xkzKtnBrkoRz3%2BWzKB%2BUqHqgOGtueOgijt%2BNuHYwRkMNb6hH2Tatm08K6fZZV8zVnc3efzKd%2BwxznsleA%2FcgeZVd7eheTBmpvgKP4UaYAJAw5FGhci4nHczx%2FmLk9qdVFsN58V%2FwJW3Ls4M7YEkTmOSQlnz8cWhxTEyZXRYe6C%2FpWH4yVql%2FjiWAL7ewQpLvbJqKI5lAvbfKYSKBjnTDKwd3OBjqkAY9bcNMNKx2b4DMGalxjDD2Zr77SlYzxs9lq5W0rdU2%2BxQFzcWi5Id8YEYipLUH9TAVhd2aubSXIcnCZ5J8HSPn2Qjy3bODvBn%2F8FO%2F3jNv%2BbJWzTHSWzhlRdIvjT38kq9Jg2rZDUSGWkruKhFnpfKA7A0otwlPKgl3bc0SXQKJIMM9Gc6%2BrUYibXqRumxrvmfA5yyBZkew4udKT4XD4PxMGrKqi&X-Amz-Signature=930be370f68ae0a3f7602447782d163c436ff23332b11863b8e9737c8924a08d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYI4XXJY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQD3q6V4jKTBncQwwNoiqTZ6fERYcsrUfB7PTxGZ0F4F8QIhALxfCcp4EqGh35cdYWsJhfnvUHIvQriZIPHXxkDRvzdQKv8DCBEQABoMNjM3NDIzMTgzODA1IgwvN7RFQMihtFvMKCYq3ANjS9kRcwmouS2p8KO3gyjNUygPIRAn5nvUf5yBCgWT3yF4nqMIf2E%2FXfttqed%2FGp5rCerA9%2B%2FNQE9FfbODyqFL7WYPWSE4i2mrq93i9NrcNdDptQRxtSznhmVX3QIdG26y9dzsBfhc8kU3rG0SuQJiQT8Su7BEdqNDspMW5cb82SV2IKURAzqzhYLG1sIqCZAHKNjTcXw2U9yGD8m6Ug485FmEG7nZiD%2Bz4T1PQxA2ey9%2F2byoxi069ecLWY6h4dFy2X268SJuaagfCgB0YksnTKRw66vjoQdQzjj3nlEhaSIfxYMge37wvfBD4Z5fZ5Ht8m2nn9H4P0pXsSydZh%2B%2FUB3WUiOjLv2isDsptpsEXVjP0%2BZcEBNOE46oKzfGJkbeCmSBli%2FeswSQIT0xWWBO8EZf8Wcppvn5gyn0nmdgmKL57Gn8Ekg3BmiFdmJtrcrHoV3llizNXciqWXLfa1xs0h3Ff52bJR8jpNa6bGS8DAWFcnWIm%2BE%2FrSJbqTAKADM1LvHeXqFkhVxDgyDiRaaSjN0I6nx5dX4RkvTSFnK7ditGySTiJYYSFisWvwzLrj1bwwIqdoqzBphg4h4QqxA2Ji1FkhNMrIiLrmvyk4FtLiXe5MoM2A18WaJhBTCiwt3OBjqkATJnPxESKdgJfg9SXz%2F07SWyZDynJ4wpZFkC4PdNqvGk7%2BlCPcd8w9FU7vIPQbUFEf8FK38na3Vrw0GbEFu7U5rpt72E%2BxJRUrofbSsqJ6VxIpcofYlAbR3iauw2rO7TrtfJFdVmyylW60Woe%2Ff4q%2FW7BObqeOGSaGLQWWNAJo5EUrrzh9Q0tM43bWqJr8XJQptcKX9dzQzZzU%2F7wUgIUDRcjTSr&X-Amz-Signature=1021913530086a22bdf6f4eadd8971d50b54c641455e1f111167eb39da4fa042&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFSIJF4B%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCC0m75vn64vECH9HGwq3U8RkKX%2Fa1VcTmMabETQbjh8AIhAJLKRgo6hXizJsNMtP53wBflBMSoAqeMnoGGjiScUCleKv8DCBEQABoMNjM3NDIzMTgzODA1IgyiwPbVUyldyb0y%2Fwkq3AN%2BKfR5scCBCULz%2FbsbyCTcS5GrDBei78MhVqGNHyevq1N9KcfTGw1nQlVc4azjetbNRP901Vorm3yAjDPLE3NaI8UlSGB%2Bd9Shm0je1Ds3B5vDfE9tlwcYONbV3LTwpoqTYYTrHyWMHjakpP2MGpaEA5f26kEFyJf55wddG1H11Xlt%2FiuFZrxTUIiOOBUE3erbRUpvHBkNZWj%2FiASGjJLCk3mbfN6kQpH2B8X3m6gd3TwqEDyTcaKiwpROPX%2BBRYrUerfG2BK7PZC4TUZRNXSqMDkAfBSDitv%2Bijv88zPqj9Yx84aV6SiVjj5bE5d38DIv%2FOWX2COo%2BIbtyNaAe4Oz3qCgkONRUvNgQ3WJ71HmymNVoSd72jlDjc7EHbyVFok1QlPtyxvIVA%2BnSBc%2BP%2F51YBBR%2FYpNfzO09CrbFlfSl2LBdOq%2F1dBdP5he5HNdSyjRwx%2FAGSzxFN71MJvT54Nw8px1E5RkHlzbEkvUHW4yviK4D%2FfN31kvG6ln%2BTA1hwsxQk%2FZdQzq1lAdsDYa6%2BJKnMp%2FI5Nk3s8ZGg%2B7pQ0EnRVkSOrsQ06VQRQOmtI7BrNRMMBepqTqplz2yfQUY0WO25PdUJHjd7OwPgbiaYkfcY6uU5QIIPZ0f88O9TCDv93OBjqkAR0FNqgOQs3B1a4DivN0HWVCJNSx7%2B0Cc6i7nAeMXrlLaH3RksTaseGx8OIJhSZDivqEAQ4kkyXYwsqVPtvR7RGqKZM8ZQl91x1%2FBHef%2FeIYvKr1J7TkWdKVCJ9PGdbuwENkK2Wbw%2FWZ5m%2B74ziz%2BsXEe7f2GUPM96z4dpzFQrabxyupF89d7SJASsFkfTkEMnBcTBqNqLeIezxdGvxcQMU%2BEEJ0&X-Amz-Signature=bc4b26aceacaf997f89d1d79117a53e3aa36f64177c5ca0071a6429e3fbf3675&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTPP5TOR%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIGVjDc0hyKCYfGJrRF3PvhGWHc5rwdBtpfs7%2BhmGiYpyAiA5NrDGPQI9rzdvJ1FlBLUOGA%2FOZ6ygeSWdemF%2Baiu7Rir%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMfyQxkJss8%2BuZ7sMBKtwDhXbRk8Yeh9KewGircA%2BWaFLvBJD%2FZABgXF%2FLxZGNC96vKQLeDBKWQqFPbN56BeP7vGDwLB49k%2BOgBDr1qrr2ZZpf0rqtW1dV7gdlAJtJfuZ20CusJzlVHvQjXje%2Bek3MRyuNBBQ3p2Shq81FqMTItAdjsEaNQoAT2EOFaE%2BOHUmjwWGy6stHK1OQrYBNlmdMkCcJoHMsVhttlDCHOS7g2iBmaQl%2FSmUzy%2FPQqqpdqMECn7Bvcrnzf0qMUpXsKSl0sfqSWFih3PpH6iLMbpiLuOby6KuHOwYlwvr%2FRPFyQGgIOZ1pQdNpQVNN57J1LeQF5Qbfp3hsb22sRwPnRay1qMw%2BuMgjzd8GK2%2FjnSiYUS7p%2Fy7Rrmqx1zH7%2BblGhCqC4ww54c7ZxJhKuJdQ2tEzl402EDWF%2BgX1GTtNkwt%2BtBa%2FSegHOycUpW4ch3OSAqqMBSkrxMehZccJJUyCmFHWBTYohhQTeqQGyW9502z5vJc%2FRw5c1FTONpJj7gUaiIhM8Px%2BLhBzyVg7eHmznsbzpx3CZk8Z23Ygxg5aJ5iSJhyiEFGC84k1X7HKjIZMhMG17PspsACRHw6kzwoGugLcAO80%2BjafwLICP5UwzcdNiFmkt6pqKdWBxfahGs8ws8HdzgY6pgHrX2btsvURnrAbwJdiLMo17XOujkWtCMYJDBLqCnp9qHHZ5FKdZXd7gkT%2FFlzVxUyfu8p0ezxkx%2BqWQ6gtavjZrVLU27JHjdasNuFnpiR0TA%2BcUmdrPF46iLw9DedgSFcds3wFm1%2BFwUoCoeTd5e5lJeK%2F2PoRhfUey0SdYvtNwAqPsy93tAFIAQKiJGmEHtxd8i8pixlrFtepib18hVnUshAqwRMF&X-Amz-Signature=5ab8b1f326e370a0c5550640a85178f21f9a25ebf482a4cb976c8c1721d714e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7LNP3MY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIH66fEdeMQ2oN2RmPhvntyiwVKA3YnGGGq43V%2F%2BcyYWHAiA5yVRbqcwZSuJmcpUQQ9yK3hRYMkdQZISZcqOy1ijFDyr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMJLn4TQGw6qYQUvTCKtwDc3KRKlQdB2R1qxk584G7yIEEt8bGMMv0qHV0w3aJ8M%2FGLiuhvXOsqa9RHvbPJJ4R%2FLvyd6lYmsOuG3XPsSvMvOGF93afdAHzq9aR6tL5uAs%2ByvwqfDQj5vH5DfY0P2KVNTFa0iVqSOl1wSOqO6ryVXBmMfOqxS%2FlhfvEBR1ieK1MLvrWU4Y680PKcnbsnVAkNQ2hfmjwFuP5WE7Dy32gp%2BOfEflAOjvyv3PLXe9%2Ba6bWi2i28bMhKiTXdeyRGaTEUuN21605ceABOXcm0le3p3279hLjKmK%2BIgeoAh%2BnlHEyDo%2Fe7tiZNZQgK%2FRlAIwrFrOqqMSYy%2Fk%2FtJ0%2BUf7x3JURtv4aaFi7SuRV1iFW539xE593YajfmdrC6jB9cUUDIq4Iz5WE7ASWu1zf4JvL1Z1YevczDoQ3XNiDLf8WSwINL5450FJZe7sszEbh1ZbyTPHDRcm9KweZ8WX0or9Mima745mFsc%2Bo5QKgWJUaE72ORFUXhNgEhLWF52BeNPFe4BIl8M%2BcVV6HhpAaz7qG%2Bv3rglJZ5shrKbf1kvCRy8IbBU902mvfHp7%2ByKJaB8%2BlP%2F9pjB5hs%2BgYxcdSBAXSncifTi8U%2BWbwrSjbYxwg8TgDxfAJd1OSXOc3zGkw4L7dzgY6pgEd72GgYHAm%2BiaLyoIUNjHmGcPYRxXfkEKHMI0aqaIsH0kjYXns%2FG0niuhZNEkoZFl51RDxwEVKoiGysNUAO0%2FfCuvafETKs22t%2F5swY5N0dlC2plPYA2lgRJXFsv5QIxxm1illRGYGwjWVzMLsqP%2FJJgdoSyy4uZuaYwunFv6IviPIoxSjgEh3aVoezHDl%2BlRRt6%2F0MIprKo71OxQg1vfWrWkSLV67&X-Amz-Signature=ddcb2f5a30b2c8b58bb7e88921881c06168b3906a662a971296cf6d77fc1a33d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7LNP3MY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIH66fEdeMQ2oN2RmPhvntyiwVKA3YnGGGq43V%2F%2BcyYWHAiA5yVRbqcwZSuJmcpUQQ9yK3hRYMkdQZISZcqOy1ijFDyr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMJLn4TQGw6qYQUvTCKtwDc3KRKlQdB2R1qxk584G7yIEEt8bGMMv0qHV0w3aJ8M%2FGLiuhvXOsqa9RHvbPJJ4R%2FLvyd6lYmsOuG3XPsSvMvOGF93afdAHzq9aR6tL5uAs%2ByvwqfDQj5vH5DfY0P2KVNTFa0iVqSOl1wSOqO6ryVXBmMfOqxS%2FlhfvEBR1ieK1MLvrWU4Y680PKcnbsnVAkNQ2hfmjwFuP5WE7Dy32gp%2BOfEflAOjvyv3PLXe9%2Ba6bWi2i28bMhKiTXdeyRGaTEUuN21605ceABOXcm0le3p3279hLjKmK%2BIgeoAh%2BnlHEyDo%2Fe7tiZNZQgK%2FRlAIwrFrOqqMSYy%2Fk%2FtJ0%2BUf7x3JURtv4aaFi7SuRV1iFW539xE593YajfmdrC6jB9cUUDIq4Iz5WE7ASWu1zf4JvL1Z1YevczDoQ3XNiDLf8WSwINL5450FJZe7sszEbh1ZbyTPHDRcm9KweZ8WX0or9Mima745mFsc%2Bo5QKgWJUaE72ORFUXhNgEhLWF52BeNPFe4BIl8M%2BcVV6HhpAaz7qG%2Bv3rglJZ5shrKbf1kvCRy8IbBU902mvfHp7%2ByKJaB8%2BlP%2F9pjB5hs%2BgYxcdSBAXSncifTi8U%2BWbwrSjbYxwg8TgDxfAJd1OSXOc3zGkw4L7dzgY6pgEd72GgYHAm%2BiaLyoIUNjHmGcPYRxXfkEKHMI0aqaIsH0kjYXns%2FG0niuhZNEkoZFl51RDxwEVKoiGysNUAO0%2FfCuvafETKs22t%2F5swY5N0dlC2plPYA2lgRJXFsv5QIxxm1illRGYGwjWVzMLsqP%2FJJgdoSyy4uZuaYwunFv6IviPIoxSjgEh3aVoezHDl%2BlRRt6%2F0MIprKo71OxQg1vfWrWkSLV67&X-Amz-Signature=62ee75d317d3ae2bbe48cbe63187c9455ab08443e8138dbe17a7c375b7667ded&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HYUTJBC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIB1CDpGnQLjMYC4RuKMzz23Ydl%2BMOZtT3NOktYVJr3UyAiEA7VBdzFyXWXcPPm3pBT1TqU3krt1J8y7Xz59ECZXpKmAq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDEALa1IwUPWDXFMz%2FyrcAyAG%2Fl99J9YTDbq0uuYS1n63rMKSGZh9Nj1%2BYs5dEwGkvHBvIAwNwZZNyQQUr%2BN1VjC8ihIzV544Ps%2FO46jI0fFfRlgiIr6fzjsVFYCjCqmGY8ApC9mWrPy%2F1TlIyYhIyCRkDXPKfRULCJRPC%2B3sa1Rqo4FNgDm6MsNlyatuDfZI%2Bk6X8JC83XC0HCjMaA4znvDHxyzbYGgkWG%2B32rtF4wooMsqFSGkM%2B5wChPT1lU7dGwdXUXZ64Pxc7EQGvVsGiZdBykRmrgjYQPObYp6ufuD186AhLS4%2FPVhINytjYnkqDK32UwYsmPfyJUtSKPW1xAHwbjfHUcUxp3e%2BilbGFxZG8mkW2j6SaQAGpx716aNHCfMRDf%2FIlZ1luXmtiYcfAicd%2FeQwTNpVRN7RPiSVObfAGPWHYh%2F5zoP3lJc8EqX5Cx%2BwbmcmkDIra04vIJTpP%2BrwjIlYBbdFpQS5JnYiArofWsF0SZSnHqCLH1bgaxqwJdWUfgEK8g3OPbiHXRYeNWTjAlJH9tZit%2FgK6xTFxMFvJSQik0%2FOlY0EKGzj%2BEVqLM0b3b%2FhuvMRe9wWK13gAxgWFWER8e6h3y25GDUOD947xHEJsO4mbE9l8geMAcH99S0JzNquuWTvRLJ4MNi%2F3c4GOqUB5miI%2Fu1VlHsTen90RV9qq6mv8W3h05A5A%2BAGQuepW35V5uZUAQgQRG53v0jP9qsWVCaeELGc2i%2FvUUBi9qUZY9bCWYCu0DRLlmC%2BwAkpCm6Irv6UaGVjasWhypPODppJUFSkZxr%2BB2p5IUFRB9LyoUcr%2Bwal52IssN7QOt4QJu%2B29QNAcPspfFLH%2FSdefeHaYOj%2FGL0hvkrWaS6K1OLzTmeAFNao&X-Amz-Signature=69bcf5c7d12874e1830ab6cad111d68d55d5d101a5768f3eb11f491a34b4503d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGP7GUK2%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDCbUZ3GNj1d9kDaOTumC%2Fz3r6e%2B9tZmAYPs%2FXVQzX4sAIhAJLEK5apiefASQJL5sxyv28aBoZIoPzeyGOO8%2FjZwIqpKv8DCBIQABoMNjM3NDIzMTgzODA1IgzAw2xM2IQean8%2BBCQq3AN1TJ0ZvRus1xyX6dkGclyJFyySmLwwzkpVHz9l0UQJ%2Bmhy2QwzTPmP69vwLeXigpx9j7mssB8w9TMyq2pJ%2BJWIxAR3xXN%2BNFAoQ%2BT86JWjoQRctNtQIyEEYO2qCgdLOyI6ZlAdvvXCl19gDOWSI8V3P1ui7NOqZhvc7GNQJy7V%2FNkCMd0%2BtsT4szjulgPJEjVqtKkMWC7MznzsB9ffY1fiMJumf%2FS7%2FsvH6yksHViONMefOarjBv1Bq5P7iIQSeoOtMcRHM0Aq2DSN2HWOuVOzbk%2BzGfA%2BETAupUhxDXvgJwFikuInDOAwmxAMFIDDpr5x4jnyix7oWm5CVB1dN0hbc563ks5Ran5iaZwTCcbgmKyZUNxveaXkYpvPPXibGWtiou2skNZpw8QER7mxv7iDdyFlbHCcvwYseFU2iQWHgHUxFhkqOQ0bYn%2BJkAZOjf5pUCL9pHVqrtDbanxNCNeTE9oH%2FDCCW59PtynOJYAtaEyLBb%2BR%2B57ZJFYS1MLpfgkkSNqL9VRvRlzvfvOCKB2kc%2FWZGesFpWGUoWZdGx7Fqc6j0Qy6UQZQfNpjXwGlDqMDCSTewLMDTekySWu3%2FFfEErhriVPoyVg28TgvjSZhjEi0E4P7uY44%2Fn493jCm393OBjqkAUy71fv78ahuV1btqQwHCzmPJyMHpfP99iySagzKlNWPkIOuBCl%2FMX4ZBEGlNxPGEJL2CwoSX9kkQYalIlUx0t8WbU0wdPY%2FqEn%2Bc4cEqsF2HoGd37xoAhAmBT5p5nNCakYCb87m5ILUDkYYa9T%2B3xIpor0usclUUPo07FnJJXxk%2BUAaPokE4Wg0Rjp7ufQ7%2BcMX4TtTQxBMdtbyAGZuyfvbcpVa&X-Amz-Signature=677fe45207223b9e9afefab671bc27cd4be21d8465c01b7cc12cb718ea155341&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGP7GUK2%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDCbUZ3GNj1d9kDaOTumC%2Fz3r6e%2B9tZmAYPs%2FXVQzX4sAIhAJLEK5apiefASQJL5sxyv28aBoZIoPzeyGOO8%2FjZwIqpKv8DCBIQABoMNjM3NDIzMTgzODA1IgzAw2xM2IQean8%2BBCQq3AN1TJ0ZvRus1xyX6dkGclyJFyySmLwwzkpVHz9l0UQJ%2Bmhy2QwzTPmP69vwLeXigpx9j7mssB8w9TMyq2pJ%2BJWIxAR3xXN%2BNFAoQ%2BT86JWjoQRctNtQIyEEYO2qCgdLOyI6ZlAdvvXCl19gDOWSI8V3P1ui7NOqZhvc7GNQJy7V%2FNkCMd0%2BtsT4szjulgPJEjVqtKkMWC7MznzsB9ffY1fiMJumf%2FS7%2FsvH6yksHViONMefOarjBv1Bq5P7iIQSeoOtMcRHM0Aq2DSN2HWOuVOzbk%2BzGfA%2BETAupUhxDXvgJwFikuInDOAwmxAMFIDDpr5x4jnyix7oWm5CVB1dN0hbc563ks5Ran5iaZwTCcbgmKyZUNxveaXkYpvPPXibGWtiou2skNZpw8QER7mxv7iDdyFlbHCcvwYseFU2iQWHgHUxFhkqOQ0bYn%2BJkAZOjf5pUCL9pHVqrtDbanxNCNeTE9oH%2FDCCW59PtynOJYAtaEyLBb%2BR%2B57ZJFYS1MLpfgkkSNqL9VRvRlzvfvOCKB2kc%2FWZGesFpWGUoWZdGx7Fqc6j0Qy6UQZQfNpjXwGlDqMDCSTewLMDTekySWu3%2FFfEErhriVPoyVg28TgvjSZhjEi0E4P7uY44%2Fn493jCm393OBjqkAUy71fv78ahuV1btqQwHCzmPJyMHpfP99iySagzKlNWPkIOuBCl%2FMX4ZBEGlNxPGEJL2CwoSX9kkQYalIlUx0t8WbU0wdPY%2FqEn%2Bc4cEqsF2HoGd37xoAhAmBT5p5nNCakYCb87m5ILUDkYYa9T%2B3xIpor0usclUUPo07FnJJXxk%2BUAaPokE4Wg0Rjp7ufQ7%2BcMX4TtTQxBMdtbyAGZuyfvbcpVa&X-Amz-Signature=677fe45207223b9e9afefab671bc27cd4be21d8465c01b7cc12cb718ea155341&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQU5ZIJ6%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDxHirZgUobNszx8QzxxYXZLEPYU9j13D1WhNgskZGyvAIhAKm9F8LKQVMd2ENHR8jSEDoc8LUdk1XskEs52X2xCHEOKv8DCBIQABoMNjM3NDIzMTgzODA1IgyWPDRxALC15hX%2Bfxwq3AM3aKW4%2FK1wnBSgjBqveNxh78Cl0TjBp6Ilw%2BlwBNA27U%2FAaSpHiMXw5brHKkJSKPS%2FgcRoBTy1ug7A8Xx%2F6ZGNgE6o8niqmlEhywyGxjzhfxA%2FFIrh09q8lgVjM5VP2cpQSYJwt2Qf%2BXBfi8C6lGZg5800JDkqxZkIL7JfVFJBuG9OTDkMzZLCI3O1mVBF5Nq0zlmpfg8AnARUbzKGPCaU8fQ%2FJVSLEp%2FUoIRX02bunvgIpALy1dpL9mbPreBZJp9zEWKr27vc2DltV1H0a0QWwJD1V013V3lCqfBaYNW6Jz4Yh7ijtxC0bB4%2FEvdMkH7aEfkOMmIff5r5%2FU8bR%2F794kp%2FR%2BkPoua5KsdUPs3raBDVnwC6H6Pg2S4tS%2F5aNIXTpZYviMOE6Wiu57w%2BFeECnubcqXqWgr%2FHeUDjRnq%2BIuYtxB8E2%2B3D%2FaSDadO2LP0eN92yOUdMlVF6HSAm%2FVkPZ8vh4%2F3IzOSV7SIzPjZr91%2FmFFdRUyuLmA0cIJY2fZHK%2BeJMHLir6ZUjrnm2j6S6yCMzCmVwmngrC4EnO8kZB4tMsObJYHjENlZhnk8wr5xAU7TyUOYIQPupbU9QXbM3qy%2BcA0xjPxfx0zi1LKdj3fmWH7JbwfhcYez4tjCh0d3OBjqkAQT9OTZ1QLu79ycHDbvQtrItWKagOT%2BlVURC3gDXgHpPL2wiES3vL4YZzuV%2FRe4heY%2BRfRmLmunI1K641WVf2pfwlWY7eMPCAIUxWQbLv4veRYubH%2FgIQrr59ln%2FVRq1ZP%2BTstyJJcxLkclgPwjnYhND%2FbdUrRFloXU42fe%2FHwYX7IsULwpMrLyLXTVmmp3w0Jxr%2Bbw2fCraXXNjj3JvghMRI8gl&X-Amz-Signature=18764abbe5767f42d51443d4c5a4deb8775f00c05c69b84a3f4230f1a239ee80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

