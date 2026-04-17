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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ4QJSBB%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIHMAkJJMH2bwyES10ix3BQ%2BX1w9ZGmrpRVaLtEL%2BXgLMAiEA%2FPuopgpC%2B7Glvs7muSzg5aFcrNclUIqf6WFBlJwHYSAqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM7A4uNpPHR8U3nPsCrcA2ogJJhOXOUICyRtzKYu%2B85z1%2BCftbPf1SYY0PiZ6zjGDdho%2FBtJBtreVpFXNtffbALCSBCn8xDbNN5t2wRlbQ%2FgeaD8rKj93j5k9cMBwk0Yy3j1w7agflpOSrJPiGcc188sxwQrOKxwrQNPaYohoJIU6PIsPYtga31%2BG7bYdt%2B9pSI38DZGDPDAgPUGvlp4sioyhtYzZbGAP7TCEmuank9XvfMDzqnSlKFUKDbwzD4H%2FsuMuwdCy3Mr0sCY%2FwKPMwzYgY%2FhSXPBWr0xSIWQez%2BmKKqGQDX6WXqG4hDaP3EvxpOdkfGdCjXFn5YIbu2MuL%2BllPYo4p84RAZIvQuv1dnL3PDvkVN0MKW8VaPF4MJnqBE5pF4IpSTCg%2B7mH7043gwXnSExSZbk39mZJ1nG19LKazyEnzzQGachTYPtqRAsRxskdc1iJswIH1RSfI9mMnn4%2BguYlh%2BYEVq9p79gBtiLhLNqA8h3YdM8nhwTMVZWu%2Fl9R%2F4xda5iD9BeBoIepYarYcsI7xqyLB1LeyJbyYkFLJ5%2BVDoYrhTg90wVx6rcFa82Eza4%2BgV7MJRGwjz9%2BDVfeKeBVCBOtZ3a8PQXDDGiIySdcJmz6GEJrjw2fti25aYaimtS2%2B%2BCsLiCMNnfis8GOqUBmoFeVNpoLUFowGk9pz1szqqUYbaCh%2B3Ar7U8e37vg0VXhdvMpWV%2BAtSAMw29N0jnQz9Ro%2BSgYF3CoSey7Ny20UWf7jLl7XsJ%2BNF1YlQcekWhLCgV8behFAbgwtik09F%2BsPKP726w8OOT%2FXwYli4FsVTwzVIullzJcoRpgJhtQi4mMxbMFyNbWIwwFwL7tFo4kKdrkRvbueLSWh2FqJgVzQ%2BR2WXV&X-Amz-Signature=9d821a31d93b42410251ba4d488bbeb791dfe55a98c85fb8c94b673add33ae32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ4QJSBB%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIHMAkJJMH2bwyES10ix3BQ%2BX1w9ZGmrpRVaLtEL%2BXgLMAiEA%2FPuopgpC%2B7Glvs7muSzg5aFcrNclUIqf6WFBlJwHYSAqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM7A4uNpPHR8U3nPsCrcA2ogJJhOXOUICyRtzKYu%2B85z1%2BCftbPf1SYY0PiZ6zjGDdho%2FBtJBtreVpFXNtffbALCSBCn8xDbNN5t2wRlbQ%2FgeaD8rKj93j5k9cMBwk0Yy3j1w7agflpOSrJPiGcc188sxwQrOKxwrQNPaYohoJIU6PIsPYtga31%2BG7bYdt%2B9pSI38DZGDPDAgPUGvlp4sioyhtYzZbGAP7TCEmuank9XvfMDzqnSlKFUKDbwzD4H%2FsuMuwdCy3Mr0sCY%2FwKPMwzYgY%2FhSXPBWr0xSIWQez%2BmKKqGQDX6WXqG4hDaP3EvxpOdkfGdCjXFn5YIbu2MuL%2BllPYo4p84RAZIvQuv1dnL3PDvkVN0MKW8VaPF4MJnqBE5pF4IpSTCg%2B7mH7043gwXnSExSZbk39mZJ1nG19LKazyEnzzQGachTYPtqRAsRxskdc1iJswIH1RSfI9mMnn4%2BguYlh%2BYEVq9p79gBtiLhLNqA8h3YdM8nhwTMVZWu%2Fl9R%2F4xda5iD9BeBoIepYarYcsI7xqyLB1LeyJbyYkFLJ5%2BVDoYrhTg90wVx6rcFa82Eza4%2BgV7MJRGwjz9%2BDVfeKeBVCBOtZ3a8PQXDDGiIySdcJmz6GEJrjw2fti25aYaimtS2%2B%2BCsLiCMNnfis8GOqUBmoFeVNpoLUFowGk9pz1szqqUYbaCh%2B3Ar7U8e37vg0VXhdvMpWV%2BAtSAMw29N0jnQz9Ro%2BSgYF3CoSey7Ny20UWf7jLl7XsJ%2BNF1YlQcekWhLCgV8behFAbgwtik09F%2BsPKP726w8OOT%2FXwYli4FsVTwzVIullzJcoRpgJhtQi4mMxbMFyNbWIwwFwL7tFo4kKdrkRvbueLSWh2FqJgVzQ%2BR2WXV&X-Amz-Signature=9d821a31d93b42410251ba4d488bbeb791dfe55a98c85fb8c94b673add33ae32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T672GUUT%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIFske0GV7ClxyQym00Ebkihmvtwj4vjlxUj%2BA5tMhdu2AiEAurduBt7TXTV4ufqzU7gW6ZYqMsYtDalnGqkgtemzsoAqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLNoQUWp9sTQs45B5SrcA%2BRLhD5ZcEVUwMMfuz9t7R6HkmxNSJjmerdb1btpbuT3fbUKDQmw%2BlgBmTfC5aimALtok5V%2F0cnzCimW43XzuhTfNyZ4yB7MvF%2BEz1fFiOxexvQk%2BSC%2Fl%2FuSWYmDM4PAGdtPZK50aKV1kPnLX4X1rZZfX%2Bbv%2B0Bs8V7g3JJCnEhAdPcS2XuIBNYTqqPZERcp9QqOTb%2Ba244PAWgUhndE6GvecKGdvvQBII%2BGOVSLoTVg5T%2BrGznVCaGTWpUU5CFBAcxdUvRvL0%2FqnN2nfsM5QhUgabYPcB8k7PURCSoHz8JVg0CLguW0WYz%2BgSEJL%2FCzEHpVCg3jFb5yI3A6EZBz03Knbe9y9PY5As%2FLGuGC3D6jpVL%2FkAc%2BFiFBN9mq1gPaiShE8Ocbk5h0K6zRtHqC11vXVzG911nsZ5jlH06AHXnogQYCZhpKu1%2Fz4H1Gmd%2FvKlXbwiNGv7e5MtUR4%2Bad1yJLaUYeq8biR%2BOoSj8TQIA%2Brp6tQIn7coyna7MKRaVlATSShFOaTTqdhh5v3rCHDAFLq9Yw%2BjLZkqQJ6eDajZJkjTncU84MTGmC9BlRzd3hQKy4JDmDBuB7CM11SOVCKFvL9tfdRcnaXqwduszFaY%2Fba8mt2stfJ4KyI1VLMJvfis8GOqUBOzWZqwYyv5IG%2Fs0radMyrQirjcIR6wJqJNO6n%2FLPz6sYclCwc1Y6X2HRHiO4e0k4rZilIw3EXRrl4zg780BDJgNjalwoCV0y8qDCcAP%2BHZuUxBCHpiFby3VxqoiDzKoQ1S0%2BIMbXmDCAUrGyVB2%2F1op954AOuLy1KVN%2FcohbLLn7ModuTYmbLbh%2BkMUIfJr4Za3nVoelQ6oaf%2FPRD%2Bl%2FQtPiDjhU&X-Amz-Signature=c858801d9fda1f611a30e8f26057f2eef39b34dc8c4a5acc5637cd5a3ad639fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662PU4U66%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQC0Fu9CzvwX49ZhlXWTQiGmHXJrH3IVNOzkPCCknRzZWwIhAJzO3W2S2j1EEqRWJxUWJhcwCCNo2WMyJgpnAOnbgL7UKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuBJeAmEADa3xDhUsq3AP%2F22YCy%2FrNhSa562VmPso86C%2BmjDi9rznXqMLOsLoDQN6xJU8oWwJUAKPJGikvKPG9xpX8BWbbQmt5pSNAzniyNHu1IXG%2Fn5kodWi2%2BosOJlndAuPIv62vI4CiAiVaV9d9qoXL%2BPmHH6oEVKu%2B3lSr4kAV8f2WVQZItSHSOBITF7HUk5WixYe1s8fArrrQtFgrckWtuHbgvlFuojG3wTdy1IFuCtEF7lsK1TPUnC7OWOYXEC5mQ7Ssqy5qYu9Mcl4QwJCxGACxEGd0PLa%2FARs%2BHVRTHhbSukC8fxXIDz54jzTDFkTKQWIf0TjCgsF7Oely7eDCDzCbYnYQ6ziI7LWkMSTydlMC0YQ5DWOlJ3zMUI3olkQBQm3o9ONz4MB%2FLUsDUOer%2Beo2ywj9w2p%2BCxvyP4sD790NxGX%2FljJHsOewdFnzYaL3qIum9jI5QzSbfduSs35sk2dcpyMirx2RS2WSU7mYfRbRYOChDDfABaIBZJD39rlnk8EUMfHZeSnMsEdMr4lgPX%2FDYiItuTSSOO3HpFTHI%2BQWcdXYYSaGhb2Lxqr3WuLmoOuA1BoY9cWjS638Om5h990RlduuNu6MqhtiA0OaaZWaLLPK1bpypNYSraRTgVI3cZfU%2Fm1GszC834rPBjqkAWh95Y1kOOn2zLe6UqLRMF9%2BkJ8ro9ETpU5tYwJdCesGU0Q88qkwWPQiW9pMk%2BRXGuRK5XBO3fKRyqUaRdPgUPTkwUvBjMoLOqpkujz0kircmR%2Bu6I%2BqOi4l%2BflaLXGSK7rnDMD2HDfSdSd6eeyPFndSv8%2FTKNQsnnq%2BpipTbqqNWIKeyL3dhx1YtiMCDtNGwF5dK4dPpEPMeXcm6AdZT%2BflskP%2F&X-Amz-Signature=0c8c7123533f08cb2730f6c2be72b0053e8f9f4c534f5a6ae7fdadd4ef8c434f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662PU4U66%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQC0Fu9CzvwX49ZhlXWTQiGmHXJrH3IVNOzkPCCknRzZWwIhAJzO3W2S2j1EEqRWJxUWJhcwCCNo2WMyJgpnAOnbgL7UKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuBJeAmEADa3xDhUsq3AP%2F22YCy%2FrNhSa562VmPso86C%2BmjDi9rznXqMLOsLoDQN6xJU8oWwJUAKPJGikvKPG9xpX8BWbbQmt5pSNAzniyNHu1IXG%2Fn5kodWi2%2BosOJlndAuPIv62vI4CiAiVaV9d9qoXL%2BPmHH6oEVKu%2B3lSr4kAV8f2WVQZItSHSOBITF7HUk5WixYe1s8fArrrQtFgrckWtuHbgvlFuojG3wTdy1IFuCtEF7lsK1TPUnC7OWOYXEC5mQ7Ssqy5qYu9Mcl4QwJCxGACxEGd0PLa%2FARs%2BHVRTHhbSukC8fxXIDz54jzTDFkTKQWIf0TjCgsF7Oely7eDCDzCbYnYQ6ziI7LWkMSTydlMC0YQ5DWOlJ3zMUI3olkQBQm3o9ONz4MB%2FLUsDUOer%2Beo2ywj9w2p%2BCxvyP4sD790NxGX%2FljJHsOewdFnzYaL3qIum9jI5QzSbfduSs35sk2dcpyMirx2RS2WSU7mYfRbRYOChDDfABaIBZJD39rlnk8EUMfHZeSnMsEdMr4lgPX%2FDYiItuTSSOO3HpFTHI%2BQWcdXYYSaGhb2Lxqr3WuLmoOuA1BoY9cWjS638Om5h990RlduuNu6MqhtiA0OaaZWaLLPK1bpypNYSraRTgVI3cZfU%2Fm1GszC834rPBjqkAWh95Y1kOOn2zLe6UqLRMF9%2BkJ8ro9ETpU5tYwJdCesGU0Q88qkwWPQiW9pMk%2BRXGuRK5XBO3fKRyqUaRdPgUPTkwUvBjMoLOqpkujz0kircmR%2Bu6I%2BqOi4l%2BflaLXGSK7rnDMD2HDfSdSd6eeyPFndSv8%2FTKNQsnnq%2BpipTbqqNWIKeyL3dhx1YtiMCDtNGwF5dK4dPpEPMeXcm6AdZT%2BflskP%2F&X-Amz-Signature=530bb3fcdfa33ed314388c9cad63f26cf2fe5d2a2fa6190ca6d649a51f8aae65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DG2C4FM%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDmWK6vPZtf898qDb1UMhC2grH2GEl8%2FO8199NjBl%2FS8wIgIf9v8%2BCzXoVUwITgfkY3j51PeIuv57cDtXwbTU9GC08qiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIlES%2B4oGTqcKUTO8CrcA26%2BtoE6RsJ4gcTmWpIqUTfMsxwjyDmsYbRfJAHa6jWIUuboagO1%2FT7CDsoRHdf4EaayAv2%2FdXJC579vUkU2lmPUnQ2b%2Ba6yJi3Zu7vCM%2F%2FUiDQurICX4BSybVaq9TeAes2I65MaUylp8d6eg%2FVUOWUPG6dXYepFZDiKTHHTElpyDGWudBbzE8bTbsELNZTNowDjkiQ1Zx9EUcC9KHyYrppsYT7DyR2Xvau64oInM8f9DDI3GPf3iDpAm9IFpSEGUZt%2BaZVWKBqVUQ%2BeR8Wr5Ok4GDHrclTS0NvkOEG9JHJ20hYzwqFy2V5ybBFj0DJ1I%2BXZoAcmDE1MszH5fQEm6yzTbS0HEMxDL3AAcAuDPyEDDXncCCoBnW6%2FGHmyLfuUuSh6tGOLcHLdEqS9bvezabFNebivTQz9ZkoL7S%2FJOYDOXGEVPXcIozL4I6I%2FNAH3P2i72p5EfQ%2BMb%2Bsf35jviWsn3JFWB4NbhgPZV717akSkHdx5kjP5%2BeViU%2BBft3n2y7wEdMbtcpd7RSLVHsFEJLrA0cQgCbAy3c2zgDiM5jSyDz1qYX%2FOlvktKd3idpeVyCYYzSbaa6IT478rgEyzFdVwPimXTG5Xc5PV3UYXFfVCtyuCox%2FVIvFIbfDFMJnfis8GOqUBDattZerpdstf0Cd2TAyUFIva9IQ%2BIT%2B8Z5%2FsJ3UwfPgqyU8wJXlEUGHyrMer%2FCi52uHJTEzktgMErLjt106Lkr%2BgRCpPYYjPO8YZrq8QpQKE0fXIUd0YS4xQBtupUpI8XqUQOnvjsKqH9hsUKTfv22WsUblmQtLg6%2FzwhMbh0ov25yWFsRgMutQVEZ4pUu8PLMFuYIALdnRLEo%2F3g9wuJKp%2Bnbyj&X-Amz-Signature=30b3fe5c99c39f05e33782c562bba70e0910097842c5b87dede8266bc3a720bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DG2C4FM%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDmWK6vPZtf898qDb1UMhC2grH2GEl8%2FO8199NjBl%2FS8wIgIf9v8%2BCzXoVUwITgfkY3j51PeIuv57cDtXwbTU9GC08qiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIlES%2B4oGTqcKUTO8CrcA26%2BtoE6RsJ4gcTmWpIqUTfMsxwjyDmsYbRfJAHa6jWIUuboagO1%2FT7CDsoRHdf4EaayAv2%2FdXJC579vUkU2lmPUnQ2b%2Ba6yJi3Zu7vCM%2F%2FUiDQurICX4BSybVaq9TeAes2I65MaUylp8d6eg%2FVUOWUPG6dXYepFZDiKTHHTElpyDGWudBbzE8bTbsELNZTNowDjkiQ1Zx9EUcC9KHyYrppsYT7DyR2Xvau64oInM8f9DDI3GPf3iDpAm9IFpSEGUZt%2BaZVWKBqVUQ%2BeR8Wr5Ok4GDHrclTS0NvkOEG9JHJ20hYzwqFy2V5ybBFj0DJ1I%2BXZoAcmDE1MszH5fQEm6yzTbS0HEMxDL3AAcAuDPyEDDXncCCoBnW6%2FGHmyLfuUuSh6tGOLcHLdEqS9bvezabFNebivTQz9ZkoL7S%2FJOYDOXGEVPXcIozL4I6I%2FNAH3P2i72p5EfQ%2BMb%2Bsf35jviWsn3JFWB4NbhgPZV717akSkHdx5kjP5%2BeViU%2BBft3n2y7wEdMbtcpd7RSLVHsFEJLrA0cQgCbAy3c2zgDiM5jSyDz1qYX%2FOlvktKd3idpeVyCYYzSbaa6IT478rgEyzFdVwPimXTG5Xc5PV3UYXFfVCtyuCox%2FVIvFIbfDFMJnfis8GOqUBDattZerpdstf0Cd2TAyUFIva9IQ%2BIT%2B8Z5%2FsJ3UwfPgqyU8wJXlEUGHyrMer%2FCi52uHJTEzktgMErLjt106Lkr%2BgRCpPYYjPO8YZrq8QpQKE0fXIUd0YS4xQBtupUpI8XqUQOnvjsKqH9hsUKTfv22WsUblmQtLg6%2FzwhMbh0ov25yWFsRgMutQVEZ4pUu8PLMFuYIALdnRLEo%2F3g9wuJKp%2Bnbyj&X-Amz-Signature=6762ffad3c8611b64c97400e342cb0928836aa2624e9312011049839338d80e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBKZIZWV%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQCsAQZ2BaBhQpeHz4bb12SgQxIM9lliVzu08jcaseVSxwIgcTcCsAOw95Nfck7ZAVpbJmyd7cTfoimPxr5IgsI0GtkqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ%2FkXNF1go7Kb73sIyrcAyQVzIRFHnGPvvmOpWKrRdH%2Bf7TAI%2BWl5vyie9LB%2F4c9pZSpnPn3cVy%2Bv6TOqzVAKNh%2BK1ynYNeFw8doFVuukTMqWn7sq2imJw5DXSRYFzl3WEbI1HDjBmECkivzijwlrwpFoROvOlRKtxSYALyJ%2Fjw9iBt4A2V2IOsrsfQjhhZa%2FjDws56tb3m1VJC3itqyP3BFs4PKsr7j6F2yDMb9AMVCbR5wJx4BC0%2BN9oI7hsAlbVoHTK%2BNBPCAk%2BZyjK6UZamzQfB1SY0omN%2FMw0E8JXA33AYDM4%2BRJ2VyQD5RAfwyL62BpVdR30gnyixMJa%2BaW5238o5I5MomOgUI8n4kQptRSnSJynNj0jXx1Mm5n5k3xoqmqMiCxPs39moLFsWrtMaYzlD86cA%2BZTFDagsn8iW8TmTfLwjj9L6ZzNkRhZO7fEdTaXV6Fx0gpvhdqZWz%2FidMInlDkfGKY7wbTgmE0m9oRic%2FDTRNuxLpTpj11eVKOEEq0RILtErt%2BWoXbjFR5fAKdmUDtqn%2Fwz%2BbSXhFA4QaWNHWejHq6DKtWn4deocTdL%2FDr7nJgbDBymltSvU5bqOkKuiOlQivxFmUrw3D1EATVT4oaTL9OdaOrkX3Eiv1iMeptHZZrrtofF%2BVMIjfis8GOqUBBLAYqNB5lAlYsJqU4iMeatfwoQxpAHnTC54AsFdjgx9S1wC00eICspbdwUDMKkKSmpBJLuEx7495kEB9Sbu8Nf5S%2B6bezJCM9BncT%2B9UPcRos3TCaDnglwDEu6g05hZzQtyeg2zRzrNvAAZbK%2Fdy2dWUH4KKI0HMhBKxBeqnnxuWLUuHVp6Fg02HmmwiF5PJQ9rH%2BExYqx3G9x1GR0IiAvCxWVkf&X-Amz-Signature=1658d0e7eb58bf0f9dc0d28237e711bde56242226f4610de8bc37cf6d37c7c56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKEI6UCI%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIHMbIeaVB82kuiVziUGrNrerwNqBAdWG3vvyppYAR%2FCSAiEA2O7LmXtONBycOQY0UgqOkZlnw9Di55ob8gokhWz%2BfwAqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHrWy9XFVSKXB404FircA%2Fi6GJPh3xITbQ2w0PLF14riQ7j47NFBNESv76ZhCyPhalyQpb%2Fxf8fqJACzxfJol4qZUxrQT%2B41ZyxH7ydNFXuu7e5TxUv%2B0Qy%2Fb%2FWzM8mwgoRGryfbSKJcwZ2BTxKjoutQJCpGTUhhHZtwvNUzTeaDi8AU81f3k0QE0deKN02%2F9pwizkwXCyOjBSkF4566K8rgRVdyAE%2FNQyHQZZhBEvqZ1TIEk%2F3cJ5jJo1ebA9viBQsDdwW%2Bnw4xnDSDrJ%2B8Ik9jRCWtYsTtUoXs4A2S7m9uihL1IRI13pM%2B7MmQEFg4L8F%2BhTovSSn5Q89Ja8ljBel04Ca2BAdstzdV9Oix8VkSqxubaSeRa2Kbr3pv9kh0Csy1dTNjhajNpzEz3rKHN3%2FbxKM1tJNWAEQZHIUI8EsY69KmauFY4m%2B%2Fu6XiEYaMRAJktDuwy4ASJ58N%2Fhipo%2BDFbm9vXClxGaYn1fIum0d9YeWwNX7UCw%2BJ0xnjeBsL8%2FWdUUhoP0EUAhR1o0MEMXleXH8KtHtuMxPT%2BLysukvbyo4JpQqkhCsoL6f9%2Bm5RvXgg1kFjZIWy1c2EbYfCFg0Vfkmyb48JI2cnMORnmv2%2BH5ZHCQCiz5pNgoIpwoeTJGO9aqKqx%2FRlOiWuMNrfis8GOqUBC%2Bhy5tmULR4ZSCWfd177hY8UJgmhwGRmRovaJfMot903RMgTK4q4mpgEfMFujbPN4aKanU%2FU4cgQYqFNjESNV%2BHTB3ciGeFsRDYOQVIX9jATY4Kmql9oA9TULWDP0M1xJHcUglD7j%2F1vwMmKjLlIautFmUVzG70%2BiewJie%2Bm4ggJmbWCER51qPOc13LF%2FnwxqJmGgrGQPDHQorL8xbjOhskajfUP&X-Amz-Signature=9191d1d36ba6e1424c0a05720a21a257b15d6ee833f3c7005eec7ec2da051775&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKEI6UCI%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIHMbIeaVB82kuiVziUGrNrerwNqBAdWG3vvyppYAR%2FCSAiEA2O7LmXtONBycOQY0UgqOkZlnw9Di55ob8gokhWz%2BfwAqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHrWy9XFVSKXB404FircA%2Fi6GJPh3xITbQ2w0PLF14riQ7j47NFBNESv76ZhCyPhalyQpb%2Fxf8fqJACzxfJol4qZUxrQT%2B41ZyxH7ydNFXuu7e5TxUv%2B0Qy%2Fb%2FWzM8mwgoRGryfbSKJcwZ2BTxKjoutQJCpGTUhhHZtwvNUzTeaDi8AU81f3k0QE0deKN02%2F9pwizkwXCyOjBSkF4566K8rgRVdyAE%2FNQyHQZZhBEvqZ1TIEk%2F3cJ5jJo1ebA9viBQsDdwW%2Bnw4xnDSDrJ%2B8Ik9jRCWtYsTtUoXs4A2S7m9uihL1IRI13pM%2B7MmQEFg4L8F%2BhTovSSn5Q89Ja8ljBel04Ca2BAdstzdV9Oix8VkSqxubaSeRa2Kbr3pv9kh0Csy1dTNjhajNpzEz3rKHN3%2FbxKM1tJNWAEQZHIUI8EsY69KmauFY4m%2B%2Fu6XiEYaMRAJktDuwy4ASJ58N%2Fhipo%2BDFbm9vXClxGaYn1fIum0d9YeWwNX7UCw%2BJ0xnjeBsL8%2FWdUUhoP0EUAhR1o0MEMXleXH8KtHtuMxPT%2BLysukvbyo4JpQqkhCsoL6f9%2Bm5RvXgg1kFjZIWy1c2EbYfCFg0Vfkmyb48JI2cnMORnmv2%2BH5ZHCQCiz5pNgoIpwoeTJGO9aqKqx%2FRlOiWuMNrfis8GOqUBC%2Bhy5tmULR4ZSCWfd177hY8UJgmhwGRmRovaJfMot903RMgTK4q4mpgEfMFujbPN4aKanU%2FU4cgQYqFNjESNV%2BHTB3ciGeFsRDYOQVIX9jATY4Kmql9oA9TULWDP0M1xJHcUglD7j%2F1vwMmKjLlIautFmUVzG70%2BiewJie%2Bm4ggJmbWCER51qPOc13LF%2FnwxqJmGgrGQPDHQorL8xbjOhskajfUP&X-Amz-Signature=81000d248ff4de852de0525db77297989b79a89b6fca9bbb33555d061c6feedb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QGAET5O%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCICtuWDrVpqdh6G2Ujl68DeSan7jOQVyrHIqpXAWbwUQXAiEAs%2Fo%2FC9bc6HnE%2FowxljsnZSijCJuMe0la8IbQkjnCxFsqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKmr0lDRVb7NwBipRCrcA%2F36oJn9vaSTtIFfUa0Y3dBCCIANIgA%2Fbwe2z3Qznkf4SJF6O0sA6LxgwgyQy2tiCoEbLV1KqCiQZZlxEcrDXSyvP5UJvBEUfdYTnyuRkYmnI%2Fklo4fP3wu2H9XMZw5Xzwqihg2Tm7ABb8jiXgI7xBGBwkyqEZZhanCaK6eaBJ704XP4t%2BsnLNwehj9Qs5ChWE7YAPOP5X0gvGsbRufiZ3lh3PVTKjShE5W06dHx5QdwfS8UwF7dfE2qU4vLAIBenZPd7RsfqHxcFNuR7PTHT2l3n2HGMk0B3bHqcAn3PBA1inrwX6qJAix3oUnufENfI7Thm%2Bxp30cvTcr38I9njskR3IL3Zgw0SIQDQ6rxqLa3U9QSnvNTbOrMWxzr1VK9JynUshoCS0eo1nqYuGbhVmiaRj3jb4U%2F6ii7qhGNo5rdVoZ5ueUgY%2FmzMSjRjPPIaDLD1pWL9dm9EUA1O751u%2BajUc%2BUgvuELdcXxxac9aFAkBuWeOVdfLOTf3dlfH%2BC98CW9Add95j0wEZrgYV8zbtRKm9Nqy6NsLcbUsKIb7MX02qOZxjBVqZJkS6rNG3x9pXH7G9476AHocv9VhXSShu4QHhfqXl%2BlB2%2BYL9ySQqZUzWF0ecsCzeSwQBwMODeis8GOqUBrAk7z3hJzQXbSdeBRn3tezHBG7t5GwTq2X7Y2PSoDKjzfQwc6Hf261nmiINBG%2Fuvt7BwtsQm3tgSD3ToMqbKkTluo33ERKjNGLqkrKumX1MUBzeYn6WQyqfhfRimyN2hZDuPWNHQp5alqtnkiWbrYo2aZu0KAFT8%2BLnC2v6zxCt0khL8q87c8xLLVuI9NW9FbB62EZZfgruPaXP099guAgqZ3bNT&X-Amz-Signature=55f9e9550af98662ec6de345c50d09f83d9bce2fa3dfaa1f5b61b2f871e7486d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UWXQVSI%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDV%2B81QpQZKZpu%2FzqSBH2G3dO9A4vZm0cj%2BYx3BYrW5lgIgU94Uq9rFQBdHqY52691HE0bANwxZ0CwSZo9u2E71bvwqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEZouVrOEB4smbfVGyrcA%2FeAL%2Bga7gHr9dSla4i%2Bha31eOpGe0DjSDRoj0SEQm%2FeD7zLOR%2BRG0C1Bie%2BWHmkcrQ7duSMyXfIkAORqQjXggeyKoSHtXT3Rj7LX2amhQksu1hNyHyw57x3uejnD5Tyho6zVZirsivCyOMeUCC96v7pVQoZMwLaa806hVewGqrCp4STSoIapCX%2B9WfweRobQdi9GhJ38SE1pFKUQEP%2BA4lszFkY%2FmfuEUbC6KLS9Bdhq4kUFib95fbZv6KUHHFzpOmvYoHzWHRS7COAx1YNx7csFOE%2BnNSZYHdm62k3x0%2BGtT1RfCBQhL4FKpB60jkAlAHQCX8UrrxfUZ0KRKAApphxL%2Fts6El%2FmkjJB2UE0%2FTco8gs7LyM3h2lfqtNMWy%2B5iTCP38zYFg2g%2FaeR6n5WREVbYFWPR5vclFZFmJAfH%2B301Qtj0NtX902ehgP7eOW7Xwu4IDY0XORNfXdXURTMuZgnb6DsB0O%2BLIwWxwOEFw4AKj81ixHvgrdmHT2vP8sRTCTU%2BngTjOCJ2SDXg7vCC%2B4ztpkYEqY3zzN3wrw7W41RzAO0FVictpV8FHEaZpE1AOqBlVIOhaV%2BMNd2aqfRZUl3VwYnPQ8WOyVhYdYkeM%2B7%2FDw0oMGgzzOc%2FVGMM7fis8GOqUBDhLh780CdljisxAlY4r8BbSZ2ZCEW0RpaxYmjIwy%2Bc9Wc1RzhePEHzUEvLRMTH3UAFiElpAOEVuFDqh%2BI%2F1vgvbTgHdQAvN7FlpuLwCo3szoxGOMYDmXavqybynmTSNiMuzwySpWLTR4RLmVQQN%2BKTA3PjZ%2B5h4ZXmVjfT6OwGEEAywNeYZNuzO2fmUJTWNNmWgbrwyod%2FbRhpLZQSkFjmwc1%2FnC&X-Amz-Signature=5093b21025e61ca0a28688ea487eaf44a73b94d1bff989a58f176ca1b1b6745a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UWXQVSI%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDV%2B81QpQZKZpu%2FzqSBH2G3dO9A4vZm0cj%2BYx3BYrW5lgIgU94Uq9rFQBdHqY52691HE0bANwxZ0CwSZo9u2E71bvwqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEZouVrOEB4smbfVGyrcA%2FeAL%2Bga7gHr9dSla4i%2Bha31eOpGe0DjSDRoj0SEQm%2FeD7zLOR%2BRG0C1Bie%2BWHmkcrQ7duSMyXfIkAORqQjXggeyKoSHtXT3Rj7LX2amhQksu1hNyHyw57x3uejnD5Tyho6zVZirsivCyOMeUCC96v7pVQoZMwLaa806hVewGqrCp4STSoIapCX%2B9WfweRobQdi9GhJ38SE1pFKUQEP%2BA4lszFkY%2FmfuEUbC6KLS9Bdhq4kUFib95fbZv6KUHHFzpOmvYoHzWHRS7COAx1YNx7csFOE%2BnNSZYHdm62k3x0%2BGtT1RfCBQhL4FKpB60jkAlAHQCX8UrrxfUZ0KRKAApphxL%2Fts6El%2FmkjJB2UE0%2FTco8gs7LyM3h2lfqtNMWy%2B5iTCP38zYFg2g%2FaeR6n5WREVbYFWPR5vclFZFmJAfH%2B301Qtj0NtX902ehgP7eOW7Xwu4IDY0XORNfXdXURTMuZgnb6DsB0O%2BLIwWxwOEFw4AKj81ixHvgrdmHT2vP8sRTCTU%2BngTjOCJ2SDXg7vCC%2B4ztpkYEqY3zzN3wrw7W41RzAO0FVictpV8FHEaZpE1AOqBlVIOhaV%2BMNd2aqfRZUl3VwYnPQ8WOyVhYdYkeM%2B7%2FDw0oMGgzzOc%2FVGMM7fis8GOqUBDhLh780CdljisxAlY4r8BbSZ2ZCEW0RpaxYmjIwy%2Bc9Wc1RzhePEHzUEvLRMTH3UAFiElpAOEVuFDqh%2BI%2F1vgvbTgHdQAvN7FlpuLwCo3szoxGOMYDmXavqybynmTSNiMuzwySpWLTR4RLmVQQN%2BKTA3PjZ%2B5h4ZXmVjfT6OwGEEAywNeYZNuzO2fmUJTWNNmWgbrwyod%2FbRhpLZQSkFjmwc1%2FnC&X-Amz-Signature=5093b21025e61ca0a28688ea487eaf44a73b94d1bff989a58f176ca1b1b6745a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K4DWYMJ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T222423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIDcxeeeXXoimtwmo05ZfSb3G8yuks9Fg4ad8hpos1XjDAiEAyTOi5cXKa%2FKZjymoV16P1e2gvD1NnBAZVEdGrAkNZqcqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFPjU%2BfEwSIOJeWhCSrcA2uaGIw0hkuAqABPi3Z%2BiRKECR0ZMHncYdkPrTIzDP45nsNc9Wmr2i4bqhyTitab2obV3C235XLvAAO6w7DBpxO0tgIJMARtm3t2aRuwOsUivQXOUObi3RTKmSoPsoy4E5wrtqeDrTnTqz3uqRiinxpWYXP4TZD7%2B%2BlD1RdbgGoRuQb4M0o0bQpqFDDXyuvqzjjvlEcaw%2BpmVEN1NzZNwc3eoxLFTMLPaD%2BMpazry9gcFwrLJkDVCm1d122wi7KfuqCCrDwViMAbIlqRzrBmpbXHyEeuchKcmqZMJs0knJph2NvsYK86kUcFH2A4UE%2BM%2FFQYQy9yeKbpne45rcSnHuODyvzX9ZBirExtzhnLeQBj40y7hQ7zROa7J7VeElbr%2FtzsprkZrqKRoI%2FLC4YTfM%2BC1iX%2FD237fOLotgJMmz8sRFXwVzQSppt0%2BX9Hpclsg0ar9Zi4geZcg%2BPOF%2B6fJceyjV8MLjKootyP2r53ps9FmrP4YR0qGv7kBXERJNTnfNUebHLw%2FInjcu2rD3xO16EfsxQBafSeWQb2X8Gul7rolbRWvJR%2FXsbwySDL9qr8q25eVSCMZDDHu%2FYY1f%2BwKlHc0nHAq9ifXAlEuIYAiRXdEQ9D2N004fjuPHCRMK%2Ffis8GOqUBWlJf6U3B2lKM92UcqGWe6X%2Fx%2FJIbUYsk7yxivzI1qX1FqmF0rScdFAxK5BHcV9Omx4hQzvw8GqnB2OSwUwyG3arK3BeF4Xp4T23dwu2OC4n0YfJevmBw8EYwfdEC%2F9A8ilV4AwvZXJZyk8cDuOOWr%2B%2FRPBoW%2BsLDz5iANpzSGgBsx%2FsuvhvA7V5AiSL7kveUE%2BGjhkeexX%2Bv6RvKvqMYpxPg1dqH&X-Amz-Signature=26e2f745634e0576d63015ba8fa7b8c0611bda6d4b362b1e10ec16d0fa8d974d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

