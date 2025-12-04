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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z6K3MXQ%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T071132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIC73N%2BNxWUIv92IkRUhaxKz%2Bob91KW0mRlfbQQsU3s3eAiAq3%2BqorS5P5eJuX8q%2BqCI93rlWqVWOygwVHSe5Cs%2Fh4ir%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMP%2BEb7vTRPNh3XsZmKtwD9jUNEuftl01tx1q0ICGuRLUuD%2B65tPJvJ5bUPhR80dfKfcAEvIeu4p9OpXJUpoujeqtzOYn9QYjq9PyFxXqYbkIy90UMEg7CMK7EFO3b2lGSV8wtE3b9cRF2XqX%2BYypeueOn2YI44VOTBTNSEA4ULr93EkbZKwZ7xBlpTfWgWozQXvE9T9AWRuaTIgyBSPQUt98pCB%2F94E%2FEAHtO9BowWBRQ6V6y%2BVd6uXzkFXs7DCIzosM0SZrvspaeFJZou7XL3RCcUx8qlg8lJ2izOsG9jnMHbET2hRpWvVxkNuCAKObky0UXZqNunj7WV3ssMp7Q1vvqQiUlE8I8%2FJnNYT1IsyMzqVu5pAWV3WN5TybLvS8AvJ6DGqap8VajtsPhI3wGLrP4iXLxuqlBl7NbMeK22%2FEHQOYqVvhg7EXV3v3QNZxcL9IkyU5bVhlwTeq%2BXP4T8vNoWbjksswSsKH1rUdOjkYTtlcBYTgLtDmZ9t0DbCZ46n3CnTsquyaPKrW5xGEeiMcc8GpuiM8%2Fgmweo1h04FVRYN%2BiikGYePpk44sPUYdGEXUd%2BT4SeXGWkzhgenH1V5x%2FWJvbKsduY90uY6YwSrN1P04cX4ZpKOmq6ikxTqRHP0dGw97SHntfj3Aw0NTEyQY6pgHj8M9WPPbt%2F8aUmz7CUDBcnHtHciFy8Amt%2BP8KhnYFUT1RIqMD7lSd7p8swJpy7WJAISZdDSlS5HdoU20jz7m7JG79e8NYY%2FFtrxayKGsBrEqHspr7jbvkobJAPuNeaUaGgrRm2SP%2FZ%2FAjqlVY0fE6QW3jt02vg3mPArad9%2Bz3jXv7MS%2FQf7VaZMIZZ6pxXY4RflPfLZfKEhmLaViht7sV9dfnfJBq&X-Amz-Signature=54f915c28d316b9fa27ca9f2d8e18dc1fc67261f157eebd7cf4d5f7813eaa933&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z6K3MXQ%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T071132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIC73N%2BNxWUIv92IkRUhaxKz%2Bob91KW0mRlfbQQsU3s3eAiAq3%2BqorS5P5eJuX8q%2BqCI93rlWqVWOygwVHSe5Cs%2Fh4ir%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMP%2BEb7vTRPNh3XsZmKtwD9jUNEuftl01tx1q0ICGuRLUuD%2B65tPJvJ5bUPhR80dfKfcAEvIeu4p9OpXJUpoujeqtzOYn9QYjq9PyFxXqYbkIy90UMEg7CMK7EFO3b2lGSV8wtE3b9cRF2XqX%2BYypeueOn2YI44VOTBTNSEA4ULr93EkbZKwZ7xBlpTfWgWozQXvE9T9AWRuaTIgyBSPQUt98pCB%2F94E%2FEAHtO9BowWBRQ6V6y%2BVd6uXzkFXs7DCIzosM0SZrvspaeFJZou7XL3RCcUx8qlg8lJ2izOsG9jnMHbET2hRpWvVxkNuCAKObky0UXZqNunj7WV3ssMp7Q1vvqQiUlE8I8%2FJnNYT1IsyMzqVu5pAWV3WN5TybLvS8AvJ6DGqap8VajtsPhI3wGLrP4iXLxuqlBl7NbMeK22%2FEHQOYqVvhg7EXV3v3QNZxcL9IkyU5bVhlwTeq%2BXP4T8vNoWbjksswSsKH1rUdOjkYTtlcBYTgLtDmZ9t0DbCZ46n3CnTsquyaPKrW5xGEeiMcc8GpuiM8%2Fgmweo1h04FVRYN%2BiikGYePpk44sPUYdGEXUd%2BT4SeXGWkzhgenH1V5x%2FWJvbKsduY90uY6YwSrN1P04cX4ZpKOmq6ikxTqRHP0dGw97SHntfj3Aw0NTEyQY6pgHj8M9WPPbt%2F8aUmz7CUDBcnHtHciFy8Amt%2BP8KhnYFUT1RIqMD7lSd7p8swJpy7WJAISZdDSlS5HdoU20jz7m7JG79e8NYY%2FFtrxayKGsBrEqHspr7jbvkobJAPuNeaUaGgrRm2SP%2FZ%2FAjqlVY0fE6QW3jt02vg3mPArad9%2Bz3jXv7MS%2FQf7VaZMIZZ6pxXY4RflPfLZfKEhmLaViht7sV9dfnfJBq&X-Amz-Signature=54f915c28d316b9fa27ca9f2d8e18dc1fc67261f157eebd7cf4d5f7813eaa933&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JJHSO6N%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T071141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIEZ2OmrDs0HPfmfEQcWElG4mFg%2FMzIvyyEWqv67GBfPsAiEA2UFecJAWzq7x0s%2Fl%2Bre3qK68m9CfppHrItnSy3GZDX8q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDAyZPOkMa5jfFu8%2FDSrcAyhKkQQWAlQXTseHJRXpBkrHP20%2FuPDyLbJv1xVr4IE0olfxUqyLEqf7FGXDmVHxFaKDbYhN3jtsukVOumqmNsg7W4FAMgggYaVjj0GpWz%2FFciC%2FVBuPeEsgM2EFdUS7RpbYN%2FkJKLZt4Sjk0oOIf46CC0uOQQ3y4XGnk%2BTANTYgeXiuHErll61ho5GV5lBtrdB0KIBEHuTZmzTB4gHemeDAUpa1NdPUfqQg3GuceLanlcPyjwIIhI%2FNh1hxso4bo2jpvqn%2FYtmdbw9dkd8rtTmsQVBXr00747J2YJpgawPv66s9wUTv5BwCUt1VC%2BeDi4MrZqaE44d%2BU5eEiYJxlSwi%2FhrqgflcRNEGUUpv2iRUVa%2FCrM969S3OsqB9I84tYRDGyydHT41iD1a5LaRn%2BRbFHUO7Pi0IJ4ORs1bTijo%2B4vJQAe7HIHY0RB03IkOwDeBBy8n3HaD%2FMu4FfsmsTg1HYaXCfjG5g9FlgPBT0ak23wzdqEM%2FRssfV1OOsQtHGyqSIT3yQFWC6F8sgu3iWLrc5mho48EdCWivEr2AVeD3dTyop5OFUYc4zNGRIWTTItzjqb7lfF1lTg19IELltXxswnsiNHtNJqqLGqk%2FP9AcgxyYj98Beis7wo3NMOPUxMkGOqUBV0oTtkP9NVQSzk2YTQ0YPS9s%2BbwrQ6rMspwljiE6mgxxoj7Slc3IwnQr1Je9DrzmV%2FEQ9y4vn%2FR09Vw8GJBP8MxQkOSYX9bN%2Fz2lly8OSPHNmhb4FAjJ6F%2F%2B9YL3jsrwNMBpKCkdVl1xHt%2FUAEOQ7FYUIoDq4tqFf394%2B5pEn7xSUtjCCnMYOoKPcVlPk1szmplkTMrfNthGDTB18xYpKvrmMrP7&X-Amz-Signature=e13bf22bcba5b38ab8adf95e2b95a2791519ea7f7097c0040c24f2202938b427&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JJHSO6N%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T071141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIEZ2OmrDs0HPfmfEQcWElG4mFg%2FMzIvyyEWqv67GBfPsAiEA2UFecJAWzq7x0s%2Fl%2Bre3qK68m9CfppHrItnSy3GZDX8q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDAyZPOkMa5jfFu8%2FDSrcAyhKkQQWAlQXTseHJRXpBkrHP20%2FuPDyLbJv1xVr4IE0olfxUqyLEqf7FGXDmVHxFaKDbYhN3jtsukVOumqmNsg7W4FAMgggYaVjj0GpWz%2FFciC%2FVBuPeEsgM2EFdUS7RpbYN%2FkJKLZt4Sjk0oOIf46CC0uOQQ3y4XGnk%2BTANTYgeXiuHErll61ho5GV5lBtrdB0KIBEHuTZmzTB4gHemeDAUpa1NdPUfqQg3GuceLanlcPyjwIIhI%2FNh1hxso4bo2jpvqn%2FYtmdbw9dkd8rtTmsQVBXr00747J2YJpgawPv66s9wUTv5BwCUt1VC%2BeDi4MrZqaE44d%2BU5eEiYJxlSwi%2FhrqgflcRNEGUUpv2iRUVa%2FCrM969S3OsqB9I84tYRDGyydHT41iD1a5LaRn%2BRbFHUO7Pi0IJ4ORs1bTijo%2B4vJQAe7HIHY0RB03IkOwDeBBy8n3HaD%2FMu4FfsmsTg1HYaXCfjG5g9FlgPBT0ak23wzdqEM%2FRssfV1OOsQtHGyqSIT3yQFWC6F8sgu3iWLrc5mho48EdCWivEr2AVeD3dTyop5OFUYc4zNGRIWTTItzjqb7lfF1lTg19IELltXxswnsiNHtNJqqLGqk%2FP9AcgxyYj98Beis7wo3NMOPUxMkGOqUBV0oTtkP9NVQSzk2YTQ0YPS9s%2BbwrQ6rMspwljiE6mgxxoj7Slc3IwnQr1Je9DrzmV%2FEQ9y4vn%2FR09Vw8GJBP8MxQkOSYX9bN%2Fz2lly8OSPHNmhb4FAjJ6F%2F%2B9YL3jsrwNMBpKCkdVl1xHt%2FUAEOQ7FYUIoDq4tqFf394%2B5pEn7xSUtjCCnMYOoKPcVlPk1szmplkTMrfNthGDTB18xYpKvrmMrP7&X-Amz-Signature=e13bf22bcba5b38ab8adf95e2b95a2791519ea7f7097c0040c24f2202938b427&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFVMEJ4C%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T071131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIGqM8%2BYFko5Pnm3aXc7BvrMDeBhpmF%2Bnyu6bQ%2BQptyfbAiEAoh%2F3HFAE67nYe95K4fZB66l4aMqdZ9qtcWTE%2FsUZHEgq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDJHXhTaEiXubYTxJ9yrcA%2FF9v3WG0PIz0elYZAasMrFhyBoUpgyrL0y7C9HbpUG7gNEiCdpZ3tljP3xLmck0HIJoVSkgO2zoNWDK966SZmfdTqrL0pHnPyehOS0r3U8RSGfQPPJfY1qN1drocDRLhy5pDwlvWmvUhx56%2BxXS4iIquWPTyHuyOaGVFxx3bwFCkW%2BzoPQEUNnpeMRqAMT5Bb6T4Ufh6ih%2FyyKbkmtSP%2Fg1AXTziAwRfFpNx7dPUJNuZpU6IPQiJptKwioBxQKsa%2F66mNO1AdAEfArghm8thKP4bGgrvkDP%2FNR6Yfc7nZAKhzqJktfa0qdQ7qYZL6qwgankNSoTw2LQxYcJPuGHIxOzkxRVRwP%2BoFCjm4ufB6a7QjzKrPUrRqUwaUeBP8SuGZDQ%2BtM1rwgmPuTwrCx%2FOxDN%2FTCsICyYUi80szK%2BB2wTxhzj9PCiT8B0XstzzJCOIKcQMgxB5IYOQBdHMRpJGlJzt1y4S1KEQ9QbiQH1NI3IzsVyYdEkqXEankY3DKa%2FP5Qdh39lw3cQjPNT7z2oQ0cM6NCXlVk6OG3MrJoFcU5z6059SSpZtMl2TvbA9SYn40C%2FPz5bwAWad6%2FTyNy%2F15KqWEgvZVq3V1Aaa9yP3HckSxG%2F577rdyqRPhRIMI%2FVxMkGOqUBPPlaGMrBzdJ6YuiqXv%2FTJJT90Q5L8c%2FwW8mKzUYQutrPk5k1wf587BxPaafownytB9hNQt8hs4MSM06XVIO4xd75dt%2Bay7yt9cc3%2BzuCD6%2BY9vpqwoy5aGdAX2ho8Tkp5P1NRKiAKwtsbTj8k8Kl96Jndsv1EhQDleENd8FeuvgHwIp64c%2FHh5zhg%2FFkAiU%2FCPXhl%2BdtjoE0A3e3xBTBttolSdxU&X-Amz-Signature=43023074194ab8bf38590ae95f9e68d20fc0fd13dfe437ca82192836b58f8a56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPZLG35Q%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T071149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIBygn0rVYyBLizTRqRrIHKcRSwtyRIxxMMnzo%2FzzyHH0AiA3Dpyy8Qx%2FSW510YKoFE4M4ysBcda%2B374wfnQZWlkxHSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMKMVY6n6SKooU1QSIKtwDn9aFvy17PKLgNatjpAGd5vSApZn%2Ff1VqtTrYPcNLDjPYzqwo7fegjVZ0lh8bHlmUXAkOLqlU0JF93ROV8rLY%2Bm4nY3IpPoMaMMw%2FCDDy%2BQBA1J5BcJstAlWxMBJQeL4gWOlgwIuAHIsBLPh3OVqiGgE3RHLl4mtL3C6CTFAZEodIYRg3aX5isBbisny%2Bw%2BxBApuZ0OtzM0DbIgh2ULvJ%2Fn6vv6JLtRSKafx8XADYoqiTWEgdiTmbvcqhXmd7XW46nCMXyGHu3s7LuMfRD14%2F%2FbgbKpxMateeJvRtprAK28cas9NZQpPfy27Og9%2FntLJgVMSB35JpGthwW1h%2FzblQkXSJ6MzgDOqS5EXWNLU3%2FKcCkmSDbg5PUbc7WgtxrzphilkHtmYzd6DW%2Bh7Jfo%2BW5OD5ozpttpNQtkeysBneb%2F5znaNzzjYcp66HsIN02GlU5CYnLbjNJCLgE9Kg0eDBegGKMTZuaMoE8dDO1vpc6lqRtb2%2BHjUtxFV%2Fh2XXJ%2BJXXhu9zRYVZTngUIGM3LvqVda0Ppz1GZHsdmc3nhcf8hnPm7lDk6h5kHyMxTAMD8uHzW9CFvAldPsrfADNwo88w%2BodpjEYYqEEIx2bCx8RnOnanw6AdsS8ebW4Neow0tXEyQY6pgFYgcGKpn3z0PVbGjK0LUe2Ek4go%2BRKdd0a%2BmEA6tmBMqk%2BIW6aFUnLyjZiNbqol%2FdeLmi8l3pTMzvjdU8UD1uh8UKhdphuFNUCLzNKk79L0TV4Q8eROhDg%2BqjtliVrOKgmORtL16o9PWAV%2BGYkcPxaNfbgyo95ZguQkPclAIN4SDutXcH5QQBB7QX2VUAs7c5HIQBH53ANfqv%2BYCF0%2F5ZzpQfPUEqZ&X-Amz-Signature=dbd5dc4a3c19fbe42dd085734b48664c8d26e165d71fc6e468ac68304e56b5e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPZLG35Q%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T071149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIBygn0rVYyBLizTRqRrIHKcRSwtyRIxxMMnzo%2FzzyHH0AiA3Dpyy8Qx%2FSW510YKoFE4M4ysBcda%2B374wfnQZWlkxHSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMKMVY6n6SKooU1QSIKtwDn9aFvy17PKLgNatjpAGd5vSApZn%2Ff1VqtTrYPcNLDjPYzqwo7fegjVZ0lh8bHlmUXAkOLqlU0JF93ROV8rLY%2Bm4nY3IpPoMaMMw%2FCDDy%2BQBA1J5BcJstAlWxMBJQeL4gWOlgwIuAHIsBLPh3OVqiGgE3RHLl4mtL3C6CTFAZEodIYRg3aX5isBbisny%2Bw%2BxBApuZ0OtzM0DbIgh2ULvJ%2Fn6vv6JLtRSKafx8XADYoqiTWEgdiTmbvcqhXmd7XW46nCMXyGHu3s7LuMfRD14%2F%2FbgbKpxMateeJvRtprAK28cas9NZQpPfy27Og9%2FntLJgVMSB35JpGthwW1h%2FzblQkXSJ6MzgDOqS5EXWNLU3%2FKcCkmSDbg5PUbc7WgtxrzphilkHtmYzd6DW%2Bh7Jfo%2BW5OD5ozpttpNQtkeysBneb%2F5znaNzzjYcp66HsIN02GlU5CYnLbjNJCLgE9Kg0eDBegGKMTZuaMoE8dDO1vpc6lqRtb2%2BHjUtxFV%2Fh2XXJ%2BJXXhu9zRYVZTngUIGM3LvqVda0Ppz1GZHsdmc3nhcf8hnPm7lDk6h5kHyMxTAMD8uHzW9CFvAldPsrfADNwo88w%2BodpjEYYqEEIx2bCx8RnOnanw6AdsS8ebW4Neow0tXEyQY6pgFYgcGKpn3z0PVbGjK0LUe2Ek4go%2BRKdd0a%2BmEA6tmBMqk%2BIW6aFUnLyjZiNbqol%2FdeLmi8l3pTMzvjdU8UD1uh8UKhdphuFNUCLzNKk79L0TV4Q8eROhDg%2BqjtliVrOKgmORtL16o9PWAV%2BGYkcPxaNfbgyo95ZguQkPclAIN4SDutXcH5QQBB7QX2VUAs7c5HIQBH53ANfqv%2BYCF0%2F5ZzpQfPUEqZ&X-Amz-Signature=dbd5dc4a3c19fbe42dd085734b48664c8d26e165d71fc6e468ac68304e56b5e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

