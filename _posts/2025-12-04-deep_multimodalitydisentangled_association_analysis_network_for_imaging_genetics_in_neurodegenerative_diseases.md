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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVLY2HOM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGniWS6OH46pneO751zMwzQAvJkzjp%2FrcmLFiqXLz4hvAiEA5uLBAC%2BEI30PJ5nslk0dCU8NgOmfDFKmmXjQfLKiMz0q%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDFDpVSfu8KemoLK0cyrcAxmLRTyktIkI8WmLyQry%2FKCjaX8Ho6NAnanewVXsTTruDmTvFjXNZmRTIiUEfHR2enDEZRKMTByvAhFJiCj5Y9%2Fz5nL2ITpDNNahlACm87234zya9ZLczAN8DHF7B2uDxMnOYbtWX3oCCLvz7R0yl2KtCPyn%2FzLbafcMETLCxdD59lJuTxP0egM4pMzkShHt8e4c%2FkaeNKbye%2F7ZaTUA6HzODyk857NtzuFdIESoXlb3NvbYAH%2F4aLvw85HEH3y2Ft1nPo%2FgPEUgvM89iT6EvawxDwtyxBgiHXxjXGmoB4FW0Bzo%2F24YKCRJIE3IMyZgL5j%2FlhaZxn1N4jth7LDiD6NAaqcpiZtCIvix%2FmPHpBzsRHl4u3EF0o9LTuUpm0uMN%2FWoLn97QIb4CkcbDJmh3xMW3uj%2FCsOiqk3%2FONruK0eY8LBQkYbqnmuOiQGgL09j13CYwNRMoUfWTujJjXZ4GCVzbENUPBzVdUXyuqBvOZCPfmxIFWRDXcXWkvtRYtZY1EoxrLqXTUn75hpBlDjZmhcoMnYfoYTyCqItItQlQZVXPqD7hwnqNng671LgVyZWJy9P9xMW%2FTXwfmD%2Bf0QovU695KZEEZ%2FF5MLrUmhrb0u9G%2FPmaK%2FDZ0OgYhwNMIzkis0GOqUBrAI1JPbSCBnRunfQXAwfVg2la2EGJ9GZN3YCjui5na9UPlH%2B0rbDHb32OEOLQHU8uI4Y5fDW8gpaLUukxwNTv2hE6yzNmTKC2GUyiAUzrw3xfDkBmezv2vEUj4ykgaJAbEgE3GwK%2B9UHNImBSh%2F7SeTbWXR4e8N4zcL9%2F505HrfHf2SvmI0lAAe2vEWC3ukqKYVrSwQmiUX7YByfG0wixdwO1f3d&X-Amz-Signature=314bf07e946ed2d1b87b9b6b24f043caf7d37c1fde4213f7bbbbfd8e2f76bdaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVLY2HOM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGniWS6OH46pneO751zMwzQAvJkzjp%2FrcmLFiqXLz4hvAiEA5uLBAC%2BEI30PJ5nslk0dCU8NgOmfDFKmmXjQfLKiMz0q%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDFDpVSfu8KemoLK0cyrcAxmLRTyktIkI8WmLyQry%2FKCjaX8Ho6NAnanewVXsTTruDmTvFjXNZmRTIiUEfHR2enDEZRKMTByvAhFJiCj5Y9%2Fz5nL2ITpDNNahlACm87234zya9ZLczAN8DHF7B2uDxMnOYbtWX3oCCLvz7R0yl2KtCPyn%2FzLbafcMETLCxdD59lJuTxP0egM4pMzkShHt8e4c%2FkaeNKbye%2F7ZaTUA6HzODyk857NtzuFdIESoXlb3NvbYAH%2F4aLvw85HEH3y2Ft1nPo%2FgPEUgvM89iT6EvawxDwtyxBgiHXxjXGmoB4FW0Bzo%2F24YKCRJIE3IMyZgL5j%2FlhaZxn1N4jth7LDiD6NAaqcpiZtCIvix%2FmPHpBzsRHl4u3EF0o9LTuUpm0uMN%2FWoLn97QIb4CkcbDJmh3xMW3uj%2FCsOiqk3%2FONruK0eY8LBQkYbqnmuOiQGgL09j13CYwNRMoUfWTujJjXZ4GCVzbENUPBzVdUXyuqBvOZCPfmxIFWRDXcXWkvtRYtZY1EoxrLqXTUn75hpBlDjZmhcoMnYfoYTyCqItItQlQZVXPqD7hwnqNng671LgVyZWJy9P9xMW%2FTXwfmD%2Bf0QovU695KZEEZ%2FF5MLrUmhrb0u9G%2FPmaK%2FDZ0OgYhwNMIzkis0GOqUBrAI1JPbSCBnRunfQXAwfVg2la2EGJ9GZN3YCjui5na9UPlH%2B0rbDHb32OEOLQHU8uI4Y5fDW8gpaLUukxwNTv2hE6yzNmTKC2GUyiAUzrw3xfDkBmezv2vEUj4ykgaJAbEgE3GwK%2B9UHNImBSh%2F7SeTbWXR4e8N4zcL9%2F505HrfHf2SvmI0lAAe2vEWC3ukqKYVrSwQmiUX7YByfG0wixdwO1f3d&X-Amz-Signature=314bf07e946ed2d1b87b9b6b24f043caf7d37c1fde4213f7bbbbfd8e2f76bdaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5KPHQYG%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIALGlIkzzGbIp16aIMjEnEQyLlKQ%2BkbjU5nCgpeu4U6WAiBoU08TOEzOSIQiJv1JNAXvYFLSAU9SGarXq85EdEb6aCr%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMjrUn32v53I2VBeWkKtwDaQjw97gI67SbiPwGO4dQgmKoDcX3S8InuJ4V7fo0h5WgrMOmgc3MuhOEXb%2BFFIdZBOWIMqE%2FkSjObPjTZi%2FHnsWaJcCc6UBoms3vma8uUM%2BHmUhXDt6VDBRIMI7HzEK5wZYBjjwIjncovwbX%2BjrFixH630ofAf15YbjzvbqkpnFwyWT6iZKWNjxLJAtEUygYPvtCc6pxgIRYOR3zxEbTmg%2Ffhy%2FU8F9JLlmgNd1cXVXYI4ODoQBqvlKmGyqJyjpehh%2FN0zBDUi1nAjscqAFqeA0H8HiznLRm58UajgYJfjY6kTRycdkt6M5K9Pz4Fv4NbM0jJeis2nkoy8cB4iqRrjZJuozxXVzvT3nxF%2FhUuPlo1EWgNSuKK8Ugx3u6YBI7bkpN6T038JKiFh6bVDArttksHfXVAHkaqKIijl5K73mqHk3MIUCNPNBIwweRQgc%2FWTsErgdxCxlpOj9TL4gARcKSd0UbbA0iRO%2BmR8VYmUpeFiffF2LZCReuTRQyzHh9NfqFg%2FSgOMVVztOZ0ODygBIWVhFAS1JjBz1l%2BPm5I3Qhg%2B21W8hbYeNxDp89H%2FPxQS2MmnS7u6fI4VYgmRi5p9Ap3hrhtCUQs4ACZF%2B3gtvb22%2BOxjhyCMGBj4AwsrOLzQY6pgGAU%2BzoU7nx7UpawSWzgSDCYYhC6R1LZIFje1oV1qhZXmRb0uXam6VHt9scZMO24XqW8k2pEIy4hpwY4ZRnV%2BxmUyyUDSn5z1UymkhhHUEiM5UmTCKdF73qiYjghfr9CY14e9QmS%2B6DUl2mtlM%2F3ffsyqoZqWvEfJs5n9avjmyVImGNKqWhj%2B6Ko%2B2jULZTc5UdEzloTcOjKyaUdu4on8LPw3KXbYZh&X-Amz-Signature=6712268e6fa5455db7153e66ed2238fb6bc60a9dad6705bd79abff4318891b86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUJNBOM5%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICNj7qzmtDXRmBHGO5qK2cgnVRpsX85jXdA6r96jZHbJAiEAtMDYaCY%2FAfQZX%2F6RwX85%2FLYRY7e5lTsDbkDerXTzPYgq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDMmP14s6z5N2QrwXASrcAxnbKQ0qRM5bbP0vdHSe1rT%2B3iszO%2B1w68RCDAlg5eYr7zHU1XCDOQ4s2Y8Po%2FXBnJdwm4mH40%2F0HNcnynC37y4BOVSWREOs180YgkIi%2B9PAOoMc%2FYJTSY703cn9ESghgREDhdJJhhyhLZi34qGHyz2CWJtEso1N1HdFFL7WHhSMpJBqrNfqJa2ZKb5AWNU62nZ5nBSS3%2BLk8CC2ehJy8uUAmV6K7TNiMCe62bXDES32CeJRSw%2FRv4%2FnnkS7HLIC4wNjU0TwUX%2FrcjoE8UfuKtYmSztNtu860WID%2BRutKbd0WIyafKpcLBs6%2BEzpZmg99p9oA2MKhyVV67uLkhskyHlNUttt9PrSnpIYULb7RtTXvGDrjZfNbeckYU6tkEBDtU38u1LfzbmmSn%2FsyKEkCxxYTnjAjnQ6YTmXzPrgYAtK9YwbH9aHUpd8tB62SFwczVwaRyG%2FkEVSy3yMlfzYGovPsWqb%2BvVYSrroZndRNPhJ2ot9icH19%2FcOsmyFvyTXN3KR3%2FHd%2FwVisCVKMFNQSXhK2ApdUF71qTaRmbATtOiZn%2BN%2Bl976x1ZfahPOX3fuPlEXz8RxF998H5AGJdBlPIlJeqPHT%2FAM3dIeAY%2Fe4Z%2F7aMxFwfQXwmLDr8nNMNjkis0GOqUBuNJiFQ7Ww3y74DfkRV4G8AlLY0KQqSD6VhqIhf9jlo01aHDKhNf3ov2SG0wAXkA2hAM5fTVGT2zKUo0cXgMFYqaT%2BAzeFtSKZ%2BLLN6TjqfuOBjgVj4D0Ze3TaGrehJe0c%2BchlMIyOekAJAyGRa%2FCekA6giFQoT3aPC0iHlUffhrtCgMd9346h4c60yYa6T8l%2BAfHTSm2Brv8ZB6hr%2FX%2F8K9RbdNf&X-Amz-Signature=2059d45fb7a9d8b937ef83a4da7d6357948a383bf31cd8beefcaaab2cce54e81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUJNBOM5%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICNj7qzmtDXRmBHGO5qK2cgnVRpsX85jXdA6r96jZHbJAiEAtMDYaCY%2FAfQZX%2F6RwX85%2FLYRY7e5lTsDbkDerXTzPYgq%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDMmP14s6z5N2QrwXASrcAxnbKQ0qRM5bbP0vdHSe1rT%2B3iszO%2B1w68RCDAlg5eYr7zHU1XCDOQ4s2Y8Po%2FXBnJdwm4mH40%2F0HNcnynC37y4BOVSWREOs180YgkIi%2B9PAOoMc%2FYJTSY703cn9ESghgREDhdJJhhyhLZi34qGHyz2CWJtEso1N1HdFFL7WHhSMpJBqrNfqJa2ZKb5AWNU62nZ5nBSS3%2BLk8CC2ehJy8uUAmV6K7TNiMCe62bXDES32CeJRSw%2FRv4%2FnnkS7HLIC4wNjU0TwUX%2FrcjoE8UfuKtYmSztNtu860WID%2BRutKbd0WIyafKpcLBs6%2BEzpZmg99p9oA2MKhyVV67uLkhskyHlNUttt9PrSnpIYULb7RtTXvGDrjZfNbeckYU6tkEBDtU38u1LfzbmmSn%2FsyKEkCxxYTnjAjnQ6YTmXzPrgYAtK9YwbH9aHUpd8tB62SFwczVwaRyG%2FkEVSy3yMlfzYGovPsWqb%2BvVYSrroZndRNPhJ2ot9icH19%2FcOsmyFvyTXN3KR3%2FHd%2FwVisCVKMFNQSXhK2ApdUF71qTaRmbATtOiZn%2BN%2Bl976x1ZfahPOX3fuPlEXz8RxF998H5AGJdBlPIlJeqPHT%2FAM3dIeAY%2Fe4Z%2F7aMxFwfQXwmLDr8nNMNjkis0GOqUBuNJiFQ7Ww3y74DfkRV4G8AlLY0KQqSD6VhqIhf9jlo01aHDKhNf3ov2SG0wAXkA2hAM5fTVGT2zKUo0cXgMFYqaT%2BAzeFtSKZ%2BLLN6TjqfuOBjgVj4D0Ze3TaGrehJe0c%2BchlMIyOekAJAyGRa%2FCekA6giFQoT3aPC0iHlUffhrtCgMd9346h4c60yYa6T8l%2BAfHTSm2Brv8ZB6hr%2FX%2F8K9RbdNf&X-Amz-Signature=7b1e9c5fa831ec23f1eb115cd5171b7f51312b32df7d73b544eb6414e74dfdde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLQBPI5S%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBe7IsKDiK6KIc7fTR%2Bs2X5Mfw47hKc71BjJWnF85vkgAiAXYdcyD6JBnipNG4KAdDES8rW0AJ%2BYjbqghwAErsvcKCr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIM5q6Hv82WS10pQFQPKtwDwu64wnuaJo9GlXcrY0ZPY3CD7G%2Fe0VY%2F9n9QDAAaVIcXRq9gNyscDiJma1F1fW6JZzYwUnPVwnH9X0i3zs8ENQFmLLG944eV%2Bjg5UtfO60BRZeQM%2FyOq4uO55LG5DmFjIxARoGYvUB1pLLJe7tlnpZzpBuFFxejXgFu1abIhFQrVHkbP1bOfJNH3lSs1U7ALYu6ZUkYmcBrer%2Bx%2FlKc6AtqQ%2BTZdOEy6c8JL01jhVT0fhC0FIn4wTdLVJJm%2BjSNZOXURd%2Fw4rkVhSl7K%2BrNvtE7YBVEjGwg3uQq9NCsfzIwRzFfQJfCksbaiAxZgwiZDagTzAi6wMNGxmQBY%2Btq5GJa%2BHoJl9crW6hQsUhsvpn4Z9fbkVrbnTITbuuVoBoRIhIgsKa%2BOKhVayRESsQ7r7ghy7Yfa3QSdRriS%2FGpOhyoslCWJjSfBQOt3HqMTs1VY09m47pAMlVVINpwFym7WpzJW2fFOU61AG8FO%2Bq18UHMPCttkNbzXhUjwbgiog63Ab13X5Pd3PMzi6evxRWT7E%2BmOWW8oSi6OQphdgA2civ8bDCsYFkYfGFfMtheIRuriDa6h2Crmt7hEw8OgrRec7LJzmmRWznmG3sN6kKN21BmyfjUl4zGLRsYRMvIw5OSKzQY6pgGbKtVxJ11itLls9374NXVIdHmXgelrJOIfF%2FPmI9%2FxDpQF%2FbpLkA0pS6xX3gLjuHBRmYnp5TBd38CAtc3IUaebNH967lH6ElydJ%2BKeyIX4re30iC1mNeuuPmQ9CiRdBGtXucMI9dfl1s0Rpu%2BxH56jRxCf0Bbisd5Xmx%2BQiGXwjpdByPNdmqMy%2BAmWwhiB5nF1KVlOFpEmV2hcnrM1qF2PIWMeJPnp&X-Amz-Signature=92abc4233877d2c3fb440a4c74b7711fd7cf1b141363d358f56fe6edcbd75436&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSVHUYMD%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRoHB76HEnKUbdHpRi6QLQ%2FIizRJncCfexfOKdfPHHPQIhAI8EML9RNtpjok552mqmiqUoIA8mMpgY6gNdI9ExVhXgKv8DCFMQABoMNjM3NDIzMTgzODA1IgweZSkXhA6QrCVWUQ4q3AOY2txE%2FJAGBP5ow%2FZ%2BHnRIcwr5YImyb%2BV3iDsi6Fp4KEclCLJ%2BPRtUQGMWI16DBqzYJkeJAjsrei5EMoA6XcG29m3PiNyRr01nzk9fk6617wYhpv5%2BJ4jJT0ZhR8UuAbPi7%2FH5EuyYpdbkSLo1cyF3k0PkBzbOfOKcqOKX3JzeZYiu7qlMjH2JgAlgQIVuHuVylAutvv8obN8bYpeFBBpVwZS%2FJEgM5pnc5fsnNxyl1yIujqr9bJ8L83tUI3uLNfn9jU2WJwAmGohe4mtAH5fQBOvBIe8V5o8rEoPZnfsPY56VZzdAr9R2KSVCWv4jaMZw9N%2Bl4svCfdEI%2B2g9jaosXu0OfFA7YJexmxeepl05sBTi%2FJc4a6Xw12EjKi4ZPTg93yTnhGWUHbjYoeb9mIl%2BYSXl75kVBU85vvWGeKsUN03l3YxyPFVfFefQ0whq9k9t%2BPybPiokJbUdSaGp%2Fdw%2BSCX%2FP3QcFIBhZlIvTKQRch9skPfGBN731az3fXVt%2FW6UVxwi9uFa9amMCC4fsgcIyJOMwbbN8KCHr7j6xxvxzk%2BkfAsdaKZsQJQPzzTIy8M7%2BMX059sWIKRCZ9ouSp26pV3zApmmiBG4%2BWjdeYCngYQdhHFZJkULqINtDTD2%2B4rNBjqkAf6C6SKMHTFbhOQcuKe40qAUA8g5IOZKOzOd5C%2FKbzQxWZ43OJFS2j9cykj3lD7hZp%2B%2BoMWN05XPMWy%2BgPRG1E6EdYkc7%2FB50pMLR8gJSr1ec7HFLQ8NnGvOFmFQuHbmM94DD9%2BkQ%2B5DiC9l8uDuo1nF0YY42Q2xF9ski8wmzioQt4zBnmnwLHjqXA4m7PXBhs7cFCF7dhAZ0fm81wfUGLm28X4O&X-Amz-Signature=c6ead3d5aed27823eb6c25dd1e7ddb0e956a40b06f9b207b73b6f9f1627ea25f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2ZWNCHC%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDEuAnaTnGuJzUlbvnQelVAbk3pW9CWif6wCoZbgXwEwAiAjfDUGqmDq1aTd8McAVdbX4gsz3QjeVfBtdmZK8wEzpSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMbdm7gNloZmcEcHiiKtwD0nwuNXjYqiTD1PchUCNxq2%2BpRSSmGBHUrEl%2FUmKr%2B60rWNJVtpS2e569oHeKeS7F0ec7C1hHqih617sfNBL6ec3dwk%2FM7Kp3Mh02XeaN8LOM5DIFFTFAbHlP0PsCvIg%2BgEvqVA6qKHtB1%2F0Sm4I%2B2sZamv0KppwtsA%2FSrVTQp5trGaUK1Ul2KkISjt4QEQ47XK3n1VUmB%2By3RLflVzL%2FxODM5FnVy0RYXpI6mDDAhnRcmVh4qOkz%2BfV9rUEtiL%2BDEoSFy%2FdXaMR5JyISMgWk61%2FeXKt0YqeWVZD6pzISn4S7bBOnEdX7%2BbGlMgyTqkSyrU4CjDPavaMw246IPKKnnFY7EnGMBxrTj2DlC10FQNNZQmBKDe3pA%2BAKoHW2aNyzAUiuhzeJ%2FLa5WqXW3OMAfADackyzvIlIg%2BkPF3BNTBE1mg2H9SFhueSz8qpxn%2F9FVMF3Ms8x2Phmv%2FNOXrZrm4hgCdo1glVXA%2BaIWcNWGxDvL5nTiV%2BRTuCJO49077l00bA%2Bc4tGPOvbxPZz7ajSIxUxPyj%2FgSrwsgkRT%2BNHHKixa160vjyQMURq8ANBze5crGJOn0XER%2BMLNplqS0vlXY2UlXVp9mvSkmRe36xoPTIfdaitRsvgrBe%2Bs5ww5OSKzQY6pgFTSOrtsmAX1rFFzDcDyz7hzw2dDstct3wOgvElcnm6gvEVFnXKb6JNFrlbQ0XLXlL7ZPSvV9GYeX9DhTCjxc02Bnvba6jX3BQNbIwKnLi6j6lx6YPbgY8TnlMVLlPW1JK0zsSs0SLqBjiOuddmyhvTjZsH7UPcznRXLXbm882bidHStz9ZiYhq5yfQL2P8jSZDH0JdWLB0OM2L4tab0CuLd2xX%2FOtj&X-Amz-Signature=b997a589b16e18d9c3e2c1fc72a426f72809a8e2b38bce52d45257730f780dd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJQJ2MSM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjqerrkBimJOx7mLU%2F9xOHweRjvMbrQxexWBT%2Bmb%2FBfgIhAMTWCiR%2BXlYm1dI77yj5B78q3K4z7IPC2s%2F33YGorIDQKv8DCFIQABoMNjM3NDIzMTgzODA1IgzSIlCQwwaRq42Uq%2FIq3ANdJpILCG%2Fqw2wzfGHmMu99EPJHEbwPSXf3a%2ByEMUsSHy4WHP5D5SQfaWA2a9MkpiwX90nkx1rsldXAmZ4u5kY8grsSUXPrDzc%2BtuphVd9HyHfeHtEd%2F%2FxPGiKwArZkzBGk0FtirnjCRzA9QZMqpeaYNvGxwbslHeYelGHouGAbVGnJOcK%2B%2FXUPnPULKm0GoDw%2BLbEvUZ7s9mn%2BQ1TcRyt7jIUHYR3CqRrD%2BKfS90kJFxQ7AZakFBgXk4DlhUlSoPfYlg0jwOuXAjmlxrBdhzW%2FoJfQ%2FXVyS6kMl1teY8XyUOhSo%2Br2FPlXbyM1%2BOqKz%2FlsL02EtksEXx%2FprCG%2FrrY15wTCegjQiIb1XiwSvIfi4vciITUrAbr4wcDVhZsLQQuGLjruiYe9cTl1wkI0EUPHBnnci7pF1r%2BDKIL6BL5xI1IO%2FW9VZ1gmtZ252wP00jsxKa0%2FcSuABAG36TuacuM3fKIItIrPFcO0G2G8JnZyUnETy7zIHredQ3XZ7TWTlgkluQdJDepkbwCaEuVKFLmgZvsllGnjVqOWPNTzBh5e4cY3QHIftf8zBsJX0cgecf0b19lOxWHB61M%2B6mYJCO5xN3u%2Fazu66v4FhnPbkObOPpEfaXjezUlpIZoLPTC45IrNBjqkAXZ3WDmFV1mnXNIQHfZbAJcrHfHpCDLNDZo1Gw5WZQUDO2m%2F0YHRODvm4HdBYUAWBVe3IuuXjGXaQziJ4Q68X0ZjWGorGhcDESuTGSDbBOmZ4JB00gq3XY3nk9UkIqgkRz68d9%2B55CbHD%2BHzwRxGFRCZce0H5E2AHjg0cfFvSqwX8tZK%2FJclgKZN5SQK9yrNcY1baFQBrvwwvaRnwsVqCgRj8pI1&X-Amz-Signature=e2dad62a44c21f97e3fde03f5e6e4f350a14c2bb3bc693cd4d0663fa9b6923f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJQJ2MSM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjqerrkBimJOx7mLU%2F9xOHweRjvMbrQxexWBT%2Bmb%2FBfgIhAMTWCiR%2BXlYm1dI77yj5B78q3K4z7IPC2s%2F33YGorIDQKv8DCFIQABoMNjM3NDIzMTgzODA1IgzSIlCQwwaRq42Uq%2FIq3ANdJpILCG%2Fqw2wzfGHmMu99EPJHEbwPSXf3a%2ByEMUsSHy4WHP5D5SQfaWA2a9MkpiwX90nkx1rsldXAmZ4u5kY8grsSUXPrDzc%2BtuphVd9HyHfeHtEd%2F%2FxPGiKwArZkzBGk0FtirnjCRzA9QZMqpeaYNvGxwbslHeYelGHouGAbVGnJOcK%2B%2FXUPnPULKm0GoDw%2BLbEvUZ7s9mn%2BQ1TcRyt7jIUHYR3CqRrD%2BKfS90kJFxQ7AZakFBgXk4DlhUlSoPfYlg0jwOuXAjmlxrBdhzW%2FoJfQ%2FXVyS6kMl1teY8XyUOhSo%2Br2FPlXbyM1%2BOqKz%2FlsL02EtksEXx%2FprCG%2FrrY15wTCegjQiIb1XiwSvIfi4vciITUrAbr4wcDVhZsLQQuGLjruiYe9cTl1wkI0EUPHBnnci7pF1r%2BDKIL6BL5xI1IO%2FW9VZ1gmtZ252wP00jsxKa0%2FcSuABAG36TuacuM3fKIItIrPFcO0G2G8JnZyUnETy7zIHredQ3XZ7TWTlgkluQdJDepkbwCaEuVKFLmgZvsllGnjVqOWPNTzBh5e4cY3QHIftf8zBsJX0cgecf0b19lOxWHB61M%2B6mYJCO5xN3u%2Fazu66v4FhnPbkObOPpEfaXjezUlpIZoLPTC45IrNBjqkAXZ3WDmFV1mnXNIQHfZbAJcrHfHpCDLNDZo1Gw5WZQUDO2m%2F0YHRODvm4HdBYUAWBVe3IuuXjGXaQziJ4Q68X0ZjWGorGhcDESuTGSDbBOmZ4JB00gq3XY3nk9UkIqgkRz68d9%2B55CbHD%2BHzwRxGFRCZce0H5E2AHjg0cfFvSqwX8tZK%2FJclgKZN5SQK9yrNcY1baFQBrvwwvaRnwsVqCgRj8pI1&X-Amz-Signature=81beaf48b2aba37f38cbfc0bab54a55b829a0528855766fe9a7e1e244ca98a46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XZPHFNX%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5tWTXjKbzuTACQjQES7AU1oqUgdp3%2F3txkd%2F%2F91AmrAIgd6cdRDSmJjvcj%2BtKUZ8lxs4zW6avT5HDI8iYvBPIwb4q%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDAjJwcxMx7ldLUpDxircA6XIITx6GCfy%2BYbhkuZDvILBPGH7u4ytEIUc%2FX%2Bet%2BN5Bbma1JdKYqkI7toYq%2BJB4mzwqwYoTPRj30lRyEZBWGLNsVohbhGSwSzACsIMf4uQSKXM%2Fr52gLtfbAwmxHQwNTNCwGgz%2BgWRd1VIe6Tnn4cgkkr%2BykeJhIMY8u1yltjOI6VXqnPaHxurrsxpTleqmyZYSVNt4J21YcnWQefEAaLzf5cWPm5SpBkJ8MXK3aSvQ9gRQuJX7pUDESlFxK%2BAK1ohOtlKHi8Zc786iZrslOHPt%2BBoWnkrhKHnSCbd3KNJBOY2BJ1fDQhUoTX%2F5VFkFLZhuoQQJvLzE681wOVYXd1%2BCDOaEFCHEQ6VO1DOiBK4qzEolwq%2B0bImnlagpaXjOfpMxmxmPTjg3TRjZqHm%2FkVs0IaJD18o8idTzZnpgVf9QL5kWbVv%2FM6cNKlQtJnHDYZ8tQ6iDA9wWwqJ%2FStJvNl3RKtwq2qyMHt%2FtpF1hy8BZR%2BHdfCJbljvlJZi%2Bj9mpTgvSS0wnREohyJQB1V5YeS7lj8ZtnnSahOqdMZ97xWEl%2BSW1bzniNK3tjxbOS1PWiRik8qhB4tPsuppdAs5je6dnZeXOHTZr6TPVrbzQEyGvGgF%2B49K6srBJhtSMLblis0GOqUBn%2Bmx4frUZZ7%2BcQ6V1dlkhVoIue2DO9FivcfHzqXfhZHaWpm0shAP8tYnhbJrNNA0BBpBp4OsaAexuAsqcCrab%2B2Ir9j99F61Jk2xU8bixr7XIa3qdds08XEJS2pRDamqIx999AnM4mK8z9DOqjW8ygKXsbA4MHaU%2FetrechUhXh1zM25gzSGzo%2F7QbbYwkz5hiteOFak4UDHjmLXvFABKLRyIQVl&X-Amz-Signature=53b8d2f2fb27d849d4ee780bba514335869cdc0eb5675823698d9fcccc716fea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665STQXWRF%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDF13pMS4kYre5PyivTf3iaDxWyVhxFxeM7YnPGmFZUNAiBKwLEjA158%2FCpOk3WtGGw1wKLk%2BLM89%2Bb9hjb9wb6ozSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMWwvhJlLOf9LXmCeFKtwDzNsqEe2Ek1yTmnaehbWi1EA9vbe0pSDzmpvweM2RVUKQpAyWRs83TDQBB9Oa7guGXnz4OaRiSf0bRoIPcEGy0tWtC6ZSRaoCp4LQ%2Fg7AckFgJghzyGwE7K6yhwNRi%2FceMnRHcOy56rOoJTAOVQ1hq3yqq%2FYQmROYYPU0Ng6eEku8zNCV0ew6UltnYSMAjVTdOLvoEs1sVuqkhmJLW3AS%2F896SiU3Us2N1r9OmqXmF77zwUCmCvuAjCKjgNFLpTIm8hJoNsTSYlp8erWiAhX3ioYQEbLeoHp4unHMtRVTYddTFO9COvSPE43iFJAQbNhSqTUovUBklouC77E0utgnL2uNrqGvgTsq9wto5bQkSGIL8flmepstk6QLXWbv4rnmDsFKPMpvYQZC9axKaVzqvDiOjty01bUQ6nRJzn3%2FjvRiUtMD2m6g779gRN9YVvb5SnOs7ZxDr6%2BOywWvKyaTsf3bR87yWU%2FkoaxxSpDzHDiqpUfhQonH2yqpTasgx14jSY819EvLuVIaU3jpLlsQCkF%2FlJtlBTOQ0VvnHcCnPK7koTCTCTfjhLTs9hKk89k%2F4hV5ZGFSt1F0Ijj1IWhY7li0XXpUsHdk5WIjDVBptys1UoOKidaI9eJosbEw3OSKzQY6pgHMEyJLzzyAE04Uo9D91htqqEodOEXO8C6kuXTqE8fSjUJOlvWCz9mwfa4zf5dOHpKZdYhwoDz8ZkzM4sCikAP%2FXzmC7%2FMs4v4vc1s1yFB9FbbjJfuhDnGvj8AZ%2BIEm39kBHDm4oTX2iR1OGPozWiYLdPk5TojPCkSxdmQlg4SvpXJcMtOtDY8Z1AOWZG86%2B8yOM8CMExlmLEm11X%2B8F4xTDHz%2FvA2E&X-Amz-Signature=64e88e42e4be594f9c076bff6c97aff3e8ce46d0cc3ea92e3ee16eca1e71e6b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665STQXWRF%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDF13pMS4kYre5PyivTf3iaDxWyVhxFxeM7YnPGmFZUNAiBKwLEjA158%2FCpOk3WtGGw1wKLk%2BLM89%2Bb9hjb9wb6ozSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMWwvhJlLOf9LXmCeFKtwDzNsqEe2Ek1yTmnaehbWi1EA9vbe0pSDzmpvweM2RVUKQpAyWRs83TDQBB9Oa7guGXnz4OaRiSf0bRoIPcEGy0tWtC6ZSRaoCp4LQ%2Fg7AckFgJghzyGwE7K6yhwNRi%2FceMnRHcOy56rOoJTAOVQ1hq3yqq%2FYQmROYYPU0Ng6eEku8zNCV0ew6UltnYSMAjVTdOLvoEs1sVuqkhmJLW3AS%2F896SiU3Us2N1r9OmqXmF77zwUCmCvuAjCKjgNFLpTIm8hJoNsTSYlp8erWiAhX3ioYQEbLeoHp4unHMtRVTYddTFO9COvSPE43iFJAQbNhSqTUovUBklouC77E0utgnL2uNrqGvgTsq9wto5bQkSGIL8flmepstk6QLXWbv4rnmDsFKPMpvYQZC9axKaVzqvDiOjty01bUQ6nRJzn3%2FjvRiUtMD2m6g779gRN9YVvb5SnOs7ZxDr6%2BOywWvKyaTsf3bR87yWU%2FkoaxxSpDzHDiqpUfhQonH2yqpTasgx14jSY819EvLuVIaU3jpLlsQCkF%2FlJtlBTOQ0VvnHcCnPK7koTCTCTfjhLTs9hKk89k%2F4hV5ZGFSt1F0Ijj1IWhY7li0XXpUsHdk5WIjDVBptys1UoOKidaI9eJosbEw3OSKzQY6pgHMEyJLzzyAE04Uo9D91htqqEodOEXO8C6kuXTqE8fSjUJOlvWCz9mwfa4zf5dOHpKZdYhwoDz8ZkzM4sCikAP%2FXzmC7%2FMs4v4vc1s1yFB9FbbjJfuhDnGvj8AZ%2BIEm39kBHDm4oTX2iR1OGPozWiYLdPk5TojPCkSxdmQlg4SvpXJcMtOtDY8Z1AOWZG86%2B8yOM8CMExlmLEm11X%2B8F4xTDHz%2FvA2E&X-Amz-Signature=64e88e42e4be594f9c076bff6c97aff3e8ce46d0cc3ea92e3ee16eca1e71e6b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663K7QOQYA%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T132843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9FwN32ThDl2KuP4b0vL3GZ%2F%2B%2FBsyr517skcJORJg8sAIgSnb2P2AFhE7zd5IMiQTwaCzvH2sf7Hq%2BNKmhTVk2cxEq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDGgQRuD3Dnuv0aiR6yrcA0v8kUK%2FjMMCn6Cfxy%2FY4RnFvbppj0T6EFVWo5uBQEM6b5CCjr804KXPP9XTMVaXg%2BieG5sn9aB70SOzKnTvlM1zX7tHIFFZdGmle0WwujCT2EpDNPheopqtCgGYFDKjRqFEBObgsEYrPKd6FPu2AhSBmez7cx5Fb1sS13apschKdGA626SJITva5MLl4Ftjyg0Zdy%2BDpmf8SPSutXLnykjSdeSCwCMEsy3CE%2BQlpDUBeXKFG7W2oBOTUi09XXz9frnmK1k%2FLrHxfG%2BtflqSmFNPF7AF94gdHFcBukwwWe6dVMnQqowAs4ieix6vv6j7JF7nfblTcLz3FZwKU6iaajZ5UBC32WdMKthaykQ6b8Vb9jhpNaqGnLNKPam4XilrseHmJVeg%2ByJyXBdy9zdA8KS80WSDWq9Q2dlIe%2F8iUU3eZSHTiBZoiqYYBKZbh3ALcdGJevOiJdBC8%2BJf9dpIjse0L26cxAkv63tdzw0YMBOYHJKj4ejgqRvNt3Ig2wPQQiBzp37QYdBnBWx2%2BBKCqfr5zx6Fdx3RZiGm%2Fii%2BzRXD0c6hPVMYJJnK6XbM8s%2FfGKNYS4NnvjOVP7UM4Kjb0XQypWNz8phruudQ7YX%2F%2FLwhqEm0GR7zz%2FjS%2B4XoMKXTi80GOqUBKN8fGKe6wmImE94UhbQfBQHIW6IznnQvn%2FwJpEQUFYqUyXRliWSw%2BJtY42512VZkXnVM3pqR5yA321DOAiUBFw6CJkCQX%2BsJLVU72RlIQZ%2FcxoAbX4X6PIgDDb3uuYgjpa27xI4ZnmGJYKzKYTZpi%2BoT3hMLh4ewPY54gxSuK2bf4TT%2FDxdOrsxlR8imcnX5ITaJaox2eoYnqvyGGH4xRfqIoHiM&X-Amz-Signature=48d2c4f27451ad29665bd5e65d238bb332b0d44e613619fb735dcee82572d2f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

