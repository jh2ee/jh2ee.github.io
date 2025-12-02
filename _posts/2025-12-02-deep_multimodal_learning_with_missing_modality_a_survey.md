---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633MAEJ7F%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T004209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIDOpIyxzh%2FX742sqYXcEnbt2bmp8SF0ChgRnOyr1h01lAiBPMPdzn89HJjT2Bn5PGnXRiqG%2BW7fVxlMayJZZacNVLSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM5In%2BZ9RtBiHRahZjKtwDxOrlRgEYeUaAP6kJrvfSp%2BlQUNfS9mGRdOmjo5EHAgvuWXyG6BMSxh8kin%2FIxtIzsdCav7%2Fw%2BSgisHL0tn9YsZwIXAO6OZTmT7uHKqIId3RGL%2F%2FtFLjNmrF4KJ0lU7tuyOYxFEpd5hA6ILKbWSDOKprf5TUJ2MEhw5rhX1gCJ2Gse9FBzQ017mLAwIYV5XP%2Fo2BSf0iYw1UEQjiaG2HAjbfDqzxy13iUS1vcpsF%2Bh8VkZd1oxt9rsF9Wjhb%2BFA4TKQUpWx0YCrxnWElELG3bnTR%2FbpP8NyFAvaJe3uVWWcplHyx40VTzgf%2BOxHUINR6ipdmsjI%2BCietyZtIJKQnLlZWWwamXRO0SbpBkpOAIYt1JS5QnONPH6rMOxgZuz1FEzdTfSISNl7YVW54T64F36CayPXchTLBrgySgurotLGRVv9mws7L0VnNSvoVBfb1AvV5jNUT2nstYYKput6lfWGJF1esN2DRy1qfq2eBqdFV4qHKAZLWu8zC%2BQ%2B3dPd5Apmu3mAeqxB9s2MOCzfd9XRHpLT069IGJZb2hJbRqEm21BW%2Bjy5%2BhmXFLU9n5hwAXERZW47GBhK9SvQWqIt0AIlLFEUXuS5qZK4VXju27tB50pezYZDa6YtRO3rkw2%2Bm4yQY6pgEExhVAX%2Fj7UFWg1%2BKj2wU0MJFZV1MeC%2FITkJw3GXqpaBuId13tbIyuhj4P1d1lc19zSCb%2FFwGvZPCBeXfMU3z%2FPU56l1NjtnCWWbxQe5R2POvjjzO1DcTbP57dbORLzZzRk6buugZnHwluwrxosGWdXuu8KPb3q7jW4Nje7GbuWL%2BkyVgAD7BOoOCi9OOvl8HMVan%2Fu3lvuy633fasfLPDx1do7by8&X-Amz-Signature=0eaa80be4744b72eec053602403eee97f1b812a3e3c23fd6b9073c96d2b282ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633MAEJ7F%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T004209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIDOpIyxzh%2FX742sqYXcEnbt2bmp8SF0ChgRnOyr1h01lAiBPMPdzn89HJjT2Bn5PGnXRiqG%2BW7fVxlMayJZZacNVLSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM5In%2BZ9RtBiHRahZjKtwDxOrlRgEYeUaAP6kJrvfSp%2BlQUNfS9mGRdOmjo5EHAgvuWXyG6BMSxh8kin%2FIxtIzsdCav7%2Fw%2BSgisHL0tn9YsZwIXAO6OZTmT7uHKqIId3RGL%2F%2FtFLjNmrF4KJ0lU7tuyOYxFEpd5hA6ILKbWSDOKprf5TUJ2MEhw5rhX1gCJ2Gse9FBzQ017mLAwIYV5XP%2Fo2BSf0iYw1UEQjiaG2HAjbfDqzxy13iUS1vcpsF%2Bh8VkZd1oxt9rsF9Wjhb%2BFA4TKQUpWx0YCrxnWElELG3bnTR%2FbpP8NyFAvaJe3uVWWcplHyx40VTzgf%2BOxHUINR6ipdmsjI%2BCietyZtIJKQnLlZWWwamXRO0SbpBkpOAIYt1JS5QnONPH6rMOxgZuz1FEzdTfSISNl7YVW54T64F36CayPXchTLBrgySgurotLGRVv9mws7L0VnNSvoVBfb1AvV5jNUT2nstYYKput6lfWGJF1esN2DRy1qfq2eBqdFV4qHKAZLWu8zC%2BQ%2B3dPd5Apmu3mAeqxB9s2MOCzfd9XRHpLT069IGJZb2hJbRqEm21BW%2Bjy5%2BhmXFLU9n5hwAXERZW47GBhK9SvQWqIt0AIlLFEUXuS5qZK4VXju27tB50pezYZDa6YtRO3rkw2%2Bm4yQY6pgEExhVAX%2Fj7UFWg1%2BKj2wU0MJFZV1MeC%2FITkJw3GXqpaBuId13tbIyuhj4P1d1lc19zSCb%2FFwGvZPCBeXfMU3z%2FPU56l1NjtnCWWbxQe5R2POvjjzO1DcTbP57dbORLzZzRk6buugZnHwluwrxosGWdXuu8KPb3q7jW4Nje7GbuWL%2BkyVgAD7BOoOCi9OOvl8HMVan%2Fu3lvuy633fasfLPDx1do7by8&X-Amz-Signature=0eaa80be4744b72eec053602403eee97f1b812a3e3c23fd6b9073c96d2b282ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKWHTIDR%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T004213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIBkpyD0VIddUHgSo6Vnw2xMeqc9bKKxORyXCnXQ1xtndAiB1c0WrUXP%2FcaCWfq2y0qTAXP45R2LUOlNTg1u5%2FLhP%2Byr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMiee8qF7hbCNrU41MKtwDR9%2BKCJCAVhg9Xc594oNZczDvqkPPjWWdt8378KZXiUwZ8WIN6R%2B00DxKogxw3Mg5pOZXUJJ5O1LoKxMvZovGTSblnmzrpM9Wq6%2B8G40Fv3Pz%2FUTvxhGMwVDOijV1Z1S0xEP9xYMRcEnpBi7Yx9vzlcbPfGGELNiKBTzBtp%2BZ9uJDL3549apaukG4OvQrGKGC8zlOLh9GkdEoo6UfZkYOd4DEnCU0f8jDgY9NhuQSPsGeCZfS1bVir5pCd4M1%2B2lYYD0z25inf5JPMj6lgg9GkrSR0sIOj4Ad%2Bi4U1lXRfFUetbQSaicEGbnSkm%2FOMDaHeqCF7XcVH7IwyCW27S%2FuiLGMa56dFYZC79XoBTrbyKrxJBu4ufELpWFQGPPQnkmjd9JIrHCsJR%2FdGNZBnqnCkc26VM%2BFvJ73HakT3DpycigW4UdgLOdOnW1pxAToeb6esBVX%2FsKRZeWFQFNd0Oru9wIZQvgIkfI528xMe7wr961Ky6llvQ%2Fd%2BJDD7WO1rBGj%2BhmgpUecAyCzEzF33jmNI6T7DqSnnJMWdV%2FogVEKle99md8%2BmHasWY5l7E6DmKztqa28j6cp9d1nxNejfgW3Nkgm49bhXqnWDDJUbinAl6cTOqF%2Fl8LdBLEBA%2F0wnem4yQY6pgEIKCBGsXreL0c0NV1AqcR5pFjULvaCwGTh9iFVeYhoaJbOLPs%2Bxh5we0zAgk7%2Fm12WQx9sxO07x5jWV%2Fz1ErIlJ2guEvJfQYRMcXH4QmhVMXZDHquNOykai0hvfRw1DwEjethJGYg2ibR9AA8kodEzchRiyMH0UVpc6TZ8okJeropDn2%2FgOAuz%2F%2FnFhcyDgzpC%2BTLO0NvUr%2BfmMsTr%2FJe4I4%2BoczoD&X-Amz-Signature=8aee837a74cf9b8ef3f82b59e0b99137389612009400e0038c61dce793f6b5a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKWHTIDR%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T004213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIBkpyD0VIddUHgSo6Vnw2xMeqc9bKKxORyXCnXQ1xtndAiB1c0WrUXP%2FcaCWfq2y0qTAXP45R2LUOlNTg1u5%2FLhP%2Byr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMiee8qF7hbCNrU41MKtwDR9%2BKCJCAVhg9Xc594oNZczDvqkPPjWWdt8378KZXiUwZ8WIN6R%2B00DxKogxw3Mg5pOZXUJJ5O1LoKxMvZovGTSblnmzrpM9Wq6%2B8G40Fv3Pz%2FUTvxhGMwVDOijV1Z1S0xEP9xYMRcEnpBi7Yx9vzlcbPfGGELNiKBTzBtp%2BZ9uJDL3549apaukG4OvQrGKGC8zlOLh9GkdEoo6UfZkYOd4DEnCU0f8jDgY9NhuQSPsGeCZfS1bVir5pCd4M1%2B2lYYD0z25inf5JPMj6lgg9GkrSR0sIOj4Ad%2Bi4U1lXRfFUetbQSaicEGbnSkm%2FOMDaHeqCF7XcVH7IwyCW27S%2FuiLGMa56dFYZC79XoBTrbyKrxJBu4ufELpWFQGPPQnkmjd9JIrHCsJR%2FdGNZBnqnCkc26VM%2BFvJ73HakT3DpycigW4UdgLOdOnW1pxAToeb6esBVX%2FsKRZeWFQFNd0Oru9wIZQvgIkfI528xMe7wr961Ky6llvQ%2Fd%2BJDD7WO1rBGj%2BhmgpUecAyCzEzF33jmNI6T7DqSnnJMWdV%2FogVEKle99md8%2BmHasWY5l7E6DmKztqa28j6cp9d1nxNejfgW3Nkgm49bhXqnWDDJUbinAl6cTOqF%2Fl8LdBLEBA%2F0wnem4yQY6pgEIKCBGsXreL0c0NV1AqcR5pFjULvaCwGTh9iFVeYhoaJbOLPs%2Bxh5we0zAgk7%2Fm12WQx9sxO07x5jWV%2Fz1ErIlJ2guEvJfQYRMcXH4QmhVMXZDHquNOykai0hvfRw1DwEjethJGYg2ibR9AA8kodEzchRiyMH0UVpc6TZ8okJeropDn2%2FgOAuz%2F%2FnFhcyDgzpC%2BTLO0NvUr%2BfmMsTr%2FJe4I4%2BoczoD&X-Amz-Signature=8aee837a74cf9b8ef3f82b59e0b99137389612009400e0038c61dce793f6b5a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJE235PU%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T004206Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDGDSegL4tPvVMAv9RqJYPVAooGGnb16lOVNSqD19oJkwIgBWPgWPlnV1s6jOubHlYhXkk7tWr%2FYSBQ10rfhvr1QRYq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDPd%2BCmuhjZTdsW5vdSrcA6EpHmdcPws76dnR%2Fw%2BdIL1XTWB6N8TRkE9kTqYZ1fx7cD0CwpMKpRAgL8Fwkd9VqDt%2FAVDEsI7TxoxdlwOc0BeBR1dELaCGbB%2FICoVjgZ27MoG9drAugP5tTNUq0FspRxvvgRY9vAiBCwvy%2Bck%2BFq0gG4RvneFfMcnhT%2Bbck87GUWcMDLm1wNMyJVzGvPGq%2BqHjWLwV4etldIGrcH7RA3loA8lVoBe0D5l%2Ft7b91M%2Fa9iqvYaRdPtjr3mupKPhYCq4d%2FrQOMyv6LqYV1Qc2TYse9mNnCVhheNL8kNfSWuwYzoYHdZ75hRycjyZiKbQyxGN%2Fhf7PFpt6gu2VvaZE7by1RHqJWZU4KVIDMBDuyqms1r7g91xwFm%2B%2FoCmh93s6wihfpcB%2BQ%2Fjw5ri2iNndllCeUyPpyvZW4hwpPpU3WJqWsuhGgr098HQqj3iNaFFNnTjhJbk%2BmmEUGvADstY73mVMmVK%2FVjjdONhyBpD0%2BN0vdQZuT6w4iUjCeuYhHkvBtWkkEeXaicaqJUbPSy8LP2ReVSy1bfDUL84XgbE42UlV4z%2BrmZ6k1U8DqJv8Ba0AVmWBPny90TyZHmXk3zrgqtVTF7JaxxQsallfmYLHsAU%2B0i812ohfQM92AuteMKrquMkGOqUB1mG5vi6KoTcW35xM2STDPvtOSlLiugEtLUI0U4%2FH7BJkEowTCXP1b%2BgGnvdd5BNUu2%2BYTz7GRKaP9TcvhhFE9o7k9vjbgpU1Qer9Ku3STFdhE6J8gzy%2BhsZcNVGpqS8YGk0OZF4gGiwB3kZwzMZB7vQ6ePSCI9kHWuzBdPaxuQfKMkcFRKtnSl35jdtfqVMNqOyG8t8i0WOTvg8mCN5o7t4w79mw&X-Amz-Signature=1bff5224f9bb686f2a076656d2e4d90c00fd84bea01d766f48bcba3ea3dd3cd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RPKLDJ3%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T004219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICcjaJSZ1CZaMFTL128NjrT4lzF7KpCf20PZx6p%2B6p01AiBdP7UAwHVN%2FA9yf53LsrWvGqbV2ohKoS0v%2B3mBH0gmRSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMF%2FbiARa6c3OEmJaiKtwDU7mdu7IcA7BzqUwKQM22In79ZSdsFo0DTR%2FMy27V3YdVNYcTJ71QFKr9P4U1uqqJE1UwiBLVKnCXt6QMYlsw0p3EW8r408KYMjIPW6lNlTglrfbb40JN%2F3WteLSedIXi5mSt%2FZoERRYz4IKuNRwhp6XxLBQxRA0PYD6u5EJAg%2BVsjovZR%2BLcrvL05xG1rATZj%2FoDwhf60s0DgurYIBH0c2msX6KzpvJjER7oWvRUBSj%2BJFfWAW4cCkwZiwd1%2BliI5L1fpbOgRWjttdTe7iIOo3wLl1X1xKyMqkaL2Msi2izlMzvL%2FFFM%2FOc%2BuvDX0iyv0I%2FDirn5RDQm7GZYLjRlRWUJB9RVkzwiaZxQPwlLajqmxXxwZbhi6TwFemp1TCSMCEvOWBAYHzzbynWnqGrq7ktE3lmbRpCcakUq4Bdd9fKoU1cV8wfdhLcMqsPpTEnGGeEs%2F%2BzXvd0IZz7LP5DiysBS0NRhTfqDYM7yS45YSQu0pzVy4QHuo1GQb2sZUgLPnWtGffmJzZTIBoGBFOEbc6JzDUNjuDFVqSwY1EeSX%2BJ1AzxX8wTGqW2GhWRsgmI1W8SRa%2BvGHOaflZ12gtmLtSWMadGDA54tuDkZYRuPKk1c575joBXtDyiekV0wi%2Bq4yQY6pgEIOjh2Shye2PFQgLCORTwu61WIVIJYOrw%2FNEeyhIoPTbeK1eqsqPstRbcv9Pso1Ffhs6TcaZZbRS0sROFXgd1zySCTtqlSm3M4l%2F6u6JgBmD9Hq6A0FP%2Fblw2lu%2B7%2BhY8HUA8mTImqi8GEJ3dWDk%2BhczV0AAQTgUR6DEuY1DdniQXPhcsX3iVCgHF3iEYLxOBY7O0UWLL65pmehMSZly%2BbYpAihykA&X-Amz-Signature=50ec49ccc05d21e490d62665c5f89aa8f45d74ced934ce7c526e4769bfabefb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RPKLDJ3%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T004219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICcjaJSZ1CZaMFTL128NjrT4lzF7KpCf20PZx6p%2B6p01AiBdP7UAwHVN%2FA9yf53LsrWvGqbV2ohKoS0v%2B3mBH0gmRSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMF%2FbiARa6c3OEmJaiKtwDU7mdu7IcA7BzqUwKQM22In79ZSdsFo0DTR%2FMy27V3YdVNYcTJ71QFKr9P4U1uqqJE1UwiBLVKnCXt6QMYlsw0p3EW8r408KYMjIPW6lNlTglrfbb40JN%2F3WteLSedIXi5mSt%2FZoERRYz4IKuNRwhp6XxLBQxRA0PYD6u5EJAg%2BVsjovZR%2BLcrvL05xG1rATZj%2FoDwhf60s0DgurYIBH0c2msX6KzpvJjER7oWvRUBSj%2BJFfWAW4cCkwZiwd1%2BliI5L1fpbOgRWjttdTe7iIOo3wLl1X1xKyMqkaL2Msi2izlMzvL%2FFFM%2FOc%2BuvDX0iyv0I%2FDirn5RDQm7GZYLjRlRWUJB9RVkzwiaZxQPwlLajqmxXxwZbhi6TwFemp1TCSMCEvOWBAYHzzbynWnqGrq7ktE3lmbRpCcakUq4Bdd9fKoU1cV8wfdhLcMqsPpTEnGGeEs%2F%2BzXvd0IZz7LP5DiysBS0NRhTfqDYM7yS45YSQu0pzVy4QHuo1GQb2sZUgLPnWtGffmJzZTIBoGBFOEbc6JzDUNjuDFVqSwY1EeSX%2BJ1AzxX8wTGqW2GhWRsgmI1W8SRa%2BvGHOaflZ12gtmLtSWMadGDA54tuDkZYRuPKk1c575joBXtDyiekV0wi%2Bq4yQY6pgEIOjh2Shye2PFQgLCORTwu61WIVIJYOrw%2FNEeyhIoPTbeK1eqsqPstRbcv9Pso1Ffhs6TcaZZbRS0sROFXgd1zySCTtqlSm3M4l%2F6u6JgBmD9Hq6A0FP%2Fblw2lu%2B7%2BhY8HUA8mTImqi8GEJ3dWDk%2BhczV0AAQTgUR6DEuY1DdniQXPhcsX3iVCgHF3iEYLxOBY7O0UWLL65pmehMSZly%2BbYpAihykA&X-Amz-Signature=50ec49ccc05d21e490d62665c5f89aa8f45d74ced934ce7c526e4769bfabefb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

