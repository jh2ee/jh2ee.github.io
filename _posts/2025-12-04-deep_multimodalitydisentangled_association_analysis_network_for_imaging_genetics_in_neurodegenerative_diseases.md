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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMQUO7JL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIGDAUjQW7lnxaLMHlCFF%2FFas67DUsqxlOm5Y5YPSlQWCAiEAsDdYBboFzB6%2BwNMyV9zcrHOJrzJZInR2H6bVWQcBvUMq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKlSsVNq5EkojqJSTCrcA1TCtMrUBLk6FKOaj7s2A6Jeu%2BDtBaYowruuNW6iFlT7Ndv8YvDaauuj67tli8s6R0gurnsHwPkEWrym41bg1E8xqppIfp1V92w%2BbpbgByFaSlAlf7%2Br78Lxbphx8Y2noFV%2BAbX%2FOe165TXcgFNoEHoYdo5II%2FeDr3wdGlqkJ2G2FXsedm0ohkTVfh2DFAnT8Z%2FzbR4%2FKHKEy6t1rGR14L8O8N5ricVIsgX9ZQ%2BevQMbVCdLGna%2F8XOMZrfxzah3hD7RRfIZiNqAY90iMf%2FcM1P8VA0j%2B1wdvTIWtT1ZSaqH5ljzx7e8FkKb3pnIzvoE4xSEVaZF29rqzzCWbCs%2B87emAbyCZ1Jh%2FaBTa8mJabDy2axIx5CrA0%2FsnJN%2FL9gnzG94S47HCaUKbYrEDz95qJgU76z4I4j5gjrEnbmf1zRm9zVscBqroA7DuDuEI4py5TCtla8To2Htxg%2BPVbJvf0Jetx5hl9NpDSMBC6%2BK4p4ImRIEdp%2FayKN5hIbyFNl6i8h%2ByD4bsL7cJ4FoOULqcWUJDFdbStAUZ2QSgVtEJhM7AIENDCpUfwnxRwgFROf%2Be4fdNVWnVZY9dM0eU1sq4PISWNrYX2Hz6je96qFo8M8SyQZJgmELwQDpQx19MMvFts0GOqUBFqyy63t77wkazs0HNmEFLBCyOBKyZIh49XrQQH8lmkSeXzM97zV08ka0oLvwOMImT8UE%2FwxMJe8K8MfJjQDxE1JIDDTgua5I%2Bg6eKoaEGAM%2FX%2BEV6dZRPR9jx8P%2FnUSDcYerA%2BGmG9lu%2BdnBzGGHvvSOR5ytDXtFZWOOGeEK5OfQ99Z5gKy%2FDFHlARqvmh1gaC6PZow1VSLhZzO9ZxAadB%2F8fMRx&X-Amz-Signature=190cb6d8517a6d2c9f9a86e5f224955716dc29dd1b362085de312acee20335a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMQUO7JL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIGDAUjQW7lnxaLMHlCFF%2FFas67DUsqxlOm5Y5YPSlQWCAiEAsDdYBboFzB6%2BwNMyV9zcrHOJrzJZInR2H6bVWQcBvUMq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKlSsVNq5EkojqJSTCrcA1TCtMrUBLk6FKOaj7s2A6Jeu%2BDtBaYowruuNW6iFlT7Ndv8YvDaauuj67tli8s6R0gurnsHwPkEWrym41bg1E8xqppIfp1V92w%2BbpbgByFaSlAlf7%2Br78Lxbphx8Y2noFV%2BAbX%2FOe165TXcgFNoEHoYdo5II%2FeDr3wdGlqkJ2G2FXsedm0ohkTVfh2DFAnT8Z%2FzbR4%2FKHKEy6t1rGR14L8O8N5ricVIsgX9ZQ%2BevQMbVCdLGna%2F8XOMZrfxzah3hD7RRfIZiNqAY90iMf%2FcM1P8VA0j%2B1wdvTIWtT1ZSaqH5ljzx7e8FkKb3pnIzvoE4xSEVaZF29rqzzCWbCs%2B87emAbyCZ1Jh%2FaBTa8mJabDy2axIx5CrA0%2FsnJN%2FL9gnzG94S47HCaUKbYrEDz95qJgU76z4I4j5gjrEnbmf1zRm9zVscBqroA7DuDuEI4py5TCtla8To2Htxg%2BPVbJvf0Jetx5hl9NpDSMBC6%2BK4p4ImRIEdp%2FayKN5hIbyFNl6i8h%2ByD4bsL7cJ4FoOULqcWUJDFdbStAUZ2QSgVtEJhM7AIENDCpUfwnxRwgFROf%2Be4fdNVWnVZY9dM0eU1sq4PISWNrYX2Hz6je96qFo8M8SyQZJgmELwQDpQx19MMvFts0GOqUBFqyy63t77wkazs0HNmEFLBCyOBKyZIh49XrQQH8lmkSeXzM97zV08ka0oLvwOMImT8UE%2FwxMJe8K8MfJjQDxE1JIDDTgua5I%2Bg6eKoaEGAM%2FX%2BEV6dZRPR9jx8P%2FnUSDcYerA%2BGmG9lu%2BdnBzGGHvvSOR5ytDXtFZWOOGeEK5OfQ99Z5gKy%2FDFHlARqvmh1gaC6PZow1VSLhZzO9ZxAadB%2F8fMRx&X-Amz-Signature=190cb6d8517a6d2c9f9a86e5f224955716dc29dd1b362085de312acee20335a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XECFMRCD%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIEaY3BCs24IAbTdApdzdp2uK1zPYMUpGIA2qe2ote4s3AiBULyMylVpecddfdgFcmWF7Aug7e42Nv%2BCLPDW%2Fu5E3vyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMheBpUFD0n9gkMlv8KtwD414w52wghfmNEoA9UOdM9yWCVblfFsqSPwsssI%2BZxrztXqAapPfN7qucCBMg9WSfYtD%2FQg57VRMaIQpBVDMw15Wt9lcdfHLxd4uPaY13lMCaQN%2FdIuBL6yhxnquvLsutRDlhT%2FYBgF1JxAXRejz5i9GqWzFIZP0Lp%2Byq5UKJLFF27pQZU2L%2FnMKxSczeeg7TAYLX11qAwRj5ZP5kVBucmSvgD1xu5bRg4iR4cmxBwZW%2Bwe1ZlhvoWEEl9FEupYQqHIltfol5kSJ1Jg71g5YXSW3qnupxxhunFNKxPTPlvX4JHOYgUu59wROitYU67Hajx%2FpU%2BE9BDRnlerjv8uMD8ZVDo10noMNwv76fo%2FNHT%2B3Ap8Pp%2BRxBx%2FTZgySEQLH%2Fdzu3HHWYp5PW2gDrhp%2FoCeD8h8uckQg%2Bg%2BU6afW8HnBVqdpIhFyN0JfhFyGbCX56i0PDeDfs5VaW6XBagkvsPBKgJlxWVLJjLbS%2FmKTvj5ft9MpX%2FINhUoDtpFcXYWoORnepDRXneZmvXHgOK%2FW%2FhBq9zdXIGARBi2zxvteIxssRJOlq59bzx24QRyo7RG93aroKz3yak%2FopT%2FgvzMwkkE0raULBKMFkAsY8neUvC3nDACsigqFzRJ9dV8QwkMe2zQY6pgEPn5Av2mauwMhKXI8KMwRjHaTnY7R7SfD9KHxtG16evLW6hLlQy494Ip95zYjzo3kW76WwAL0G62cVPO9qcQDPzLdbHI%2B5uHxNRoxd%2BduksNHmwgi18T0bIlkujFrVB7gSS80G%2F%2BLxQfdGDBiev3ytstdrneTZM0Ey9Y1DwyPpctw%2B0pHswF6Yt0pjYNNM19%2FQZgl9PAhnvWruOvvb6YpbweYORFBC&X-Amz-Signature=30607c980f5d04c645dafbcef7021888edb00744fc214c09c872ab1876183bfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFDYYGJO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIC2K%2BTb%2FVITjBcMtjT566MBOGMlXa1VA5TfWf4Ot3dE5AiEAzd%2F2o%2Bxh2PqvOKeVUFH1JTw9qUof09cy52nHcni3dLUq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDNKaa2LHWrRKhyHetyrcAygmAA4ZEvX1eI8110AlMLMpeaDRdZY2nFaf1DTvH%2BWlOfMwrurYeAEMoy7cg6HONnYA4G1K8%2Bc95aY9liCR19GHalbsUZkee6dxcN74fDR4iiH%2FUDtDbWIr3WOOjZcNSkGVDIP82rQgfhqpo%2BdfqcC6rFJgAmgJOejmz%2Br4MJaX%2BDsYcLvAk1MXaVV663plphiC%2Fi5hyfc%2F1or9shduZPpw3XlmXGfkdCsE8QOj0ZxHgeAtuBcXRG%2BmrYr6ILxALt8AL0av%2FA6mz8zmV%2BkE0b0J4qo5%2FYiWo%2FgVuo2mVNHfq8HMw1fQoIOcOz%2BnFb%2F%2BDDmBbBb5GFchu93vGC7EyxxLqagWFUdB9SLbFEy9cs%2BeKNLqBUXfxO6UxDDH5bWuBLIEhhO3%2F9vysvslVrrHKEFuwmCjLAeY%2FZvvU8ahtKJHS81bbx3oPcufKHiM0u0R7ZzAP4mqE%2F6oLJ6s%2FnikPFckadx37Zyep6kcmTWeFNtQ8%2BmLW76O3Rx4KyF5DHm8dZwt8j4DpZURYbnsqPPc30F4IhuOuE4ey68Pjtef%2BXqQCGB8RO06D6JTE4QsxC3RmMAfNjUOFxtN2B6YonCY1ImN0ZoOpGR8DntwTG%2BSSPhqJAHWGVc3xlxfcLQmML%2Fits0GOqUBQQNJPRZPGXdRmCaC34on%2BcMKJ9avspbjrvTLPc3R60uRwF0f123viTyGIQjh0LFze1qmAin6qZhDaxz1%2FvlCF27MTd1BWKKum66nCViVdK%2FGGEYjqrjTsaB1%2FNYrBJLhikMXwveT6OQz6SpI%2FcCYNSnRzpNNJuUOjiR9CMhjy6ABe7t77DFEdGD1zIibu2bNGeFTg1sW3lKfJx%2FODAXgEqZEvv9%2F&X-Amz-Signature=cc5f314e06a812f9ea9a613a4d0413f539edaa735c3f376988bedac7f58738a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFDYYGJO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIC2K%2BTb%2FVITjBcMtjT566MBOGMlXa1VA5TfWf4Ot3dE5AiEAzd%2F2o%2Bxh2PqvOKeVUFH1JTw9qUof09cy52nHcni3dLUq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDNKaa2LHWrRKhyHetyrcAygmAA4ZEvX1eI8110AlMLMpeaDRdZY2nFaf1DTvH%2BWlOfMwrurYeAEMoy7cg6HONnYA4G1K8%2Bc95aY9liCR19GHalbsUZkee6dxcN74fDR4iiH%2FUDtDbWIr3WOOjZcNSkGVDIP82rQgfhqpo%2BdfqcC6rFJgAmgJOejmz%2Br4MJaX%2BDsYcLvAk1MXaVV663plphiC%2Fi5hyfc%2F1or9shduZPpw3XlmXGfkdCsE8QOj0ZxHgeAtuBcXRG%2BmrYr6ILxALt8AL0av%2FA6mz8zmV%2BkE0b0J4qo5%2FYiWo%2FgVuo2mVNHfq8HMw1fQoIOcOz%2BnFb%2F%2BDDmBbBb5GFchu93vGC7EyxxLqagWFUdB9SLbFEy9cs%2BeKNLqBUXfxO6UxDDH5bWuBLIEhhO3%2F9vysvslVrrHKEFuwmCjLAeY%2FZvvU8ahtKJHS81bbx3oPcufKHiM0u0R7ZzAP4mqE%2F6oLJ6s%2FnikPFckadx37Zyep6kcmTWeFNtQ8%2BmLW76O3Rx4KyF5DHm8dZwt8j4DpZURYbnsqPPc30F4IhuOuE4ey68Pjtef%2BXqQCGB8RO06D6JTE4QsxC3RmMAfNjUOFxtN2B6YonCY1ImN0ZoOpGR8DntwTG%2BSSPhqJAHWGVc3xlxfcLQmML%2Fits0GOqUBQQNJPRZPGXdRmCaC34on%2BcMKJ9avspbjrvTLPc3R60uRwF0f123viTyGIQjh0LFze1qmAin6qZhDaxz1%2FvlCF27MTd1BWKKum66nCViVdK%2FGGEYjqrjTsaB1%2FNYrBJLhikMXwveT6OQz6SpI%2FcCYNSnRzpNNJuUOjiR9CMhjy6ABe7t77DFEdGD1zIibu2bNGeFTg1sW3lKfJx%2FODAXgEqZEvv9%2F&X-Amz-Signature=919e1a634d73777cd6b66ab40c6a4246ecca364e595b9651a3aa7429c3d7ec27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOVITRJZ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDOdV3v2moTyJH878GNV13wTAUUD4vzXTkNG0Mq%2BAaMKAIgYTiKG31NCxfbcQYCrmh54N4UQVpPvEaxxSA0n1kDQA8q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDFgyiWvdpEFakWTPiCrcA5wUwEWFHvhhvJsGOcTXYj0HGFUJDfZWAFjDKzvLkdocWb4Xw4BIawzpP6uxBlaOvDK%2BnssRPJcZED%2FfRMmjyQ71xkbCJ%2Be8Rr471hdHsLZaxejIB1TkkRyYxYBrIKST3hw%2BvqJqqojd0RDZNLYFpGu9R%2BwLMqhsLBGnLANY2hyM%2FgqZGL44nK7c%2FxRLlxrn3whLC%2FJ6EOn1ycXM8FWceWp3jB3kl%2F%2F07Fv5FUUfseBXbecZBCgJtE%2Bfakhdk16LmvE7erlh5%2BL3Q1Zj66WkPiyMQpEyq8B1oN98l4xSu%2FCH9EUC1FGskJV%2FLdtZZh5IaofOQKyZg07%2Fgo6PTjiOKUBe7M%2Bfv%2BWVtRbnlk4K6r4g7TXdzHdFjpX3rbKRYMa0t0uwXckVhsyQ5HW1JaMlZkBnLudB%2FXzmM1AzunvfXNDloMHCDcNix5DJ5w6zHzciqIB8tUcHcDdx66IWeCZZfgO61ofkP7EIk2zCGMyELTU6tihOsI73KIpW0u%2BhrzD7vSggRpGNNWm6xtYs0rORZbmE8QWHJjky5z65CNvVbHCxX5H8FTrhVI2dKwTdQIFlL7BNkrtr3VBdQ17DJ9ephLsImVATwRoj%2FjjFpTXFoHSYJtBusG76tMENveY3MOuKt80GOqUBvxoHFe6d71fBT1SFnVZtbJRS2YDO8evk%2B7nKkj4IjIxu8BleLJ%2BGY%2BOIf5yXQelrizdunG5dj3e92w9MpOlpSbyBe%2F7HKxGpSJ6FsLWFBwJecIQTACdp4H9GjfDAhxMXWz%2FHim6lqELS%2Ba%2BDXFHJ92%2FQo0mOrBQoNhaaMB3%2FvuhGXYbQecyd5h9PhzSPyA2R8tTEQeu6qWpBCwfQNsyE5kRK4OBv&X-Amz-Signature=22f1d1b3127f7d9e56c4e9735efd48436458fb19572c92af398eff3c7f86bc0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RW6D44J%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIBEWctWtxqbUkr2XEj8g10FWozf%2FWtliRyZKjSr%2BbaC5AiA0qQ1nOXPjcy9P%2Fzy0fpIKV6ISkibI3Zt4dVGkPNXb7yr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMDd9j1Mtx1ofHVFL5KtwDyW28kUsg2Qr8ANfLqJtC3BAtT2vYJnstHuDmH8%2FCOzB66vWkTOd9kEvXXzPb7HENAmY1z%2BOaBs%2BCzqKMYBDTbo4K%2FoTMjSd4h51XK43jPk9dC2I0ToJBXfjCK5epcpHVb7FxD7GGeU%2FXrcoucN%2Fqn%2FpSEsYNVFzn1OD3viVJuX6RyykMSnaTrk3ujvbNxk9evx%2BxlF0RfKrOfZKTtLosPgmYa4rmFXyL%2BmduK3jISrxaisyodrw4IWFYECAepaRXtwEZfGnAb4GQT4MVrkJaUzGAOnXSuOvJXaK27brXIdpXnhM2mU1QlCaFurZEpGwKvXZtUdhUXL%2BtPKlPXL3Du45mEQXbm6WPt7TMYrJBnWH6zEp2chhVjG2IUc0887jGFwE45XEj5eRTfxE3ciRswhJFb%2FNcMbZVcw5sjkZb1Xp24YBXAlBz5%2BuxIeaRUnUFFf2moBmc0NK0LF7aXYsiqyIYJzBTWQQTJtaEKGe7MxD%2BsBKbYhsVWb6%2FfvA8WG8tz05rdzHfLZNr6PDaezioGogyfbESHP%2FRkdS2WAg49okWMZyqHWs3Ni5lx1Ua6SbjObhrUY3mJIojEXlNCFN0EpZDDevcUzHFaVuzgAXbIQvsqnwdNVsnNQcEKyIwnsC2zQY6pgHWcAXqBuCAX1N39GsraPm9LuUAKPD7btGd%2FC3W%2BI0S17ilwrPWKGnbVJZZQi3cFtdhXZt6AIDVT2mptnTtCcHE2xGSKhUTQcjGVrEbQcn31IQ3iUAudYmUojZhUxbkQPCp%2BkLhxAPfjaxSwYyi5%2B%2BkP7JfgPLNDrMPmSCdSYOizlqB5F30aFHf5iWWQ2jT7bDJz2tLRLqQHQko1q1NPylTC5fJDu8u&X-Amz-Signature=844a980303566648c87362fd32ed1f7a8e58e293484dc2abe7cf62db0dd19078&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667N4KOMDG%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIA%2Fb140rdCPNz2mIQxuq2gzFL0ZS%2BeJeS82v6PsyhLYeAiEAsK54OwOyyW1aJ22VENuDFKQMksVklE4kSxhSes%2F4p%2FIq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDCDtSJjzbRtRr9vgKircA4Xfi6q01ccc3FbobWlGeGph9pWZSYHYdI6XQGfq%2ByL%2FjBaWUpybNC3k0PhbNlMVlB3Id5XgkH5tDLHnqtOePst0lW92qE2pEp4Z4WyeXnJex7OW1wqQr9I3JTAYFdvMAgQBEfaoV9tuC8NPwPx9E9%2BVFFkZJtDGjAuyqba3bOlMCdUVRu8r1HjB%2FXml1pGpm1uWH3RkmJH432cBOw67S42ME06pk3plHUeX4MC8uVQnDmYA0hdrdfJ4akRiq4%2B911%2FJj7etf7y%2BJ3%2F73aARuJVtrdhYBcJifg%2FrtI9PRez8e76JAL1%2BVqzVeSiODkem3LE5LOiPYFaeYvZptEk3SE4qJZ0EyCwjaXma7Fo1HThWDnNv1FpMyieS5hY%2Bp5mFo030EGbJaqFxhTW4TpBMdwgf9wM8XitZppNM2L3yHfuW51ReuMYkiJ0YBWbYCQ%2FaIfGSU5PKeWQC4biNVDaEy5PyWw0pjEy0ZQyZtaEIJ%2BMQAp%2BoQoMRfayMNLXnxinTi3CF3M1gT%2BKl8VmykyUY1xpdGfG5SjIYNFCeA%2FOFycCNGUnrX5xX20eoNeIDfMCNbPZk3Smk2Fzvh3Nl62Y%2BwiYms5lQMXUN3PaVz7ihYt5BjHxawAh3EK9s98%2B2MPi8ts0GOqUB1MNvPbbfjg9Y%2F0Qrrp2mBLNWubGrc2XfxlymBKYKUrdr0jzDXkQTyPJa734mlrLj6wgUSoG9EF9hquum7BxXdebmnbpQ4cMvcj6I3GxBJYUn1Ttcuo%2FmugJRTXtZqWsG0RZJ9OfzIofH1PRfBra1fJSD9b2aPzUzb40qlofdQgbkPy637BWtCw7vUHxvbEZfTF6opcUTDhc4r7YBwDBFRP0dzu0M&X-Amz-Signature=9415b8a9f94ed49a802dba4139c027ba8b503f7768a90f63bd891175e27b5edc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRDYFJ56%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIGqnkME9HUdLyI2YAnz6mkthN1AljfJa1Kmmzn%2BqYAb8AiEAjkCFd%2Fw335h%2BpPYWil0SN6GfM3eedo2yPShz04JzLeoq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDG3EL74tawxU9UudyyrcAxhWjIL6%2B1Y7V9FiET%2FsYaxA0AK9C4BKFgBJnixtYi55F0FP%2Fq7d8iBm60HdrMnw3FdpQ1gl7vj3wgBGdW43b0Ez1epTFJ0V9GUim3qi7YT%2FJT%2BcCGtZEMjIkDbmewvknqId6pCeRB5nRAcM83Hk2hfRWA6DWvS%2BFpKLTFOA61zwbQxDgyCDdotJgDdL039gU3p37dLSK9PiS6lit560R3i%2Bl8sgQnVODJS2rZ2RYWWYcvHWMKIq%2BLeh3gqXWr2QYZG1DeEnMTWK0McIITkQdgYeTDnSiw6scrYvXXmDeLIP1k0DY8uVmi30rFrvbPvzJAuvhbwJRcScEhMcNx5zU2t0gje%2BYvdwmI9fummNEKoS8Oha%2FuVqQ8u9QrcNuW3aRNA2dB3gzoeexgKiIkGF3ull66e2VN34v6mQAKyqBGHiy8rhwnDo5bdmsm0B6AztjE2XIyIU01ykLxkOB%2BhzvKzzCbA5PdOSI2t56%2FxShyEosF1C2VbJfmPyL45D45JSY2mVKi25Bs3y8GfWkrUz%2BNJjm2R67FSR3qsX2%2BP%2BjeEW1pz%2Fo1JkwwF0UfMi8uKN%2B7jIXejdDioKpnD5k1cC2Te1z8Sfl4aopGO1GiAPXUXY%2Fibd%2B4PNhL95LBA6MO%2Blt80GOqUBKssmhKiLZwJ%2B7LUmZeP7YGSNX%2FqAcnLcJ9CNZMaS%2B%2F%2BpColqfwsduA2rchwg%2FqrR7oSf3eoZFf8oC1C1AgwjVFt1CNLbTpTLk9YxNsYCnfM%2BSc4Y7Ptzrh%2FOuXa2JC9WcN3AzMgb64j6oUK%2FsGSSJOuwz1syJ0r9pKC0LGmc%2BnrPtfU7hxLFISTAsp5Yj7GmYJhG5eOTSg8qXM1I9hgV0U%2B7w5Xc&X-Amz-Signature=5caf82a304d49e61181a1bfbab95b57c09496f7990e292b0f9027d6769f114cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRDYFJ56%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIGqnkME9HUdLyI2YAnz6mkthN1AljfJa1Kmmzn%2BqYAb8AiEAjkCFd%2Fw335h%2BpPYWil0SN6GfM3eedo2yPShz04JzLeoq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDG3EL74tawxU9UudyyrcAxhWjIL6%2B1Y7V9FiET%2FsYaxA0AK9C4BKFgBJnixtYi55F0FP%2Fq7d8iBm60HdrMnw3FdpQ1gl7vj3wgBGdW43b0Ez1epTFJ0V9GUim3qi7YT%2FJT%2BcCGtZEMjIkDbmewvknqId6pCeRB5nRAcM83Hk2hfRWA6DWvS%2BFpKLTFOA61zwbQxDgyCDdotJgDdL039gU3p37dLSK9PiS6lit560R3i%2Bl8sgQnVODJS2rZ2RYWWYcvHWMKIq%2BLeh3gqXWr2QYZG1DeEnMTWK0McIITkQdgYeTDnSiw6scrYvXXmDeLIP1k0DY8uVmi30rFrvbPvzJAuvhbwJRcScEhMcNx5zU2t0gje%2BYvdwmI9fummNEKoS8Oha%2FuVqQ8u9QrcNuW3aRNA2dB3gzoeexgKiIkGF3ull66e2VN34v6mQAKyqBGHiy8rhwnDo5bdmsm0B6AztjE2XIyIU01ykLxkOB%2BhzvKzzCbA5PdOSI2t56%2FxShyEosF1C2VbJfmPyL45D45JSY2mVKi25Bs3y8GfWkrUz%2BNJjm2R67FSR3qsX2%2BP%2BjeEW1pz%2Fo1JkwwF0UfMi8uKN%2B7jIXejdDioKpnD5k1cC2Te1z8Sfl4aopGO1GiAPXUXY%2Fibd%2B4PNhL95LBA6MO%2Blt80GOqUBKssmhKiLZwJ%2B7LUmZeP7YGSNX%2FqAcnLcJ9CNZMaS%2B%2F%2BpColqfwsduA2rchwg%2FqrR7oSf3eoZFf8oC1C1AgwjVFt1CNLbTpTLk9YxNsYCnfM%2BSc4Y7Ptzrh%2FOuXa2JC9WcN3AzMgb64j6oUK%2FsGSSJOuwz1syJ0r9pKC0LGmc%2BnrPtfU7hxLFISTAsp5Yj7GmYJhG5eOTSg8qXM1I9hgV0U%2B7w5Xc&X-Amz-Signature=dead0583023e2a5368368b73abb2e77a835b4e05b4aa71c08c49c9a920a3bd30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYE7OAWG%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCtI779Q53hGqzSl8SjN4OZXjGz47jbeCGQJqxRTf5vSgIgQl9jixZXqpkNw49ERldY7c39Zx4tRYQ%2Begh%2BfIMzZlIq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDOGQ4O6A8glqNBMpbCrcA6TmYp081h5fzkokrTm%2BOVhOrQbsvSt1V114Qr9SU1T07c%2FB0P2sMh2h1NL7tLHUWh7TI27N%2FE%2BeU9utkTAJk25OmMtJaMFqYlfcqQyF5f%2BSJEXliu0bb31zZ0R5Eb9K4PrZoGUpGCr8nZR5edEvfg1oYteYFvdJ4MRe7il5yYTH6XMxA8EuoB2m2y%2BgKNNZIxXP6Ld%2F67ywwiqYx4nePvxJDaovoaLsLpjEskwzru5vzetLnZLF32SxOCGIypbeT6vS9vrlxSIT%2Fdkcf0BjCgOgS1zH2qjhRHGQpUjbPJ51hAnl7Z%2BDaMuVb1VhHB1sgJkjOSg9z7WmOLyyBNU6tVQsQYFEgoJaTni23lC5gFckC2ATU2nw33PpdPRrE4X8CN0z9%2BldV8oDZc8uch1YA2XaPT50VTzfv6QKBad8zJXVmsYgeKnq%2BTqsEh7XKFNXxqj00hnXDOKX6f07vgJpJINUXVF6yjSqSS0S%2BYznJivFzm7CB8%2BFMCjjiovF9%2BH%2BuGCjGDFbRqkuOGpUqdG8m1jyw03oq7UC2E6qBV2cKpc7727H2%2FHTDnfSxZZncxo6hgVd2mDvuU9QgMam7UqWKXI9IIVjoMWw4Q10enzBUS27hsQj45vyu6DOI6AwMIXIts0GOqUBNd%2BHmgnOoxtNSnAkwmpAdyqZR7qOx4Qg88M0rW4uGtB6EShYNnRvx6I25G5%2BysHkc7M5gulhBtv%2Bqkbdsy%2FmSWlGN9ca2lCmNV6rtKTPc4LJHBHM9TP6x%2FAafB7Yb2Wt2VfTu94%2FMm1%2B09vl4ue%2Flj0bJp1Bj1KJVY%2FY4zEcdKMImZ6yHKnNnQReGYyoN99pbGGRKTJAk%2FbZOd%2FJMz0sXy2oO3B6&X-Amz-Signature=09dbc54ab23fad37a318280d0070f30ce3bec573440a01324810320b365897f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHA4IGX4%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIF0UjFjB5EzaA5u3PLfD%2B6JF4mvF3QJ6111DXLvYVRNfAiEAqs2N4tbTXrxxnIafcAq2R0OMmUQ5WZECFCkOrhXEBegq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDH8VBY1fwOqvq%2F9nySrcAzRqXH%2BBhMrFOQ07neZTp%2BVq7ORTBPYfp73gkF6wGfcJRlroi3JrseAZEl9%2BtJPGx0zT4mygHvPha4gjEAlBFfpddQQVY9F8XdbyXv9jAEaC7o6Z6%2BFFH5YpHafPVoo4hmQe%2Bi39FOvFchYacBT5XTh0sDhE77IEUOW46bWMEsPlGMDCulvdDbS7IwKrvbOaVTDzA3R6xINlBKTEQBK2338EdWBs45Mi7CCKcLKdnfsnraX%2FpUnkFuxwNagzcYnhYwQDAEYDNoi3FRvM4kf3BUgSXqT4B97FaTUCsu7FgCUSK0KGQCTGevRKYBn3Vednk82xduYZajuP1%2B%2BxDlpaluFrKVHN6zOgbaARP8ewyYU6hg11u3obkvhpR4naCDDD98mcC4%2FccCAZ16UbbTphDI4ION%2B9kVSWO78e3W3pz1JJ3PV%2BQcGnRDDUSuKcU71RywM4anTUYx8MxkSMiY%2FzyqSjxTH%2F2T6GX2UMbUdz7keg8sqoO40Rx6oYc%2BjX6crIfuZkGmBvHkWkPCLKdUEcz8i5cJTnMTAsyL9lKUmjAbWh61MFi%2FIB98rifIIPFeyy8azuNZg1oe%2BSd6zXQsRgY7uAG07z31V4ORPMR7hI0ASXh4x5VsOCey977suxMK3wts0GOqUBc9gnhvz%2FbEnhq43sx7Em9S2C1wD9uLXCw0RIWaR7iVlPTPRt85HNtaz55eNkB1%2BD157WUGLqs3wymqosILOmmVTS3YGuALyc0uQ70FIloYjsY9JwbuOvdEsCcEhAeM376rewiMijJ26%2Bi139oixchMaA6psGiJzQsY69o5RIt5Gxy%2FRfbza%2FZWK5JIfyKF3t5b7FrkHcvjzaE%2F9TIdapKvjxcKoq&X-Amz-Signature=25fc3c24235a17354a523b8a0b5848584c747ebd08aec9d00cd33a3c4b203f05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHA4IGX4%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIF0UjFjB5EzaA5u3PLfD%2B6JF4mvF3QJ6111DXLvYVRNfAiEAqs2N4tbTXrxxnIafcAq2R0OMmUQ5WZECFCkOrhXEBegq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDH8VBY1fwOqvq%2F9nySrcAzRqXH%2BBhMrFOQ07neZTp%2BVq7ORTBPYfp73gkF6wGfcJRlroi3JrseAZEl9%2BtJPGx0zT4mygHvPha4gjEAlBFfpddQQVY9F8XdbyXv9jAEaC7o6Z6%2BFFH5YpHafPVoo4hmQe%2Bi39FOvFchYacBT5XTh0sDhE77IEUOW46bWMEsPlGMDCulvdDbS7IwKrvbOaVTDzA3R6xINlBKTEQBK2338EdWBs45Mi7CCKcLKdnfsnraX%2FpUnkFuxwNagzcYnhYwQDAEYDNoi3FRvM4kf3BUgSXqT4B97FaTUCsu7FgCUSK0KGQCTGevRKYBn3Vednk82xduYZajuP1%2B%2BxDlpaluFrKVHN6zOgbaARP8ewyYU6hg11u3obkvhpR4naCDDD98mcC4%2FccCAZ16UbbTphDI4ION%2B9kVSWO78e3W3pz1JJ3PV%2BQcGnRDDUSuKcU71RywM4anTUYx8MxkSMiY%2FzyqSjxTH%2F2T6GX2UMbUdz7keg8sqoO40Rx6oYc%2BjX6crIfuZkGmBvHkWkPCLKdUEcz8i5cJTnMTAsyL9lKUmjAbWh61MFi%2FIB98rifIIPFeyy8azuNZg1oe%2BSd6zXQsRgY7uAG07z31V4ORPMR7hI0ASXh4x5VsOCey977suxMK3wts0GOqUBc9gnhvz%2FbEnhq43sx7Em9S2C1wD9uLXCw0RIWaR7iVlPTPRt85HNtaz55eNkB1%2BD157WUGLqs3wymqosILOmmVTS3YGuALyc0uQ70FIloYjsY9JwbuOvdEsCcEhAeM376rewiMijJ26%2Bi139oixchMaA6psGiJzQsY69o5RIt5Gxy%2FRfbza%2FZWK5JIfyKF3t5b7FrkHcvjzaE%2F9TIdapKvjxcKoq&X-Amz-Signature=25fc3c24235a17354a523b8a0b5848584c747ebd08aec9d00cd33a3c4b203f05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRJJFQZS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T211131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIBf9jwgFT5uzvxiYrcRMk8Sci20gbHP9zvGw4c%2F5%2BvKqAiB9Qbf7RTorukqbJmZIzusRxxqfMIPgS8FMIUcWhK5VWSr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMsvoIeovBymKwzVarKtwDBWOAStLLBNPM7rpYXAjwhvoZErZd%2BFLrQhsh1vF5YMggKDeBhBt4gvSBHGgCfRYT6PTE5IFDc5LjiuKaB3vDtBtbvPtyBfpQWcTQy9PwcI1wi8PsRJyJPw9oBsqzrlLetDcCqSyYdqAY052MRXwLA64Rzx4xrpdDHTTh7ihPcEMniG4N2Tchkh48py66L4j3vFeHmSD80sTQd%2BQ8f5bZkrhdN8s0NzGN1lTJblqg7cUa7dvMNBydp%2BWrCtam7LJx2dday7%2FonjKEEjN0zljn1%2ByqTYAVaeqgzzTWsXyHAFVcfxJkl0JY1uLqfgpbCzrV1ddl7ilsdXFmFe3IRfeI1Uc7q0eszpbMXb6ThcBer75coM68ixf50NVRmjb6bD86%2F2O%2BShKDIbGjqTfXMjAc6GiHbjXPuER6PTucZhKXaNmObhraEzIxClLcSb%2B4egZjc%2BNYpU7ig0VoWfQ8c9oMNc3xAkemv71eFfiokb2wpLT74Nf1Hb8BGZMT85iuXqPOsnJK9IY6Zt7k5VniFtRC4J37z8dSpYSxd4uK2im8QL1cXznNRdMeM1k%2FMGtC960afovgNBxZSJz0KJ0ClZcTYjVynJ8rVaF9e3AjoOkiwd9nOFAsAdR%2F86j5s2UwsLu2zQY6pgF44AbuO94NWHtve2Zqa%2BQoj6ixhsoN0Y%2FY8ySN%2FcBQI9wkIcEmOMk1AEbcwPG0%2Fiunw8fReiup0lNyq7u8cArLhTDNU3rxUW13yr2G5%2BeD5DLU%2BR4Pp2y0Td1nIjDMtd%2BiBMLHi6ivx8QWn0g08SmiMkt0fJDVfaPuuhJGJBgX5uAjsPGlyCPMApUrUsT%2FO3ZpPcT%2FyZM8t3J6jKiH2QHrqe%2FKugus&X-Amz-Signature=dcdf19b61a4f70cce39dbdc30492f441a2d796c2026913950afdaef2354d81cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

