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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L3TTIZS%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFsLa6pSBI53BH6xeksnD102f50bjQPEyRRF78ddo%2Fu7AiAPZSL8adg%2FCcic0KjA4mkHo9mClZL%2BNBP%2BQgsWLmfd4Sr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM8LrlixUscEG8Xg71KtwDzu5hT%2FZ1VU4Zm3e6K%2FTYH17D12NTHFo%2BTq1HKdHINgBDTU2QpqP77ifac2K%2B2%2B%2BIvKDO1It0XdWKpwKMmQFdkY8J%2FElW%2FWUoAR5A3k8hjslFegr9rZtfmTDjPictVQeyFQj4gAFXa6PFN0C5AwJ6oz4GKFoUIYV3aRdKjC4nPCYkcUvL9BrVtxhns1fOaDrALDWLHNH%2FlMstHu7Oompopd1IQGwrCKcCyYJeT9wI15gsKpTuTOrki36ZaMCPAQ9wN8gXvM3stGZLr1OHXWDG9myOclO%2BDiQVs5fO2ftihuaOoAWi3ZOrkRNHc2mMf%2F01CtjjxFGoUl%2BvwW3XliBHPqqe73IauUGvQm3OD%2FxBznNCju03jf%2F9Q7aGGwtVSBwHj3V%2FkaKsmZIZmBWtG%2FUDA%2Fu4DDaYr468cijam%2Bv2RGwEt31wVjKdnRbEaQxBXmGzogRF7J7vpoiQJX6wAK51xRQSi%2BjCb6e%2FUobrNMtWO80f%2FeEqXDsUTg7iB397FlOhnNbBFaPwu28RM%2BB9NZ8oyPFFpvnCDquNmWF6xOyy7cpO5vZ%2FzQgF4nnOB71ha%2B7HH2XR%2F9fjEQJ%2Fll4CFouuJi43Y20ETlD3O904FhGZhcwTBmxpuLxpd4FmrJMwx6PUywY6pgF4FXayjPufnbe2BENoovEq%2FTVJNQDw0RInR2iWl5DMpFjYdhu9ZJGXMRBE%2F3QmHdx30fUZJU1roVQVjLu9ME5ZncRZpvAgr%2FlCeLho3sm2reJ7xfMqlg2DCNqzNHJrj2RCgRwuChkuKCForyvqrAHgtjmPNpO%2BZCEQM1BnRCLikBIaDA9JqgK%2FO1Qn3X2j3Aut3TN%2FUvA3pKxz0KkcdngzclVCAaYF&X-Amz-Signature=c183c5f7ebb180aab889f2c3b0a61870254a01df257ef547d203d484469b0b2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L3TTIZS%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFsLa6pSBI53BH6xeksnD102f50bjQPEyRRF78ddo%2Fu7AiAPZSL8adg%2FCcic0KjA4mkHo9mClZL%2BNBP%2BQgsWLmfd4Sr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIM8LrlixUscEG8Xg71KtwDzu5hT%2FZ1VU4Zm3e6K%2FTYH17D12NTHFo%2BTq1HKdHINgBDTU2QpqP77ifac2K%2B2%2B%2BIvKDO1It0XdWKpwKMmQFdkY8J%2FElW%2FWUoAR5A3k8hjslFegr9rZtfmTDjPictVQeyFQj4gAFXa6PFN0C5AwJ6oz4GKFoUIYV3aRdKjC4nPCYkcUvL9BrVtxhns1fOaDrALDWLHNH%2FlMstHu7Oompopd1IQGwrCKcCyYJeT9wI15gsKpTuTOrki36ZaMCPAQ9wN8gXvM3stGZLr1OHXWDG9myOclO%2BDiQVs5fO2ftihuaOoAWi3ZOrkRNHc2mMf%2F01CtjjxFGoUl%2BvwW3XliBHPqqe73IauUGvQm3OD%2FxBznNCju03jf%2F9Q7aGGwtVSBwHj3V%2FkaKsmZIZmBWtG%2FUDA%2Fu4DDaYr468cijam%2Bv2RGwEt31wVjKdnRbEaQxBXmGzogRF7J7vpoiQJX6wAK51xRQSi%2BjCb6e%2FUobrNMtWO80f%2FeEqXDsUTg7iB397FlOhnNbBFaPwu28RM%2BB9NZ8oyPFFpvnCDquNmWF6xOyy7cpO5vZ%2FzQgF4nnOB71ha%2B7HH2XR%2F9fjEQJ%2Fll4CFouuJi43Y20ETlD3O904FhGZhcwTBmxpuLxpd4FmrJMwx6PUywY6pgF4FXayjPufnbe2BENoovEq%2FTVJNQDw0RInR2iWl5DMpFjYdhu9ZJGXMRBE%2F3QmHdx30fUZJU1roVQVjLu9ME5ZncRZpvAgr%2FlCeLho3sm2reJ7xfMqlg2DCNqzNHJrj2RCgRwuChkuKCForyvqrAHgtjmPNpO%2BZCEQM1BnRCLikBIaDA9JqgK%2FO1Qn3X2j3Aut3TN%2FUvA3pKxz0KkcdngzclVCAaYF&X-Amz-Signature=c183c5f7ebb180aab889f2c3b0a61870254a01df257ef547d203d484469b0b2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXCLPDIA%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDhGfuX2fWsYDYXihrejvntDUawY68Fjq9WjY1ZMK3Q3AIgE9CR89HQsFPErujLENzZM%2F6QaRXd16%2F40joWb%2Fx%2BE5cq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDKgcg2hHIJI0tiCVcyrcAwfdf%2BEVVwtjqdH9Ktst8%2FdeIB%2FveNggBbXJMfqUMvvsY8iA9xA43bjNIvUh6s3ydjFUqw2OXdSBXJT3yA6yVrRf1A3aJVUfNdWf7CUEd4ZqFzB%2B1Y0c7Dz1%2FgpMN1ovp37Piz89QktcWpcTGNRPfrrlq%2FBTkbfH7fFZkb7lWFfTO5e3LeJt1kmM8T76JdHr1Xnoi5AveeIpzZYAa26I9HAzth0LuiETVxuxE3qi6TPpDL7acR08cfC8BVA%2FWYZQSIuKsval5HQpUDfX0gZIKlN4ivIKSlHcwCchetPlMWMPffE3KcwnOT7ua8h8Q7B%2FGmHHqTncagXQdvPBtqutxBtWy1ZPDzK28KhWls58beddtPgCFsEyINCXeZC20SjkwLL64phkyzx2p5V8Gqg%2FOYLiaAa3CBGTnfnsYJk9RrkrwnIXzmEQq9RXFMEZKK9SI3PF9GdO4DqcDCFf7qxc%2BAsRv08bQGdtCzgDRZZ15bwfk27C%2BfVbrSrVLLQYUFpq5iioYStipdWy8KW7Y5TXBfgCfd8Vf%2F%2FWK7pF49DE89bqH%2FewpG%2FKrZuozSWZmLcCdjvoA2K1dqzuB8MUvOYwIl%2BqaGh5culbp9d0dqoZ28HNEtYmUjAXJ5ix%2FM2qMOuk1MsGOqUBDmY2rslT4nk1SYu7TWYcFytuOyvOWH0QWKPvuoMI9FRFsOTJkThEULRhqx8ewGqIndO%2Ff8h%2BEQeKK78QjXPjUqA1duPyDePJKliqzK%2FKiRQrY84fnHEe%2Fdz9WnLj%2FR%2FvKlAEjW5%2FNtkGtx%2FKC8xdsSis4Cj7z1%2BwakqIFp8VcI9R7yjE5WqcwLwyevfeDFfqgC4ASmYZ4vGMsSTEFvrdKPeoOKMo&X-Amz-Signature=6a8e5b039db2406b13047f59dec64ecd250b6b5d950ac95f9815f67e7a9b58e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KDF4JTF%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIHYJy3ys2xLmhPoRdG4AthOlWF1zXinucEGVkKvgO209AiEAzF91f0XID8aj3st0%2FohFBN7S1C%2FejNhkGopcptKR6ocq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIBG3iJSabUjG6KkRCrcA097rp9ZZBPhpiGks9YlECyCNPu%2FZyCcK5MBbCFYQXOohxl%2FBUJDxyk14zc6gciXs7dJfBv5Kdf6Z6J%2Bw8QdNRZLhVyI%2BKALQyOcKazB92E%2F4QuS91it2cUkxMao4ro1j6Ef5HvEdGdZLVV01sA8QKvOVcTMiebv6IhQFWLK1J2JBKOWtYisKRVHId31PNibM4EF8m6umrF9jYUTXNJksZjFBJAHdkbBBQi5qRV7H5N4zz3CNj9MBnOEDHNe%2Fk3rJPgWy1ZTrfIMVOVqSjz5mBTmRJ19Te%2BZPxAW0bkq0hG6NlDBCV61v4JSuDO9FLO%2FTGVWaijMUR5%2BLZLZMv1dhEyR1kKKY2n3zJsfwQFJY2URhTiHNfufVCqU93czr7zfo7AMkTTfqpBMCwwruMr06COuqM%2Fixsk3HgXMWbN%2BvNh9Yq855BQojHU7tt%2FPlfrXiaSeNGcH0qibokownHqB8bQO1oiiBNSjREWkt%2BesEYxbU5S%2Bg2VSlxxYNGO0HNCTo120GcjXOeEOiu%2FTUqxyAyJkCCcWRjYrI4HvV%2BCvrZleubF%2BYjetsev%2F8mjyrJmepMQTwhKzOfNKjFvgg2qKc%2FG0jQrVTh2lm%2BsIWOeP3f%2FMgu013TY2cYsG5mafMNyk1MsGOqUBX9L7WZuVDKe9AIsojPzkGPPiLxF0gk3HxMJropRHe26ndcv5Po3MUwIf5STfhR7BUiDOSH5yzhk7pLLFlxceeW0Qr7dDSFBYTU58KhRIEkBFIixiwW1VAEREAvmXH3X%2BHR53GkP2fMOlrwmdq1wkJ9RpuSYsSI6ZXFziT4MJzFJON9zmslAiArIlwrWuHS%2BbH3epqlrufd7PcmQl6nlKK%2BFESbZX&X-Amz-Signature=057c984e26d09119a0dc25e009d90c6fe179a9d7effe594265d0d0f4f1df0857&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KDF4JTF%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIHYJy3ys2xLmhPoRdG4AthOlWF1zXinucEGVkKvgO209AiEAzF91f0XID8aj3st0%2FohFBN7S1C%2FejNhkGopcptKR6ocq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIBG3iJSabUjG6KkRCrcA097rp9ZZBPhpiGks9YlECyCNPu%2FZyCcK5MBbCFYQXOohxl%2FBUJDxyk14zc6gciXs7dJfBv5Kdf6Z6J%2Bw8QdNRZLhVyI%2BKALQyOcKazB92E%2F4QuS91it2cUkxMao4ro1j6Ef5HvEdGdZLVV01sA8QKvOVcTMiebv6IhQFWLK1J2JBKOWtYisKRVHId31PNibM4EF8m6umrF9jYUTXNJksZjFBJAHdkbBBQi5qRV7H5N4zz3CNj9MBnOEDHNe%2Fk3rJPgWy1ZTrfIMVOVqSjz5mBTmRJ19Te%2BZPxAW0bkq0hG6NlDBCV61v4JSuDO9FLO%2FTGVWaijMUR5%2BLZLZMv1dhEyR1kKKY2n3zJsfwQFJY2URhTiHNfufVCqU93czr7zfo7AMkTTfqpBMCwwruMr06COuqM%2Fixsk3HgXMWbN%2BvNh9Yq855BQojHU7tt%2FPlfrXiaSeNGcH0qibokownHqB8bQO1oiiBNSjREWkt%2BesEYxbU5S%2Bg2VSlxxYNGO0HNCTo120GcjXOeEOiu%2FTUqxyAyJkCCcWRjYrI4HvV%2BCvrZleubF%2BYjetsev%2F8mjyrJmepMQTwhKzOfNKjFvgg2qKc%2FG0jQrVTh2lm%2BsIWOeP3f%2FMgu013TY2cYsG5mafMNyk1MsGOqUBX9L7WZuVDKe9AIsojPzkGPPiLxF0gk3HxMJropRHe26ndcv5Po3MUwIf5STfhR7BUiDOSH5yzhk7pLLFlxceeW0Qr7dDSFBYTU58KhRIEkBFIixiwW1VAEREAvmXH3X%2BHR53GkP2fMOlrwmdq1wkJ9RpuSYsSI6ZXFziT4MJzFJON9zmslAiArIlwrWuHS%2BbH3epqlrufd7PcmQl6nlKK%2BFESbZX&X-Amz-Signature=b6737473ea979940dcff08bf43b53d4dea09e7d006488516226c85f6b7f9f3e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZK3GIN4F%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHJZIxAOvqdmuWFzI6eUrBIMXGitOQU37i2N3TAD%2BCIGAiByh46tUdhkJFbV%2FafXnlf3010JASOGunRG6CvBL%2FVVair%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMMXNbl%2Fa%2B2P%2FYEdxgKtwDY5Q7quQi8QpNcjXWfy3P3P9rJ%2BWztNkJvjdcvKF1%2BNnchQR2XwrrreeI7TddjrgwWepBGII2wjFQAmXnsdtoTllteauusODscgUxty%2Ff9oLPpu5SlRjHKoUlvI%2Fka26LYnL%2Bxdt4ww5DIQ2IlcbtOZwinub%2FfdY243cB5FB3a%2B7FyesqKknLBNrBUfAdfsO6b0hM%2Fdn%2BkGMmTFdaiGl4Np7CrbCdEz3WFsCiQll1NLGY4JlUruhNGYXqcrQb2bCnYnmRNrgxWm8%2FmMMQYThX0HsBl0ep7xi9ALcblZGc%2F%2Ba1S4bP464Rfp9PQ0mqRVTFMBiW27UthUt2VQTywwCZnqHKy8Uqm8OK1qMk%2FGSMttnfHNS17LOVPov2XGBzPmb3pk9DayFurr7IlziCnHIgd8pDvenrDGACWKbyh11migaRi7jBtjX9Wn8dQ2wrs88fTCVdhRirSvxq3mKFR%2BeUwWKzvvzMqFXh25qCfAS501f%2F3GP6fTTPbRQ%2BVcIFG2fVnzuQjZMZaJ8YI32AQbKVmFfghV%2BYFjcJ4cUtsCi0491308%2FseKATI3LG1vSpaM9LAUfv8VWfxYt6w77CWkj2LU6lfK6weHEwyh7UY%2FYl7uqLFzgr50OXn9ISQuQw3KTUywY6pgFIwUP8%2FJCeC%2FdHzpeGCthUuWPlE4PpDO%2BD%2BL56ane8Stf1ct3BfCRJ0900NwQpG9FQYlfck%2FGbXlwob5p90I5cNCrCwel%2Bw9PF%2FxmVUyb%2FxyJvPX06q%2BJWFSqSoh6ioMpg5Uek2uqZD%2B%2FonUZ3q9CsYjCtNwYGHZqIIZW5JgyW1emL137T%2Fzh3rwbQHHAuK1%2Bd7QQpu0UiFuDfk3ioOKXNAh03h0bA&X-Amz-Signature=0ad31792531ab86fdbec4db78e3d082d4f7c5bcd79fbb0c403df512f94460703&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZJDMBXX%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQC7dq1Zv3Mufx1icaQfdgMRpaz9L%2F6HZHyAmluGnBepWAIgRf2oX832kHr27sAfNRppbYYc7b%2FZDQlDEwNmkLNzkzEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDJFs%2FLSShaoNK9j8NyrcA2nvFvs7RFV6DgM25YHLDKle%2BHd38f8Uh3VL9BtWQTkjuZ2E44WD4oGSyUhe4y5e6F2ClrBOPayKaGtGBeqsMPmPQGNutJbECpsZsvyezH5P6SHmgx%2BQBKYV2QZNatDgzoMksBm843JS%2BlsAVnr8nZR4JQWkV71hGyVAGyEqOWWPkdv9TQpECMMIBX8V3NnyIwA8%2Fj9%2BnOc%2F4DNJKlla63iHy6%2BqnL70XSbOPRuL95G5I%2F4dh33E57bZ6nRNrZ1G69NH5Uto7w0X5BXXWsnEeIYMMyvWO4ffJlZi%2F2QDrtlkH50vfmf9z6IxLvIlIvfaq0sp7BHvGxkQI80fmT8qv8fRnKuRlI3sUSyaSXyc%2BLt4jE%2B7WCDiL%2Byt34eTSib%2BmuNr7aJP8fUc9I3qK2ULnOErUG6%2FAimPMg0925hfF8Yh0qmEZJ3tn4z%2FJWNhlGt0b3BZKTUuR2aq9F1eBPz1ZYoKDdrdTA%2FSnHI1lX5WIjQcNiObOwLPmJHfWPDu9KELDdkNxlsHeplKGDGQSajQvxIgBSpLN8ZOxhBeR64jjZXune96zWw4ge1QJRKkARgrCLlhWHlkf3ivZuM%2Bwz%2Bc0Xc0t1VVt8csHXMFJzDfAxLYM7eq0rZBbjUK6gojMICk1MsGOqUBdoVihnxrsr16JE0LQrJ4cSkiqcJc9%2FN8gADVGoEqCBawwX91DUvIqB4jnI8%2F5IZlTtRZUT9qPTzjCaNVbJWWioJbBoVKYaJNm6LAaTNt7104YK7SjGUBmkRmsWf9iAkDLdesz3Sqcc85UMfwwxJHM%2Fd61Qi%2FW1QqkRJEf5rAyRiqJKnkMkzkkdmxNO35%2FIMXCOcmNbPetD11Xt6QK6V%2F6wmlUP%2F7&X-Amz-Signature=0e118ce2767a070b8485f13044da89c9d8465b16d5e554c091b0ef37c920735e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEFWAP3A%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDkSfRriANDx3TjiHCE1jA4KWdw9IEgsPMeFCAGpvlQogIhANqv%2Fnvxy0zmqR9AIwpMZMTC%2Bcyl0FECWns8ybl5aXQcKv8DCBQQABoMNjM3NDIzMTgzODA1IgxYDdMhptzwgtF6H8Mq3AOEIzuhEQ0vN45W7OcuA5qJoT01CNHogf7HDBr58FNTdCAbFrABKgaqrBxGHBdwlqVrEfCQ6X1J5xDZHBSklCPEXmhAMiLr4PJtXd5EN9puFT%2FXsdoncKPnHZw1sapAiQX1%2B1k8vqycwpLhveh2ebCc8mzL%2BhN1nI9SfCv7JNzvXM8RWuuHEbpmRg6%2FEXF8dQpuqw4rKyaTzr0ph54uE40%2FlyI3IJz7j1M9SWSd%2B26fUQmN2aubIfktj5zi2im6AqvCtuVnjUE3pcqLqcLKVkiPaqdz4DXHZjlkmZhS8h66yDiJKJwg567C9OFYFZyvopd%2BgQXLc%2FYY8sx3ah7k6ROwv4TSCBlyTxs43eI4GynaLsmDkrycziKFO7ZmKotAaAl9bWZ8NoKOLaevJoBUyiwq6RT4cBD%2B9mEqouZN4G%2BWA2Yn68DnNhNoiPEVPV9S5i9r0e5hfMeaL%2BPfrZ%2B%2FLVtxCok7u6eHBfrEgZ2hBSRAgr9rdtWV%2BmhSVsOaxptRKqORD0DoEKdJoDWLbFAOjv2oRF%2BhmVBLDFo6g0XVaB0e8aSWmIoPOGAbch5zv8w22ytty7pc10cXBgo61Ukb7xGPO8PEHvkg6wTCHThz%2F5qIAjhbA5Oh2%2FdY6pM5zjD%2FpNTLBjqkATvfNUixbTSY7kEwIcwU2UcExCDxk3UmleVfkZmCHJT%2Fx%2FwOPBCNn34rI5PV6%2FObvAfXIaaWcsGB4j3IVXFL01Ga9ujF5tCzuBWkRF%2BcY%2FsmuAO3cV9mo2EuHyiOqno9Nmyd%2B1yJBPeF7mIRPEPQ29PNeWhbV4SzqCNAtEK76gcR9f2xxBc8jFgYzMuQgp71EFNHyoKkCYtHTC4O0NxUwNWf43UL&X-Amz-Signature=6f42d94723aa3ff1fc08a2556113e321e5c50a2a81be57baa5dcd694c17e0299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGTHVV7I%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCICWITNmwVT8uHhBfKndgGtlDUezlXFKlURHnIYH72%2FGpAiAWrFyfFL9DSQTuUVkqaZeHUduDMYgNeKWFq%2FANuuCBJir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMUy2On9EMYGWEYf3XKtwD3OFJ5NLJZC9zCZwm3hnM9Nl4YXaN%2BTbCwRB1HvC9AwpgKsRA22VgS1viRw6BG3VzzSyuUbsYxtSQJojoSKFaoAo63AzFrbpYafaE9DCeXpNNRmGwu3QEe1fxYMZ6viconIYu6wm0YruK9zZ5qaBQgrWIegjR7pjg68FSHfPAsjb1abIKrtehCyYlZqKRsNywKXS2IQwR1JmsWxISgz3KQvfdQepMQ1zvSg95R5%2B%2FpdxSujyBJzBpgem8EebpCdMDrSMdsNqoVW%2BEoXv2pRILzPa2k6P1pAV2R1qnJeFJdMaTEe3DP3A07zHmB64OHhXgdKtk7yTJo5Y9407c6vd2ECw3XaKW9mMKxF3AUivbek6lCISQQRKRIsGvphlgaTUhp3c7t9Vpv4IuNuh9Iz1AKRT8702m7Pf%2BQFy6Fi47BcwE55gHgsRCMp6vPGPd7roiOG3TtKEKD6d0Qr%2FMaoKuAsPUHtm3mN1XOhlZQeLXDaUElI2QIJEiAt0z3qC29rX7sScgMJtAKkMmsjwMgvAAb%2Bw%2BPPxrIcYvoIQjBc8AEkFwYC9RqyLH1vCXffmhZx%2FDvW5dWrh359rTIjTZaqbbHt3ZCiepZSmNmHPeJZWPt9i9FTf4K1xzaPxhbkcw7KPUywY6pgGgg2CeMJOi63jOMd7xl3AGlsW%2BP0tJZUejhn1byf%2B7vtA0pzbJr61M5QlYdRU1GHw%2B%2Biw0P09KX82Cmy0DUDdvbSvbA%2F5p6E5b38OTyEwrpylR1wUC6KSu2qFbU5IbOhEC%2BA5bYLenmVRGjvdb8PiKra5MPjEiHAohLhllXgpWlQQLpTLB2Bxc2A2B5RgdVkoapqJ7lI4lVJ3lr%2BGSIcpGsoszpXEk&X-Amz-Signature=7a6e162eecebb452f248ed482e32caaadec38a7822bcd04a19f64bb398331ce9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGTHVV7I%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCICWITNmwVT8uHhBfKndgGtlDUezlXFKlURHnIYH72%2FGpAiAWrFyfFL9DSQTuUVkqaZeHUduDMYgNeKWFq%2FANuuCBJir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMUy2On9EMYGWEYf3XKtwD3OFJ5NLJZC9zCZwm3hnM9Nl4YXaN%2BTbCwRB1HvC9AwpgKsRA22VgS1viRw6BG3VzzSyuUbsYxtSQJojoSKFaoAo63AzFrbpYafaE9DCeXpNNRmGwu3QEe1fxYMZ6viconIYu6wm0YruK9zZ5qaBQgrWIegjR7pjg68FSHfPAsjb1abIKrtehCyYlZqKRsNywKXS2IQwR1JmsWxISgz3KQvfdQepMQ1zvSg95R5%2B%2FpdxSujyBJzBpgem8EebpCdMDrSMdsNqoVW%2BEoXv2pRILzPa2k6P1pAV2R1qnJeFJdMaTEe3DP3A07zHmB64OHhXgdKtk7yTJo5Y9407c6vd2ECw3XaKW9mMKxF3AUivbek6lCISQQRKRIsGvphlgaTUhp3c7t9Vpv4IuNuh9Iz1AKRT8702m7Pf%2BQFy6Fi47BcwE55gHgsRCMp6vPGPd7roiOG3TtKEKD6d0Qr%2FMaoKuAsPUHtm3mN1XOhlZQeLXDaUElI2QIJEiAt0z3qC29rX7sScgMJtAKkMmsjwMgvAAb%2Bw%2BPPxrIcYvoIQjBc8AEkFwYC9RqyLH1vCXffmhZx%2FDvW5dWrh359rTIjTZaqbbHt3ZCiepZSmNmHPeJZWPt9i9FTf4K1xzaPxhbkcw7KPUywY6pgGgg2CeMJOi63jOMd7xl3AGlsW%2BP0tJZUejhn1byf%2B7vtA0pzbJr61M5QlYdRU1GHw%2B%2Biw0P09KX82Cmy0DUDdvbSvbA%2F5p6E5b38OTyEwrpylR1wUC6KSu2qFbU5IbOhEC%2BA5bYLenmVRGjvdb8PiKra5MPjEiHAohLhllXgpWlQQLpTLB2Bxc2A2B5RgdVkoapqJ7lI4lVJ3lr%2BGSIcpGsoszpXEk&X-Amz-Signature=79575188d7d27d3cef4679c61960e93a20e7e5f17a3e6abd98e34cc241d5cc4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466326WI356%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFP0NFZ5joyBCb%2FLgnQbRGv%2Br4PSGPboZ3dfdYGQUCuYAiEArUW0MeAS%2B2r00GaStadmqreWwAg8dQPZbyBpvD%2BrZTEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDBWfjsZmEjVvZVN3PCrcA2CogPwKIaGqBfRu7QzzmVYWqWj52GV4EBADXw51QszrwPK6xJ8VYIidG%2F5qtLVnAr9EizpG1xNzQqFL2mC5HR%2Fy%2Bn3OWCC9JRpaTQBbrRDMzm9fjN9FhoN%2BSdSvsnSDBgujcwSnEbvoNtn3PqGjCo5hJdrDHLQ2VNWjJSFdptMFy0zeXNn2qC1kiGlqPJtT7XKQQ8OE35OKVcpq%2FulK5D3Xm%2B5MKkzgrmAlYjWgv%2BGcsC4yMKMmPIxtNsS9THZM%2FSTZMIvT5iqbTceTWISYCVaarH91JWlXef%2FlUnCLE17zTmIeiaPklJksNHwQZ5heGXJnHL5N3mCJdekdpNt4uc2oNqw%2BN7gFJGWjNJDoK9VYZIxEAhbgYhdh%2FIPJ2%2BhIEFq4L6bdDzrVVb%2FBu%2B%2BeGbUFyCzeoAhCsKy0%2B9D46KWSOex14dRm19vabfv6omM6%2BulbXWZc%2BgjBvJawfFeiXXhA8JVY6YlzdyFtfDhfOTOhrXadorglou1C8%2Bt2RZzv2DDOPltWOUpE7d7r0pTISJ2KltECFQxGY62rPOV%2FqX1YTO8HR4I328h29e4vnhzefT1kfJo3t5jJ23F8DqtTvt886IEy6Tgezb0VlsOXdVS9WDunP7LcFN9Bh7BWMMek1MsGOqUBYaotjuWL7XYjRlIpVW8FJ19wB2JYzsJln5k8jh%2Fke%2BHAjtLgp0jOd1YJoJMgqqqsil9GUd6h5yZretMII0sr2IGIbKaX33HcP82VtBEtI0YmsJ7DHKjmqT7bOooxtipDxmr%2BAd%2BkQlyIUHU87C%2FhaIw1iyofdYJbJ6gZBI%2FYhQ%2BqaLOwbbJZAVRgzcRMyXBpcfFFjWxFB23YfXfG5fHNqsZdlydz&X-Amz-Signature=ae6feba2f4ed5b1443cc110ac81d536669c84996cbbf9731cfa584d4e0115b26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666MDQAYZ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCPAT%2F%2FBc4p9X%2BWmilTsREOXmfrFJLUIoPVWDMNoKqWQQIgT6LlInxSmRwC1T7VSIFHPE0UQfPjrFMsd4Ht5OvyhFEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDMbpBfk0sBfkJqBm2CrcA0bkrKf4jOmDdm7kaneupc5iGZ55TeCV26y0RrCxjAvUmm5xIXnjdM2SdQnHAAQc1F5RRGCevV2GljpuQLNhSOYUZJPDYzpCqcvgqLdH2zs4%2BMwz7yAbLtFm8Dz50WuQ9A4jc8w12Ov8H06%2F7jttO7KGCa9wxuGCxIAHRnCrBC4CAwh2bkPYH9j2WRUO8ItbhHQ2G6w80C8cqYqhYVTFbJSJ%2BGdKC00ICnvJMH0CGtzyLEGkLLNGIEQWD9BSM1vDBg4m%2BC6rfazByxZdp2Z8gP%2FgB4ldHZprJoIwakcSDu6Ns8%2FptWUf5%2BU5SMXDhpkFc0EQD0lkZJOn9DPQgf73MDfKgS4yN%2BN0JAYl3t%2BJVzifGrhJKo%2BWutTuo14yEcBvEe4uKYDfHmUFUf644bEIP6xB5zkGhkUhll3Ugvy%2BSbPNq7qXKpqKsRCO9KixdbcdaYKfOpE5W7fDCwWqaCjzfp%2FVMCcJ93FRhgkiAL0gvu1gTVcbMa0gHHO4jkt2wMboM%2FYdNJrNs3gs9gBpvhKD%2BAVReCKzKYD5UykErnz45ZRkztLl0Lc8OhvkOk7I79JNdHgzLDg%2BDpeK4jgbuin0H87UkAoF3v4BGzHK7MjkJxrKtsxNkDBGFmLQglDbMIKk1MsGOqUB67hw4XUZ6E%2BPAK8pNmNViJjSGW4kARfu%2Fh12NawzPJ6Qxg%2BnU5WadS%2BY8SAgqNM2URVW0eHdgT85i4sCBdpZ4ycYMUWCVDabGYyxN3Z8ZLtbGZtyCQwTSwhUqLAKuz4PyVB1rkmqwScGdKlgjCC3ugHGvkSJCEt9AMJGRybU9gERIas0ULsOIkVpARTva2FCf%2Fq7S1xlA2Tl17o%2BbUy%2FJjrgVuOh&X-Amz-Signature=9b1bce9cf52a54139e9bf287ff82d12ac267c5f4c7ed6d9677800fd0279ed4a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666MDQAYZ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCPAT%2F%2FBc4p9X%2BWmilTsREOXmfrFJLUIoPVWDMNoKqWQQIgT6LlInxSmRwC1T7VSIFHPE0UQfPjrFMsd4Ht5OvyhFEq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDMbpBfk0sBfkJqBm2CrcA0bkrKf4jOmDdm7kaneupc5iGZ55TeCV26y0RrCxjAvUmm5xIXnjdM2SdQnHAAQc1F5RRGCevV2GljpuQLNhSOYUZJPDYzpCqcvgqLdH2zs4%2BMwz7yAbLtFm8Dz50WuQ9A4jc8w12Ov8H06%2F7jttO7KGCa9wxuGCxIAHRnCrBC4CAwh2bkPYH9j2WRUO8ItbhHQ2G6w80C8cqYqhYVTFbJSJ%2BGdKC00ICnvJMH0CGtzyLEGkLLNGIEQWD9BSM1vDBg4m%2BC6rfazByxZdp2Z8gP%2FgB4ldHZprJoIwakcSDu6Ns8%2FptWUf5%2BU5SMXDhpkFc0EQD0lkZJOn9DPQgf73MDfKgS4yN%2BN0JAYl3t%2BJVzifGrhJKo%2BWutTuo14yEcBvEe4uKYDfHmUFUf644bEIP6xB5zkGhkUhll3Ugvy%2BSbPNq7qXKpqKsRCO9KixdbcdaYKfOpE5W7fDCwWqaCjzfp%2FVMCcJ93FRhgkiAL0gvu1gTVcbMa0gHHO4jkt2wMboM%2FYdNJrNs3gs9gBpvhKD%2BAVReCKzKYD5UykErnz45ZRkztLl0Lc8OhvkOk7I79JNdHgzLDg%2BDpeK4jgbuin0H87UkAoF3v4BGzHK7MjkJxrKtsxNkDBGFmLQglDbMIKk1MsGOqUB67hw4XUZ6E%2BPAK8pNmNViJjSGW4kARfu%2Fh12NawzPJ6Qxg%2BnU5WadS%2BY8SAgqNM2URVW0eHdgT85i4sCBdpZ4ycYMUWCVDabGYyxN3Z8ZLtbGZtyCQwTSwhUqLAKuz4PyVB1rkmqwScGdKlgjCC3ugHGvkSJCEt9AMJGRybU9gERIas0ULsOIkVpARTva2FCf%2Fq7S1xlA2Tl17o%2BbUy%2FJjrgVuOh&X-Amz-Signature=9b1bce9cf52a54139e9bf287ff82d12ac267c5f4c7ed6d9677800fd0279ed4a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XACKSMLO%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T190713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIG6iEMreegl82qWpP692ygRBkkT52X2YLXUcFbfii2JuAiEAqXgzrH6ytBtuskm1emMoFlVUhfMbveKfis7YAIpRxaIq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDBE%2BL3TUAG4ujOEyTCrcAwCWxsrDNT%2FvxuC8gUuNkVV8TTzdTNjBQhhtEnEc0zTE44VFxhXW4zkcxc2rYb5Gp%2BIf6EZK1khKDwpUTNG2HTpYXmpsXRe2dMrHrR6c3cqEjD3uiCwkvvSX9Tx2ozDeUxPjHut1b6kCgH1pUdNr6RySKQ835xgAG2muFg2mHYErtMoQs%2BB5jqKBIIhqhcYr7hWOA2%2BUOHzPXufn%2BwkJiJwstH4vCtcK0%2BJtAln0MfFzsqHA9zV7igCYVkAK4P57s9NM%2F76%2Bh4CBR9%2F4T2SyYfAil%2B9xAq2Bdw%2BRdq8PygtnC5eyjvRO6bXjGWD2Aj%2BaM6%2BZrN6DjmDUqWg%2BAoQt4pLcmofmwqQXBGIpK%2BoSaAmb0gi3sIHNTK98LMVO7fiXyd87EBBGl3i925sOTFcuhJtOshNOEVsAPh25RdsYVjFxODZ79bEbue422GLmGkTCWYECjXYQbLkzUOhXuipAwRdxUE6L2nis3S%2F3FN6ATgSb1WzMEwcjEDXx8FwkNpUZncedkoqJzT%2BCNULoCOtZiB8uKyRz6xAmqJj5LIgjDkw7Nj9TBTTlXK3eLTIph9KYOW4Oi2%2BILCa91TQ5FY%2Fu9fINB%2B%2FqUL8Z6Z99%2B8CvOyg3ZXI8Re3J6dDl6N%2FTMIGk1MsGOqUBTVa62jFxWc7jAlQfYQxPDV0kfuQuNWhBlP3wfA1hK87HPR31az1zBwH9eixOaPqcImEvjZOy6b%2FOIhYeKWzPI8Hh13vKDIlJFqebR28r%2BTUIdPmUypCLTabdEGH%2F2G8XHy8XvTgKE9ZySF%2Bp%2FMcX8IRjWstvzobpqfaMegedjocLPvoPmIbvavZkCedALFhUZV17N2SC%2FA1zsfHOgjkhT5w7bxop&X-Amz-Signature=91152000e061d47472362f31d0f66120e0a49da4ccf7152dc737f0521656a294&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

