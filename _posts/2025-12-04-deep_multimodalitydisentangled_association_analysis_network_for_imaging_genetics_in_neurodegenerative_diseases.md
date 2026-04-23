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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI5A64ZV%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdNAX%2FPyAYx6bFHEAUc1qBZMHfxBu%2BACUA%2B4biC5V%2FLgIgSBirRiBRZr3RuXVDaUsw51NtebrqeI7qkwMGrZNkfhMq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDAY1vXxcnjnKUWk6tCrcA1kBnWJYr06%2Bgc0a5d7sY3lwCMINN5gar8bU0LNbrOcZ0SySDvemw3T7GcYwEx%2FAqkfLCNw5ABYJU1dTl5fZUyx%2F1g%2BgTfAsE%2BtzN2Ue0YI9%2F2Czvuawo%2Fx1ucc0wvGRihq3MI1Uicik%2FrHpG%2B7eiNvMxGBsBuXVMRYv0frqBg8qmz%2BpzPLrs1%2FocJqk0ZZ39JX6RjWxYtRrZejgR338hzZ5%2FVoNndHH3CkMaUJu1C5yceJ7x%2BE3D1FEKH%2F6PQTv%2FSUYku%2BjbCZGhCowjVh5sgoXyM88Vtx18q0zsKDL3E1oL1muyEMhI556hBt7gvdU9u3USwJNi%2BqwVnPamKjsbwFdd6Y23c%2BrY%2F3OOMvJBLI6s6vcgLfnlRxdoey2lm5bhWX%2BkIeHfZUO7bPuuOH4A3IFwGI882uKuFDTtKlq5WYa4Yt2TEsbeEe8McKnNkwiFho5kCiRtZpKDvxiLROBpskQkdTIxQLm6vOtYLqrkcdZrlpcg3m%2F35PikI5a7oeFvGsCIeGXwUDVnL9n0fsdd48J33dMeufgdx%2B%2BLZ5ADW9DLztVOxh7FO%2BiG58ABOcsgr41OieHlMxiLuZ4icUluwr25Cc1pZcf10x8rCn5pGosvbad2pVsFiW%2FIaaPMLyXqs8GOqUBqCDScaa7N1P7fWQQ0mR8rYepP0aCfYrpcCx7tyiVD0V0u7jUJbS0oK0rUs8H02OyTES9bjKOm39ZQieniHO%2BcGNbGu676kjPT37oY%2Bd5c98yXj%2FlSfuo1K8OkbfhCfuBtQrl5%2Fqpb6p0XQZDyrS7wCYssNS3Icv%2Fps7Vz1zIJhvmWid1qcmO1aZU%2FCuvc3eK0B%2Fkeoph%2Bwq%2BFxcWfq3BbZ98MRa1&X-Amz-Signature=f952617743ee1d8c05c61099b86aa6c255924d1edd5882614f88677cbe5a365b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI5A64ZV%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdNAX%2FPyAYx6bFHEAUc1qBZMHfxBu%2BACUA%2B4biC5V%2FLgIgSBirRiBRZr3RuXVDaUsw51NtebrqeI7qkwMGrZNkfhMq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDAY1vXxcnjnKUWk6tCrcA1kBnWJYr06%2Bgc0a5d7sY3lwCMINN5gar8bU0LNbrOcZ0SySDvemw3T7GcYwEx%2FAqkfLCNw5ABYJU1dTl5fZUyx%2F1g%2BgTfAsE%2BtzN2Ue0YI9%2F2Czvuawo%2Fx1ucc0wvGRihq3MI1Uicik%2FrHpG%2B7eiNvMxGBsBuXVMRYv0frqBg8qmz%2BpzPLrs1%2FocJqk0ZZ39JX6RjWxYtRrZejgR338hzZ5%2FVoNndHH3CkMaUJu1C5yceJ7x%2BE3D1FEKH%2F6PQTv%2FSUYku%2BjbCZGhCowjVh5sgoXyM88Vtx18q0zsKDL3E1oL1muyEMhI556hBt7gvdU9u3USwJNi%2BqwVnPamKjsbwFdd6Y23c%2BrY%2F3OOMvJBLI6s6vcgLfnlRxdoey2lm5bhWX%2BkIeHfZUO7bPuuOH4A3IFwGI882uKuFDTtKlq5WYa4Yt2TEsbeEe8McKnNkwiFho5kCiRtZpKDvxiLROBpskQkdTIxQLm6vOtYLqrkcdZrlpcg3m%2F35PikI5a7oeFvGsCIeGXwUDVnL9n0fsdd48J33dMeufgdx%2B%2BLZ5ADW9DLztVOxh7FO%2BiG58ABOcsgr41OieHlMxiLuZ4icUluwr25Cc1pZcf10x8rCn5pGosvbad2pVsFiW%2FIaaPMLyXqs8GOqUBqCDScaa7N1P7fWQQ0mR8rYepP0aCfYrpcCx7tyiVD0V0u7jUJbS0oK0rUs8H02OyTES9bjKOm39ZQieniHO%2BcGNbGu676kjPT37oY%2Bd5c98yXj%2FlSfuo1K8OkbfhCfuBtQrl5%2Fqpb6p0XQZDyrS7wCYssNS3Icv%2Fps7Vz1zIJhvmWid1qcmO1aZU%2FCuvc3eK0B%2Fkeoph%2Bwq%2BFxcWfq3BbZ98MRa1&X-Amz-Signature=f952617743ee1d8c05c61099b86aa6c255924d1edd5882614f88677cbe5a365b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLIHHL3O%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDs70toJX1aPvaZlT%2Be09UF902BY89%2FpKm66WYwD%2FlEbAIgRxj6hBqvkqbDeGKIQeh27jsDKTBBJrChoCsVa3%2FNRSUq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDJB8gC%2BVLWSn6F9bHyrcA0%2FDAPB0Oe7VZcubGdxnP5vST1XHZbc6VSahEY7SR1u9KdL6SpaRYRZFKMSjp8kyjWMsIF5iVMWh%2FfTwP%2FJJpvlfylZrXM921fQgnRgBNXD%2F0zEscYugR1mcv0%2FB%2Bxdwr3WAB302AGbM6UV1h1CTJbg7qZTZdIJobnWpGkMq4lCKLCPF3smmtvibFIPh9INW3EFCyeL8E3tvkhdpSGjAxkGBRcavrPyFX1qnFJGpzJUwRIwTKE3c%2Bxk2NF8C8kttf5auNWu4Uc2sBCx1EhncXCc1LK%2FICd0h%2BWbFIZ0DP6RnJnq8Zyt%2FabkuQP%2F2bApVs7ZmXhpVPHHlBFvoMn3YzgZ7yKXtORXHzPaMNh%2B%2BZz7xUU%2F8IM8MK%2Fwt5wkVZn22mniD5c3WM0TQRhfghJalw4EGUUcOhVD7gDmC%2FgVkpXgA9s5A3J7W34LRmCcqAT2v2fk1nvvPiNgzsTEROroRFmjbiDK2ijlRTBT2BsMptXGRhQiCS9VYZ%2BrlPSjAiiO%2F0kD%2FoNLWj7sqh2rWzHp3USAdKFBWb8ClsL7r%2F57aLqNzap7flV6RtnBinUNUSaLjjKX7DuC%2BUY88Iwk2G9IGehV0dNG%2F6NaecvZhQzkfJ2tZ%2BYJ7Dgv3izkDWGOYMPaWqs8GOqUBZgmKvMqTWUF3FefRZyKfttzMpsvA9MPXB4unLJYTvFbRPMMN3EqQobBZhEYM%2BRobOu6jvX2WpWlaLJ9FyjWJZZv3NZ5Qul2I3UqA0M0n0aiZ7KjizoiP%2FEY5eBJTGdE0XA7YgXT%2BSamnB53ZsJEtCZ4L3bqNLR9rrCi4xMYnXRmACTNyHQd4do%2Ba36nJt3iOTRPYD%2BCsAa3VyGfhvlG6pGHqHlOj&X-Amz-Signature=749c354d537e90ff55c9ea51b0fa907427aaafb68326461503884fbb51af921c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TM5XKJ23%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCK8mO7pOi48MZHYCoqarX6omilDpaNXMq9JrPWUzB4TwIgJtxqasNBD049lXgWnXSdWciHHy00%2BI3L7GHIuPd7r3Eq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDMKYhOmw%2FilnGc6FnyrcA2MgVizv1GF8PbXy2aKA6hXaA3XFAjO0mgRNjhTYyqEKiugpfpGTpZ%2FzjtNO7ZPd706Qc3flaMnQ%2FV1RRZP%2F2jrhl3fTHZ1jlytCAhVhoZROyrO3383HXuDjT1WoMbl2bxcciKEnHqDyNPIYu6n5TM%2B%2F3DC1ETV0eJWLesofHkB4Zpon%2F5keluEkWN%2BHdUY%2FLHVqWoRVWLJhOGzY3RRVEQpPiog6XTrN9Y7YPSFM0szYqT6PdnmIrs6RdUk6yOpHprlfSdI7QJeufNUWasOSxlknSRH8GrMnfojkjSGvNq1s6bS%2Bmv7CEiNbwH2sADuCOitKiJrs2np7JcVyvt%2BcRngBe2YQNvO4IeLiSLvRcYDt%2BAoQmNO5GUcbzGqXSzmueAuCHy03vgfMbTA%2BgLGJ%2BNWrhzFr2JP7o63fOmF8k6j8hqW4dsadADgLRNWV%2B4w7OIf17WaUmQ0hbZ848CSBkzIS7k1jD0Ex1TcncXJJ0NyrJLs2RMz1%2F9QnDuoKOwAlmMYqxmOmui%2B4jmLLsdgN4GB8t%2BHsYfUatrA%2BJAQfPbRJk23KfVhziH6ypfcjodsJoff%2BuRicNyns7yCM%2B9vht5SL0SSIxP9FFIRKz5BBmtCksGiRZVQ%2Fq5iwqiLfMIGXqs8GOqUB27MM4zFTp%2BuoDE%2FfiGTsInoPcN9WzSAlOAN8rPTOkBPdo2sLVYlEWVfPb2EzNBPm7BpUiiFBRzJCNBnNpK4vHxooBqPPHxPukwuEtD%2B7wdlCvVeSAInFeFKMoW33qltDcT%2B%2BqaH8fBdUvYwBtPAQLZodhanBR6mA0sKEY%2FMeEe%2FmNe3rS%2Fh6HwczYCLss3p4RIbqlrxL69ZCWZeAPFT70MOFpAws&X-Amz-Signature=78dcdab88fd1753217e7c5bc4c26e2b2a44cc851e9cceaef1743b9e2817c28eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TM5XKJ23%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCK8mO7pOi48MZHYCoqarX6omilDpaNXMq9JrPWUzB4TwIgJtxqasNBD049lXgWnXSdWciHHy00%2BI3L7GHIuPd7r3Eq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDMKYhOmw%2FilnGc6FnyrcA2MgVizv1GF8PbXy2aKA6hXaA3XFAjO0mgRNjhTYyqEKiugpfpGTpZ%2FzjtNO7ZPd706Qc3flaMnQ%2FV1RRZP%2F2jrhl3fTHZ1jlytCAhVhoZROyrO3383HXuDjT1WoMbl2bxcciKEnHqDyNPIYu6n5TM%2B%2F3DC1ETV0eJWLesofHkB4Zpon%2F5keluEkWN%2BHdUY%2FLHVqWoRVWLJhOGzY3RRVEQpPiog6XTrN9Y7YPSFM0szYqT6PdnmIrs6RdUk6yOpHprlfSdI7QJeufNUWasOSxlknSRH8GrMnfojkjSGvNq1s6bS%2Bmv7CEiNbwH2sADuCOitKiJrs2np7JcVyvt%2BcRngBe2YQNvO4IeLiSLvRcYDt%2BAoQmNO5GUcbzGqXSzmueAuCHy03vgfMbTA%2BgLGJ%2BNWrhzFr2JP7o63fOmF8k6j8hqW4dsadADgLRNWV%2B4w7OIf17WaUmQ0hbZ848CSBkzIS7k1jD0Ex1TcncXJJ0NyrJLs2RMz1%2F9QnDuoKOwAlmMYqxmOmui%2B4jmLLsdgN4GB8t%2BHsYfUatrA%2BJAQfPbRJk23KfVhziH6ypfcjodsJoff%2BuRicNyns7yCM%2B9vht5SL0SSIxP9FFIRKz5BBmtCksGiRZVQ%2Fq5iwqiLfMIGXqs8GOqUB27MM4zFTp%2BuoDE%2FfiGTsInoPcN9WzSAlOAN8rPTOkBPdo2sLVYlEWVfPb2EzNBPm7BpUiiFBRzJCNBnNpK4vHxooBqPPHxPukwuEtD%2B7wdlCvVeSAInFeFKMoW33qltDcT%2B%2BqaH8fBdUvYwBtPAQLZodhanBR6mA0sKEY%2FMeEe%2FmNe3rS%2Fh6HwczYCLss3p4RIbqlrxL69ZCWZeAPFT70MOFpAws&X-Amz-Signature=0280c92450af318e5524d36f29a87c824ee69a4e6680d710a30579595cb88c02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLIHHL3O%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDs70toJX1aPvaZlT%2Be09UF902BY89%2FpKm66WYwD%2FlEbAIgRxj6hBqvkqbDeGKIQeh27jsDKTBBJrChoCsVa3%2FNRSUq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDJB8gC%2BVLWSn6F9bHyrcA0%2FDAPB0Oe7VZcubGdxnP5vST1XHZbc6VSahEY7SR1u9KdL6SpaRYRZFKMSjp8kyjWMsIF5iVMWh%2FfTwP%2FJJpvlfylZrXM921fQgnRgBNXD%2F0zEscYugR1mcv0%2FB%2Bxdwr3WAB302AGbM6UV1h1CTJbg7qZTZdIJobnWpGkMq4lCKLCPF3smmtvibFIPh9INW3EFCyeL8E3tvkhdpSGjAxkGBRcavrPyFX1qnFJGpzJUwRIwTKE3c%2Bxk2NF8C8kttf5auNWu4Uc2sBCx1EhncXCc1LK%2FICd0h%2BWbFIZ0DP6RnJnq8Zyt%2FabkuQP%2F2bApVs7ZmXhpVPHHlBFvoMn3YzgZ7yKXtORXHzPaMNh%2B%2BZz7xUU%2F8IM8MK%2Fwt5wkVZn22mniD5c3WM0TQRhfghJalw4EGUUcOhVD7gDmC%2FgVkpXgA9s5A3J7W34LRmCcqAT2v2fk1nvvPiNgzsTEROroRFmjbiDK2ijlRTBT2BsMptXGRhQiCS9VYZ%2BrlPSjAiiO%2F0kD%2FoNLWj7sqh2rWzHp3USAdKFBWb8ClsL7r%2F57aLqNzap7flV6RtnBinUNUSaLjjKX7DuC%2BUY88Iwk2G9IGehV0dNG%2F6NaecvZhQzkfJ2tZ%2BYJ7Dgv3izkDWGOYMPaWqs8GOqUBZgmKvMqTWUF3FefRZyKfttzMpsvA9MPXB4unLJYTvFbRPMMN3EqQobBZhEYM%2BRobOu6jvX2WpWlaLJ9FyjWJZZv3NZ5Qul2I3UqA0M0n0aiZ7KjizoiP%2FEY5eBJTGdE0XA7YgXT%2BSamnB53ZsJEtCZ4L3bqNLR9rrCi4xMYnXRmACTNyHQd4do%2Ba36nJt3iOTRPYD%2BCsAa3VyGfhvlG6pGHqHlOj&X-Amz-Signature=a09f033bb8802c8b3f18dea19499f0631ef6d486cff6a703641ae7239d835fb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6OPQIN5%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDlWWZBE%2Bt2vkOQ5eWaZqGkMwwdD1iz8vY1ZikSpBwh%2FwIgZMoLZVS5gLYlmSdajtF3dmLgbTcBcU3JjvhaJis4hbsq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDBNGp7NZEd9UrBL6FircA%2FBQPS%2F5TTU%2BLlI01VWJr5leYvpONHIRmzWNyPea2yDaf%2FFcRSQ9C2C9qTNLYC97kj1HJV7k3RcplOJIqe9b9%2BQw%2B0xPvSD6WE6KhH6%2Bm2HgS2QAHYtAPxomZkM4URbPnUpunIFWh6We9KNyLeP%2FDRqge1FXWHtFPwj28iD1S4xFSy2%2F4n8pR9WCy2hjrByukpQGxMCtA8XmzdWew0zu9PjDGLthD%2FbMUmRhNAA7sEhQhC7loX6Z8%2Beg87AMTBRTZ%2F7KSIRFIq7dUKX5A2PnnyYKy%2FGEnCfDSBU383cCNXuHMQsVxXYRPL6VfI2B312PjoYrySA9WDnt04Wo6tzPEUJPoHD2JMSmzoz5MQIoVZF3zwzZBKrtN%2BqMNcXBl5mcMl7tYnLj8SLVFv%2BP07va7Ks2ILLzDf0d0QpL80BZ3lee6pHK3ufRZ51zQWZf%2BluwzTdKK0yMtuzrJ6K6tw5bq%2BBfyZH0T3yARcH9iRlHZGg4I8TX4e2f8gLGE1N9GSTnSEqr2wZK84ZeaDyE%2F%2Bm6CjmFgSuFSFiK%2BKi62gyvnRuNapyGZOB8vFqmpppWhEZ%2Bv%2FilnJd1iVGJ197flzimFCNBVb9mTm38S04MPNaMH0ey9W6TEeMXXIZV1R%2FDMOeXqs8GOqUBWB5dmGh%2BWf%2BIfRXU8%2FdIKNiegSLYwk11I03HXDegOHsOfgotByOwkJAdpqauhPG2M67i%2Bg5X57tB0pn%2BIo%2FYrhladl7HaTKGP2WfwqceYd%2Fkm7cgg74nTQE3loSEFSwpblec21biuxhRjMuCAvA5ZZ23rvChE1N9R7mmo4RZ0p4f74RX6PWu8NzQglJfrr%2Frm5ftWzn%2FpXNqXIeJ04RVRuCDiwTo&X-Amz-Signature=8724a9a5658e23c7eb51cb48c6df89030c12d290a939cbbb2fbcca94cf690fdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675W7GVBU%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213402Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDnD%2FT%2FPTBx8%2B0hQReFSdfWgqUm04blSdoy%2BocIKfVRlgIhANkPrgKDpt8eH5%2FjdSfQdCArLv%2F80WjKz%2F1ZAES%2FBB4HKv8DCG4QABoMNjM3NDIzMTgzODA1IgxFfdPQz09QRAQdWS8q3AOv0VkvQgJQ740IbyuYKJ4IRW8tZKwnzpHv4%2FqB7pcm6bvw%2BkMQTTtFNPOjbmjo5gT5qEJCO6ZQUeG8DjU1H5lZ0DJkOWKjj9VJwFPWEkaKOJBw%2BCRBaaGpN4plq7P2hnhP%2B6BnxDFiygbKjshcIZRs6Px7CJMnWPq7S6KUnxLznOL8YybcesPVKUNl%2FON3f%2FG1cO%2Bi8SQutQyiLOwLZCozbRKdBBBGpxYSm41Sjv4veb5KDKzXpRc4xpIVKUchk8Yo065iJW5TQ3PMAvTVwnysQUUbq9FdW%2BjU%2FDaBar1DCcCkY8jg6kCk7mlADgESc%2FiNzZfiqW4UbTbdFjExBxvS0nHVdX5mmOQH3MtJE%2BBD7UkRVXEkBKmzuLsi9EvODuwdOku3gLxJNDb6v7aRt7k3yW%2FoCxn7XfVk13uchwalc0MYysi7WZAzcnCJrvTrcsNn2VBN551T5WPf5KsVZv2HN4j7FHdgNdUmEFrrLMgcLMT%2B6leAQI8A48ddPkUyaI1CyIAcNxyEzhpwqUB2GGX7d1ZvZiKEAsYoLCnUGOxqC9WN6vXCenDJQgJJBKXy0JCqKeTSBykAZW50efp5KPccCyTI%2FARkz0EDIdawkzvNynsMmfdtWcqYys4fPjCrlarPBjqkATEjcc9097l5OVomycztWtbZt4VPKMVYL5F8y06jzlRhcNpojn2Wb210B4%2BESgsOSnBOQ%2F%2FRcK1If2IVAdNqMk3IMWez2NCU%2BeZzh%2FwaBEhuiU%2BPUKDjhr%2FIbKB2qRdYRCk3bKBzVMBaXGWrxUsS1fsjwJ1xbAvUT26oSQzhffqR%2BUzKSjUOPlXdxVM3S47g75364bcS0rUcASHrsH4Iaf85ezB4&X-Amz-Signature=35daefba64381a4eb3526feccab8e17e431ddb37464151e86b0dcc9a056dd82a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGTHKXQX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIErvlzSAZKxqLqpckKFePxZDL99vpl%2BLEEuOXXmZAO91AiEA6w4CWqaN5Qt1%2B3e5WaNDGJQdfxCowMQ9S5WJe%2Fkn2Xsq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDBaKHLcFb%2FAYjIBnJCrcA89cSuBVIh7wPhzw5vvALV74%2BeW%2Fak8fU9vMt3tFscg8SPm6GymHnhZiZVAYIYPZS9X2lKf%2F%2BZI0EXdZwAeeyK%2BqRZ25Dp6mjwZ2OrGWyPyZThThlgLX9S8wtk9A4IKEDI2Zm8umcgpqYzTzTbGNu1UQbz1dsdYV03UbYdnp4Z9Z%2FvQorBDVA9rZ6Jj38VrmhDsqh7tW1hGBQKAe73BX7gP5yadPR7vkA%2F0c5XayJ%2FHP8zlfwZ6xi8otE3xjjBdpv1xsfkAsTwdg4tAPkszCs%2BvsJCsH0m6frv%2FkS4n6fSPBW3evhhUOpaik9L9EkRlRgC3GtPiEliVguB3PaTsAa3QLtnkmqceIz1pWmBNNWE3D96586YFDvOz0DzhYqdYmkygFRbQm9iNU442xps9X4i86yUKsTKpQySRK%2FrLVmC7M%2Fuw3qpe6xAcf9gt0F2mYh5Loxz%2FpQE2za4lufQujqxRFVTT%2B0pfWUBBGW5rBvq4ibWSHrSE1f0MF4GFUXauzcWBHeASeUWu029mkbsPYZZc9hpff0e97VYsCIdrh88iWFFr0CbI5Kz%2BlOg8giHhJldtqKhGxMQTnL%2BIutXt1Tn58P1sVDHP93PKOUa1bSQVgu3%2BNnALnXdA80a4FMOKWqs8GOqUBdzeC4EBdQjMrOQi0%2FEvG94G%2Fjm00CSdIktpHo%2BcEnWtbuawVpy9Hd5ii%2BeuRik0Nvyt4rs%2BL%2BXMTQjPkY8xiygxGAV5A5Jpq4fxGQ%2Bdx4AdCi2EszAajuBOw8CGHoXCr2gV2rTZ2Qz3ex98EGbIh6toFEtTiNS56gxVfmUpM8B9BKNW94vzATmvV8EJMuHJ0iXDLeLbwdhaNGqJkbKKCN%2FbyOJA8&X-Amz-Signature=904a8a4c6bda9c24ec81cae6504903b94739caaee1aed8670508444ebbe9a7e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGTHKXQX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIErvlzSAZKxqLqpckKFePxZDL99vpl%2BLEEuOXXmZAO91AiEA6w4CWqaN5Qt1%2B3e5WaNDGJQdfxCowMQ9S5WJe%2Fkn2Xsq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDBaKHLcFb%2FAYjIBnJCrcA89cSuBVIh7wPhzw5vvALV74%2BeW%2Fak8fU9vMt3tFscg8SPm6GymHnhZiZVAYIYPZS9X2lKf%2F%2BZI0EXdZwAeeyK%2BqRZ25Dp6mjwZ2OrGWyPyZThThlgLX9S8wtk9A4IKEDI2Zm8umcgpqYzTzTbGNu1UQbz1dsdYV03UbYdnp4Z9Z%2FvQorBDVA9rZ6Jj38VrmhDsqh7tW1hGBQKAe73BX7gP5yadPR7vkA%2F0c5XayJ%2FHP8zlfwZ6xi8otE3xjjBdpv1xsfkAsTwdg4tAPkszCs%2BvsJCsH0m6frv%2FkS4n6fSPBW3evhhUOpaik9L9EkRlRgC3GtPiEliVguB3PaTsAa3QLtnkmqceIz1pWmBNNWE3D96586YFDvOz0DzhYqdYmkygFRbQm9iNU442xps9X4i86yUKsTKpQySRK%2FrLVmC7M%2Fuw3qpe6xAcf9gt0F2mYh5Loxz%2FpQE2za4lufQujqxRFVTT%2B0pfWUBBGW5rBvq4ibWSHrSE1f0MF4GFUXauzcWBHeASeUWu029mkbsPYZZc9hpff0e97VYsCIdrh88iWFFr0CbI5Kz%2BlOg8giHhJldtqKhGxMQTnL%2BIutXt1Tn58P1sVDHP93PKOUa1bSQVgu3%2BNnALnXdA80a4FMOKWqs8GOqUBdzeC4EBdQjMrOQi0%2FEvG94G%2Fjm00CSdIktpHo%2BcEnWtbuawVpy9Hd5ii%2BeuRik0Nvyt4rs%2BL%2BXMTQjPkY8xiygxGAV5A5Jpq4fxGQ%2Bdx4AdCi2EszAajuBOw8CGHoXCr2gV2rTZ2Qz3ex98EGbIh6toFEtTiNS56gxVfmUpM8B9BKNW94vzATmvV8EJMuHJ0iXDLeLbwdhaNGqJkbKKCN%2FbyOJA8&X-Amz-Signature=4fac8cfcc339e4737c816a8fecf28f39d07d6fa8b67865ea76301874768f3b7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LBO4YTR%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDN9wdIkXYprZ%2B04byx9kWGSg0tqklMUG3jf5OUoq%2FXLwIhAPD4Dl1gqmmcb8wnR0KeLPWDWLDF1LQtVvKHnwyLPgqAKv8DCG4QABoMNjM3NDIzMTgzODA1Igx1OuSeKyOfR%2FIX8NEq3AP2ggsxVhMCf2W8I0VYzP6Wv1PKtues2Eea96mWv4Wt%2FbTXI7ACmIg5yKUKrefxFrZIHjMYkcjSlUKFlr5Ye0PE1UwkRY277YOMgLGJXWIx4wDAbwc3O1ANh3qEfoUROw5T3skxL%2BLoZQ%2FRNp2riUT20FoMOSWMrBY67ONcD8QbWcXkemt1eBl6i9uOV2xpZanJ6Q1q0DJT4FFeIHocBBXtJUbP7mREYuuP7wyQup9tukrvhKa1FXJajCGd0bbVGi6edj45bwO7ymjKIrOSF1YIibG1GSo1k1s5RphgHNoDgYNW1eIaf6mlzdApJkjAT0S6lFcV5GJbtmdiferjU9DqijipIa5DWvCr6o0egztFsgRfd%2F1UCprSWzfWhjJXJIrOgqxZgQMchMW8FOxtuGKJu2%2BGcMSdtR5iPgscnUKmECeYBhQ24E3AU5Hx%2B%2BPy6LPaea8R%2FMQeJXM%2F6u4Wz6u0Da8mpWCkDwdXzAbj97IqW4V2uib%2FLsguv6USxnZhxVggbEmrSC1iHpAOsIjTszuB1Vzw7KgwWbIjqFcx9K9uEF6hKK2lmEZkc0vcPHkvQkH%2BMR3Nq9%2BkIiHymBHO3G%2FXjXH13MEunr0S%2BE2ZMWD8KGu6dO8CPdAEer1%2FPzCQlqrPBjqkAUlNk3wC5ovoos6tUbKVK2tSrttMmdsNyeTMx4W%2B9l16dtMzHFSLxs%2B1nRAV1zo%2Fp3vnxWA8RTQ7gpRP62JtGzWhpNAcuD2OY3r4bZAYryc1bVVhPUPdPnukGWBUeo8ABlr8Fj8qnpstvUcamA%2BPGF2DJGcEICzIlFa5zceS5D4u5q1cnaEECUFmdzp66WSoYL9BoRBqr6eQDLhLlTOoGq7OZP2q&X-Amz-Signature=29a412126efbb485c6da9d20af19eef6a00d7d3305d61814413971f1b67af1bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRUI4NQT%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAywhlPloI7G9QhOjqZ5iDyr%2Fpprqu9B4NTFqhAt7XRwIgKXbZBHdB1JITuMNq%2B%2BZAoxsqT1XMz0ofCAmQerRu5GMq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDEkPWXhyYw5gB%2F4gtircAyF4Y9NM4F4YR%2FxMbg2WcwcqRQeedvxYaxNEkNC9qzsT5TYzshRv1LkPadCziYnoGRwXY%2Fd71gbeLdCUN4n2JPiR0TH7u%2BDwoxd2%2Bbx%2FwDXhpLcY1yFRkmRuH4YZULviSTSiHEfL0zsT7rFoW00Aji0gx%2Foe8c9tuxxW4BMfQYzf5G1CzEl0O4ELgqFTIHEOy0rgmo8Mck%2Fn0WCJ9iT8W6BDeXx9Yd8e6MItWElMI2rXcIARxiEhtjoV0E0xt4MaAtZsSDT29QXXIc1wcWoixcsxtO7xm1buhLUCQKZI8VBZwZLQCuPsxDIgcgJMoD15mAvlg8aA08g17hRblsoEfNoaGqMIxq6erq9woSxEfwGfOnzU%2BxG2F3d4PIa%2BmWY1geKA%2FYzmUKFKVwmut8Fn0HH8zn2kDJofMpgT4R7FdxYTsX2HbeomvXASg3H6ZHQj92mJXVpZMkfmBqSWj9pRd0JwMy4IWo3jBJz1F8Z0f3QjQJSkOUttSp4Pcyja6ZRe1Xb1EQNjWtHuM%2FGG%2BWr124hD7QDutm5NIdwG92QLcEYPze3HgdQP83a7bHJfBk7g75HRwSAhkrC14%2Fhsqa8FuRwTnDqWVcCsYlTIM35mPqSnhquS3ta7gWPHK0yqML%2BYqs8GOqUBBTrMhuLN0NKbkOHZVZ%2FonKUPw3joR3hmRxG8rHDb0UDal8dfCCzB0CJUo%2FAPcDm2qCaNsc6or9IlwG7PFFAc730PHDkP7b2suOYQj4vRrLTqKfoe0CvTqgBk7fEHmXQOQo72Y7MHLBzrcYSB0PYHxa8GFHybEqe3%2FNsRMWN1wCAdguIaGuya%2Fq3o11kjdSE7VftJzEJ0DWNW10aR9BZAoWeLmQLk&X-Amz-Signature=e416b2a95184fc68383aa08e62523e16222e60396e3dfff0f6d325e4bd61fb25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRUI4NQT%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAywhlPloI7G9QhOjqZ5iDyr%2Fpprqu9B4NTFqhAt7XRwIgKXbZBHdB1JITuMNq%2B%2BZAoxsqT1XMz0ofCAmQerRu5GMq%2FwMIbhAAGgw2Mzc0MjMxODM4MDUiDEkPWXhyYw5gB%2F4gtircAyF4Y9NM4F4YR%2FxMbg2WcwcqRQeedvxYaxNEkNC9qzsT5TYzshRv1LkPadCziYnoGRwXY%2Fd71gbeLdCUN4n2JPiR0TH7u%2BDwoxd2%2Bbx%2FwDXhpLcY1yFRkmRuH4YZULviSTSiHEfL0zsT7rFoW00Aji0gx%2Foe8c9tuxxW4BMfQYzf5G1CzEl0O4ELgqFTIHEOy0rgmo8Mck%2Fn0WCJ9iT8W6BDeXx9Yd8e6MItWElMI2rXcIARxiEhtjoV0E0xt4MaAtZsSDT29QXXIc1wcWoixcsxtO7xm1buhLUCQKZI8VBZwZLQCuPsxDIgcgJMoD15mAvlg8aA08g17hRblsoEfNoaGqMIxq6erq9woSxEfwGfOnzU%2BxG2F3d4PIa%2BmWY1geKA%2FYzmUKFKVwmut8Fn0HH8zn2kDJofMpgT4R7FdxYTsX2HbeomvXASg3H6ZHQj92mJXVpZMkfmBqSWj9pRd0JwMy4IWo3jBJz1F8Z0f3QjQJSkOUttSp4Pcyja6ZRe1Xb1EQNjWtHuM%2FGG%2BWr124hD7QDutm5NIdwG92QLcEYPze3HgdQP83a7bHJfBk7g75HRwSAhkrC14%2Fhsqa8FuRwTnDqWVcCsYlTIM35mPqSnhquS3ta7gWPHK0yqML%2BYqs8GOqUBBTrMhuLN0NKbkOHZVZ%2FonKUPw3joR3hmRxG8rHDb0UDal8dfCCzB0CJUo%2FAPcDm2qCaNsc6or9IlwG7PFFAc730PHDkP7b2suOYQj4vRrLTqKfoe0CvTqgBk7fEHmXQOQo72Y7MHLBzrcYSB0PYHxa8GFHybEqe3%2FNsRMWN1wCAdguIaGuya%2Fq3o11kjdSE7VftJzEJ0DWNW10aR9BZAoWeLmQLk&X-Amz-Signature=e416b2a95184fc68383aa08e62523e16222e60396e3dfff0f6d325e4bd61fb25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SY2FXL3D%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T213407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG9I7LBPb4EMQRfCouffeRJMGlzEskY4e9AR8qVkFlt5AiBvTPJGXxN%2BYfUTxleAOed7FqzM1CIKfaRZwBS7iax17Cr%2FAwhuEAAaDDYzNzQyMzE4MzgwNSIM77EMHCOEppipuR48KtwDach7RFtKlDkuPw%2BhvVFJ5LtENGHvDDZaoSCFkDGZqcMWtN%2BtsRBWSAHF1ngtu%2Bz8bJi0F6%2FAKQqbtFnenirPZt7YEGc871e%2FiXnsOIydETtwXS89QwdD1jWy%2FgW74YoWDVZPmYdQyTPD2jf3VmyYoz9qDGFy1hJYmg5gWfXFgmdxibnKHa6ew8dM5IqcSifhP2BLcIG2a%2BTyE2PS0xToxQZBIR1%2BBgK7RnNGVoTLlkxyK5K2sPzLPMbnEQTx%2BN6m9xt9dajgHFiGExqpst43q72062HYPSrvRY3WeO%2BDNeXvZszoKT3jrwsZQRwYTMVHakddQV3o%2BuyEvYo9EEkmUQjWJYdA5JmJcmSgU5ZouU%2Bsle0SZsN6Nzp3Xv5ScmXiegGufR%2BieyUFbYshJnMIKoCPLe9WNcYGKOW5MFNqhDwF7k6p3ZZ7zwLLz5JFoNXiDfGVdUDJsG65xnYXhAtdmvIexRgf8lQEyhnDktVcSO3%2FH0viKOtla0Pm06gbQwMJsmi9HEJlpI77qyhwFm8XA6df9ifENWuS5vbcTMj3N3uryfA3BcXTj7RS5k3TTpHhcVk4QgszxyF2kHfEYAgb%2BhB%2FuXduhyUWChm2Gy5wadWyfMj68OOXq7uQltkwhpeqzwY6pgHbUGnAMajKumOzuss1fWHzZeJy1l3fdVjSXJ9mBgqYOHdoidMoKGs9fRTbWsg3CNCGeM7CW00xCIBJBBs8BnjBytWxyEZBy0wmfDYutmkJZ3M%2FExOso7jtuC%2FuMcdMNm9KZjdq%2FKkMzK9CNmKLyESWT5Xjqewy9cEp%2F9PDek5EFqS0kLKFBJlV6OmSQHNUpl%2F3uv16issUua47lXoctFHtWqiNoXbf&X-Amz-Signature=8f5e6badaceee5c65a9f877be23ad422173a7bfce6da3048b261a22add762668&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

