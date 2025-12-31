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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXAPTWON%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIAex2NANq9l8wihtKfukCvsyri1jGMAtha7n4ouCfycsAiEA6pSxfZp0YJ9n%2FHLIMJVoTnnXuwOUWg1AsahzOQnC6ikqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA9lCz9LMI0y5JUpACrcA2VaYl5DqW7Yacan0bng8GBi2yY4pXDn9kYNGV2y%2Bxe8lKt7IedB9%2BFij05iIlN%2F6BvL8owQ14ZGwUBJO9wsuewXSuuflDVApJF1jYcS%2FKIFp7LUXqNA08KWShwaGhcyGsWNxv1KT7n8K%2BPUIueIoevS%2Bo2dgB30P%2B96EYJPA4YpjRzGxC5g%2Bz7aYcBuY9qs9q52UYvzN5JRAzZmGv4rVxZg7vx4%2FiBtQi5Kf9pO11PzlNTdU%2FLMY%2Fuburqvs555HJ6pW8855XILjoCX%2FD9%2BSucReqHe2%2Ba48GRfBwv46IlaW5po%2F9woMyi2AENSTBkNaE3i2KVKRQDQzTs%2Bn42ntyIqAq41JeD4Rz18xShH2g4zSCUiEmogDGpEHKRb3sd8DnDfWrOwR0wtEd%2BafQkDxZ2RSgBbiDNxsx4aVoxrH2wKT57xCFVnP7DZzz%2FiRkPVZMgesFeZhlr25uEns8rKKJn9Ynz51rhjhMfe73SBOWB1K%2BnrpACF93VH6E0kAlVpx7kzy1N3E0DvCeRnOXQeZyMA8cnFva4YFmcu9xH12IcQAEvtTkMdymD4OkSqRNulez7kcMlNSSlAbuFurAs7Wusr%2F797t0x26nNZ3BxbCACxpnWXBNLa66BazEaSMOHi08oGOqUBxcZjMJ8arHffmuouPHNc9oZj%2FXi58nV%2B66mQeOy%2BAhLRQXrMah792pmFrsXZo3XcgQg%2BDqzfUqVryt6Z3KoVlfCMHMiKJT%2BxLgHAa7JCUmVHSq24wa%2BnEFx0EUmZN3Ts4zCtWzbNFdFmRrsc5DoGrWvYv9%2FbPhqL12Iko8tP9b0hybClGQn1%2Bl%2FJrbIZJ0kTgKfguzsAv%2FtQXuKHUggfNM36FoFg&X-Amz-Signature=d0fbdb3484a737f1368568c01fb0b89659ba80be536f00d19a3d3e02e18b60f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXAPTWON%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIAex2NANq9l8wihtKfukCvsyri1jGMAtha7n4ouCfycsAiEA6pSxfZp0YJ9n%2FHLIMJVoTnnXuwOUWg1AsahzOQnC6ikqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA9lCz9LMI0y5JUpACrcA2VaYl5DqW7Yacan0bng8GBi2yY4pXDn9kYNGV2y%2Bxe8lKt7IedB9%2BFij05iIlN%2F6BvL8owQ14ZGwUBJO9wsuewXSuuflDVApJF1jYcS%2FKIFp7LUXqNA08KWShwaGhcyGsWNxv1KT7n8K%2BPUIueIoevS%2Bo2dgB30P%2B96EYJPA4YpjRzGxC5g%2Bz7aYcBuY9qs9q52UYvzN5JRAzZmGv4rVxZg7vx4%2FiBtQi5Kf9pO11PzlNTdU%2FLMY%2Fuburqvs555HJ6pW8855XILjoCX%2FD9%2BSucReqHe2%2Ba48GRfBwv46IlaW5po%2F9woMyi2AENSTBkNaE3i2KVKRQDQzTs%2Bn42ntyIqAq41JeD4Rz18xShH2g4zSCUiEmogDGpEHKRb3sd8DnDfWrOwR0wtEd%2BafQkDxZ2RSgBbiDNxsx4aVoxrH2wKT57xCFVnP7DZzz%2FiRkPVZMgesFeZhlr25uEns8rKKJn9Ynz51rhjhMfe73SBOWB1K%2BnrpACF93VH6E0kAlVpx7kzy1N3E0DvCeRnOXQeZyMA8cnFva4YFmcu9xH12IcQAEvtTkMdymD4OkSqRNulez7kcMlNSSlAbuFurAs7Wusr%2F797t0x26nNZ3BxbCACxpnWXBNLa66BazEaSMOHi08oGOqUBxcZjMJ8arHffmuouPHNc9oZj%2FXi58nV%2B66mQeOy%2BAhLRQXrMah792pmFrsXZo3XcgQg%2BDqzfUqVryt6Z3KoVlfCMHMiKJT%2BxLgHAa7JCUmVHSq24wa%2BnEFx0EUmZN3Ts4zCtWzbNFdFmRrsc5DoGrWvYv9%2FbPhqL12Iko8tP9b0hybClGQn1%2Bl%2FJrbIZJ0kTgKfguzsAv%2FtQXuKHUggfNM36FoFg&X-Amz-Signature=d0fbdb3484a737f1368568c01fb0b89659ba80be536f00d19a3d3e02e18b60f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JUFHSOW%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJGMEQCIDh7TvXXPGnO38MB8T7TXijRLaaiANyyad5H37p%2Fc%2BmmAiAUzG2ddhTNxPoLgVO%2BzdVVtfuAVQylahqDgP4ZO6pvNCqIBAjL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIME5a0LWu0r2XN404kKtwDfZZ2QTgXSfD011tBDQ7U3dQ2ETj9ygODO4DSdsTOPXJwvTKFTwv6y1UeuNr%2Ft2OLfnHbxQmh9DTAvovKKRYF1%2BKHKJs2ZNFPqOJCRhhv%2BFhiJkr12TPeKQD9FaHhvUXaFxGhEKlLER8n%2B2Vp8lD74EL0mgRTEYhINei7jYCFwtP9tqPTZW8gqORYvMQu3wlh8T%2FE01v268U99vllkijrhLf%2FR2kPiumNsyLrdFL%2B5T5oBA2HjZ4Nz4vqMDB8h2S6mhUeviHKrTf08eLmnwehju697fFjFAt5m%2BnT1YZsLtSt5GKq7ZcbRIO7WXqFn%2FkMqRTvtOiAwuExjSGeKKXr3Hgw6LINGqpTxPRDZZPuI%2FKtgSGPkO89cWKH97svHE1SnBfmpZtY6GtmKgfdOYld9cjal9QeLrx0FEZWRCATiG%2Bgjuc9sFp%2FJ6hMFHeucO2IMNoOx3b8MRrQPkv%2FwqIMrECILPZ4JvYS5LojmjZ86i4LiIgpocvfrQpmZaJjJv7xnWoqa9iXYJfzh7lxheOxIzzn3EdX57WMTjfinC4apZo3UNvp5wfdJsBCimOwXVqQot4A%2BYyJbc9NSWZiomqItqANocC4ZIglmUsmBt6M5cEanoOuGpGXrrsv1r8w%2FufTygY6pgG7mGAj9wFMwKD1l4uPtW%2FR%2B1wN00IwHZGaIIF%2F4qoR2qv%2FcqTSqAFUk2FoxTcuoKi21f71AQzhpNRmEvtwOeFNbkuGdSyxfGS3N4rbIW8pVU2dOL3ccJMZ9BSd%2BNe5H1Ypst8YsHHc1V47d%2FAk4o94quWfpgDpb10Px7ptJ5pbKAM1BSvkTrerMAUNWK%2F5I0p%2BfJus0pl3TwhNJB2Pk9U8CB0CzrJs&X-Amz-Signature=7182dce5c9ce4b2169b2b6476e4eb78603aa4f23e3b68c283a37dc520532c1be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXGI4M6V%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDu1azM2ZqRT1pxTWafNkF%2FSkAISJJnR5XdN0rDRc5V7gIgGpipO2GRolTpi5RT8hqmxHXKsoJpW%2BUqv2VtxhQ%2B0QMqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN38C6Vu00QPHoyMtSrcAzmPG646W1xNqAWU2UXeyVDewCRg%2BmfHquibzLziO1%2BHPpoqUca6x1tAWb%2FLX29Ae3MkEmBmG2Pe92PZgyBPcbO9%2BGsDYezAqv9JzjJ5jKB%2F0w1Olz2x11bygVeB9QoID%2BjPiLQShhA%2F0P6N4a4Jmr4tVTvJphEB0lDwzpdAHGRnCq4B69J%2Fl9UfDiTfoWogfSGrBc%2BKBQk7%2FK6yRj0zKXxzkn77i0CbTg8kKLJABM8zSOxXIc4yCbtRmQHyxTyfyoYks8P4pQ6vrabIEwFbSIz%2F00sQe7fSqgq6hnowzSWSMZnv1G5GAgnESSSL7VPUSQrJEzG0MHGYcI8Aai%2FxDpTfsDEwN6RyWZWhZ4s2BpJsra3N44XqbcLRA4ps5IXWYByO8EN9b03BkJIhFlj8gHOECfxAayEuAk3dRt4gq0zDNJExFpRP%2BoM%2Bb0WXL4WKWK22UGPAvastImsSOzSrAYMG5WflZvKQWoyx4g%2BZ6enTnmDbccMiOtD7ujt722aVNRuSWrQ9zcDW5OAJvic02MEB1vBDphECMMhv1kikR6KMR1IM3cQeXldZxODfcpXkT8nRdnrYePxD%2BqJZRhHh86I4jZYd2ix1sFeU1DqXodAIx236fKWWLMRhs%2BbnMOHm08oGOqUBRAjogEEvqZjB1vlKYfjuzCJAXYZJdN01NtUo2NAaHvvfOl63bnK43yr4azy1hn55uydgeHppzcSsvzFW99pvybvSu2dw2pBuriWRiVMBZnC%2Baxr3ovQ78Two%2FlXzvciadBI39zdCsVn0CrOD60xH3JsECsCKSo8iUeVwEHGWi0%2BJTfu6jO%2FINfSGlAgmKRWUn4a6767Z9mot7uP67EibZ%2B8XhjqP&X-Amz-Signature=756487f259f4fb9909abd3325ccb0b1a9722a48688dcadc6be9de7038a3c3879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXGI4M6V%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQDu1azM2ZqRT1pxTWafNkF%2FSkAISJJnR5XdN0rDRc5V7gIgGpipO2GRolTpi5RT8hqmxHXKsoJpW%2BUqv2VtxhQ%2B0QMqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN38C6Vu00QPHoyMtSrcAzmPG646W1xNqAWU2UXeyVDewCRg%2BmfHquibzLziO1%2BHPpoqUca6x1tAWb%2FLX29Ae3MkEmBmG2Pe92PZgyBPcbO9%2BGsDYezAqv9JzjJ5jKB%2F0w1Olz2x11bygVeB9QoID%2BjPiLQShhA%2F0P6N4a4Jmr4tVTvJphEB0lDwzpdAHGRnCq4B69J%2Fl9UfDiTfoWogfSGrBc%2BKBQk7%2FK6yRj0zKXxzkn77i0CbTg8kKLJABM8zSOxXIc4yCbtRmQHyxTyfyoYks8P4pQ6vrabIEwFbSIz%2F00sQe7fSqgq6hnowzSWSMZnv1G5GAgnESSSL7VPUSQrJEzG0MHGYcI8Aai%2FxDpTfsDEwN6RyWZWhZ4s2BpJsra3N44XqbcLRA4ps5IXWYByO8EN9b03BkJIhFlj8gHOECfxAayEuAk3dRt4gq0zDNJExFpRP%2BoM%2Bb0WXL4WKWK22UGPAvastImsSOzSrAYMG5WflZvKQWoyx4g%2BZ6enTnmDbccMiOtD7ujt722aVNRuSWrQ9zcDW5OAJvic02MEB1vBDphECMMhv1kikR6KMR1IM3cQeXldZxODfcpXkT8nRdnrYePxD%2BqJZRhHh86I4jZYd2ix1sFeU1DqXodAIx236fKWWLMRhs%2BbnMOHm08oGOqUBRAjogEEvqZjB1vlKYfjuzCJAXYZJdN01NtUo2NAaHvvfOl63bnK43yr4azy1hn55uydgeHppzcSsvzFW99pvybvSu2dw2pBuriWRiVMBZnC%2Baxr3ovQ78Two%2FlXzvciadBI39zdCsVn0CrOD60xH3JsECsCKSo8iUeVwEHGWi0%2BJTfu6jO%2FINfSGlAgmKRWUn4a6767Z9mot7uP67EibZ%2B8XhjqP&X-Amz-Signature=500ebf6ea4a53903dcfea31798df0398754f9c510f871441f8da8152e64bbe18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RI2H6JGJ%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDNnTjvzQSf7Bg4lcDCmn1TCk3G1NYt9juu0niIfrHUFwIhAJ1zeOaM6NfpwLO7WRrJeNYX%2FFJG9sKpjfjd9KRGMfc4KogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHCZHgT1CDMVV958kq3AOl%2BS02gCJBjQtVc3RKBcpon5pcF3KCiM1tJQzhtULL5Ah%2BCsQAldNkQPcrROsVyZR8R2KoXasHRaNWnB2gt8WYXwlzepr2jdT6IeAZnWJgvDjmAWeMDh%2B67ABKargY774I%2BAD%2FyW5c%2FRJ29LNx%2BP%2BlRQfvlouGTR92QkfGtV8zc7T4P3gKpPXmsbrQ0YyTZrM2qXm5fPuXSfhlhNp%2F1MraOTu1DJWz9%2FsjQkVzIIlLtg%2B%2BADi2d9gyYFOEEOO9QafNjLLt%2Fnxr6IqW9VtFDGmeKFwYdRjp0R4gqLpTRs0KnSAIzXPyU%2BkFZKt0BtGsNOVNPLXXWj7R6yLWFBMdRibMrb3DQ3hu%2BPD338dY1e3oziT2WH7m%2B7EFO4AoKwgL56pDOTkroFsIb7y3zMyuFyeMNxdxZQpIaFUmAs4Oqy9zco8Cm4BpJ1Yrti3w3%2BolSxBBszm6%2Fta603Zc8%2F4DeYqo%2FarZ3NgAFDZ1yZWA0bIfMfMDjT14csYDxekqoktNEFKS2vonx5yG8yRQxmBujN50SCvlsx9AIC6zuYfhk2%2B9pvrmr9uBPCQ2LNAPzFSZV04y6S1PHjq0xqW8O%2FByQp%2B0k2zhOyVnrO5iZiJT4HEOKsQNQJzN0gtNApxLfTDa4dPKBjqkAUS29Mr3E2zRa6d6qHfRB%2FXQe7dqtkCv6VRvYb%2F3pSAUZyFMzhdOzo6POmGMgrhnoy21SdKxM3u0HS2QTsDmJcMuBXuS%2Bm2fofsbZKC4SnKEdvcDExPOclNslY5zXqae2EnMdoYCgV1%2BtlPvRA2tLfHhRS1fStXacleRwdGARyIPQMzGfgxHgg2GGpuXmoHYRWerE0g%2FAkC7nWxkB2gh1kbJWFr3&X-Amz-Signature=c2327b10e839d95a707dc67a8aa0cd4b91702ff7a16265d3c72045ba3fd15e14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTFSQFLW%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIQCBlwGeXlJB9aakVamWP6eCv%2ByzY5ial%2FuhwpJ%2FMu%2FUGAIgX2zS5qbmEWSCmkqC3DyiPIjX1ZmBQRm92iVtkz03P3gqiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAP8lJ1QZZSMkjgiBSrcA9CP5MZ0QAmw6qTXiMB%2F5%2FpT0Q5HbKopwF4FzXzvB53K5lz3shIuPyEUcz0qumtv4Yu2BeSYc6MbJpD%2B48JwZoDxE2lS6gc%2FtDoyDfAvzWdseJKR9EWii7KzCN9ueYuEFJGYBW91zhjqKAHmUb1EsNGnaQ3DntsPj%2BsyoUC%2Fxng4BUMz%2F8BqmiWAG2gD1c2ESBWXysn0PmJNSeMItGYq%2FIMIxGmmOkKxR7hrk6q0s7yXPhK8LA8Enxxou5orQlw4sZxuSTrc0WFlrGcMZzsoRBsiuLoPv9OC5mQ%2FdkpQeWcOu34Md7DVNUD6vw%2FmGvjtPnQmD4ay%2FzlFKwm3f1GI4uFFHRzD96LVFfcNoKrxlrPGCpIql%2FIbeWWmYXXCn12v7SvehYlGo322HqxsMd8RnsXBzPjA%2F%2F902dfy%2F7V3f8d60Gc1ine3oozvVnfUjpXh0O5uWrH09%2BDXXa2a9JQs2XI%2FhpcjDFNNvV7ECBQSOEWOFGjvFoM7l%2Fad%2FeBlFTH7QSu0e54pHrZu9385Kr57K%2BXggxUfVA0%2Fh0n27z1gQlzRiAeWQ75ENvqG0PWM%2BIogD29z7WW1ubcaoLsBiQDuM%2FUI%2Fjom6fs0lPrOaZDKRLzwur2ADFegX81Lyv2bMPbk08oGOqUBZxdtmGFKuyRJIjwu9N5s642NZGef5KFvhF%2F3w8G5d9bGDzs2m9OpSi8huum%2F1ClWE7%2BwXYtGiAEBMfacDk95U3q0mYvabdxfLwruL%2BHAhI51aNVUJL%2BXu1ofhhVjcv58QdZ4KH5JxLdr%2FpZ4EyZ12BLn7ya4qLHvKiqE01wkpWHLN0oeGnqKZiHH1IMPqCxubDTjtml3ixDrIRbf%2FWNVegtKa7bm&X-Amz-Signature=840f13ed3703d02a499eab25f6f63b124ed1c598b365abf4ec3f16fcf763b471&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KR4PHIW%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJHMEUCIEp9PLfxv6%2B1ncD%2BhL3J22r0SJ65B%2Byeovfz9xaumqYDAiEAo1P95hHKflt%2BekWpESR70JvfeoOK20cu9TY1oOib6K8qiAQIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGccYc7x0A%2Fh8tbePircAxCB5H4kWD50gHZGYFqxfO0AUJsD1omERcIeYMd48WZNl7d6AKLB1hDGXFV%2F3%2FJnpQG2Br01GA3LyaYuuNUVp%2FrE09393V5MSDhtfHzudG54RnE96L5vp3t31tykKSzUDYrq9MTDOpcUl4Hkdnp%2BYhKOiF0WILqwhqIC9M6l6mE9%2BNc4GdUiYNmhk4ieNKEcMUYvIv972bO8w4AOvs4VE7ag9wF8E2jp%2BRp%2BKHKSaqYwrtHkgNvYKL9uRNQaHCrpLVf2wFW%2FbIKWls0TTQ0G%2FUBtiLXQdnFuz8r9DT78pCFPO6BEfAdrWvK%2FDbg7f0mi5OtUzYtwwYk7%2Fekq7elRd%2Fll6QuDBRx9fOZOMB5bUwwNjFyjCEsV2GVx9DuJUUrhDFBMC7hv43KaYH3A1CqFDi6uKbQr4RNGwACD%2FjFNKy5DggSkdJ5NN4V6D0RgYGMzUlu%2BtcCPgr6V%2BiixxwBCwXkE64JpJ6%2FMOBCgV1DM62%2F0%2BD2pzCYYzAVjZaY4dKJjY9Qkz68YeRh8e2yKwszp%2BTlzOVStiH2TNLOt%2BQXvcZi%2B%2BzPrGdDTXypg1b2Se9W3hvYE35CVMHsNvBaWI2YYT1Pe4rH6DwC27pOtw8%2Fmk5eNmtH4WLSQXh2x4CNJMNrh08oGOqUBCwaa4kVa2zDzRBKEQ1PvKNgzsrCaun7JC3AvI9qgQkZijLGTOuqbIedjSmia0h%2B4Ru2lr6iGayALoQf%2FFpfqDbdxWGisHOyRicvvDTv8T5Jnv6IX6uYLLFEZWT5Q0htVVSx2aNuLf1AwE%2FuP%2BsmPEozzHzEajsdyt5IelRtBiVYDhGpj%2FIvoSl9pSp4tSdJoWLICMCWTjHb8oQ2cWBrkPtVK%2BnC2&X-Amz-Signature=c910735a80852661b102ea240214fcd3b86561d2143ad607e0eb367d7cdb9ad3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652FKHN4R%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDY0bgkOxGXGPrnSTlynqM%2BeS3pRqQyvfKwH%2FXe6vzmRAIhAKraEKOvwb0%2Fga5gI%2FLUckZhrCbWjszKiJgmwqKnIkEXKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyA8Ex8zQ%2FiZP0biS8q3AOPCcmdAHQxgKmTuzDQzAfhhjihu8WsgwHC4YSi%2F5yLXStqthmg5X9Hb6dh%2F3POTqWkBZXBFjWuS53pO5rQ2jLQI1GpSHc%2FwPoA6NwBYKUX%2Bwuoy3BshqKk2J3YAPeL5YZEwUm5TZYUI0ci4j6fZOtcYWCaz1GW9%2B4ERR6Dfxi2AjGTOqJZJf%2BdKyrf24AjNBccJrJSHdNpTheoILCvEOtVSkbnK0tQK8%2B6g8ptnsD6vKlvDugLoUD8gbMEh4N8pWe3SaOTqb0jZu28k7NngQMqFZKZonk05QjsVhm2%2F1fYYqeBg9DmsZrneIvYeBx%2B6Z%2FI%2Bv1%2BQUG%2Bz5gNV9MD8Ik%2F8GWpTRvFnrdpCM7%2By58vy3PcnZgPJO0nwpUcYNH6viRAN1YY0125DDC7jwKx2wSnXjGHAyiFcl8PC%2BNiIzsSOM6vRulTleoYs5f0E3nBzia7tSTIjVQ0CRMSKXzPMQBR1MxX48vbrM7YAO1QDDff2yxunsookm0LvunGBYTCyDXW%2BQgRGfeAoRzA5bbUSD%2Fl9DR3ZfS0YDeEVI9%2BKmySvqUgoikakf0rNL67e2mUaIjTX1%2FDagBxWSUIWKpv6yNpyLjNgkwZq1XdvETJw1piAQE%2Bl3RzdCWoc%2FX36DCs5NPKBjqkAfOI3k4zbHWK1QXCVt4Tu9jtkbXowRAPsqR9ApmoevNzXswo3n%2B4bpbUcIkVtLbiq2ondTSefM7O0BKW2smi0A4wpuPc%2B%2FZlq84kZIq2X%2B3BtmB8qht50oI0ZmXBm5J2D%2BrSG66UU7YsyPOgwVMS2flA7fvliZJ4oixp%2BNDPjV7b7LqdYIxRXyVrOuFDXFEaiSpiZiRpy5kuhDGb4YKq3RzL6zQM&X-Amz-Signature=b4fb49f7ee5aab3aa05426747fe6d592130c1cee9a8c0322f11e83d7f03a31ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652FKHN4R%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDY0bgkOxGXGPrnSTlynqM%2BeS3pRqQyvfKwH%2FXe6vzmRAIhAKraEKOvwb0%2Fga5gI%2FLUckZhrCbWjszKiJgmwqKnIkEXKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyA8Ex8zQ%2FiZP0biS8q3AOPCcmdAHQxgKmTuzDQzAfhhjihu8WsgwHC4YSi%2F5yLXStqthmg5X9Hb6dh%2F3POTqWkBZXBFjWuS53pO5rQ2jLQI1GpSHc%2FwPoA6NwBYKUX%2Bwuoy3BshqKk2J3YAPeL5YZEwUm5TZYUI0ci4j6fZOtcYWCaz1GW9%2B4ERR6Dfxi2AjGTOqJZJf%2BdKyrf24AjNBccJrJSHdNpTheoILCvEOtVSkbnK0tQK8%2B6g8ptnsD6vKlvDugLoUD8gbMEh4N8pWe3SaOTqb0jZu28k7NngQMqFZKZonk05QjsVhm2%2F1fYYqeBg9DmsZrneIvYeBx%2B6Z%2FI%2Bv1%2BQUG%2Bz5gNV9MD8Ik%2F8GWpTRvFnrdpCM7%2By58vy3PcnZgPJO0nwpUcYNH6viRAN1YY0125DDC7jwKx2wSnXjGHAyiFcl8PC%2BNiIzsSOM6vRulTleoYs5f0E3nBzia7tSTIjVQ0CRMSKXzPMQBR1MxX48vbrM7YAO1QDDff2yxunsookm0LvunGBYTCyDXW%2BQgRGfeAoRzA5bbUSD%2Fl9DR3ZfS0YDeEVI9%2BKmySvqUgoikakf0rNL67e2mUaIjTX1%2FDagBxWSUIWKpv6yNpyLjNgkwZq1XdvETJw1piAQE%2Bl3RzdCWoc%2FX36DCs5NPKBjqkAfOI3k4zbHWK1QXCVt4Tu9jtkbXowRAPsqR9ApmoevNzXswo3n%2B4bpbUcIkVtLbiq2ondTSefM7O0BKW2smi0A4wpuPc%2B%2FZlq84kZIq2X%2B3BtmB8qht50oI0ZmXBm5J2D%2BrSG66UU7YsyPOgwVMS2flA7fvliZJ4oixp%2BNDPjV7b7LqdYIxRXyVrOuFDXFEaiSpiZiRpy5kuhDGb4YKq3RzL6zQM&X-Amz-Signature=639875689cfeb54ead9af94c4847706548a14242daa2829213238332e2f07b68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663K7ZEB3A%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDWhhZQOJJMNJhZxnPMHchTLhHThHaItdUSPJjU481jggIhAPTbUlTpWV0Hk0kRHeXJTlLMD95Kc8cTXIgR7s4GrgskKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzC4fqqQNQI%2BKaZLbUq3ANsQ8PAcVBG2LJ8GVO7flRt%2BCrukcwyeqOSPkjNySCzRst9Lua%2B7QvEE3VAx8urRPddaJkugQYS0rTI08BLTev71Pl5T4Fg9CKXqeUlLKBJ3%2BSTLYqOLmOm7jqKVLwnHDqfzHz6PH32uH47PTzBCzxe2PUJEMSDPZBQ8HSIgBNjB0xayZLdFxdJ06k4O3V8BKKH%2BsiIsKWdOEvCdGqbbt6AERkymseDQwLtr1T9vFOAd0GtQW0ug1i5pXi%2Bpj79bY3U7SsmhO%2BS25ALWry5u98i74ZGce7rJa8aXpE8gxIOcpLRv2GS564wvdxJCDnPR9ORaxHUZjiifvGueYCZi%2Bt4zHGMYcFq6GE0g9ep5Dktax%2B%2FgSUoILDK1oiSTs%2FSMFP%2ByG42HHfZqHiwBYC7ouSRKzqmHCVF%2FGCcDgGfYEgQ7DNEidrkCd7kIohOIxuK3hb9H0nYBvoykgWAi9lusqaMochDolH21j2O59m%2B1Hov44na3K7FYktZ6wVbQTG4BiJmUw2LPYIuig%2B%2F%2B0%2Fmtum216u07yojGmEinO0%2BwfMHr%2B298PSLVt%2BqqDlr6UTpqgM56p0G2rCt%2Bkt9Tvo6A2O9lfbTdzCCE4okEGPqbroOxEAY5Iax8BXc%2BJaZqTCZ5tPKBjqkAdv1BuJxiokmOZLTacptXnbxXQG3Zx2fXwIj9vUoJivxvIgmCrr8ELZ0zT8VPxq8CUY2ip7hV%2BTdOyfEfOJJHipQPMXfvphf%2FUBxM2H6luA4job1A%2Bl0hE8PD9LzcCHisg5%2Bc5bGZmH3eMDBbAdlh5SC6srMdYrlzUxkJA8b8eBRgfz2ggam4OMIedBcYa46shMft90uWHV377OdfG%2F%2Bj5exva1%2F&X-Amz-Signature=b0f3b6655d90decda44f0f09bf483a27243617c6a10537e673221d61f9cd8fd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NJTIRHL%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQC6ffiRn7aDiRfTdYeC9BGCLmkiuZiWNZBy%2FKH%2BSB59ewIhAPwQJQgwU%2Ft8UhnGB5Gjkm2u4naPGNYIeeeQau7IcQzKKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx1RIUjH6DqLF4ybF4q3AM4w%2F5CO3nBSlAnuz96W2KgVaB%2FqJ6WfbPjwJUDzws0ui8vFgFdVLPmHWP3ktjZIkhHh2wRGMPkFzJ%2BKhz5QJx1Gs1u%2FT%2FR3WEj4fP16bYad6cDDKs0%2FDBA8lAtEiEqgOsxxIjy3USZe3Qhr5Cj1O%2FedgNK9IayLac%2FCKDaRIVk%2FMjZJphw4aKbMiM0CNoWxRdEE%2B85H%2BAFb%2FF7pN7fvivRw0OaMhbfjxrqSnrT998%2Fx82Gyc%2B1VB8sW8Ys5Lhng6DKSw20yRaPlFkwNx%2FreZ21bpPOzTfp9SnlqUKNvYG3XDjp84tgu4Zf88Q6yfgE2WoFdgpIqCPEKjozeWTSgIoMWv19BFQiFdeQ7cun96YHmURYxM5PPUaPGiZUPdGnfDMSb7yO%2FZAqa8d%2Bq1QPC0smNfOq981y8shpugsZ%2BFpWLbVRxqmzyebKJ%2BzdURdVt5d0BX7grYZuBUmuaWg7xunXEr0M3MUukkfa3g3L5A6R3Agaijr6oHI2B%2FcV0b3nXp2P7zftSLnuJ5B6KpqO5XZy3BX3Am%2FwMTypBrACPi57tR6hBNkkT5UrOa3gzM3%2BxVZ3YR0wsn7ZGWTId3ev1s6rs%2B0SqHYyj8nI4YsreMSg%2BjUdCutXYYn0ClK3KTDT4dPKBjqkAV83kuXiMl95jhh5WNhqyw%2FW4ZXo0cPsP%2BSKMTAGT5HDOOfK%2FXK2hHNHUhAY1ZWX9cdZJoi5pxvMMQnfZndg2BRxS0Tg6fAlVu3n%2B7JvWjWlEIdywpDoveWrGPohQLMI9UMzuNwIY41pBQ35zwBFRfNjB3VBl2HTmleDsvAR8qbFTsAJitYAV9aiYdlKWrdN6%2B14STddIBsEY85saQtmvpHJfhYS&X-Amz-Signature=4a29c9e0f355234f51d524336bf645fe21e7f383546da3f6a1b00d6d59a336f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NJTIRHL%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQC6ffiRn7aDiRfTdYeC9BGCLmkiuZiWNZBy%2FKH%2BSB59ewIhAPwQJQgwU%2Ft8UhnGB5Gjkm2u4naPGNYIeeeQau7IcQzKKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx1RIUjH6DqLF4ybF4q3AM4w%2F5CO3nBSlAnuz96W2KgVaB%2FqJ6WfbPjwJUDzws0ui8vFgFdVLPmHWP3ktjZIkhHh2wRGMPkFzJ%2BKhz5QJx1Gs1u%2FT%2FR3WEj4fP16bYad6cDDKs0%2FDBA8lAtEiEqgOsxxIjy3USZe3Qhr5Cj1O%2FedgNK9IayLac%2FCKDaRIVk%2FMjZJphw4aKbMiM0CNoWxRdEE%2B85H%2BAFb%2FF7pN7fvivRw0OaMhbfjxrqSnrT998%2Fx82Gyc%2B1VB8sW8Ys5Lhng6DKSw20yRaPlFkwNx%2FreZ21bpPOzTfp9SnlqUKNvYG3XDjp84tgu4Zf88Q6yfgE2WoFdgpIqCPEKjozeWTSgIoMWv19BFQiFdeQ7cun96YHmURYxM5PPUaPGiZUPdGnfDMSb7yO%2FZAqa8d%2Bq1QPC0smNfOq981y8shpugsZ%2BFpWLbVRxqmzyebKJ%2BzdURdVt5d0BX7grYZuBUmuaWg7xunXEr0M3MUukkfa3g3L5A6R3Agaijr6oHI2B%2FcV0b3nXp2P7zftSLnuJ5B6KpqO5XZy3BX3Am%2FwMTypBrACPi57tR6hBNkkT5UrOa3gzM3%2BxVZ3YR0wsn7ZGWTId3ev1s6rs%2B0SqHYyj8nI4YsreMSg%2BjUdCutXYYn0ClK3KTDT4dPKBjqkAV83kuXiMl95jhh5WNhqyw%2FW4ZXo0cPsP%2BSKMTAGT5HDOOfK%2FXK2hHNHUhAY1ZWX9cdZJoi5pxvMMQnfZndg2BRxS0Tg6fAlVu3n%2B7JvWjWlEIdywpDoveWrGPohQLMI9UMzuNwIY41pBQ35zwBFRfNjB3VBl2HTmleDsvAR8qbFTsAJitYAV9aiYdlKWrdN6%2B14STddIBsEY85saQtmvpHJfhYS&X-Amz-Signature=4a29c9e0f355234f51d524336bf645fe21e7f383546da3f6a1b00d6d59a336f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FUKYCOZ%2F20251231%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251231T132528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCXVzLXdlc3QtMiJIMEYCIQDgRT%2FRRPdQPb0lSi0gFUJe1W%2FoHH5e9cZ%2F1rEotNt63wIhAK9S4rjrJQWpSBhpwX0%2B606mzNe0IyXx0byj2JDE78TkKogECMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwsCvkCvyWJJf7GSYEq3AO7XKorYCszgFS6Dea4lK24qRlMCcouVXhvgNeqAV%2B1D1%2FzSCKnRn5WHvVwhlRUYShV%2BGYtPKbl7v7IfeHG66Z3UpyAw8wUgCHRsG1bpuaTrsbaQMfAnf2OlU8UbAVLodvro7M2hYFEypizPAHZvxjGeVmp7%2BSgYwOSgHt%2BvMxjXMLXziDNdGUxcWGgffDUkSfPAr%2FzRHMHVMcT5zH3Wou4BAcYx9rpfzJlgew1L4aSty%2F7LZRbPTgGe9tpr5215bC0H9OPoWhWYPuZIOMvZkdMbJQG7cVL3oC9ukMuMraPjT4L70FV9%2BzQ1Zak%2FGcPGOvKcuNFb1Mm67KJ2vDyNHlUx7oHltcYPIx8KHTGbWwPGnOOkQvboGsH7HlZSg7sZvmcIVxA2U7g%2FLSevT2jdc1H52sHuXwhcbxNF%2B4WFD4FZ5ieE26jkMzj%2Bg1%2BAoUlXUKE8LkdAcMWLAHjMig7Ye3WKIFBmLePCnHgW4McVj5TAkiJgFiTJ4FIeJPnzVKEFsBPqRYZ4yitWOZL%2BQUSy641oO9CqcvFFaNiD569V4py9cvxx2O2vfIg1HjKilkxnek73TJe1h2NqR1zCUSb4IxadKAOK4kvO5XOam0qRNrceMKEj0Aref%2B31SDuOzDO4tPKBjqkAU46LW6YhS5KsOD4WaIBnHZXeEGn9SGBPglLUUOt48a2KQUI9JXVjnoVL%2BcLLshLux8wO2Th8J2My3h8ESHnHFy4ifqu%2FNuqEwKbVefw8V09sspLD5AwT0FkwS9xBAnfps8tS3MdOLsKr1yB%2FBjFlLV2deOBQwL19d6u6cYo2ncBUPvwGxVb5l2imPaI5i7UK5L48lAiq3A4qdSzdIS5NXjz27FF&X-Amz-Signature=4940b03f511bf85b014c8e44aee0071d4dc91a96b48718e1687bdea705694898&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

