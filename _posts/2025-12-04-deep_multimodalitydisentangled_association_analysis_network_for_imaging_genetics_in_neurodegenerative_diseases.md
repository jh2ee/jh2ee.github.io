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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QE74OSBC%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIBp1BAwTaHOHyHeCVD9yqNQJCyf7rvYj0o3ZO025e0C5AiAQ6gFo7gd5stfck3oDiXS6PxcWW8xhdUkqoIeYvZsgMyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM%2BVXXJEVf%2FxtTGD2eKtwDS6jvmllyXpJ1Z7ezQ8D80%2B7d2k6hhtuPfRFyP4n%2FQnaOZ8rNE0Ws9Lz%2BWQyJuZAp6JZ4hI2pHutZhEKEktDr2IRIpdnZPzyQtd47tjW3C%2BFsTos%2Bdn5gtS%2Fg8A64h5FoQ6stvcf6zp17t83vDT5%2FyuTRoXpvuz3KDRklJXuCPdWbVeWo3QBwM%2Binexgi6FyXMTPxQ2Mnm3U8BkxIA8voetjSR5vNcHPeQ70vm%2FRIbVvKWusolsg8pNkdGiImoLTo97Xgwl9GXM2rBE5RQBnwUd%2BoPETJptCz0ZztGyK7fy%2FQ5fog8XtDuv8FcuVU4rPtBl%2BVSfXD3OHxL5vQ%2FbwrpQxJ3BbrA7zzkCSLEm9ngquNcO%2FKZY1sJYvdSqnRSO07DHmhHbnGPW2j4p%2Fu7M60vx5pZUpClW459zMj5fMPU24ClXtQ0yL7EAB4smtSeQVNH6OKwJe03RTAqrbPA2y1Uf7kmwbRP39y4eZ%2BaD%2BmLPj0LhL1u6nEctY9xTyP%2FHuY8C11QwK3iaLP2dS08e8CZmg2DXmxnJi2o7IXxWCiYBLBjCvaFKps0QDy2xAhi2vkQ62kAviqHdmTfZRRG%2Fha3QutqN1mSIGv4dcSzALCewB3JzkRzR0eQm3VSVMwtfT3zQY6pgE0fYsD%2BktUFIr3DeODEWJ%2FVXvbxV3b8eLBCUy3StdtoCs6vxlIRUbtar2PvgZkK55XspyXjg4%2BTcSzD3l1M%2B6G6s0%2FOgCaZSDYlQTdnch0oIdpp7MJLZJQeTJ1Gnpt5w0UnGKRS%2FpsvKbA2A%2F%2BIkmeDMPQoRUhNu3HudsS7COYrpIPUMi%2BAWm09QYOforgVPAVB7OAaM0CE6SpRY41ne6PCcrLMKju&X-Amz-Signature=3067dd9a4a0b049bf1437433c9239f95660aea57ba6247261b472ddfb635baf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QE74OSBC%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIBp1BAwTaHOHyHeCVD9yqNQJCyf7rvYj0o3ZO025e0C5AiAQ6gFo7gd5stfck3oDiXS6PxcWW8xhdUkqoIeYvZsgMyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM%2BVXXJEVf%2FxtTGD2eKtwDS6jvmllyXpJ1Z7ezQ8D80%2B7d2k6hhtuPfRFyP4n%2FQnaOZ8rNE0Ws9Lz%2BWQyJuZAp6JZ4hI2pHutZhEKEktDr2IRIpdnZPzyQtd47tjW3C%2BFsTos%2Bdn5gtS%2Fg8A64h5FoQ6stvcf6zp17t83vDT5%2FyuTRoXpvuz3KDRklJXuCPdWbVeWo3QBwM%2Binexgi6FyXMTPxQ2Mnm3U8BkxIA8voetjSR5vNcHPeQ70vm%2FRIbVvKWusolsg8pNkdGiImoLTo97Xgwl9GXM2rBE5RQBnwUd%2BoPETJptCz0ZztGyK7fy%2FQ5fog8XtDuv8FcuVU4rPtBl%2BVSfXD3OHxL5vQ%2FbwrpQxJ3BbrA7zzkCSLEm9ngquNcO%2FKZY1sJYvdSqnRSO07DHmhHbnGPW2j4p%2Fu7M60vx5pZUpClW459zMj5fMPU24ClXtQ0yL7EAB4smtSeQVNH6OKwJe03RTAqrbPA2y1Uf7kmwbRP39y4eZ%2BaD%2BmLPj0LhL1u6nEctY9xTyP%2FHuY8C11QwK3iaLP2dS08e8CZmg2DXmxnJi2o7IXxWCiYBLBjCvaFKps0QDy2xAhi2vkQ62kAviqHdmTfZRRG%2Fha3QutqN1mSIGv4dcSzALCewB3JzkRzR0eQm3VSVMwtfT3zQY6pgE0fYsD%2BktUFIr3DeODEWJ%2FVXvbxV3b8eLBCUy3StdtoCs6vxlIRUbtar2PvgZkK55XspyXjg4%2BTcSzD3l1M%2B6G6s0%2FOgCaZSDYlQTdnch0oIdpp7MJLZJQeTJ1Gnpt5w0UnGKRS%2FpsvKbA2A%2F%2BIkmeDMPQoRUhNu3HudsS7COYrpIPUMi%2BAWm09QYOforgVPAVB7OAaM0CE6SpRY41ne6PCcrLMKju&X-Amz-Signature=3067dd9a4a0b049bf1437433c9239f95660aea57ba6247261b472ddfb635baf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NSE5F66%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDxaCnwNbbPF94yzcT6Fa2vJUPudlCUKy58Y6Gd58quJQIhAKnWbmblseis7eynRxjJP0%2BbMjMurqdT%2Fo7RKrhvFJbJKv8DCEMQABoMNjM3NDIzMTgzODA1IgzGUVzyyRLSv3NUgbUq3APEfzNzdmP5okQmMctAn70LhRXBKedf0mkHyVhLLDe1wgMlrbwPAiU%2F0uKik1FNMVCAXrXnjWtzaSSfaLC0pYRPiVzLlGF6%2BiOpTtbiDigl3KNlj33CqZliuDqIIuB%2B7xs0J3M9WOsA1RRXXc0St1KkxEDBxTXkmx%2BK3cKum%2FKOwvjgiLpBfw9wl0IIwbxu1ShUbd4tVgB4OjtA2YRkFUp71VEoTImUX8Fl%2BMZ0IUv%2FQlsK4HrS6j9CC33ipBspb3%2Fvtgx%2BpZP7vBUm7vbi0%2FUabRJ3DeEd9UWGe9szv%2Fsc6PHvvS0mn%2Bb4Cz%2FPIwhgtiQq1K%2Bam0Wo3I%2BsEr9WVRncIUw%2Bodnk3wpUn5Npx02oCVQsLXpBYwOBnmmHKqwLnvqjsRuydgf%2BcBxMchHiSUbDyg0Pr3pINcb447wcgzr2ex0JkeGiltSeEpmPqP6ErUgSxDibdAnlmoU%2F0UYd%2BFcWnn8W%2BhRjpEaMFz174iuwF0KRbGFGfRHDfzjTewZg4IZ7IzdBb2MBYF%2F4%2B56rxmxRvh04bC8fHpjXSmNj1ureOVYSWAYT9oltEl8rEL2acOzJAu6fjTvmWT4%2F14FxhnGbqVytKoldFa%2FeJ%2BkH55Tr%2FhXtgyQX73r5NoaMjzCM9ffNBjqkAf1OkAjSOdB%2BCehx5bzCAdYYUpvS%2FTES9YGmchs4fqMTVPQUduQHLl5GgJpICnXNkt8Ee5ZhX4z794raNo3fqV5IjG0i1PSi3SBYWH9RMQ6DJjyKZG%2BT0IhfaG6ShHhbNkx7fCInmUNMHeXN4kXOj4iUGQBLp%2Fs1rbN1jInmWUX1fxSxu2Qy8fNoqK0I7OF3MuBcqKuQnBJV%2BvwgeyWdt8DuAyRL&X-Amz-Signature=2a6479ded05b625df7198959329ef7abbf0c53a1207b2df3f7667ef92abf3523&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GTEXAF2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIF5bjswIPG%2F18nqN%2Fi1NUCPYr4Qs70OG64jhW23rwSJjAiBGjVDIv1E6wQgk6euoBFzxaYYCQWn7x1FuB%2BWi7KD1%2FSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMFo5xJu5fyURiFZsjKtwDL%2Btj%2FbYP2PzNNaoxYqmayyR1CV8vuD6bihsK8Xhs0P3y10okD4liSzOm4mN4pF7vyofv4fFJHwWOZA86skEfL48wdODayPiKeUxiSa7LhtYS8INUCnrbRgrXHEHq%2Fw5KovHkELiAL6lmgA%2F67DECZdULuFV6dnxIds3kLLU33av4Jed%2BteAFvkzAcCFmy4RmSnQyXJyNgmtS4TAVpsb%2F6e9%2BNDY9lLO4DGOGuojOe8oQrvUGw5KVR4w6oitLpqsgcXzDaAkF2y7w9mIsfefyCWAp7em9hdWuamAiNyietvI26YGzyVleepb4uxn5l0WZ%2BKlQFnKaQadpn7kn0kkW%2BdFPts%2BDzEXvbMehhJ6078nl7qdjw8XXbFRtFBuKbeDFx4O%2B%2BYSvMbY1hCl8RLMCBpWdJfTNK5tMUkIsfJqybSSaDFhkyYI3qGBKilCaIjJQv7cm4zreeCQci1tbZSvZUpgG9rZIDMW4PSURrBumP2TPPmT3Fo2lWmg9k%2FP02H7M%2B5dcgX9mghJe2zD2i616rzDtIPLhFe2B3owDdngJ97mayM3w%2BUCZX5DKbTSkkkJP0NKtnRxDUmS8FeV%2FmQ5o%2FOeU6n4WIeMy%2B2hT3bV4KO%2FjRZ0aUZDNzW%2FgGAkws%2FT3zQY6pgGhgepbJpmYjVX%2B%2BVC6ZIHLWU9Kn%2Flnkwq8RWTgtLmirJz1XF3Lp%2Bwhgvx7QWwR%2FePhBSAwkB5ZNYgNCe1ylJVo95fr3hMM%2BPc5yowUM15qVjkmArQR4r8szHk9UXsE50U%2BMRdg3yAzmiXFueP4SPm5qixiTptPWqrkhlT7L0GQCzDUV89%2BCbSpT9G1eexf3D2OjHNFmdhCVHlDqC8hrEWd%2FoY371Cx&X-Amz-Signature=b623759c603cc40dc93029c8214510926339a496eb7fb5f0ef5e14016d609182&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GTEXAF2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIF5bjswIPG%2F18nqN%2Fi1NUCPYr4Qs70OG64jhW23rwSJjAiBGjVDIv1E6wQgk6euoBFzxaYYCQWn7x1FuB%2BWi7KD1%2FSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMFo5xJu5fyURiFZsjKtwDL%2Btj%2FbYP2PzNNaoxYqmayyR1CV8vuD6bihsK8Xhs0P3y10okD4liSzOm4mN4pF7vyofv4fFJHwWOZA86skEfL48wdODayPiKeUxiSa7LhtYS8INUCnrbRgrXHEHq%2Fw5KovHkELiAL6lmgA%2F67DECZdULuFV6dnxIds3kLLU33av4Jed%2BteAFvkzAcCFmy4RmSnQyXJyNgmtS4TAVpsb%2F6e9%2BNDY9lLO4DGOGuojOe8oQrvUGw5KVR4w6oitLpqsgcXzDaAkF2y7w9mIsfefyCWAp7em9hdWuamAiNyietvI26YGzyVleepb4uxn5l0WZ%2BKlQFnKaQadpn7kn0kkW%2BdFPts%2BDzEXvbMehhJ6078nl7qdjw8XXbFRtFBuKbeDFx4O%2B%2BYSvMbY1hCl8RLMCBpWdJfTNK5tMUkIsfJqybSSaDFhkyYI3qGBKilCaIjJQv7cm4zreeCQci1tbZSvZUpgG9rZIDMW4PSURrBumP2TPPmT3Fo2lWmg9k%2FP02H7M%2B5dcgX9mghJe2zD2i616rzDtIPLhFe2B3owDdngJ97mayM3w%2BUCZX5DKbTSkkkJP0NKtnRxDUmS8FeV%2FmQ5o%2FOeU6n4WIeMy%2B2hT3bV4KO%2FjRZ0aUZDNzW%2FgGAkws%2FT3zQY6pgGhgepbJpmYjVX%2B%2BVC6ZIHLWU9Kn%2Flnkwq8RWTgtLmirJz1XF3Lp%2Bwhgvx7QWwR%2FePhBSAwkB5ZNYgNCe1ylJVo95fr3hMM%2BPc5yowUM15qVjkmArQR4r8szHk9UXsE50U%2BMRdg3yAzmiXFueP4SPm5qixiTptPWqrkhlT7L0GQCzDUV89%2BCbSpT9G1eexf3D2OjHNFmdhCVHlDqC8hrEWd%2FoY371Cx&X-Amz-Signature=18bbc2104edd9139b7cf403c6aa011938a8f14bdb44bf314fe3020abbc9823c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2RIA5AO%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIFnGyNcomsXPF5Al%2BeGS5grh7Cz4LdGUXNXGJTosHEUaAiADsYsoLJg%2FFX2QVf%2BO67AnG9%2BYNIDt%2FVi%2BxB2INuqIXCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMmCKdz9JLXZ0pb45rKtwDCY9H7%2Bd2zWoQDs6TcrWs6pjTYCg7hMkKpKmTE3k%2FYlAd%2BZVExfff03AFnYXH0KA1Q2477bdPuZKnTOmHJcByh%2BCQrIA1GV0LxGvC1cuvPPWDzn3OhTu%2F4lSVYMKWIjQLYsSMaokvpL%2BCLob%2F0nuqzdZbKQEkr6BxvnnXvwdFVKD3thAtYN0cvoP0EOEPthL4jUhWo%2BB5f8s2CPRLn71kPLRyrhNX6oD67VLp0tNC6%2BQIaobsZq7ZGDaKS917Gz1YVPJjbqFfLkZw3Qymm687aUal4Jt0S3mUd5XpL8BVLIn6POaDdZodpfH%2FjaxJ78PqWHYZpkujlWdqOvog%2BAakX%2FooU7TLqAe%2F3f5d5pST2FsegLUfsteO9fI6LNnaZk3v3nQ%2FnBcsAwdrbrspfxU10bmWyG6twQF5F0fKMRg5t1cgxXtxizdBup9UoaaObloNeYPamoQAgSKiy%2BQccnWm0Ko8zOmMtAcLMASZrlKgHd7cphyQn1Nb7aMtYNMiGQwvxCHnv%2BxoOFxWiNHaMFy2DyByRHH9gKATk3pr%2FLF9jeOvMjHkYF6AfZZwfnWaMJiVVLYWW7hbMRTM42cgZ7qyGRNfcIaaLSWDOn7TC4z7fPcGIfLPkhr9jU0nWXAw9fT3zQY6pgEnfW%2F1V3nejGhWR3gGuCFYAne465Qa1MVv8ufp5jbkZ4bzITjbY71E9gkXsYTXB1K62UXjn7jckU2taN%2BasEcoeJGDrdwULM1yZ7cWEUXaDA7DoC53YcYKwGbkEUDV8VUKB4KE5fs2pliI2QB2ws0sksGag5H6EOheRRjcF8fgfrmW1ituNjo8mf%2Fuh9TpRAkLus71WFcMxqiMcQly%2FbTGv8zuQSOY&X-Amz-Signature=14f2c1365dc9426fcf80405548481522166c7a3f7e7cfee91bdf38e0223566a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DIK4MAW%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIAmdK5YHEWFcorl%2Ftceu49z9kFkyXZT16%2F4pBpkrdhrHAiBTG7HLUClCXe%2BZ9blmycoUWd7h635Idg47JEU7aEFJrir%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMJjj2x7sDd7jL%2FIL%2FKtwDJcwIIwIK0MD7ImQkj725zgxqB0N86p%2BR3uaRTjprGSxvPGy89qrVS%2FsYNQDIsfPxzqRE59ZqUbWHRjZK%2BJLbkq1DlILiWNHvTCNzsqVXiM5yx3jhsqH1SP7zY9Ftj8vugA9eyJzdeLNP3sYFwNOMyA0kuoE%2BBG8rig7aVgwKV%2FSMc3hpRqU4wzGNLIuTT6aPEMiuy4WC1AJWf2m1XHrHoilMLPQnVUXgeU1D8R8c3VJSC3rRNnfuUJNuE9QNd45mclLAGGOgqypsFBHOg8lesNVeeUcn1qlBPjz4XVda%2Fzh%2FnSKs3s2g5U2FOF8pivoDfqIGjQ%2B%2B9Q1p1yls26aH1WzUbvB1tErU%2B1a%2F%2FW4CC8Bm6lf3iq2ZjCFdMbGtkovvsafEa9BHlYeGg4B%2F1Imkmrk7ljgncf01FaHBve2t8zGeD84WQymPeqUw2wkzrvq0uek7XRLsPZciQoY7pgd9EgS5%2BX%2FhNYl6vYEHgCBQMRfG%2FH%2FK8k4QMbHdaTsDNt%2B2FS88HqNBToonr35MJ5YF%2FclXqq4D9Iy0%2BOu2LvLBeHimHWl97wFt9CHLqXNwUmN5YEkFxO%2FnQjzCxvhDkZuWBF1tXkqJLFIyeLSdJrGgr5iEXSt2ZTrAD3bPAg8wj%2FX3zQY6pgHZb95iAsAE0LYafrv1KgWXAVaOnmxY7ZxNDuq7eiPnkxQgaTLbhT4t4KnKctE%2BiP50RDzc8AljDJ0ttsak3x6kdF98dAadiWOj5q8uePGQe%2FL1CDzUeqlGc48d3oM6PhLGV2TQ5ci1ACkxHdaaGf%2BFzh%2BmggOwm8e1XcVZ%2BNpQFSafCHqWnJ6JDQ9b1%2BUsnbt8k897m0Z0HBohTFatRIJ8P51IQ5gD&X-Amz-Signature=1d552bdfb9af10e5c762e644de098f6f1b26df8a1b2d6c5296b2e57cb9617186&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKLNCTDE%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIG%2FlfXSjwiCMt4Kpl2HP3kNkmZn57ouECX%2FXLrTwlrgmAiEAiKUgrjBHODt4VhDFHPKh3HoYm4utrKIDv7F1AR%2FvqCIq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDFiZm5wxIWd0WErsjSrcA2oqYZrlKt1g3Zcc8nGMNjrlClgba2LHp8Z9rPJi2yX4fv%2FrNYlinyU7sUnyRmU8EGRkZkfPNzO1LBlhJS9QjrHdGUi1COrZ%2FNxZG4sYF2lOSQtJA%2FDKX6nz6wZQMh2Uu0iWjG25m9aXwgnWG%2FBEa8Y5GdBBLEMOcm2PyDzESEebtsXzbzKP6sNOKCLTDUG9KOMKKw5Y3RlZ%2BY%2FerJN%2FqNZamCO6nHYVXQ2oGT1IqlOFWY3MOQyz0sd8U%2BT9TP8Io%2BB14yiepIQpq%2FJejzmAYn0tOkmn4BVLme%2FMX1WLKtEDC01tzuo8A7uvJDZ6nWMN3CtnxcT2SwmoaMhbdOmgeVb1QLKx13ePlmfJf%2Fiol71UlWyl6aRq2xjUohzKRaIEFDKxUMTO8NxDjh19JHPGM3e1ZRopA9gMu2QdJU%2Bp3dE0je754S3wOYSESO8UIAhmJ7qhRTHLJ0ALCUTYMZw4gggi4mNd6z2egUmrPqe%2FQWAMPD6iopVMH%2ByRAj9lt55DPlqVn4ByGNeyOP9zbhyzsYazPrAkgYr6EMo1VL2HM4YtmhV%2FMq1HFITiSbDW7AdIt%2FdzRFX8CcFQOOB1qQ%2FyU%2F2FlMZ28vtMOgPYwJXAOW%2BfGq5jjDNfJsgNxDIlMPP0980GOqUBRMyMUrDPzjne1cTISw5wAPUjSFMkrdlYuP%2FibB0vFw2Il98RzG5OMt0snuMQjLsubDtGPrxcurnL5DwKxcv7QAF2hsx%2BRmQE4mxhsXaP2wfQgWLNYiI2gRcI8oBlNdJtRLciHGqOZZD2u8jb%2BqIynrF9lrOpibNNR4WujYQwJsiouuFEJlOh14ip340vVcX3eySXf2C6DwCq2F0QDE4B5iYsig1C&X-Amz-Signature=63c1f187de7931040613ee21b3373420da6e51f6ee7ee1da4e2ee6867049af80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J5IBZM2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQD6210ITRJZSL%2FzfiKhuuyo89WZIvjKLPteCzgA%2BR1sLwIhAO6Y%2FLkPx2xuuKOAG0fftPODoO50%2B7pKtlwMbQRsBOK1Kv8DCEMQABoMNjM3NDIzMTgzODA1IgyVWn8l8G1hmWFs%2FTYq3AMIQno7k2nZPEp90emiiWV%2FjDmDXgijav%2BwNxYlKxRn6sQ5x0JqHCmooFPOayrthH4%2BdOrSvsB1bhtC1rTqZa%2Bj0M8PcVlKxEckZptFaNRu%2FNDaFdw%2B0LpVKNy6hbFIDAJrxNDdvIXkF7cf%2BJvhWZ6AIE5%2Bzsa%2FKemPjWcGTX7kmYJ69WUKUZU699KaWPkzvyku3ZbyyzeSCHjSrLgmfEvCA7mUMrke5wrGb5xuIxlGuTLi7moFBW7IYh0LSBUYHdkYvza92HUvQ2jZOhgW0XTi0E87xJ1mw8cFlt7e4nOgG17zA%2Bbv61Pn6IykEsOWIiSoPndaviXNAx%2BCZYxNaDV9o19TnwoJD2UZ9j7Di8Pe8lCgC3ZUeONRkB5iXDVQxiWEcSm7S75jGMjuBaYK9y6Iy9OWzqTTP4CRyoJrCEp9ek0v8qAr%2BRKqxlxgO3i5I2hgpH8jJK9ZozOtZopJrea%2B%2FjlQ8b2BrBU71Ca3e4dqCTXsshcr3vdKk53iolURkaolBoJCQFXfdD9JGW7YBK4Q%2BFCESQI8RCkdgiYQTakpUzTOHFIV%2F08cVhkiZyVIKfIbhatpoZPrV%2BxiHdtvJOr5QjD65x6%2B7c37%2B9Df0p0E9yv65WIANUxqhRuKCzDi8%2FfNBjqkAZ4ZtswZVOtHbrVJxYc5HjJFsULy%2BpLs%2F0YJQTQGMSpJjHYf6IlR3QsqeywrTqas7Diqt5S5mdHUxJ3f29uZ0Wl%2FsydrJ67ULlPXSqENR7OHbYyTHq4diajjm7wNACEOl6wGkyrmsf%2B0wEgqM9bnMUV7u%2BsWF7wgN7XAGfh%2BkvQ71I9BuA37oifCHl2KVZqVpSdyPt3K172IR7wrPkqBy6tD%2FG4z&X-Amz-Signature=58e749763dd2c386fd7dd5c5a9478883744037727dc08b94732bbed8664365f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663J5IBZM2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQD6210ITRJZSL%2FzfiKhuuyo89WZIvjKLPteCzgA%2BR1sLwIhAO6Y%2FLkPx2xuuKOAG0fftPODoO50%2B7pKtlwMbQRsBOK1Kv8DCEMQABoMNjM3NDIzMTgzODA1IgyVWn8l8G1hmWFs%2FTYq3AMIQno7k2nZPEp90emiiWV%2FjDmDXgijav%2BwNxYlKxRn6sQ5x0JqHCmooFPOayrthH4%2BdOrSvsB1bhtC1rTqZa%2Bj0M8PcVlKxEckZptFaNRu%2FNDaFdw%2B0LpVKNy6hbFIDAJrxNDdvIXkF7cf%2BJvhWZ6AIE5%2Bzsa%2FKemPjWcGTX7kmYJ69WUKUZU699KaWPkzvyku3ZbyyzeSCHjSrLgmfEvCA7mUMrke5wrGb5xuIxlGuTLi7moFBW7IYh0LSBUYHdkYvza92HUvQ2jZOhgW0XTi0E87xJ1mw8cFlt7e4nOgG17zA%2Bbv61Pn6IykEsOWIiSoPndaviXNAx%2BCZYxNaDV9o19TnwoJD2UZ9j7Di8Pe8lCgC3ZUeONRkB5iXDVQxiWEcSm7S75jGMjuBaYK9y6Iy9OWzqTTP4CRyoJrCEp9ek0v8qAr%2BRKqxlxgO3i5I2hgpH8jJK9ZozOtZopJrea%2B%2FjlQ8b2BrBU71Ca3e4dqCTXsshcr3vdKk53iolURkaolBoJCQFXfdD9JGW7YBK4Q%2BFCESQI8RCkdgiYQTakpUzTOHFIV%2F08cVhkiZyVIKfIbhatpoZPrV%2BxiHdtvJOr5QjD65x6%2B7c37%2B9Df0p0E9yv65WIANUxqhRuKCzDi8%2FfNBjqkAZ4ZtswZVOtHbrVJxYc5HjJFsULy%2BpLs%2F0YJQTQGMSpJjHYf6IlR3QsqeywrTqas7Diqt5S5mdHUxJ3f29uZ0Wl%2FsydrJ67ULlPXSqENR7OHbYyTHq4diajjm7wNACEOl6wGkyrmsf%2B0wEgqM9bnMUV7u%2BsWF7wgN7XAGfh%2BkvQ71I9BuA37oifCHl2KVZqVpSdyPt3K172IR7wrPkqBy6tD%2FG4z&X-Amz-Signature=2a6fafc3cac9d5e60e338ceca46deaf47d7232703fea870fb09365684d7e46b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKWDBSLF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCNfK8Toc6BmsNyKBKa1SRRqcJ%2BWF391Z9Hg1VWSrEowwIhAM9Hklu7DlCgoNYFNS4bhnIKcx635SwsNV%2Ffg3zCVvtBKv8DCEMQABoMNjM3NDIzMTgzODA1Igxd09GVAonsz01L720q3AMNvUyy47CPmbqJ7qgnZEJdz3OsxmHEeTzSPqfxPFmMU6Azz3060oyLiYWlicsn5B9yjee0MYQkPsR7GXToegYCfQt%2B3kxhfSOICVzjFyMaXpGU2o3NIHIVY08PoQk0v8ICypFH%2FH7dAq9w7qF3T%2FqMC2bCTP2NpsaTLv7HRCts%2F6Hjvejxd6iiEb4qP%2FvyHUo4AWqMj5VKSVX%2BDsbql2ON6rEtJcAf2TLKJijpQihskcehW4iZX4nDNFzNnwQEgDcy8g6fogjVvlA2M1zKMb0yhddLgDKtz1cJ5f8pMqeS8Ql2hqc%2FXP0KjVrO8KiLwZVin0tTvpkE2c5dTs45ZDvVzvgo%2Fgi%2BQMyWCZba89i%2Ff9FMLwR4E6dCd2Ovrbh%2BwVm00d1LBD6cksNk1eaZAsiQTbEvCSFQ7p5abj25x9AZFBS8hcxbhmqeljwqfC1lAjMMY%2BN306GynWBYh35J26wcaW4%2BKRbvNc4WVljzdOqp3h%2B5cquTL7Cf%2FCzfd9W5%2Bn7hCr6TEeeBamzAmEusJdn1i9jCxTlmpWB6niya%2BUZzj7uDptpY%2BtsLP0cdNPUE%2Bfhfc1IorKf%2Bg2Fc7ELnxZlZ8VGVXeNtpskb4tqi5z%2BS7ws2G%2FBsPV2fN4OOrTDO9PfNBjqkAStN2bNaKNcrQauUEDzoC537LSGSVMsw7ibx1oWWcTMBAGX4X69ZULYTrvsebl%2B3ox4m22MN1M9K3khDENjIsBZyhTbDcCaXNZ5bSa949YBcfkBlVjpiv6wA45JTEGO0nKP8qGS8dCTyJRl%2FJVDHETmVaUDNQ6oeXIT81str1tRgtFNHQeEzQg57PZwIj0pvAJaRPT2Zzd0DTPxBux%2F1F3ZT10Bc&X-Amz-Signature=d62fff98c97f7cfcbae1c6c1d801445577880727fa90516c26067373220ccf31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THC7FDEF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDXls5XpA%2B4aOVyoVwJAfsL8Jg3FFTef2%2BDzvm3K3oP7QIhAP6nQn1O5YkeaX%2BwoLwav%2BnDIHvBYCv6iYpGM0nrZsMyKv8DCEMQABoMNjM3NDIzMTgzODA1IgxVARAIy30%2BOtEFfW0q3APehRnTy78j5oxfS4yEamIpXMemHjJlbrOyDtZeccP2rikbLiSoaudkIkIE%2Fn6zLIHte4MxpRx7551HC0QUYA9f%2BeEpwaEaAX1HQG8GgC78CPWeAnbT7dQ0WtibleQq%2FCGbsQNEWYrpNTJATfenmlajvTed9PEaC%2FxLiqoH9mQ%2FIhUEFm5HNJDI9qReF%2Fd%2BpWPrP5CngBqOEFrZ5yMMd908yxeov3QpTfX4nTxSgBhq3RERhTHggTePGzvGqg7TKYz4Z8ycg3K1ZUAf%2F4rPE4%2BmihfR19VWRkef3qLhADTMoUsXk%2FAxYOQNf0drtYRXi1GqCU0WK8qkJvv4lO6WUsflMQZozBvow7a7d9IVZlhB8yH5HxsjHguAMF8d8O71YYCyg0VTHfFBEY0P42y0yQZMpD80nLwNgP7uqi%2B960gllMkoxGyh8NkP8rML6deKlL3mav8Q67LqbxcMRtuhZ4WKPNNttIhD%2BN45C39aK3TMeeUNU3CF1y1pEcI2S8DrWnnf5El7m0b2xbl8vSnTuNx0fXtRGb6GS0wAEh64ty1QQzZbico0O8cnPCrZcnQuC5xu3MuPrP6K3deuFXWT%2Fzd9k1bmOiSvp5CgavMv8JOL%2Fdh7eunM1h7h4sM9rTDq8%2FfNBjqkASFZ8amqK%2Fg6x4ckw%2BbZGuJz%2FCL3z0laOC%2FfTTkvFuX2s40Dc%2FZyiN6fR1XoBvvKEqJSeE527EhlmbtILvnYT6xm8NB3iu7MjbZerPF0jClZsN7H2Eiw8N0HP3h9V4ut2w56YA9D%2FMLTuMTlyDPN1wLbBvtSpKI%2FDU7CNgemM7KJshAH8Fa89kMwALp8%2Fksp2gBzR7tCfUvh9ZXkzJZAKaq8pRo8&X-Amz-Signature=fb2807583609c93a5b18acdc09e6b1c27ea5473e8e0a55d4110a8651098c75e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THC7FDEF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDXls5XpA%2B4aOVyoVwJAfsL8Jg3FFTef2%2BDzvm3K3oP7QIhAP6nQn1O5YkeaX%2BwoLwav%2BnDIHvBYCv6iYpGM0nrZsMyKv8DCEMQABoMNjM3NDIzMTgzODA1IgxVARAIy30%2BOtEFfW0q3APehRnTy78j5oxfS4yEamIpXMemHjJlbrOyDtZeccP2rikbLiSoaudkIkIE%2Fn6zLIHte4MxpRx7551HC0QUYA9f%2BeEpwaEaAX1HQG8GgC78CPWeAnbT7dQ0WtibleQq%2FCGbsQNEWYrpNTJATfenmlajvTed9PEaC%2FxLiqoH9mQ%2FIhUEFm5HNJDI9qReF%2Fd%2BpWPrP5CngBqOEFrZ5yMMd908yxeov3QpTfX4nTxSgBhq3RERhTHggTePGzvGqg7TKYz4Z8ycg3K1ZUAf%2F4rPE4%2BmihfR19VWRkef3qLhADTMoUsXk%2FAxYOQNf0drtYRXi1GqCU0WK8qkJvv4lO6WUsflMQZozBvow7a7d9IVZlhB8yH5HxsjHguAMF8d8O71YYCyg0VTHfFBEY0P42y0yQZMpD80nLwNgP7uqi%2B960gllMkoxGyh8NkP8rML6deKlL3mav8Q67LqbxcMRtuhZ4WKPNNttIhD%2BN45C39aK3TMeeUNU3CF1y1pEcI2S8DrWnnf5El7m0b2xbl8vSnTuNx0fXtRGb6GS0wAEh64ty1QQzZbico0O8cnPCrZcnQuC5xu3MuPrP6K3deuFXWT%2Fzd9k1bmOiSvp5CgavMv8JOL%2Fdh7eunM1h7h4sM9rTDq8%2FfNBjqkASFZ8amqK%2Fg6x4ckw%2BbZGuJz%2FCL3z0laOC%2FfTTkvFuX2s40Dc%2FZyiN6fR1XoBvvKEqJSeE527EhlmbtILvnYT6xm8NB3iu7MjbZerPF0jClZsN7H2Eiw8N0HP3h9V4ut2w56YA9D%2FMLTuMTlyDPN1wLbBvtSpKI%2FDU7CNgemM7KJshAH8Fa89kMwALp8%2Fksp2gBzR7tCfUvh9ZXkzJZAKaq8pRo8&X-Amz-Signature=fb2807583609c93a5b18acdc09e6b1c27ea5473e8e0a55d4110a8651098c75e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R35RRQ2O%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T031214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDCcXIW7KdZ3yVo7Yh9MIs9eMHqLmLV%2FjduHxv%2BCCW9SQIgHc9XEUyvlSJ5%2BZvKC%2B98DNJUGzHM69c7365ExlnnKyEq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDF8HbxN8l0fKyWpnUCrcA%2FLiQI3dy0VLP3kWl%2FkjIxry0u9lsl%2FrTj5CZTDpwI%2FWE4%2F4xFUQK44fC87%2BmahLxpiTLLubFvEwmUa5jWhimRLdpeWpsIBLl2KLBsLbt3pnP0HMz07q%2B233OkYRl8pK7FPr358Z4jOw63O4neralZLcueOgo9pAZvJiXzvQQKDw3fd%2FI2f73GjUJbBMHHb7pw7vpcC9o3H0%2Bk3RutK6h1BgrgQmdcqy38cz7XG33Qw26RKCG1nfyAOrwVm%2F1Sa7HvzjL3NnhaqEyZlSsV1rdXcnDnVY80Y7BypMDVcq0c3QFekKYv5YJ%2F2t9rwE2tm2w8Pob0LXAAltNh%2BNKKpTwP6B5%2BXtKCeDWg7f89xbeKXbWkb7QZo4SSs%2FpYC%2BQfHIfEhpPTVlr3As%2FpVJ5mmCVzVSQtyUySM%2B1WhOsh71Ur91dJYR1NjetB5nmC6G4Jc01N0A8O7zydI8DE3cTyNty3QPjuxLbgaSmjrkSVHtnDVuASo8RDVsmHXIxIp8iJvlsbEPEjX5qw5drgGRhzdot2mZkny3EIG9WR9OdGCd3Dkiqam7Hkg7nviokTWGAs7nib6%2F0qHio1bBgR%2FSY2if3HprrcVwr6P3uk7npHMypj4UfSLGfYyKmltE7NzyMLP0980GOqUB1jAMvhzsYlNcAJyhVWf8%2F9c9VZiJnH022QSgnM0aPXruJAMaTGk9pfNMlnaJvTQJtsD0Q4p1LEd0DxzdXn0XCpmQeeQPMHn2SAFblTvAquk8U814z8oPygzwWVkR1uzSsfgUprOcvVp8JLg4loZgoQLC746RVdvNth%2FsuWXKOPc6wymTpV%2F2%2Fj%2Ft%2FsHCkToGubgxx%2BoC7JeM490B3NDg9DlHsgIg&X-Amz-Signature=e16be53e1c81447f5aa96cc97aae2b3592726c0478e34080c1c448139b507c9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

