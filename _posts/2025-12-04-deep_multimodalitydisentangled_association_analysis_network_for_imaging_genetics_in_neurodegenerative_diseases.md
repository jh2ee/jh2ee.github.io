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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXI37NGG%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFcHHpskBBIFq7m7ySaW%2F3pnGVucSLDzTUgwPofdTu%2FzAiAtsN42EzOOhjJVrXhe7aFqb9Zu89NsKJI%2BUdxBF2xBBir%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMOZpThaDRmgQZ0q5SKtwD7EGfCtvd%2FTjS%2BdWjx3HZRzq6Ubjz4tFGZtgCDry1snEX30EW3mrntoUE7MCEN4aQOUKsGVHc8AUpJITwWi4TNh01TgxgOJvPS6Y9zl2CmWr%2FL0HOwAWeVkqfdsgSCVUVIl79hhDK%2FE4%2BR0Ltvn2D%2Bpfkq8X%2FH6%2B%2Bu5qt1e452tHpFShieo4KCEKXiNbOmiPMVh%2BekgX5ThaqePgUNTOmL88u8Wn3lfaymMe%2FmZFaacV6jEVcFV8DEVSeJnwSOAOJn2mSS9uq3aYIx0X%2BHm5sOYkBDIMc0umin8Nd8WUpMiLwYfOwmG3GHyP%2FHbF9UiUIq6E0VxuVJEz%2BahVbGzAzyy5jZ5Emx9%2FqqZJziEx%2BAIIs9XzI8gZxarSEYY039kLv%2FDDmCUS8VSCRAFSX8%2FJOBrYnHhLJemkvkcT9O6jXmC3iKXPfvmz828kgobWhagZaeYhJVk%2BVM0dqI0lbE4UmaeyfzqGkrtzP0Zr1epU6vFfV1%2BUcDAXPueTAofLqTeseiuzt0qMQ1qJ9NT3X2lN2q%2Fcz%2B%2F55v7Gmu7SI1%2BwkkbTsfE%2FAVPSUL8aK3TuvJmZ1dIxigUokrdjG%2FRxpFsJGRgKO92Kw87l35BzU3yDJfXOqJsMMB2%2B2%2BeVetu8w6%2FPiywY6pgFsDAxu1hLRQ5VRnUyMFz1ibfHOwmO62CwghvTZ7LM%2F3DfBYi%2B7RXCJ4FxhaeHtsD7sstiAfkOfBdlhtO0uLaqgvRBOLx2Lxn6WdyAoPGki8yZ4rWYn0dHQVaINPXWix55KHsxlT6%2BatyISX2kaWj7UtBOUQ39kIjLNBvAUHm8EFjUtFOTn6EVSFNjwmvp45Ojyqq3cLQojM02GElbohZWRf8nklzQb&X-Amz-Signature=eac6281fe62903735cfc562a4b39c31cd75b1c79b38f80b5aad956ff5d4b0a84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXI37NGG%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFcHHpskBBIFq7m7ySaW%2F3pnGVucSLDzTUgwPofdTu%2FzAiAtsN42EzOOhjJVrXhe7aFqb9Zu89NsKJI%2BUdxBF2xBBir%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMOZpThaDRmgQZ0q5SKtwD7EGfCtvd%2FTjS%2BdWjx3HZRzq6Ubjz4tFGZtgCDry1snEX30EW3mrntoUE7MCEN4aQOUKsGVHc8AUpJITwWi4TNh01TgxgOJvPS6Y9zl2CmWr%2FL0HOwAWeVkqfdsgSCVUVIl79hhDK%2FE4%2BR0Ltvn2D%2Bpfkq8X%2FH6%2B%2Bu5qt1e452tHpFShieo4KCEKXiNbOmiPMVh%2BekgX5ThaqePgUNTOmL88u8Wn3lfaymMe%2FmZFaacV6jEVcFV8DEVSeJnwSOAOJn2mSS9uq3aYIx0X%2BHm5sOYkBDIMc0umin8Nd8WUpMiLwYfOwmG3GHyP%2FHbF9UiUIq6E0VxuVJEz%2BahVbGzAzyy5jZ5Emx9%2FqqZJziEx%2BAIIs9XzI8gZxarSEYY039kLv%2FDDmCUS8VSCRAFSX8%2FJOBrYnHhLJemkvkcT9O6jXmC3iKXPfvmz828kgobWhagZaeYhJVk%2BVM0dqI0lbE4UmaeyfzqGkrtzP0Zr1epU6vFfV1%2BUcDAXPueTAofLqTeseiuzt0qMQ1qJ9NT3X2lN2q%2Fcz%2B%2F55v7Gmu7SI1%2BwkkbTsfE%2FAVPSUL8aK3TuvJmZ1dIxigUokrdjG%2FRxpFsJGRgKO92Kw87l35BzU3yDJfXOqJsMMB2%2B2%2BeVetu8w6%2FPiywY6pgFsDAxu1hLRQ5VRnUyMFz1ibfHOwmO62CwghvTZ7LM%2F3DfBYi%2B7RXCJ4FxhaeHtsD7sstiAfkOfBdlhtO0uLaqgvRBOLx2Lxn6WdyAoPGki8yZ4rWYn0dHQVaINPXWix55KHsxlT6%2BatyISX2kaWj7UtBOUQ39kIjLNBvAUHm8EFjUtFOTn6EVSFNjwmvp45Ojyqq3cLQojM02GElbohZWRf8nklzQb&X-Amz-Signature=eac6281fe62903735cfc562a4b39c31cd75b1c79b38f80b5aad956ff5d4b0a84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TK5NL75%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGr1r5BxsXscMsRF7fBg8i1ZJV1iIEdnLaAULNYkThmsAiEAj%2BavjJhFMbekr1Kolx8BrfkS2zEhgm7OQvzcgLOLMNkq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDD5X2wQafaembVPgRircA4pYRssCXl5lQfrmiuYXZw4aEqzxz7BrLJanBChEZTLnGfK5Y60%2Bv4PSwo46Wg8FPfgGubbLK0eVSB07HRaSoJCxSgJ9bwiWeMnco1rSSXVNaTWolpoZpHD1B%2Fgiz7vfJDmwg0oV1DMhSGnr47PtEKP38IbzYYuOMm2xH0xCcgpV04diRjkie0CQDSA0OEkpYFJckOLCpNgtEu82awHtILlClz8PZpStH7kJxtQWxZ3FhnbOLlDyha%2Fg6GRJIYllGzZnFI7dZjCkWPp2nPDc%2B2YEBkYVpJjAYOR234xCVSdXYse1MyiiT%2BgtUQgqrpWMFFh6xXj0ZMMS6uTZYcnFGGi%2FTQAUADfKIaDMHk2tdzwO5BZsk06o2f3FC1tDnPDTfadAFsZH2SUzLvrrALEAH%2B29iKpjeqPpQ5IkB3%2FJz8IaBSSHKJ%2FYDlfjoYCao690Ul1inuGGh%2FG9f1wHludyG%2B5fBYzfY6yD2ZaFzZHB75w9rR9%2Bl7STlF1u7U%2FaSRUGzicH%2F9YHUuzG0aIrx5%2F4i6zdg36gYvLQGTPD73aQqrXJ%2BX8RZ0WYWqGHhq3Q%2BRZ17QHIrKmvLypGJyYP7bdf%2Btj0uPfbQHfdhh81HVrMpFk94HX4Ern%2FHi8pjT9mMOT04ssGOqUBt9wsGb79YS4CrTCvvRpHp9Qgyr9NTAtwSqjCbKrxWmJupu4g3Eu00F5KMOro8WQFTffKHwcfc3WUSxYnu1bBd9Y1LqGmGmxY%2BcpFbWXMEknJMf%2BNqqN6BFBUeWJdcrnao7r2M4juj8WHndFg%2BwUVsH7TpsFc4s5rfe7%2Buo6T%2BGBuYy4SxX6usU0GY6dQ1Slj0XuzNxMlOt1V%2FMkGTJoRYRkGdex%2B&X-Amz-Signature=fd5c3ce4fa09b3eede900e4d2a592cbf59e22d4b35e0d269b403a6a887e6c32e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L6F2XS6%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCFB67kUJh9kuwYbs%2Fk1axObt5D5JQZTqGk6D9Y7dSSMQIhAJIDnqv7mr%2FadlKPReDIaAwqqHFH8G53K6EQCnaKw8JUKv8DCFYQABoMNjM3NDIzMTgzODA1IgzglQaEyXhWQxHYWD4q3ANy82n5GFvd%2FSl0ktVsvPP%2BdXKFmOzi4SoqodfLCbaNZjzo4kro4gy69VqiOjBLKgEUk4C%2B8xD9qb%2FLtUmluX6cWNTKA%2BJvOeRAOEc7gsMuhobNPTvF%2FQ%2FWvGBnYkGc7HGjf%2FdNgjVeTDOamhOp3Fgra2UPCQzj0yiECGXlCqte6x70BmEjPyrsQGvVU2r1c3QZJGSev6yi67KpMgJGagEcSKdclMKKIFktep5MxuBRg%2FUtBArhQSTmficOYqjo67Bya4z7WzLGTGBxPGQ0ALsDIr7zcWhPlXGlCoZK1DHjLbqWs%2BX%2F7CAONGJD7H78KVHmk%2FZ1VBSDwJ0CcTPCgFRtzQdQFUH%2Fg4xV%2FNFk5MAkMt1NI9UgOs14Qh%2BNI0L3NZiIf4j%2Fj3Xnz3xPFu8IjSVgNQBunvLon8PPRy5ALbHLSXQl5kunZvrGbsgoGksSPZWpCQ6TK7sarVTw1LPH0pFEXPVuazUy8nN18SN02tOms63IP7tBhKvdrzLDlRIU9apAjQ0sB3hm%2FwTGN%2FXxI0xfnmwq8%2Bh3FNcP%2BlfvXlkIM3rMTQcBBCq7Yd%2FmqFGUcgGKLoXUWyP%2Bb1BtGhUsiGBU5o7bwiHhq2E%2FXSdf0YSWG3eabE8YSeqLgdQzRTDS9OLLBjqkAee1sF5JT6ndLy1EV5kE6apeeOuNsODKNzMF0BHfXtBHMk%2F%2BBQSCBNJ8az0oqYI%2FEQEWWAqafltXLnn1TNzJ4fMvxNeL%2FaQNcUPokdmmepPCKs8nqwv%2FWymrY6o9B8TefBBpzUxasoAbp7VZH550zrj6GvJH4mDWCGg2Nh%2BYsoRIQURJxlgVjtUm2zFm2c6vT80PH%2FLHZ9Aid4gSMa20ILTBnQCS&X-Amz-Signature=5c4df72f70e95a5acfddd639437f696dcbb010ae592eff66cebf2a09676b35bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L6F2XS6%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCFB67kUJh9kuwYbs%2Fk1axObt5D5JQZTqGk6D9Y7dSSMQIhAJIDnqv7mr%2FadlKPReDIaAwqqHFH8G53K6EQCnaKw8JUKv8DCFYQABoMNjM3NDIzMTgzODA1IgzglQaEyXhWQxHYWD4q3ANy82n5GFvd%2FSl0ktVsvPP%2BdXKFmOzi4SoqodfLCbaNZjzo4kro4gy69VqiOjBLKgEUk4C%2B8xD9qb%2FLtUmluX6cWNTKA%2BJvOeRAOEc7gsMuhobNPTvF%2FQ%2FWvGBnYkGc7HGjf%2FdNgjVeTDOamhOp3Fgra2UPCQzj0yiECGXlCqte6x70BmEjPyrsQGvVU2r1c3QZJGSev6yi67KpMgJGagEcSKdclMKKIFktep5MxuBRg%2FUtBArhQSTmficOYqjo67Bya4z7WzLGTGBxPGQ0ALsDIr7zcWhPlXGlCoZK1DHjLbqWs%2BX%2F7CAONGJD7H78KVHmk%2FZ1VBSDwJ0CcTPCgFRtzQdQFUH%2Fg4xV%2FNFk5MAkMt1NI9UgOs14Qh%2BNI0L3NZiIf4j%2Fj3Xnz3xPFu8IjSVgNQBunvLon8PPRy5ALbHLSXQl5kunZvrGbsgoGksSPZWpCQ6TK7sarVTw1LPH0pFEXPVuazUy8nN18SN02tOms63IP7tBhKvdrzLDlRIU9apAjQ0sB3hm%2FwTGN%2FXxI0xfnmwq8%2Bh3FNcP%2BlfvXlkIM3rMTQcBBCq7Yd%2FmqFGUcgGKLoXUWyP%2Bb1BtGhUsiGBU5o7bwiHhq2E%2FXSdf0YSWG3eabE8YSeqLgdQzRTDS9OLLBjqkAee1sF5JT6ndLy1EV5kE6apeeOuNsODKNzMF0BHfXtBHMk%2F%2BBQSCBNJ8az0oqYI%2FEQEWWAqafltXLnn1TNzJ4fMvxNeL%2FaQNcUPokdmmepPCKs8nqwv%2FWymrY6o9B8TefBBpzUxasoAbp7VZH550zrj6GvJH4mDWCGg2Nh%2BYsoRIQURJxlgVjtUm2zFm2c6vT80PH%2FLHZ9Aid4gSMa20ILTBnQCS&X-Amz-Signature=1629f3522dac440f06b2f41e349ee4f27b6a3bbc973eeac4863bd86ef73899e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7HK4ZLJ%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4uU%2Bd6vuFXiDPqMVpXcWWyKw6oNhwYjvhdTOyqC6iogIhALdOQalC15qv%2B%2Fx8CyaWkprFTZ3qSYKOCeECHopomGvXKv8DCFYQABoMNjM3NDIzMTgzODA1Igwp0KAjMhWCW0mkc70q3AN%2FTgBZuC8%2BmMFRCuSdZ6v27eG8%2B9ZwcSfSiN7N8M3OdiT55szLMT5GWD%2BeOXayyXFVo735jyfcW3R4V1P1a7W5%2BYFio%2F%2FC68FtdSBXzGDuHa2ieONtTNoGwAj0Ni3v6uA2y7%2FOCwCV5rCJUozAGiUixy1Xd76xprmUylY4Dvz8laKhKE6H4Pf4tMnQ0llA1E9FBqJ6UyUduXBjTJXfOAADy38rxUm2lCnL2NHOmLunMlRk8uAMWEL3470I%2BOdbaafOr9pw6ZMidOY45Y%2FZASONA05gzQ8KJKMxMMk1fl5I%2BfP7Dxzciqy09He3k5ES5vFgZhhA8kCVZ7h5KVZiVEzWnqh5QsYq0aZEun09Cb15PjJuH5zu9RIIWpBUFcrCJmzpTUU7yuq6269yho03au76wC2Eyi1wtWnajBPoRkf%2F6EbHhKlyjQp8tRLw0BPx2RbfwrI1iQq2Lu2RRr1ldlb%2FJ35cNE%2BVuMU5mhmF1hLiOGMutf1Z5mhBe0V0a%2BlKZ4G2zrjyJNH41%2FBABLssIeHA%2BJaeZMeBvpqOckSnCe8lAMYGvdJl40VK6r5n1PHIcRVEXVEk170GO64I7PRZxLY%2FnzhNF4jjWCSHZwIxn39vSnaYur%2BqV1UFW6qQ3DDT8%2BLLBjqkAcxaBna%2BoIGQyRF5dSevMjc6XB61ioXZWOJ5tG%2BF0MfoQkCOqrg%2F6UNuy25WKD7%2B6BNfSMNu02bFmAXLuWur3NPDCZ6IAALn55%2FUj1a8I%2BoLQ7Fohn21pPF8o8n5xy8LfZTwDLaMX9SV0m%2B%2F7m24%2Fa9Ate5z72p1RVipcNSSHKp2vp3%2BBgaFi3vBjWANlbbrEy6FzMU5v5ULkPmg39%2BbtybPhT3%2F&X-Amz-Signature=e4f69e7a58d0df642e334811c01580c8f90e3d09dfab79d22ddd9ac3b96f1fbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSZRKGP4%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8tQLPqc%2BcCxGcEHLDkyFqkbztfQTF8hGqTLIqOu8oPwIhAMNjMOhXx56Aess%2FJp6tNPG4niRHS45U%2F8n0KxImX%2F7uKv8DCFYQABoMNjM3NDIzMTgzODA1IgyhL31WPdH1urNfD4cq3AO7KKcN9gGQpJsiJ9yyvvqVeJGdG8hMoiCpB3YDhAzA8cMFGE5mU2DyhjQsNkknUc1VancxZmlaUDX6pB%2Fz%2F5X1%2FiyrhURQAkUwddRARHopU%2FBPa61CwADaxToJHM6puu%2F1YCMRFfxFRCxnQuQB%2FIwVQRDCiVxrLFHGvIDI13iInhWAb4bI%2FeadkqOLk61u7H4qAMt8xAtSmCkx7YvjzRlHT1N3KSbJi%2FXH9wDh90RbMa4MZeupXecO9ktYovs8a2k85t68cMQcSUJW%2BDQuGUpsq%2FDz%2F4wgtcslHwplMGqVciZPW8E2IBGPpJ5tLe%2BalLGVM2o9KyspBIbtLYz0Hgw24tzCPCt%2FWYAVL4GEtAaJdGF86nMQrgUGEfTs5thXArOaE2mXJI%2F3f4vj3zXt4Sz3z2PhoY6ECmx2UkAsyZAwW5b5%2FVOpT01kVj2ku%2BFtasyMBXPyFE60IIC9aGPJBLAc6a%2FdjjoWns3uEgo9snEt3MOG3F250TXSVubHvWKd27lEEM%2BWVXSKVSJCKRL1ybt7MX9psVG0jrLNGgZtR7VwmZC2vVOy82pNjh%2B1Bj65ctkRVzwsqTWndu2tXNUyBnpUZM2ZS%2FGHf7fqzwun%2FP5zKGwDx3uqRv3BOazQ2TC08%2BLLBjqkAflTFcMvH0lnrIKT1%2Bu6Bglg6Pj8wZPB78MF%2FAjGgJn%2FDGMmM8pJC9ns%2FMCoWT9ZvaB6ap4oKKBgohGOtPCNtDW8PR3bbH%2FqhSEFRnpgLhWg51oKA1ay%2Bw25asToCCSoiVbpv%2BRqmKyav8SP7AcFOAo2upw0DSDG05stggqDn2AluJ2BUVjXrotMNtDGgre%2BD43DlSvScuFyZC8IQpHU0kCTrjqk&X-Amz-Signature=4e54a7ab010c08ed0cd008e99989bccac681c4f57ea80fb599d21cfc6e0a1ce8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YT7TD6QR%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2Fhs1HLUBB12dLoS%2FciqYAWmc84IqWe4ZhYQIQ%2FqQ8xAIgfLZtvknyFlekNimJBMZvueNcS3R0TvaX76glLE753PIq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDBERpouEdcwo1krX0yrcA5eS4FHgWAjxt%2BkCpV2ddYe%2Bc8C4YFFSUqmZdlneK0pLjfCjTNbUPqBi5UGkvR9VGT81NiXpu%2Bd3XDajuzrnYtN278ngrCqLMz4OsK%2FlUx%2Br%2FTlAxOlPpj6XEf9BgY1LMoPjlNwSC702B6ayhFq4r8UGB3HDtiZuyJoDZOJ9ZGAvZBun9%2B1h4GQAMwnNGQQm56vY7E1j%2F6XImI3S8pc9eXxzCd%2FZNZ9h17Cy13V1Pe%2F3A0FkJfu2hLQ%2BTLMoVQFA%2Bs1SWQNo1uEuk0hMCRc2Z9%2B%2Fd9hheynvuLbHNY%2FM2iX7Y7EaoetTtMjpuli9qwdNSpAKl1JLPMRKFOU%2F48FhewxkSGBmsaTOsnJM28CSeOW919nDpbrn%2BTKyDccHWHzD1vfmZqFvh9VTyc1OhW%2F%2Fx2DQPz8VwD3uAqFU%2B4PTFRjTtdMyJVaGOlBYleztc75xMAgJWJyqYkqR5urcSgcePRTLw08PVcFT8DjEQ8%2F%2BMjONdGr3IOX9LJmXPYJc9YBTiZHqMXL%2Fl56%2FDzAPkbiufMWSepU5lmHq1kSf0bRGVQJgrPGYIwVvZZGRtKrG6DJqCKyAXZwwnJXTcSv7lZOFn0nvE%2Bq%2F7On2jSGvGhzlN54i0dtd3PE%2FoLVvlRHNMNfz4ssGOqUB6N%2FjJLCiI5VY0KhUld1hZJ9zeaiSrMZj37o%2Fg73fRFzv6KvY2RuL5DaJxYk3gs0UKW1far0f41NZMfnzFNQcHthslHZgnZRd27%2Fm1zxuVvtSmM6%2BxnSA8nmG2DFXe08zthIKjz5qI4%2FDGStmO3oFZXQ99ka1i8kY1QuyyQa%2Fl5ubkNYygqOR4c%2FkoOeew5c%2Fv7mKVk%2BrZZs8njKIDrIY4PvuIcf2&X-Amz-Signature=7d2407e74f1aafe51bd6417b13b88a927e5ca8cc34b89e0c349e2a9f750c8ccf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDRYBHM2%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGryJ%2FWzqxDNNuLZjnQ5htUn629mXGU3EvDbno5Ex9EuAiBVLVljQgxOSaJ6OhwNEm8DCjfjXBCH%2B%2B8fVvxOEAd2pSr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMci%2Bthu5NGjppe1yeKtwD6KGEnjBwSFNc5wAHAoHCAocZpomw9JgJnU9zwt%2BsAxjFDFFdcNz53Z1T%2FRiqL2RnsGLg58AmiU%2BEPyzthcumw1OI9fhc4h1SD%2B%2BstpGwYWmuSjCD5fwuzH9XHRPt5JM8Yu9AIuZpwRL4zXurhP6JpBqjbz3gNiViiGZvBxsx%2FG7vk%2BW6mnZC4TaolAJ98x4I0%2FTCvbsn0U8oLyxrCaJ%2Fi4PI2IyuHyEVWFcIOdyzTD9wWjn2wfbBX1iuMbAbFXCCezOiEikwFPYf%2FXKPGh%2FzAK%2BuzeAMSHq1o7RM%2FFOW6zIb93kUQy1MBqwPHqyORjlFn08tuztbNMekARUcpdTUMIYGZFMi8P68941ITej%2B13nwEAwWwzsg4CkWDI8t9u9qvQfjIoCiHn7hSjHAO%2BPS5n7pVM2bzCq17hMqvHHgGDH7a1WH2XhKWRYhRsQyHAgZuTJalqA9PLr6MhjK86%2F%2BvCKdWSE17r8pHcUJTWiLkPeaxZ%2BcMuU0p7FM%2FrfN3yANTSWPfUxRIj2YVFrppuCKKhQAao8UqdqKa97E73Lk4EZrfQPHOdrdQinUrjgMt9CdzH2eUaXMQSRCPTy8z6g9C5nWoTfmH9TEKsbuhhkHD5V%2B4X1cKitt3QFCpMow9PPiywY6pgFtph2tGdqqdtO7XC%2BZWfZodhXGUmipZ%2Fcptv84qAb7LuZogbqODPuOGj0s3c7inDiEFHMWmPw21BJstuZ2h5M7PsELBBqOu1F341r1xkmu8Es%2Fksw8y1gFEycebmOdyhj8g5tECxKtjg6vIk5c5pCZbrY%2BZcpOUNUfkFS8DlbJkzgZ45NK%2Fp6LEECE%2F2RFMaz2S5RNBY1NOFn0o8dMDG%2F6NdBhIDa3&X-Amz-Signature=35d84529f710f0e115e20b1bbaf40dc50d3ffcb9e768d0ce6597adffbf125fb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDRYBHM2%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGryJ%2FWzqxDNNuLZjnQ5htUn629mXGU3EvDbno5Ex9EuAiBVLVljQgxOSaJ6OhwNEm8DCjfjXBCH%2B%2B8fVvxOEAd2pSr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMci%2Bthu5NGjppe1yeKtwD6KGEnjBwSFNc5wAHAoHCAocZpomw9JgJnU9zwt%2BsAxjFDFFdcNz53Z1T%2FRiqL2RnsGLg58AmiU%2BEPyzthcumw1OI9fhc4h1SD%2B%2BstpGwYWmuSjCD5fwuzH9XHRPt5JM8Yu9AIuZpwRL4zXurhP6JpBqjbz3gNiViiGZvBxsx%2FG7vk%2BW6mnZC4TaolAJ98x4I0%2FTCvbsn0U8oLyxrCaJ%2Fi4PI2IyuHyEVWFcIOdyzTD9wWjn2wfbBX1iuMbAbFXCCezOiEikwFPYf%2FXKPGh%2FzAK%2BuzeAMSHq1o7RM%2FFOW6zIb93kUQy1MBqwPHqyORjlFn08tuztbNMekARUcpdTUMIYGZFMi8P68941ITej%2B13nwEAwWwzsg4CkWDI8t9u9qvQfjIoCiHn7hSjHAO%2BPS5n7pVM2bzCq17hMqvHHgGDH7a1WH2XhKWRYhRsQyHAgZuTJalqA9PLr6MhjK86%2F%2BvCKdWSE17r8pHcUJTWiLkPeaxZ%2BcMuU0p7FM%2FrfN3yANTSWPfUxRIj2YVFrppuCKKhQAao8UqdqKa97E73Lk4EZrfQPHOdrdQinUrjgMt9CdzH2eUaXMQSRCPTy8z6g9C5nWoTfmH9TEKsbuhhkHD5V%2B4X1cKitt3QFCpMow9PPiywY6pgFtph2tGdqqdtO7XC%2BZWfZodhXGUmipZ%2Fcptv84qAb7LuZogbqODPuOGj0s3c7inDiEFHMWmPw21BJstuZ2h5M7PsELBBqOu1F341r1xkmu8Es%2Fksw8y1gFEycebmOdyhj8g5tECxKtjg6vIk5c5pCZbrY%2BZcpOUNUfkFS8DlbJkzgZ45NK%2Fp6LEECE%2F2RFMaz2S5RNBY1NOFn0o8dMDG%2F6NdBhIDa3&X-Amz-Signature=ba03701e9dd266ba6d05b722e7a46de6b3524e0bce3900506ea97c94e60d66f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYIDKEQC%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCd8JgBJ%2FIA4TfIzGCfcH2upiW91R1T7J7aNusPo4jLUgIgZ%2FY9qbkYUNu9OU4U9d8MNj7pOtRPNVXLSWMJzWmPfj4q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDFOHpG425PHs%2FnXHHyrcAwKKfXWaFamBtkootMxu82h4eVCQ1v%2BkZ5pcztvg3JcnSH6rlThupxPpEadDhGKWg%2FzS8GvvD64IAphYLdyT6W9OSjRGbRr2XuPOQlHuiFTwMuj%2F9b4Fk5w%2Fp9QcXR6gWsc0AIPOwR%2BCJ0pG1liHs4yypy4kR%2Fks7%2B015L6UcItK61KM2imJFnWlzLptATzbQ2SvEFXYeXUgi27%2FJjVXEfyUzvLsYcHAVvX3JHpJBWTNrXInKKD3pVgP8Xh%2B5qv74%2B0CyVeFzSfSLar17lxG5Shsvx2boNkt5sbkYUWKIbxm9LugNc%2FPELWclcrzh%2Boue5RNHYl%2FjsNn4BIyXxSDOtl9uxxIQfEKbXPyn4b5glF9Y%2BGLRfw5XTUHAu4an3WfoREyN7Ia6Dqz9OUlrrXjNKuE2NsckAMbTieQadx%2FXGlPhoWNBqLSBxAUGSrdV8R04ieX4Moogzw7FDV2KOMIMumuTsocVgK5iwnPP%2BgTJz4HEVeyK3qmDcadGfgADeFXvTt0RSApnNBhcy477g2RvLgKHyGtFXztEttXOETCzBDvFPQPJRBQFrNAYzHCBEPMzfcCDhbUduwiAM5tX%2BomktbWT58GL6C7mJDeW%2F%2BI1NHTizLffYI5SjVcb%2BCKML%2F04ssGOqUBtb6%2F1dtc3q76UgdBNhM%2FRMdNErSmB6U2d1MlqLeJo8Gtql4HFNFnwVBVtqz8z56X16BkblD0IbrJ6VpPSqmlT727z8%2BENiapjcbxhiU5hQHDXjWCKhrepbfNTi29N45va5ua7tMuAnKLh6vnGfvaViP7nHp3Px9oYpptjO3Ys3NitGGfmnaxBjVvV149SA1UQmpzI1uj5ZfHRVEYX39V2pz8WqFp&X-Amz-Signature=afc0f710311c267bd41cdc1369243226831ab60605abef8eefab6d862faab5e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X47UPEY7%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBE3MWvIbOkuTcgsp37zuQm8ciQKSOel5k7Wq%2BHDaxb%2BAiBQVFCK7xq98PWID6tNfVdRzlOmvaCMgD37s8n7i7Y1Air%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMIu4PprNRUfta9nqJKtwDchSUWyHVtIgC7QklmJjJNsBwN0rJRLyfD8ZD2MelxVoJkv00YRparXmyntplKWpz9w5NdEj0obheM3FaYDjvhdWW0zOMg6tPk64%2F5iEX57wQROJUEoazvhlP%2Beuy3YwG6gg0VLD4TSeikzx%2F4VXsJTyur7DO%2BLYvHHDVvZykq46LPcehhT3rnPu%2BQAQVnA19Jg9KsL5z8pXtRu8HDk%2FGK%2BY0xqHrrLTlHIOTVv8nit6Jd%2F%2B7vgoDGlQh3zMzq7bJdi9i%2BG1Q5TbkV%2BsMYAznd8o1K%2FPatKE53Ant5Q1M2Le9AiMby3txiwAfmtp4%2FrK70p1P08sFpcyFTASzez4ckQPVjrNoxIpS9BCm6qGhPmjtk6%2FKN%2B5Q0crt6DyDifRy5m7RCCYve%2Bv%2Fa9n6dCcic7rIGwV5itk8hEzaEi1qSKYqEzQb%2B9Vd8JV4Fr72d6jNMmPXdrgbl7JrUvN0lbOaTZ15UenWVOBT8bOweYIWqYHdGeFUPSXW%2Bk7lGup0c%2B6eO%2BFvkel%2BObovO2vcAgeBJmitNr61L1WoAIl1xTZVf0FpZb0i%2BsMqCyhlZV0szQjn6PIeS3gkjD4cPntlpn28WUkyoP4u4VJSqgHm4F7z7230FEPOIhACQAeIm10wz%2FPiywY6pgGeyi7gMYXhhb6YjY8dUcU9zEFXpJVSOQmUaZhSoOl0JbCaFz7icxvi9pnJFLn%2FVDwn%2BlHgtcd%2BMlMbqTDKWs7zxRa4O8pmFIWFS8P9iDCAQUz5SgWAVn3c5AdynEtekbzn2YwYiQwnS5rQDcmkAHKjdGgQcCRfVKvQ5ueDRWbJf6x0wP8%2BlLer%2B6GjcWNf8D%2B1ahsC7Zk6zVQ3hhhWire4gdK7QA5h&X-Amz-Signature=9e3bdad4a4a90fa0d2fd0ebe5b94683edad511c236fcc7f1bd1154648d08e7dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X47UPEY7%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBE3MWvIbOkuTcgsp37zuQm8ciQKSOel5k7Wq%2BHDaxb%2BAiBQVFCK7xq98PWID6tNfVdRzlOmvaCMgD37s8n7i7Y1Air%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMIu4PprNRUfta9nqJKtwDchSUWyHVtIgC7QklmJjJNsBwN0rJRLyfD8ZD2MelxVoJkv00YRparXmyntplKWpz9w5NdEj0obheM3FaYDjvhdWW0zOMg6tPk64%2F5iEX57wQROJUEoazvhlP%2Beuy3YwG6gg0VLD4TSeikzx%2F4VXsJTyur7DO%2BLYvHHDVvZykq46LPcehhT3rnPu%2BQAQVnA19Jg9KsL5z8pXtRu8HDk%2FGK%2BY0xqHrrLTlHIOTVv8nit6Jd%2F%2B7vgoDGlQh3zMzq7bJdi9i%2BG1Q5TbkV%2BsMYAznd8o1K%2FPatKE53Ant5Q1M2Le9AiMby3txiwAfmtp4%2FrK70p1P08sFpcyFTASzez4ckQPVjrNoxIpS9BCm6qGhPmjtk6%2FKN%2B5Q0crt6DyDifRy5m7RCCYve%2Bv%2Fa9n6dCcic7rIGwV5itk8hEzaEi1qSKYqEzQb%2B9Vd8JV4Fr72d6jNMmPXdrgbl7JrUvN0lbOaTZ15UenWVOBT8bOweYIWqYHdGeFUPSXW%2Bk7lGup0c%2B6eO%2BFvkel%2BObovO2vcAgeBJmitNr61L1WoAIl1xTZVf0FpZb0i%2BsMqCyhlZV0szQjn6PIeS3gkjD4cPntlpn28WUkyoP4u4VJSqgHm4F7z7230FEPOIhACQAeIm10wz%2FPiywY6pgGeyi7gMYXhhb6YjY8dUcU9zEFXpJVSOQmUaZhSoOl0JbCaFz7icxvi9pnJFLn%2FVDwn%2BlHgtcd%2BMlMbqTDKWs7zxRa4O8pmFIWFS8P9iDCAQUz5SgWAVn3c5AdynEtekbzn2YwYiQwnS5rQDcmkAHKjdGgQcCRfVKvQ5ueDRWbJf6x0wP8%2BlLer%2B6GjcWNf8D%2B1ahsC7Zk6zVQ3hhhWire4gdK7QA5h&X-Amz-Signature=9e3bdad4a4a90fa0d2fd0ebe5b94683edad511c236fcc7f1bd1154648d08e7dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626GA6E2Q%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T133732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWQ8TwlfO5vL1bBmYW4gxPzRrsO45VzZ%2BiFcMuYiJAYQIgR%2Bg2bwAWU4uZdB8fIzbwA%2BkifUQ4JfmAOUIeV0t4VZMq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDHjWhQBnUwKOt13x%2BCrcA9wZozvdF9oHh9Lo%2Bd14n7Y6hr9%2BWREd0mdxjoNExn3%2BfUpCcUxOQxHRJvjTivOPPwlnquRGdjRcXm50dmibkzTeHoYQyr%2FlEv063PhAJP26KU2pEImA1vmq7Gdzz5cBJxYPe5N0fP6zp00HukgaXMjwWPZkHOQl5tir0x3yz%2FgxTag%2BU%2BWlX%2F9874QaCBmNenduT1NO5u1VSyJKgV6BtjEDX3NIQcYwgwdbAzZtk1KaOj8XMVS2NKh7AqkaO6YXkjtLct1Iska2fBehKNdrKN3OSwOKHM6cvxSWmeG6FUAwOar0Ozv8x8RNo5QXzrb31s3QkPurSo%2FAZbsMWrr930cSDUTMZiR5oVpSGPNRrvYy2EYGQRCl6Di9FDBiIU1P8BR2Palvwu%2BkfhZRi%2BOIqxfDF%2B8UQwtS%2Fpcr%2F25jNDb9Q7S7%2FBxaa46jl%2B1md%2BP0vfzGGhXWqpW4346tGUrCmNx6q%2FQAKgJHXckpP5h7cb1ak07vb0DtX1ZovL1xr3UtM5DA%2BTtKcQhbCSlW4MB7TtepcDBexAEAxeVMdzeLRe5wfzhcfbn7VD5cwgXQ%2BjDMkc7bMhQJSXRstS3%2F6N1SU8Yh66tFvDW8wGl78%2FzteJK7bXclpPC%2BVnkPF1oKMI%2F04ssGOqUB2L4RChdu97%2BRXpHxXfGzTnqAnjoTJla7b0l3C2bYrQbpe2xDkRHn0EJjJplNmvbqQtKwX%2F9J5q%2BAZwPJtM0nle31nej64CP9g3rskOJWWjtHfsDdBrGM1mho0lBSlnaspAhoOPKIR1bAdCefY8fCG54eahnDseOvD5GCOZbCopP6Hqkp%2BeS4f1Lp1BFqQOXY5n%2Bhhck1oUiJG79zN9HIs%2FuYuVwt&X-Amz-Signature=4ea535751a66be3f806e786c3f358f8370a5a434c920116c643df6a5721b857e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

